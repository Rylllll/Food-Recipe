import { useEffect, useState } from "react";

const SYMS = "!@#$%^&*()_+-=[]{};:<>?/\\|~`";
const HEX = "0123456789ABCDEF";

function makeSnippet() {
  const kind = Math.floor(Math.random() * 6);
  const len = 4 + Math.floor(Math.random() * 8);
  let s = "";
  switch (kind) {
    case 0:
      s = "0x";
      for (let i = 0; i < len; i++) s += HEX[Math.floor(Math.random() * 16)];
      return s;
    case 1:
      for (let i = 0; i < len; i++) s += Math.floor(Math.random() * 10);
      return s;
    case 2:
      for (let i = 0; i < len; i++) s += SYMS[Math.floor(Math.random() * SYMS.length)];
      return s;
    case 3:
      for (let i = 0; i < len; i++)
        s += Math.random() > 0.5 ? Math.floor(Math.random() * 10) : SYMS[Math.floor(Math.random() * SYMS.length)];
      return s;
    case 4:
      return `${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}.${Math.floor(Math.random() * 999)}`;
    default:
      return `${Math.floor(Math.random() * 100)}%//${Math.floor(Math.random() * 9999)}`;
  }
}

const CHARS = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%&";

type Glitch = {
  id: number;
  text: string;
  top: number;
  left: number;
  scrambled: string;
  life: number;
};

export function TerminalGlitches() {
  const [items, setItems] = useState<Glitch[]>([]);

  useEffect(() => {
    let nextId = 0;
    const spawn = () => {
      const text = makeSnippet();
      const g: Glitch = {
        id: nextId++,
        text,
        top: 8 + Math.random() * 84,
        left: 4 + Math.random() * 92,
        scrambled: text,
        life: 900 + Math.random() * 1800,
      };
      setItems((prev) => [...prev.slice(-14), g]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== g.id));
      }, g.life);
    };

    const spawnId = setInterval(spawn, 350);

    const scrambleId = setInterval(() => {
      setItems((prev) =>
        prev.map((g) => {
          if (Math.random() > 0.6) {
            const arr = g.text.split("").map((ch) =>
              ch === " " ? " " : Math.random() > 0.7 ? CHARS[Math.floor(Math.random() * CHARS.length)] : ch
            );
            return { ...g, scrambled: arr.join("") };
          }
          return { ...g, scrambled: g.text };
        })
      );
    }, 90);

    return () => {
      clearInterval(spawnId);
      clearInterval(scrambleId);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
      {items.map((g) => (
        <span
          key={g.id}
          className="absolute text-[10px] uppercase tracking-widest text-white/50 font-tronica"
          style={{
            top: `${g.top}%`,
            left: `${g.left}%`,
            textShadow: "0 0 6px rgba(255,255,255,0.4)",
            animation: "glitchFade 0.6s ease-out",
          }}
        >
          {g.scrambled}
        </span>
      ))}
      <style>{`
        @keyframes glitchFade {
          0% { opacity: 0; transform: translate(-2px, 0); }
          20% { opacity: 1; }
          40% { transform: translate(2px, 1px); }
          60% { transform: translate(-1px, -1px); }
          100% { opacity: 0.7; transform: translate(0,0); }
        }
      `}</style>
    </div>
  );
}
