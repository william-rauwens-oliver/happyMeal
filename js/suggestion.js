// Fonction pour charger les recettes et filtrer les résultats basés sur l'entrée de l'utilisateur
function searchRecipe(inputText) {
    const input = inputText.toLowerCase();
    const autocompleteList = document.getElementById('autocomplete-list');
    autocompleteList.innerHTML = ''; // Vider les résultats précédents
    if (input.length < 1) {
        return; // Sortir de la fonction si moins de 2 caractères sont saisis
    }
    fetch('../assets/json/data.json')
        .then(response => response.json())
        .then(data => {
            data.recettes.forEach(recipe => {
                // Vérifier si le nom de la recette ou un ingrédient correspond à l'entrée de l'utilisateur
                if (recipe.nom.toLowerCase().includes(input) || recipe.ingredients.some(ingredient => ingredient.nom.toLowerCase().includes(input))) {
                    const div = document.createElement('div');
                    div.textContent = recipe.nom;
                    div.addEventListener('click', function() {
                        document.getElementById('search-input').value = this.textContent; // Sélectionner la recette cliquée
                        autocompleteList.innerHTML = ''; // Effacer la liste
                    });
                    autocompleteList.appendChild(div);
                }
            });
        })
        .catch(error => console.error('Erreur lors du chargement des recettes:', error));
}

// Vous pourriez vouloir désactiver l'envoi du formulaire lors de l'appui sur Entrée
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
});
