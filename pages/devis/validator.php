<?php
// NE RIEN METTRE AVANT CE PHP, PAS D'ESPACE, PAS DE LIGNE VIDE
ob_start();
session_start();
set_time_limit(10);

// Toujours JSON
function sendJsonResponse($success, $message, $error = null) {
    if (ob_get_length()) {
        ob_end_clean();
    }
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => $success,
        'message' => $message,
        'error' => $error
    ]);
    exit;
}

// Gestion erreur fatale
register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== null) {
        sendJsonResponse(false, 'Erreur fatale détectée', $error['message']);
    }
});

// Trop volumineux ?
if ($_SERVER['REQUEST_METHOD'] === 'POST' && (int) $_SERVER['CONTENT_LENGTH'] > 10240) {
    sendJsonResponse(false, 'La requête est trop volumineuse.');
}

// .env
$envFile = __DIR__ . '/../../.env';
if (!file_exists($envFile)) sendJsonResponse(false, 'Fichier de configuration manquant');
$env = parse_ini_file($envFile);
$requiredEnvVars = ['MAIL_TO', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_USERNAME', 'SMTP_PASSWORD'];
foreach ($requiredEnvVars as $var) {
    if (empty($env[$var])) sendJsonResponse(false, "Configuration manquante : $var");
}

// Méthode
if ($_SERVER['REQUEST_METHOD'] !== 'POST') sendJsonResponse(false, 'Méthode non autorisée');

// Antispam
if (!isset($_SESSION['last_devis_time'])) $_SESSION['last_devis_time'] = 0;
if (time() - $_SESSION['last_devis_time'] < 120) sendJsonResponse(false, 'Merci de patienter...');
$_SESSION['last_devis_time'] = time();
if (empty($_POST['csrf_token']) || empty($_SESSION['csrf_token']) || !hash_equals($_SESSION['csrf_token'], $_POST['csrf_token'])) {
    sendJsonResponse(false, 'Token CSRF invalide');
}
if (empty($_POST['g-recaptcha-response'])) sendJsonResponse(false, 'Veuillez valider le reCAPTCHA.');
if (empty($env['RECAPTCHA_SECRET'])) sendJsonResponse(false, 'Clé reCAPTCHA manquante');

// reCAPTCHA
$recaptcha = file_get_contents(
    'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($env['RECAPTCHA_SECRET']) .
    '&response=' . urlencode($_POST['g-recaptcha-response']) .
    '&remoteip=' . $_SERVER['REMOTE_ADDR']
);
$recaptcha = json_decode($recaptcha, true);
if (!$recaptcha['success']) sendJsonResponse(false, 'reCAPTCHA échoué');
if (!isset($recaptcha['score']) || $recaptcha['score'] < 0.5) sendJsonResponse(false, 'Score reCAPTCHA trop faible');

// Champs obligatoires
$requiredFields = ['typeApp', 'typeProjet', 'email', 'total'];
foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) sendJsonResponse(false, 'Champs obligatoires manquants');
}
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) sendJsonResponse(false, 'Email invalide');
$blacklistedDomains = ['yopmail.com', 'mailinator.com', 'tempmail.com'];
$emailDomain = strtolower(substr(strrchr($_POST['email'], '@'), 1));
if (in_array($emailDomain, $blacklistedDomains)) sendJsonResponse(false, 'Email non autorisé.');
if (!checkdnsrr($emailDomain, 'MX')) sendJsonResponse(false, 'Domaine email invalide.');
if (isset($_SESSION['form_display_time']) && (time() - $_SESSION['form_display_time'] < 3)) {
    sendJsonResponse(false, 'Envoi trop rapide.');
}
if (!empty($_POST['website'])) sendJsonResponse(false, 'Spam détecté.');

// Limite IP
$ip = $_SERVER['REMOTE_ADDR'];
$ipFile = sys_get_temp_dir() . '/devis_' . md5($ip);
$ipData = [];

