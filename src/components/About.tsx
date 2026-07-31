import { motion } from "framer-motion";
import { useState } from "react";
import { IMG, TIMELINE, VALUES } from "@/data/content";
import { Counter, Eyebrow, Reveal, SplitText, useParallax } from "@/lib/ui";
import { anim } from "@/lib/perf";
import { ArrowRight, Check, SystemIcon } from "./Icons";
import { cn } from "@/utils/cn";

export default function About() {
  const [imgRef, imgY] = useParallax(46);
  const [active, setActive] = useState(TIMELINE.length - 1);

  return (
    <section id="about" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent" />
      <div className="pointer-events-none absolute -left-40 top-40 h-[520px] w-[520px] rounded-full bg-ember-500/8 blur-[130px]" />

      <div className="container-x">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* Text */}
          <div>
            <Reveal>
              <Eyebrow>About Brounic Group</Eyebrow>
            </Reveal>
            <SplitText
              as="h2"
              text="A national leader in fire protection engineering."
              className="mt-6 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-5xl"
            />
            <Reveal delay={0.12}>
              <p className="mt-7 text-[15px] leading-relaxed text-ink-500 sm:text-base">
                Since its founding in <strong className="font-semibold text-ink-800">2011 in Abu Dhabi</strong>,
                Brounic Group has established itself as a leader in the UAE fire protection industry. With an
                uncompromising commitment to safety, we specialise in the design, supply, installation, testing,
                commissioning, servicing and maintenance of comprehensive fire protection systems.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 text-[15px] leading-relaxed text-ink-500 sm:text-base">
                Our reputation is built on delivering top-tier service using reputable brands for automatic fire
                detection, fire suppression, voice evacuation, access control and security systems — providing
                intelligent, economical solutions that minimise fire risk and safeguard lives and property.
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <div className="mt-9 grid gap-3 sm:grid-cols-2">
                {[
                  "Civil Defence approved contractor",
                  "NFPA & British Standards engineering",
                  "In-house certified installation crews",
                  "24/7 emergency AMC response",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ember-500/12 text-ember-600">
                      <Check className="h-3 w-3" />
                    </span>
                    <span className="text-[13.5px] font-medium text-ink-700">{t}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.36}>
              <a
                href="#services"
                className="group mt-10 inline-flex items-center gap-3 text-sm font-semibold text-ink-900"
              >
                <span className="border-b border-ember-500/40 pb-0.5 transition-colors group-hover:border-ember-500">
                  Discover our capabilities
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink-900 text-white transition-all group-hover:bg-ember-500">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </a>
            </Reveal>
          </div>

          {/* Visual */}
          <div ref={imgRef} className="relative">
            <motion.div style={{ y: imgY }} className="relative">
              <div className="relative overflow-hidden rounded-[32px] shadow-lux">
                <img
                  src={IMG.controlRoom}
                  alt="Brounic Group engineers monitoring fire protection systems in a control room"
                  loading="lazy"
                  decoding="async"
                  className="h-[440px] w-full object-cover transition-transform duration-[1400ms] hover:scale-105 sm:h-[520px]"
                />
                              </div>

              <motion.div
                {...anim({
                  initial: { opacity: 0, y: 24, scale: 0.94 },
                  whileInView: { opacity: 1, y: 0, scale: 1 },
                  viewport: { once: true },
                  transition: { duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] },
                })}
                className="glass absolute -bottom-8 -left-6 w-56 rounded-3xl p-5 shadow-lux sm:-left-10"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ember-500/12 text-ember-600">
                    <SystemIcon name="shield" className="h-5 w-5" />
                  </span>
                  <div className="font-display text-2xl font-extrabold text-ink-900">
                    <Counter to={500} suffix="+" />
                  </div>
                </div>
                <div className="mt-2 text-[11px] leading-snug font-medium text-ink-500">
                  Projects completed across the Emirates since 2011
                </div>
              </motion.div>

              <motion.div
                {...anim({
                  initial: { opacity: 0, x: 24 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.9, delay: 0.4 },
                })}
                className="absolute -right-4 top-8 hidden rounded-2xl border border-ink-900/8 bg-ink-950 px-4 py-3 shadow-lux sm:block"
              >
                <div className="text-[9px] font-semibold tracking-[0.3em] text-white/40 uppercase">Est.</div>
                <div className="font-display text-2xl font-extrabold text-white">2011</div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Vision / Mission */}
        <div className="mt-28 grid gap-5 lg:grid-cols-2">
          {[
            {
              tag: "Vision",
              body: "Brounic Group aims to be a global leader in fire protection and construction, delivering exceptional results for clients and meaningful careers for our team. Through innovation, integrity and sustainable growth, we set the standard for safety and quality.",
              img: IMG.skylineNight,
            },
            {
              tag: "Mission",
              body: "At Brounic Group, our mission is to deliver top-quality ﬁre protection and construction services, fostering lasting partnerships by exceeding client expectations at every step. We are committed to fair pricing, continuous improvement, and innovation, ensuring our services are advanced, reliable, and efﬁcient. By investing in our employees' growth and leveraging joint venture expertise, we aim to expand our impact across industries, prioritizing safety, quality, and long-term value for all stakeholders.",
              img: IMG.engineerFemale,
            },
          ].map((c, i) => (
            <Reveal key={c.tag} delay={i * 0.1}>
              <article className="group relative h-full overflow-hidden rounded-[28px] bg-ink-950 p-8 sm:p-10">
                <img
                  src={c.img}
                  alt=""
                  aria-hidden
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-20 transition-all duration-[1600ms] group-hover:scale-110 group-hover:opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-ink-950 via-ink-950/88 to-ember-900/40" />
                <div className="absolute inset-0 grid-lines-dark opacity-40" />
                <div className="relative">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3.5 py-1.5 text-[10px] font-semibold tracking-[0.28em] text-ember-400 uppercase backdrop-blur">
                    {c.tag}
                  </div>
                  <p className="mt-6 text-[15px] leading-relaxed text-white/65">{c.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Values */}
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.n} delay={i * 0.08}>
              <article className="grad-border group relative h-full overflow-hidden rounded-[28px] border border-ink-100 bg-ink-50/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-lux">
                <div className="font-display text-5xl font-extrabold text-ink-100 transition-colors duration-500 group-hover:text-ember-500/25">
                  {v.n}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink-900">{v.title}</h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-500">{v.body}</p>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Timeline */}
        <div className="mt-28">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Reveal>
                <Eyebrow>Our Journey</Eyebrow>
              </Reveal>
              <SplitText
                as="h3"
                text="Fifteen years of engineered safety."
                className="mt-5 font-display text-3xl leading-tight font-extrabold tracking-[-0.03em] text-ink-900 sm:text-4xl"
              />
            </div>
            <Reveal delay={0.15}>
              <p className="max-w-sm text-sm leading-relaxed text-ink-500">
                From a single Mussafah workshop to a nationwide fire protection contractor trusted by developers,
                operators and government authorities.
              </p>
            </Reveal>
          </div>

          <div className="relative mt-14">
            <div className="absolute inset-x-0 top-[13px] h-px bg-ink-200" />
            <motion.div
              className="absolute left-0 top-[13px] h-px bg-gradient-to-r from-ember-500 to-flame-500"
              initial={{ width: "0%" }}
              animate={{ width: `${((active + 1) / TIMELINE.length) * 100}%` }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />

            <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-2">
              {TIMELINE.map((t, i) => (
                <button
                  key={t.year}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  className="group relative flex min-w-[104px] flex-1 flex-col items-start pt-0 text-left"
                  aria-label={`View ${t.year} milestone`}
                >
                  <span
                    className={cn(
                      "relative z-10 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 bg-white transition-all duration-400",
                      i <= active ? "border-ember-500" : "border-ink-200",
                    )}
                  >
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full transition-all duration-400",
                        i === active ? "scale-125 bg-flame-500" : i < active ? "bg-ember-500" : "bg-ink-200",
                      )}
                    />
                    {i === active && (
                      <span className="absolute inset-0 animate-ping rounded-full border border-ember-500/50" />
                    )}
                  </span>
                  <span
                    className={cn(
                      "mt-4 font-display text-sm font-bold tracking-tight transition-colors",
                      i === active ? "text-ink-900" : "text-ink-400 group-hover:text-ink-600",
                    )}
                  >
                    {t.year}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative mt-8 min-h-[190px] overflow-hidden rounded-[28px] border border-ink-100 bg-gradient-to-br from-ink-50 to-white p-8 sm:p-10">
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-ember-500/8 blur-3xl" />
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-3xl"
              >
                <div className="font-display text-[11px] font-bold tracking-[0.3em] text-ember-600 uppercase">
                  {TIMELINE[active].year}
                </div>
                <h4 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-ink-900 sm:text-3xl">
                  {TIMELINE[active].title}
                </h4>
                <p className="mt-4 text-[15px] leading-relaxed text-ink-500">{TIMELINE[active].body}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
