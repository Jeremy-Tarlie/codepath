// Données des produits
const products = [
    {
        id: 1,
        name: "Bouquet Printanier",
        price: 34.90,
        image: "https://placehold.co/600x400",
        description: "Un bouquet frais et coloré pour célébrer le printemps."
    },
    {
        id: 2,
        name: "Roses Passion",
        price: 42.00,
        image: "https://placehold.co/600x400",
        description: "Un classique indémodable pour déclarer votre amour."
    },
    {
        id: 3,
        name: "Élégance Blanche",
        price: 38.50,
        image: "https://placehold.co/600x400",
        description: "Des fleurs blanches pour une touche d'élégance et de pureté."
    },
    {
        id: 4,
        name: "Jardin d'Été",
        price: 29.90,
        image: "https://placehold.co/600x400",
        description: "Un bouquet lumineux pour égayer toutes les occasions."
    },
    // Ajoutez d'autres produits ici
];

// Fonction pour afficher les produits
function displayProducts() {
    const container = document.getElementById('products-container');
    
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="product-price">${product.price.toFixed(2)} €</div>
                <button onclick="addToCart(${product.id})" class="cta-button">
                    Ajouter au panier
                </button>
            </div>
        `;
        container.appendChild(productElement);
    });
}

// Newsletter
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert(`Merci de votre inscription ! Vous recevrez bientôt nos newsletters à ${email}`);
    this.reset();
});

// Animation au scroll
function handleScroll() {
    const elements = document.querySelectorAll('.feature, .category, .product-card');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if(position.top < window.innerHeight) {
            element.classList.add('visible');
        }
    });
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    displayProducts();
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérification initiale
});


// Dans main.js
function handleEngagementsScroll() {
    const cards = document.querySelectorAll('.engagement-card');
    cards.forEach((card, index) => {
        const position = card.getBoundingClientRect();
        if (position.top < window.innerHeight - 100) {
            setTimeout(() => {
                card.classList.add('visible');
            }, index * 200); // Ajoute un délai progressif pour chaque carte
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', handleEngagementsScroll);
    handleEngagementsScroll(); // Vérification initiale
});

// Dans main.js
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        const frequency = this.querySelector('input[name="frequency"]:checked').value;
        
        // Simulation d'envoi (à remplacer par votre logique d'API)
        const button = this.querySelector('button');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Inscription...';
        button.disabled = true;
        
        setTimeout(() => {
            // Créer le message de succès
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.innerHTML = `
                <i class="fas fa-check-circle" style="font-size: 3em; color: #b8860b;"></i>
                <h3>Merci de votre inscription !</h3>
                <p>Vous recevrez bientôt nos offres exclusives à ${email}</p>
            `;
            
            newsletterForm.parentElement.appendChild(successMessage);
            
            // Animer l'apparition
            setTimeout(() => {
                successMessage.classList.add('show');
            }, 100);
            
            // Réinitialiser le formulaire
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                newsletterForm.reset();
                successMessage.remove();
            }, 3000);
        }, 1500);
    });
});