document.addEventListener('DOMContentLoaded', () => {
    
    const tabs = document.querySelectorAll('.tabs');
    const resultsSection = document.getElementById('results-section');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const clearButton = document.getElementById('clear-button');
    const searchQuery = localStorage.getItem("searchQuery");
    
    if (searchQuery) {
        // Pre-fill the search input on the search results page
        searchInput.value = searchQuery;
    
        // Automatically perform a search
        performSearch(searchQuery);
      }
    
    
    clearButton.addEventListener('click', () => {
        searchInput.value = ''; // Clear the input value
        searchInput.focus();    // Put focus back on the input
    });

   
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active-tabs'));
            tab.classList.add('active-tabs');
        });
    });

    const MAX_LABEL_LENGTH = 30; // Set the maximum number of characters

const truncateText = (text, maxLength) => {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
};

const displayRecipes = (recipes) => {
    resultsSection.innerHTML = '';

    const recipeCardsContainer = document.createElement('div');
    recipeCardsContainer.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-2'; // Use responsive grid layout

    resultsSection.appendChild(recipeCardsContainer);

    // Add skeleton loading structure
    for (let i = 0; i < 100; i++) {
        const skeletonCard = document.createElement('div');
        skeletonCard.className = 'recipe-card rounded-lg flex flex-col relative transition hover:text-[#d45101] animate-pulse'; // Added "animate-pulse" for Tailwind CSS pulse animation

        skeletonCard.innerHTML = `
            <div class="bg-gray-500 w-full h-28 mb-2 rounded"></div>
            <div class="bg-gray-500 p-2 items-center text-center rounded-md font-semibold">
                <p class="text-black text-xs mt-1 uppercase w-20 h-4"></p>
            </div>
            <div class="recipe-name-container mt-2 bg-gray-500 " style="height: 10px;"> 
                <h2 class="text-sm font-semibold w-32 h-4"></h2>
            </div>
           
        `;

        recipeCardsContainer.appendChild(skeletonCard);
    }

    setTimeout(() => {
        recipeCardsContainer.innerHTML = ''; // Clear skeleton loading

        recipes.forEach(recipe => {

            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card rounded-lg flex flex-col relative transition hover:text-[#d45101]';

            recipeCard.innerHTML = `
                <div class="relative transition hover:scale-105">
                    <i class="fa-solid fa-heart border-white hover:text-pink-400 hover:transition shadow-md cursor-pointer absolute top-2 right-2 bg-[#d45101] text-white p-2 rounded-full"></i>
                    <a href="details.html?id=${encodeURIComponent(recipe.label)}">
                        <img src="${recipe.image}" alt="${recipe.label}" class="w-full h-28 mb-2 object-cover rounded">
                    </a>
                </div>
                <div class="bg-[#d45101] py-1 items-center text-center rounded-md font-semibold">
                    <p class="text-white text-xs mt-1 uppercase">${recipe.cuisineType}</p>
                </div>
                <div class="recipe-name-container mt-2" style="height: 70px;"> 
                    <h2 class="text-sm font-semibold" id="recipe-label">${truncateText(recipe.label, MAX_LABEL_LENGTH)}</h2>
                </div>
                <div class="justify-between flex">
                    <p class="text-gray-600 text-xs"><i class="fa-regular fa-clock text-sm"></i> ${recipe.totalTime} minutes</p>
                    <a href="${recipe.url}" target="_blank" rel="noopener noreferrer" class="text-sm font-sans text-gray-600 hover:text-black">Link</a>
                </div>
            `;

            recipeCardsContainer.appendChild(recipeCard);
        });
    }, 1500); // Simulate delay for fetching data
};

    // Rest of your code
    
    
    
    
    
    

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

    function performSearch(query) {
        
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
    
        searchButton.addEventListener('click', () => {
            const query = searchInput.value.trim();
            if (query !== '') {
                const maxResults = 100;
                fetchAndDisplayRecipes(query, maxResults);
            }
        });
        console.log(`Performing search for: ${query}`);
      }
  

    
});



function setupDropdown(dropdownId) {
    const dropdownButton = document.getElementById(dropdownId);
    const dropdownContent = dropdownButton.querySelector(".hidden");
    const arrowIcon = document.getElementById("arrow-icon");
    const arrowIcon1 = document.getElementById("arrow-icon1");

    dropdownButton.addEventListener("click", () => {
        dropdownContent.classList.toggle("hidden");
        arrowIcon.classList.toggle("rotate-180");
        arrowIcon1.classList.toggle("rotate-180");
    });

    dropdownContent.addEventListener("click", (event) => {
        event.stopPropagation();
    });
}

// Set up each dropdown
setupDropdown("cuisine");
setupDropdown("dish");
setupDropdown("meal");
setupDropdown("ing");
