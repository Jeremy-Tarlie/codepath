// Données des templates
const templates = {
  template7: {
    title: "Ville-du-Normandie",
    description:
      "Template moderne et complet pour site de mairie : actualités, vie municipale, services en ligne, événements, calendrier et contact. Interface responsive et intuitive pour une communication efficace avec les citoyens.",
    img: "/templates/mairie/img/preview.png",
    img_grand: "/templates/mairie/img/preview_grand.png",
    tags: ["Mairie", "Administration", "Collectivité", "Services publics", "Citoyen"],
    features: [
      "Page d'accueil avec actualités et informations importantes",
      "Vie municipale : élus, conseil municipal, commissions",
      "Services en ligne : démarches administratives et réservations",
      "Calendrier des événements et des conseils municipaux",
      "Section contact complète avec formulaire",
      "Navigation intuitive et design responsive",
    ],
    link: "/templates/7/",
    new: true,
  },
  
  template6: {
    title: "Post",
    description:
      "Template professionnel pour agence de communication ou marketing : design moderne, services variés, formulaire de recherche intelligent et témoignages clients.",
    img: "/templates/post/img/preview.png",
    img_grand: "/templates/post/img/preview_grand.png",
    tags: ["Agence", "Marketing", "Communication", "Web", "Design"],
    features: [
      "Section de recherche multi-critères intégrée",
      "Présentation des services : digital, print, vidéo, design",
      "Statistiques animées (clients, projets, prix)",
      "Témoignages clients et réalisations",
      "Newsletter, contact complet et interface responsive",
    ],
    link: "/templates/6/",
  },
  
  template5: {
    title: "Fleurs & Merveilles",
    description:
      "Un site e-commerce raffiné dédié à l'univers floral : bouquets par occasion, livraison rapide, engagements écoresponsables et compositions artisanales.",
    img: "/templates/commerce2/img/preview.png",
    img_grand: "/templates/commerce2/img/preview_grand.png",
    tags: ["E-commerce", "Fleuriste", "Nature", "Écoresponsable", "Artisanat"],
    features: [
      "Livraison express à Paris en 4h",
      "Catégories par événements : mariage, deuil, anniversaire…",
      "Engagements forts : local, bio, artisanal",
      "Système de panier interactif",
      "Newsletter avec avantages exclusifs",
    ],
    link: "/templates/5/",
  },
  
  template4: {
    title: "BoutiqueEnLigne",
    description:
      "Une boutique moderne pour explorer les dernières tendances, promotions et nouveautés dans l'univers de l'électronique, la mode, la maison et plus encore.",
    img: "templates/commerce/img/preview.png",
    img_grand: "templates/commerce/img/preview_grand.png",
    tags: ["E-commerce", "Boutique", "Produits", "Promotions", "Shopping"],
    features: [
      "Recherche en temps réel avec suggestions",
      "Navigation par catégories : Électronique, Mode, Maison...",
      "Produits populaires avec options d'achat rapide",
      "Promotions dynamiques et offres saisonnières",
      "Intégration newsletter et espace client",
    ],
    link: "/templates/4/",
  },
  
  template3: {
    title: "Château de Hautclair",
    description:
      "Un site élégant pour découvrir le patrimoine du Château de Hautclair, son histoire médiévale, ses événements culturels et ses visites guidées.",
    img: "templates/chateau/img/preview.png",
    img_grand: "templates/chateau/img/preview_grand.png",
    tags: ["Culture", "Patrimoine", "Tourisme", "Événementiel"],
    features: [
      "Présentation de l'histoire du château",
      "Informations pratiques : horaires, tarifs, accès",
      "Événements à venir : festivals, expositions",
      "Galerie photos immersive",
      "Section contact et réservation en ligne",
    ],
    link: "/templates/3/",
  },
  
  template2: {
    title: "Association Nom",
    description:
      "Ensemble, pour un monde meilleur. Une association engagée dans des actions concrètes pour un avenir durable.",
    img: "templates/assos2/img/preview.png",
    img_grand: "templates/assos2/img/preview_grand.png",
    tags: ["Association", "Solidarité", "Bénévolat", "Engagement"],
    features: [
      "Mission : Décrire la mission de l'association",
      "Actions : Trois initiatives phares à fort impact",
      "Engagement : Ouvert aux bénévoles et adhérents",
      "Vision : Pour un monde meilleur fondé sur des valeurs fortes",
    ],
    link: "/templates/2/",
  },
  
  template1: {
    title: "Harmonie",
    description:
      "Association Harmonie - Ensemble pour un avenir meilleur. Découvrez nos missions, nos actions, et notre impact positif sur la société.",
    img: "templates/assos1/img/preview.png",
    img_grand: "templates/assos1/img/preview_grand.png",
    tags: ["Association", "Solidarité", "Engagement citoyen"],
    features: [
      "Mission : Promouvoir la solidarité et l'entraide",
      "Actions : Activités sociales et éducatives",
      "Impact : Amélioration du bien-être collectif",
      "Événements : Rencontres, ateliers et conférences",
    ],
    link: "/templates/1/",
  },
};

