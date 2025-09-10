// Animation d'apparition des sections au scroll
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.legal-section');
    
    // Fonction pour vérifier si un élément est visible
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Fonction pour animer les sections visibles
    function animateSections() {
        sections.forEach(section => {
            if (isElementInViewport(section) && !section.classList.contains('visible')) {
                section.classList.add('visible');
            }
        });
    }
    
    // Animer les sections au chargement initial
    setTimeout(() => {
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('visible');
            }, index * 100);
        });
    }, 300);
    
    // Animer les sections au scroll
    window.addEventListener('scroll', animateSections);
    
    // Smooth scroll pour les liens internes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Ajouter un effet de hover sur les liens
    document.querySelectorAll('.legal-content a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'color 0.3s ease';
        });
    });
    
    // Table des matières automatique (optionnel)
    const createTableOfContents = () => {
        const headings = document.querySelectorAll('.legal-content h2');
        if (headings.length > 0) {
            const toc = document.createElement('div');
            toc.className = 'table-of-contents';
            toc.innerHTML = '<h3>Table des matières</h3><ul></ul>';
            
            const tocList = toc.querySelector('ul');
            headings.forEach((heading, index) => {
                const li = document.createElement('li');
                const a = document.createElement('a');
                a.textContent = heading.textContent;
                a.href = `#section-${index + 1}`;
                heading.id = `section-${index + 1}`;
                li.appendChild(a);
                tocList.appendChild(li);
            });
            
            const legalContent = document.querySelector('.legal-content');
            legalContent.insertBefore(toc, legalContent.firstChild);
        }
    };
    
    // Créer la table des matières si nécessaire
    // createTableOfContents();
}); 