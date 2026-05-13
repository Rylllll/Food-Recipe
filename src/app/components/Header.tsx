import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { Globe, Menu, X, ArrowRight, Sun, Moon, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "next-themes";
import { useSavedRecipes } from "../hooks/useSavedRecipes";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { savedRecipes } = useSavedRecipes();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (path: string) => location.pathname === path;

  const warningText = Array(8).fill("🌍 NO PASSPORT REQUIRED • TASTE THE WORLD • CROSSING BORDERS");

  return (
    <header className="sticky top-0 z-50 flex flex-col font-mono shadow-[0_8px_0_0_var(--border-color)]">
      {/* TOP MARQUEE */}
      <div className="bg-[#1947E5] text-white border-b-[3px] border-theme-border flex overflow-hidden py-1.5 uppercase font-black text-xs whitespace-nowrap relative z-20">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
          className="flex gap-6"
        >
          {warningText.map((text, i) => (
            <span key={i} className="flex items-center gap-2 text-sm tracking-widest">
              {text}
            </span>
          ))}
        </motion.div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="flex flex-col lg:flex-row bg-theme-card border-b-[6px] border-theme-border text-theme-text items-stretch">
        
        {/* LOGO BLOCK */}
        <Link 
          to="/" 
          className="flex-1 lg:w-[25%] border-b-4 lg:border-b-0 lg:border-r-4 border-theme-border p-3 md:p-4 flex items-center justify-between group hover:bg-[#00C6AE] hover:text-black transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#FFBD12] text-black flex items-center justify-center border-[3px] border-theme-text group-hover:border-black group-hover:bg-black group-hover:text-[#00C6AE] shadow-[3px_3px_0_0_var(--text-color)] group-hover:shadow-none group-hover:translate-x-1 group-hover:translate-y-1 transition-all rounded-full shrink-0">
              <Globe className="w-5 h-5 md:w-6 md:h-6 stroke-[3]" />
            </div>
            <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-none">
              Global <br/> Bites
            </span>
          </div>
          
          <button 
            className="lg:hidden p-1.5 border-[3px] border-theme-border bg-theme-bg shadow-[3px_3px_0_0_var(--border-color)] text-theme-text active:translate-y-1 active:translate-x-1 active:shadow-none"
            onClick={(e) => { e.preventDefault(); setIsMenuOpen(!isMenuOpen); }}
          >
            {isMenuOpen ? <X className="w-6 h-6 stroke-[3]" /> : <Menu className="w-6 h-6 stroke-[3]" />}
          </button>
        </Link>

        {/* DESKTOP LINKS BLOCK */}
        <nav className="hidden lg:flex flex-1 lg:w-[50%]">
          <Link 
            to="/" 
            className={`flex-1 border-r-4 border-theme-border flex items-center justify-center text-lg lg:text-xl font-black uppercase tracking-tight hover:bg-[#FFBD12] hover:text-black transition-colors ${isActive('/') ? 'bg-theme-text text-theme-card' : ''}`}
          >
            Explore
          </Link>
          <Link 
            to="/recipes" 
            className={`flex-1 border-r-4 border-theme-border flex items-center justify-center text-lg lg:text-xl font-black uppercase tracking-tight hover:bg-[#FF5C5C] hover:text-black transition-colors ${isActive('/recipes') ? 'bg-theme-text text-theme-card' : ''}`}
          >
            All Recipes
          </Link>
        </nav>

        {/* DESKTOP CONTROLS BLOCK */}
        <div className="hidden lg:flex lg:w-[25%] items-stretch">
          {mounted && (
            <button 
              onClick={toggleTheme}
              className="px-6 border-r-4 border-theme-border flex items-center justify-center hover:bg-theme-border hover:text-theme-card transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-6 h-6 stroke-[3]" /> : <Moon className="w-6 h-6 stroke-[3]" />}
            </button>
          )}
          <Link to="/saved" className={`flex-1 flex flex-col items-center justify-center font-black uppercase transition-colors relative overflow-hidden group border-none ${isActive('/saved') ? 'bg-[#1947E5] text-white' : 'bg-theme-text text-theme-card hover:bg-[#1947E5] hover:text-white'}`}>
            <span className="group-hover:-translate-y-8 transition-transform duration-300 text-lg flex items-center gap-2">
              <Bookmark className="w-5 h-5 stroke-[3]" /> Saved
            </span>
            <span className="absolute translate-y-8 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2 text-base">
              {savedRecipes.length} Items <ArrowRight className="w-5 h-5 stroke-[3]" />
            </span>
          </Link>
        </div>
      </div>

      {/* MOBILE NAV */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden overflow-hidden bg-theme-card border-b-4 border-theme-border text-theme-text grid grid-cols-1 font-black uppercase text-xl"
          >
            <Link to="/" onClick={() => setIsMenuOpen(false)} className={`p-4 border-b-4 border-theme-border flex justify-between items-center ${isActive('/') ? 'bg-[#FFBD12] text-black' : 'hover:bg-[#FFBD12] hover:text-black'}`}>
              Explore <ArrowRight className="w-6 h-6" />
            </Link>
            <Link to="/recipes" onClick={() => setIsMenuOpen(false)} className={`p-4 border-b-4 border-theme-border flex justify-between items-center ${isActive('/recipes') ? 'bg-[#FF5C5C] text-black' : 'hover:bg-[#FF5C5C] hover:text-black'}`}>
              All Recipes <ArrowRight className="w-6 h-6" />
            </Link>
            <Link to="/saved" onClick={() => setIsMenuOpen(false)} className={`p-4 border-b-4 border-theme-border flex justify-between items-center ${isActive('/saved') ? 'bg-[#1947E5] text-white' : 'hover:bg-[#1947E5] hover:text-white'}`}>
              <div className="flex items-center gap-3">
                <Bookmark className="w-6 h-6" /> Saved ({savedRecipes.length})
              </div>
              <ArrowRight className="w-6 h-6" />
            </Link>
            
            <div className="grid grid-cols-1">
              {mounted && (
                <button 
                  onClick={toggleTheme}
                  className="p-4 flex justify-center items-center hover:bg-theme-border hover:text-theme-card bg-theme-bg"
                >
                  {theme === 'dark' ? (
                    <span className="flex items-center gap-3"><Sun className="w-6 h-6 stroke-[3]" /> Light Mode</span>
                  ) : (
                    <span className="flex items-center gap-3"><Moon className="w-6 h-6 stroke-[3]" /> Dark Mode</span>
                  )}
                </button>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}