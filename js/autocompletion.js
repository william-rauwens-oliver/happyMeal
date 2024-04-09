document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        event.preventDefault(); // Pour éviter le rechargement de la page
    });

    document.getElementById('search-input').addEventListener('input', function() {
        searchRecipe(this.value); // Appel à la fonction de recherche à chaque saisie
    });
});

function searchRecipe(inputText) {
    const input = inputText.toLowerCase();
    const autocompleteList = document.getElementById('autocomplete-list');
    autocompleteList.innerHTML = '';
    if (input.length < 1) {
        return;
    }
    fetch('../assets/json/data.json') // Ajustez le chemin selon votre structure
        .then(response => response.json())
        .then(data => {
            data.recettes.forEach(recipe => {
                if (recipe.nom.toLowerCase().includes(input) || recipe.ingredients.some(ingredient => ingredient.nom.toLowerCase().includes(input))) {
                    const div = document.createElement('div');
                    div.textContent = recipe.nom;
                    div.addEventListener('click', function() {
                        document.getElementById('search-input').value = this.textContent;
                        autocompleteList.innerHTML = '';
                        const selectedRecipe = data.recettes.find(r => r.nom === this.textContent);
                        if (selectedRecipe) {
                            showRecipeDetails(selectedRecipe);
                        }
                    });
                    autocompleteList.appendChild(div);
                }
            });
        })
        .catch(error => console.error('Erreur lors du chargement des recettes:', error));
}

function showRecipeDetails(recipe) {
    const detailsContainer = document.getElementById('recipe-details');
    detailsContainer.innerHTML = ''; // Vider les détails précédents

    const nameElement = document.createElement('h2');
    nameElement.textContent = recipe.nom;
    detailsContainer.appendChild(nameElement);

    const durationElement = document.createElement('p');
    durationElement.textContent = `Durée : ${recipe.temps_preparation}`;
    detailsContainer.appendChild(durationElement);

    const ingredientsList = document.createElement('ul');
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = `${ingredient.nom} - ${ingredient.quantite}`;
        ingredientsList.appendChild(li);
    });
    detailsContainer.appendChild(ingredientsList);

    const stepsElement = document.createElement('ol');
    recipe.etapes.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        stepsElement.appendChild(li);
    });
    detailsContainer.appendChild(stepsElement);
}
