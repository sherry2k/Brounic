import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { PERF } from "@/lib/perf";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.35 });
  const [hot, setHot] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // No custom cursor on touch, reduced motion, or low-power devices.
    if (PERF.lite || PERF.touch) return;
    if (window.matchMedia("(pointer: fine)").matches) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement | null;
      setHot(!!t?.closest("a,button,[data-cursor='hot'],input,textarea,select"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[150] hidden md:block"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      >
        <motion.div
          animate={{ width: hot ? 46 : 26, height: hot ? 46 : 26, opacity: hot ? 1 : 0.55 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          className="rounded-full border border-ember-500/70"
          style={{ boxShadow: hot ? "0 0 22px rgba(244,122,32,0.45)" : "none" }}
        />
      </motion.div>
      <motion.div
        className="pointer-events-none fixed z-[151] hidden h-1.5 w-1.5 rounded-full bg-ember-500 md:block"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
