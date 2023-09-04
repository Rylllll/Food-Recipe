document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab');
    const tabss = document.querySelectorAll('.tabs');
    const resultsSection = document.getElementById('results-section');
    const resultsSections = document.getElementById('results-sections');
    const featuredSections = document.getElementById('featured-section');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');

    const MAX_LABEL_LENGTH = 30; // Set the maximum number of characters

    const truncateText = (text, maxLength) => {
      if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
      }
      return text;
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active-tab'));
            tab.classList.add('active-tab');
        });
    });

    tabss.forEach(tabs => {
        tabs.addEventListener('click', () => {
            tabss.forEach(t => t.classList.remove('active-tabss'));
            tabs.classList.add('active-tabss');
        });
    });



    ///Main feature///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    const featuredRecipess = (recipes) => {
        featuredSections.innerHTML = '';
    
        const recipeCardsContainer = document.createElement('div');
        recipeCardsContainer.className = 'flex w-full'; // Use grid layout
        featuredSections.appendChild(recipeCardsContainer);
    
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            const totalServings = recipe.yield;
            const totalIngredients = recipe.ingredientLines.length;
            const calories = recipe.calories.toFixed(2); // Assuming calories is provided in the fetched data
            const dietLabels = recipe.dietLabels.join(", ");
            recipeCard.className = 'recipe-card  relative transition w-full'; // Added "relative" class
    
            recipeCard.innerHTML = `
            <div class="xl:flex lg:flex grid p-4 xl:p-0 lg:p-0 md:p-0 gap-8">
            <div class="relative transition w-full">
            <img src="${recipe.image}" 
                         srcset="${recipe.image}, ${
                     recipe.image
                     }?quality=80&resize=1200x800 2x"
                         alt="${recipe.label}" 
                         class="lg:w-custom xl:w-custom w-full h-display object-cover">
        </div>
                
        <div class="w-full">
                    
        <!-- Label and author-->

        <div>
        <div class="flex justify-between gap-10">
        <h2 class="md:text-5xl lg:text-5xl xl:text-5xl text-3xl font-bai font-bold hover:text-[#d45101] transition">${recipe.label}</h2>

        <div class="flex gap-2">

        <div>
        <i class="fa-solid fa-heart border-white hover:text-[#151515] hover:transition shadow-md cursor-pointer bg-[#d45101] text-white p-2 "></i>
        </div>

        <div class="mt-1">
        <a href="${recipe.url}" target="_blank" rel="noopener noreferrer" class=" font-sans text-white hover:text-[#151515] bg-[#d45101] px-2 py-1 shadow-md  "><i class="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
        </div>

        </div>
        </div>
        <div class ="flex mt-4 gap-2 text-sm" >
        <p class="">By: <p class="font-semibold">${
          recipe.source
        }.</p></p>
        </div>
        </div>

        <!-- Servings, Time, Calories-->

        <div class="gap-4 mt-4 flex justify-between">

        <div class=" mx-auto w-full flex flex-col items-center text-center py-2 justify-center">
        <p class="mt-2 md:text-3xl lg:text-3xl xl:text-3xl text-lg text-[#f07a00]">${calories}</p>
            <p class="mt-2 text-sm">Calories</p>
        </div>
        
        <!-- Add a separating gray line -->
        <div class="h-120 border-l border-[#151515] "></div>
        
        <div class=" mx-auto w-full flex flex-col items-center text-center py-2 justify-center">
        <p class="mt-2 md:text-3xl lg:text-3xl xl:text-3xl text-lg text-[#f07a00]">${totalIngredients}</p>
            <p class="mt-2 text-sm">Ingredients needs</p>
        </div>

        <!-- Add a separating gray line -->
        <div class="h-120 border-l border-[#151515] "></div>
        <div class=" mx-auto w-full flex flex-col items-center text-center py-2 justify-center">
        <p class="mt-2 md:text-3xl lg:text-3xl xl:text-3xl text-lg text-[#f07a00]">${recipe.totalTime}</p>
            <p class="mt-2 text-sm">Minutes</p>
        </div>
    </div>
    

        <!-- Tags-->
         
        <div class="xl:flex lg:flex md:flex flex md:gap-0 lg:gap-0 xl:gap-0 gap-4 justify-between mt-4">
                        

        <div class="flex gap-2 mt-4 text-xs ">
        <p class="px-3 py-1 border 1px border-[#151515]  ">${
          recipe.cuisineType
        }</p>
        <p class="px-3 py-1 border 1px border-[#151515] ">${
          recipe.dishType
        }</p>
        <p class="px-3 py-1 border 1px border-[#151515] ">${dietLabels}</p>
        
        </div>
        
        <p class="mt-5 md:text-sm lg:text-sm xl:text-sm text-xs">${totalServings} Servings</p>
        </div>

      <p class="mt-6 text-sm">Lacquered Chinese bacon, also known as "Chinese glazed bacon" or "Chinese red-cooked bacon," is a popular Chinese dish made from pork belly that's been cured, marinated, and then roasted or simmered to perfection. </p>

      <a href="details.html?id=${encodeURIComponent(recipe.label)}">
      <button class="bg-[#d45101] hover:bg-[#151515] transition py-3 px-6 text-white mt-8">
      <h1 class=" text-xs">
      Make them
      </h1>
      </button>
       </a>
    </div>
               
            `;
    
            recipeCardsContainer.appendChild(recipeCard);
        });
    };

    const mainRecipes = (query, maxResults) => {
        const appId = '2bed754d';
        const appKey = 'b3d365a0e5a86f2751ca4d2284738aee';
        const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&to=${maxResults}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const recipes = data.hits.map(hit => hit.recipe);
                featuredRecipess(recipes);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    mainRecipes('chinese', 1);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.id;
            let query = '';
            let maxResults = 20;

            switch (tabId) {
                case 'main-tab':
                    query = 'adobo';
                    break;
                default:
                    break;
            }

            mainRecipes(query, maxResults);
        });
    });

        // featured
        const displayRecipess = (recipes) => {
            resultsSections.innerHTML = '';
        
            const recipeCardsContainer = document.createElement('div');
            recipeCardsContainer.className = 'md:flex lg:flex xl:flex grid gap-2'; // Use grid layout
            resultsSections.appendChild(recipeCardsContainer);
        
            recipes.forEach(recipe => {
                const recipeCard = document.createElement('div');
                recipeCard.className = 'recipe-card  relative transition hover:text-[#d45101]'; // Added "relative" class
        
                recipeCard.innerHTML = `
                <div class="relative transition hover:scale-105">
               
                <a href="details.html?id=${encodeURIComponent(recipe.label)}">
                    <img src="${recipe.image}" alt="${recipe.label}" class="w-96 h-full mb-2 object-cover ">
                </a>
            </div>
                    
            <div class="py-1 items-center  font-semibold">
            <p class="text-black text-md mt-1 uppercase">${recipe.cuisineType}</p>
        </div>
        <div class="recipe-name-container" style="height: 70px;"> 
        <h2 class="text-sm text-gray-500" id="recipe-label">${truncateText(recipe.label, MAX_LABEL_LENGTH)}</h2>
    </div>
                   
                `;
        
                recipeCardsContainer.appendChild(recipeCard);
            });
        };

    const featuredRecipes = (query, maxResults) => {
        const appId = '2bed754d';
        const appKey = 'b3d365a0e5a86f2751ca4d2284738aee';
        const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}&to=${maxResults}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const recipes = data.hits.map(hit => hit.recipe);
                displayRecipess(recipes);
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    featuredRecipes('recipe', 6);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.id;
            let query = '';
            let maxResults = 20;

            switch (tabId) {
                case 'feature-tab':
                    query = 'breakfast';
                    break;
                default:
                    break;
            }

            featuredRecipes(query, maxResults);
        });
    });

    // Tags
    const displayRecipes = (recipes) => {
        resultsSection.innerHTML = '';
    
        const recipeCardsContainer = document.createElement('div');
        recipeCardsContainer.className = 'grid md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-6 grid-cols-3  gap-2'; // Use grid layout
        resultsSection.appendChild(recipeCardsContainer);
    
        recipes.forEach(recipe => {
            const recipeCard = document.createElement('div');
            recipeCard.className = 'recipe-card  flex flex-col relative transition hover:text-[#d45101]'; // Added "relative" class
    
            recipeCard.innerHTML = `
            <div class="relative transition hover:scale-105">
            <i class="fa-solid fa-heart border-white hover:text-pink-400 hover:transition shadow-md cursor-pointer absolute top-2 right-2 bg-[#d45101] text-white p-2"></i>
            <a href="details.html?id=${encodeURIComponent(recipe.label)}">
                <img src="${recipe.image}" alt="${recipe.label}" class="w-full h-28 mb-2 object-cover">
            </a>
        </div>
                
        <div class="bg-[#d45101] py-1 items-center text-center  font-semibold">
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

    fetchAndDisplayRecipes('breakfast', 18);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.id;
            let query = '';
            let maxResults = 18;

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

    
    searchButton.addEventListener("click", () => {
        const searchInput = document.getElementById("search-input").value.trim();
        
        if (searchInput !== "") {
          // Store the search query in localStorage
          localStorage.setItem("searchQuery", searchInput);
          
          // Replace "search-results.html" with the URL of the search results HTML page
          window.location.href = `recipe.html`;
        }
      });
});

const header = document.querySelector('.bg-scroll');

// Function to toggle background color on scroll
function toggleBackgroundColor() {
    if (window.scrollY > 0) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Add scroll event listener
window.addEventListener('scroll', toggleBackgroundColor);
