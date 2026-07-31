import { motion } from "framer-motion";
import { ORG_REPORTS, TEAM } from "@/data/content";
import { Eyebrow, Reveal, SplitText } from "@/lib/ui";
import { LinkedIn, Mail, SystemIcon } from "./Icons";
import { cn } from "@/utils/cn";

function Connector({ vertical = true, delay = 0 }: { vertical?: boolean; delay?: number }) {
  return (
    <div className={cn("flex justify-center", vertical ? "h-10" : "h-px")}>
      <motion.span
        className={cn(
          "block bg-gradient-to-b from-ember-500 to-flame-500",
          vertical ? "w-px origin-top" : "h-px w-full origin-left bg-gradient-to-r",
        )}
        initial={vertical ? { scaleY: 0 } : { scaleX: 0 }}
        whileInView={vertical ? { scaleY: 1 } : { scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}

export default function Team() {
  return (
    <section id="team" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-ember-500/7 blur-[130px]" />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Leadership &amp; Management</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text="A flat, senior team — accountable for your safety."
            className="mt-6 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-5xl"
          />
          <Reveal delay={0.14}>
            <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-ink-500">
              You speak directly to the people who own design, approval and delivery — no layers between you and
              a decision.
            </p>
          </Reveal>
        </div>

        {/* Executives */}
        <div className="mx-auto mt-16 flex max-w-4xl flex-col">
          {TEAM.map((m, i) => (
            <div key={m.name} className="flex flex-col">
              {i > 0 && <Connector delay={0.5} />}
              <motion.article
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="grad-border group relative mx-auto w-full overflow-hidden rounded-[28px] border border-ink-100 bg-white shadow-lux"
              >
                <div className="flex flex-col sm:flex-row">
                  <div className="relative h-64 w-full shrink-0 overflow-hidden sm:h-auto sm:w-60">
                    <img
                      src={m.img}
                      alt={`${m.name}, ${m.role} at Brounic Group`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover object-top grayscale transition-all duration-[1200ms] group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950/40 to-transparent" />
                  </div>
                  <div className="relative flex flex-1 flex-col justify-center p-7 sm:p-9">
                    <span className="absolute right-6 top-6 flex gap-2">
                      <a
                        href="https://www.linkedin.com/company/brounic-group"
                        aria-label={`${m.name} on LinkedIn`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 text-ink-400 transition-all hover:border-ember-500 hover:bg-ember-500 hover:text-white"
                      >
                        <LinkedIn className="h-3.5 w-3.5" />
                      </a>
                      <a
                        href="#contact"
                        aria-label={`Email ${m.name}`}
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-ink-200 text-ink-400 transition-all hover:border-ember-500 hover:bg-ember-500 hover:text-white"
                      >
                        <Mail className="h-3.5 w-3.5" />
                      </a>
                    </span>
                    <div className="text-[10px] font-bold tracking-[0.26em] text-ember-600 uppercase">{m.group}</div>
                    <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight text-ink-900">
                      {m.name}
                    </h3>
                    <div className="mt-1 text-sm font-semibold text-ink-500">{m.role}</div>
                    <p className="mt-4 max-w-md text-[13.5px] leading-relaxed text-ink-500">{m.bio}</p>
                  </div>
                </div>
              </motion.article>
            </div>
          ))}

          {/* Org chart below GM */}
          <Connector delay={1} />

          <div className="relative">
            {/* horizontal bus */}
            <div className="absolute left-[16.66%] right-[16.66%] top-0 hidden h-px sm:block">
              <motion.span
                className="block h-px w-full origin-center bg-gradient-to-r from-ember-500 via-flame-500 to-ember-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-3 sm:gap-6">
              {ORG_REPORTS.map((r, i) => (
                <motion.div
                  key={r.role}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 1.4 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center"
                >
                  {/* vertical stub */}
                  <motion.span
                    className="hidden h-8 w-px origin-top bg-gradient-to-b from-flame-500 to-ember-500 sm:block"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.5 + i * 0.12 }}
                  />
                  <span className="mb-3 mt-3 h-2 w-2 rounded-full bg-flame-500 sm:mt-0" />
                  <div className="group w-full rounded-2xl border border-ink-100 bg-ink-50/60 p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-ember-500/30 hover:bg-white hover:shadow-lux">
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-ember-500/12 text-ember-600 transition-transform duration-500 group-hover:scale-110">
                      <SystemIcon name={r.icon} className="h-5 w-5" />
                    </span>
                    <div className="mt-3 font-display text-[14.5px] font-bold tracking-tight text-ink-900">
                      {r.role}
                    </div>
                    <div className="mt-1 text-[10.5px] font-semibold tracking-[0.14em] text-ink-400 uppercase">
                      Reports to GM
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Department strength */}
        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 grid max-w-4xl gap-4 rounded-[26px] border border-ink-100 bg-ink-50/60 p-8 sm:grid-cols-3 sm:p-10">
            {[
              { k: "Engineering", v: "18 specialists", d: "Design, hydraulics, BIM & approvals" },
              { k: "Project Management", v: "12 specialists", d: "Programme, QA/QC and handover" },
              { k: "Technical Field Team", v: "20+ technicians", d: "Installation, T&C and AMC response" },
            ].map((c) => (
              <div key={c.k} className="group text-center">
                <div className="text-[10px] font-bold tracking-[0.24em] text-ember-600 uppercase">{c.k}</div>
                <div className="mt-2 font-display text-xl font-extrabold tracking-tight text-ink-900">{c.v}</div>
                <p className="mt-1.5 text-[12.5px] text-ink-500">{c.d}</p>
                <span className="mx-auto mt-4 block h-px w-10 bg-ink-200 transition-all duration-500 group-hover:w-20 group-hover:bg-ember-500" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
