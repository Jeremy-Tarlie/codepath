<?php
session_start();
if (!isset($_SESSION['csrf_token'])) {
    $_SESSION['csrf_token'] = bin2hex(random_bytes(16));
}
// Initialisation du délai anti-bot
$_SESSION['form_display_time'] = time();
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>Contact - CodePath | Demander un Devis Gratuit | Développeur Web Freelance</title>
    <meta name="description" content="Contactez CodePath pour votre projet web. Devis gratuit et personnalisé pour création de sites web professionnels. Développeur web freelance en France.">
    <meta name="keywords" content="contact développeur web, devis site web gratuit, création site web France, développeur freelance, contact CodePath">
    <meta name="author" content="CodePath - Jérémy TARLIÉ">
    <meta name="robots" content="index, follow">
    <meta name="language" content="French">
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://codepath.fr/contact/">
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://codepath.fr/contact/">
    <meta property="og:title" content="Contact - CodePath | Demander un Devis Gratuit">
    <meta property="og:description" content="Contactez CodePath pour votre projet web. Devis gratuit et personnalisé pour création de sites web professionnels.">
    <meta property="og:image" content="https://codepath.fr/logo-1x1.jpg">
    <meta property="og:site_name" content="CodePath">
    <meta property="og:locale" content="fr_FR">
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="https://codepath.fr/contact/">
    <meta property="twitter:title" content="Contact - CodePath | Devis Gratuit">
    <meta property="twitter:description" content="Contactez CodePath pour votre projet web. Devis gratuit et personnalisé.">
    <meta property="twitter:image" content="https://codepath.fr/logo-1x1.jpg">
    
    <!-- Favicon -->
    <link rel="icon" type="image/jpeg" href="/logo-1x1.jpg">
    <link rel="apple-touch-icon" href="/logo-1x1.jpg">
    
    <!-- Preconnect pour améliorer les performances -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preconnect" href="https://www.google.com">
    <link rel="preconnect" href="https://www.gstatic.com">
    
    <!-- CSS -->
    <link rel="stylesheet" href="/style.css">
    <link rel="stylesheet" href="/contact.css">
    
    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact CodePath",
        "description": "Page de contact pour demander un devis de création de site web",
        "url": "https://codepath.fr/contact/",
        "mainEntity": {
            "@type": "Organization",
            "name": "CodePath",
            "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+33-6-72-61-79-96",
                "contactType": "customer service",
                "email": "contact@codepath.fr",
                "availableLanguage": "French",
                "areaServed": "FR"
            }
        }
    }
    </script>
    
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": "Accueil",
                "item": "https://codepath.fr"
            },
            {
                "@type": "ListItem",
                "position": 2,
                "name": "Contact",
                "item": "https://codepath.fr/contact/"
            }
        ]
    }
    </script>
</head>

