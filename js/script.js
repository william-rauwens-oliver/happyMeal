
function addToFavorites(element, nomRecette) {
    
    let recettesFavorites = JSON.parse(localStorage.getItem("recettesFavorites")) || [];

    
    if (recettesFavorites.some(recette => recette.nom === nomRecette)) {
        console.log("La recette est déjà dans les favoris.");
        return;
    }

    
    getRecipeDetails(nomRecette)
        .then(recette => {
            
            recettesFavorites.push(recette);
          
            element.querySelector('i').classList.add('text-warning');
            
            localStorage.setItem("recettesFavorites", JSON.stringify(recettesFavorites));
            console.log('La recette', nomRecette, 'a été ajoutée aux favoris');
        })
        .catch(error => console.error("Une erreur s'est produite lors de l'ajout de la recette aux favoris:", error));
}


function getRecipeDetails(nomRecette) {
    return fetch("../assets/json/data.json")
        .then(response => response.json())
        .then(data => {
            return data.recettes.find(recette => recette.nom === nomRecette);
        })
        .catch(error => console.error("Une erreur s'est produite lors de la récupération des détails de la recette:", error));
}


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
                    <i class="bi bi-star"></i>
                </span>
            </div>
        `;
        element.innerHTML = html;
    }

    
    const favorisContainer = document.getElementById("favoris");

   
    let recettesFavorites = JSON.parse(localStorage.getItem("recettesFavorites")) || [];

   
    if (recettesFavorites.length > 0) {
      
        recettesFavorites.forEach(recette => {
            const recetteHTML = `
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
                </div>
            `;
            favorisContainer.innerHTML += recetteHTML;
        });
    } else {
        
        favorisContainer.innerHTML = "<p>Aucune recette favorite pour le moment.</p>";
    }
});
