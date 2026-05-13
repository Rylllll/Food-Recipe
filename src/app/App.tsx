import { type ReactNode } from "react";
import { motion } from "motion/react";
import { GlitchText } from "./components/glitch-text";
import { AsciiTitle } from "./components/ascii-title";
import { Scanlines } from "./components/scanlines";
import { SmoothScroll } from "./components/smooth-scroll";
import { WorkSlide } from "./components/work-slide";
import { TerminalGlitches } from "./components/terminal-glitches";

export default function App() {
  return (
    <div className="min-h-screen w-full bg-black text-white font-tronica relative">
      <SmoothScroll />
      <Scanlines />

      {/* HERO — full viewport, mirrors reference layout */}
      <section className="relative z-10 flex h-screen w-full flex-col p-6 overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.18) 0.5px, transparent 0.5px), linear-gradient(to bottom, rgba(255,255,255,0.18) 0.5px, transparent 0.5px)",
            backgroundSize: "8px 8px",
            maskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 90%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 40%, transparent 90%)",
          }}
        />
        <TerminalGlitches />
        {/* TOP BAR */}
        <div className="grid grid-cols-4 items-start text-[11px] uppercase tracking-widest">
          <div className="text-white">reymark</div>

          <nav className="flex flex-col gap-1">
            <a href="#works" className="hover:text-white/60 transition w-fit">
              <GlitchText>WORKS</GlitchText>
            </a>
            <a href="#about" className="hover:text-white/60 transition w-fit">
              <GlitchText>ABOUT</GlitchText>
            </a>
          </nav>

          <div className="flex flex-col gap-1 text-white/80">
            <a href="#" className="w-fit">
              <GlitchText>INSTAGRAM ↗</GlitchText>
            </a>
            <a href="#contact" className="w-fit">
              <GlitchText>INFO@REYMARK.MOV</GlitchText>
            </a>
          </div>

          <div className="flex flex-col items-end gap-1 text-right">
            <span>PRODUCTION STUDIO</span>
            <span>MANILA, PHILIPPINES</span>
          </div>
        </div>

        {/* CENTER ASCII WORDMARK */}
        <div className="flex flex-1 items-center justify-center">
          <AsciiTitle />
        </div>

        {/* BOTTOM ROW */}
        <div className="grid grid-cols-2 text-[11px] uppercase tracking-widest">
          <div className="flex flex-col gap-1">
            <span>FILM PRODUCTION.</span>
            <span>REIMAGINED.</span>
          </div>
          <div className="text-right text-white/80 leading-relaxed">
            REYMARK.MOV IS A HYBRID PRODUCTION COMPANY FUSING HIGH-END COMMERCIAL<br />
            WORK WITH A DRIVE TO EXPLORE THE UNCONVENTIONAL...
          </div>
        </div>
      </section>

      {/* SELECTED WORKS — fullscreen scroll */}
      <div id="works" className="relative z-10 border-t border-white/10">
        {WORKS.map((w, i) => (
          <WorkSlide key={w.title} index={i} total={WORKS.length} {...w} />
        ))}
      </div>

      {/* ABOUT */}
      <section id="about" className="relative z-10 border-t border-white/10 px-6 py-20">
        <Reveal>
          <div className="mb-8 text-[11px] uppercase tracking-widest text-white/50">
            &gt; cat about.txt
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="max-w-5xl text-3xl uppercase leading-[1.05] md:text-5xl">
            we shoot. we produce. we finish.<br />
            <span className="text-white/60">commercials made from passion._</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-4 text-[11px] uppercase tracking-widest">
          {SERVICES.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="border-t border-white/20 pt-3">
                <div className="mb-3 text-white/50">[{s.code}] {s.label}</div>
                <ul className="space-y-1 text-white/80 normal-case tracking-normal">
                  {s.items.map((it) => (
                    <li key={it}>&gt; {it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT / ASCII FOOTER */}
      <section id="contact" className="relative z-10 border-t border-white/10 px-6 pt-16 pb-6">
        <div className="flex justify-center">
          <AsciiTitle />
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 text-[10px] uppercase tracking-widest text-white/60">
          <div>
            <div>REYMARK.MOV STUDIO</div>
            <div className="text-white/40">MANILA / GLOBAL</div>
          </div>
          <div className="md:text-center">
            <div className="text-white/40">GET IN TOUCH_</div>
            <div className="text-white">INFO@REYMARK.MOV</div>
          </div>
          <div className="md:text-right">
            <div className="text-white/40">© 2026</div>
            <div>ALL RIGHTS RESERVED</div>
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-3 text-[10px] tracking-widest text-white/40">
          <span>&gt; END_OF_TRANSMISSION</span>
          <a href="#" className="hover:text-white">
            <GlitchText>↑ BACK_TO_TOP</GlitchText>
          </a>
        </div>
      </section>
    </div>
  );
}

const WORKS = [
  {
    title: "NIGHTOGRAPHY",
    client: "SAMSUNG",
    type: "COMMERCIAL",
    date: "2026",
  },
  {
    title: "KÄSY",
    client: "MCDONALDS",
    type: "COMMERCIAL",
    date: "2025",
  },
  {
    title: "ECHO/CHAMBER",
    client: "SONY",
    type: "MUSIC VIDEO",
    date: "2025",
  },
  {
    title: "AFTERGLOW",
    client: "NIKE",
    type: "BRAND FILM",
    date: "2024",
  },
];

function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15%" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const SERVICES = [
  {
    code: "01",
    label: "CREATIVE DIRECTION",
    items: ["Concept Development", "Creative Consulting", "Talent Curation", "Visual Direction"],
  },
  {
    code: "02",
    label: "PRODUCTION",
    items: ["International Production", "Cross-border Production", "Scalable Crew", "End-to-end Management"],
  },
  {
    code: "03",
    label: "POST",
    items: ["Editorial & Offline", "Color & Online", "VFX & Compositing", "Sound Design"],
  },
  {
    code: "04",
    label: "HYBRID APPROACH",
    items: ["Full 4D Hybrid Models", "Continuous Workflow", "Integration Strategy", "AI & Rights Advisory"],
  },
];
