// Animation spécifique pour les sections de mentions légales
document.addEventListener("DOMContentLoaded", function () {
    const legalSections = document.querySelectorAll(".legal-section");

    // Configuration de l'observateur d'intersection
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    // Création de l'observateur
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Appliquer l'animation avec délai progressif
          setTimeout(() => {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }, index * 200);

          // Arrêter d'observer cet élément
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observer toutes les sections
    legalSections.forEach((section) => {
      observer.observe(section);
    });
  });