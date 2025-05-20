document.addEventListener("DOMContentLoaded", function () {
  // Variables
  const header = document.querySelector("header");
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");
  const sections = document.querySelectorAll("section");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const events = document.querySelectorAll(".event");
  const galeryItems = document.querySelectorAll(".galerie-item");

  let currentSlide = 0;

  // Menu mobile toggle
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    menu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Fermer le menu en cliquant sur les liens
  document.querySelectorAll(".menu a").forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      menu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Header scroll effect
  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    // Animation on scroll
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      const sectionElements = section.querySelectorAll(".fade-in");

      if (sectionTop < window.innerHeight - 100) {
        section.querySelectorAll(".fade-in").forEach((el, index) => {
          setTimeout(() => {
            el.classList.add("appear");
          }, index * 200);
        });
      }
    });
  });

  // Ajouter la classe fade-in aux éléments à animer
  document
    .querySelectorAll(
      ".card, .histoire-text, .histoire-image, .event-info, .galerie-item, .contact-info, .contact-form"
    )
    .forEach((el) => {
      el.classList.add("fade-in");
    });

  const eventsTrack = document.querySelector(".events-track");

  function showSlide(n) {
    eventsTrack.style.transform = `translateX(-${n * 100}%)`;
  }

  prevBtn.addEventListener("click", function () {
    currentSlide = currentSlide > 0 ? currentSlide - 1 : events.length - 1;
    showSlide(currentSlide);
  });

  nextBtn.addEventListener("click", function () {
    currentSlide = currentSlide < events.length - 1 ? currentSlide + 1 : 0;
    showSlide(currentSlide);
  });

  // Initialiser le slider
  showSlide(currentSlide);

  // Auto slider
  setInterval(() => {
    currentSlide = currentSlide < events.length - 1 ? currentSlide + 1 : 0;
    showSlide(currentSlide);
  }, 8000);

  // Galerie lightbox
  galeryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      createLightbox(index);
    });
  });

  function createLightbox(index) {
    // Créer la lightbox
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");

    // Créer le contenu
    const content = document.createElement("div");
    content.classList.add("lightbox-content");

    // Ajouter l'image
    const img = document.createElement("img");
    img.src = galeryItems[index].querySelector("img").src;

    // Boutons navigation
    const prevButton = document.createElement("button");
    prevButton.classList.add("lightbox-prev");
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';

    const nextButton = document.createElement("button");
    nextButton.classList.add("lightbox-next");
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';

    // Bouton fermer
    const closeButton = document.createElement("button");
    closeButton.classList.add("lightbox-close");
    closeButton.innerHTML = '<i class="fas fa-times"></i>';

    // Ajouter à la lightbox
    content.appendChild(img);
    lightbox.appendChild(content);
    lightbox.appendChild(prevButton);
    lightbox.appendChild(nextButton);
    lightbox.appendChild(closeButton);
    document.body.appendChild(lightbox);

    // Animation
    setTimeout(() => {
      lightbox.classList.add("active");
    }, 10);

    // Événements
    closeButton.addEventListener("click", () => {
      lightbox.classList.remove("active");
      setTimeout(() => {
        document.body.removeChild(lightbox);
      }, 300);
    });

    prevButton.addEventListener("click", () => {
      let newIndex = index - 1;
      if (newIndex < 0) newIndex = galeryItems.length - 1;
      img.src = galeryItems[newIndex].querySelector("img").src;
      index = newIndex;
    });

    nextButton.addEventListener("click", () => {
      let newIndex = index + 1;
      if (newIndex >= galeryItems.length) newIndex = 0;
      img.src = galeryItems[newIndex].querySelector("img").src;
      index = newIndex;
    });

    // Fermer avec Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        lightbox.classList.remove("active");
        setTimeout(() => {
          if (document.body.contains(lightbox)) {
            document.body.removeChild(lightbox);
          }
        }, 300);
      }
    });

    // Empêcher le scroll
    document.body.style.overflow = "hidden";

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        lightbox.classList.remove("active");
        setTimeout(() => {
          document.body.removeChild(lightbox);
          document.body.style.overflow = "";
        }, 300);
      }
    });
  }

  // Ajouter des styles pour la lightbox
  const style = document.createElement("style");
  style.textContent = `
      .lightbox {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      
      .lightbox.active {
        opacity: 1;
      }
      
      .lightbox-content {
        max-width: 90%;
        max-height: 80%;
        position: relative;
      }
      
      .lightbox-content img {
        max-width: 100%;
        max-height: 80vh;
        display: block;
        margin: 0 auto;
        border-radius: 4px;
        box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
      }
      
      .lightbox-prev, .lightbox-next, .lightbox-close {
        background-color: rgba(255, 255, 255, 0.2);
        border: none;
        color: white;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        cursor: pointer;
        transition: all 0.3s ease;
      }
      
      .lightbox-prev:hover, .lightbox-next:hover, .lightbox-close:hover {
        background-color: rgba(255, 255, 255, 0.4);
      }
      
      .lightbox-prev {
        left: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
      
      .lightbox-next {
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
      }
      
      .lightbox-close {
        top: 20px;
        right: 20px;
      }
      
      @media (max-width: 768px) {
        .lightbox-prev, .lightbox-next {
          width: 40px;
          height: 40px;
        }
        
        .lightbox-close {
          width: 40px;
          height: 40px;
          top: 10px;
          right: 10px;
        }
      }
    `;
  document.head.appendChild(style);

  // Animation pour le formulaire de contact
  const contactForm = document.querySelector(".contact-form");
  const formInputs = contactForm.querySelectorAll("input, textarea");

  formInputs.forEach((input) => {
    input.addEventListener("focus", function () {
      this.parentElement.classList.add("active");
    });

    input.addEventListener("blur", function () {
      if (this.value === "") {
        this.parentElement.classList.remove("active");
      }
    });
  });

  // Smooth scroll pour les ancres
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      if (this.getAttribute("href") !== "#") {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: "smooth",
          });
        }
      }
    });
  });

  // Valider le formulaire de contact
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const messageInput = contactForm.querySelector("textarea");

    let isValid = true;

    if (nameInput.value.trim() === "") {
      showError(nameInput, "Veuillez entrer votre nom");
      isValid = false;
    } else {
      removeError(nameInput);
    }

    if (emailInput.value.trim() === "") {
      showError(emailInput, "Veuillez entrer votre email");
      isValid = false;
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, "Veuillez entrer un email valide");
      isValid = false;
    } else {
      removeError(emailInput);
    }

    if (messageInput.value.trim() === "") {
      showError(messageInput, "Veuillez entrer votre message");
      isValid = false;
    } else {
      removeError(messageInput);
    }

    if (isValid) {
      // Simuler l'envoi du formulaire
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = "Envoi en cours...";

      setTimeout(() => {
        submitBtn.innerHTML = "Envoyé !";
        contactForm.reset();

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }, 2000);
      }, 1500);
    }
  });

  function showError(input, message) {
    let errorElement = input.nextElementSibling;

    if (!errorElement || !errorElement.classList.contains("error-message")) {
      errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      input.parentElement.insertBefore(errorElement, input.nextElementSibling);
    }

    errorElement.textContent = message;
    input.classList.add("error");
  }

  function removeError(input) {
    const errorElement = input.nextElementSibling;

    if (errorElement && errorElement.classList.contains("error-message")) {
      input.parentElement.removeChild(errorElement);
    }

    input.classList.remove("error");
  }

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // Ajouter des styles pour les messages d'erreur
  const errorStyle = document.createElement("style");
  errorStyle.textContent = `
      .error-message {
        color: #e74c3c;
        font-size: 0.85rem;
        margin-top: 5px;
      }
      
      input.error, textarea.error {
        border: 1px solid #e74c3c;
      }
    `;
  document.head.appendChild(errorStyle);

  // Animation pour le compteur de statistiques
  const countElements = document.querySelectorAll(".count-up");

  function animateCounter(element) {
    const target = parseInt(element.getAttribute("data-target"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const counter = setInterval(() => {
      current += step;

      if (current >= target) {
        element.textContent = target;
        clearInterval(counter);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // Animation d'entrée pour la page
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");

    // Animation pour le hero
    document.querySelector(".hero-content").style.opacity = 1;
    document.querySelector(".hero-content").style.transform = "translateY(0)";

    // Animation pour le premier élément visible
    const visibleElements = Array.from(
      document.querySelectorAll(".fade-in")
    ).filter((el) => {
      const rect = el.getBoundingClientRect();
      return rect.top < window.innerHeight;
    });

    visibleElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("appear");
      }, index * 200);
    });
  });

  // Validation du formulaire newsletter
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector("button");

      if (!emailInput.value || !isValidEmail(emailInput.value)) {
        emailInput.classList.add("error");

        // Animation de secousse
        emailInput.classList.add("shake");
        setTimeout(() => {
          emailInput.classList.remove("shake");
        }, 500);

        return;
      }

      // Animation d'envoi
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

      setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i>';
        emailInput.value = "";

        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalHTML;
        }, 2000);
      }, 1500);
    });
  }

  // Ajouter style pour l'animation de secousse
  const shakeStyle = document.createElement("style");
  shakeStyle.textContent = `
      @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
      }
      
      .shake {
        animation: shake 0.5s ease-in-out;
      }
      
      body.loaded .hero-content {
        opacity: 1;
        transform: translateY(0);
      }
      
      .no-scroll {
        overflow: hidden;
      }
    `;
  document.head.appendChild(shakeStyle);

  // Animation pour les langues
  const langSwitcher = document.querySelector(".lang-switcher");

  if (langSwitcher) {
    const langBtn = langSwitcher.querySelector(".current-lang");
    const langDropdown = langSwitcher.querySelector(".lang-dropdown");

    langBtn.addEventListener("click", function (e) {
      e.preventDefault();
      langDropdown.classList.toggle("active");
    });

    document.addEventListener("click", function (e) {
      if (!langSwitcher.contains(e.target)) {
        langDropdown.classList.remove("active");
      }
    });
  }

  // Détecter quand les sections entrent dans la vue
  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top <=
        (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }

  function handleScroll() {
    sections.forEach((section) => {
      if (isInViewport(section)) {
        section.classList.add("in-view");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  window.addEventListener("resize", handleScroll);
  handleScroll(); // Vérifier les éléments visibles au chargement
});
