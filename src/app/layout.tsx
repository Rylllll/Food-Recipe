import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Food Recipe | RecipeCuisine",
  description: "A Next.js and TypeScript recipe discovery application.",
  icons: {
    icon: "/img/logo.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans scrollbar-thin scrollbar-thumb-[#d45101]">{children}</body>
    </html>
  );
}
