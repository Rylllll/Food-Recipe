"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface HeaderProps {
  solid?: boolean;
}

export default function Header({ solid = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const headerClass = solid || isScrolled ? "header-solid" : "bg-scroll";

  return (
    <>
      <div className={`fixed top-0 z-50 w-full ${headerClass}`}>
        <header className="container mx-auto flex h-20 w-full items-center px-4 md:p-0">
          <div className="container mx-auto flex items-center justify-between gap-8">
            <Logo />

            <nav className="hidden items-center gap-8 text-sm text-white lg:flex xl:flex">
              <Link className="transition hover:text-[#d45101]" href="/#Home">Home</Link>
              <Link className="transition hover:text-[#d45101]" href="/recipe">Recipes</Link>
              <Link className="transition hover:text-[#d45101]" href="/#Blogs">Blogs</Link>
              <Link className="transition hover:text-[#d45101]" href="/#Gallery">Gallery</Link>
            </nav>

            <div className="hidden w-full max-w-lg gap-2 lg:flex xl:flex">
              <SearchBox />
              <div className="mt-1 cursor-pointer">
                <span className="inline-block border-2 border-[#151515] bg-[#d45101] px-3 py-2.5 text-white shadow-md transition hover:border-[#d45101] hover:bg-[#151515]">♥</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            aria-label="Open menu"
            className="group flex cursor-pointer flex-col transition lg:hidden xl:hidden"
            onClick={() => setIsOpen(true)}
          >
            <span className="mt-1.5 h-0.5 w-7 bg-white group-hover:bg-[#d45101]" />
            <span className="mt-1.5 h-0.5 w-7 bg-white group-hover:bg-[#d45101]" />
            <span className="mt-1.5 h-0.5 w-7 bg-white group-hover:bg-[#d45101]" />
          </button>
        </header>
      </div>

      {isOpen && <MobileMenu onClose={() => setIsOpen(false)} />}
    </>
  );
}

function Logo() {
  return (
    <Link className="flex gap-1 transition hover:scale-105" href="/">
      <Image src="/img/logo.png" className="h-10 w-10" width={40} height={40} alt="RecipeCuisine logo" />
      <h1 className="mt-1 text-2xl font-semibold text-white md:text-3xl">RecipeCuisine</h1>
    </Link>
  );
}

function SearchBox() {
  const [query, setQuery] = useState("");

  const submitSearch = () => {
    const value = query.trim();
    if (value) {
      window.location.href = `/recipe?q=${encodeURIComponent(value)}`;
    }
  };

  return (
    <div className="relative mt-1 flex w-full items-center">
      <span className="absolute left-5 top-1/2 -translate-y-1/2">🍴</span>
      <input
        type="text"
        className="w-full px-12 py-2.5 text-xs focus:border-2 focus:border-[#d45101] focus:outline-none focus:ring-0"
        placeholder="Search recipes..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") submitSearch();
        }}
      />
      <button type="button" className="absolute right-1 bg-[#d45101] px-6 py-1 text-white transition hover:opacity-50" onClick={submitSearch}>
        ⌕
      </button>
    </div>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed left-0 top-0 z-[60] flex h-full w-full bg-[#151515]">
      <div className="container mx-auto flex w-full flex-col px-4">
        <header className="flex h-20 w-full items-center justify-between">
          <Logo />
          <button type="button" aria-label="Close menu" onClick={onClose}>
            <span className="text-3xl text-white transition hover:text-[#d45101]">×</span>
          </button>
        </header>

        <div className="mt-6 flex w-full gap-2 animate__animated animate__fadeInUp">
          <SearchBox />
          <div className="mt-1 cursor-pointer">
            <span className="inline-block border-2 border-[#151515] bg-[#d45101] px-3 py-2.5 text-white shadow-md">♥</span>
          </div>
        </div>

        <nav className="mt-8 inline-grid gap-6">
          <Link href="/" onClick={onClose} className="text-3xl text-gray-400 transition hover:text-white">Homepage</Link>
          <Link href="/recipe" onClick={onClose} className="text-3xl text-white transition hover:text-white">Recipes</Link>
          <Link href="/#Blogs" onClick={onClose} className="text-3xl text-gray-400 transition hover:text-white">Blogs</Link>
          <Link href="/#Gallery" onClick={onClose} className="text-3xl text-gray-400 transition hover:text-white">Gallery</Link>
        </nav>

        <div className="mt-16 grid gap-4 md:flex">
          <h2 className="text-white">Follow us</h2>
          <div className="flex gap-4 text-xl font-semibold text-white">
            <a href="https://www.facebook.com/reymark.boquiron" target="_blank" className="text-[#d45101] transition hover:text-white">f</a>
            <a href="https://www.instagram.com/rylllls/" target="_blank" className="text-[#d45101] transition hover:text-white">◎</a>
            <a href="https://www.linkedin.com/in/reymark-boquiron-b6b19b175/" target="_blank" className="text-[#d45101] transition hover:text-white">𝕏</a>
          </div>
        </div>
      </div>
    </div>
  );
}
