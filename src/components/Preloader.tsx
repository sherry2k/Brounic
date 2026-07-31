import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { LogoMark } from "./Logo";
import { BRAND } from "@/data/content";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const dur = 1700;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setProgress(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => {
          setGone(true);
          onDone();
        }, 260);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-ink-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
        >
          <div className="absolute inset-0 grid-lines-dark opacity-40" />
          <div
            className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-[90px]"
            style={{ background: "radial-gradient(circle, rgba(244,122,32,0.55), transparent 68%)" }}
          />
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="anim-ember absolute bottom-[38%] h-1 w-1 rounded-full bg-ember-400"
              style={{
                left: `${20 + i * 4.4}%`,
                ["--dur" as string]: `${3.4 + (i % 5) * 0.7}s`,
                ["--dx" as string]: `${(i % 3) * 14 - 14}px`,
                animationDelay: `${i * 0.24}s`,
              }}
            />
          ))}

          <div className="relative flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.86, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <LogoMark className="h-16 w-16 text-white/80" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.7 }}
              className="mt-6 font-display text-lg font-extrabold tracking-[0.16em] text-white"
            >
              {BRAND.name.split(" ")[0]}{" "}
              <span className="text-ember-500">{BRAND.name.split(" ").slice(1).join(" ")}</span>
            </motion.div>
            <div className="mt-2 text-[9.5px] font-semibold tracking-[0.46em] text-white/35">
              {BRAND.tagline}
            </div>

            <div className="relative mt-9 h-px w-56 overflow-hidden bg-white/12">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-ember-500 to-flame-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-3 font-display text-[11px] tabular-nums tracking-[0.3em] text-white/40">
              {String(progress).padStart(3, "0")}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
