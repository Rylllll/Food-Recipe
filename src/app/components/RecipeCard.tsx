import React from "react";
import { Link } from "react-router";
import { Clock, Flame, Bookmark } from "lucide-react";
import { extractId } from "../api/edamam";
import { motion } from "motion/react";
import { useSavedRecipes } from "../hooks/useSavedRecipes";

export function RecipeCard({ recipe, colorClass }: { recipe: any; colorClass: string }) {
  const { toggleSave, isSaved } = useSavedRecipes();
  
  const id = extractId(recipe.uri);
  const time = recipe.totalTime ? `${recipe.totalTime} MIN` : "30 MIN";
  const calories = Math.round(recipe.calories);
  const saved = isSaved(id);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSave(recipe);
  };

  return (
    <Link to={`/recipe/${id}`} className="block h-full outline-none">
      <motion.div 
        whileHover={{ scale: 1.02, rotate: -1, y: -4 }}
        whileTap={{ scale: 0.98, rotate: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
        className={`border-[3px] border-theme-border ${colorClass} p-3 md:p-4 shadow-[4px_4px_0px_0px_var(--border-color)] hover:shadow-[8px_8px_0px_0px_var(--border-color)] transition-shadow duration-300 flex flex-col h-full cursor-pointer relative z-10`}
      >
        <div className="border-[3px] border-theme-border overflow-hidden relative bg-theme-border aspect-square mb-3 group">
          <img 
            src={recipe.image} 
            alt={recipe.label}
            className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 left-2 bg-theme-card text-theme-text border-2 border-theme-border px-2 py-1 text-[10px] md:text-xs font-black uppercase shadow-[2px_2px_0_0_var(--border-color)]">
            {recipe.cuisineType?.[0] || 'Global'}
          </div>
          
          <button 
            onClick={handleSave}
            className={`absolute top-2 right-2 p-1.5 md:p-2 border-2 border-theme-border transition-all shadow-[2px_2px_0_0_var(--border-color)] active:shadow-none active:translate-y-[2px] active:translate-x-[2px] ${saved ? 'bg-[#FF5C5C] text-black' : 'bg-theme-card text-theme-text hover:bg-black hover:text-[#FFBD12]'}`}
          >
            <Bookmark className="w-5 h-5 md:w-6 md:h-6" fill={saved ? "currentColor" : "none"} strokeWidth={3} />
          </button>
        </div>
        
        <div className="flex-1 bg-theme-card text-theme-text border-[3px] border-theme-border p-3 md:p-4 flex flex-col relative group-hover:bg-opacity-95 transition-colors">
          <h2 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-tight mb-3 line-clamp-2">
            {recipe.label}
          </h2>
          
          <div className="flex flex-wrap gap-1.5 mb-4">
             {recipe.healthLabels?.slice(0, 3).map((label: string) => (
                <span key={label} className="text-[9px] md:text-[10px] font-bold border-2 border-theme-border px-1.5 py-0.5 uppercase bg-theme-border text-theme-card whitespace-nowrap">
                  {label}
                </span>
             ))}
          </div>

          <div className="flex items-center justify-between mt-auto pt-3 border-t-[3px] border-theme-border border-dashed">
            <div className="flex items-center gap-1.5 font-bold text-xs md:text-sm bg-theme-card px-1.5 py-1 border-2 border-theme-border">
              <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-xs md:text-sm bg-theme-card px-1.5 py-1 border-2 border-theme-border">
              <Flame className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#FF5C5C]" />
              <span>{calories} CAL</span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}