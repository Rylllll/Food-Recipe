import React, { createContext, useContext, useState, useEffect } from "react";
import { extractId } from "../api/edamam";

interface SavedContextType {
  savedRecipes: any[];
  toggleSave: (recipe: any) => void;
  isSaved: (id: string) => boolean;
}

const SavedContext = createContext<SavedContextType>({} as any);

export const SavedProvider = ({ children }: { children: React.ReactNode }) => {
  const [savedRecipes, setSavedRecipes] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("brutal_saved");
    if (saved) {
      setSavedRecipes(JSON.parse(saved));
    }
  }, []);

  const toggleSave = (recipe: any) => {
    const id = extractId(recipe.uri);
    setSavedRecipes(prev => {
      const exists = prev.find((r: any) => extractId(r.uri) === id);
      let newSaved;
      if (exists) {
        newSaved = prev.filter((r: any) => extractId(r.uri) !== id);
      } else {
        newSaved = [...prev, recipe];
      }
      localStorage.setItem("brutal_saved", JSON.stringify(newSaved));
      return newSaved;
    });
  };

  const isSaved = (id: string) => {
    return savedRecipes.some((r: any) => extractId(r.uri) === id);
  };

  return (
    <SavedContext.Provider value={{ savedRecipes, toggleSave, isSaved }}>
      {children}
    </SavedContext.Provider>
  );
};

export const useSavedRecipes = () => useContext(SavedContext);
