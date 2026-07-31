import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { TESTIMONIALS } from "@/data/content";
import { Eyebrow, Reveal, SplitText } from "@/lib/ui";
import { ArrowRight, Star } from "./Icons";
import { cn } from "@/utils/cn";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);

  const go = useCallback((n: number) => {
    setDir(n);
    setI((v) => (v + n + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, [go]);

  const t = TESTIMONIALS[i];

  return (
    <section id="testimonials" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[460px] w-[460px] rounded-full bg-ember-500/7 blur-[130px]" />

      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <Reveal>
              <Eyebrow>Client Confidence</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Trusted by developers, operators and authorities."
              className="mt-6 font-display text-[2rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-[2.75rem]"
            />
            <Reveal delay={0.14}>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-ink-500">
                Long-term relationships built on transparency, technical rigour and turning up when it matters.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-10 flex items-center gap-3">
                <button
                  onClick={() => go(-1)}
                  aria-label="Previous testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-all hover:border-ember-500 hover:bg-ember-500 hover:text-white"
                >
                  <ArrowRight className="h-4 w-4 rotate-180" />
                </button>
                <button
                  onClick={() => go(1)}
                  aria-label="Next testimonial"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-200 text-ink-600 transition-all hover:border-ember-500 hover:bg-ember-500 hover:text-white"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <div className="ml-3 flex gap-1.5">
                  {TESTIMONIALS.map((_, k) => (
                    <button
                      key={k}
                      onClick={() => {
                        setDir(k > i ? 1 : -1);
                        setI(k);
                      }}
                      aria-label={`Go to testimonial ${k + 1}`}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-500",
                        k === i ? "w-8 bg-gradient-to-r from-ember-500 to-flame-500" : "w-1.5 bg-ink-200",
                      )}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative min-h-[360px] overflow-hidden rounded-[32px] border border-ink-100 bg-gradient-to-br from-ink-50 to-white p-8 shadow-lux sm:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-ember-500/10 blur-3xl" />
              <svg
                viewBox="0 0 48 36"
                className="absolute right-8 top-8 h-14 w-14 text-ember-500/12"
                fill="currentColor"
                aria-hidden
              >
                <path d="M20 36V18C20 8 14 2 4 0v8c4 1 6 4 6 8H0v20h20zm28 0V18c0-10-6-16-16-18v8c4 1 6 4 6 8H28v20h20z" />
              </svg>

              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={i}
                  custom={dir}
                  initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -22, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="relative flex h-full flex-col justify-between"
                >
                  <div>
                    <div className="flex gap-1 text-ember-500">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <motion.span
                          key={s}
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 + s * 0.07, type: "spring", stiffness: 300 }}
                        >
                          <Star className="h-4 w-4" />
                        </motion.span>
                      ))}
                    </div>
                    <blockquote className="mt-7 font-display text-[19px] leading-[1.45] font-semibold tracking-[-0.02em] text-ink-800 sm:text-[26px]">
                      "{t.quote}"
                    </blockquote>
                  </div>

                  <div className="mt-10 flex items-center gap-4 border-t border-ink-100 pt-6">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ember-500 to-flame-500 font-display text-base font-extrabold text-white">
                      {t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-display text-[15px] font-bold text-ink-900">{t.name}</div>
                      <div className="text-[12.5px] text-ink-500">
                        {t.role} · <span className="font-semibold text-ember-600">{t.company}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
