document.getElementById("devisForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const typeApp = document.getElementById("typeAppInput").value;
    const typeProjet = document.getElementById("typeProjetInput").value;
    const email = event.target.email.value;
    const comment = event.target.comment.value;

    console.log(typeApp, typeProjet, email, comment);

    let typeAppJson = null;
    let typeProjetJson = null;

    try {
        const response = await fetch("create_devis.json");
        const data = await response.json();

        typeAppJson = Object.values(data.type_app).filter(
            (item) => item.name === typeApp
        );
        typeProjetJson = Object.values(data.type_projet).filter(
            (item) => item.name === typeProjet
        );

        console.log(typeAppJson, typeProjetJson);
    } catch (error) {
        console.error("Erreur lors de la récupération des données:", error);
    }

    // Validation
    if (!typeApp) {
        document.getElementById("typeAppInput").classList.add("error-input");
    }
    if (!typeProjet) {
        document.getElementById("typeProjetInput").classList.add("error-input");
    }
    if (!email) {
        document.getElementById("email").classList.add("error-input");
    }

    if (typeApp && typeProjet && email) {
        openModal(typeApp, typeProjet, email, comment);
    }
});


function closeModal() {
    const modal = document.getElementById("templateModal");
    modal.style.animation = "fadeOut 0.3s ease-out forwards";
    setTimeout(() => {
        modal.style.display = "none";
        modal.style.animation = "";
    }, 300);
}

function openModal(typeApp, typeProjet, email, comment) {
    const modal = document.getElementById("templateModal");

    // Récupérer les informations du devis
    const selectedOptions = Array.from(
        document.querySelectorAll('input[name="options[]"]:checked')
    );
    const totalAmount = document.querySelector(".total-amount");

    // Mettre à jour le type d'application
    const modalTypeApp = document.getElementById("modal-type-app-value");
    if (modalTypeApp && typeApp) {
        modalTypeApp.textContent = typeApp;
    }

    // Mettre à jour le type de projet
    const modalTypeProjet = document.getElementById("modal-type-projet-value");
    if (modalTypeProjet && typeProjet) {
        modalTypeProjet.textContent = typeProjet;
    }

    // Mettre à jour le nombre de pages
    const modalNbPages = document.getElementById("modal-nb-pages-value");
    if (modalNbPages) {
        const nbPages = document.getElementById("nbPages").value;
        modalNbPages.textContent = nbPages + ' pages';
    }

    // Mettre à jour la liste des options
    const modalOptionsList = document.getElementById("modal-options-list");
    if (modalOptionsList) {
        modalOptionsList.innerHTML = "";
        selectedOptions.forEach((option) => {
            const li = document.createElement("li");
            li.className = "option-item";

            const optionName = document.createElement("span");
            optionName.className = "option-name";
            optionName.textContent = option.nextElementSibling.textContent;

            const optionPrice = document.createElement("span");
            optionPrice.className = "option-price";
            optionPrice.textContent =
                option.nextElementSibling.nextElementSibling.textContent;

            li.appendChild(optionName);
            li.appendChild(optionPrice);
            modalOptionsList.appendChild(li);
        });
    }

    // Mettre à jour l'email
    const modalEmail = document.getElementById("modal-email-value");
    console.log(modalEmail);
    if (modalEmail && email) {
        modalEmail.textContent = email;
    }

    // Mettre à jour le commentaire
    const modalComment = document.getElementById("modal-comment-value");
    if (modalComment && comment) {
        modalComment.textContent = comment;
    }

    // Mettre à jour le prix total
    const modalPriceAmount = document.getElementById("modal-price-amount");
    if (modalPriceAmount && totalAmount) {
        modalPriceAmount.textContent = totalAmount.textContent;
    }

    // Afficher le modal
    modal.style.display = "flex";
}

function validateQuote() {
    const btn = document.getElementById("validate-btn");
    btn.disabled = true;
    btn.innerHTML = "<span>Envoi en cours...</span>";

    // Récupérer les valeurs du modal
    const typeApp = document.getElementById("modal-type-app-value").textContent;
    const typeProjet = document.getElementById("modal-type-projet-value").textContent;
    const email = document.getElementById("modal-email-value").textContent;
    const comment = document.getElementById("modal-comment-value").textContent;
    const total = document.getElementById("modal-price-amount").textContent;
    const nbPages = document.getElementById("modal-nb-pages-value").textContent;

    // Récupérer les options sélectionnées
    const options = Array.from(document.querySelectorAll("#modal-options-list .option-name"))
        .map(el => el.textContent);

    // Récupérer le token CSRF
    const csrfTokenInput = document.querySelector('input[name="csrf_token"]');
    const csrfToken = csrfTokenInput ? csrfTokenInput.value : '';

    // Créer ou trouver le div pour les messages
    let msgDiv = document.getElementById('formMessage');
    if (!msgDiv) {
        msgDiv = document.createElement('div');
        msgDiv.id = 'formMessage';
        document.querySelector('.modal-body').appendChild(msgDiv);
    }
    msgDiv.innerHTML = '';

    grecaptcha.ready(function() {
        grecaptcha.execute('6Lf1cTorAAAAAClxy4Vi8LaPRJLlirLUlUf2Um5x', {action: 'devis'}).then(function(token) {
            // Préparer les données à envoyer
            const formData = new FormData();
            formData.append('typeApp', typeApp);
            formData.append('typeProjet', typeProjet);
            formData.append('email', email);
            formData.append('comment', comment);
            formData.append('total', total);
            formData.append('nbPages', nbPages);
            formData.append('csrf_token', csrfToken);
            formData.append('g-recaptcha-response', token);
            options.forEach(opt => formData.append('options[]', opt));

            fetch('./validator.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    msgDiv.innerHTML = '<span style="color:green;">' + data.message + '</span>';
                    btn.innerHTML = "<span>✓ Devis validé !</span>";
                    btn.style.background = "linear-gradient(135deg, #2ecc71, #27ae60)";
                    setTimeout(() => {
                        alert("Devis validé ! Vous allez être recontacté.");
                        closeModal();
                    }, 1500);
                } else {
                    let errorMessage = data.message;
                    if (data.errors) {
                        errorMessage += '<br>' + data.errors.join('<br>');
                    }
                    if (data.error) {
                        errorMessage += '<br>Détails techniques : ' + data.error;
                    }
                    msgDiv.innerHTML = '<span style="color:red;">' + errorMessage + '</span>';
                    btn.innerHTML = "<span>Valider le devis</span>";
                    btn.disabled = false;
                }
            })
            .catch(error => {
                btn.innerHTML = "<span>Valider le devis</span>";
                btn.disabled = false;
                msgDiv.innerHTML = '<span style="color:red;">Erreur lors de l\'envoi du formulaire : ' + error.message + '</span>';
            });
        });
    });
}

// Fermer le modal en cliquant en dehors
document
    .getElementById("templateModal")
    .addEventListener("click", function (e) {
        if (e.target === this) {
            closeModal();
        }
    });

// Fermer le modal avec la touche Escape
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeModal();
    }
});

// Animation CSS pour la fermeture
const style = document.createElement("style");
style.textContent = `
    @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; }
    }
`;
document.head.appendChild(style);