// Gestion des modals pour les templates
const modal = document.getElementById("templateModal");
const modalPreview = document.getElementById("modal-preview");
const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalTags = document.getElementById("modal-tags");
const modalFeatures = document.getElementById("modal-features");
const closeBtn = document.querySelector(".close-btn");
const templateBtns = document.querySelectorAll(".template-btn");

// Génération automatique des template cards
const templatesGrid = document.getElementById("templates-grid");
templatesGrid.innerHTML = "";

Object.entries(templates).forEach(([id, template]) => {
  // On ignore les doublons ou entrées invalides
  if (!template.title || !template.img) return;

  const card = document.createElement("div");
  card.className = "template-card";
  card.dataset.id = id;
  card.innerHTML = `
        <div class="template-img" style="background-image: url('${
          template.img
        }')">
            ${template.new ? '<span class="badge-new">Nouveau</span>' : ''}
        </div>
        <div class="template-content">
            <h3>${template.title}</h3>
            <p>${
              template.description.length > 50
                ? template.description.substring(0, 50) + "..."
                : template.description
            }</p>
            <div class="tags">
                ${template.tags
                  .map((tag) => `<span class="tag">${tag}</span>`)
                  .join("")}
            </div>
            <a href="#" class="btn template-btn">Voir le template</a>
        </div>
    `;
  templatesGrid.appendChild(card);
});

// Re-sélectionner les nouveaux boutons pour la modale
const newTemplateBtns = document.querySelectorAll(".template-btn");
newTemplateBtns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    const templateId = this.closest(".template-card").dataset.id;
    const template = templates[templateId];

    // Supprimer toute image précédente
    modalPreview.innerHTML = '';
    // Créer et insérer la nouvelle image
    const img = document.createElement('img');
    img.src = template.img_grand;
    img.alt = template.title;
    img.style.width = '100%';
    img.style.height = 'auto';
    img.style.display = 'block';
    modalPreview.appendChild(img);

    modalTitle.textContent = template.title;
    modalDescription.textContent = template.description;

    modalTags.innerHTML = "";
    template.tags.forEach((tag) => {
      const tagSpan = document.createElement("span");
      tagSpan.classList.add("tag");
      tagSpan.textContent = tag;
      modalTags.appendChild(tagSpan);
    });

    modalFeatures.innerHTML = "";
    template.features.forEach((feature) => {
      const li = document.createElement("li");
      li.textContent = feature;
      modalFeatures.appendChild(li);
    });

    // Mettre à jour le lien du bouton "Voir la démo"
    const demoBtn = document.getElementById("demo-btn");
    demoBtn.setAttribute("href", template.link);
    demoBtn.setAttribute("target", "_blank");

    modal.style.display = "block";
  });
});

