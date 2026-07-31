import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { PERF } from "@/lib/perf";
import { cn } from "@/utils/cn";

/* ---------------- Scroll reveal ---------------- */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  once?: boolean;
}) {
  // No blur filter on mobile — it's the #1 GPU cost during scroll.
  const initial = PERF.lite ? { opacity: 0, y } : { opacity: 0, y, filter: "blur(6px)" };
  const animate = PERF.lite ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, filter: "blur(0px)" };
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: PERF.lite ? 0.5 : 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------- Word-by-word headline ---------------- */
export function SplitText({
  text,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const words = text.split(" ");
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        transition={{ staggerChildren: 0.045, delayChildren: delay }}
        className="inline"
      >
        {words.map((w, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "108%", opacity: 0 },
                show: { y: "0%", opacity: 1 },
              }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {w}
              {i < words.length - 1 ? "\u00A0" : ""}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ---------------- Animated counter ---------------- */
export function Counter({
  to,
  suffix = "",
  prefix = "",
  duration = 1900,
  className,
}: {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    // On low-power devices just snap to the final value — RAF loops per counter
    // add up fast (there are ~30 counters on the page).
    if (PERF.lite) {
      setVal(to);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setVal(to * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  const display = to % 1 === 0 ? Math.round(val).toLocaleString() : val.toFixed(1);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/* ---------------- Section eyebrow ---------------- */
export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border px-4 py-1.5 text-[11px] font-semibold tracking-[0.22em] uppercase",
        dark
          ? "border-white/12 bg-white/5 text-ember-300 backdrop-blur-md"
          : "border-ink-200/70 bg-white/70 text-ink-600 backdrop-blur-md",
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-500 opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-500" />
      </span>
      {children}
    </div>
  );
}

/* ---------------- Buttons ---------------- */
export function PrimaryButton({
  children,
  href = "#contact",
  className,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-ember transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-0",
        className,
      )}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-ember-600 via-ember-500 to-flame-500 anim-pan" />
      <span className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-r from-flame-500 via-ember-500 to-ember-400" />
      <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/25 blur-md sweep" />
      <span className="relative z-10 flex items-center gap-2.5">{children}</span>
    </a>
  );
}

export function GhostButton({
  children,
  href = "#services",
  dark = false,
  className,
}: {
  children: ReactNode;
  href?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2.5 rounded-full border px-7 py-3.5 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5",
        dark
          ? "border-white/18 bg-white/5 text-white backdrop-blur-md hover:border-white/40 hover:bg-white/10"
          : "border-ink-200 bg-white/60 text-ink-800 backdrop-blur-md hover:border-ink-900/30 hover:bg-white",
        className,
      )}
    >
      {children}
    </a>
  );
}

/* ---------------- Parallax helper ---------------- */
export function useParallax(range = 80): [React.RefObject<HTMLDivElement | null>, MotionValue<number>] {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const smooth = useSpring(y, { stiffness: 120, damping: 24, mass: 0.4 });
  return [ref, smooth];
}

/* ---------------- 3D tilt card (desktop only) ---------------- */
export function Tilt({
  children,
  className,
  strength = 8,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 200, damping: 20 });
  const sry = useSpring(ry, { stiffness: 200, damping: 20 });

  if (PERF.touch || PERF.lite) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        ry.set(px * strength * 2);
        rx.set(-py * strength * 2);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
