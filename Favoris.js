async function chargerFavoris() {
  try {
      const response = await fetch('assets/json/favoris.json');
      if (!response.ok) {
          throw new Error('Impossible de charger les recettes favorites.');
      }
      const data = await response.json();
      if (!data || !data.recettes || data.recettes.length === 0) {
          throw new Error('Aucune recette favorite trouvée dans le fichier JSON.');
      }
      afficherFavoris(data.recettes);
  } catch (error) {
      console.error(error.message);
  }
}

function afficherFavoris(recettes) {
  const favorisDiv = document.getElementById('favoris');
  recettes.forEach(recette => {
      const favoriCard = `
          <div id="${recette.nom}" class="col-md-4 mb-3">
              <div class="card">
                  <div class="card-body">
                      <h5 class="card-title">${recette.nom}</h5>
                      <p class="card-text">${recette.categorie}</p>
                      <p class="card-text">Temps de préparation: ${recette.temps_preparation}</p>
                      <ul class="list-group">
                          ${recette.ingredients.map(ingredient => `<li class="list-group-item">${ingredient.quantite} ${ingredient.nom}</li>`).join('')}
                      </ul>
                      <h6 class="mt-3">Étapes:</h6>
                      <ol>
                          ${recette.etapes.map(etape => `<li>${etape}</li>`).join('')}
                      </ol>
                      <button class="btn btn-danger" onclick="supprimerRecette('${recette.nom}')">Supprimer</button>
                  </div>
              </div>
          </div>
      `;
      favorisDiv.innerHTML += favoriCard;
  });
}

function supprimerRecette(nom) {
  const favoriDiv = document.getElementById(nom);
  if (favoriDiv) {
      favoriDiv.remove();
  } else {
      console.error('La recette à supprimer n\'a pas été trouvée dans le DOM.');
  }
}

window.onload = chargerFavoris;