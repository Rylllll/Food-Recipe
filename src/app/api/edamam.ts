const APP_ID = '2bed754d';
const APP_KEY = 'be0d11be5811118351ec90964689042e';
const BASE_URL = 'https://api.edamam.com/api/recipes/v2';

export const extractId = (uri: string) => {
  if (!uri) return "";
  const parts = uri.split("_");
  return parts.length > 1 ? parts[1] : uri;
};

export interface SearchFilters {
  health?: string;
  cuisineType?: string;
  mealType?: string;
}

export const searchRecipes = async (query: string, filters: SearchFilters = {}) => {
  const url = new URL(BASE_URL);
  url.searchParams.append('type', 'public');
  url.searchParams.append('q', query || 'traditional'); 
  url.searchParams.append('app_id', APP_ID);
  url.searchParams.append('app_key', APP_KEY);
  
  if (filters.health) {
    url.searchParams.append('health', filters.health);
  }
  if (filters.cuisineType) {
    url.searchParams.append('cuisineType', filters.cuisineType);
  }
  if (filters.mealType) {
    url.searchParams.append('mealType', filters.mealType);
  }
  
  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return {
      recipes: data.hits?.map((h: any) => h.recipe) || [],
      nextUrl: data._links?.next?.href || null
    };
  } catch (error) {
    console.error("Failed to fetch recipes", error);
    return { recipes: [], nextUrl: null };
  }
}

export const fetchNextPage = async (nextUrl: string) => {
  try {
    const res = await fetch(nextUrl);
    const data = await res.json();
    return {
      recipes: data.hits?.map((h: any) => h.recipe) || [],
      nextUrl: data._links?.next?.href || null
    };
  } catch (error) {
    console.error("Failed to fetch next page", error);
    return { recipes: [], nextUrl: null };
  }
}

export const getRecipeById = async (id: string) => {
  const url = new URL(`${BASE_URL}/${id}`);
  url.searchParams.append('type', 'public');
  url.searchParams.append('app_id', APP_ID);
  url.searchParams.append('app_key', APP_KEY);
  
  try {
    const res = await fetch(url.toString());
    const data = await res.json();
    return data.recipe;
  } catch (error) {
    console.error("Failed to fetch recipe", error);
    return null;
  }
}
