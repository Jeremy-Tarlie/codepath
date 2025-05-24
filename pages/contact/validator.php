<?php
// NE RIEN METTRE AVANT CE PHP, PAS D'ESPACE, PAS DE LIGNE VIDE

// Timeout serveur : limite à 10 secondes
set_time_limit(10);

// Limite de taille totale de la requête POST (10 Ko)
if ($_SERVER['REQUEST_METHOD'] === 'POST' && (int) $_SERVER['CONTENT_LENGTH'] > 10240) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'message' => 'La requête est trop volumineuse.'
    ]);
    exit;
}

// Protection contre les injections d'en-têtes
if (isset($_POST['name']) && preg_match('/\r|\n/', $_POST['name'])) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'message' => 'Caractères interdits détectés dans le nom.'
    ]);
    exit;
}
if (isset($_POST['email']) && preg_match('/\r|\n/', $_POST['email'])) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode([
        'success' => false,
        'message' => 'Caractères interdits détectés dans l\'email.'
    ]);
    exit;
}

// Pour le debug temporaire :
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

register_shutdown_function(function() {
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

// Définir le type de contenu comme JSON
header('Content-Type: application/json; charset=utf-8');

// Fonction pour envoyer une réponse JSON
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

// Chargement des variables d'environnement
$envFile = __DIR__ . '/../../.env';
if (!file_exists($envFile)) {
    sendJsonResponse(false, 'Fichier de configuration manquant');
}

$env = parse_ini_file($envFile);
if ($env === false) {
    sendJsonResponse(false, 'Erreur de lecture du fichier de configuration');
}

// Vérification des variables d'environnement requises
$requiredEnvVars = ['MAIL_TO', 'SMTP_HOST', 'SMTP_PORT', 'SMTP_USERNAME', 'SMTP_PASSWORD'];
foreach ($requiredEnvVars as $var) {
    if (empty($env[$var])) {
        sendJsonResponse(false, "Configuration manquante : $var");
    }
}

// Vérification de la méthode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(false, 'Méthode non autorisée');
}

// Vérification du token CSRF
session_start();
// Limite anti-spam : 1 message toutes les 2 minutes par session
if (!isset($_SESSION['last_contact_time'])) {
    $_SESSION['last_contact_time'] = 0;
}
$now = time();
if ($now - $_SESSION['last_contact_time'] < 120) { // 120 secondes = 2 minutes
    sendJsonResponse(false, 'Merci de patienter avant de renvoyer un message.');
}
$_SESSION['last_contact_time'] = $now;

if (!isset($_POST['csrf_token']) || $_POST['csrf_token'] !== $_SESSION['csrf_token']) {
    sendJsonResponse(false, 'Token CSRF invalide');
}

// Vérification du reCAPTCHA Google
if (empty($_POST['g-recaptcha-response'])) {
    sendJsonResponse(false, 'Veuillez valider le reCAPTCHA.');
}
if (empty($env['RECAPTCHA_SECRET'])) {
    sendJsonResponse(false, 'Clé secrète reCAPTCHA manquante dans la configuration.');
}
$recaptchaSecret = $env['RECAPTCHA_SECRET'];
$recaptchaResponse = $_POST['g-recaptcha-response'];
$recaptcha = file_get_contents(
    'https://www.google.com/recaptcha/api/siteverify?secret=' . urlencode($recaptchaSecret) . '&response=' . urlencode($recaptchaResponse) . '&remoteip=' . $_SERVER['REMOTE_ADDR']
);
$recaptcha = json_decode($recaptcha, true);
if (!$recaptcha['success']) {
    sendJsonResponse(false, 'Échec de la vérification reCAPTCHA.');
}
// Pour reCAPTCHA v3, vérifiez le score (par exemple, seuil à 0.5)
if (!isset($recaptcha['score']) || $recaptcha['score'] < 0.5) {
    sendJsonResponse(false, 'Score reCAPTCHA trop faible, suspicion de robot.');
}

// Vérification des champs requis
$requiredFields = ['name', 'email', 'reason', 'message'];
foreach ($requiredFields as $field) {
    if (empty($_POST[$field])) {
        sendJsonResponse(false, 'Tous les champs obligatoires doivent être remplis');
    }
}

// Validation de l'email
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    sendJsonResponse(false, 'Email invalide');
}

