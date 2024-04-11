document.addEventListener('DOMContentLoaded', function() {
    fetch('../assets/json/data.json')
        .then(response => response.json())
        .then(data => {
            const uniqueIngredients = {};

            data.recettes.forEach(recette => {
                recette.ingredients.forEach(ingredient => {
                    if (!uniqueIngredients[ingredient.nom]) {
                        uniqueIngredients[ingredient.nom] = ingredient.quantite;
                    }
                });
            });

            const container = document.getElementById('ingredients-container');
            for (const [nom, quantite] of Object.entries(uniqueIngredients)) {
                const button = document.createElement('button');
                button.innerHTML = '🛒';
                button.className = 'add-button';
                button.onclick = function() { addToShoppingList(nom, quantite); };
                
                const div = document.createElement('div');
                div.className = 'ingredient-item';
                div.textContent = `${nom} (${quantite}) `;
                div.appendChild(button);

                container.appendChild(div);
            }
        })
        .catch(error => console.error('Erreur de chargement du JSON:', error));

    document.getElementById('generate-download').addEventListener('click', function() {
        const listItems = document.querySelectorAll('#shopping-list li');
        let listContent = "";

        listItems.forEach(item => {
            listContent += `${item.textContent.replace('🗑️', '').trim()}\n`; 
        });

        if(listContent) {
            downloadList(listContent);
            clearShoppingList();
            addedIngredients.clear();
        } else {
            alert("Votre liste de courses est vide !");
        }
    });
});

const addedIngredients = new Set();

function addToShoppingList(item, quantite) {
    if (!addedIngredients.has(item)) {
        const list = document.getElementById('shopping-list');
        const listItem = document.createElement('li');
        listItem.textContent = `${item}: ${quantite} `;
        
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '🗑️'; 
        deleteButton.className = 'delete-button';
        deleteButton.onclick = function() {
            list.removeChild(listItem);
            addedIngredients.delete(item);
        };

        listItem.appendChild(deleteButton);
        list.appendChild(listItem);

        addedIngredients.add(item);

        // Faites défiler la liste vers le bas pour afficher le nouvel élément
        list.scrollTop = list.scrollHeight;
    } else {
        alert(`${item} est déjà dans votre liste de courses.`);
    }
}

function downloadList(content) {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'liste_de_courses.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function clearShoppingList() {
    const list = document.getElementById('shopping-list');
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
}
