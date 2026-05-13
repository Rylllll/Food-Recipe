import { useEffect, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@$%&";

export function GlitchText({
  children,
  className = "",
  trigger = "hover",
  duration = 600,
}: {
  children: string;
  className?: string;
  trigger?: "hover" | "auto";
  duration?: number;
}) {
  const [display, setDisplay] = useState(children);
  const frameRef = useRef<number | null>(null);
  const startRef = useRef(0);

  const run = () => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    startRef.current = performance.now();
    const target = children;
    const tick = (now: number) => {
      const elapsed = now - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const reveal = Math.floor(progress * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        if (i < reveal) out += target[i];
        else if (target[i] === " ") out += " ";
        else out += CHARS[Math.floor(Math.random() * CHARS.length)];
      }
      setDisplay(out);
      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
      else setDisplay(target);
    };
    frameRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    setDisplay(children);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [children]);

  if (trigger === "auto") {
    return (
      <span className={className} style={{ fontFamily: "inherit" }}>
        {display}
      </span>
    );
  }

  return (
    <span
      className={`inline-block transition-colors hover:bg-white hover:text-black px-1 -mx-1 ${className}`}
    >
      {children.split("").map((ch, i) => (
        <PerLetter key={i} char={ch} />
      ))}
    </span>
  );
}

function PerLetter({ char }: { char: string }) {
  const [c, setC] = useState(char);
  const raf = useRef<number | null>(null);

  if (char === " ") return <span>&nbsp;</span>;

  const run = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 350, 1);
      if (p < 1) {
        setC(CHARS[Math.floor(Math.random() * CHARS.length)]);
        raf.current = requestAnimationFrame(tick);
      } else {
        setC(char);
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  return (
    <span
      onMouseEnter={run}
      className="inline-block cursor-pointer transition-colors hover:bg-white hover:text-black"
    >
      {c}
    </span>
  );
}
