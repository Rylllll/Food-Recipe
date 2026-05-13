import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { Search, MoveRight, ExternalLink, Globe2, MapPin, PlaneTakeoff, Skull } from "lucide-react";
import { searchRecipes, extractId } from "../api/edamam";
import { LoadingScreen } from "../components/LoadingScreen";

export function Home() {
  const navigate = useNavigate();
  const [hitList, setHitList] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredRecipeImage, setHoveredRecipeImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 100]);
  const rotateLeft = useTransform(scrollY, [0, 500], [-12, -25]);
  const rotateRight = useTransform(scrollY, [0, 500], [8, 20]);

  useEffect(() => {
    let active = true;
    searchRecipes("traditional", { mealType: "Dinner" }).then(data => {
      if(active) {
        setHitList(data.recipes.slice(0, 5));
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, []);

  const handleBigSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/recipes?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSurprise = () => {
    const surpriseTerms = ["sushi", "tacos", "curry", "pasta", "pho", "paella", "tagine", "jerk chicken"];
    const randomTerm = surpriseTerms[Math.floor(Math.random() * surpriseTerms.length)];
    navigate(`/recipes?q=${encodeURIComponent(randomTerm)}`);
  };

  return (
    <div className="min-h-screen text-theme-text overflow-hidden bg-theme-bg flex flex-col">
      <LoadingScreen isVisible={loading} text="INITIALIZING RADAR..." />
      
      {/* 1. EXTREME EDITORIAL HERO SECTION */}
      <section className="relative w-full min-h-[70vh] flex flex-col items-center justify-center p-6 lg:p-8 overflow-hidden border-b-[6px] border-theme-border bg-[#FFBD12]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--text-color)_2px,transparent_2px)] bg-[size:24px_24px] opacity-[0.15] mix-blend-overlay"></div>
        
        <motion.div 
          animate={{ rotate: 360 }} 
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[120%] h-[120%] border-[100px] border-dashed border-black opacity-5 pointer-events-none rounded-full"
        />

        {/* Scattered Polaroids */}
        <motion.div 
          style={{ rotate: rotateLeft, y: heroY }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.1 }}
          className="hidden lg:block absolute left-[2%] top-[15%] w-[260px] xl:w-[300px] bg-theme-card p-4 border-[6px] border-theme-border shadow-[12px_12px_0_0_var(--border-color)] z-10"
        >
          <div className="w-full aspect-square border-4 border-theme-border overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" alt="indian food" />
            <div className="absolute top-0 right-0 bg-[#FF5C5C] text-black font-black uppercase px-3 py-1.5 text-sm xl:text-base border-b-4 border-l-4 border-black">India</div>
          </div>
          <div className="mt-3 flex justify-between items-end">
            <p className="font-black uppercase text-xl xl:text-2xl tracking-tighter leading-none">Spiced <br/> To Death.</p>
            <Skull className="w-8 h-8 stroke-[3] text-black" />
          </div>
        </motion.div>

        <motion.div 
          style={{ rotate: rotateRight, y: heroY }}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="hidden lg:block absolute right-[2%] top-[25%] w-[240px] xl:w-[280px] bg-theme-card p-4 border-[6px] border-theme-border shadow-[12px_12px_0_0_var(--border-color)] z-10"
        >
          <div className="w-full aspect-square border-4 border-theme-border overflow-hidden relative group">
            <img src="https://images.unsplash.com/photo-1553621042-f6e147245754?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600" className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110" alt="sushi" />
            <div className="absolute top-0 left-0 bg-[#1947E5] text-white font-black uppercase px-3 py-1.5 text-sm xl:text-base border-b-4 border-r-4 border-black">Japan</div>
          </div>
          <p className="mt-3 font-black uppercase text-xl xl:text-2xl tracking-tighter leading-none text-right">Precision <br/> Cuts.</p>
        </motion.div>

        {/* Central Hero Typography */}
        <div className="relative z-20 text-center flex flex-col items-center mt-8 pointer-events-none">
           <motion.div 
             initial={{ y: -30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             className="bg-black text-white px-6 py-3 border-4 border-theme-border uppercase font-black tracking-[0.2em] text-xs md:text-sm lg:text-base mb-6 flex items-center gap-3 shadow-[6px_6px_0_0_#fff]"
           >
             <PlaneTakeoff className="w-5 h-5 lg:w-6 lg:h-6 text-[#00C6AE]" /> Terminal 1
           </motion.div>
           
           <h1 className="text-[15vw] md:text-[120px] lg:text-[140px] font-black uppercase leading-[0.8] tracking-tighter text-black mix-blend-multiply drop-shadow-sm">
             Taste <br />
             <span className="text-white drop-shadow-[8px_8px_0_#000] mix-blend-normal relative inline-block group mt-2">
               Earth.
               <span className="absolute top-1/2 left-[-2%] right-[-2%] h-4 md:h-8 lg:h-10 bg-[#FF5C5C] border-[3px] border-black -translate-y-1/2 rotate-3 opacity-90 group-hover:-rotate-[3deg] transition-transform duration-500"></span>
             </span>
           </h1>
        </div>
      </section>

      {/* 2. SEARCH BAR */}
      <section className="w-full bg-theme-card border-b-[6px] border-theme-border relative z-30">
        <form onSubmit={handleBigSearch} className="flex flex-col lg:flex-row w-full h-full">
          <div className="flex-1 relative flex items-center">
             <Search className="absolute left-6 md:left-8 lg:left-10 w-8 h-8 md:w-10 md:h-10 text-theme-border opacity-50" />
             <input 
               type="text" 
               placeholder="SEARCH BY DISH OR COUNTRY..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="w-full bg-transparent text-theme-text pl-16 md:pl-24 lg:pl-28 pr-6 py-6 md:py-8 lg:py-10 text-xl md:text-3xl lg:text-4xl font-black uppercase placeholder:text-theme-border focus:outline-none placeholder:opacity-30 focus:bg-[#FFBD12] focus:text-black transition-colors"
             />
          </div>
          <button 
            type="submit" 
            className="w-full lg:w-[25%] bg-[#FF5C5C] text-black border-t-[6px] lg:border-t-0 lg:border-l-[6px] border-theme-border py-6 px-6 flex items-center justify-center gap-4 hover:bg-black hover:text-[#FF5C5C] transition-colors group"
          >
             <span className="text-2xl md:text-3xl lg:text-4xl font-black uppercase">FLY</span>
             <MoveRight className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 stroke-[3] group-hover:translate-x-3 transition-transform" />
          </button>
        </form>
      </section>

      {/* 3. TASTE BLOCKS */}
      <section className="grid grid-cols-2 md:grid-cols-4 w-full border-b-[6px] border-theme-border bg-theme-card">
         <Link to="/recipes?cuisine=Mexican" className="aspect-square border-r-4 border-b-4 md:border-b-0 border-theme-border bg-[#F95A2C] text-black flex flex-col items-center justify-center p-4 hover:scale-[0.98] transition-transform z-10 relative outline outline-4 outline-transparent hover:outline-black group">
           <MapPin className="w-8 h-8 lg:w-10 lg:h-10 mb-3 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all" />
           <span className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-1">Mexico</span>
         </Link>
         <Link to="/recipes?cuisine=Japanese" className="aspect-square border-r-4 border-b-4 md:border-b-0 border-theme-border bg-[#FF89BB] text-black flex flex-col items-center justify-center p-4 hover:scale-[0.98] transition-transform z-10 relative outline outline-4 outline-transparent hover:outline-black group">
           <MapPin className="w-8 h-8 lg:w-10 lg:h-10 mb-3 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all" />
           <span className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-1">Japan</span>
         </Link>
         <Link to="/recipes?cuisine=Italian" className="aspect-square border-r-4 border-theme-border bg-[#00C6AE] text-black flex flex-col items-center justify-center p-4 hover:scale-[0.98] transition-transform z-10 relative outline outline-4 outline-transparent hover:outline-black group">
           <MapPin className="w-8 h-8 lg:w-10 lg:h-10 mb-3 opacity-50 group-hover:opacity-100 group-hover:-translate-y-1 transition-all" />
           <span className="text-2xl md:text-3xl lg:text-4xl font-black uppercase tracking-tighter mb-1">Italy</span>
         </Link>
         <button onClick={handleSurprise} className="aspect-square bg-theme-bg text-theme-text flex flex-col items-center justify-center p-4 hover:bg-black hover:text-white transition-colors z-10 relative group border-t-4 md:border-t-0 border-theme-border">
           <Globe2 className="w-10 h-10 lg:w-12 lg:h-12 stroke-[2] mb-3 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
           <span className="text-xl md:text-2xl lg:text-3xl font-black uppercase tracking-tighter text-center">Spin <br/>The Globe</span>
         </button>
      </section>

      {/* 4. THE HIT LIST */}
      <section className="w-full flex flex-col lg:flex-row min-h-[500px] relative bg-theme-bg">
        
        <div className="w-full lg:w-[60%] flex flex-col border-r-[6px] border-theme-border relative z-10 bg-theme-bg">
          <div className="p-6 md:p-8 border-b-[6px] border-theme-border bg-theme-card">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter">Global Hits.</h2>
            <p className="font-bold text-base md:text-lg mt-3 max-w-md border-l-[3px] border-[#1947E5] pl-3">The most authentic, highly-rated traditional dishes pulled from around the planet.</p>
          </div>
          
          <div className="flex flex-col w-full">
            {hitList.map((recipe, idx) => {
              const id = extractId(recipe.uri);
              return (
                <Link 
                  to={`/recipe/${id}`} 
                  key={id}
                  onMouseEnter={() => setHoveredRecipeImage(recipe.image)}
                  onMouseLeave={() => setHoveredRecipeImage(null)}
                  className="flex items-center justify-between p-5 md:p-6 border-b-4 border-theme-border hover:bg-[#1947E5] hover:text-white transition-colors group cursor-pointer"
                >
                  <div className="flex items-center gap-4 md:gap-8">
                     <span className="text-xl md:text-3xl font-black opacity-30 group-hover:opacity-100 w-8 md:w-10">0{idx + 1}</span>
                     <div className="flex flex-col">
                       <h3 className="text-xl md:text-3xl font-black uppercase tracking-tighter line-clamp-1">{recipe.label}</h3>
                       <span className="font-bold text-xs md:text-sm opacity-80 uppercase tracking-widest mt-0.5">
                         {recipe.cuisineType?.[0] || 'International'}
                       </span>
                     </div>
                  </div>
                  <div className="flex items-center gap-4">
                     <ExternalLink className="w-6 h-6 md:w-8 md:h-8 stroke-[3] opacity-50 group-hover:opacity-100 group-hover:rotate-45 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="hidden lg:flex w-[40%] bg-theme-card p-8 lg:p-12 items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
             <Globe2 className="w-[120%] h-[120%] text-theme-border" />
          </div>
          
          {hoveredRecipeImage ? (
            <motion.div 
              key={hoveredRecipeImage}
              initial={{ scale: 0.8, opacity: 0, rotate: -3 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              className="w-full max-w-[400px] aspect-square border-[6px] border-theme-border shadow-[12px_12px_0_0_var(--border-color)] relative z-20 overflow-hidden bg-black"
            >
               <img src={hoveredRecipeImage} alt="Preview" className="w-full h-full object-cover" />
               <div className="absolute top-3 right-3 bg-[#FFBD12] text-black px-3 py-1.5 text-xs lg:text-sm font-black uppercase border-[3px] border-theme-border shadow-[3px_3px_0_0_#000] rotate-3">
                 Visa Approved
               </div>
            </motion.div>
          ) : (
             <div className="w-full max-w-[400px] aspect-square border-[6px] border-theme-border border-dashed flex flex-col items-center justify-center text-theme-border relative z-20 p-6">
                <Search className="w-16 h-16 mb-4 opacity-50" />
                <p className="font-black uppercase text-xl text-center opacity-50">Hover to preview destination.</p>
             </div>
          )}
        </div>

      </section>

    </div>
  );
}