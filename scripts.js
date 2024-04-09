let recipes = [];
let currentRecipeIndex = 0;
function loadRecipes() {
    fetch('assets/json/data.json')
        .then(response => response.json())
        .then(data => {
            if (data.recettes && Array.isArray(data.recettes)) {
                recipes = data.recettes;
                showRecipeDetails(currentRecipeIndex);
            } else {
                console.error('No recipes found in the JSON file.');
            }
        })
        .catch(error => console.error('Error fetching recipes:', error));
}

function showRecipeDetails(recipeIndex) {
    const recipe = recipes[recipeIndex];
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
        document.getElementById("favorite-btn").textContent = isFavorite(recipeIndex) ? "Remove from Favorites" : "Add to Favorites";
        currentRecipeIndex = recipeIndex;
        toggleNavArrows();
    }
}

function nextRecipe() {
    currentRecipeIndex++;
    if (currentRecipeIndex >= recipes.length) {
        currentRecipeIndex = 0;
    }
    showRecipeDetails(currentRecipeIndex);
}

function prevRecipe() {
    currentRecipeIndex--;
    if (currentRecipeIndex < 0) {
        currentRecipeIndex = recipes.length - 1;
    }
    showRecipeDetails(currentRecipeIndex);
}

function isFavorite(recipeIndex) {
    return favorites.includes(recipeIndex);
}

function toggleFavorite(recipeIndex) {
    const index = favorites.indexOf(recipeIndex);
    if (index !== -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(recipeIndex);
    }
    document.getElementById("favorite-btn").textContent = isFavorite(recipeIndex) ? "Remove from Favorites" : "Add to Favorites";
}

function hideRecipeDetails() {
    const stepsList = document.getElementById("recipe-steps");
    stepsList.innerHTML = "";
}

function toggleNavArrows() {
    const leftArrow = document.querySelector('.nav-arrow.left');
    const rightArrow = document.querySelector('.nav-arrow.right');

    if (currentRecipeIndex === 0) {
        leftArrow.style.display = 'none';
    } else {
        leftArrow.style.display = 'block';
    }

    if (currentRecipeIndex === recipes.length - 1) {
        rightArrow.style.display = 'none';
    } else {
        rightArrow.style.display = 'block';
    }
}

let favorites = [];

window.onload = loadRecipes;