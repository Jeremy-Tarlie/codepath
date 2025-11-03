<div class="container">
    <!-- Section Hero Calendrier -->
    <section class="section hero">
        <div class="responsive-title"
            style="background: linear-gradient(135deg, var(--primary), var(--secondary)); color: var(--white); padding: 60px 40px; border-radius: 10px; text-align: center; margin-bottom: 40px;">
            <h1 style="font-size: 2.5rem; margin-bottom: 20px;">Calendrier & Réservations</h1>
            <p style="font-size: 1.2rem; max-width: 800px; margin: 0 auto 30px; line-height: 1.8;">
                Consultez les disponibilités et réservez une salle municipale en ligne.
            </p>
        </div>
    </section>

    <!-- Section Calendrier Interactif -->
    <section class="section" style="display: flex; justify-content: center;">
        <div class="calendar-wrapper">
            <div class="calendar-header">
                <div class="calendar-nav">
                    <button class="nav-btn" id="prev-month">‹</button>
                    <div class="month-year" id="month-year"></div>
                    <button class="nav-btn" id="next-month">›</button>
                </div>
            </div>

            <div class="weekdays">
                <div class="weekday">Lun</div>
                <div class="weekday">Mar</div>
                <div class="weekday">Mer</div>
                <div class="weekday">Jeu</div>
                <div class="weekday">Ven</div>
                <div class="weekday">Sam</div>
                <div class="weekday">Dim</div>
            </div>

            <div class="days-grid" id="calendar-grid"></div>

            <div class="legend">
                <div class="legend-item">
                    <div class="legend-dot"></div>
                    <span>Salle des fêtes X réservée</span>
                </div>
            </div>
        </div>
    </section>


    <!-- Section Réservation -->
    <section class="section">
        <h2 style="color: var(--primary); font-size: 2rem; margin-bottom: 30px; text-align: center;">Réserver une Salle
        </h2>
        <div class="responsive-list-padding"
            style="background: var(--white); padding: 40px; border-radius: 10px; box-shadow: var(--shadow); max-width: 800px; margin: 0 auto;">
            <form id="reservation-form" class="responsive-reservation-form"
                style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <label for="nom-reservation"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Nom
                        *</label>
                    <input type="text" id="nom-reservation" required
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px;">
                </div>
                <div>
                    <label for="email-reservation"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Email
                        *</label>
                    <input type="email" id="email-reservation" required
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px;">
                </div>
                <div>
                    <label for="date-reservation"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Date
                        *</label>
                    <input type="date" id="date-reservation" required
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px;">
                </div>
                <div>
                    <label for="salle"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Salle
                        *</label>
                    <select id="salle" required
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px;">
                        <option value="">-- Choix de la salle --</option>
                        <option value="salle-des-fetes">Salle des Fêtes</option>
                        <option value="salle-du-conseil">Salle du Conseil</option>
                        <option value="salle-polyvalente">Salle Polyvalente</option>
                    </select>
                </div>
                <div>
                    <label for="heure-debut"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Heure de
                        début *</label>
                    <input type="time" id="heure-debut" required
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px;">
                </div>
                <div>
                    <label for="heure-fin"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Heure de
                        fin *</label>
                    <input type="time" id="heure-fin" required
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px;">
                </div>
                <div style="grid-column: 1 / -1;">
                    <label for="objet"
                        style="display: block; margin-bottom: 5px; color: var(--primary); font-weight: 600;">Objet de la
                        réservation *</label>
                    <textarea id="objet" rows="3" required
                        style="width: 100%; padding: 10px; border: 1px solid var(--text-dark); border-radius: 5px; resize: vertical;"></textarea>
                </div>
                <div style="grid-column: 1 / -1; text-align: center; margin-top: 20px;">
                    <button type="submit" class="btn" style="padding: 12px 30px;">Envoyer la demande</button>
                </div>
            </form>
        </div>
    </section>

    <!-- Section Salles Disponibles -->
    <section class="section">
        <h2 style="color: var(--primary); font-size: 2rem; margin-bottom: 30px; text-align: center;">Nos Salles
            Municipales</h2>
        <div class="cards-grid">
            <div class="card info-box">
                <div
                    style="width: 100%; height: 150px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 10px 10px 0 0; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 2rem;">
                    🏛️
                </div>
                <div class="card-content" style="padding: 20px; text-align: center;">
                    <h3>Salle des Fêtes</h3>
                    <p style="color: var(--text-light); margin-bottom: 15px;">Capacité : 200 personnes</p>
                    <p style="color: var(--text-light); margin-bottom: 15px;">Idéale pour mariages, banquets, concerts.
                    </p>
                    <a href="#" class="btn" style="display: block; text-align: center; padding: 8px 20px;">Voir les
                        photos</a>
                </div>
            </div>
            <div class="card info-box">
                <div
                    style="width: 100%; height: 150px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 10px 10px 0 0; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 2rem;">
                    💼
                </div>
                <div class="card-content" style="padding: 20px; text-align: center;">
                    <h3>Salle du Conseil</h3>
                    <p style="color: var(--text-light); margin-bottom: 15px;">Capacité : 50 personnes</p>
                    <p style="color: var(--text-light); margin-bottom: 15px;">Réunions, séminaires, ateliers.</p>
                    <a href="#" class="btn" style="display: block; text-align: center; padding: 8px 20px;">Voir les
                        photos</a>
                </div>
            </div>
            <div class="card info-box">
                <div
                    style="width: 100%; height: 150px; background: linear-gradient(135deg, var(--primary), var(--secondary)); border-radius: 10px 10px 0 0; display: flex; align-items: center; justify-content: center; color: var(--white); font-size: 2rem;">
                    🎭
                </div>
                <div class="card-content" style="padding: 20px; text-align: center;">
                    <h3>Salle Polyvalente</h3>
                    <p style="color: var(--text-light); margin-bottom: 15px;">Capacité : 100 personnes</p>
                    <p style="color: var(--text-light); margin-bottom: 15px;">Spectacles, expositions, activités
                        associatives.</p>
                    <a href="#" class="btn" style="display: block; text-align: center; padding: 8px 20px;">Voir les
                        photos</a>
                </div>
            </div>
        </div>
    </section>
</div>

<script>
// Gestion du formulaire de réservation
document.getElementById("reservation-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const nom = document.getElementById("nom-reservation").value.trim();
    const email = document.getElementById("email-reservation").value.trim();
    const date = document.getElementById("date-reservation").value;
    const salle = document.getElementById("salle").value;
    const heureDebut = document.getElementById("heure-debut").value;
    const heureFin = document.getElementById("heure-fin").value;
    const objet = document.getElementById("objet").value.trim();

    if (!nom || !email || !date || !salle || !heureDebut || !heureFin || !objet) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
    }
    if (!isValidEmail(email)) {
        alert("Veuillez entrer une adresse email valide.");
        return;
    }
    alert("Merci pour votre demande de réservation ! Nous vous contacterons pour confirmer la disponibilité.");
    this.reset();
});
</script>