// Fermer la modal
closeBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Animation au scroll
window.addEventListener("scroll", function () {
  const cards = document.querySelectorAll(".service-card, .template-card");

  cards.forEach((card) => {
    const cardPosition = card.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (cardPosition < screenPosition) {
      card.style.opacity = "1";
      // card.style.transform = "translateY(0)";
    }
  });
});

// Données détaillées pour chaque service
const serviceDetails = {
  "conception-web": {
    title: "Conception Web",
    description:
      "Création de sites web sur mesure avec un design adapté à votre image de marque et à vos objectifs.",
    icon: "🎨",
    details:
      "Notre service de conception web offre des solutions personnalisées pour créer un site internet qui vous ressemble. Nous prenons en compte votre identité visuelle, vos objectifs commerciaux et les besoins de vos utilisateurs pour concevoir une expérience en ligne optimale.",
    features: [
      "Design sur mesure adapté à votre marque",
      "Interface utilisateur intuitive et moderne",
      "Architecture de l'information optimisée",
      "Expérience utilisateur (UX) soignée",
      "Compatibilité avec tous les navigateurs modernes",
    ],
    process: [
      "Analyse de vos besoins et objectifs",
      "Création de maquettes et wireframes",
      "Design graphique et validation",
      "Intégration et développement",
      "Tests et mise en ligne",
    ],
  },
  "responsive-design": {
    title: "Responsive Design",
    description:
      "Conception adaptative pour une expérience utilisateur optimale sur tous les appareils.",
    icon: "📱",
    details:
      "Le responsive design est essentiel aujourd'hui où plus de 60% du trafic web provient des appareils mobiles. Nous créons des sites qui s'adaptent automatiquement à tous les formats d'écran pour offrir une expérience utilisateur optimale, quelle que soit la façon dont vos visiteurs accèdent à votre site.",
    features: [
      "Adaptation automatique à tous les appareils (desktop, tablette, mobile)",
      "Optimisation des images pour le chargement rapide",
      "Éléments d'interface adaptés au toucher pour mobile",
      "Mise en page fluide et dynamique",
      "Tests sur multiples appareils et résolutions",
    ],
    process: [
      "Analyse des besoins multi-appareils",
      "Design en approche 'mobile-first'",
      "Création de maquettes adaptatives",
      "Développement avec media queries avancées",
      "Tests cross-device et optimisations",
    ],
  },
  seo: {
    title: "SEO",
    description:
      "Optimisation pour les moteurs de recherche pour améliorer votre visibilité en ligne.",
    icon: "🔍",
    details:
      "Notre service SEO (Search Engine Optimization) aide votre site à gagner en visibilité dans les résultats des moteurs de recherche comme Google. Nous mettons en place des stratégies d'optimisation techniques et éditoriales pour améliorer votre classement et attirer un trafic qualifié vers votre site.",
    features: [
      "Audit SEO complet de votre site",
      "Optimisation technique (vitesse, structure, balisage)",
      "Recherche de mots-clés stratégiques",
      "Optimisation du contenu et des méta-données",
      "Suivi et analyse des performances",
    ],
    process: [
      "Analyse de votre positionnement actuel",
      "Étude de la concurrence et des mots-clés",
      "Optimisation on-page (contenu, structure)",
      "Optimisation technique (code, vitesse)",
      "Suivi des résultats et ajustements",
    ],
  },
};