// Blacklist d'adresses email ou de domaines
$blacklistedDomains = ['yopmail.com', 'mailinator.com', 'tempmail.com'];
$emailDomain = strtolower(substr(strrchr($_POST['email'], '@'), 1));
if (in_array($emailDomain, $blacklistedDomains)) {
    sendJsonResponse(false, 'Adresse email non autorisée.');
}

// Vérification DNS de l'email
if (!checkdnsrr($emailDomain, 'MX')) {
    sendJsonResponse(false, 'Le domaine de l\'email n\'est pas valide.');
}

// Délais anti-bot (temps minimum avant soumission)
if (isset($_SESSION['form_display_time']) && (time() - $_SESSION['form_display_time'] < 3)) {
    sendJsonResponse(false, 'Envoi trop rapide, êtes-vous un robot ?');
}

// Log des tentatives suspectes (exemple : email blacklisté, domaine invalide, délai trop court)
function logSuspiciousAttempt($reason, $data) {
    $logFile = __DIR__ . '/contact_suspicious.log';
    $entry = date('Y-m-d H:i:s') . " | $reason | " . json_encode($data) . "\n";
    file_put_contents($logFile, $entry, FILE_APPEND);
}
if (in_array($emailDomain, $blacklistedDomains)) {
    logSuspiciousAttempt('Email blacklisté', $_POST);
}
if (!checkdnsrr($emailDomain, 'MX')) {
    logSuspiciousAttempt('Domaine email invalide', $_POST);
}
if (isset($_SESSION['form_display_time']) && (time() - $_SESSION['form_display_time'] < 3)) {
    logSuspiciousAttempt('Soumission trop rapide', $_POST);
}

// Validation du téléphone (optionnel mais doit être correct si renseigné)
if (!empty($_POST['phone'])) {
    $phone = $_POST['phone'];
    // Accepte les formats français/internationaux, espaces, tirets, points
    if (!preg_match('/^(\+\d{1,3}[-.\s]?)?(\d{10}|(\d{2}[-.\s]?){5})$/', $phone)) {
        sendJsonResponse(false, 'Numéro de téléphone invalide');
    }
}

// Validation de la raison du contact
$allowedReasons = ['site-vitrine', 'site-dynamique', 'site-sur-mesure', 'question', 'autre'];
if (!in_array($_POST['reason'], $allowedReasons, true)) {
    sendJsonResponse(false, 'Raison du contact invalide');
}

// Validation du nom
$name = trim($_POST['name']);
if (mb_strlen($name) < 2 || !preg_match('/^[a-zA-ZÀ-ÿ\' -]+$/u', $name)) {
    sendJsonResponse(false, 'Nom invalide');
}

// Validation du message
$message = trim($_POST['message']);
if (mb_strlen($message) < 10) {
    sendJsonResponse(false, 'Le message est trop court (10 caractères minimum)');
}
if (mb_strlen($message) > 2000) {
    sendJsonResponse(false, 'Le message est trop long (2000 caractères maximum)');
}

// Validation de la case RGPD
if (!isset($_POST['rgpd'])) {
    sendJsonResponse(false, 'Vous devez accepter l\'utilisation de vos données pour être recontacté.');
}

// Honeypot : champ caché 'website' (doit rester vide)
if (!empty($_POST['website'])) {
    sendJsonResponse(false, 'Spam détecté.');
}

// Désactivation de l'envoi si User-Agent suspect
if (empty($_SERVER['HTTP_USER_AGENT']) || preg_match('/(curl|wget|bot|spider|crawl)/i', $_SERVER['HTTP_USER_AGENT'])) {
    sendJsonResponse(false, 'User-Agent non autorisé.');
}

