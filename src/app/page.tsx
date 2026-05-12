import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import RecipeExplorer from "@/components/RecipeExplorer";
import { fallbackRecipes } from "@/lib/recipes";

const blogs = [
  { image: "/img/blog1.jpg", author: "/img/commentor.jpg", title: "Chef Secrets for Better Home Cooking", text: "Practical kitchen habits that make weeknight meals taste like restaurant favorites." },
  { image: "/img/blog2.jpg", author: "/img/chef1.jpg", title: "How to Build Balanced Meals", text: "Pair fresh ingredients, textures, and sauces for satisfying plates every time." },
  { image: "/img/blog3.jpg", author: "/img/chef2.jpg", title: "Global Flavors Worth Trying", text: "Explore beloved dishes inspired by Filipino, Japanese, Indian, and Mexican cooking." },
  { image: "/img/turkey.jpg", author: "/img/chef4.jpg", title: "The Art of Sharing Food", text: "Gather people around generous recipes designed for flavor and connection." },
];

const gallery = ["/img/por2.jpg", "/img/adobo.jpg", "/img/katsudon.jpg", "/img/french.jpg", "/img/por1.jpg", "/img/britain.jpg", "/img/bg.jpg", "/img/salad.jpg", "/img/turkey.jpg", "/img/india.jpg"];

export default function HomePage() {
  return (
    <main id="Home">
      <Header />
      <section className="relative flex min-h-screen items-center bg-[#151515] text-white">
        <Image src="/img/front-view-broccoli-cauliflower-salad-black-oval-plate-fork-knife-green-hot-peppers-dark-background.jpg" alt="Fresh salad hero background" fill className="object-cover opacity-45" priority />
        <div className="container relative mx-auto grid items-center gap-12 px-4 pt-24 md:grid-cols-2 md:px-0">
          <div className="animate__animated animate__fadeInUp">
            <p className="font-script text-3xl text-[#d45101]">Fresh meals every day</p>
            <h1 className="mt-4 font-bai text-5xl font-bold leading-tight md:text-7xl">Find recipes for every craving.</h1>
            <p className="mt-6 max-w-xl text-sm leading-7 text-gray-200">RecipeCuisine is now rebuilt with Next.js and TypeScript, keeping the original food discovery experience while adding component-based pages, typed data, and responsive navigation.</p>
            <div className="mt-8 flex gap-4">
              <Link href="/recipe" className="bg-[#d45101] px-8 py-3 text-white transition hover:bg-white hover:text-[#151515]">Explore Recipes</Link>
              <Link href="#Gallery" className="border border-white px-8 py-3 text-white transition hover:border-[#d45101] hover:text-[#d45101]">View Gallery</Link>
            </div>
          </div>
          <div className="hidden justify-end md:flex">
            <Image src="/img/model.png" alt="Chef presenting food" width={420} height={620} className="max-h-[620px] object-contain" />
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-24" id="Recipe">
        <div className="px-4 text-center md:px-0">
          <p className="font-script text-3xl text-[#d45101]">Featured Recipe</p>
          <h2 className="font-bai text-4xl font-bold">Popular dish of the day</h2>
        </div>
        <div className="mt-10">
          <RecipeCard recipe={fallbackRecipes[0]} featured />
        </div>
      </section>

      <section className="container mx-auto mt-24">
        <div className="px-4 text-center md:px-0">
          <p className="font-script text-3xl text-[#d45101]">Recipes</p>
          <h2 className="font-bai text-4xl font-bold">Browse by meal type</h2>
        </div>
        <div className="mt-8">
          <RecipeExplorer mode="home" initialQuery="Breakfast" />
        </div>
        <div className="mt-10 text-center">
          <Link href="/recipe" className="inline-block bg-[#d45101] px-8 py-3 text-white transition hover:bg-[#151515]">View all recipes</Link>
        </div>
      </section>

      <section id="Blogs" className="container mx-auto mt-24">
        <div className="px-4 text-center md:px-0">
          <p className="font-script text-3xl text-[#d45101]">Stories</p>
          <h2 className="font-bai text-4xl font-bold">Blogs</h2>
        </div>
        <div className="mt-8 grid gap-6 px-4 md:grid-cols-2 md:px-0 lg:grid-cols-4">
          {blogs.map((blog) => (
            <article key={blog.title} className="overflow-hidden bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
              <Image src={blog.image} alt={blog.title} width={400} height={280} className="h-56 w-full object-cover" />
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <Image src={blog.author} alt="Blog author" width={48} height={48} className="h-12 w-12 rounded-full object-cover" />
                  <p className="text-xs text-gray-500">RecipeCuisine Team</p>
                </div>
                <h3 className="mt-4 font-bai text-xl font-bold">{blog.title}</h3>
                <p className="mt-3 text-sm text-gray-600">{blog.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="Gallery" className="container mx-auto mt-24">
        <div className="px-4 text-center md:px-0">
          <p className="font-script text-3xl text-[#d45101]">Food moments</p>
          <h2 className="font-bai text-4xl font-bold">Gallery</h2>
        </div>
        <div className="mt-8 grid gap-4 px-4 sm:grid-cols-2 md:px-0 lg:grid-cols-5">
          {gallery.map((image) => (
            <Image key={image} className="h-52 w-full cursor-pointer object-cover transition-transform duration-300 hover:scale-105" src={image} alt="Food gallery item" width={360} height={260} />
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
