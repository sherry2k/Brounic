import { motion } from "framer-motion";
import { IMG, WHY } from "@/data/content";
import { Counter, Eyebrow, Reveal, SplitText } from "@/lib/ui";
import { PERF, anim } from "@/lib/perf";
import { Check, SystemIcon } from "./Icons";

const HIGHLIGHT = [
  { value: 15, suffix: "+", label: "Years in the UAE market", sub: "Since 2011, Abu Dhabi" },
  { value: 600, suffix: "+", label: "Projects commissioned", sub: "Across 12 sectors" },
  { value: 380, suffix: "+", label: "Sites under AMC", sub: "24/7 monitored response" },
  { value: 98, suffix: "%", label: "On-time delivery", sub: "Programme certainty" },
];

export default function WhyChoose() {
  return (
    <section id="why" className="noise relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      {!PERF.lite && (
        <img
          src={IMG.pipesGauge}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.12]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-950 via-ink-950/94 to-ink-950" />
      <div className="absolute inset-0 grid-lines-dark opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-ember-500/10 blur-[160px]" />

      <div className="container-x relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow dark>Why Brounic Group</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text="The standards behind every system we hand over."
            className="mt-6 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-white sm:text-5xl"
          />
          <Reveal delay={0.15}>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/50">
              Compliance is the baseline. What distinguishes Brounic is engineering discipline, our own certified
              workforce, and a maintenance culture that keeps systems live for decades.
            </p>
          </Reveal>
        </div>

        {/* Highlight counters */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/8 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHT.map((h, i) => (
            <motion.div
              key={h.label}
              {...anim({
                initial: { opacity: 0, y: 24 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { duration: 0.7, delay: i * 0.09 },
              })}
              className="group relative bg-ink-950/70 px-7 py-9 transition-colors duration-500 hover:bg-ink-900/80"
            >
              <div className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                <span className="text-gradient-ember">
                  <Counter to={h.value} suffix={h.suffix} />
                </span>
              </div>
              <div className="mt-3 text-[13px] font-semibold text-white/75">{h.label}</div>
              <div className="mt-1 text-[11.5px] text-white/35">{h.sub}</div>
              <span className="absolute inset-x-7 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-ember-500 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </div>

        {/* Reasons grid */}
        <div className="mt-5 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {WHY.map((w, i) => (
            <motion.div
              key={w.title}
              {...anim({
                initial: { opacity: 0, y: 22 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-40px" },
                transition: { duration: 0.6, delay: (i % 3) * 0.07 },
              })}
              className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all duration-500 hover:-translate-y-1 hover:border-ember-500/25 hover:bg-white/[0.06]"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-ember-500/0 blur-2xl transition-all duration-700 group-hover:bg-ember-500/25" />
              <div className="relative flex items-start gap-3.5">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-ember-500/12 text-ember-400 transition-transform duration-500 group-hover:scale-110">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <div>
                  <h3 className="font-display text-[14.5px] font-bold tracking-tight text-white">{w.title}</h3>
                  <p className="mt-1.5 text-[12.5px] leading-relaxed text-white/45">{w.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Standards strip */}
        <Reveal delay={0.1}>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 rounded-2xl border border-white/8 bg-white/[0.03] px-8 py-6">
            <span className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-white/35 uppercase">
              <SystemIcon name="shield" className="h-4 w-4 text-ember-500" /> Engineered to
            </span>
            {["NFPA 13", "NFPA 14", "NFPA 20", "NFPA 25", "NFPA 72", "NFPA 2001", "BS 5839", "EN 54", "UAE FLSC"].map(
              (s) => (
                <span
                  key={s}
                  className="font-display text-[13px] font-bold tracking-tight text-white/55 transition-colors hover:text-ember-400"
                >
                  {s}
                </span>
              ),
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
