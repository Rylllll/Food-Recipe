import { motion, useAnimationControls } from "motion/react";
import { useRef } from "react";

export function AnimatedLetter({ char }: { char: string }) {
  const controls = useAnimationControls();
  const animating = useRef(false);

  const handleHover = async () => {
    if (animating.current) return;
    animating.current = true;
    await controls.start({
      x: "110%",
      opacity: 0,
      transition: { duration: 0.25, ease: "easeIn" },
    });
    await controls.set({ x: "-110%", opacity: 0 });
    await controls.start({
      x: "0%",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    });
    animating.current = false;
  };

  if (char === " ") return <span className="inline-block">&nbsp;&nbsp;</span>;

  return (
    <span
      className="inline-block overflow-hidden align-baseline"
      onMouseEnter={handleHover}
    >
      <motion.span
        className="inline-block"
        animate={controls}
        initial={{ x: "0%", opacity: 1 }}
      >
        {char}
      </motion.span>
    </span>
  );
}
