document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const resultsSection = document.getElementById('results-section');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');
        });
    });
    const displayRecipes = (recipes) => {
        resultsSection.innerHTML = '';
    
        const recipeCardsContainer = document.createElement('div');
        recipeCardsContainer.className = 'grid grid-cols-5 gap-2'; // Use grid layout
        resultsSection.appendChild(recipeCardsContainer);
    
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card rounded-lg flex flex-col relative'; // Added "relative" class
    
            recipeCard.innerHTML = `
                <div class="relative">
                    <i class="fa-regular fa-heart absolute top-2 right-2 bg-[#fdd835] text-white p-2 rounded-full"></i> <!-- Heart icon -->
                    <img src="${recipe.image}" alt="${recipe.label}" class="w-full h-44 mb-2 object-cover rounded">
                </div>
                
                <div class="bg-[#fdd835] p-2 items-center text-center rounded-md font-semibold">
                    <p class="text-black text-sm mt-1 uppercase">${recipe.cuisineType}</p>
                </div>
                <div class="flex justify-between mt-2">
                    <p class="text-gray-600 text-sm mt-1"><i class="fa-regular fa-clock text-sm"></i> ${recipe.totalTime} minutes</p>
                    <p class="text-gray-600 text-sm mt-1"><i class="fas fa-utensils"></i> ${recipe.ingredients.length} ingredients</p>
                </div>
                <div class="recipe-name-container mt-2" style="height: 50px;"> 
                    <h2 class="text-sm font-semibold">${recipe.label}</h2>
                </div>
            `;
    
            recipeCardsContainer.appendChild(recipeCard);
        });
    };
    
    
    
    

    const fetchAndDisplayRecipes = (query, maxResults) => {
        const appId = '2bed754d';
        const appKey = 'b3d365a0e5a86f2751ca4d2284738aee';
        const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&to=${maxResults}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const recipes = data.hits.map(hit => hit.recipe);
                displayRecipes(recipes);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    fetchAndDisplayRecipes('breakfast', 20);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.id;
            let query = '';
            let maxResults = 10;

            switch (tabId) {
                case 'breakfast-tab':
                    query = 'breakfast';
                    break;
                case 'lunch-tab':
                    query = 'lunch';
                    break;
                case 'dinner-tab':
                    query = 'dinner';
                    break;
                case 'snack-tab':
                    query = 'snack';
                    break;
                case 'dessert-tab':
                    query = 'dessert';
                    break;
                default:
                    break;
            }

            fetchAndDisplayRecipes(query, maxResults);
        });
    });

    searchButton.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query !== '') {
            const maxResults = 10;
            fetchAndDisplayRecipes(query, maxResults);
        }
    });
});

