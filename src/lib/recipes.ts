export interface Recipe {
  uri?: string;
  label: string;
  image: string;
  source: string;
  url: string;
  yield: number;
  calories: number;
  totalTime: number;
  ingredientLines: string[];
  cuisineType: string[];
  dishType: string[];
  dietLabels: string[];
  mealType?: string[];
  healthLabels?: string[];
}

interface EdamamHit {
  recipe: Recipe;
}

interface EdamamResponse {
  hits?: EdamamHit[];
}

const APP_ID = "2bed754d";
const APP_KEY = "b3d365a0e5a86f2751ca4d2284738aee";

export const fallbackRecipes: Recipe[] = [
  {
    label: "Lacquered Chinese Bacon",
    image: "/img/br.png",
    source: "RecipeCuisine Kitchen",
    url: "https://www.edamam.com/",
    yield: 4,
    calories: 1840,
    totalTime: 45,
    ingredientLines: ["Pork belly", "Soy sauce", "Brown sugar", "Garlic", "Ginger", "Five-spice powder"],
    cuisineType: ["chinese"],
    dishType: ["main course"],
    dietLabels: ["high-protein"],
    mealType: ["dinner"],
  },
  {
    label: "Classic Chicken Adobo",
    image: "/img/adobo.jpg",
    source: "Manila Table",
    url: "https://www.edamam.com/",
    yield: 6,
    calories: 2100,
    totalTime: 55,
    ingredientLines: ["Chicken thighs", "Soy sauce", "Vinegar", "Bay leaves", "Peppercorn", "Garlic"],
    cuisineType: ["filipino"],
    dishType: ["main course"],
    dietLabels: ["balanced"],
    mealType: ["lunch", "dinner"],
  },
  {
    label: "Japanese Katsudon Bowl",
    image: "/img/katsudon.jpg",
    source: "Tokyo Home Cook",
    url: "https://www.edamam.com/",
    yield: 2,
    calories: 1450,
    totalTime: 35,
    ingredientLines: ["Pork cutlet", "Rice", "Eggs", "Onion", "Dashi", "Soy sauce"],
    cuisineType: ["japanese"],
    dishType: ["main course"],
    dietLabels: ["high-protein"],
    mealType: ["dinner"],
  },
  {
    label: "Garden Citrus Salad",
    image: "/img/salad.jpg",
    source: "Fresh Fork",
    url: "https://www.edamam.com/",
    yield: 3,
    calories: 690,
    totalTime: 15,
    ingredientLines: ["Mixed greens", "Orange", "Cucumber", "Olive oil", "Lemon", "Feta"],
    cuisineType: ["mediterranean"],
    dishType: ["salad"],
    dietLabels: ["low-carb"],
    mealType: ["lunch"],
  },
  {
    label: "French Toast with Berries",
    image: "/img/french.jpg",
    source: "Brunch Daily",
    url: "https://www.edamam.com/",
    yield: 4,
    calories: 1220,
    totalTime: 25,
    ingredientLines: ["Brioche", "Eggs", "Milk", "Cinnamon", "Berries", "Maple syrup"],
    cuisineType: ["french"],
    dishType: ["starter"],
    dietLabels: ["balanced"],
    mealType: ["breakfast"],
  },
  {
    label: "Mexican Street Tacos",
    image: "/img/mexico.jpg",
    source: "Casa Cocina",
    url: "https://www.edamam.com/",
    yield: 4,
    calories: 1680,
    totalTime: 30,
    ingredientLines: ["Corn tortillas", "Beef", "Cilantro", "Onion", "Lime", "Salsa"],
    cuisineType: ["mexican"],
    dishType: ["main course"],
    dietLabels: ["balanced"],
    mealType: ["lunch", "dinner"],
  },
];

export function slugifyLabel(label: string): string {
  return encodeURIComponent(label);
}

export function normalizeList(value?: string[]): string {
  return value && value.length > 0 ? value.join(", ") : "N/A";
}

export async function fetchRecipes(query: string, maxResults = 20): Promise<Recipe[]> {
  const trimmed = query.trim() || "recipe";
  const apiUrl = `https://api.edamam.com/search?q=${encodeURIComponent(trimmed)}&app_id=${APP_ID}&app_key=${APP_KEY}&to=${maxResults}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Edamam request failed: ${response.status}`);
    }

    const data = (await response.json()) as EdamamResponse;
    const recipes = data.hits?.map((hit) => hit.recipe).filter(Boolean) ?? [];

    return recipes.length > 0 ? recipes : filterFallbackRecipes(trimmed, maxResults);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return filterFallbackRecipes(trimmed, maxResults);
  }
}

export async function fetchRecipeDetails(label: string): Promise<Recipe | null> {
  const localMatch = fallbackRecipes.find((recipe) => recipe.label.toLowerCase() === label.toLowerCase());
  if (localMatch) {
    return localMatch;
  }

  const recipes = await fetchRecipes(label, 1);
  return recipes[0] ?? null;
}

function filterFallbackRecipes(query: string, maxResults: number): Recipe[] {
  const normalized = query.toLowerCase();
  const matches = fallbackRecipes.filter((recipe) => {
    const searchable = [
      recipe.label,
      recipe.source,
      ...recipe.ingredientLines,
      ...recipe.cuisineType,
      ...recipe.dishType,
      ...(recipe.mealType ?? []),
      ...recipe.dietLabels,
    ]
      .join(" ")
      .toLowerCase();

    return searchable.includes(normalized) || normalized === "recipe";
  });

  return (matches.length > 0 ? matches : fallbackRecipes).slice(0, maxResults);
}
