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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Mes Services et Templates</title>
    <link rel="icon" type="image/jpeg" href="/logo-1x1.jpg">
    <link rel="stylesheet" href="/style.css" />
    <link rel="stylesheet" href="/devis.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
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
            <div class="logo"><a href="/">CodePath</a></div>
            <div class="menu">
                <a href="/#services">Services</a>
                <a href="/#templates">Templates</a>
                <a href="/contact/">Contact</a>
                <a href="/price/">Tarifs</a>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="devis-container">
            <h1>Simulateur de devis</h1>
        </div>
        <form class="devis-form-container" id="devisForm">
            <input type="hidden" name="csrf_token" value="<?php echo $_SESSION['csrf_token']; ?>">
            <div class="devis-form">
                <div class="form-group">
                    <label for="typeApp">Type d'application :</label>
                    <div class="dropdown">
                        <input
                            type="text"
                            id="typeAppInput"
                            placeholder="Rechercher un type d'application..."
                            onkeyup="filterFunction()"
                            name="typeAppInput"
                            required
                            autocomplete="off" />
                        <div id="typeAppDropdown" class="dropdown-content">
                            <!-- Les options seront générées dynamiquement ici -->
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="typeProjet">Type de projet :</label>
                    <div class="dropdown">
                        <input
                            type="text"
                            id="typeProjetInput"
                            placeholder="Rechercher un type de projet..."
                            onkeyup="filterProjetFunction()"
                            disabled
                            name="typeProjetInput"
                            required
                            autocomplete="off" />
                        <div id="typeProjetDropdown" class="dropdown-content"></div>
                    </div>
                </div>

                <div class="form-group">
                    <label for="nbPages">Nombre de pages :</label>
                    <input
                        type="number"
                        id="nbPages"
                        name="nbPages"
                        min="1"
                        value="1"
                        placeholder="Entrez le nombre de pages..."
                        required 
                        onchange="updateTotal()"
                        />
                </div>

                <div class="form-group">
                    <label>Options :</label>
                    <div id="optionsContainer" class="options-container">
                        <!-- Les options JS s'affichent ici -->
                    </div>
                </div>

                <div class="form-group">
                    <label for="email">Email :</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Entrez votre email..."
                        required />
                </div>
                <div class="form-group">
                    <label for="promoCode">Code promo :</label>
                    <input
                        type="text"
                        id="promoCode"
                        name="promoCode"
                        placeholder="Entrez votre code promo..."
                        onchange="updateTotal()" />
                </div>

                <div class="form-group">
                    <label for="comment">Commentaire :</label>
                    <textarea
                        id="comment"
                        name="comment"
                        rows="3"
                        placeholder="Décrivez votre projet et vos besoins, ainsi que vos options personnalisées ici..."></textarea>
                </div>

                <div class="total-container">
                    <p class="devis-info-p">
                        Le prix peut varier en fonction de la complexité du projet. Et
                        en fonction des options choisies.
                    </p>
                    <div class="total-container-div">
                        <div class="total-title">
                            <h3>Total :</h3>
                            <p>
                                Le prix total est de :
                                <span class="total-amount"></span>
                            </p>
                        </div>
                        <div>
                            <button class="btn-primary" type="submit" name="submit" id="submit-btn">Récapitulatif</button>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>

    <footer>
        <div class="footer-container">
            <div class="footer-col">
                <h3>CodePath</h3>
                <p>
                    Création de sites web professionnels sur mesure pour booster votre
                    présence en ligne.
                </p>
                <ul class="footer-links">
                    <li>
                        <a href="/mentions-legales/">Mentions Légales</a>
                    </li>
                    <li>
                        <a href="/politique-confidentialite/">Politique de Confidentialité</a>
                    </li>
                    <li>
                        <a href="/politique-cookies/">Politique des Cookies</a>
                    </li>
                    <li>
                        <a href="/conditions-generales/">Conditions Générales</a>
                    </li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Liens Rapides</h3>
                <ul class="footer-links">
                    <li><a href="/#services">Services</a></li>
                    <li><a href="/#templates">Templates</a></li>
                    <li><a href="/contact/">Contact</a></li>
                    <li><a href="/price/">Tarifs</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Services</h3>
                <ul class="footer-links">
                    <li><a href="/#services">Conception Web</a></li>
                    <li><a href="/#services">Responsive Design</a></li>
                    <li><a href="/#services">SEO</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h3>Contact</h3>
                <ul class="footer-links">
                    <li>
                        <a href="mailto:contact@codepath.fr">Email: contact@codepath.fr</a>
                    </li>
                    <li><a href="tel:+33672617996">Téléphone: +33 6 72 61 79 96</a></li>
                </ul>
            </div>
        </div>
        <div class="copyright">
            <p>&copy; 2025 CodePath. Tous droits réservés.</p>
        </div>
    </footer>

    <!-- Modals pour les templates -->
    <div id="templateModal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <span class="close-btn" onclick="closeModal()">&times;</span>
                <h2 class="modal-title">Récapitulatif du devis</h2>
                <p class="modal-subtitle">Votre projet personnalisé</p>
            </div>

            <div class="modal-body">
                <!-- Informations du projet -->
                <div class="info-section">

                    <div class="info-row">
                        <div class="info-icon">🌐</div>
                        <div class="info-content">
                            <div class="info-label">Type d'application</div>
                            <div class="info-value" id="modal-type-app-value"></div>
                        </div>
                    </div>

                    <div class="info-row">
                        <div class="info-icon">⚙️</div>
                        <div class="info-content">
                            <div class="info-label">Type de projet</div>
                            <div class="info-value" id="modal-type-projet-value"></div>
                        </div>
                    </div>

                    <div class="info-row">
                        <div class="info-icon">📄</div>
                        <div class="info-content">
                            <div class="info-label">Nombre de pages</div>
                            <div class="info-value" id="modal-nb-pages-value"></div>
                        </div>
                    </div>

                    <!-- Email -->
                    <div class="email info-row">
                        <div class="info-icon">📧</div>
                        <div class="info-content">
                            <div class="info-label">Email</div>
                            <div class="info-value" id="modal-email-value"></div>
                        </div>
                    </div>

                    <!-- Code promo -->
                    <div class="promo-code info-row" id="modal-promo-row" style="display: none;">
                        <div class="info-icon">🎫</div>
                        <div class="info-content">
                            <div class="info-label">Code promo</div>
                            <div class="info-value" id="modal-promo-value"></div>
                        </div>
                    </div>
                </div>

                <!-- Options sélectionnées -->
                <div class="options-section">
                    <h3 class="section-title">Options sélectionnées</h3>
                    <ul class="options-list" id="modal-options-list">

                    </ul>
                </div>

                <!-- Commentaire -->
                <div class="comment">
                    <h3 class="section-title">Commantaire</h3>
                    <p id="modal-comment-value" class="option-item" style="margin: 1rem 0 ;"></p>
                </div>

                <!-- Prix total -->
                <div class="price-section">
                    <div class="price-label">Prix total estimé</div>
                    <div class="price-amount" id="modal-price-amount"></div>
                    <div class="price-note">Prix indicatif - Devis final après étude détaillée</div>
                </div>

                <!-- Boutons d'action -->
                <div class="btn-group">
                    <button class="btn btn-primary" id="validate-btn" onclick="validateQuote()">
                        <span>✓ Valider le devis</span>
                    </button>
                    <button class="btn btn-secondary" onclick="closeModal()">
                        <span>← Modifier</span>
                    </button>
                </div>

                <div id="formMessage"></div>
            </div>
        </div>
    </div>

    <script src="https://www.google.com/recaptcha/api.js?render=6Lf1cTorAAAAAClxy4Vi8LaPRJLlirLUlUf2Um5x"></script>
    <script src="/devis/main.js"></script>
    <script src="/devis/modal.js"></script>
</body>

</html>