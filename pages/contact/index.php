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
    <title>Contact - CodePath</title>
    <link rel="stylesheet" href="/codepath/style.css">
    <link rel="stylesheet" href="./contact.css">
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
            <div class="logo"><a href="/index.html">CodePath</a></div>
            <div class="menu">
                <a href="/index.html#services">Services</a>
                <a href="/index.html#templates">Templates</a>
                <a href="/pages/contact/index.html">Contact</a>
                <a href="/pages/price/index.html">Tarifs</a>
            </div>
        </div>
    </nav>

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
                        <i class="icon">📧</i>
                        <div>
                            <h3>Email</h3>
                            <p>contact@codepath.com</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="icon">📱</i>
                        <div>
                            <h3>Téléphone</h3>
                            <p>+33 1 23 45 67 89</p>
                        </div>
                    </div>
                    <div class="info-item">
                        <i class="icon">⏰</i>
                        <div>
                            <h3>Horaires</h3>
                            <p>Lun - Ven: 9h - 18h</p>
                        </div>
                    </div>
                </div>

                <form class="contact-form" id="contactForm" action="#" method="POST">
                    <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
                    <div class="form-group">
                        <label for="name">Nom complet</label>
                        <input type="text" id="name" name="name" required>
                    </div>

                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" required>
                    </div>

                    <div class="form-group">
                        <label for="phone">Téléphone</label>
                        <input type="tel" id="phone" name="phone">
                    </div>

                    <div class="form-group">
                        <label for="reason">Raison du contact</label>
                        <?php
                            $devis = isset($_GET['devis']) ? $_GET['devis'] : '';
                            $devis = $devis !== "1" && $devis !== "2" && $devis !== "3" ? '' : $devis;
                        ?>
                        <select id="reason" name="reason" required>
                            <option value="" disabled <?= $devis === '' ? 'selected' : '' ?>>Sélectionnez une raison</option>
                            <option value="site-vitrine" <?= $devis == 1 ? 'selected' : '' ?>>Site Vitrine (50€)</option>
                            <option value="site-dynamique" <?= $devis == 2 ? 'selected' : '' ?>>Site Dynamique (800€)</option>
                            <option value="site-sur-mesure" <?= $devis == 3 ? 'selected' : '' ?>>Site Sur Mesure</option>
                            <option value="question">Question générale</option>
                            <option value="autre">Autre</option>
                        </select>

                    </div>

                    <div class="form-group">
                        <label for="message">Votre message</label>
                        <textarea id="message" name="message" rows="6" required></textarea>
                    </div>

                    <div class="form-group checkbox-group">
                        <input type="checkbox" id="rgpd" name="rgpd" required>
                        <label for="rgpd">J'accepte que mes données soient utilisées pour me recontacter</label>
                    </div>

                    <div class="form-group">
                        <input type="text" name="website" style="display:none" tabindex="-1" autocomplete="off">
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Envoyer le message</button>
                    </div>
                    <div id="formMessage"></div>
                </form>
            </div>
        </section>
    </div>

    <footer>
        <div class="footer-container">
            <div class="footer-col">
                <h3>CodePath</h3>
                <p>Création de sites web professionnels sur mesure pour booster votre présence en ligne.</p>
                <ul class="footer-links">
                    <li><a href="./mentions-legales.html">Mentions Légales</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Liens Rapides</h3>
                <ul class="footer-links">
                    <li><a href="/index.html#services">Services</a></li>
                    <li><a href="/index.html#templates">Templates</a></li>
                    <li><a href="/pages/contact/index.html">Contact</a></li>
                    <li><a href="/pages/price/index.html">Tarifs</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Services</h3>
                <ul class="footer-links">
                    <li><a href="#">Conception Web</a></li>
                    <li><a href="#">Responsive Design</a></li>
                    <li><a href="#">SEO</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Contact</h3>
                <ul class="footer-links">
                    <li><a href="mailto:contact@codepath.com">Email: contact@codepath.com</a></li>
                    <li><a href="tel:+33123456789">Téléphone: +33 1 23 45 67 89</a></li>
                </ul>
            </div>
        </div>
        <div class="copyright">
            <p>&copy; 2025 CodePath. Tous droits réservés.</p>
        </div>
    </footer>

    <script src="https://www.google.com/recaptcha/api.js?render=6Lf1cTorAAAAAClxy4Vi8LaPRJLlirLUlUf2Um5x"></script>
    <script>
        grecaptcha.ready(function() {
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                grecaptcha.execute('6Lf1cTorAAAAAClxy4Vi8LaPRJLlirLUlUf2Um5x', {
                    action: 'contact'
                }).then(function(token) {
                    const formData = new FormData(document.getElementById('contactForm'));
                    formData.append('g-recaptcha-response', token);
                    fetch('./validator.php', {
                            method: 'POST',
                            body: formData
                        })
                        .then(response => response.json())
                        .then(data => {
                            const msgDiv = document.getElementById('formMessage');
                            if (data.success) {
                                msgDiv.innerHTML = '<span style="color:green;">' + data.message + '</span>';
                                document.getElementById('contactForm').reset();
                                fetch('./get_csrf_token.php')
                                    .then(res => res.json())
                                    .then(tokenData => {
                                        if (tokenData.csrf_token) {
                                            document.querySelector('input[name="csrf_token"]').value = tokenData.csrf_token;
                                        }
                                    });
                            } else {
                                let errorMessage = data.message;
                                if (data.errors) {
                                    errorMessage += '<br>' + data.errors.join('<br>');
                                }
                                if (data.error) {
                                    errorMessage += '<br>Détails techniques : ' + data.error;
                                }
                                msgDiv.innerHTML = '<span style="color:red;">' + errorMessage + '</span>';
                            }
                        })
                        .catch(error => {
                            document.getElementById('formMessage').innerHTML = '<span style="color:red;">Erreur lors de l\'envoi du formulaire : ' + error.message + '</span>';
                        });
                });
            });
        });
    </script>
</body>

</html>