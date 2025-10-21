document.addEventListener("DOMContentLoaded", function () {
  // Menu burger functionality
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownContainer = document.querySelector('.dropdown-container');

  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', function() {
    this.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    // Empêcher le scroll du body quand le menu est ouvert
    if (navMenu.classList.contains('active')) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  // Toggle dropdown des catégories
  dropdownToggle.addEventListener('click', function(e) {
    e.preventDefault();
    dropdownContainer.classList.toggle('active');
  });

  // Fermer le menu mobile seulement quand on clique sur la croix
  // (pas de fermeture automatique sur les liens ou en dehors)

  // Fermer le dropdown quand on clique en dehors (desktop)
  document.addEventListener('click', function(e) {
    if (window.innerWidth > 768) {
      if (!dropdownContainer.contains(e.target)) {
        dropdownContainer.classList.remove('active');
      }
    }
  });

  // Gérer le redimensionnement de la fenêtre
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      mobileMenuToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  // Animation for elements on scroll
  const animateElements = (elements, animationClass) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(animationClass);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    elements.forEach((el) => observer.observe(el));
  };

  // Apply animations to different sections
  animateElements(document.querySelectorAll(".product-card"), "fadeIn");
  animateElements(
    document.querySelectorAll(".category-card:nth-child(odd)"),
    "slideInLeft"
  );
  animateElements(
    document.querySelectorAll(".category-card:nth-child(even)"),
    "slideInRight"
  );
  animateElements(document.querySelectorAll(".promo-card"), "rotateIn");

  // Apply staggered animations to products
  const products = document.querySelectorAll(".product-card");
  products.forEach((product, index) => {
    product.style.animationDelay = `${0.15 * index}s`;
  });

  // Simple shopping cart functionality with animation
  const cartButtons = document.querySelectorAll(".btn-secondary");
  let cartCount = 0;

  cartButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      cartCount++;

      // Animate the cart icon
      const cartIcon = document.querySelector(".user-actions a:last-child");
      cartIcon.innerHTML = `<i class="fas fa-shopping-cart"></i> Panier (${cartCount})`;
      cartIcon.classList.add("pulseScale");
      setTimeout(() => {
        cartIcon.classList.remove("pulseScale");
      }, 2000);

      // Animate the product card
      const parent = this.closest(".product-card");
      parent.style.boxShadow = "0 0 0 2px var(--secondary-color)";
      parent.style.transform = "translateY(-10px) scale(1.02)";

      // Create and animate a "Added to cart" notification
      const notification = document.createElement("div");
      notification.textContent = "Ajouté au panier!";
      notification.style.position = "absolute";
      notification.style.top = "10px";
      notification.style.right = "10px";
      notification.style.background = "var(--secondary-color)";
      notification.style.color = "white";
      notification.style.padding = "5px 10px";
      notification.style.borderRadius = "4px";
      notification.style.opacity = "0";
      notification.style.transform = "translateY(-20px)";
      notification.style.transition = "all 0.3s ease";

      parent.style.position = "relative";
      parent.appendChild(notification);

      // Show notification
      setTimeout(() => {
        notification.style.opacity = "1";
        notification.style.transform = "translateY(0)";
      }, 10);

      // Reset card style and remove notification
      setTimeout(() => {
        parent.style.boxShadow = "var(--box-shadow)";
        parent.style.transform = "";
        notification.style.opacity = "0";
        notification.style.transform = "translateY(-10px)";
      }, 2000);

      setTimeout(() => {
        notification.remove();
      }, 2300);
    });
  });

  // Add hover animations
  const categoryCards = document.querySelectorAll(".category-card");
  categoryCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const img = this.querySelector("img");
      img.style.transform = "scale(1.1)";
      img.style.transition = "transform 0.5s ease";
    });

    card.addEventListener("mouseleave", function () {
      const img = this.querySelector("img");
      img.style.transform = "scale(1)";
    });
  });

  // Add shimmer effect to buttons on hover
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.classList.add("shimmer-effect");
    });

    btn.addEventListener("mouseleave", function () {
      this.classList.remove("shimmer-effect");
    });
  });

  // Animate logo
  const logo = document.querySelector(".logo");
  logo.style.position = "relative";
  logo.addEventListener("mouseenter", function () {
    this.style.transform = "scale(1.1)";
    this.style.transition = "transform 0.3s ease";
    this.style.color = "var(--secondary-color)";
  });

  logo.addEventListener("mouseleave", function () {
    this.style.transform = "scale(1)";
    this.style.color = "var(--primary-color)";
  });

  // Animate navigation menu items
  const navItems = document.querySelectorAll(".nav-menu > li > a");
  navItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px)";
      this.style.transition = "all 0.3s ease";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });

  // Effet de recherche animée
  const searchInput = document.getElementById("search-input");
  const searchSuggestions = document.getElementById("search-suggestions");

  const demoProducts = [
    "Smartphone dernier modèle",
    "Écouteurs sans fil",
    "Montre connectée",
    "Caméra HD",
    "Ordinateur portable",
    "Tablette tactile",
    "Enceinte bluetooth",
    "Casque audio",
  ];

  searchInput.addEventListener("focus", function () {
    this.style.boxShadow = "0 0 0 2px var(--primary-color)";
    this.style.transition = "all 0.3s ease";
  });

  searchInput.addEventListener("blur", function () {
    this.style.boxShadow = "none";
    setTimeout(() => {
      searchSuggestions.style.display = "none";
    }, 200);
  });

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    if (query.length > 1) {
      const results = demoProducts.filter((product) =>
        product.toLowerCase().includes(query)
      );

      if (results.length) {
        searchSuggestions.innerHTML = "";
        results.forEach((result) => {
          const div = document.createElement("div");
          div.className = "suggestion-item";
          div.textContent = result;
          div.style.padding = "10px 15px";
          div.style.borderBottom = "1px solid #eee";
          div.style.cursor = "pointer";
          div.style.transition = "all 0.2s ease";

          div.addEventListener("mouseenter", function () {
            this.style.backgroundColor = "rgba(58, 134, 255, 0.1)";
          });

          div.addEventListener("mouseleave", function () {
            this.style.backgroundColor = "transparent";
          });

          div.addEventListener("click", function () {
            searchInput.value = this.textContent;
            searchSuggestions.style.display = "none";
          });

          searchSuggestions.appendChild(div);
        });

        searchSuggestions.style.display = "block";

        // Animation des suggestions
        const items = searchSuggestions.querySelectorAll(".suggestion-item");
        items.forEach((item, index) => {
          item.style.opacity = "0";
          item.style.transform = "translateY(10px)";
          item.style.transition = "all 0.3s ease";

          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 50 * index);
        });
      } else {
        searchSuggestions.style.display = "none";
      }
    } else {
      searchSuggestions.style.display = "none";
    }
  });

  document
    .querySelector(".newsletter-form")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      const email = this.querySelector("input").value;
      if (email) {
        const confirmMessage = document.getElementById("confirmation-message");
        confirmMessage.textContent =
          "Merci ! Votre adresse email a bien été enregistrée.";
        confirmMessage.style.display = "block";
        this.querySelector("input").value = "";

        // Animation pour le message de confirmation
        confirmMessage.style.animation = "none";
        setTimeout(() => {
          confirmMessage.style.animation = "fadeIn 0.5s ease forwards";
        }, 10);
      }
    });
});
