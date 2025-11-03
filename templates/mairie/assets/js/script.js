// Navigation active state
document.addEventListener("DOMContentLoaded", function () {
  const currentPage =
    new URLSearchParams(window.location.search).get("page") || "accueil";
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    const page = new URL(link.href).searchParams.get("page");
    if (page === currentPage || (!page && currentPage === "accueil")) {
      link.classList.add("active");
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Form validation
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const nom = document.getElementById("nom").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      if (!nom || !email || !message) {
        alert("Veuillez remplir tous les champs obligatoires.");
        return;
      }
      if (!isValidEmail(email)) {
        alert("Veuillez entrer une adresse email valide.");
        return;
      }
      alert(
        "Merci pour votre message ! Nous vous répondrons dans les plus brefs délais."
      );
      contactForm.reset();
    });
  }
});

function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver(function (entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      if (entry.target.classList.contains("card")) {
        entry.target.style.transform = "translateY(0)";
        // On card hover effect
        entry.target.addEventListener("mouseover", () => {
          entry.target.style.transform = "translateY(-10px)";
        });
        entry.target.addEventListener("mouseout", () => {
          entry.target.style.transform = "translateY(0)";
        });
      } else {
        entry.target.style.transform = "translateY(0)";
      }
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", function () {
  const cards = document.querySelectorAll(".card, .event-item, .info-box");
  cards.forEach((card) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(card);
  });
});

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.querySelector(".nav");
  const closeBtn = document.getElementById("nav-close");

  menuToggle.addEventListener("click", function () {
    if (nav.style.right === "0px") {
      nav.style.right = "-100%";
      closeBtn.style.display = "none";
      menuToggle.style.display = "block";
      menuToggle.style.visibility = "visible";
    } else {
      nav.style.right = "0px";
      closeBtn.style.display = "block";
      menuToggle.style.visibility = "hidden";
    }
  });

  closeBtn.addEventListener("click", function () {
    nav.style.right = "-100%";
    closeBtn.style.display = "none";
    menuToggle.style.display = "block";
    menuToggle.style.visibility = "visible";
  });

  // Si la taille de l'écran change et devient plus grande que 800px, réinitialiser le menu
  window.addEventListener("resize", function () {
    if (window.innerWidth > 800) {
      nav.style.right = "-100%";
      closeBtn.style.display = "none";
      menuToggle.style.display = "none";
    } else {
      menuToggle.style.display = "block";
      closeBtn.style.display = "none";
      menuToggle.style.visibility = "visible";
    }
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

const calendarEl = document.getElementById("calendar-grid");
const monthYearEl = document.getElementById("month-year");
const prevBtn = document.getElementById("prev-month");
const nextBtn = document.getElementById("next-month");

const today = new Date();
let displayMonth = today.getMonth();
let displayYear = today.getFullYear();

const monthNames = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

function updateCalendar(year, month) {
  monthYearEl.textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;

  calendarEl.innerHTML = "";

  // Jours vides
  for (let i = 0; i < adjustedFirstDay; i++) {
    const emptyEl = document.createElement("div");
    emptyEl.className = "day empty";
    calendarEl.appendChild(emptyEl);
  }

  // Jours du mois
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement("div");
    dayEl.className = "day";
    dayEl.textContent = day;

    // Jour actuel
    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayEl.classList.add("current");
    }

    // Événements exemple
    if ([5, 12, 18, 25].includes(day)) {
      dayEl.classList.add("event");
      dayEl.title = "Événement prévu";
    }

    calendarEl.appendChild(dayEl);
  }
}

prevBtn.addEventListener("click", () => {
  displayMonth--;
  if (displayMonth < 0) {
    displayMonth = 11;
    displayYear--;
  }
  updateCalendar(displayYear, displayMonth);
});

nextBtn.addEventListener("click", () => {
  displayMonth++;
  if (displayMonth > 11) {
    displayMonth = 0;
    displayYear++;
  }
  updateCalendar(displayYear, displayMonth);
});

updateCalendar(displayYear, displayMonth);
