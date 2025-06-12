<?php
// NE RIEN METTRE AVANT CE PHP, PAS D'ESPACE, PAS DE LIGNE VIDE
set_time_limit(10);

// Bloquer les requêtes trop volumineuses
if ($_SERVER['REQUEST_METHOD'] === 'POST' && (int) $_SERVER['CONTENT_LENGTH'] > 10240) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'message' => 'La requête est trop volumineuse.'
    ]);
    exit;
}

// Sécurité et erreurs
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// Gestion des erreurs fatales
register_shutdown_function(function () {
    $error = error_get_last();
    if ($error !== null) {
        header('Content-Type: application/json; charset=utf-8');
        echo json_encode([
            'success' => false,
            'message' => 'Erreur fatale détectée',
            'error' => $error['message']
        ]);
    }
});

// Toujours envoyer du JSON
header('Content-Type: application/json; charset=utf-8');

function sendJsonResponse($success, $message, $error = null) {
    $response = [
        'success' => $success,
        'message' => $message
    ];
    if ($error !== null) {
        $response['error'] = $error;
    }
    echo json_encode($response);
    exit;
}

// Chargement de la config .env
$envFile = __DIR__ . '/../../.env';
if (!file_exists($envFile)) {
    sendJsonResponse(false, 'Fichier de configuration manquant');
}
$env = parse_ini_file($envFile);
if ($env === false) {
    sendJsonResponse(false, 'Erreur de lecture du fichier de configuration');
}
$requiredEnvVars = ['MAIL_TO', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_USERNAME', 'SMTP_PASSWORD'];
foreach ($requiredEnvVars as $var) {
    if (empty($env[$var])) {
        sendJsonResponse(false, "Configuration manquante : $var");
    }
}

// Validation du formulaire
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Méthode non autorisée');
}
session_start();
if (!isset($_SESSION['last_devis_time'])) {
    $_SESSION['last_devis_time'] = 0;
}
$now = time();
if ($now - $_SESSION['last_devis_time'] < 120) {
    sendJsonResponse(false, 'Merci de patienter avant de renvoyer un devis.');
}
$_SESSION['last_devis_time'] = $now;
if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    sendJsonResponse(false, 'Token CSRF invalide');
}
if (empty($_POST['g-recaptcha-response'])) {
    sendJsonResponse(false, 'Veuillez valider le reCAPTCHA.');
}
if (empty($env['RECAPTCHA_SECRET'])) {
    sendJsonResponse(false, 'Clé secrète reCAPTCHA manquante.');
}

// Vérification reCAPTCHA
$recaptcha = file_get_contents(
    'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($env['RECAPTCHA_SECRET']) .
    '&response=' . urlencode($_POST['g-recaptcha-response']) .
    '&remoteip=' . $_SERVER['REMOTE_ADDR']
);
$recaptcha = json_decode($recaptcha, true);
if (!$recaptcha['success']) {
    sendJsonResponse(false, 'Échec de la vérification reCAPTCHA.');
}
if (!isset($recaptcha['score']) || $recaptcha['score'] < 0.5) {
    sendJsonResponse(false, 'Score reCAPTCHA trop faible, suspicion de robot.');
}

// Champs requis
$requiredFields = ['typeApp', 'typeProjet', 'email', 'total'];
foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) {
        sendJsonResponse(false, 'Tous les champs obligatoires doivent être remplis');
    }
}
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(false, 'Email invalide');
}
$blacklistedDomains = ['yopmail.com', 'mailinator.com', 'tempmail.com'];
$emailDomain = strtolower(substr(strrchr($_POST['email'], '@'), 1));
if (in_array($emailDomain, $blacklistedDomains)) {
    sendJsonResponse(false, 'Adresse email non autorisée.');
}
if (!checkdnsrr($emailDomain, 'MX')) {
    sendJsonResponse(false, 'Le domaine de l\'email n\'est pas valide.');
}
if (isset($_SESSION['form_display_time']) && (time() - $_SESSION['form_display_time'] < 3)) {
    sendJsonResponse(false, 'Envoi trop rapide, êtes-vous un robot ?');
}
if (!empty($_POST['website'])) {
    sendJsonResponse(false, 'Spam détecté.');
}

// Limite d'envoi par IP
$ip = $_SERVER['REMOTE_ADDR'];
$ipFile = sys_get_temp_dir() . '/devis_' . md5($ip);
$ipLimit = 5;
$ipData = @json_decode(@file_get_contents($ipFile), true) ?: ['count' => 0, 'time' => time()];
if (time() - $ipData['time'] > 3600) {
    $ipData = ['count' => 0, 'time' => time()];
}
$ipData['count']++;
if ($ipData['count'] > $ipLimit) {
    sendJsonResponse(false, 'Trop de devis envoyés depuis cette IP. Réessayez plus tard.');
}
file_put_contents($ipFile, json_encode($ipData));

// PHPMailer
require_once __DIR__ . '/../../vendor/autoload.php';
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Lecture des prix
$jsonFile = __DIR__ . '/create_devis.json';
$prixOptions = [];
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
    $mail->SMTPDebug  = 0; // ⚠️ Désactiver la sortie de debug
    $mail->setFrom($env['SMTP_USERNAME'], 'Formulaire Devis');
    $mail->addAddress($env['MAIL_TO']);
    $mail->addReplyTo($_POST['email']);

    // Nettoyage
    $typeApp = htmlspecialchars($_POST['typeApp'], ENT_QUOTES, 'UTF-8');
    $typeProjet = htmlspecialchars($_POST['typeProjet'], ENT_QUOTES, 'UTF-8');
    $email = htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8');
    $comment = !empty($_POST['comment']) ? htmlspecialchars($_POST['comment'], ENT_QUOTES, 'UTF-8') : '';
    $nbPages = htmlspecialchars($_POST['nbPages'], ENT_QUOTES, 'UTF-8');
    $total = htmlspecialchars($_POST['total'], ENT_QUOTES, 'UTF-8');
    $options = isset($_POST['options']) && is_array($_POST['options']) ? array_map(function ($opt) {
        return htmlspecialchars($opt, ENT_QUOTES, 'UTF-8');
    }, $_POST['options']) : [];

    // Contenu
    $mail->isHTML(true);
    $mail->Subject = "Nouveau devis reçu";
    $body = "<h2>Nouveau devis reçu</h2>";
    $body .= "<p><strong>Type d'application :</strong> $typeApp</p>";
    $body .= "<p><strong>Type de projet :</strong> $typeProjet</p>";
    $body .= "<p><strong>Email :</strong> $email</p>";
    if (!empty($options)) {
        $body .= "<h3>Options sélectionnées :</h3><ul>";
        foreach ($options as $opt) {
            $prix = isset($prixOptions[$opt]['price']) ? ' : ' . htmlspecialchars($prixOptions[$opt]['price'], ENT_QUOTES, 'UTF-8') . '€' : '';
            $body .= "<li>$opt$prix</li>";
        }
        $body .= "</ul>";
    }
    if (!empty($comment)) {
        $body .= "<p><strong>Commentaire :</strong> $comment</p>";
    }
    $body .= "<p><strong>Nombre de pages :</strong> $nbPages</p>";
    $body .= "<p><strong>Total estimé :</strong> $total</p>";
    $mail->Body = $body;
    $mail->AltBody = strip_tags($body);

    $mail->send();
    sendJsonResponse(true, 'Votre devis a été envoyé avec succès !');

} catch (Exception $e) {
    sendJsonResponse(false, 'Une erreur est survenue lors de l\'envoi du devis.', $e->getMessage());
}
