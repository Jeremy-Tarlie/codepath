document.addEventListener("DOMContentLoaded", function () {
  // Effet de typing sur le titre principal
  function typeEffect(element, text, speed) {
    let i = 0;
    element.innerHTML = "";

    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      }
    }

    typing();
  }

  const mainTitle = document.querySelector(".hero h1");
  if (mainTitle) {
    const originalText = mainTitle.textContent;
    mainTitle.textContent = "";
    setTimeout(() => {
      typeEffect(mainTitle, originalText, 100);
    }, 500);
  }
  // Gestion du menu mobile
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector("nav");

  menuToggle.addEventListener("click", function () {
    menuToggle.classList.toggle("active");
    nav.classList.toggle("active");
  });

  // Animation du logo
  const logo = document.getElementById("logo");
  logo.addEventListener("mouseover", function () {
    this.style.transform = "scale(1.1)";
    this.style.transition = "transform 0.3s ease";
    this.style.textShadow = "0 0 10px rgba(74, 143, 231, 0.7)";

    // Animation lettres du logo
    const text = this.textContent;
    this.innerHTML = "";

    for (let i = 0; i < text.length; i++) {
      const span = document.createElement("span");
      span.textContent = text[i];
      span.style.display = "inline-block";
      span.style.transition = "transform 0.3s ease";
      span.style.transitionDelay = `${i * 0.05}s`;
      this.appendChild(span);

      setTimeout(() => {
        span.style.transform = "translateY(-5px)";
      }, i * 50);

      setTimeout(() => {
        span.style.transform = "translateY(0)";
      }, 300 + i * 50);
    }
  });

  logo.addEventListener("mouseout", function () {
    this.style.transform = "scale(1)";
    this.style.textShadow = "none";
  });

  // Ajout d'icônes aux features
  const icons = [
    '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#4a8fe7"/></svg>',
    '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#4a8fe7"/></svg>',
    '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="#4a8fe7"/></svg>',
  ];

  const featureIcons = document.querySelectorAll(".feature-icon");
  featureIcons.forEach((icon, index) => {
    icon.innerHTML = icons[index % icons.length];
  });

  // Ajout d'icônes sociales
  const socialIcons = {
    facebook:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C18.34 21.21 22 17.06 22 12.06C22 6.53 17.5 2.04 12 2.04Z" fill="white"/></svg>',
    twitter:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" fill="white"/></svg>',
    instagram:
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z" fill="white"/></svg>',
  };

  document.getElementById("facebook").innerHTML = socialIcons.facebook;
  document.getElementById("twitter").innerHTML = socialIcons.twitter;
  document.getElementById("instagram").innerHTML = socialIcons.instagram;

  // Créer les événements
  const eventData = [
    {
      title: "Atelier de sensibilisation",
      date: "12 Juin",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.",
      image: "#4a8fe7",
    },
    {
      title: "Course solidaire",
      date: "25 Juin",
      description:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.",
      image: "#2e5b9a",
    },
    {
      title: "Conférence annuelle",
      date: "10 Juillet",
      description:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla.",
      image: "#7eb3ff",
    },
    {
      title: "Journée portes ouvertes",
      date: "15 Août",
      description:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id.",
      image: "#1d4578",
    },
  ];

  const eventContainer = document.getElementById("event-cards");

  eventData.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.className = "event-card";

    eventCard.innerHTML = `
        <div class="event-image" style="background-color: ${event.image}">
          <div class="event-date">${event.date}</div>
        </div>
        <div class="event-details">
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <a href="#" class="event-link">En savoir plus →</a>
        </div>
      `;

    eventContainer.appendChild(eventCard);
  });

  // Animation au défilement
  function animateOnScroll() {
    const elements = document.querySelectorAll(".feature, .event-card");
    const featureTitles = document.querySelectorAll(".feature h2");
    const featureTexts = document.querySelectorAll(".feature p");
    const eventsTitle = document.querySelector(".events h2");

    elements.forEach((element, index) => {
      const position = element.getBoundingClientRect();

      // Si l'élément est visible dans la fenêtre
      if (position.top < window.innerHeight && position.bottom >= 0) {
        // Alterner entre animation de gauche et de droite pour les cartes d'événements
        if (element.classList.contains("event-card")) {
          if (index % 2 === 0) {
            element.style.animation = "slideInLeft 0.8s ease forwards";
          } else {
            element.style.animation = "slideInRight 0.8s ease forwards";
          }
        } else {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      }
    });

    // Animation des titres et textes des features
    featureTitles.forEach((title) => {
      const position = title.getBoundingClientRect();
      if (position.top < window.innerHeight && position.bottom >= 0) {
        title.style.animation = "fadeInUp 0.8s ease forwards";
        title.style.opacity = "1";
      }
    });

    featureTexts.forEach((text) => {
      const position = text.getBoundingClientRect();
      if (position.top < window.innerHeight && position.bottom >= 0) {
        text.style.animation = "fadeInUp 1s ease 0.3s forwards";
        text.style.opacity = "1";
      }
    });

    // Animation pour le titre de la section événements
    if (eventsTitle) {
      const position = eventsTitle.getBoundingClientRect();
      if (position.top < window.innerHeight && position.bottom >= 0) {
        eventsTitle.style.animation = "pulse 2s infinite";
      }
    }
  }

  // Initialiser l'état des éléments animés
  document.querySelectorAll(".feature, .event-card").forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  });

  document.querySelectorAll(".feature h2, .feature p").forEach((element) => {
    element.style.opacity = "0";
  });

  // Animation des éléments de navigation
  const navItems = document.querySelectorAll("nav a");
  navItems.forEach((item, index) => {
    item.style.opacity = "0";
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.animation = "fadeInUp 0.5s ease forwards";
    }, 100 * index);
  });

  // Exécuter l'animation au chargement et au défilement
  animateOnScroll();
  window.addEventListener("scroll", animateOnScroll);

  // Animation particules dans le hero
  function createParticles() {
    const hero = document.querySelector(".hero");
    const particlesCount = 20;

    for (let i = 0; i < particlesCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";

      // Style pour les particules
      particle.style.position = "absolute";
      particle.style.width = Math.random() * 10 + 5 + "px";
      particle.style.height = particle.style.width;
      particle.style.background = "rgba(255, 255, 255, 0.5)";
      particle.style.borderRadius = "50%";
      particle.style.pointerEvents = "none";

      // Position aléatoire
      particle.style.left = Math.random() * 100 + "%";
      particle.style.top = Math.random() * 100 + "%";

      // Animation
      particle.style.animation = `float ${
        Math.random() * 6 + 4
      }s ease-in-out infinite`;
      particle.style.animationDelay = Math.random() * 5 + "s";

      hero.appendChild(particle);
    }
  }

  createParticles();

  // Animation parallaxe sur le héros
  window.addEventListener("mousemove", (e) => {
    const hero = document.querySelector(".hero");
    const heroContent = document.querySelector(".hero-content");

    if (hero && heroContent) {
      const moveX = (e.clientX - window.innerWidth / 2) / 30;
      const moveY = (e.clientY - window.innerHeight / 2) / 30;

      heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;

      // Animation des particules en fonction du mouvement de la souris
      const particles = document.querySelectorAll(".particle");
      particles.forEach((particle, index) => {
        const factor = ((index % 5) + 1) / 5;
        particle.style.transform = `translate(${moveX * factor}px, ${
          moveY * factor
        }px)`;
      });
    }
  });

  // Animation scroll smooth
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Animation pour les cartes d'événements au hover
  const eventCards = document.querySelectorAll(".event-card");
  eventCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
      this.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.1)";
      this.style.transition = "all 0.3s ease";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
    });
  });
});
