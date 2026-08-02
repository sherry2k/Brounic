import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { HERO_STATS, IMG } from "@/data/content";
import { Counter } from "@/lib/ui";
import { PERF } from "@/lib/perf";
import { ArrowRight, SystemIcon } from "./Icons";

const FLOATERS = [
  { key: "sprinkler", label: "Sprinklers", top: "20%", left: "6%", depth: 34, delay: 0 },
  { key: "alarm", label: "Detection", top: "62%", left: "10%", depth: 22, delay: 0.9 },
  { key: "pump", label: "Fire Pumps", top: "26%", left: "86%", depth: 30, delay: 0.45 },
  { key: "suppression", label: "Suppression", top: "68%", left: "88%", depth: 18, delay: 1.4 },
  { key: "pava", label: "PA / VA", top: "45%", left: "93%", depth: 26, delay: 2.1 },
];

type FloaterDef = (typeof FLOATERS)[number];

function Floater({ f, mx, my }: { f: FloaterDef; mx: MotionValue<number>; my: MotionValue<number> }) {
  const x = useTransform(mx, (v) => v * -f.depth);
  const y = useTransform(my, (v) => v * -f.depth);
  return (
    <motion.div
      className="pointer-events-none absolute hidden lg:block"
      style={{ top: f.top, left: f.left, x, y }}
    >
      <motion.div
        className="anim-float glass-dark flex items-center gap-2.5 rounded-2xl px-3.5 py-2.5"
        style={{ animationDelay: `${f.delay}s` }}
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 + f.delay * 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-ember-500/15 text-ember-400">
          <SystemIcon name={f.key} className="h-[18px] w-[18px]" />
        </span>
        <span className="text-[11px] font-semibold tracking-wide text-white/70">{f.label}</span>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string | undefined>();

  // Progressive enhancement: only stream the cinematic layer on capable devices.
  useEffect(() => {
    if (PERF.lite) return;
    const t = setTimeout(() => setVideoSrc(IMG.heroVideo), 1400);
    return () => clearTimeout(t);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });

  useEffect(() => {
    if (PERF.touch || PERF.reduced) return; // no mouse-parallax on touch devices
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <section
      id="top"
      ref={ref}
      className="noise relative flex min-h-[100svh] items-center overflow-hidden bg-ink-950 pt-28 pb-14"
    >
      {/* ---- Background layers ---- */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div
          className={`absolute inset-[-8%] bg-cover bg-center opacity-45 ${PERF.mobile ? "" : "anim-drift"}`}
          style={{ backgroundImage: `url(${IMG.heroPoster})` }}
        />
        {videoSrc && (
          <video
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1600ms]"
            style={{ opacity: videoReady ? 0.32 : 0 }}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            aria-hidden
          />
        )}
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-ink-950/92 via-ink-950/78 to-ink-950" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_28%_38%,rgba(244,122,32,0.24),transparent_58%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_78%_78%,rgba(232,50,31,0.18),transparent_55%)]" />
      <div className="absolute inset-0 grid-lines-dark opacity-55" />

      {/* Emergency light sweep */}
      <motion.div
        className="absolute -top-1/4 left-1/2 h-[150%] w-[38vw] -translate-x-1/2 bg-[linear-gradient(180deg,rgba(232,50,31,0.16),transparent_70%)] blur-3xl"
        animate={{ opacity: [0.25, 0.75, 0.25], rotate: [-9, 9, -9] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Embers */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: PERF.mobile ? 10 : 26 }).map((_, i) => (
          <span
            key={i}
            className="anim-ember absolute bottom-0 rounded-full bg-ember-400"
            style={{
              left: `${(i * 3.9 + (i % 4) * 5) % 100}%`,
              height: i % 5 === 0 ? 3 : 2,
              width: i % 5 === 0 ? 3 : 2,
              opacity: 0.75,
              boxShadow: "0 0 10px rgba(255,154,63,0.9)",
              ["--dur" as string]: `${5 + (i % 6) * 1.3}s`,
              ["--dx" as string]: `${((i % 5) - 2) * 26}px`,
              animationDelay: `${(i % 9) * 0.85}s`,
            }}
          />
        ))}
      </div>

      {/* Floating system tiles */}
      {FLOATERS.map((f) => (
        <Floater key={f.key} f={f} mx={smx} my={smy} />
      ))}

      {/* ---- Content ---- */}
      <motion.div className="container-x relative z-10" style={{ y: contentY, opacity: fade }}>
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-white/70 uppercase backdrop-blur-md"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-500 opacity-80" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-500" />
            </span>
            Abu Dhabi · UAE — Established 2011
          </motion.div>

           <h1 className="mt-7 font-display font-extrabold tracking-[-0.035em] text-white">
            {/* Line 1 — company name, largest */}
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span
                className="block whitespace-nowrap text-[clamp(2.25rem,7.1vw,5.4rem)] leading-[1.12]"
                initial={{ y: "112%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.28, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                Brounic <span className="text-gradient-ember">Group</span>
              </motion.span>
            </span>

            {/* Lines 2-5 — tagline, middle size */}
            {["Protecting Lives,", "Property & Businesses", "Through Intelligent", "Fire Protection."].map(
              (line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block text-[1.7rem] leading-[1.12] sm:text-4xl lg:text-[2.9rem]"
                    initial={{ y: "112%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.4 + i * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {i === 3 ? <span className="text-ember-400">{line}</span> : <span className="text-white/85">{line}</span>}
                  </motion.span>
                </span>
              ),
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85, duration: 0.9 }}
            className="mt-7 max-w-2xl text-[15px] leading-relaxed text-white/60 sm:text-lg"
          >
            End-to-end fire protection engineering for the UAE's most demanding environments — delivered to
            NFPA Standards and Civil Defence compliance.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.98, duration: 0.9 }}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11.5px] font-semibold tracking-[0.16em] text-white/45 uppercase"
          >
            {["Design", "Supply", "Installation", "Testing", "Commissioning", "Maintenance"].map((s, i) => (
              <span key={s} className="flex items-center gap-3">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-ember-500/70" />}
                {s}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full px-7 py-4 text-sm font-semibold text-white shadow-ember transition-transform duration-300 hover:-translate-y-0.5"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-ember-600 via-ember-500 to-flame-500 anim-pan" />
              <span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 bg-white/25 blur-md sweep" />
              <span className="relative z-10 flex items-center gap-2.5">
                Get Free Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/18 bg-white/6 px-7 py-4 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/12"
            >
              Request a Quote
            </a>
            <a
              href="#services"
              className="group inline-flex items-center gap-2 px-3 py-4 text-sm font-semibold text-white/60 transition-colors hover:text-white"
            >
              Explore Services
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/18 transition-all group-hover:border-ember-500 group-hover:bg-ember-500/15">
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </a>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.28, duration: 1 }}
          className="mt-16 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/8 backdrop-blur-xl lg:grid-cols-4"
        >
          {HERO_STATS.map((s) => (
            <div key={s.label} className="group relative bg-ink-950/45 px-6 py-7 transition-colors hover:bg-ink-900/60">
              <div className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="mt-1.5 text-[11px] font-semibold tracking-[0.16em] text-white/40 uppercase">
                {s.label}
              </div>
              <span className="absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-ember-500 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.a
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="text-[9.5px] font-semibold tracking-[0.36em] text-white/35 uppercase">Scroll</span>
        <span className="relative h-10 w-px overflow-hidden bg-white/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-ember-500 to-transparent"
            animate={{ y: [-16, 40] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.a>
    </section>
  );
}
