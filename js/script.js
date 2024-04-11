document.addEventListener("DOMContentLoaded", function () {
    const recette1 = document.getElementById("recette1");
    const recette2 = document.getElementById("recette2");
    const recette3 = document.getElementById("recette3");

    fetch("../assets/json/data.json")
        .then(response => response.json())
        .then(data => {
            const randomRecettes = getRandomRecettes(data.recettes, 3);

            afficherRecette(randomRecettes[0], recette1);
            afficherRecette(randomRecettes[1], recette2);
            afficherRecette(randomRecettes[2], recette3);
        })
        .catch(error => console.error("Une erreur s'est produite lors de la récupération des données JSON:", error));

    // Charger les recettes favorites à partir du stockage local du navigateur
    let recettesFavorites = JSON.parse(localStorage.getItem("recettesFavorites")) || [];

    function getRandomRecettes(recettes, nombre) {
        const shuffled = recettes.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, nombre);
    }

    function afficherRecette(recette, element) {
        const html = `
            <div class="recette">
                <h3>${recette.nom}</h3>
                <p>Catégorie: ${recette.categorie}</p>
                <p>Temps de préparation: ${recette.temps_preparation}</p>
                <h4>Ingrédients:</h4>
                <ul>
                    ${recette.ingredients.map(ingredient => `<li>${ingredient.nom} - ${ingredient.quantite}</li>`).join("")}
                </ul>
                <h4>Étapes:</h4>
                <ol class="etapes">
                    ${recette.etapes.map(etape => `<li>${etape}</li>`).join("")}
                </ol>
                <span class="favorite-btn" onclick="addToFavorites(this, '${recette.nom}')">
                    <i class="bi bi-star${estEnFavoris(recette.nom) ? ' text-warning' : ''}"></i>
                </span>
            </div>
        `;
        element.innerHTML = html;
    }

    function addToFavorites(element, nomRecette) {
        const enFavoris = estEnFavoris(nomRecette);
    
        if (!enFavoris) {
            recettesFavorites.push({ nom: nomRecette });
        } else {
            recettesFavorites = recettesFavorites.filter(recette => recette.nom !== nomRecette);
        }

        // Enregistrer les recettes favorites dans le stockage local du navigateur
        localStorage.setItem("recettesFavorites", JSON.stringify(recettesFavorites));

        // Mettre à jour l'icône d'étoile pour refléter l'état de favoris
        element.querySelector('i').classList.toggle('text-warning', !enFavoris);
    }

    // Fonction utilitaire pour vérifier si une recette est en favoris
    function estEnFavoris(nomRecette) {
        return recettesFavorites.some(recette => recette.nom === nomRecette);
    }
});
