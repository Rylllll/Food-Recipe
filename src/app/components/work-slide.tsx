import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { GlitchText } from "./glitch-text";

export function WorkSlide({
  index,
  total,
  title,
  client,
  type,
  date,
}: {
  index: number;
  total: number;
  title: string;
  client: string;
  type: string;
  date: string;
}) {
  return (
    <div
      style={{ position: "relative" }}
      className="h-screen w-full snap-start overflow-hidden font-tronica text-white"
    >
      {/* BG */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        <AsciiVideo seed={index} />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />

      {/* TOP BAR */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute inset-x-0 top-0 z-10 grid grid-cols-4 items-start p-6 text-[11px] uppercase tracking-widest"
      >
        <div>reymark</div>
        <nav className="flex flex-col gap-1">
          <a href="#works" className="w-fit"><GlitchText>WORKS</GlitchText></a>
          <a href="#about" className="w-fit"><GlitchText>ABOUT</GlitchText></a>
        </nav>
        <div className="flex flex-col gap-1 text-white/80">
          <a href="#" className="w-fit"><GlitchText>INSTAGRAM ↗</GlitchText></a>
          <a href="#contact" className="w-fit"><GlitchText>INFO@REYMARK.MOV</GlitchText></a>
        </div>
        <div className="flex flex-col items-end gap-1 text-right">
          <span>PRODUCTION STUDIO</span>
          <span>MANILA, PHILIPPINES</span>
        </div>
      </motion.div>

      {/* MIDDLE ROW */}
      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-6 text-[11px] uppercase tracking-widest text-white/80">
        <span>◉ SELECTED WORKS</span>
        <span className="text-white/60 absolute left-1/2 -translate-x-1/2">
          /{String(index + 1).padStart(2, "0")}
        </span>
        <span>/ {String(total).padStart(2, "0")}</span>
      </div>

      {/* BOTTOM */}
      <div className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-2 items-end gap-6 p-6 md:p-8">
        <motion.h2
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="uppercase leading-[0.9] text-5xl md:text-7xl tracking-tight"
        >
          <GlitchText trigger="auto">{title}</GlitchText>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-3 gap-4 text-[11px] uppercase tracking-widest"
        >
          <div>
            <div className="text-white/40">CLIENTS</div>
            <div>{client}</div>
          </div>
          <div>
            <div className="text-white/40">TYPE</div>
            <div>{type}</div>
          </div>
          <div>
            <div className="text-white/40">DATE</div>
            <div>{date}</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AsciiVideo({ seed }: { seed: number }) {
  const [grid, setGrid] = useState<string>("");
  useEffect(() => {
    const cols = 180;
    const rows = 70;
    const chars = " ░▒▓█.:*+=#@";
    let raf: number;
    let frame = 0;
    const render = () => {
      frame++;
      let out = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const n =
            Math.sin((x + seed * 50 + frame * 0.5) * 0.08) +
            Math.cos((y + frame * 0.3) * 0.12) +
            Math.sin((x * y + frame) * 0.002) +
            Math.random() * 0.4;
          const idx = Math.max(0, Math.min(chars.length - 1, Math.floor((n + 2.5) * 2)));
          out += chars[idx];
        }
        out += "\n";
      }
      setGrid(out);
      raf = window.setTimeout(render, 90) as unknown as number;
    };
    render();
    return () => clearTimeout(raf);
  }, [seed]);
  return (
    <pre className="absolute inset-0 m-0 h-full w-full overflow-hidden p-0 text-[10px] leading-[10px] text-white/70 select-none">
      {grid}
    </pre>
  );
}
