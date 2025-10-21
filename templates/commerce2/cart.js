// Gestion du panier
let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }
        updateCartDisplay();
        showCartNotification();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

function updateQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartDisplay();
        }
    }
}

function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    // Mise à jour du compteur
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Mise à jour du contenu du panier
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <p>Votre panier est vide</p>
            </div>
        `;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image || 'https://placehold.co/70x70'}" alt="${item.name}">
                </div>
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price.toFixed(2)} €</p>
                    <div class="cart-item-actions">
                        <button onclick="updateQuantity(${item.id}, -1)" title="Diminuer la quantité">
                            <i class="fas fa-minus"></i>
                        </button>
                        <span>${item.quantity}</span>
                        <button onclick="updateQuantity(${item.id}, 1)" title="Augmenter la quantité">
                            <i class="fas fa-plus"></i>
                        </button>
                        <button onclick="removeFromCart(${item.id})" title="Supprimer l'article">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // Mise à jour du total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `${total.toFixed(2)} €`;
    
    // Désactiver le bouton de commande si le panier est vide
    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.disabled = cart.length === 0;
        if (cart.length === 0) {
            checkoutButton.textContent = 'Panier vide';
        } else {
            checkoutButton.textContent = 'Commander';
        }
    }
}

function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Produit ajouté au panier !';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Gestion de l'affichage du panier
document.getElementById('cart-icon').addEventListener('click', function(e) {
    e.preventDefault();
    openCart();
});

document.getElementById('close-cart').addEventListener('click', function() {
    closeCart();
});

// Fonction pour ouvrir le panier
function openCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.querySelector('.cart-overlay') || createOverlay();
    
    cartSidebar.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Fonction pour fermer le panier
function closeCart() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const overlay = document.querySelector('.cart-overlay');
    
    cartSidebar.classList.remove('active');
    if (overlay) {
        overlay.classList.remove('active');
    }
    document.body.style.overflow = '';
}

// Créer l'overlay s'il n'existe pas
function createOverlay() {
    const overlay = document.createElement('div');
    overlay.className = 'cart-overlay';
    overlay.addEventListener('click', closeCart);
    document.body.appendChild(overlay);
    return overlay;
}

// Gestion du bouton de commande
document.addEventListener('DOMContentLoaded', function() {
    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            if (cart.length > 0) {
                // Ici vous pouvez ajouter la logique de commande
                alert('Redirection vers la page de commande...');
            }
        });
    }
    
    // Initialiser l'affichage du panier
    updateCartDisplay();
});