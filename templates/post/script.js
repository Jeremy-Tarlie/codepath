// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", function () {
  // Initialisation des animations AOS
  AOS.init({
    duration: 800,
    offset: 100,
    once: true,
  });

  // Menu Mobile
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const mainNav = document.querySelector(".main-nav ul");
  const dropdowns = document.querySelectorAll(".dropdown");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      this.classList.toggle("active");
      mainNav.classList.toggle("open");
      // Animation du bouton hamburger
      const spans = this.getElementsByTagName("span");
      if (this.classList.contains("active")) {
        spans[0].style.transform = "rotate(45deg) translate(6px, 7.75px)";
        spans[1].style.opacity = "0";
        spans[2].style.transform = "rotate(-45deg) translate(5px, -7px)";
      } else {
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    });
  }

  dropdowns[0].addEventListener("click", function (e) {
    if (window.innerWidth >= 900) return;

    const dropdown_burgers = document.querySelectorAll(".dropdown_burger");

    dropdown_burgers.forEach((item) => {
      if (item.classList.contains("hidden")) {
        item.classList.remove("hidden", "hiding");
        item.classList.add("showing");
      } else {
        item.classList.remove("showing");
        item.classList.add("hiding");

        // Attendre la fin de l'animation avant d'ajouter 'hidden'
        item.addEventListener("animationend", function handler() {
          item.classList.add("hidden");
          item.classList.remove("hiding");
          item.removeEventListener("animationend", handler);
        });
      }
    });
  });

  // Fermer le menu mobile en cliquant en dehors
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest(".main-nav") &&
      !e.target.closest(".mobile-menu-btn")
    ) {
      if (mainNav.classList.contains("open")) {
        mainNav.classList.remove("open");
        mobileMenuBtn.classList.remove("active");
        const spans = mobileMenuBtn.getElementsByTagName("span");
        spans[0].style.transform = "none";
        spans[1].style.opacity = "1";
        spans[2].style.transform = "none";
      }
    }
  });

  // Gestion du bouton "Retour en haut"
  const backToTopButton = document.getElementById("back-to-top");

  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      if (window.pageYOffset > 300) {
        backToTopButton.style.display = "flex";
      } else {
        backToTopButton.style.display = "none";
      }
    });

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Animation des compteurs
  const counters = document.querySelectorAll(".counter");
  let hasAnimated = false;

  function animateCounters() {
    counters.forEach((counter) => {
      const target = +counter.getAttribute("data-target");
      let current = 0;
      const increment = target / 100;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 10);
        } else {
          counter.textContent = target;
        }
      };
      updateCounter();
    });
    hasAnimated = true;
  }

  // Observer pour les compteurs
  const counterSection = document.querySelector(".counter-section");
  if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasAnimated) {
        animateCounters();
      }
    });
    observer.observe(counterSection);
  }

  // Filtres Portfolio
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Retirer la classe active de tous les boutons
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      // Ajouter la classe active au bouton cliqué
      button.classList.add("active");

      const filter = button.getAttribute("data-filter");

      projectCards.forEach((card) => {
        if (filter === "all" || card.getAttribute("data-category") === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "scale(0.8)";
          setTimeout(() => {
            card.style.display = "none";
          }, 300);
        }
      });
    });
  });

  // Gestion du slider de témoignages
  const testimonialSlider = document.querySelector(".testimonial-slider");
  const testimonials = document.querySelectorAll(".testimonial");
  const prevButton = document.querySelector(".prev-testimonial");
  const nextButton = document.querySelector(".next-testimonial");
  let currentSlide = 0;

  if (testimonialSlider && testimonials.length > 0) {
    function showSlide(index) {
      testimonials.forEach((testimonial, i) => {
        testimonial.style.opacity = i === index ? "1" : "0";
        testimonial.style.transform =
          i === index ? "translateX(0)" : "translateX(100px)";
        testimonial.style.display = i === index ? "block" : "none";
      });
    }

    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        currentSlide =
          (currentSlide - 1 + testimonials.length) % testimonials.length;
        showSlide(currentSlide);
      });

      nextButton.addEventListener("click", () => {
        currentSlide = (currentSlide + 1) % testimonials.length;
        showSlide(currentSlide);
      });
    }

    // Afficher le premier témoignage
    showSlide(0);

    // Auto-rotation des témoignages
    setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonials.length;
      showSlide(currentSlide);
    }, 5000);
  }

  // Gestion du formulaire de newsletter
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      if (validateEmail(email)) {
        // Simulation d'envoi (à remplacer par votre logique d'API)
        alert("Merci de votre inscription à la newsletter !");
        this.reset();
      } else {
        alert("Veuillez entrer une adresse email valide.");
      }
    });
  }

  // Validation email
  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  // Animation smooth scroll pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  const distance = document.getElementById("distance");

  distance.addEventListener("input", function () {
    const distanceValue = distance.value;
    document.getElementById("distance-value").textContent =
      distanceValue + " km";
  });

  // Gestion du formulaire de recherche
  const searchForm = document.querySelector(".search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      // Récupération des valeurs
      const searchQuery = document.getElementById("search").value;
      const location = document.getElementById("location").value;
      const useLocation = document.getElementById("useLocation").checked;
      const nationwide = document.getElementById("nationwide").checked;
      const distanceValue = distance.value;

      // Validation basique
      if (!searchQuery) {
        alert("Veuillez entrer un terme de recherche.");
        return;
      }

      if (!nationwide && !useLocation && !location) {
        alert(
          'Veuillez spécifier une localisation ou cocher "Toute la France".'
        );
        return;
      }

      // Simulation d'envoi (à remplacer par votre logique de recherche)
      console.log("Recherche :", {
        query: searchQuery,
        location: location,
        useCurrentLocation: useLocation,
        nationwide: nationwide,
        distance: distanceValue,
      });

      alert("Recherche lancée !");
    });
  }

  // Gestion de la géolocalisation
  const useLocationCheckbox = document.getElementById("useLocation");
  if (useLocationCheckbox) {
    useLocationCheckbox.addEventListener("change", function () {
      if (this.checked) {
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              // Simulation de géocodage inverse (à remplacer par une vraie API)
              document.getElementById("location").value = "Position actuelle";
              document.getElementById("location").disabled = true;
            },
            function (error) {
              alert("Erreur de géolocalisation : " + error.message);
              useLocationCheckbox.checked = false;
            }
          );
        } else {
          alert("La géolocalisation n'est pas supportée par votre navigateur.");
          this.checked = false;
        }
      } else {
        document.getElementById("location").disabled = false;
        document.getElementById("location").value = "";
      }
    });
  }
});
