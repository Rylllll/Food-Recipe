import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import { 
  ArrowLeft, Clock, Flame, CheckSquare, ShieldAlert, Heart, Activity, Share2, ExternalLink, ChefHat
} from "lucide-react";
import { getRecipeById, searchRecipes } from "../api/edamam";
import { RecipeCard } from "../components/RecipeCard";

const COLORS = ["bg-[#FF5C5C]", "bg-[#FFBD12]", "bg-[#00C6AE]", "bg-[#FF89BB]", "bg-[#F95A2C]", "bg-[#1947E5]"];

export function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [related, setRelated] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      window.scrollTo(0,0);
      getRecipeById(id).then(data => {
        setRecipe(data);
        setLoading(false);
        const q = data.cuisineType?.[0] || 'healthy';
        searchRecipes(q, { health: '', cuisineType: '', mealType: '' }).then(res => {
          setRelated(res.recipes.filter((r: any) => r.uri !== data.uri).slice(0, 2));
        });
      }).catch(() => setLoading(false));
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center text-theme-text">
        <div className="bg-[#FFBD12] text-black border-[3px] border-theme-border p-4 font-black uppercase text-lg animate-bounce shadow-[4px_4px_0_0_var(--border-color)]">
          Loading Recipe...
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-[calc(100vh-80px)] text-theme-text flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl md:text-5xl font-black uppercase mb-4 text-[#FF5C5C] text-center drop-shadow-[2px_2px_0_var(--border-color)]">
          Recipe Not Found
        </h1>
        <Link to="/" className="inline-block bg-[#00C6AE] text-black border-[3px] border-theme-border px-6 py-3 text-base md:text-lg font-bold uppercase shadow-[4px_4px_0_0_var(--border-color)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
          Go Back Home
        </Link>
      </div>
    );
  }

  const time = recipe.totalTime ? `${recipe.totalTime} MIN` : "45 MIN";
  const calories = Math.round(recipe.calories);
  
  const getNutrient = (label: string) => {
    const nut = recipe.digest?.find((d: any) => d.label === label);
    return nut ? `${Math.round(nut.total)}${nut.unit}` : "-";
  };

  const carbs = recipe.digest?.find((d: any) => d.label === 'Carbs');
  const protein = recipe.digest?.find((d: any) => d.label === 'Protein');
  const fat = recipe.digest?.find((d: any) => d.label === 'Fat');

  return (
    <div className="text-theme-text min-h-screen font-sans bg-theme-bg">
      <div className="max-w-[1440px] mx-auto w-full p-3 md:p-4 flex flex-col xl:flex-row gap-4 lg:gap-6">
        
        <div className="flex-1 flex flex-col min-w-0">
          
          <div className="flex items-center gap-3 mb-4">
            <Link 
              to="/recipes" 
              className="inline-flex items-center justify-center bg-[#FFBD12] text-black border-[3px] border-theme-border w-10 h-10 font-bold uppercase shadow-[2px_2px_0_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all shrink-0"
              aria-label="Back to Recipes"
            >
              <ArrowLeft className="w-5 h-5 stroke-[3]" />
            </Link>
            <div className="flex-1 border-[3px] border-theme-border bg-theme-card p-2 md:p-3 shadow-[2px_2px_0_0_var(--border-color)] truncate font-black uppercase text-sm md:text-base">
              {recipe.label}
            </div>
          </div>

          <div className="bg-[#1947E5] border-[3px] border-theme-border p-3 md:p-4 shadow-[4px_4px_0_0_var(--border-color)] mb-4 lg:mb-6">
            <div className="bg-theme-card border-[3px] border-theme-border p-3 md:p-4 flex flex-col lg:flex-row gap-4 lg:gap-6">
              
              <div className="lg:w-1/3 shrink-0">
                <div className="border-[3px] border-theme-border bg-[#FF89BB] aspect-[4/3] overflow-hidden shadow-[4px_4px_0_0_#FFBD12]">
                  <img 
                    src={recipe.image} 
                    alt={recipe.label} 
                    className="w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>

              <div className="lg:w-2/3 flex flex-col">
                <div className="flex justify-between items-start gap-4 mb-4">
                  <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-tight break-words">
                    {recipe.label}
                  </h1>
                  <div className="flex gap-2 shrink-0">
                    <button className="w-10 h-10 bg-[#FFBD12] border-[3px] border-theme-border flex items-center justify-center shadow-[2px_2px_0_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                      <Share2 className="w-5 h-5 stroke-[3]" />
                    </button>
                    <button className="w-10 h-10 bg-[#FF5C5C] border-[3px] border-theme-border flex items-center justify-center shadow-[2px_2px_0_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                      <Heart className="w-5 h-5 stroke-[3] text-black" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                  <span className="bg-[#00C6AE] text-black border-[3px] border-theme-border px-3 py-2 font-black uppercase text-[10px] md:text-xs shadow-[2px_2px_0_0_var(--border-color)]">
                    {recipe.dishType?.[0] || 'Main Dish'}
                  </span>
                  <span className="bg-[#FFBD12] text-black border-[3px] border-theme-border px-3 py-2 font-black uppercase text-[10px] md:text-xs flex items-center gap-2 shadow-[2px_2px_0_0_var(--border-color)]">
                    <Flame className="w-3.5 h-3.5 stroke-[3]" /> {calories} KCAL
                  </span>
                  <span className="bg-[#FF89BB] text-black border-[3px] border-theme-border px-3 py-2 font-black uppercase text-[10px] md:text-xs flex items-center gap-2 shadow-[2px_2px_0_0_var(--border-color)]">
                    <Clock className="w-3.5 h-3.5 stroke-[3]" /> {time}
                  </span>
                </div>

                <div className="mt-auto p-3 border-t-[3px] border-theme-border border-dashed">
                  <h3 className="text-sm md:text-base font-black uppercase mb-2 text-theme-text">Macronutrients</h3>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] md:text-xs font-bold uppercase">
                    {carbs && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#1947E5] text-sm md:text-base">{Math.round(carbs.total)}g</span>
                        <span className="opacity-70">Carbs</span>
                      </div>
                    )}
                    <div className="w-1.5 h-1.5 rounded-full bg-theme-border"></div>
                    {protein && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#00C6AE] text-sm md:text-base">{Math.round(protein.total)}g</span>
                        <span className="opacity-70">Protein</span>
                      </div>
                    )}
                    <div className="w-1.5 h-1.5 rounded-full bg-theme-border"></div>
                    {fat && (
                      <div className="flex items-center gap-2">
                        <span className="text-[#FF5C5C] text-sm md:text-base">{Math.round(fat.total)}g</span>
                        <span className="opacity-70">Fat</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {recipe.cautions?.length > 0 && (
            <div className="mb-4 lg:mb-6 bg-[#FF5C5C] border-[3px] border-theme-border p-3 md:p-4 shadow-[4px_4px_0_0_var(--border-color)] flex items-center gap-4">
              <div className="bg-theme-card p-2 md:p-3 border-[3px] border-theme-border shadow-[2px_2px_0_0_var(--border-color)] shrink-0">
                <ShieldAlert className="w-5 h-5 md:w-6 md:h-6 stroke-[3] text-black" />
              </div>
              <div>
                <h2 className="text-base md:text-lg font-black uppercase text-black">Contains Allergens</h2>
                <p className="font-bold text-black uppercase text-[10px] md:text-xs">{recipe.cautions.join(", ")}</p>
              </div>
            </div>
          )}

          <div className="mb-6 lg:mb-8">
            <h2 className="text-xl md:text-2xl font-black uppercase mb-4 flex items-center gap-3">
              <CheckSquare className="w-6 h-6 text-[#FFBD12]" /> 
              Ingredients ({recipe.ingredientLines?.length || 0})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              {recipe.ingredientLines?.map((ing: string, i: number) => (
                <div key={i} className="bg-theme-card border-[3px] border-theme-border p-3 md:p-4 shadow-[2px_2px_0_0_var(--border-color)] flex items-start gap-3 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FFBD12] transition-all">
                  <div className="w-5 h-5 md:w-6 md:h-6 shrink-0 bg-[#00C6AE] border-2 border-theme-border flex items-center justify-center font-black text-black text-[10px] md:text-xs">
                    {i + 1}
                  </div>
                  <span className="text-xs md:text-sm font-bold leading-tight pt-0.5">{ing}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 lg:mb-8">
            <h2 className="text-lg md:text-xl font-black uppercase mb-3 flex items-center gap-3">
              <Heart className="w-5 h-5 text-[#FF89BB]" /> Health Labels
            </h2>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {recipe.healthLabels?.map((label: string) => (
                <span key={label} className="bg-theme-bg border-2 border-theme-border text-theme-text px-3 py-1.5 font-black text-[10px] md:text-xs uppercase shadow-[2px_2px_0_0_var(--border-color)] hover:bg-[#FF89BB] hover:text-black transition-colors cursor-default">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {related.length > 0 && (
            <div className="pt-6 border-t-[6px] border-theme-border border-dashed">
              <h2 className="text-2xl md:text-3xl font-black uppercase mb-4 flex items-center gap-3">
                <ChefHat className="w-6 h-6 md:w-8 md:h-8 text-[#1947E5]" /> Similar Bites
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((relRecipe, idx) => (
                  <RecipeCard key={idx} recipe={relRecipe} colorClass={COLORS[idx % COLORS.length]} />
                ))}
              </div>
            </div>
          )}

        </div>

        <div className="w-full xl:w-[300px] shrink-0">
          <div className="sticky top-24 flex flex-col gap-4">
            
            <div className="bg-[#00C6AE] border-[3px] border-theme-border p-4 shadow-[4px_4px_0_0_var(--border-color)]">
              <h2 className="text-lg md:text-xl font-black uppercase text-black mb-2">Ready to cook?</h2>
              <p className="font-bold text-black mb-4 text-[10px] md:text-xs">Get the complete step-by-step instructions from the original recipe source.</p>
              <a 
                href={recipe.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full bg-theme-card text-theme-text flex items-center justify-center gap-3 p-3 md:p-4 text-sm md:text-base font-black uppercase border-[3px] border-theme-border hover:bg-theme-text hover:text-theme-bg shadow-[2px_2px_0_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
              >
                View Instructions <ExternalLink className="w-4 h-4 md:w-5 md:h-5 stroke-[3]" />
              </a>
            </div>

            <div className="bg-theme-card border-[3px] border-theme-border p-4 shadow-[4px_4px_0_0_var(--border-color)]">
              <h2 className="text-xl md:text-2xl font-black uppercase mb-4 flex items-center gap-3 border-b-[6px] border-theme-border pb-3">
                <Activity className="w-5 h-5 md:w-6 md:h-6 text-[#FF5C5C]" /> Nutrition
              </h2>
              
              <div className="space-y-0 font-black uppercase text-sm md:text-base">
                <div className="flex justify-between items-center p-3 border-b-[3px] border-theme-border">
                  <span className="text-sm md:text-base">Calories</span>
                  <span className="text-base md:text-lg text-[#FFBD12]">{calories}</span>
                </div>
                <div className="flex justify-between items-center p-3 border-b-[3px] border-theme-border">
                  <span>Protein</span>
                  <span className="text-[#00C6AE]">{getNutrient('Protein')}</span>
                </div>
                <div className="flex justify-between items-center p-3 border-b-[3px] border-theme-border">
                  <span>Fat</span>
                  <span className="text-[#FF5C5C]">{getNutrient('Fat')}</span>
                </div>
                <div className="flex justify-between items-center p-3 border-b-[3px] border-theme-border">
                  <span>Saturated</span>
                  <span>{getNutrient('Saturated')}</span>
                </div>
                <div className="flex justify-between items-center p-3 border-b-[3px] border-theme-border">
                  <span>Carbs</span>
                  <span className="text-[#1947E5]">{getNutrient('Carbs')}</span>
                </div>
                <div className="flex justify-between items-center p-3 border-b-[3px] border-theme-border">
                  <span>Sugar</span>
                  <span className="text-[#FF89BB]">{getNutrient('Sugars')}</span>
                </div>
                <div className="flex justify-between items-center p-3 border-b-[3px] border-theme-border">
                  <span>Sodium</span>
                  <span>{getNutrient('Sodium')}</span>
                </div>
                <div className="flex justify-between items-center p-3">
                  <span>Fiber</span>
                  <span className="text-[#FFBD12]">{getNutrient('Fiber')}</span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}