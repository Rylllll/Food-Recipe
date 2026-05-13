import React from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Bookmark, ArrowRight } from "lucide-react";
import { useSavedRecipes } from "../hooks/useSavedRecipes";
import { RecipeCard } from "../components/RecipeCard";

const COLORS = ["bg-[#FF5C5C]", "bg-[#FFBD12]", "bg-[#00C6AE]", "bg-[#FF89BB]", "bg-[#F95A2C]", "bg-[#1947E5]"];

export function Saved() {
  const { savedRecipes } = useSavedRecipes();

  return (
    <div className="min-h-screen bg-theme-bg text-theme-text flex flex-col p-4 md:p-8 lg:p-12 relative z-0">
      
      <div className="flex items-end justify-between mb-8 md:mb-12 border-b-[6px] border-theme-border pb-4 md:pb-6">
         <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter flex items-center gap-3 md:gap-6">
           <Bookmark className="w-10 h-10 md:w-12 md:h-12 stroke-[3]" /> 
           Vault <span className="text-[#FF5C5C]">({savedRecipes.length})</span>
         </h1>
      </div>

      {savedRecipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
          {savedRecipes.map((recipe, index) => (
            <motion.div
              key={recipe.uri}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (index % 10) * 0.05, type: "spring", stiffness: 100 }}
              className="h-full"
            >
              <RecipeCard recipe={recipe} colorClass={COLORS[index % COLORS.length]} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center py-20 lg:py-32 border-[6px] border-theme-border border-dashed bg-theme-card">
           <Bookmark className="w-16 h-16 md:w-20 md:h-20 mb-4 opacity-20" />
           <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase text-[#FF5C5C] mb-4">Empty Vault.</h2>
           <p className="text-lg md:text-xl font-bold max-w-2xl mb-8">You haven't saved any global bites yet. Start exploring and bookmark your favorite dishes.</p>
           
           <Link to="/recipes" className="px-8 py-4 bg-[#1947E5] text-white font-black uppercase text-xl md:text-2xl border-[3px] border-theme-border shadow-[6px_6px_0_0_var(--border-color)] hover:translate-x-1 hover:-translate-y-1 hover:shadow-[10px_10px_0_0_var(--border-color)] transition-all flex items-center gap-3 group">
             Find Recipes <ArrowRight className="w-6 h-6 md:w-8 md:h-8 group-hover:translate-x-3 transition-transform" />
           </Link>
        </div>
      )}

    </div>
  );
}