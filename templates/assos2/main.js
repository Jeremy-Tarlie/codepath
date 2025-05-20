// Mobile menu toggle
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");
const closeMenuBtn = document.querySelector(".close-btn");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

closeMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Scroll animation
const sections = document.querySelectorAll("section");

function checkSections() {
  const triggerBottom = window.innerHeight * 0.8;

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;

    if (sectionTop < triggerBottom) {
      section.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", checkSections);
window.addEventListener("load", checkSections);

// Form submission (placeholder)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    alert(
      "Merci pour votre message ! Nous vous répondrons dans les plus brefs délais."
    );
    contactForm.reset();
  });
}
