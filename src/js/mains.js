document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabs');
    const resultsSection = document.getElementById('results-section');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

   
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active-tabs'));
            tab.classList.add('active-tabs');
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
                <p class="text-black text-xs mt-1 uppercase">${recipe.cuisineType}</p>
            </div>
              
                <div class="recipe-name-container mt-2" style="height: 50px;"> 
                <h2 class="text-sm font-semibold">${recipe.label}</h2>
            </div>
                <div class=" justify-between flex ">
                    <p class="text-gray-600 text-xs "><i class="fa-regular fa-clock text-sm"></i> ${recipe.totalTime} minutes</p>
                    <p class="text-gray-600 text-xs "><i class="fas fa-utensils"></i> ${recipe.ingredients.length} ingredients</p>
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

    fetchAndDisplayRecipes('recipe', 100);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.id;
            let query = '';
            let maxResults = 100;

            switch (tabId) {
                case 'Italian-tab':
                    query = 'Italian';
                    break;
                case 'Mexican-tab':
                    query = 'Mexican';
                    break;
                case 'American-tab':
                    query = 'American';
                    break;
                case 'Chinese-tab':
                    query = 'Chinese';
                    break;
                case 'Indian-tab':
                    query = 'Indian';
                    break;
                case 'Japanese-tab':
                    query = 'Japanese';
                    break;
                case 'Korean-tab':
                    query = 'Korean';
                    break;
                case 'Filipino-tab':
                    query = 'Filipino';
                    break;
                case 'Appetizer-tab':
                    query = 'Appetizer';
                    break;
                case 'Salad-tab':
                    query = 'Salad';
                    break;
                case 'Soup-tab':
                    query = 'Soup';
                    break;
                case 'Dessert-tab':
                    query = 'Dessert';
                    break;
                case 'Beverage-tab':
                    query = 'Beverage';
                    break;
                case 'Breakfast-tab':
                    query = 'Breakfast';
                    break;
                case 'Lunch-tab':
                    query = 'Lunch';
                    break;
                case 'Dinner-tab':
                    query = 'Dinner';
                    break;
                default:
                    break;
            }

            fetchAndDisplayRecipes(query, maxResults);
        });
    });

    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const query = searchInput.value.trim();
            if (query !== '') {
                const maxResults = 100;
                fetchAndDisplayRecipes(query, maxResults);
            }
        }
    });
});



const cuisineDropdownButton = document.getElementById("cuisine");
const cuisineDropdownContent = cuisineDropdownButton.querySelector(".hidden");

cuisineDropdownButton.addEventListener("click", () => {
    cuisineDropdownContent.classList.toggle("hidden");
});

cuisineDropdownContent.addEventListener("click", (event) => {
    event.stopPropagation();
});

const dishDropdownButton = document.getElementById("dish");
const dishDropdownContent = dishDropdownButton.querySelector(".hidden");

dishDropdownButton.addEventListener("click", () => {
    dishDropdownContent.classList.toggle("hidden");
});

dishDropdownContent.addEventListener("click", (event) => {
    event.stopPropagation();
});

const mealDropdownButton = document.getElementById("meal");
const mealDropdownContent = mealDropdownButton.querySelector(".hidden");

mealDropdownButton.addEventListener("click", () => {
    mealDropdownContent.classList.toggle("hidden");
});

mealDropdownContent.addEventListener("click", (event) => {
    event.stopPropagation();
});

const ingDropdownButton = document.getElementById("ing");
const ingDropdownContent = ingDropdownButton.querySelector(".hidden");

ingDropdownButton.addEventListener("click", () => {
    ingDropdownContent.classList.toggle("hidden");
});

ingDropdownContent.addEventListener("click", (event) => {
    event.stopPropagation();
});