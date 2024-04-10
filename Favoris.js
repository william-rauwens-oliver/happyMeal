function chargerFavoris() {
  fetch('assets/json/favoris.json')
    .then(response => response.json())
    .then(data => {
      console.log(data.recettes);
      afficherFavoris(data.recettes);
    })
    .catch(error => console.error('Erreur de chargement des favoris:', error));
}

function afficherFavoris(favoris) {
  const favorisDiv = document.getElementById('favoris');
  favoris.forEach(favori => {
    const favoriCard = `
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">${favori.nom}</h5>
            <p class="card-text">${favori.categorie}</p>
            <p class="card-text">Temps de préparation: ${favori.temps_preparation}</p>
            <ul class="list-group">
              ${favori.ingredients.map(ingredient => `<li class="list-group-item">${ingredient.quantite} ${ingredient.nom}</li>`).join('')}
            </ul>
            <h6 class="mt-3">Étapes:</h6>
            <ol>
              ${favori.etapes.map(etape => `<li>${etape}</li>`).join('')}
            </ol>
          </div>
        </div>
      </div>
    `;
    favorisDiv.innerHTML += favoriCard;
  });
}

window.onload = chargerFavoris;
