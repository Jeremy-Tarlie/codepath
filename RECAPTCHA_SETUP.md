# 🔧 Résolution du problème reCAPTCHA

## ❌ Problème actuel
"Échec de la vérification reCAPTCHA" - La clé secrète reCAPTCHA n'est pas configurée.

## ✅ Solution

### 1. Récupérer votre clé secrète reCAPTCHA
1. Allez sur [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Trouvez votre site avec la clé publique : `6Lf1cTorAAAAAClxy4Vi8LaPRJLlirLUlUf2Um5x`
3. Copiez la **clé secrète** (Secret Key)

### 2. Créer le fichier .env
Créez un fichier `.env` à la racine de votre projet avec ce contenu :

```env
# Configuration reCAPTCHA
RECAPTCHA_SITE_KEY=6Lf1cTorAAAAAClxy4Vi8LaPRJLlirLUlUf2Um5x
RECAPTCHA_SECRET=VOTRE_CLE_SECRETE_ICI

# Configuration SMTP
SMTP_HOST=smtp.gmail.com
SMTP_USERNAME=contact@codepath.fr
SMTP_PASSWORD=votre_mot_de_passe_email
SMTP_PORT=465
MAIL_TO=contact@codepath.fr
```

### 3. Alternative : Variables d'environnement du serveur
Si vous ne pouvez pas créer de fichier .env, définissez la variable d'environnement :
```bash
export RECAPTCHA_SECRET=votre_cle_secrete_ici
```

### 4. Tester la configuration
1. Visitez : `https://codepath.fr/test_recaptcha.php`
2. Vérifiez que la configuration est correcte
3. Testez le formulaire de contact

## 🔍 Codes d'erreur reCAPTCHA courants
- `missing-input-secret` : Clé secrète manquante
- `invalid-input-secret` : Clé secrète invalide
- `missing-input-response` : Token reCAPTCHA manquant
- `invalid-input-response` : Token reCAPTCHA invalide
- `bad-request` : Requête malformée

## 📝 Notes importantes
- La clé publique et la clé secrète doivent correspondre au même site reCAPTCHA
- Vérifiez que le domaine `codepath.fr` est bien configuré dans reCAPTCHA
- Le fichier `.env` ne doit pas être accessible publiquement (déjà protégé par .htaccess)

