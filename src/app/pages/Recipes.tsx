import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { RecipeCard } from "../components/RecipeCard";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, X, ArrowDown, Activity } from "lucide-react";
import { searchRecipes, fetchNextPage, SearchFilters } from "../api/edamam";
import { LoadingScreen } from "../components/LoadingScreen";

const COLORS = ["bg-[#FF5C5C]", "bg-[#FFBD12]", "bg-[#00C6AE]", "bg-[#FF89BB]", "bg-[#F95A2C]", "bg-[#1947E5]"];

export function Recipes() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "traditional";
  const initialCuisine = searchParams.get("cuisine") || "";

  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);
  
  const [query, setQuery] = useState(initialQuery);
  const [searchInput, setSearchInput] = useState(initialQuery);
  
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    health: "",
    cuisineType: initialCuisine,
    mealType: ""
  });

  useEffect(() => {
    let active = true;
    setLoading(true);
    searchRecipes(query, filters).then(data => {
      if (active) {
        setRecipes(data.recipes);
        setNextUrl(data.nextUrl);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [query, filters]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setQuery(searchInput);
  };

  const updateFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: prev[key] === value ? "" : value }));
  };

  const clearFilters = () => {
    setFilters({ health: "", cuisineType: "", mealType: "" });
  };

  const handleLoadMore = async () => {
    if (!nextUrl) return;
    setLoadingMore(true);
    const data = await fetchNextPage(nextUrl);
    setRecipes(prev => [...prev, ...data.recipes]);
    setNextUrl(data.nextUrl);
    setLoadingMore(false);
  };

  const cuisines = ["American", "Asian", "British", "Caribbean", "Chinese", "French", "Indian", "Italian", "Japanese", "Mediterranean", "Mexican", "Middle Eastern"];
  const meals = ["Breakfast", "Dinner", "Lunch", "Snack"];
  const healths = ["vegan", "vegetarian", "gluten-free", "keto-friendly"];

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text font-sans p-3 md:p-4">
      <LoadingScreen isVisible={loading} text="FETCHING RECIPES..." />

      <div className="max-w-[1440px] mx-auto w-full flex flex-col gap-4">
        
        <div className="bg-theme-card border-[3px] border-theme-border shadow-[4px_4px_0_0_var(--border-color)] flex flex-col">
          <div className="p-3 md:p-4 border-b-[3px] border-theme-border bg-[#FFBD12] text-black flex flex-col md:flex-row md:items-center justify-between gap-3">
            <h2 className="text-lg md:text-xl font-black uppercase tracking-tighter flex items-center gap-3">
              <Activity className="w-5 h-5 stroke-[3]" /> Control Panel
            </h2>
            
            <div className="flex items-center gap-3">
              <form onSubmit={handleSearch} className="flex flex-1 md:w-64 gap-2">
                <div className="relative flex-1">
                  <input 
                    type="text" 
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="e.g. tacos..." 
                    className="w-full bg-theme-bg border-[3px] border-black p-2.5 pl-10 font-bold uppercase text-xs md:text-sm focus:outline-none focus:border-[#00C6AE] transition-colors"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-3.5 text-black stroke-[3]" />
                </div>
                <button type="submit" className="bg-[#00C6AE] text-black border-[3px] border-black px-4 font-black uppercase text-xs md:text-sm shadow-[2px_2px_0_0_black] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all">
                  Go
                </button>
              </form>
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className={`md:hidden bg-black text-white border-[3px] border-black p-2.5 ${showFilters ? 'bg-theme-text text-theme-bg' : ''}`}
              >
                <SlidersHorizontal className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>

          <AnimatePresence>
            {(showFilters || window.innerWidth >= 768) && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-3 md:p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-black uppercase text-[10px] md:text-xs mb-3 bg-[#1947E5] text-white inline-block px-3 py-1.5">Cuisine</h3>
                    <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto custom-scrollbar pr-2">
                      {cuisines.map(c => (
                        <button 
                          key={c}
                          onClick={() => updateFilter('cuisineType', c)}
                          className={`p-2 border-2 font-black uppercase text-[9px] md:text-[10px] shadow-[1px_1px_0_0_var(--border-color)] hover:translate-x-px hover:translate-y-px hover:shadow-none transition-all ${filters.cuisineType === c ? 'bg-[#1947E5] border-theme-border text-white' : 'bg-theme-bg border-theme-border text-theme-text hover:bg-theme-border'}`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-black uppercase text-[10px] md:text-xs mb-3 bg-[#FF89BB] text-black inline-block px-3 py-1.5">Meal Type</h3>
                    <div className="flex flex-wrap gap-2">
                      {meals.map(m => (
                        <button 
                          key={m}
                          onClick={() => updateFilter('mealType', m)}
                          className={`p-2 border-2 font-black uppercase text-[10px] md:text-xs shadow-[2px_2px_0_0_var(--border-color)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all ${filters.mealType === m ? 'bg-[#FF89BB] border-theme-border text-black' : 'bg-theme-bg border-theme-border text-theme-text'}`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-black uppercase text-[10px] md:text-xs mb-3 bg-[#00C6AE] text-black inline-block px-3 py-1.5">Dietary</h3>
                    <div className="flex flex-wrap gap-2">
                      {healths.map(h => (
                        <button 
                          key={h}
                          onClick={() => updateFilter('health', h)}
                          className={`px-3 py-2 border-2 font-black uppercase text-[10px] md:text-xs shadow-[2px_2px_0_0_var(--border-color)] flex items-center gap-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all ${filters.health === h ? 'bg-[#00C6AE] border-theme-border text-black' : 'bg-theme-bg border-theme-border text-theme-text'}`}
                        >
                          {h.replace("-", " ")}
                          <div className={`w-2.5 h-2.5 border-2 border-black ${filters.health === h ? 'bg-black' : 'bg-white'}`}></div>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                <div className="p-3 border-t-[3px] border-theme-border bg-theme-bg flex justify-end">
                  <button 
                    onClick={clearFilters}
                    className="text-[10px] md:text-xs font-black uppercase hover:text-[#FF5C5C] flex items-center gap-2 px-3 py-1.5 border-[3px] border-transparent hover:border-theme-border transition-all"
                  >
                    <X className="w-3 h-3 md:w-4 md:h-4 stroke-[4]" /> Clear Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <main className="flex-1 min-w-0 flex flex-col gap-4">
          <div className="bg-[#1947E5] border-[3px] border-theme-border p-3 md:p-4 shadow-[4px_4px_0_0_var(--border-color)] flex items-center justify-between">
             <h1 className="text-xl md:text-2xl font-black uppercase text-white tracking-tighter">
               Results <span className="bg-[#FFBD12] text-black px-3 py-1 ml-3 border-2 border-black text-lg">{recipes.length}</span>
             </h1>
          </div>

          {!loading && recipes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
                {recipes.map((recipe, index) => (
                  <motion.div
                    key={`${recipe.uri}-${index}`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 100, damping: 20 }}
                    className="h-full"
                  >
                    <RecipeCard recipe={recipe} colorClass={COLORS[index % COLORS.length]} />
                  </motion.div>
                ))}
              </div>
              
              {nextUrl && (
                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={handleLoadMore}
                    disabled={loadingMore}
                    className={`bg-[#FFBD12] text-black border-[3px] border-theme-border px-6 py-3 text-sm md:text-base font-black uppercase shadow-[4px_4px_0_0_var(--border-color)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center gap-3 ${loadingMore ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loadingMore ? 'Fetching...' : 'Load More'}
                    <ArrowDown className={`w-5 h-5 stroke-[3] ${loadingMore ? 'animate-bounce' : ''}`} />
                  </button>
                </div>
              )}
            </>
          ) : !loading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 border-[3px] border-theme-border border-dashed bg-theme-card">
               <div className="w-12 h-12 bg-[#FF5C5C] border-[3px] border-theme-border shadow-[4px_4px_0_0_var(--border-color)] flex items-center justify-center mb-4">
                 <X className="w-6 h-6 text-black stroke-[3]" />
               </div>
               <h2 className="text-xl font-black uppercase text-theme-text mb-3 text-center">Dead End</h2>
               <p className="text-xs md:text-sm font-bold text-center opacity-80 mb-4 max-w-xs">No global bites found for this combination.</p>
               <button 
                 onClick={clearFilters} 
                 className="px-4 py-2 bg-[#00C6AE] text-black font-black uppercase border-[3px] border-theme-border shadow-[4px_4px_0_0_var(--border-color)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all text-sm"
               >
                 Reset Board
               </button>
            </div>
          ) : null}
        </main>

      </div>
    </div>
  );
}