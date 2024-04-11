fetch("../assets/json/data.json")
  .then(response => response.json())
  .then(data => {
    const recettes = data.recettes;
    const recettesParPage = 9;
    let pageActuelle = 1;

    function afficherRecettes(page) {
      const debut = (page - 1) * recettesParPage;
      const fin = debut + recettesParPage;
      const recettesPage = recettes.slice(debut, fin);

      const recettesContainer = document.getElementById('recettes-container');
      recettesContainer.innerHTML = '';
      recettesPage.forEach(recette => {
        const recetteElement = document.createElement('div');
        recetteElement.classList.add('recette');
        recetteElement.innerHTML = `
          <h2>${recette.nom}</h2>
          <p><strong>Catégorie:</strong> ${recette.categorie}</p>
          <p><strong>Temps de préparation:</strong> ${recette.temps_preparation}</p>
          <p><strong>Ingrédients:</strong></p>
          <ul>
            ${recette.ingredients.map(ingredient => `<li>${ingredient.nom} - ${ingredient.quantite}</li>`).join('')}
          </ul>
          <p><strong>Étapes:</strong></p>
          <ol>
            ${recette.etapes.map(etape => `<li>${etape}</li>`).join('')}
          </ol>
        `;
        recettesContainer.appendChild(recetteElement);
      });
    }

    afficherRecettes(pageActuelle);

    function changerPage(nouvellePage) {
      if (nouvellePage < 1 || nouvellePage > Math.ceil(recettes.length / recettesParPage)) {
        return;
      }
      pageActuelle = nouvellePage;
      afficherRecettes(pageActuelle);
    }

    const paginationContainer = document.getElementById('pagination');
    const nombrePages = Math.ceil(recettes.length / recettesParPage);
    for (let i = 1; i <= nombrePages; i++) {
      const bouton = document.createElement('button');
      bouton.textContent = i;
      bouton.addEventListener('click', () => changerPage(i));
      paginationContainer.appendChild(bouton);
    }
    document.querySelectorAll('#pagination button').forEach(button => {
      button.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
    
  })
  .catch(error => console.error('Une erreur s\'est produite lors de la récupération des données JSON:', error));


  