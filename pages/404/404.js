 // Animation d'entrée
 document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.error-container');
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        container.style.transition = 'all 0.6s ease';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 100);
});

// Compteur de temps passé sur la page
let timeSpent = 0;
setInterval(() => {
    timeSpent++;
    if (timeSpent === 30) { // Après 30 secondes
        console.log('Utilisateur reste sur la page 404 depuis 30 secondes');
    }
}, 1000);