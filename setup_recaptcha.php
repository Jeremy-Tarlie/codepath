<?php
// Script de configuration automatique reCAPTCHA
header('Content-Type: text/html; charset=utf-8');

$site_key = '6Lf1cTorAAAAAClxy4Vi8LaPRJLlirLUlUf2Um5x';
$env_file = __DIR__ . '/.env';
$env_exists = file_exists($env_file);

// Traitement du formulaire
if ($_POST && isset($_POST['secret_key'])) {
    $secret_key = trim($_POST['secret_key']);
    
    if (empty($secret_key)) {
        $error = "Veuillez saisir votre clé secrète reCAPTCHA";
    } else {
        // Créer ou mettre à jour le fichier .env
        $env_content = "# Configuration reCAPTCHA\n";
        $env_content .= "RECAPTCHA_SITE_KEY=$site_key\n";
        $env_content .= "RECAPTCHA_SECRET=$secret_key\n\n";
        $env_content .= "# Configuration SMTP\n";
        $env_content .= "SMTP_HOST=smtp.gmail.com\n";
        $env_content .= "SMTP_USERNAME=contact@codepath.fr\n";
        $env_content .= "SMTP_PASSWORD=your_email_password\n";
        $env_content .= "SMTP_PORT=465\n";
        $env_content .= "MAIL_TO=contact@codepath.fr\n";
        
        if (file_put_contents($env_file, $env_content)) {
            $success = "Configuration reCAPTCHA sauvegardée avec succès !";
            $env_exists = true;
        } else {
            $error = "Erreur lors de la sauvegarde du fichier .env";
        }
    }
}
?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Configuration reCAPTCHA - CodePath</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .container { background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .success { background: #d4edda; color: #155724; border: 1px solid #c3e6cb; }
        .error { background: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
        .warning { background: #fff3cd; color: #856404; border: 1px solid #ffeaa7; }
        input[type="text"] { width: 100%; padding: 10px; margin: 10px 0; border: 1px solid #ddd; border-radius: 4px; }
        button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; }
        button:hover { background: #0056b3; }
        .code { background: #f8f9fa; padding: 10px; border-radius: 4px; font-family: monospace; }
        .step { margin: 15px 0; padding: 10px; background: white; border-radius: 4px; }
    </style>
</head>
<body>
    <h1>🔧 Configuration reCAPTCHA - CodePath</h1>
    
    <?php if (isset($success)): ?>
        <div class="container success">
            <h3>✅ Succès</h3>
            <p><?= htmlspecialchars($success) ?></p>
            <p><a href="/test_recaptcha.php" target="_blank">Tester la configuration</a> | 
               <a href="/contact/" target="_blank">Tester le formulaire de contact</a></p>
        </div>
    <?php endif; ?>
    
    <?php if (isset($error)): ?>
        <div class="container error">
            <h3>❌ Erreur</h3>
            <p><?= htmlspecialchars($error) ?></p>
        </div>
    <?php endif; ?>
    
    <div class="container">
        <h3>📊 État actuel</h3>
        <ul>
            <li><strong>Clé publique :</strong> <?= htmlspecialchars($site_key) ?></li>
            <li><strong>Fichier .env :</strong> <?= $env_exists ? '✅ Existe' : '❌ Manquant' ?></li>
            <li><strong>Configuration :</strong> <?= $env_exists ? '✅ Configurée' : '❌ Non configurée' ?></li>
        </ul>
    </div>
    
    <?php if (!$env_exists || !isset($success)): ?>
        <div class="container">
            <h3>🔑 Configuration de la clé secrète</h3>
            
            <div class="step">
                <h4>Étape 1 : Récupérer votre clé secrète</h4>
                <ol>
                    <li>Allez sur <a href="https://www.google.com/recaptcha/admin" target="_blank">Google reCAPTCHA Admin</a></li>
                    <li>Trouvez votre site avec la clé publique : <code><?= htmlspecialchars($site_key) ?></code></li>
                    <li>Copiez la <strong>clé secrète</strong> (Secret Key)</li>
                </ol>
            </div>
            
            <div class="step">
                <h4>Étape 2 : Saisir la clé secrète</h4>
                <form method="POST">
                    <label for="secret_key">Clé secrète reCAPTCHA :</label>
                    <input type="text" id="secret_key" name="secret_key" 
                           placeholder="6Lf1cTorAAAAAClxy4Vi8LaPRJLlirLUlUf2Um5x_SECRET" required>
                    <button type="submit">Sauvegarder la configuration</button>
                </form>
            </div>
        </div>
    <?php endif; ?>
    
    <div class="container warning">
        <h3>⚠️ Alternative : Configuration manuelle</h3>
        <p>Si vous préférez configurer manuellement, créez un fichier <code>.env</code> à la racine avec :</p>
        <div class="code">
# Configuration reCAPTCHA<br>
RECAPTCHA_SITE_KEY=<?= htmlspecialchars($site_key) ?><br>
RECAPTCHA_SECRET=votre_cle_secrete_ici<br><br>
# Configuration SMTP<br>
SMTP_HOST=smtp.gmail.com<br>
SMTP_USERNAME=contact@codepath.fr<br>
SMTP_PASSWORD=your_email_password<br>
SMTP_PORT=465<br>
MAIL_TO=contact@codepath.fr
        </div>
    </div>
    
    <div class="container">
        <h3>🔍 Codes d'erreur reCAPTCHA courants</h3>
        <ul>
            <li><code>missing-input-secret</code> : Clé secrète manquante</li>
            <li><code>invalid-input-secret</code> : Clé secrète invalide</li>
            <li><code>missing-input-response</code> : Token reCAPTCHA manquant</li>
            <li><code>invalid-input-response</code> : Token reCAPTCHA invalide</li>
            <li><code>bad-request</code> : Requête malformée</li>
        </ul>
    </div>
    
    <div class="container">
        <h3>🔗 Liens utiles</h3>
        <ul>
            <li><a href="/test_recaptcha.php" target="_blank">Tester la configuration reCAPTCHA</a></li>
            <li><a href="/contact/" target="_blank">Formulaire de contact</a></li>
            <li><a href="/devis/" target="_blank">Formulaire de devis</a></li>
            <li><a href="https://www.google.com/recaptcha/admin" target="_blank">Google reCAPTCHA Admin</a></li>
        </ul>
    </div>
</body>
</html>
