import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-24 bg-[#151515] py-12 text-white">
      <div className="container mx-auto grid gap-10 px-4 md:grid-cols-4 md:px-0">
        <div className="md:col-span-1">
          <Link className="flex gap-1 transition hover:scale-105" href="/">
            <Image src="/img/logo.png" className="h-10 w-10" width={40} height={40} alt="RecipeCuisine logo" />
            <h2 className="mt-1 text-3xl font-semibold">RecipeCuisine</h2>
          </Link>
          <p className="mt-4 text-sm text-gray-300">A modern recipe discovery experience for home cooks who want flavorful meals, clear steps, and visual inspiration.</p>
        </div>

        <FooterColumn title="Quick Links" links={[{"label":"Home","href":"/"},{"label":"Recipes","href":"/recipe"},{"label":"Blogs","href":"/#Blogs"},{"label":"Gallery","href":"/#Gallery"}]} />
        <FooterColumn title="Cuisines" links={[{"label":"Italian","href":"/recipe?q=Italian"},{"label":"Mexican","href":"/recipe?q=Mexican"},{"label":"Indian","href":"/recipe?q=Indian"},{"label":"Japanese","href":"/recipe?q=Japanese"}]} />

        <div>
          <h3 className="font-semibold text-[#d45101]">Follow us</h3>
          <div className="mt-4 flex gap-4 text-xl">
            <a href="https://www.facebook.com/reymark.boquiron" target="_blank" className="transition hover:text-[#d45101]">f</a>
            <a href="https://www.instagram.com/rylllls/" target="_blank" className="transition hover:text-[#d45101]">◎</a>
            <a href="https://www.linkedin.com/in/reymark-boquiron-b6b19b175/" target="_blank" className="transition hover:text-[#d45101]">𝕏</a>
          </div>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-gray-400">© {new Date().getFullYear()} RecipeCuisine. All rights reserved.</p>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-semibold text-[#d45101]">{title}</h3>
      <div className="mt-4 grid gap-2 text-sm text-gray-300">
        {links.map((link) => (
          <Link key={link.href + link.label} href={link.href} className="transition hover:text-white">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
