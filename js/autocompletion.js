
function searchRecipe(inputText) {
    const input = inputText.toLowerCase();
    const autocompleteList = document.getElementById('autocomplete-list');
    autocompleteList.innerHTML = ''; 
    if (input.length < 1) {
        return; 
    }
    fetch('../assets/json/data.json')
        .then(response => response.json())
        .then(data => {
            data.recettes.forEach(recipe => {
                if (recipe.nom.toLowerCase().includes(input) || recipe.ingredients.some(ingredient => ingredient.nom.toLowerCase().includes(input))) {
                    const div = document.createElement('div');
                    div.textContent = recipe.nom;
                    div.addEventListener('click', function() {
                        document.getElementById('search-input').value = this.textContent; 
                        autocompleteList.innerHTML = ''; 
                    });
                    autocompleteList.appendChild(div);
                }
            });
        })
        .catch(error => console.error('Erreur lors du chargement des recettes:', error));
}

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
});
