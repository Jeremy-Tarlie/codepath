function closeModal() {
    const modal = document.getElementById('templateModal');
    modal.style.animation = 'fadeOut 0.3s ease-out forwards';
    setTimeout(() => {
        modal.style.display = 'none';
        modal.style.animation = '';
    }, 300);
}

function openModal() {
    const modal = document.getElementById('templateModal');
    
    // Récupérer les informations du devis
    const typeAppInput = document.getElementById('typeAppInput');
    const typeProjetInput = document.getElementById('typeProjetInput');
    const emailInput = document.getElementById('email');
    const commentInput = document.getElementById('comment');
    const selectedOptions = Array.from(document.querySelectorAll('input[name="options[]"]:checked'));
    const totalAmount = document.querySelector('.total-amount');

    // Mettre à jour le type d'application
    const modalTypeApp = document.getElementById('modal-type-app-value');
    if (modalTypeApp && typeAppInput.value) {
        modalTypeApp.textContent = typeAppInput.value;
    }

    // Mettre à jour le type de projet
    const modalTypeProjet = document.getElementById('modal-type-projet-value');
    if (modalTypeProjet && typeProjetInput.value) {
        modalTypeProjet.textContent = typeProjetInput.value;
    }

    // Mettre à jour la liste des options
    const modalOptionsList = document.getElementById('modal-options-list');
    if (modalOptionsList) {
        modalOptionsList.innerHTML = '';
        selectedOptions.forEach(option => {
            const li = document.createElement('li');
            li.className = 'option-item';
            
            const optionName = document.createElement('span');
            optionName.className = 'option-name';
            optionName.textContent = option.nextElementSibling.textContent;
            
            const optionPrice = document.createElement('span');
            optionPrice.className = 'option-price';
            optionPrice.textContent = option.nextElementSibling.nextElementSibling.textContent;
            
            li.appendChild(optionName);
            li.appendChild(optionPrice);
            modalOptionsList.appendChild(li);
        });
    }

    // Mettre à jour l'email
    const modalEmail = document.getElementById('modal-email-value');
    console.log(modalEmail);
    if (modalEmail && emailInput.value) {
        modalEmail.textContent = emailInput.value;
    }

    // Mettre à jour le commentaire
    const modalComment = document.getElementById('modal-comment-value');
    if (modalComment && commentInput.value) {
        modalComment.textContent = commentInput.value;
    }

    // Mettre à jour le prix total
    const modalPriceAmount = document.getElementById('modal-price-amount');
    if (modalPriceAmount && totalAmount) {
        modalPriceAmount.textContent = totalAmount.textContent;
    }

    // Afficher le modal
    modal.style.display = 'flex';
}

function validateQuote() {
    // Animation de succès
    const btn = document.getElementById('validate-btn');
    const originalText = btn.innerHTML;
    
    btn.innerHTML = '<span>✓ Devis validé !</span>';
    btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
    
    setTimeout(() => {
        alert('Devis validé ! Vous allez être redirigé vers la page de contact.');
        // Ici vous pouvez rediriger vers la page de contact
        // window.location.href = '/pages/contact/index.php';
    }, 1000);
}

// Fermer le modal en cliquant en dehors
document.getElementById('templateModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Fermer le modal avec la touche Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// Animation CSS pour la fermeture
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);