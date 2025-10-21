<?php
// Pas d'espace avant !

set_time_limit(10);
header('Content-Type: application/json; charset=utf-8');
session_start();

// Utilitaire JSON
function sendJsonResponse($success, $message, $extra = []) {
    echo json_encode(array_merge([
        'success' => $success,
        'message' => $message
    ], $extra));
    exit;
}

// Limite anti-spam (2 min/session)
if (!isset($_SESSION['last_devis_time'])) $_SESSION['last_devis_time'] = 0;
if (time() - $_SESSION['last_devis_time'] < 120) {
    sendJsonResponse(false, 'Merci de patienter avant de renvoyer un devis.');
}
$_SESSION['last_devis_time'] = time();

// CSRF
if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    sendJsonResponse(false, 'Token CSRF invalide');
}

// Honeypot
if (!empty($_POST['website'])) {
    sendJsonResponse(false, 'Spam détecté.');
}

// Vérif reCAPTCHA
require_once __DIR__ . '/../../vendor/autoload.php';

// Chargement des variables d'environnement
$env = [];
if (file_exists(__DIR__ . '/../../.env')) {
    $env = parse_ini_file(__DIR__ . '/../../.env');
}

// Utilisation des variables d'environnement du serveur si disponibles
$recaptcha_secret = $env['RECAPTCHA_SECRET'] ?? $_ENV['RECAPTCHA_SECRET'] ;

if (empty($recaptcha_secret)) {
    sendJsonResponse(false, 'Clé secrète reCAPTCHA manquante. Veuillez configurer RECAPTCHA_SECRET dans le fichier .env');
}

if (empty($_POST['g-recaptcha-response'])) {
    sendJsonResponse(false, 'Veuillez valider le reCAPTCHA.');
}

$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify", false,
    stream_context_create([
        'http' => [
            'method' => 'POST',
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'content' => http_build_query([
                'secret' => $recaptcha_secret,
                'response' => $_POST['g-recaptcha-response'],
                'remoteip' => $_SERVER['REMOTE_ADDR']
            ])
        ]
    ])
);

$captcha = json_decode($verify, true);
if (!$captcha['success']) {
    sendJsonResponse(false, 'Échec de la vérification reCAPTCHA.', ['error' => $captcha]);
}

// Gestion v3 : vérifier score
if (isset($captcha['score']) && $captcha['score'] < 0.5) {
    sendJsonResponse(false, 'Score reCAPTCHA trop faible.');
}

// Vérification des champs obligatoires
$required = ['typeApp', 'typeProjet', 'email', 'total'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        sendJsonResponse(false, "Le champ $field est requis.");
    }
}

if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(false, 'Email invalide.');
}

// Nettoyage
$typeApp = htmlspecialchars(trim($_POST['typeApp']), ENT_QUOTES, 'UTF-8');
$typeProjet = htmlspecialchars(trim($_POST['typeProjet']), ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars(trim($_POST['email']), ENT_QUOTES, 'UTF-8');
$comment = !empty($_POST['comment']) ? htmlspecialchars(trim($_POST['comment']), ENT_QUOTES, 'UTF-8') : '';
$nbPages = htmlspecialchars($_POST['nbPages'], ENT_QUOTES, 'UTF-8');
$total = htmlspecialchars($_POST['total'], ENT_QUOTES, 'UTF-8');
$promoCode = !empty($_POST['promoCode']) ? htmlspecialchars($_POST['promoCode'], ENT_QUOTES, 'UTF-8') : '';
$options = isset($_POST['options']) && is_array($_POST['options']) ? array_map(function ($opt) {
    return htmlspecialchars($opt, ENT_QUOTES, 'UTF-8');
}, $_POST['options']) : [];

// Envoi mail via PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Configuration SMTP avec valeurs par défaut
$smtp_host = $env['SMTP_HOST'] ?? $_ENV['SMTP_HOST'] ?? 'smtp.gmail.com';
$smtp_username = $env['SMTP_USERNAME'] ?? $_ENV['SMTP_USERNAME'] ?? 'contact@codepath.fr';
$smtp_password = $env['SMTP_PASSWORD'] ?? $_ENV['SMTP_PASSWORD'] ?? '';
$smtp_port = $env['SMTP_PORT'] ?? $_ENV['SMTP_PORT'] ?? 465;
$mail_to = $env['MAIL_TO'] ?? $_ENV['MAIL_TO'] ?? 'contact@codepath.fr';

try {
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $smtp_host;
    $mail->SMTPAuth = true;
    $mail->Username = $smtp_username;
    $mail->Password = $smtp_password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = (int)$smtp_port;
    $mail->CharSet = 'UTF-8';

    $mail->setFrom($smtp_username, 'Formulaire Devis CodePath');
    $mail->addAddress($mail_to);
    $mail->addReplyTo($email);

    $mail->isHTML(true);
    $mail->Subject = "Nouveau devis reçu - $typeApp";
    $mail->Body = "
        <h2>Nouveau devis reçu</h2>
        <p><strong>Type d'application :</strong> $typeApp</p>
        <p><strong>Type de projet :</strong> $typeProjet</p>
        <p><strong>Email :</strong> $email</p>
        <p><strong>Nombre de pages :</strong> $nbPages</p>
        ".(!empty($promoCode) ? "<p><strong>Code promo :</strong> $promoCode</p>" : "")."
        ".(!empty($options) ? "<p><strong>Options :</strong><br>" . implode('<br>', $options) . "</p>" : "")."
        ".(!empty($comment) ? "<p><strong>Commentaire :</strong><br>" . nl2br($comment) . "</p>" : "")."
        <p><strong>Total estimé :</strong> $total</p>
    ";
    $mail->AltBody = strip_tags($mail->Body);

    $mail->send();
    sendJsonResponse(true, 'Votre devis a été envoyé avec succès !');
} catch (Exception $e) {
    sendJsonResponse(false, 'Erreur lors de l\'envoi du devis.', ['error' => $e->getMessage()]);
}