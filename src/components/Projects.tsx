import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PROJECTS, PROJECT_FILTERS } from "@/data/content";
import { Eyebrow, Reveal, SplitText } from "@/lib/ui";
import { ArrowRight, Pin } from "./Icons";
import { cn } from "@/utils/cn";

export default function Projects() {
  const [filter, setFilter] = useState<string>("All");
  const list = useMemo(
    () => (filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <section id="projects" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute -left-32 top-1/4 h-[480px] w-[480px] rounded-full bg-ember-500/7 blur-[130px]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Featured Projects</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Delivered, tested, witnessed, handed over."
              className="mt-6 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-5xl"
            />
          </div>
          <Reveal delay={0.12}>
            <div className="flex flex-wrap gap-2">
              {PROJECT_FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "relative rounded-full border px-4 py-2 text-[12.5px] font-semibold transition-all duration-300",
                    filter === f
                      ? "border-transparent text-white"
                      : "border-ink-200 text-ink-500 hover:border-ink-300 hover:text-ink-800",
                  )}
                >
                  {filter === f && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-ember-600 to-flame-500 shadow-ember"
                      transition={{ type: "spring", stiffness: 340, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{f}</span>
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-14 grid auto-rows-[248px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {list.map((p, i) => (
              <motion.article
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.55, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "group relative overflow-hidden rounded-[24px] bg-ink-900",
                  p.span ?? "",
                )}
              >
                <img
                  src={p.img}
                  alt={`${p.title} — ${p.system}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent transition-opacity duration-500" />
                <div className="absolute inset-0 bg-ember-600/0 transition-colors duration-700 group-hover:bg-ember-600/12" />

                <div className="absolute left-4 top-4">
                  <span className="rounded-full border border-white/18 bg-ink-950/45 px-3 py-1 text-[9.5px] font-bold tracking-[0.16em] text-white/80 uppercase backdrop-blur-md">
                    {p.category}
                  </span>
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="font-display text-[16px] leading-tight font-bold tracking-tight text-white sm:text-lg">
                    {p.title}
                  </h3>
                  <div className="mt-2 flex items-center gap-1.5 text-[11.5px] font-medium text-white/55">
                    <Pin className="h-3 w-3 text-ember-500" />
                    {p.location}
                  </div>

                  <div className="grid grid-rows-[0fr] transition-all duration-500 ease-out group-hover:grid-rows-[1fr]">
                    <div className="overflow-hidden">
                      <div className="mt-3 border-t border-white/12 pt-3">
                        <div className="text-[9px] font-bold tracking-[0.2em] text-ember-400 uppercase">
                          Systems Installed
                        </div>
                        <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/60">{p.system}</p>
                        <div className="mt-2.5 flex items-center justify-between">
                          <span className="text-[10.5px] font-semibold text-white/40">{p.date}</span>
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-ember-500 text-white">
                            <ArrowRight className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
