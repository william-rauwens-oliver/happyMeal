    // Déclaration d'un tableau vide pour stocker les recettes
    let recipes = [];

    // Fonction pour charger les recettes depuis un fichier JSON
    function loadRecipes() {
        fetch('assets/json/data.json')
            .then(response => response.json())
            .then(data => {
                if (data.recettes && Array.isArray(data.recettes)) {
                    recipes = data.recettes;
                    // Peut-être ici vous pouvez appeler showRecipeDetails() pour afficher la première recette par défaut
                } else {
                    console.error('No recipes found in the JSON file.');
                }
            })
            .catch(error => console.error('Error fetching recipes:', error));
    }

    // Fonction pour afficher les détails d'une recette
    function showRecipeDetails(recipeId) {
        const recipe = recipes[recipeId - 1];
        if (recipe) {
            document.getElementById("recipe-name").textContent = recipe.nom;
            let ingredientsList = "";
            recipe.ingredients.forEach(ingredient => {
                ingredientsList += `${ingredient.nom} (${ingredient.quantite}), `;
            });
            ingredientsList = ingredientsList.slice(0, -2);
            document.getElementById("recipe-ingredients").textContent = ingredientsList;
            document.getElementById("recipe-cooking-time").textContent = recipe.temps_preparation;
            const stepsList = document.getElementById("recipe-steps");
            stepsList.innerHTML = "";
            recipe.etapes.forEach((step, index) => {
                const li = document.createElement("li");
                li.textContent = `${index + 1}. ${step}`;
                stepsList.appendChild(li);
            });
            document.getElementById("recipe-details").style.display = "block";
            document.getElementById("favorite-btn").textContent = isFavorite(recipeId) ? "Remove from Favorites" : "Add to Favorites";
        }
    }

    // Fonction pour vérifier si une recette est dans les favoris
    function isFavorite(recipeId) {
        return favorites.includes(recipeId);
    }

    // Fonction pour ajouter ou retirer une recette des favoris
    function toggleFavorite(recipeId) {
        const index = favorites.indexOf(recipeId);
        if (index !== -1) {
            favorites.splice(index, 1);
        } else {
            favorites.push(recipeId);
        }
        document.getElementById("favorite-btn").textContent = isFavorite(recipeId) ? "Remove from Favorites" : "Add to Favorites";
    }

    // Fonction pour masquer les détails d'une recette
    function hideRecipeDetails() {
        document.getElementById("recipe-details").style.display = "none";
    }

    // Tableau pour stocker les recettes favorites
    let favorites = [];

    // Chargement des recettes au chargement de la page
    window.onload = loadRecipes;