<body>
    <header>
        <div class="container">
            <h1>Expert en création de sites web</h1>
            <p>Solutions personnalisées pour votre présence en ligne</p>
        </div>
    </header>

    <nav>
        <div class="nav-container">
            <div class="logo"><a href="/" aria-label="CodePath - Accueil">CodePath</a></div>
            <div class="menu">
                <a href="/#services" aria-label="Voir nos services">Services</a>
                <a href="/#templates" aria-label="Découvrir nos templates">Templates</a>
                <a href="/contact/" aria-label="Nous contacter" aria-current="page">Contact</a>
                <a href="/price/" aria-label="Voir nos tarifs">Tarifs</a>
            </div>
        </div>
    </nav>

    <main>
        <div class="container">
            <section class="hero">
                <h1>Contactez-moi</h1>
                <p>Je suis à votre écoute pour réaliser votre projet web</p>
            </section>

            <section class="contact-section">
                <div class="contact-container">
                    <div class="contact-info-box">
                        <h2>Informations de contact</h2>
                        <div class="info-item">
                            <i class="icon" aria-hidden="true">📧</i>
                            <div>
                                <h3>Email</h3>
                                <p><a href="mailto:contact@codepath.fr" aria-label="Envoyer un email à contact@codepath.fr" class="contact-link">contact@codepath.fr</a></p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="icon" aria-hidden="true">📱</i>
                            <div>
                                <h3>Téléphone</h3>
                                <p><a href="tel:+33672617996" aria-label="Appeler le +33 6 72 61 79 96" class="contact-link">+33 6 72 61 79 96</a></p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="icon" aria-hidden="true">⏰</i>
                            <div>
                                <h3>Horaires</h3>
                                <p>Lun - Ven: 9h - 18h</p>
                            </div>
                        </div>
                    </div>

                    <form class="contact-form" id="contactForm" action="#" method="POST" aria-label="Formulaire de contact">
                        <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
                        
                        <div class="form-group">
                            <label for="name">Nom complet </label>
                            <input type="text" id="name" name="name" required aria-describedby="name-help">
                            <div id="name-help" class="help-text">Votre nom complet pour vous recontacter</div>
                        </div>

                        <div class="form-group">
                            <label for="email">Email </label>
                            <input type="email" id="email" name="email" required aria-describedby="email-help">
                            <div id="email-help" class="help-text">Votre adresse email pour vous recontacter</div>
                        </div>

                        <div class="form-group">
                            <label for="phone">Téléphone</label>
                            <input type="tel" id="phone" name="phone" aria-describedby="phone-help">
                            <div id="phone-help" class="help-text">Optionnel - pour un contact plus rapide</div>
                        </div>

                        <div class="form-group">
                            <label for="reason">Raison du contact </label>
                            <?php
                                $devis = isset($_GET['devis']) ? $_GET['devis'] : '';
                                $devis = $devis !== "1" && $devis !== "2" && $devis !== "3" ? '' : $devis;
                            ?>
                            <select id="reason" name="reason" required aria-describedby="reason-help">
                                <option value="" disabled <?= $devis === '' ? 'selected' : '' ?>>Sélectionnez une raison</option>
                                <option value="site-vitrine" <?= $devis == 1 ? 'selected' : '' ?>>Site Vitrine (800€)</option>
                                <option value="site-dynamique" <?= $devis == 2 ? 'selected' : '' ?>>Site Dynamique (1800€)</option>
                                <option value="site-sur-mesure" <?= $devis == 3 ? 'selected' : '' ?>>Site Sur Mesure</option>
                                <option value="question">Question générale</option>
                                <option value="autre">Autre</option>
                            </select>
                            <div id="reason-help" class="help-text">Sélectionnez le type de projet qui vous intéresse</div>
                        </div>

                        <div class="form-group">
                            <label for="message">Votre message </label>
                            <textarea id="message" name="message" rows="6" required aria-describedby="message-help" placeholder="Décrivez votre projet, vos besoins et vos attentes..."></textarea>
                            <div id="message-help" class="help-text">Décrivez votre projet en détail pour un devis précis</div>
                        </div>

                        <div class="form-group checkbox-group">
                            <input type="checkbox" id="rgpd" name="rgpd" required aria-describedby="rgpd-help">
                            <label for="rgpd">J'accepte que mes données soient utilisées pour me recontacter </label>
                            <div id="rgpd-help" class="help-text">Conformément au RGPD, vos données ne seront utilisées que pour vous recontacter</div>
                        </div>

                        <div class="form-group">
                            <input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off" aria-hidden="true">
                        </div>
                        
                        <div class="form-group">
                            <button type="submit" class="btn btn-primary" aria-label="Envoyer le message de contact">Envoyer le message</button>
                        </div>
                        
                        <div id="formMessage" role="alert" aria-live="polite"></div>
                    </form>
                </div>
            </section>
        </div>
    </main>

    <footer>
        <div class="footer-container">
            <div class="footer-col">
                <h3>CodePath</h3>
                <p>Création de sites web professionnels sur mesure pour booster votre présence en ligne.</p>
                <ul class="footer-links">
                    <li><a href="/mentions-legales/" aria-label="Mentions légales">Mentions Légales</a></li>
                    <li><a href="/politique-confidentialite/" aria-label="Politique de confidentialité">Politique de Confidentialité</a></li>
                    <li><a href="/politique-cookies/" aria-label="Politique des cookies">Politique des Cookies</a></li>
                    <li><a href="/conditions-generales/" aria-label="Conditions générales">Conditions Générales</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Liens Rapides</h3>
                <ul class="footer-links">
                    <li><a href="/#services" aria-label="Nos services">Services</a></li>
                    <li><a href="/#templates" aria-label="Nos templates">Templates</a></li>
                    <li><a href="/contact/" aria-label="Nous contacter" aria-current="page">Contact</a></li>
                    <li><a href="/price/" aria-label="Nos tarifs">Tarifs</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Services</h3>
                <ul class="footer-links">
                    <li><a href="/contact/?devis=1" aria-label="Conception web">Conception Web</a></li>
                    <li><a href="/contact/?devis=2" aria-label="Responsive design">Responsive Design</a></li>
                    <li><a href="/contact/?devis=3" aria-label="Optimisation SEO">SEO</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Contact</h3>
                <ul class="footer-links">
                    <li><a href="mailto:contact@codepath.fr" aria-label="Envoyer un email">Email: contact@codepath.fr</a></li>
                    <li><a href="tel:+33672617996" aria-label="Appeler par téléphone">Téléphone: +33 6 72 61 79 96</a></li>
                </ul>
            </div>
        </div>
        <div class="copyright">
            <p>&copy; 2025 CodePath. Tous droits réservés.</p>
        </div>
    </footer>

    <!-- Script reCAPTCHA - Chargement asynchrone et paresseux -->
    <script>
        // Fonction pour charger reCAPTCHA de manière paresseuse
        function loadRecaptcha() {
            return new Promise((resolve, reject) => {
                if (window.grecaptcha) {
                    resolve();
                    return;
                }
                
                const script = document.createElement('script');
                script.src = 'https://www.google.com/recaptcha/api.js?render=6Lf1cTorAAAAAClxy4Vi8LaPRJLlirLUlUf2Um5x';
                script.async = true;
                script.defer = true;
                script.onload = () => {
                    grecaptcha.ready(resolve);
                };
                script.onerror = reject;
                document.head.appendChild(script);
            });
        }

        // Charger reCAPTCHA quand l'utilisateur interagit avec le formulaire
        let recaptchaLoaded = false;
        const form = document.getElementById('contactForm');
        
        // Charger reCAPTCHA au focus sur le formulaire
        form.addEventListener('focusin', function() {
            if (!recaptchaLoaded) {
                recaptchaLoaded = true;
                loadRecaptcha().catch(console.error);
            }
        }, { once: true });

        // Gestionnaire de soumission du formulaire
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = 'Envoi en cours...';
            submitButton.disabled = true;

            loadRecaptcha().then(() => {
                return grecaptcha.execute('6Lf1cTorAAAAAClxy4Vi8LaPRJLlirLUlUf2Um5x', {action: 'contact'});
            }).then(function (token) {
                console.log("reCAPTCHA token:", token);

                if (!token) {
                    document.getElementById('formMessage').innerHTML =
                        '<span style="color:red;">Impossible de générer le token reCAPTCHA.</span>';
                    return;
                }

                const formData = new FormData(form);
                formData.append('g-recaptcha-response', token);

                return fetch('/contact/validator.php', {
                    method: 'POST',
                    body: formData
                });
            }).then(res => res.json()).then(data => {
                const msgDiv = document.getElementById('formMessage');
                if (data.success) {
                    msgDiv.innerHTML = '<span style="color:green;">' + data.message + '</span>';
                    form.reset();

                    // Recharger un nouveau CSRF
                    fetch('/contact/get_csrf_token.php')
                        .then(res => res.json())
                        .then(csrf => {
                            if (csrf.csrf_token) {
                                document.querySelector('input[name="csrf_token"]').value = csrf.csrf_token;
                            }
                        });
                } else {
                    msgDiv.innerHTML = '<span style="color:red;">' + data.message + '</span>';
                }
            }).catch(error => {
                console.error('Form error:', error);
                document.getElementById('formMessage').innerHTML =
                    '<span style="color:red;">Erreur lors de l\'envoi du formulaire.</span>';
            }).finally(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        });
    </script>
</body>

</html>