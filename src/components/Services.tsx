import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";
import { SERVICES, type Service } from "@/data/content";
import { Eyebrow, Reveal, SplitText } from "@/lib/ui";
import { PERF, anim } from "@/lib/perf";
import { ArrowRight, Check, SystemIcon } from "./Icons";
import { cn } from "@/utils/cn";

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);

  return (
    <motion.article
      ref={ref}
      {...anim({
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: { duration: 0.7, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] },
      })}
      onMouseMove={
        PERF.touch
          ? undefined
          : (e) => {
              const el = ref.current;
              if (!el) return;
              const r = el.getBoundingClientRect();
              el.style.setProperty("--mx", `${e.clientX - r.left}px`);
              el.style.setProperty("--my", `${e.clientY - r.top}px`);
            }
      }
      data-active={open}
      className={cn(
        "grad-border group relative flex flex-col overflow-hidden rounded-[26px] border p-7 transition-all duration-500",
        open
          ? "border-ember-500/30 bg-white shadow-lux"
          : "border-ink-100 bg-white/70 hover:-translate-y-1.5 hover:border-ink-200 hover:shadow-lux",
      )}
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(244,122,32,0.10), transparent 70%)",
        }}
      />

      <div className="relative">
        <div className="relative inline-flex">
          <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-ember-400 to-flame-500 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-40" />
          {/* Default: orange tile + white icon. Hover: white tile + orange icon. */}
          <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-ember-500/40 bg-gradient-to-br from-ember-500 to-ember-600 text-white shadow-ember transition-all duration-500 group-hover:border-ember-500/50 group-hover:from-white group-hover:to-white group-hover:text-ember-600 group-hover:shadow-lux">
            <SystemIcon name={s.key} className="h-7 w-7" />
          </span>
        </div>

        <h3 className="mt-6 font-display text-[17px] leading-snug font-bold tracking-tight text-ink-900">
          {s.title}
        </h3>
        <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-500">{s.short}</p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="relative mt-4 border-t border-ink-100 pt-4">
                {/* Keep text clear of the corner photo */}
                <div className={s.img ? "pr-24 sm:pr-28" : ""}>
                  <p className="text-[13px] leading-relaxed text-ink-500">{s.detail}</p>
                  <ul className="mt-4 space-y-2">
                    {s.points.map((p, k) => (
                      <motion.li
                        key={p}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.08 + k * 0.06 }}
                        className="flex items-start gap-2.5 text-[12.5px] font-medium text-ink-700"
                      >
                        <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ember-500/12 text-ember-600">
                          <Check className="h-2.5 w-2.5" />
                        </span>
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {s.img && (
                  <motion.img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    decoding="async"
                    initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{ delay: 0.18, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.06 }}
                    className="absolute bottom-0 right-0 h-20 w-20 rounded-xl object-cover shadow-lux ring-1 ring-ink-900/10 sm:h-24 sm:w-24"
                  />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setOpen((v) => !v)}
          className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] text-ink-400 uppercase transition-colors hover:text-ember-600"
        >
          {open ? "Show Less" : "Read More"}
          <motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.35 }}>
            <ArrowRight className="h-3.5 w-3.5" />
          </motion.span>
        </button>
      </div>

      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-ember-500 via-flame-500 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
    </motion.article>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-ink-50/70 py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-60" />
      <div className="pointer-events-none absolute right-0 top-1/4 h-[560px] w-[560px] rounded-full bg-ember-500/8 blur-[140px]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>What We Deliver</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Complete fire protection, engineered end to end."
              className="mt-6 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-5xl"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-sm leading-relaxed text-ink-500">
              Fifteen disciplines under one accountable contract — from hydraulic design and authority approval
              through to installation, commissioning and lifetime maintenance.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.key} s={s} i={i} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="relative mt-8 overflow-hidden rounded-[28px] bg-ink-950 p-8 sm:p-10">
            <div className="absolute inset-0 grid-lines-dark opacity-40" />
            <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-ember-500/25 blur-[100px]" />
            <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <h3 className="font-display text-xl font-extrabold tracking-tight text-white sm:text-2xl">
                  Need a system designed, approved and installed?
                </h3>
                <p className="mt-2 text-sm text-white/50">
                  Send us your drawings — we'll return a compliant concept and budget within 48 hours.
                </p>
              </div>
              <a
                href="#contact"
                className="group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-ember"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-ember-600 via-ember-500 to-flame-500 anim-pan" />
                <span className="relative z-10 flex items-center gap-2.5">
                  Talk to an Engineer
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
