import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeExplorer from "@/components/RecipeExplorer";

interface RecipePageProps {
  searchParams: { q?: string };
}

export default function RecipePage({ searchParams }: RecipePageProps) {
  const initialQuery = searchParams.q || "recipe";

  return (
    <main id="Home">
      <Header solid />
      <section className="bg-gray-100 pt-28">
        <div className="container mx-auto px-4 pb-10 md:px-0">
          <p className="font-script text-3xl text-[#d45101]">Recipe library</p>
          <h1 className="font-bai text-5xl font-bold">Discover your next dish</h1>
          <p className="mt-4 max-w-2xl text-sm text-gray-600">Search by ingredients, cuisine, meal type, or recipe name. Results come from the original Edamam integration with local recipe fallbacks for reliability.</p>
        </div>
      </section>
      <section className="container mx-auto mt-12">
        <RecipeExplorer mode="listing" initialQuery={initialQuery} />
      </section>
      <Footer />
    </main>
  );
}
