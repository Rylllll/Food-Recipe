import Image from "next/image";
import Link from "next/link";
import { normalizeList, Recipe, slugifyLabel } from "@/lib/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  featured?: boolean;
}

export default function RecipeCard({ recipe, featured = false }: RecipeCardProps) {
  if (featured) {
    return <FeaturedRecipe recipe={recipe} />;
  }

  return (
    <article className="recipe-card group relative rounded bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link href={`/details?id=${slugifyLabel(recipe.label)}`} className="block overflow-hidden">
        <Image src={recipe.image} alt={recipe.label} width={500} height={320} className="h-52 w-full object-cover transition duration-300 group-hover:scale-105" />
      </Link>
      <div className="mt-3 rounded-md bg-[#d45101] py-1 text-center font-semibold">
        <p className="mt-1 text-xs uppercase text-white">{normalizeList(recipe.cuisineType)}</p>
      </div>
      <div className="mt-2 h-[70px]">
        <h2 className="text-sm font-semibold">{truncateText(recipe.label, 42)}</h2>
        <p className="mt-1 text-xs text-gray-500">By {recipe.source}</p>
      </div>
      <div className="flex justify-between text-xs text-gray-600">
        <p>
          ◷ {recipe.totalTime || 0} minutes
        </p>
        <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="font-sans hover:text-black">
          Link
        </a>
      </div>
    </article>
  );
}

function FeaturedRecipe({ recipe }: { recipe: Recipe }) {
  const totalServings = recipe.yield;
  const totalIngredients = recipe.ingredientLines.length;
  const calories = recipe.calories.toFixed(2);

  return (
    <article className="recipe-card relative w-full transition">
      <div className="grid gap-8 p-4 md:p-0 lg:flex xl:flex">
        <div className="relative w-full transition">
          <Image src={recipe.image} alt={recipe.label} width={600} height={450} className="h-display w-full object-cover lg:w-custom xl:w-custom" priority />
        </div>

        <div className="w-full">
          <div className="flex justify-between gap-10">
            <h2 className="font-bai text-3xl font-bold transition hover:text-[#d45101] md:text-5xl lg:text-5xl xl:text-5xl">{recipe.label}</h2>
            <div className="flex gap-2">
              <span className="cursor-pointer bg-[#d45101] p-2 text-white shadow-md transition hover:text-[#151515]">♥</span>
              <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="mt-1 bg-[#d45101] px-2 py-1 font-sans text-white shadow-md hover:text-[#151515]">
                ↗
              </a>
            </div>
          </div>
          <div className="mt-4 flex gap-2 text-sm">
            <p>By:</p>
            <p className="font-semibold">{recipe.source}.</p>
          </div>

          <div className="mt-4 flex justify-between gap-4">
            <Metric value={calories} label="Calories" />
            <Separator />
            <Metric value={totalIngredients} label="Ingredients needs" />
            <Separator />
            <Metric value={recipe.totalTime || 0} label="Minutes" />
          </div>

          <div className="mt-4 flex justify-between gap-4 md:gap-0 lg:gap-0 xl:gap-0">
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <p className="border border-[#151515] px-3 py-1">{normalizeList(recipe.cuisineType)}</p>
              <p className="border border-[#151515] px-3 py-1">{normalizeList(recipe.dishType)}</p>
              <p className="border border-[#151515] px-3 py-1">{normalizeList(recipe.dietLabels)}</p>
            </div>
            <p className="mt-5 text-xs md:text-sm lg:text-sm xl:text-sm">{totalServings} Servings</p>
          </div>

          <p className="mt-6 text-sm">
            Discover a flavorful dish with clear ingredient guidance, practical timing, and a trusted source link so you can cook with confidence.
          </p>

          <Link href={`/details?id=${slugifyLabel(recipe.label)}`}>
            <button className="mt-6 bg-[#d45101] px-8 py-3 text-white transition hover:bg-[#151515]" type="button">
              View Recipe
            </button>
          </Link>
        </div>
      </div>
    </article>
  );
}

function Metric({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center py-2 text-center">
      <p className="mt-2 text-lg text-[#f07a00] md:text-3xl lg:text-3xl xl:text-3xl">{value}</p>
      <p className="mt-2 text-sm">{label}</p>
    </div>
  );
}

function Separator() {
  return <div className="h-28 border-l border-[#151515]" />;
}

function truncateText(text: string, maxLength: number) {
  return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
}
