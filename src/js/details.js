document.addEventListener("DOMContentLoaded", () => {
  const recipeDetailsContainer = document.getElementById("recipe-details");
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const recipeLabel = decodeURIComponent(urlParams.get("id"));

  const fetchRelatedRecipes = async (tags) => {
    const relatedApiUrl = `https://api.edamam.com/search?q=${tags.join('+')}&app_id=${appId}&app_key=${appKey}`;
  
    try {
      const response = await fetch(relatedApiUrl);
      const data = await response.json();
  
      if (data.hits && data.hits.length > 0) {
        const relatedRecipes = data.hits.map(hit => hit.recipe);
        return relatedRecipes;
      } else {
        throw new Error("Related recipes not found.");
      }
    } catch (error) {
      console.error("Error fetching related recipes:", error);
      return [];
    }
  };

  const displayRelatedRecipes = async (tags) => {
    const relatedRecipes = await fetchRelatedRecipes(tags);
  
    const relatedRecipesContainer = document.getElementById("related-recipes");
    
    if (relatedRecipes.length > 0) {
      relatedRecipesContainer.innerHTML = `
        <h2 class="text-2xl font-semibold mt-8">Related Recipes</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          ${relatedRecipes.map(recipe => `
            <div class="flex flex-col">
              <img src="${recipe.image}" alt="${recipe.label}" class="object-cover w-full h-40 rounded-md">
              <h3 class="mt-2 font-semibold text-lg">${recipe.label}</h3>
              <p class="mt-1 text-sm">${recipe.source}</p>
              <a href="recipe-details.html?id=${encodeURIComponent(recipe.label)}" class="mt-2 text-blue-600 hover:underline">View Recipe</a>
            </div>
          `).join('')}
        </div>
      `;
    } else {
      relatedRecipesContainer.innerHTML = "<p>No related recipes found.</p>";
    }
  };
  const fetchRecipeDetails = async (label) => {
    const appId = "2bed754d";
    const appKey = "b3d365a0e5a86f2751ca4d2284738aee"; // Replace with your Edamam app key
    const apiUrl = `https://api.edamam.com/search?q=${label}&app_id=${appId}&app_key=${appKey}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        const recipe = data.hits[0].recipe;
        return recipe;
      } else {
        throw new Error("Recipe not found.");
      }
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      return null;
    }
  };

  const displayRecipeDetails = async () => {
    const recipe = await fetchRecipeDetails(recipeLabel);

    // Create the recipe details container
    const recipeDetailsContainer = document.createElement("div");
    recipeDetailsContainer.className = "";

    const breadcrumbs = document.querySelector('.breadcrumbs');
    breadcrumbs.innerHTML = `
    <div class="gap-2 flex">
    <a href="index.html" class=" hover:underline"><i class="fa-solid fa-house text-sm"></i></a> <i class="fa-solid fa-chevron-right text-xs mt-1"></i> <a href="recipe.html" class=" hover:underline">Recipes</a>  <i class="fa-solid fa-chevron-right text-xs mt-1"></i> <h1 class="text-[#d45101]"> ${recipe.label}</h1>
    </div>
    `;
    
    if (recipe) {
      const totalServings = recipe.yield;
      const totalIngredients = recipe.ingredientLines.length;
      const calories = recipe.calories.toFixed(2); // Assuming calories is provided in the fetched data
      const dietLabels = recipe.dietLabels.join(", ");

      // Populate the recipe details container
      recipeDetailsContainer.innerHTML = `
                <div class="xl:flex lg:flex grid p-4 xl:p-0 lg:p-0 md:p-0 gap-12">
                    <img src="${recipe.image}" 
                         srcset="${recipe.image}, ${
                     recipe.image
                     }?quality=80&resize=1200x800 2x"
                         alt="${recipe.label}" 
                         class="lg:w-custom xl:w-custom w-full h-display obkect-cover rounded">

                    <div class="w-full">
                    
                        <!-- Label and author-->

                        <div>
                        <div class="flex justify-between gap-10">
                        <h2 class="md:text-5xl lg:text-5xl xl:text-5xl text-3xl font-bai font-bold hover:text-[#d45101] transition">${recipe.label}</h2>

                        <div class="flex gap-4">

                        <div>
                        <i class="fa-solid fa-heart border-white hover:text-pink-400 hover:transition shadow-md cursor-pointer bg-[#d45101] text-white p-2 rounded-full"></i>
                        </div>

                        <div class="mt-1">
                        <a href="${recipe.url}" target="_blank" rel="noopener noreferrer" class=" font-sans text-white hover:text-pink-400 bg-[#d45101] px-2 py-1 shadow-md rounded-full "><i class="fa-solid fa-arrow-up-right-from-square"></i>
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

                        <div class="rounded-md mx-auto w-full flex flex-col items-center text-center py-2 justify-center">
                        <p class="mt-2 md:text-5xl lg:text-5xl xl:text-5xl text-lg text-[#f07a00]">${calories}</p>
                            <p class="mt-2 text-sm">Calories</p>
                        </div>
                        
                        <!-- Add a separating gray line -->
                        <div class="h-120 border-l border-[#151515] "></div>
                        
                        <div class="rounded-md mx-auto w-full flex flex-col items-center text-center py-2 justify-center">
                        <p class="mt-2 md:text-5xl lg:text-5xl xl:text-5xl text-lg text-[#f07a00]">${totalIngredients}</p>
                            <p class="mt-2 text-sm">Ingredients needs</p>
                        </div>
      
                        <!-- Add a separating gray line -->
                        <div class="h-120 border-l border-[#151515] "></div>
                        <div class="rounded-md mx-auto w-full flex flex-col items-center text-center py-2 justify-center">
                        <p class="mt-2 md:text-5xl lg:text-5xl xl:text-5xl text-lg text-[#f07a00]">${recipe.totalTime}</p>
                            <p class="mt-2 text-sm">Minutes</p>
                        </div>
                    </div>
                    
                    

                        <!-- Tags-->
                        
                        <div class="xl:flex lg:flex md:flex flex md:gap-0 lg:gap-0 xl:gap-0 gap-4 justify-between mt-4">
                        

                        <div class="flex gap-2 mt-4 text-xs ">
                        <p class="px-3 py-1 border 1px border-[#151515] rounded-md ">${
                          recipe.cuisineType
                        }</p>
                        <p class="px-3 py-1 border 1px border-[#151515] rounded-md">${
                          recipe.dishType
                        }</p>
                        <p class="px-3 py-1 border 1px border-[#151515] rounded-md">${dietLabels}</p>
                        
                        </div>
                        <p class="mt-5 md:text-sm lg:text-sm xl:text-sm text-xs">${totalServings} Servings</p>
                        </div>

                        <!-- Ingredients-->

                        
                        <div class="mt-7">
                        <div id="ingredients-toggle" class="toggle-button cursor-pointer py-2 px-2 rounded-md w-full justify-between flex bg-[#151515] ">
                        <h1 class="mt-1 font-semibold text-white">
                            Ingredients
                            </h1>
                            <span id="arrow-icon" class="fa-solid fa-chevron-right text-xs font-semibold transition-transform px-2.5 py-2 bg-[#d45101] rounded-full text-white"></span>
                        </div>
                        <div class="grid ingredients-grid hidden mt-4 mb-4">
                        <ul class="ingredients-list text-sm">
                            ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}.</li>`).join('')}
                        </ul>
                        </div>
                        </div>


   



                    <!-- health labels-->
                    <div class="mt-2">
                    <div id="health-labels-toggle" class="toggle-button cursor-pointer py-2 px-2 rounded-md w-full justify-between flex bg-[#151515]">
                    <h1 class="mt-1 font-semibold text-white">
                       Nutritional Labels
                        </h1>
                        <span id="arrow-icons" class="fa-solid fa-chevron-right text-xs font-semibold transition-transform px-2.5 py-2 bg-[#d45101] rounded-full text-white"></span>
                    </div>
                    <div class="health-labels-grid hidden mt-4 mb-4">
                        <ul class="health-labels-list text-sm flex flex-wrap gap-1">
                            ${recipe.healthLabels.map(label => `<li class="border 1px border-[#151515] rounded-full text-center px-3 py-1">${label}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                    
              

                       
                    </div>
                </div>
            `;
    } else {
      recipeDetailsContainer.innerHTML = "<p>Recipe not found.</p>";
    }

   
    // Append the recipe details container to the DOM
    document
      .getElementById("recipe-details")
      .appendChild(recipeDetailsContainer);


      const ingredientsToggle = document.getElementById('ingredients-toggle');
      const ingredientsGrid = document.querySelector('.ingredients-grid');
      const arrowIcon = document.getElementById('arrow-icon');
      
      ingredientsToggle.addEventListener('click', () => {
          ingredientsGrid.classList.toggle('hidden');
           arrowIcon.classList.toggle("rotate-90");
        
      });
     
      const healthLabelsToggle = document.getElementById('health-labels-toggle');
      const healthLabelsGrid = document.querySelector('.health-labels-grid');
      const arrowIcons = document.getElementById('arrow-icons');
      
      healthLabelsToggle.addEventListener('click', () => {
          healthLabelsGrid.classList.toggle('hidden');
          arrowIcons.classList.toggle('rotate-90');
      });
      
  };

  displayRecipeDetails();
});
