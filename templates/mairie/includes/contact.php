<div class="container">
    <!-- Section Hero Contact -->
    <section class="section hero">
        <div class="responsive-title"
            style="background: linear-gradient(135deg, var(--primary), var(--secondary)); color: var(--white); padding: 60px 40px; border-radius: 10px; text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 2.5rem; margin-bottom: 20px;">Contactez-Nous</h1>
            <p style="font-size: 1.2rem; max-width: 800px; margin: 0 auto 30px; line-height: 1.8;">
                Une question, une suggestion ? Nous sommes à votre écoute.
            </p>
        </div>
    </section>

    <!-- Section Coordonnées -->
    <section class="section">
        <h2 style="color: var(--primary); font-size: 2rem; margin-bottom: 30px; text-align: center;">Nos Coordonnées
        </h2>
        <div class="responsive-grid-contact"
            style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px; max-width: 1000px; margin: 0 auto;">
            <div class="responsive-padding"
                style="background: var(--white); padding: 40px; border-radius: 10px; box-shadow: var(--shadow);">
                <h3 style="color: var(--primary); margin-bottom: 20px; text-align: center;">Mairie de Ville-du-Normandie
                </h3>
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div class="responsive-hide"
                        style="width: 50px; min-width: 50px;  height: 50px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 1.5rem; margin-right: 15px;">
                        📍</div>
                    <div>
                        <p style="font-weight: 600;">Adresse</p>
                        <p style="color: var(--text-light);">1 Place de la République<br>14000 Ville-du-Normandie</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div class="responsive-hide"
                        style="width: 50px; min-width: 50px;  height: 50px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 1.5rem; margin-right: 15px;">
                        📞</div>
                    <div>
                        <p style="font-weight: 600;">Téléphone</p>
                        <p style="color: var(--text-light);">02 31 00 00 00</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center; margin-bottom: 15px;">
                    <div class="responsive-hide"
                        style="width: 50px; min-width: 50px;  height: 50px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 1.5rem; margin-right: 15px;">
                        ✉️</div>
                    <div>
                        <p style="font-weight: 600;">Email</p>
                        <p style="color: var(--text-light);">contact@ville-du-normandie.fr</p>
                    </div>
                </div>
                <div style="display: flex; align-items: center;">
                    <div class="responsive-hide"
                        style="width: 50px; min-width: 50px;  height: 50px; background: var(--primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 1.5rem; margin-right: 15px;">
                        ⏰</div>
                    <div>
                        <p style="font-weight: 600;">Horaires d'ouverture</p>
                        <p style="color: var(--text-light);">Lundi-vendredi : 8h30 - 12h / 13h30 - 17h<br>Samedi :
                            9h - 12h
                            (permanence)</p>
                    </div>
                </div>
            </div>
            <div class="responsive-padding"
                style="background: var(--white); padding: 40px; border-radius: 10px; box-shadow: var(--shadow);">
                <h3 style="color: var(--primary); margin-bottom: 20px; text-align: center;">Plan d'Accès</h3>
                <div
                    style="width: 100%; height: 300px; background: var(--bg-light); border-radius: 5px; display: flex; align-items: center; justify-content: center; color: var(--text-light);">
                    [Carte interactive à intégrer ici]
                </div>
            </div>
        </div>
    </section>

    <!-- Section Formulaire de Contact -->
    <section class="section">
        <h2 style="color: var(--primary); font-size: 2rem; margin-bottom: 30px; text-align: center;">Envoyez-Nous un
            Message</h2>
        <div class="responsive-padding"
            style="background: var(--white); padding: 40px; border-radius: 10px; box-shadow: var(--shadow); max-width: 800px; margin: 0 auto;">
            <form class="responsive-reservation-form" id="contact-form"
                style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <label for="nom"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Nom
                        *</label>
                    <input type="text" id="nom" required
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px;">
                </div>
                <div>
                    <label for="email"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Email
                        *</label>
                    <input type="email" id="email" required
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px;">
                </div>
                <div>
                    <label for="sujet"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Sujet
                        *</label>
                    <select id="sujet" required
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px;">
                        <option value="">-- Choix du sujet --</option>
                        <option value="demande-information">Demande d'information</option>
                        <option value="signalement">Signalement</option>
                        <option value="autre">Autre</option>
                    </select>
                </div>
                <div>
                    <label for="telephone"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Téléphone</label>
                    <input type="tel" id="telephone"
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px;">
                </div>
                <div style="grid-column: 1 / -1;">
                    <label for="message"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Message
                        *</label>
                    <textarea id="message" rows="5" required
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px; resize: vertical;"></textarea>
                </div>
                <div style="grid-column: 1 / -1; text-align: center; margin-top: 20px;">
                    <button type="submit" class="btn" style="padding: 12px 30px;">Envoyer le message</button>
                </div>
            </form>
        </div>
    </section>

    <!-- Section Services d'Urgence -->
    <section class="section">
        <h2 style="color: var(--primary); font-size: 2rem; margin-bottom: 30px; text-align: center;">Numéros d'Urgence
        </h2>
        <div class="cards-grid">
            <div class="card info-box">
                <div
                    style="width: 100%; height: 120px; background: var(--primary); border-radius: 10px 10px 0 0; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 2rem;">
                    🚨
                </div>
                <div class="card-content" style="padding: 20px; text-align: center;">
                    <h3>SAMU</h3>
                    <p style="color: var(--accent); font-weight: 600; font-size: 1.2rem;">15</p>
                </div>
            </div>
            <div class="card info-box">
                <div
                    style="width: 100%; height: 120px; background: var(--primary); border-radius: 10px 10px 0 0; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 2rem;">
                    🚒
                </div>
                <div class="card-content" style="padding: 20px; text-align: center;">
                    <h3>Pompiers</h3>
                    <p style="color: var(--accent); font-weight: 600; font-size: 1.2rem;">18</p>
                </div>
            </div>
            <div class="card info-box">
                <div
                    style="width: 100%; height: 120px; background: var(--primary); border-radius: 10px 10px 0 0; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 2rem;">
                    🚔
                </div>
                <div class="card-content" style="padding: 20px; text-align: center;">
                    <h3>Police / Gendarmerie</h3>
                    <p style="color: var(--accent); font-weight: 600; font-size: 1.2rem;">17</p>
                </div>
            </div>
        </div>
    </section>
</div>