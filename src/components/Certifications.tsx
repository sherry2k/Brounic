import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CERTS } from "@/data/content";
import { Eyebrow, Reveal, SplitText } from "@/lib/ui";
import { PERF, anim } from "@/lib/perf";
import { ArrowRight, Check } from "./Icons";
import { LogoMark } from "./Logo";
import { cn } from "@/utils/cn";

function CertDocument({ index }: { index: number }) {
  const c = CERTS[index];

  if (c.image) {
    return (
      <img
        src={c.image}
        alt={`${c.code} certificate`}
        className="max-h-[70vh] w-full rounded-xl object-contain"
      />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#FDFBF7] p-8 sm:p-12">
      {/* ornamental frame */}
      <div className="pointer-events-none absolute inset-3 rounded-lg border-2 border-ink-900/80" />
      <div className="pointer-events-none absolute inset-4 rounded-md border border-ember-500/60" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #F47A20 0 1px, transparent 1px 14px)" }} />
      {/* corner flourishes */}
      {["left-5 top-5", "right-5 top-5 rotate-90", "right-5 bottom-5 rotate-180", "left-5 bottom-5 -rotate-90"].map((pos) => (
        <svg key={pos} className={`absolute h-7 w-7 text-ember-600 ${pos}`} viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M2 26V10C2 5 5 2 10 2h16" />
          <path d="M7 26V13c0-3.5 2.5-6 6-6h13" opacity="0.5" />
        </svg>
      ))}

      <div className="relative flex flex-col items-center text-center">
        <LogoMark className="h-12 w-12 text-ink-900" />
        <div className="mt-2 font-display text-lg font-extrabold tracking-[0.08em] text-ink-900">
          BROUNIC <span className="text-ember-600">GROUP</span>
        </div>
        <div className="text-[8px] font-bold tracking-[0.5em] text-ink-400 uppercase">Fire &amp; Safety</div>

        <div className="mt-8 flex items-center gap-3">
          <span className="h-px w-12 bg-ember-500" />
          <span className="text-[10px] font-bold tracking-[0.34em] text-ember-600 uppercase">Certificate of Approval</span>
          <span className="h-px w-12 bg-ember-500" />
        </div>

        <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-ink-900 sm:text-[28px]">
          {c.code}
        </h3>
        <p className="mt-1 text-[13px] font-medium text-ink-500">{c.name}</p>

        <p className="mt-6 max-w-md text-[12.5px] leading-relaxed text-ink-500">
          This document certifies that <strong className="font-semibold text-ink-800">Brounic Group Fire &amp; Safety</strong>{" "}
          has been assessed and approved by <strong className="font-semibold text-ink-800">{c.issuer}</strong>.
        </p>
        <p className="mt-3 max-w-md text-[11.5px] italic leading-relaxed text-ink-400">{c.scope}</p>

        <div className="mt-8 grid w-full max-w-md grid-cols-3 gap-4 border-t border-ink-200 pt-5">
          <div>
            <div className="text-[8.5px] font-bold tracking-[0.2em] text-ink-400 uppercase">Certificate No.</div>
            <div className="mt-1 font-display text-[11.5px] font-bold text-ink-800">{c.no}</div>
          </div>
          <div>
            <div className="text-[8.5px] font-bold tracking-[0.2em] text-ink-400 uppercase">Status</div>
            <div className="mt-1 font-display text-[11.5px] font-bold text-ember-600">{c.valid}</div>
          </div>
          <div>
            <div className="text-[8.5px] font-bold tracking-[0.2em] text-ink-400 uppercase">Issued By</div>
            <div className="mt-1 font-display text-[11.5px] font-bold text-ink-800">{c.issuer}</div>
          </div>
        </div>

        <div className="mt-8 flex w-full max-w-md items-end justify-between">
          <div className="text-left">
            <svg className="h-8 w-28 text-ink-700" viewBox="0 0 120 32" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
              <path d="M4 24c10-14 16-16 18-8s-4 14 2 8 10-18 14-10-2 16 4 10 8-14 12-8-2 12 4 8 10-12 14-6 8 6 18-2" opacity="0.8" />
            </svg>
            <div className="mt-1 h-px w-28 bg-ink-300" />
            <div className="mt-1.5 text-[9px] font-bold tracking-[0.16em] text-ink-500 uppercase">General Manager</div>
          </div>

          {/* seal */}
          <div className="relative h-24 w-24 shrink-0">
            <svg viewBox="0 0 96 96" className="h-24 w-24">
              <defs>
                <linearGradient id="seal-g" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FF9A3F" />
                  <stop offset="100%" stopColor="#E8321F" />
                </linearGradient>
              </defs>
              {Array.from({ length: 24 }).map((_, i) => (
                <rect key={i} x="46.5" y="2" width="3" height="10" rx="1.5" fill="url(#seal-g)" transform={`rotate(${i * 15} 48 48)`} />
              ))}
              <circle cx="48" cy="48" r="34" fill="url(#seal-g)" />
              <circle cx="48" cy="48" r="28" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="2 3" />
              <path d="M38 48l7 7 14-15" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg className="absolute -bottom-3 left-1/2 h-8 w-14 -translate-x-1/2" viewBox="0 0 56 32" fill="url(#seal-g)">
              <path d="M10 0h12l-2 26-8-8-8 8z" />
              <path d="M34 0h12l6 26-8-8-8 8z" opacity="0.85" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const raw = useTransform(scrollYProgress, [0, 1], ["2%", "-80%"]);
  const x = useSpring(raw, { stiffness: 90, damping: 26, mass: 0.4 });
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: number) => setOpen((v) => (v === null ? v : (v + d + CERTS.length) % CERTS.length)),
    [],
  );

  useEffect(() => {
    if (open === null) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, close, step]);

  const useScrollRail = !PERF.lite;

  return (
    <section id="certifications" className="relative bg-ink-50/70">
      <div ref={ref} className={cn("relative", useScrollRail ? "h-[320vh]" : "py-24")}>
        <div className={cn("flex flex-col justify-center overflow-hidden", useScrollRail ? "sticky top-0 h-screen" : "")}>
          <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
          <div className="pointer-events-none absolute -right-40 top-1/4 h-[520px] w-[520px] rounded-full bg-ember-500/10 blur-[140px]" />

          <div className="container-x relative">
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <Reveal>
                  <Eyebrow>Accreditation</Eyebrow>
                </Reveal>
                <SplitText
                  as="h2"
                  text="Verified, approved, audited."
                  className="mt-5 font-display text-[2rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-5xl"
                />
              </div>
              <Reveal delay={0.12}>
                <p className="max-w-sm text-sm leading-relaxed text-ink-500">
                  Select any credential to inspect the full certificate. Registrations renewed and audited —
                  available on request.
                </p>
              </Reveal>
            </div>
          </div>

          <div className={cn("relative mt-12", useScrollRail ? "overflow-hidden" : "hide-scrollbar overflow-x-auto")}>
            <motion.div
              style={useScrollRail ? { x } : undefined}
              className={cn(
                "flex gap-4 pl-5 will-change-transform sm:gap-5 sm:pl-6",
                useScrollRail && "md:pl-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))]",
              )}
            >
              {CERTS.map((c, i) => (
                <button
                  key={c.code}
                  onClick={() => setOpen(i)}
                  data-cursor="hot"
                  aria-label={`View ${c.code} certificate`}
                  className={cn(
                    "group relative flex h-[300px] w-[270px] shrink-0 cursor-pointer flex-col justify-between overflow-hidden rounded-[26px] border p-7 text-left transition-all duration-500 hover:-translate-y-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ember-500 sm:w-[310px]",
                    c.tone === "flame"
                      ? "border-flame-500/20 bg-gradient-to-br from-white to-flame-500/6"
                      : c.tone === "ember"
                        ? "border-ember-500/20 bg-gradient-to-br from-white to-ember-500/8"
                        : "border-ink-200/70 bg-white",
                    "shadow-lux",
                  )}
                >
                  <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-ember-500/0 blur-2xl transition-all duration-700 group-hover:bg-ember-500/25" />

                  <div className="relative flex items-start justify-between">
                    <div className="relative h-14 w-14">
                      <svg viewBox="0 0 56 56" className="h-14 w-14">
                        <circle cx="28" cy="28" r="24" fill="none" stroke="#F47A20" strokeOpacity="0.25" strokeWidth="2" />
                        <motion.circle
                          cx="28"
                          cy="28"
                          r="24"
                          fill="none"
                          stroke="#F47A20"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray="151"
                          strokeDashoffset={PERF.lite ? 22 : undefined}
                          {...anim({
                            initial: { strokeDashoffset: 151 },
                            whileInView: { strokeDashoffset: 22 },
                            viewport: { once: true },
                            transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
                          })}
                          transform="rotate(-90 28 28)"
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-ember-600">
                        <Check className="h-5 w-5" />
                      </span>
                    </div>
                    <span className="rounded-full border border-ink-200 bg-white/70 px-2.5 py-1 text-[9px] font-bold tracking-[0.18em] text-ink-400 uppercase">
                      {c.issuer}
                    </span>
                  </div>

                  <div className="relative">
                    <h3 className="font-display text-[22px] font-extrabold tracking-tight text-ink-900">{c.code}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-ink-500">{c.name}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-ember-600 uppercase">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ember-500 opacity-75" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ember-500" />
                        </span>
                        Verified
                      </div>
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-white opacity-0 transition-all duration-500 group-hover:opacity-100">
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>

                  <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-ember-500 to-flame-500 transition-transform duration-700 group-hover:scale-x-100" />
                </button>
              ))}
            </motion.div>
          </div>

          {useScrollRail && (
            <div className="container-x relative mt-10">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-ink-200">
                  <motion.div style={{ width: progress }} className="h-px bg-gradient-to-r from-ember-500 to-flame-500" />
                </div>
                <span className="text-[10px] font-bold tracking-[0.24em] text-ink-400 uppercase">
                  Scroll · Click to inspect
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ---- Certificate modal ----
           Rendered in a portal to <body>: the section has content-visibility
           containment on mobile which would otherwise clip fixed children. */}
      {createPortal(
      <AnimatePresence>
        {open !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[180] flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={`${CERTS[open].code} certificate`}
          >
            <div className="absolute inset-0 bg-ink-950/85 backdrop-blur-md" onClick={close} />

          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-full w-full max-w-2xl overflow-y-auto"
          >
              <div className="mb-3 flex items-center justify-between">
                <div className="text-[11px] font-bold tracking-[0.28em] text-white/50 uppercase">
                  Certificate {String(open + 1).padStart(2, "0")} / {String(CERTS.length).padStart(2, "0")}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => step(-1)}
                    aria-label="Previous certificate"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-ember-500 hover:bg-ember-500 hover:text-white"
                  >
                    <ArrowRight className="h-4 w-4 rotate-180" />
                  </button>
                  <button
                    onClick={() => step(1)}
                    aria-label="Next certificate"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-ember-500 hover:bg-ember-500 hover:text-white"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    onClick={close}
                    aria-label="Close certificate"
                    className="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink-900 transition-transform hover:scale-105"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                      <path d="M5 5l14 14M19 5L5 19" />
                    </svg>
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={open}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="shadow-lux"
                >
                  <CertDocument index={open} />
                </motion.div>
              </AnimatePresence>

              <p className="mt-4 text-center text-[11px] text-white/35">
                Use ← → keys to browse · Esc to close
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body,
      )}
    </section>
  );
}