// Limite de tentatives par IP (5 messages max par heure)
$ip = $_SERVER['REMOTE_ADDR'];
$ipFile = sys_get_temp_dir() . '/contact_' . md5($ip);
$ipLimit = 5; // 5 messages max par heure
$ipData = @json_decode(@file_get_contents($ipFile), true) ?: ['count' => 0, 'time' => time()];
if (time() - $ipData['time'] > 3600) {
    $ipData = ['count' => 0, 'time' => time()];
}
$ipData['count']++;
if ($ipData['count'] > $ipLimit) {
    sendJsonResponse(false, 'Trop de messages envoyés depuis cette adresse IP. Réessayez plus tard.');
}
file_put_contents($ipFile, json_encode($ipData));

// Anti-liens et anti-spam dans le message
if (preg_match('/https?:\/\/|www\./i', $message)) {
    sendJsonResponse(false, 'Les liens ne sont pas autorisés dans le message.');
}

// Protection contre les champs identiques (anti-spam)
if (
    isset($_POST['name'], $_POST['email'], $_POST['message']) &&
    (
        strtolower(trim($_POST['name'])) === strtolower(trim($_POST['email'])) ||
        strtolower(trim($_POST['name'])) === strtolower(trim($_POST['message'])) ||
        strtolower(trim($_POST['email'])) === strtolower(trim($_POST['message']))
    )
) {
    sendJsonResponse(false, 'Les champs nom, email et message ne doivent pas être identiques.');
}

// Chargement de PHPMailer
require_once __DIR__ . '/../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

try {
    // Configuration de PHPMailer
    $mail = new PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = $env['SMTP_HOST'];
    $mail->SMTPAuth = true;
    $mail->Username = $env['SMTP_USERNAME'];
    $mail->Password = $env['SMTP_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = (int)$env['SMTP_PORT'];
    $mail->CharSet = 'UTF-8';

    // Timeout SMTP pour éviter les blocages longs
    $mail->Timeout = 10; // 10 secondes max pour la connexion SMTP
    $mail->SMTPDebug = 2; // Debug SMTP dans les logs PHP
    $mail->Debugoutput = 'error_log'; // Les logs SMTP vont dans error_log

    // Configuration des destinataires
    $mail->setFrom($env['SMTP_USERNAME'], 'Formulaire de Contact');
    $mail->addAddress($env['MAIL_TO']);
    $mail->addReplyTo($_POST['email'], $_POST['name']);

    // Nettoyage des données
    $name = isset($_POST['name']) ? htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8') : '';
    $email = isset($_POST['email']) ? htmlspecialchars($_POST['email'], ENT_QUOTES, 'UTF-8') : '';
    $reason = isset($_POST['reason']) ? htmlspecialchars($_POST['reason'], ENT_QUOTES, 'UTF-8') : '';
    $message = isset($_POST['message']) ? htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8') : '';
    $phone = !empty($_POST['phone']) ? htmlspecialchars($_POST['phone'], ENT_QUOTES, 'UTF-8') : '';

    // Contenu de l'email
    $mail->isHTML(true);
    $mail->Subject = "Nouveau message de contact - " . $reason;

    $emailContent = "
        <h2>Nouveau message de contact</h2>
        <p><strong>Nom :</strong> {$name}</p>
        <p><strong>Email :</strong> {$email}</p>";

    if (!empty($phone)) {
        $emailContent .= "<p><strong>Téléphone :</strong> {$phone}</p>";
    }

    $emailContent .= "
        <p><strong>Raison :</strong> {$reason}</p>
        <h3>Message :</h3>
        <p>" . nl2br($message) . "</p>";

    $mail->Body = $emailContent;
    $mail->AltBody = strip_tags($emailContent);

    // Journalisation (optionnel)
    error_log('PHPMailer va tenter d\'envoyer le mail...');

    // Envoi de l'email
    $mail->send();
    
    // Journalisation du succès (optionnel)
    // error_log("Email envoyé avec succès à : " . $env['MAIL_TO']);
    
    sendJsonResponse(true, 'Votre message a été envoyé avec succès !');

} catch (Exception $e) {
    // Journalisation de l'erreur (optionnel)
    // error_log("Erreur d'envoi d'email : " . $e->getMessage());

    sendJsonResponse(false, 'Une erreur est survenue lors de l\'envoi du message', $e->getMessage());
}