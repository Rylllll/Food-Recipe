import { useEffect, useRef, useState } from "react";

const TEXT = "reymark";
const DENSITY = " .:-=+*#%@";

export function AsciiTitle() {
  const cols = 130;
  const rows = 18;
  const [grid, setGrid] = useState<string[][]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });
  const baseRef = useRef<Float32Array | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = cols;
    canvas.height = rows;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, cols, rows);
    ctx.fillStyle = "#fff";
    ctx.font = "900 16px monospace";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(TEXT, cols / 2, rows / 2);
    const img = ctx.getImageData(0, 0, cols, rows).data;

    const base = new Float32Array(cols * rows);
    for (let i = 0; i < cols * rows; i++) base[i] = img[i * 4] / 255;
    baseRef.current = base;

    let raf: number;
    const render = () => {
      const { x: cx, y: cy, active } = cursorRef.current;
      const next: string[][] = [];
      for (let y = 0; y < rows; y++) {
        const row: string[] = [];
        for (let x = 0; x < cols; x++) {
          let v = base[y * cols + x];
          if (active) {
            const dx = x - cx;
            const dy = (y - cy) * 2.2;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 12;
            if (dist < radius) {
              const force = 1 - dist / radius;
              if (Math.random() < force * 0.95) v = Math.random() > 0.5 ? 1 : 0;
            }
          }
          if (v > 0.35) {
            row.push(Math.random() > 0.04 ? "•" : " ");
          } else {
            row.push(Math.random() > 0.992 ? "·" : " ");
          }
        }
        next.push(row);
      }
      setGrid(next);
      raf = window.setTimeout(render, 70) as unknown as number;
    };
    render();
    return () => clearTimeout(raf);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    cursorRef.current = { x: px * cols, y: py * rows, active: true };
  };
  const onLeave = () => {
    cursorRef.current = { x: -999, y: -999, active: false };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="w-full"
    >
      <pre className="text-[11px] leading-[10px] md:text-[14px] md:leading-[12px] text-white select-none whitespace-pre text-center tracking-tighter">
        {grid.map((row, i) => (
          <div key={i}>{row.join("")}</div>
        ))}
      </pre>
    </div>
  );
}