// Check if the file exists and is readable
if (file_exists($ipFile)) {
    $ipData = json_decode(file_get_contents($ipFile), true) ?: ['count' => 0, 'time' => time()];
} else {
    $ipData = ['count' => 0, 'time' => time()];
}

if (time() - $ipData['time'] > 3600) {
    $ipData = ['count' => 0, 'time' => time()];
}

$ipData['count']++;

if ($ipData['count'] > 5) {
    sendJsonResponse(false, 'Trop d’envois depuis cette IP.');
}

// Ensure the directory exists and is writable
$tempDir = sys_get_temp_dir();
if (!is_writable($tempDir)) {
    sendJsonResponse(false, 'Le répertoire temporaire n\'est pas accessible en écriture.');
}

file_put_contents($ipFile, json_encode($ipData));

// Envoi mail
require_once __DIR__ . '/../../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Options/prix
$prixOptions = [];
$jsonFile = __DIR__ . '/create_devis.json';
if (file_exists($jsonFile)) {
    $jsonData = json_decode(file_get_contents($jsonFile), true);
    $typeApp = $_POST['typeApp'];
    $typeOption = '';
    if (strpos($typeApp, 'web') !== false) $typeOption = 'option_web';
    elseif (strpos($typeApp, 'mobile') !== false) $typeOption = 'option_mobile';
    elseif (strpos($typeApp, 'desktop') !== false) $typeOption = 'option_desktop';
    if ($typeOption && isset($jsonData['option'][$typeOption])) {
        $prixOptions = $jsonData['option'][$typeOption];
    }
}

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host       = $env['SMTP_HOST'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $env['SMTP_USERNAME'];
    $mail->Password   = $env['SMTP_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = (int) $env['SMTP_PORT'];
    $mail->CharSet    = 'UTF-8';
    $mail->Timeout    = 10;
    $mail->SMTPDebug  = 0;
    $mail->setFrom($env['SMTP_USERNAME'], 'Formulaire Devis');
    $mail->addAddress($env['MAIL_TO']);
    $mail->addReplyTo($_POST['email']);

    $typeApp = htmlspecialchars($_POST['typeApp'], ENT_QUOTES, 'UTF-8');
    $typeProjet = htmlspecialchars($_POST['typeProjet'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
    $comment = !empty($_POST['comment']) ? htmlspecialchars($_POST['comment'], ENT_QUOTES, 'UTF-8') : '';
    $nbPages = htmlspecialchars($_POST['nbPages'], ENT_QUOTES, 'UTF-8');
    $total = htmlspecialchars($_POST['total'], ENT_QUOTES, 'UTF-8');
    $options = isset($_POST['options']) && is_array($_POST['options']) ? array_map(function ($opt) {
        return htmlspecialchars($opt, ENT_QUOTES, 'UTF-8');
    }, $_POST['options']) : [];

    $mail->isHTML(true);
    $mail->Subject = "Nouveau devis reçu";
    $body = "<h2>Nouveau devis</h2>";
    $body .= "<p><strong>Type d'application :</strong> $typeApp</p>";
    $body .= "<p><strong>Type de projet :</strong> $typeProjet</p>";
    $body .= "<p><strong>Email :</strong> $email</p>";
    if (!empty($options)) {
        $body .= "<h3>Options :</h3><ul>";
        foreach ($options as $opt) {
            $prix = isset($prixOptions[$opt]['price']) ? ' : ' . $prixOptions[$opt]['price'] . '€' : '';
            $body .= "<li>$opt$prix</li>";
        }
        $body .= "</ul>";
    }
    if (!empty($comment)) {
        $body .= "<p><strong>Commentaire :</strong> $comment</p>";
    }
    $body .= "<p><strong>Pages :</strong> $nbPages</p>";
    $body .= "<p><strong>Total estimé :</strong> $total</p>";
    $mail->Body = $body;
    $mail->AltBody = strip_tags($body);

    $mail->send();
    sendJsonResponse(true, 'Votre devis a été envoyé avec succès !');

} catch (Exception $e) {
    sendJsonResponse(false, 'Erreur lors de l\'envoi du devis.', $e->getMessage());
}
