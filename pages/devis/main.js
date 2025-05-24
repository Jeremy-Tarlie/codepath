document.addEventListener("DOMContentLoaded", function () {
  const typeAppInput = document.getElementById("typeAppInput");
  const typeAppDropdown = document.getElementById("typeAppDropdown");
  const typeProjetInput = document.getElementById("typeProjetInput");
  const typeProjetDropdown = document.getElementById("typeProjetDropdown");
  const optionsContainer = document.getElementById("optionsContainer");
  const devisForm = document.getElementById("devisForm");
  let devisData = null;
  let selectedTypeApp = null;
  let selectedTypeProjet = null;

  // Charger les données du devis
  fetch("create_devis.json")
      .then((response) => response.json())
      .then((data) => {
          devisData = data;
          populateTypeApp();
      })
      .catch((error) =>
          console.error("Erreur lors du chargement des données:", error)
      );

  // Remplir le dropdown de type d'application
  function populateTypeApp() {
      typeAppDropdown.innerHTML = "";

      Object.keys(devisData.type_app).forEach((key) => {
          const formattedText = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

          const link = document.createElement("a");
          link.href = "#";
          link.textContent = formattedText;
          link.dataset.value = key;

          link.addEventListener("click", function(e) {
              e.preventDefault();
              selectedTypeApp = this.dataset.value;
              typeAppInput.value = this.textContent;
              typeAppDropdown.classList.remove("show");

              // Réinitialiser et activer le champ de type de projet
              typeProjetInput.value = "";
              typeProjetInput.disabled = false;
              typeProjetDropdown.innerHTML = "";
              optionsContainer.innerHTML = "";

              if (selectedTypeApp) {
                  populateTypeProjet(selectedTypeApp);
                  populateOptions(selectedTypeApp);
              }
              updateTotal();
          });

          typeAppDropdown.appendChild(link);
      });
  }

  // Gérer le clic sur l'input
  typeAppInput.addEventListener("click", function() {
      typeAppDropdown.classList.toggle("show");
  });

  // Fermer les dropdowns si on clique en dehors
  document.addEventListener("click", function(e) {
      if (!e.target.matches("#typeAppInput")) {
          if (typeAppDropdown.classList.contains("show")) {
              typeAppDropdown.classList.remove("show");
          }
      }
      if (!e.target.matches("#typeProjetInput")) {
          if (typeProjetDropdown.classList.contains("show")) {
              typeProjetDropdown.classList.remove("show");
          }
      }
  });

  // Fonction de filtrage
  window.filterFunction = function() {
      const input = typeAppInput;
      const filter = input.value.toUpperCase();
      const div = typeAppDropdown;
      const links = div.getElementsByTagName("a");

      for (let i = 0; i < links.length; i++) {
          const txtValue = links[i].textContent || links[i].innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              links[i].style.display = "";
          } else {
              links[i].style.display = "none";
          }
      }
  };

  // Remplir le dropdown de type de projet
  function populateTypeProjet(typeApp) {
      typeProjetDropdown.innerHTML = "";
      const projets = devisData.type_projet[typeApp];

      Object.keys(projets).forEach((key) => {
          const formattedText = key.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

          const link = document.createElement("a");
          link.href = "#";
          link.textContent = formattedText;
          link.dataset.value = key;

          link.addEventListener("click", function(e) {
              e.preventDefault();
              selectedTypeProjet = this.dataset.value;
              typeProjetInput.value = this.textContent;
              typeProjetDropdown.classList.remove("show");
              updateTotal();
          });

          typeProjetDropdown.appendChild(link);
      });
  }

  // Gérer le clic sur l'input du type de projet
  typeProjetInput.addEventListener("click", function() {
      if (!this.disabled) {
          typeProjetDropdown.classList.toggle("show");
      }
  });

  // Fonction de filtrage pour le type de projet
  window.filterProjetFunction = function() {
      const input = typeProjetInput;
      const filter = input.value.toUpperCase();
      const div = typeProjetDropdown;
      const links = div.getElementsByTagName("a");

      // Filtrer les options existantes
      for (let i = 0; i < links.length; i++) {
          if (!links[i].classList.contains("create-new-option")) {
              const txtValue = links[i].textContent || links[i].innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
                  links[i].style.display = "";
              } else {
                  links[i].style.display = "none";
              }
          }
      }

      // Toujours afficher l'option "Créer" si du texte est saisi
      const createNewLink = div.querySelector(".create-new-option");
      if (filter) {
          if (!createNewLink) {
              const newLink = document.createElement("a");
              newLink.href = "#";
              newLink.className = "create-new-option";
              newLink.innerHTML = `<i class="fas fa-plus"></i> Créer "${input.value}"`;
              newLink.style.color = "#3498db";
              newLink.style.fontWeight = "bold";
              newLink.style.borderTop = "1px solid #ddd";
              newLink.style.marginTop = "5px";
              newLink.style.paddingTop = "10px";

              newLink.addEventListener("click", function(e) {
                  e.preventDefault();
                  const newProjetName = input.value.trim();
                  if (newProjetName && selectedTypeApp) {
                      // Créer un identifiant unique pour le nouveau projet
                      const newProjetId = `custom_${newProjetName.toLowerCase().replace(/\s+/g, '_')}`;

                      // Ajouter le nouveau projet aux données
                      if (!devisData.type_projet[selectedTypeApp]) {
                          devisData.type_projet[selectedTypeApp] = {};
                      }
                      devisData.type_projet[selectedTypeApp][newProjetId] = {
                          price: 0 // Prix par défaut
                      };

                      // Ajouter le nouveau projet au dropdown
                      const link = document.createElement("a");
                      link.href = "#";
                      link.textContent = newProjetName;
                      link.dataset.value = newProjetId;

                      link.addEventListener("click", function(e) {
                          e.preventDefault();
                          selectedTypeProjet = this.dataset.value;
                          typeProjetInput.value = this.textContent;
                          typeProjetDropdown.classList.remove("show");
                          updateTotal();
                      });

                      typeProjetDropdown.appendChild(link);

                      // Sélectionner automatiquement le nouveau projet
                      selectedTypeProjet = newProjetId;
                      typeProjetInput.value = newProjetName;
                      typeProjetDropdown.classList.remove("show");
                      updateTotal();
                  }
              });

              div.appendChild(newLink);
          } else {
              createNewLink.innerHTML = `<i class="fas fa-plus"></i> Créer "${input.value}"`;
          }
      } else if (createNewLink) {
          createNewLink.remove();
      }
  };

  // Remplir les options
  function populateOptions(typeApp) {
      const options = devisData.option[`option_${typeApp.split("_")[1]}`];
      Object.keys(options).forEach((key) => {
          const optionDiv = document.createElement("div");
          optionDiv.className = "option-item";

          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.id = key;
          checkbox.name = "options[]";
          checkbox.value = key;
          checkbox.addEventListener("change", updateTotal);
          console.log(key);
          checkbox.checked = key === "design_responsive";

          const label = document.createElement("label");
          label.htmlFor = key;
          label.textContent = key
              .replace(/_/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase());

          const price = document.createElement("span");
          price.className = "option-price";
          price.textContent = `${options[key].price}€`;

          optionDiv.appendChild(checkbox);
          optionDiv.appendChild(label);
          optionDiv.appendChild(price);
          optionsContainer.appendChild(optionDiv);
      });

      const optionDiv = document.createElement("div");
      optionDiv.className = "option-item";
      optionDiv.id = "other";

      const label = document.createElement("label");
      label.htmlFor = "other";
      label.textContent = "Option personnalisée :";
      label.style.flex = "none";

      const input = document.createElement("input");
      input.id = "other_input";
      input.name = "other";
      input.placeholder = "Description de l'option";

      const add = document.createElement("input");
      add.type = "button";
      add.className = "btn-primary";
      add.value = `Ajouter une option`;

      optionDiv.appendChild(label);
      optionDiv.appendChild(input);
      optionDiv.appendChild(add);
      optionsContainer.appendChild(optionDiv);

      add.addEventListener("click", function () {
          const otherValue = input.value.trim();
          if (otherValue) {
              const newOptionDiv = document.createElement("div");
              newOptionDiv.className = "option-item";

              const newCheckbox = document.createElement("input");
              newCheckbox.type = "checkbox";
              newCheckbox.id = `other_${otherValue}`;
              newCheckbox.name = "options[]";
              newCheckbox.value = `other_${otherValue}`;
              newCheckbox.addEventListener("change", updateTotal);

              const newLabel = document.createElement("label");
              newLabel.htmlFor = `other_${otherValue}`;
              newLabel.textContent = otherValue;



              const removeButton = document.createElement("button");
              removeButton.type = "button";
              removeButton.className = "btn-remove";
              removeButton.textContent = "X";
              removeButton.style.marginLeft = "10px";
              removeButton.addEventListener("click", function() {
                  newOptionDiv.remove();
                  updateTotal();
              });

              newOptionDiv.appendChild(newCheckbox);
              newOptionDiv.appendChild(newLabel);
              newOptionDiv.appendChild(removeButton);

              const other = document.getElementById("other");
              optionsContainer.insertBefore(newOptionDiv, other);

              input.value = "";
              updateTotal();
          }
      });
  }

  // Mettre à jour le total
  function updateTotal() {
      const typeApp = selectedTypeApp;
      const typeProjet = selectedTypeProjet;
      const selectedOptions = Array.from(
          document.querySelectorAll('input[name="options[]"]:checked')
      ).map((checkbox) => checkbox.value);

      let total = 0;

      // Ajouter le prix du type d'application
      if (typeApp) {
          total += devisData.type_app[typeApp].price;
      }

      // Ajouter le prix du type de projet
      if (typeProjet && typeApp) {
          total += devisData.type_projet[typeApp][typeProjet].price;
      }

      // Ajouter le prix des options sélectionnées
      if (typeApp) {
          const optionType = `option_${typeApp.split("_")[1]}`;
          selectedOptions.forEach((option) => {
              if (devisData.option[optionType] && devisData.option[optionType][option]) {
                  total += devisData.option[optionType][option].price;
              }
          });
      }

      // Mettre à jour l'affichage du total
      let totalContainer = document.querySelector(".total-container");
      if (!totalContainer) {
          totalContainer = document.createElement("div");
          totalContainer.className = "total-container";
          const totalTitle = document.createElement("h3");
          totalTitle.textContent = "Total estimé :";
          const totalAmount = document.createElement("div");
          totalAmount.className = "total-amount";
          totalContainer.appendChild(totalTitle);
          totalContainer.appendChild(totalAmount);
          devisForm.appendChild(totalContainer);
      }

      const totalAmount = totalContainer.querySelector(".total-amount");
      totalAmount.textContent = `${total}€`;
  }

  // Ajouter les écouteurs d'événements pour le calcul en temps réel
  typeProjetInput.addEventListener("change", updateTotal);
});