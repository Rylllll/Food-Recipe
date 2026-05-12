"use client";

import { useEffect, useMemo, useState } from "react";
import RecipeCard from "@/components/RecipeCard";
import { fallbackRecipes, fetchRecipes, Recipe } from "@/lib/recipes";

interface RecipeExplorerProps {
  initialQuery?: string;
  mode?: "home" | "listing";
}

const homeTabs = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];
const listingTabs = ["Italian", "Mexican", "American", "Chinese", "Indian", "Japanese", "Korean", "Filipino", "Appetizer", "Salad", "Soup", "Dessert", "Beverage", "Breakfast", "Lunch", "Dinner"];

export default function RecipeExplorer({ initialQuery = "recipe", mode = "home" }: RecipeExplorerProps) {
  const tabs = useMemo(() => (mode === "home" ? homeTabs : listingTabs), [mode]);
  const [activeTab, setActiveTab] = useState(initialQuery === "recipe" ? tabs[0] : initialQuery);
  const [search, setSearch] = useState(initialQuery === "recipe" ? "" : initialQuery);
  const [recipes, setRecipes] = useState<Recipe[]>(fallbackRecipes);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const query = initialQuery === "recipe" && mode === "home" ? tabs[0] : initialQuery;
    setIsLoading(true);
    fetchRecipes(query, mode === "home" ? 8 : 100).then((result) => {
      if (mounted) {
        setRecipes(result);
        setIsLoading(false);
      }
    });
    return () => {
      mounted = false;
    };
  }, [initialQuery, mode, tabs]);

  const runQuery = async (query: string) => {
    setActiveTab(query);
    setIsLoading(true);
    const result = await fetchRecipes(query, mode === "home" ? 8 : 100);
    setRecipes(result);
    setIsLoading(false);
  };

  const submitSearch = () => {
    const query = search.trim();
    if (query) {
      void runQuery(query);
    }
  };

  return (
    <div>
      {mode === "listing" && (
        <div className="mb-8 flex gap-2 px-4 md:px-0">
          <input
            className="w-full border border-gray-200 px-4 py-3 text-sm focus:border-[#d45101] focus:outline-none"
            placeholder="Search by ingredient, recipe, or cuisine..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") submitSearch();
            }}
          />
          <button type="button" className="bg-[#d45101] px-6 py-3 text-white transition hover:bg-[#151515]" onClick={submitSearch}>
            Search
          </button>
        </div>
      )}

      <div className="grid grid-cols-2 items-center px-4 md:grid-cols-5 md:p-0 lg:grid-cols-8 xl:grid-cols-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`flex w-full items-center justify-center border-b-2 border-transparent bg-transparent py-2 text-xs transition duration-200 ease-in hover:bg-[#151515] hover:text-white md:text-base lg:text-base xl:text-base ${activeTab.toLowerCase() === tab.toLowerCase() ? "active-tab" : ""}`}
            type="button"
            onClick={() => void runQuery(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="mt-8 grid gap-4 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-4">
          {Array.from({ length: mode === "home" ? 4 : 8 }).map((_, index) => (
            <div key={index} className="h-80 animate-pulse rounded bg-gray-100" />
          ))}
        </div>
      ) : (
        <div className="mt-4 grid gap-6 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-4 xl:grid-cols-4">
          {recipes.map((recipe) => (
            <RecipeCard key={`${recipe.label}-${recipe.source}`} recipe={recipe} />
          ))}
        </div>
      )}
    </div>
  );
}
