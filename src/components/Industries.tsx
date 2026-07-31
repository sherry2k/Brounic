import { motion } from "framer-motion";
import { INDUSTRIES } from "@/data/content";
import { Eyebrow, Reveal, SplitText } from "@/lib/ui";
import { ArrowRight } from "./Icons";

export default function Industries() {
  return (
    <section id="industries" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute -right-40 top-1/3 h-[520px] w-[520px] rounded-full bg-flame-500/6 blur-[140px]" />

      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Industries We Serve</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="Protection engineered for every risk profile."
              className="mt-6 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-5xl"
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-ink-500">
              Hazard classification drives everything we design. From ESFR warehouse racking to clean-agent data
              halls, each sector receives a purpose-built solution.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3.5 sm:gap-4 lg:grid-cols-4">
          {INDUSTRIES.map((ind, i) => (
            <motion.a
              key={ind.name}
              href="#contact"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group relative aspect-[4/5] overflow-hidden rounded-[22px] bg-ink-900 sm:aspect-[4/4.4]"
            >
              <img
                src={ind.img}
                alt={`${ind.name} fire protection by Brounic Group`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover opacity-55 grayscale transition-all duration-[1200ms] ease-out group-hover:scale-110 group-hover:opacity-75 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/45 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-ember-600/0 to-transparent transition-all duration-700 group-hover:from-ember-600/35" />

              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5">
                <div className="flex items-start justify-between">
                  <span className="rounded-full border border-white/15 bg-white/8 px-2.5 py-1 text-[9.5px] font-bold tracking-[0.14em] text-white/70 uppercase backdrop-blur-md">
                    {ind.count}
                  </span>
                  <span className="flex h-7 w-7 translate-y-1 items-center justify-center rounded-full bg-white/12 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-[14.5px] leading-tight font-bold tracking-tight text-white sm:text-base">
                    {ind.name}
                  </h3>
                  <span className="mt-2 block h-px w-8 origin-left scale-x-100 bg-ember-500 transition-all duration-500 group-hover:w-16" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
