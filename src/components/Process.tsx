import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { PROCESS } from "@/data/content";
import { Eyebrow, Reveal, SplitText } from "@/lib/ui";
import { cn } from "@/utils/cn";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 90, damping: 26, mass: 0.4 });
  const glowY = useTransform(scaleY, (v) => `${v * 100}%`);

  return (
    <section id="process" className="noise relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="absolute inset-0 grid-lines-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-ember-500/8 blur-[160px]" />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow dark>How We Work</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text="Nine stages. Zero surprises."
            className="mt-6 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-white sm:text-5xl"
          />
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-lg text-[15px] leading-relaxed text-white/50">
              A disciplined delivery sequence that protects your programme, your budget and — above all — the
              people inside your building.
            </p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-20">
          {/* Spine */}
          <div className="absolute left-[19px] top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
            <motion.div
              style={{ scaleY, originY: 0 }}
              className="h-full w-px bg-gradient-to-b from-ember-400 via-ember-500 to-flame-500"
            />
            <motion.span
              style={{ top: glowY }}
              className="absolute left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-500/25 blur-2xl"
            />
          </div>

          <div className="space-y-6 md:space-y-2">
            {PROCESS.map((p, i) => {
              const right = i % 2 === 1;
              return (
                <motion.div
                  key={p.step}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "relative flex items-start gap-5 pl-14 md:w-1/2 md:pl-0",
                    right ? "md:ml-auto md:pl-14" : "md:pr-14 md:text-right",
                  )}
                >
                  {/* node */}
                  <span
                    className={cn(
                      "absolute top-6 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-white/12 bg-ink-950",
                      "left-0 md:left-auto",
                      right ? "md:-left-[19px]" : "md:-right-[19px]",
                    )}
                  >
                    <span className="flex h-2.5 w-2.5 rounded-full bg-gradient-to-br from-ember-400 to-flame-500" />
                    <motion.span
                      className="absolute inset-0 rounded-full border border-ember-500/40"
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
                    />
                  </span>

                  <div className="group relative w-full overflow-hidden rounded-[22px] border border-white/8 bg-white/[0.03] p-6 backdrop-blur-sm transition-all duration-500 hover:border-ember-500/25 hover:bg-white/[0.06]">
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-ember-500/0 blur-2xl transition-all duration-700 group-hover:bg-ember-500/20" />
                    <div
                      className={cn(
                        "flex items-baseline gap-3",
                        !right && "md:flex-row-reverse",
                      )}
                    >
                      <span className="font-display text-[11px] font-bold tracking-[0.22em] text-ember-500">
                        {p.step}
                      </span>
                      <h3 className="font-display text-lg font-bold tracking-tight text-white">{p.title}</h3>
                    </div>
                    <p className="mt-2.5 text-[13px] leading-relaxed text-white/45">{p.body}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
