import { motion } from "framer-motion";
import { CONTACT } from "@/data/content";
import { Counter, Reveal } from "@/lib/ui";
import { PERF } from "@/lib/perf";
import { ArrowRight, Phone, SystemIcon, WhatsApp } from "./Icons";

export default function Emergency() {
  return (
    <section className="relative px-5 py-14 md:px-10">
      <Reveal>
        <div className="noise relative mx-auto max-w-[84rem] overflow-hidden rounded-[36px] bg-gradient-to-br from-flame-600 via-flame-500 to-ember-500 p-8 sm:p-12 lg:p-16">
          {/* animated backdrop */}
          <div className="absolute inset-0 opacity-25 grid-lines-dark" />
          {!PERF.lite ? (
            <>
              <motion.div
                className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/20 blur-[90px]"
                animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-ember-300/25 blur-[100px]"
                animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
                transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          ) : (
            <>
              <span className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/20 blur-[70px]" />
              <span className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-ember-300/25 blur-[70px]" />
            </>
          )}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.09]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(135deg, #fff 0 2px, transparent 2px 22px)",
            }}
          />

          <div className="relative flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/12 px-4 py-1.5 text-[10.5px] font-bold tracking-[0.24em] text-white uppercase backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
                </span>
                Emergency Desk Online
              </div>

              <h2 className="mt-6 font-display text-[2.1rem] leading-[1.05] font-extrabold tracking-[-0.035em] text-white sm:text-5xl">
                24/7 Emergency
                <br />
                Fire System Support
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/80">
                Panel in fault? Pump failed a test? Sprinkler leak? Our response engineers are dispatched within
                four hours, anywhere in the UAE.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={CONTACT.emergencyHref}
                  className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-4 text-sm font-bold text-flame-600 shadow-xl transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <Phone className="h-4 w-4" />
                  Call {CONTACT.emergency}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/35 bg-white/10 px-7 py-4 text-sm font-bold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <WhatsApp className="h-4 w-4" />
                  WhatsApp Us
                </a>
              </div>
            </div>

            <div className="grid w-full max-w-sm grid-cols-2 gap-px overflow-hidden rounded-3xl border border-white/25 bg-white/20 backdrop-blur-md lg:w-auto">
              {[
                { icon: "clock", v: 4, s: " hrs", l: "Response SLA" },
                { icon: "shield", v: 380, s: "+", l: "Sites Covered" },
                { icon: "amc", v: 24, s: "/7", l: "Desk Availability" },
                { icon: "install", v: 50, s: "+", l: "Field Engineers" },
              ].map((b) => (
                <div key={b.l} className="bg-flame-600/25 px-6 py-6 backdrop-blur-sm">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white">
                    <SystemIcon name={b.icon} className="h-4 w-4" />
                  </span>
                  <div className="mt-3 font-display text-2xl font-extrabold text-white">
                    <Counter to={b.v} suffix={b.s} />
                  </div>
                  <div className="mt-0.5 text-[10.5px] font-semibold tracking-[0.12em] text-white/70 uppercase">
                    {b.l}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
