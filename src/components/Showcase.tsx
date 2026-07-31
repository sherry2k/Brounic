import { motion } from "framer-motion";
import { useState } from "react";
import { SYSTEMS } from "@/data/content";
import { Eyebrow, Reveal, SplitText } from "@/lib/ui";
import { anim } from "@/lib/perf";
import { SystemIcon } from "./Icons";
import { cn } from "@/utils/cn";

const FLOORS = [0, 1, 2, 3, 4, 5];
const fy = (i: number) => 148 + i * 62;

export default function Showcase() {
  const [active, setActive] = useState<string>("sprinkler");
  const on = (k: string) => active === k;
  const dim = (k: string) => (on(k) ? 1 : 0.16);
  const col = (k: string) => (on(k) ? "#F47A20" : "#9AA3AC");

  const current = SYSTEMS.find((s) => s.key === active)!;

  return (
    <section id="systems" className="noise relative overflow-hidden bg-ink-950 py-24 sm:py-32">
      <div className="absolute inset-0 grid-lines-dark opacity-50" />
      <div className="pointer-events-none absolute left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-ember-500/12 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-flame-500/10 blur-[150px]" />

      <div className="container-x relative">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow dark>Interactive System Map</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text="Every system. One integrated life-safety strategy."
            className="mt-6 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-white sm:text-5xl"
          />
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/50">
              Hover a system to see how Brounic engineers it into a live commercial tower — from the basement
              pump room to the roof-level tank, wired into a single command interface.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-10">
          {/* System selector */}
          <div className="order-2 flex flex-col gap-2 lg:order-1">
            {SYSTEMS.map((s, i) => (
              <motion.button
                key={s.key}
                {...anim({
                  initial: { opacity: 0, x: -20 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.55, delay: i * 0.05 },
                })}
                onMouseEnter={() => setActive(s.key)}
                onFocus={() => setActive(s.key)}
                onClick={() => setActive(s.key)}
                className={cn(
                  "group relative flex items-center gap-3.5 overflow-hidden rounded-2xl border px-4 py-3.5 text-left transition-all duration-400",
                  on(s.key)
                    ? "border-ember-500/40 bg-white/8 backdrop-blur-md"
                    : "border-white/8 bg-white/2 hover:border-white/16 hover:bg-white/5",
                )}
              >
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-400",
                    on(s.key) ? "bg-ember-500/18 text-ember-400" : "bg-white/5 text-white/35",
                  )}
                >
                  <SystemIcon name={s.key} className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "block truncate text-[13.5px] font-semibold transition-colors",
                      on(s.key) ? "text-white" : "text-white/55",
                    )}
                  >
                    {s.label}
                  </span>
                  <span className="mt-0.5 block truncate text-[10.5px] font-medium tracking-wide text-white/30">
                    {s.metric}
                  </span>
                </span>
                {on(s.key) && (
                  <motion.span
                    layoutId="sysbar"
                    className="absolute inset-y-2 left-0 w-[3px] rounded-full bg-gradient-to-b from-ember-400 to-flame-500"
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Building */}
          <Reveal className="order-1 lg:order-2" delay={0.1}>
            <div className="relative overflow-hidden rounded-[32px] border border-white/8 bg-gradient-to-b from-white/4 to-transparent p-4 backdrop-blur-sm sm:p-6">
              <svg viewBox="0 0 800 620" className="h-auto w-full" role="img" aria-label="Interactive building fire protection system map">
                <defs>
                  <linearGradient id="face" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1C2127" />
                    <stop offset="100%" stopColor="#0E1116" />
                  </linearGradient>
                  <linearGradient id="side" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#151A20" />
                    <stop offset="100%" stopColor="#0A0D11" />
                  </linearGradient>
                  <linearGradient id="roof" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#242A31" />
                    <stop offset="100%" stopColor="#171C22" />
                  </linearGradient>
                  <filter id="glow" x="-60%" y="-60%" width="220%" height="220%">
                    <feGaussianBlur stdDeviation="5" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* ground */}
                <ellipse cx="420" cy="576" rx="300" ry="20" fill="#F47A20" opacity="0.06" />
                <line x1="120" y1="576" x2="740" y2="576" stroke="#ffffff" strokeOpacity="0.1" />

                {/* structure */}
                <polygon points="200,110 272,70 672,70 600,110" fill="url(#roof)" stroke="#ffffff" strokeOpacity="0.1" />
                <polygon points="600,110 672,70 672,510 600,552" fill="url(#side)" stroke="#ffffff" strokeOpacity="0.08" />
                <rect x="200" y="110" width="400" height="442" fill="url(#face)" stroke="#ffffff" strokeOpacity="0.12" />

                {/* floor slabs */}
                {FLOORS.map((i) => (
                  <g key={`slab-${i}`}>
                    <line x1="200" y1={fy(i)} x2="600" y2={fy(i)} stroke="#ffffff" strokeOpacity="0.1" />
                    <line x1="600" y1={fy(i)} x2="672" y2={fy(i) - 40} stroke="#ffffff" strokeOpacity="0.06" />
                    <text x="212" y={fy(i) - 8} fill="#ffffff" fillOpacity="0.16" fontSize="9" fontFamily="Sora, sans-serif" letterSpacing="2">
                      L{6 - i}
                    </text>
                  </g>
                ))}

                {/* roof tank */}
                <g opacity={on("hydrant") || on("pump") ? 1 : 0.25} style={{ transition: "opacity .45s" }}>
                  <rect x="470" y="40" width="110" height="32" rx="4" fill="#1E242B" stroke={on("hydrant") || on("pump") ? "#F47A20" : "#7A838C"} strokeOpacity="0.8" />
                  <text x="525" y="60" textAnchor="middle" fill="#ffffff" fillOpacity="0.45" fontSize="9" fontFamily="Sora, sans-serif">
                    TANK
                  </text>
                </g>

                {/* ---------- SPRINKLERS ---------- */}
                <g opacity={dim("sprinkler")} style={{ transition: "opacity .45s" }} filter={on("sprinkler") ? "url(#glow)" : undefined}>
                  {FLOORS.map((i) => (
                    <g key={`spr-${i}`}>
                      <line x1="268" y1={fy(i) + 14} x2="572" y2={fy(i) + 14} stroke={col("sprinkler")} strokeWidth="1.6" />
                      {[0, 1, 2, 3, 4].map((j) => {
                        const x = 292 + j * 64;
                        return (
                          <g key={j}>
                            <line x1={x} y1={fy(i) + 14} x2={x} y2={fy(i) + 21} stroke={col("sprinkler")} strokeWidth="1.4" />
                            <circle cx={x} cy={fy(i) + 23} r="2.6" fill={col("sprinkler")} />
                            {on("sprinkler") && (
                              <motion.path
                                d={`M${x} ${fy(i) + 24} L${x - 10} ${fy(i) + 42} M${x} ${fy(i) + 24} L${x} ${fy(i) + 46} M${x} ${fy(i) + 24} L${x + 10} ${fy(i) + 42}`}
                                stroke="#7FD1FF"
                                strokeWidth="1"
                                strokeOpacity="0.55"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: [0, 0.8, 0] }}
                                transition={{ duration: 1.6, repeat: Infinity, delay: (i * 5 + j) * 0.07 }}
                              />
                            )}
                          </g>
                        );
                      })}
                    </g>
                  ))}
                  <line x1="268" y1={fy(0) + 14} x2="268" y2={fy(5) + 14} stroke={col("sprinkler")} strokeWidth="2.4" className={on("sprinkler") ? "dash-flow" : undefined} />
                </g>

                {/* ---------- ALARM / DETECTION ---------- */}
                <g opacity={dim("alarm")} style={{ transition: "opacity .45s" }} filter={on("alarm") ? "url(#glow)" : undefined}>
                  {FLOORS.map((i) =>
                    [0, 1, 2].map((j) => {
                      const x = 330 + j * 100;
                      return (
                        <g key={`det-${i}-${j}`}>
                          <circle cx={x} cy={fy(i) + 10} r="4.6" fill="none" stroke={col("alarm")} strokeWidth="1.3" />
                          <circle cx={x} cy={fy(i) + 10} r="1.6" fill={col("alarm")} />
                          {on("alarm") && (
                            <motion.circle
                              cx={x}
                              cy={fy(i) + 10}
                              r="4.6"
                              fill="none"
                              stroke="#FF8F3C"
                              animate={{ r: [4.6, 13], opacity: [0.7, 0] }}
                              transition={{ duration: 2.2, repeat: Infinity, delay: (i * 3 + j) * 0.16 }}
                            />
                          )}
                        </g>
                      );
                    }),
                  )}
                  <rect x="288" y="470" width="36" height="46" rx="4" fill="#161B21" stroke={col("alarm")} strokeWidth="1.4" />
                  <rect x="295" y="478" width="22" height="12" rx="2" fill={on("alarm") ? "#F47A20" : "#3A424A"} opacity="0.8" />
                  <circle cx="300" cy="500" r="2" fill={col("alarm")} />
                  <circle cx="308" cy="500" r="2" fill={col("alarm")} />
                  <circle cx="316" cy="500" r="2" fill={col("alarm")} />
                  <text x="306" y="528" textAnchor="middle" fill={col("alarm")} fillOpacity="0.7" fontSize="7.5" fontFamily="Sora, sans-serif">
                    FACP
                  </text>
                  {on("alarm") &&
                    FLOORS.map((i) => (
                      <motion.line
                        key={`al-${i}`}
                        x1="306"
                        y1="470"
                        x2="330"
                        y2={fy(i) + 10}
                        stroke="#F47A20"
                        strokeWidth="0.8"
                        strokeOpacity="0.4"
                        strokeDasharray="3 5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.9, delay: i * 0.09 }}
                      />
                    ))}
                </g>

                {/* ---------- HYDRANT / RISER ---------- */}
                <g opacity={dim("hydrant")} style={{ transition: "opacity .45s" }} filter={on("hydrant") ? "url(#glow)" : undefined}>
                  <line x1="588" y1="72" x2="588" y2="540" stroke={col("hydrant")} strokeWidth="3.4" className={on("hydrant") ? "dash-flow" : undefined} />
                  <line x1="525" y1="72" x2="588" y2="72" stroke={col("hydrant")} strokeWidth="2.4" />
                  {FLOORS.map((i) => (
                    <g key={`hyd-${i}`}>
                      <rect x="566" y={fy(i) + 18} width="16" height="12" rx="2" fill="#171C22" stroke={col("hydrant")} strokeWidth="1.3" />
                      <line x1="582" y1={fy(i) + 24} x2="588" y2={fy(i) + 24} stroke={col("hydrant")} strokeWidth="1.6" />
                    </g>
                  ))}
                  <rect x="640" y="500" width="26" height="20" rx="3" fill="#171C22" stroke={col("hydrant")} strokeWidth="1.3" />
                  <text x="653" y="534" textAnchor="middle" fill={col("hydrant")} fillOpacity="0.7" fontSize="7.5" fontFamily="Sora, sans-serif">
                    BREECH
                  </text>
                </g>

                {/* ---------- PUMP ROOM ---------- */}
                <g opacity={dim("pump")} style={{ transition: "opacity .45s" }} filter={on("pump") ? "url(#glow)" : undefined}>
                  <rect x="204" y="514" width="392" height="36" rx="3" fill="#12171C" stroke={col("pump")} strokeWidth="1.3" strokeOpacity="0.7" />
                  {[0, 1, 2].map((j) => {
                    const x = 262 + j * 90;
                    return (
                      <g key={`pmp-${j}`}>
                        <rect x={x - 26} y="522" width="52" height="20" rx="3" fill="#1B2128" stroke={col("pump")} strokeWidth="1.2" />
                        <motion.circle
                          cx={x}
                          cy="532"
                          r="6"
                          fill="none"
                          stroke={col("pump")}
                          strokeWidth="1.5"
                          strokeDasharray="6 4"
                          animate={on("pump") ? { rotate: 360 } : { rotate: 0 }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
                          style={{ originX: `${x}px`, originY: "532px" }}
                        />
                      </g>
                    );
                  })}
                  <text x="520" y="537" fill={col("pump")} fillOpacity="0.75" fontSize="9" fontFamily="Sora, sans-serif" letterSpacing="1.5">
                    PUMP ROOM
                  </text>
                  {on("pump") && (
                    <motion.line
                      x1="440"
                      y1="514"
                      x2="588"
                      y2="200"
                      stroke="#F47A20"
                      strokeWidth="1"
                      strokeOpacity="0.35"
                      strokeDasharray="4 6"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.1 }}
                    />
                  )}
                </g>

                {/* ---------- PA / VA ---------- */}
                <g opacity={dim("pava")} style={{ transition: "opacity .45s" }} filter={on("pava") ? "url(#glow)" : undefined}>
                  {FLOORS.map((i) =>
                    [0, 1].map((j) => {
                      const x = 372 + j * 140;
                      return (
                        <g key={`pa-${i}-${j}`}>
                          <path d={`M${x} ${fy(i) + 8} l7 -5 v14 l-7 -5 z`} fill={col("pava")} opacity="0.85" />
                          {on("pava") &&
                            [0, 1].map((w) => (
                              <motion.path
                                key={w}
                                d={`M${x + 10 + w * 5} ${fy(i) + 5} a 6 6 0 0 1 0 8`}
                                stroke="#FF8F3C"
                                strokeWidth="1"
                                fill="none"
                                animate={{ opacity: [0, 0.9, 0] }}
                                transition={{ duration: 1.6, repeat: Infinity, delay: w * 0.25 + i * 0.1 }}
                              />
                            ))}
                        </g>
                      );
                    }),
                  )}
                </g>

                {/* ---------- SUPPRESSION ---------- */}
                <g opacity={dim("suppression")} style={{ transition: "opacity .45s" }} filter={on("suppression") ? "url(#glow)" : undefined}>
                  <rect x="430" y={fy(2) + 4} width="150" height="54" rx="4" fill={on("suppression") ? "rgba(244,122,32,0.09)" : "transparent"} stroke={col("suppression")} strokeWidth="1.3" strokeDasharray="5 4" />
                  <text x="440" y={fy(2) + 20} fill={col("suppression")} fillOpacity="0.85" fontSize="8.5" fontFamily="Sora, sans-serif" letterSpacing="1.4">
                    DATA HALL
                  </text>
                  {[0, 1, 2].map((j) => (
                    <g key={`cyl-${j}`}>
                      <rect x={444 + j * 15} y={fy(2) + 28} width="10" height="24" rx="5" fill="#1B2128" stroke={col("suppression")} strokeWidth="1.1" />
                    </g>
                  ))}
                  {on("suppression") &&
                    [0, 1, 2, 3].map((j) => (
                      <motion.circle
                        key={`gas-${j}`}
                        cx={510 + j * 18}
                        cy={fy(2) + 34}
                        r="7"
                        fill="#FF8F3C"
                        animate={{ opacity: [0, 0.25, 0], scale: [0.6, 1.5, 1.9] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: j * 0.3 }}
                      />
                    ))}
                </g>

                {/* ---------- EMERGENCY LIGHTING ---------- */}
                <g opacity={dim("emergency-light")} style={{ transition: "opacity .45s" }} filter={on("emergency-light") ? "url(#glow)" : undefined}>
                  <rect x="204" y="112" width="52" height="438" fill={on("emergency-light") ? "rgba(244,122,32,0.06)" : "transparent"} stroke={col("emergency-light")} strokeWidth="1" strokeDasharray="4 5" />
                  {FLOORS.map((i) => (
                    <g key={`em-${i}`}>
                      <rect x="222" y={fy(i) + 6} width="16" height="7" rx="1.6" fill={col("emergency-light")} opacity="0.9" />
                      {on("emergency-light") && (
                        <motion.path
                          d={`M222 ${fy(i) + 13} L214 ${fy(i) + 34} L246 ${fy(i) + 34} Z`}
                          fill="#FFD9A8"
                          animate={{ opacity: [0.06, 0.22, 0.06] }}
                          transition={{ duration: 2.6, repeat: Infinity, delay: i * 0.2 }}
                        />
                      )}
                    </g>
                  ))}
                  <text x="230" y="566" textAnchor="middle" fill={col("emergency-light")} fillOpacity="0.7" fontSize="8" fontFamily="Sora, sans-serif" letterSpacing="1.4">
                    EGRESS CORE
                  </text>
                </g>

                {/* label */}
                <g>
                  <line x1="672" y1="70" x2="726" y2="46" stroke="#ffffff" strokeOpacity="0.15" />
                  <circle cx="726" cy="46" r="2.4" fill="#F47A20" />
                  <text x="700" y="34" fill="#ffffff" fillOpacity="0.3" fontSize="9" fontFamily="Sora, sans-serif" letterSpacing="2">
                    G+6 TOWER
                  </text>
                </g>
              </svg>

              {/* Readout */}
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-dark mt-2 flex flex-col gap-3 rounded-2xl p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3.5">
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ember-500/18 text-ember-400">
                    <SystemIcon name={current.key} className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-display text-sm font-bold text-white">{current.label}</div>
                    <p className="mt-1 max-w-xl text-[12.5px] leading-relaxed text-white/45">{current.blurb}</p>
                  </div>
                </div>
                <div className="shrink-0 rounded-xl border border-ember-500/25 bg-ember-500/8 px-4 py-2 text-center">
                  <div className="text-[9px] font-semibold tracking-[0.24em] text-white/40 uppercase">Spec</div>
                  <div className="font-display text-[13px] font-bold text-ember-400">{current.metric}</div>
                </div>
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
