import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import { fallbackRecipes, fetchRecipeDetails, normalizeList } from "@/lib/recipes";

interface DetailsPageProps {
  searchParams: { id?: string };
}

export default async function DetailsPage({ searchParams }: DetailsPageProps) {
  const label = decodeURIComponent(searchParams.id || fallbackRecipes[0].label);
  const recipe = await fetchRecipeDetails(label);

  if (!recipe) {
    return (
      <main>
        <Header solid />
        <section className="container mx-auto min-h-[60vh] px-4 pt-32 md:px-0">
          <h1 className="font-bai text-4xl font-bold">Recipe not found.</h1>
          <Link href="/recipe" className="mt-6 inline-block bg-[#d45101] px-6 py-3 text-white">Back to recipes</Link>
        </section>
        <Footer />
      </main>
    );
  }

  const relatedRecipes = fallbackRecipes.filter((item) => item.label !== recipe.label).slice(0, 4);

  return (
    <main>
      <Header solid />
      <div className="mt-20 w-full bg-gray-100 py-2">
        <div className="container mx-auto flex gap-2 px-4 text-sm md:px-0">
          <Link href="/" className="hover:underline">⌂</Link>
          <span className="mt-1 text-xs">›</span>
          <Link href="/recipe" className="transition hover:text-[#d45101] hover:underline">Recipes</Link>
          <span className="mt-1 text-xs">›</span>
          <h1 className="text-[#d45101]">{recipe.label}</h1>
        </div>
      </div>

      <section className="container mx-auto mt-16">
        <div className="grid gap-12 p-4 md:p-0 lg:flex xl:flex">
          <Image src={recipe.image} alt={recipe.label} width={600} height={450} className="h-display w-full object-cover lg:w-custom xl:w-custom" priority />
          <div className="w-full">
            <div className="flex justify-between gap-10">
              <h2 className="font-bai text-3xl font-bold transition hover:text-[#d45101] md:text-5xl lg:text-5xl xl:text-5xl">{recipe.label}</h2>
              <div className="flex gap-2">
                <span className="cursor-pointer bg-[#d45101] p-2 text-white shadow-md transition hover:text-pink-400">♥</span>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="mt-1 bg-[#d45101] px-2 py-1 font-sans text-white shadow-md hover:text-pink-400">
                  ↗
                </a>
              </div>
            </div>
            <div className="mt-4 flex gap-2 text-sm">
              <p>By:</p>
              <p className="font-semibold">{recipe.source}.</p>
            </div>

            <div className="mt-4 flex justify-between gap-4">
              <Metric value={recipe.calories.toFixed(2)} label="Calories" />
              <Separator />
              <Metric value={recipe.ingredientLines.length} label="Ingredients needs" />
              <Separator />
              <Metric value={recipe.totalTime || 0} label="Minutes" />
            </div>

            <div className="mt-4 flex justify-between gap-4 md:gap-0">
              <div className="mt-4 flex flex-wrap gap-2 text-xs">
                <p className="border border-[#151515] px-3 py-1">{normalizeList(recipe.cuisineType)}</p>
                <p className="border border-[#151515] px-3 py-1">{normalizeList(recipe.dishType)}</p>
                <p className="border border-[#151515] px-3 py-1">{normalizeList(recipe.dietLabels)}</p>
              </div>
              <p className="mt-5 text-xs md:text-sm">{recipe.yield} Servings</p>
            </div>

            <div className="mt-8">
              <h3 className="font-bai text-2xl font-semibold">Ingredients</h3>
              <ul className="ingredients-list mt-4 grid gap-2 text-sm text-gray-700 md:grid-cols-2">
                {recipe.ingredientLines.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>

            <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block bg-[#d45101] px-8 py-3 text-white transition hover:bg-[#151515]">
              View full instructions
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-20">
        <div className="px-4 md:px-0">
          <h2 className="font-bai text-3xl font-semibold">Related Recipes</h2>
        </div>
        <div className="mt-6 grid gap-6 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-4">
          {relatedRecipes.map((item) => (
            <RecipeCard key={item.label} recipe={item} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}

function Metric({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="mx-auto flex w-full flex-col items-center justify-center py-2 text-center">
      <p className="mt-2 text-lg text-[#f07a00] md:text-5xl lg:text-5xl xl:text-5xl">{value}</p>
      <p className="mt-2 text-sm">{label}</p>
    </div>
  );
}

function Separator() {
  return <div className="h-28 border-l border-[#151515]" />;
}