// Création de la modale de service (à ajouter au HTML)
function createServiceModal() {
  const modalHTML = `
    <div id="serviceModal" class="modal">
        <div class="modal-content">
            <span class="close-btn">&times;</span>
            <div class="service-details">
                <div class="service-icon" id="modal-service-icon"></div>
                <div class="service-info">
                    <h2 id="modal-service-title"></h2>
                    <p id="modal-service-description"></p>
                    
                    <div class="service-section">
                        <h3>Caractéristiques</h3>
                        <ul id="modal-service-features"></ul>
                    </div>
                    
                    <div class="service-section">
                        <h3>Notre processus</h3>
                        <ol id="modal-service-process"></ol>
                    </div>
                    
                    <div class="btn-group">
                        <a href="/contact/" class="btn btn-primary" id="contact-btn">Demander un devis</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

  // Ajouter la modale au body
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  // Ajouter du CSS pour l'icône et les sections de service
  const styleElement = document.createElement("style");
  styleElement.textContent = `
        .service-icon {
            font-size: 4rem;
            text-align: center;
            padding: 40px;
            background-color: #f8f9fa;
            border-radius: 10px;
            margin-right: 20px;
        }
        
        .service-details {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 20px;
        }
        
        .service-section {
            margin-top: 25px;
        }
        
        @media (max-width: 768px) {
            .service-details {
                grid-template-columns: 1fr;
            }
            
            .service-icon {
                padding: 20px;
                margin-right: 0;
            }
        }
        
        #modal-service-process {
            padding-left: 20px;
        }
        
        #modal-service-process li {
            margin-bottom: 10px;
            position: relative;
        }
        
        .service-info {
            padding: 20px;
        }
    `;
  document.head.appendChild(styleElement);
}

// Fonction pour ouvrir la modale de service
function openServiceModal(serviceId) {
  const serviceModal = document.getElementById("serviceModal");
  const modalIcon = document.getElementById("modal-service-icon");
  const modalTitle = document.getElementById("modal-service-title");
  const modalDescription = document.getElementById("modal-service-description");
  const modalFeatures = document.getElementById("modal-service-features");
  const modalProcess = document.getElementById("modal-service-process");
  const contactBtn = document.getElementById("contact-btn");

  const service = serviceDetails[serviceId];

  // Remplir la modale avec les détails du service
  modalIcon.textContent = service.icon;
  modalTitle.textContent = service.title;
  modalDescription.textContent = service.details;

  // Remplir les caractéristiques
  modalFeatures.innerHTML = "";
  service.features.forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    modalFeatures.appendChild(li);
  });

  // Remplir le processus
  modalProcess.innerHTML = "";
  service.process.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step;
    modalProcess.appendChild(li);
  });

  // Afficher la modale
  serviceModal.style.display = "block";

  // Gérer le clic sur le bouton de contact
  contactBtn.addEventListener("click", function () {
    serviceModal.style.display = "none";
    // Rediriger vers la page de contact
    window.location.href = "/contact/";
  });
}

// Fonction d'initialisation pour ajouter les event listeners
function initServiceModals() {
  // Créer la modale si elle n'existe pas
  if (!document.getElementById("serviceModal")) {
    createServiceModal();
  }

  // Configurer les boutons "En savoir plus" des services
  const serviceLinks = document.querySelectorAll(".service-content .btn");

  serviceLinks.forEach((link, index) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      // Déterminer quel service a été cliqué
      const serviceCard = this.closest(".service-card");
      const serviceTitle = serviceCard.querySelector("h3").textContent;

      let serviceId;
      if (serviceTitle.includes("Conception Web")) {
        serviceId = "conception-web";
      } else if (serviceTitle.includes("Responsive Design")) {
        serviceId = "responsive-design";
      } else if (serviceTitle.includes("SEO")) {
        serviceId = "seo";
      }

      if (serviceId) {
        openServiceModal(serviceId);
      }
    });
  });

  // Fermer la modale avec le bouton de fermeture
  const closeServiceBtn = document.querySelector("#serviceModal .close-btn");
  if (closeServiceBtn) {
    closeServiceBtn.addEventListener("click", function () {
      document.getElementById("serviceModal").style.display = "none";
    });
  }

  // Fermer la modale en cliquant en dehors
  window.addEventListener("click", function (event) {
    const serviceModal = document.getElementById("serviceModal");
    if (event.target === serviceModal) {
      serviceModal.style.display = "none";
    }
  });
}

// Exécuter l'initialisation après le chargement de la page
document.addEventListener("DOMContentLoaded", function () {
  initServiceModals();
});

// Si le script est chargé après le DOMContentLoaded, initialiser immédiatement
if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  initServiceModals();
}
