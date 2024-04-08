const recipes = [
    {
       "nom":"Poulet rôti aux herbes",
       "categorie":"Plat principal",
       "temps_preparation":"1 heure",
       "ingredients":[
          {
             "nom":"Poulet",
             "quantite":"1"
          },
          {
             "nom":"Herbes fraîches",
             "quantite":"1"
          },
          {
             "nom":"Sel et poivre",
             "quantite":"10g"
          },
          {
             "nom":"Huile d'olive",
             "quantite":"10g"
          }
       ],
       "etapes":[
          "Préchauffez le four à 200°C.",
          "Nettoyez le poulet et assaisonnez-le généreusement avec du sel, du poivre et les herbes.",
          "Badigeonnez le poulet d'huile d'olive.",
          "Placez le poulet dans un plat allant au four et enfournez-le pendant environ 1 heure ou jusqu'à ce qu'il soit bien doré et cuit à cœur.",
          "Laissez reposer quelques minutes avant de découper et de servir."
       ]
    }
 ];
 
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
  function isFavorite(recipeId) {
     return favorites.includes(recipeId);
 }
 function toggleFavorite(recipeId) {
     const index = favorites.indexOf(recipeId);
     if (index !== -1) {
         favorites.splice(index, 1);
     } else {
         favorites.push(recipeId);
     }
     document.getElementById("favorite-btn").textContent = isFavorite(recipeId) ? "Remove from Favorites" : "Add to Favorites";
 }
 
 let favorites = [];