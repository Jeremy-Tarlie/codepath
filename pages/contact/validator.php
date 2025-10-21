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
if (!isset($_SESSION['last_contact_time'])) $_SESSION['last_contact_time'] = 0;
if (time() - $_SESSION['last_contact_time'] < 120) {
    sendJsonResponse(false, 'Merci de patienter avant de renvoyer un message.');
}
$_SESSION['last_contact_time'] = time();

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
$recaptcha_secret = $env['RECAPTCHA_SECRET'] ?? $_ENV['RECAPTCHA_SECRET'];

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

// Debug: Log de la réponse reCAPTCHA (à supprimer en production)
error_log("reCAPTCHA Response: " . $verify);
error_log("reCAPTCHA Decoded: " . print_r($captcha, true));

if (!$captcha['success']) {
    $errorDetails = isset($captcha['error-codes']) ? implode(', ', $captcha['error-codes']) : 'Erreur inconnue';
    sendJsonResponse(false, 'Échec de la vérification reCAPTCHA. Erreurs: ' . $errorDetails, ['error' => $captcha]);
}

// Gestion v3 : vérifier score
if (isset($captcha['score']) && $captcha['score'] < 0.5) {
    sendJsonResponse(false, 'Score reCAPTCHA trop faible.');
}

// Vérification des champs obligatoires
$required = ['name', 'email', 'reason', 'message'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        sendJsonResponse(false, "Le champ $field est requis.");
    }
}

if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(false, 'Email invalide.');
}

// Nettoyage
$name = htmlspecialchars(trim($_POST['name']), ENT_QUOTES, 'UTF-8');
$email = htmlspecialchars(trim($_POST['email']), ENT_QUOTES, 'UTF-8');
$reason = htmlspecialchars($_POST['reason'], ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($_POST['message']), ENT_QUOTES, 'UTF-8');
$phone = !empty($_POST['phone']) ? htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8') : '';

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

    $mail->setFrom($smtp_username, 'Formulaire CodePath');
    $mail->addAddress($mail_to);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = "Nouveau message - $reason";
    $mail->Body = "
        <h2>Message de contact</h2>
        <p><strong>Nom :</strong> $name</p>
        <p><strong>Email :</strong> $email</p>
        ".(!empty($phone) ? "<p><strong>Téléphone :</strong> $phone</p>" : "")."
        <p><strong>Raison :</strong> $reason</p>
        <p><strong>Message :</strong><br>".nl2br($message)."</p>
    ";
    $mail->AltBody = strip_tags($mail->Body);

    $mail->send();
    sendJsonResponse(true, 'Votre message a été envoyé avec succès !');
} catch (Exception $e) {
    sendJsonResponse(false, 'Erreur lors de l\'envoi de l\'email.', ['error' => $e->getMessage()]);
}