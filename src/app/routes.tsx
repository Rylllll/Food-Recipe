import React from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Recipes } from "./pages/Recipes";
import { RecipeDetail } from "./pages/RecipeDetail";
import { Saved } from "./pages/Saved";

function Root() {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-1 relative">
        <Outlet />
      </main>
      <footer className="border-t-8 border-theme-border bg-theme-card text-theme-text p-8 md:p-16 flex flex-col md:flex-row justify-between items-center font-bold uppercase transition-colors duration-300">
        <div className="flex flex-col mb-8 md:mb-0">
          <span className="text-4xl font-black tracking-tighter mb-2">Global Bites</span>
          <span className="opacity-70 text-lg">Not for the faint of heart.</span>
        </div>
        <p className="text-2xl border-4 border-theme-border px-6 py-3 bg-[#FFBD12] text-black">
          © {new Date().getFullYear()} TASTE THE WORLD
        </p>
      </footer>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "recipes", Component: Recipes },
      { path: "recipe/:id", Component: RecipeDetail },
      { path: "saved", Component: Saved },
      { path: "*", Component: () => <div className="p-24 text-center font-black text-6xl text-theme-text bg-[#FF5C5C] text-black border-b-8 border-black">404 - DEAD END</div> }
    ]
  }
]);
