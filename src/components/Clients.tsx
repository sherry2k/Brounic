import { motion } from "framer-motion";
import { CLIENTS } from "@/data/content";
import { Eyebrow, Reveal, SplitText } from "@/lib/ui";

export default function Clients() {
  return (
    <section id="clients" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[480px] w-[480px] rounded-full bg-ember-500/7 blur-[140px]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Our Clients</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Trusted by the entities that build and power Abu Dhabi."
              className="mt-6 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-5xl"
            />
          </div>
          <Reveal delay={0.14}>
            <p className="max-w-sm text-sm leading-relaxed text-ink-500">
              Government authorities, energy majors, banks and EPC contractors rely on Brounic for compliant,
              dependable fire protection.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-4 lg:grid-cols-5">
          {CLIENTS.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 5) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-[20px] border border-ink-100 bg-white p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-ink-200 hover:shadow-lux"
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent to-ink-50/0 transition-all duration-500 group-hover:to-ember-500/5" />
              <span
                className="pointer-events-none absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: c.color }}
              />

              {c.logo ? (
                <img
                  src={c.logo}
                  alt={`${c.name} logo`}
                  loading="lazy"
                  decoding="async"
                  className="max-h-14 w-auto max-w-full object-contain opacity-80 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
                />
              ) : (
                <div className="flex flex-col items-center text-center">
                  <span
                    className="font-display text-lg leading-none font-extrabold tracking-tight transition-transform duration-500 group-hover:scale-105"
                    style={{ color: c.color }}
                  >
                    {c.abbr}
                  </span>
                  <span className="mt-1.5 line-clamp-2 max-w-full text-[9.5px] leading-tight font-semibold tracking-wide text-ink-400">
                    {c.name}
                  </span>
                  {c.sub && (
                    <span className="mt-0.5 text-[8.5px] font-medium text-ink-300" dir="auto">
                      {c.sub}
                    </span>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-center text-[12px] text-ink-400">
            + developers, facility operators and EPC partners across all seven emirates.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
