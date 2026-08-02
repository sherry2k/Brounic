import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { BRAND, CONTACT } from "@/data/content";
import { Logo } from "./Logo";
import { ArrowRight, Check, LinkedIn, Mail, Phone, Pin, WhatsApp } from "./Icons";

const FOOTER_ANCHORS: Record<string, string> = {
  "About Brounic": "#about",
  "Vision & Mission": "#about",
  "Leadership Team": "#team",
  "Our Clients": "#clients",
  "Sprinkler Systems": "#services",
  "Fire Alarm & Detection": "#services",
  "Hydrants & Pumps": "#services",
  "Suppression Systems": "#services",
  "PA / Voice Evacuation": "#services",
  "AMC & Maintenance": "#services",
  "Featured Projects": "#projects",
  Certifications: "#certifications",
  "Company Profile (PDF)": "/brounic-company-profile.pdf",
  Downloads: "/brounic-company-profile.pdf",
};

const COLS = [
  {
    title: "Company",
    links: ["About Brounic", "Vision & Mission", "Leadership Team", "Our Clients", "Careers", "Sustainability"],
  },
  {
    title: "Services",
    links: [
      "Sprinkler Systems",
      "Fire Alarm & Detection",
      "Hydrants & Pumps",
      "Suppression Systems",
      "PA / Voice Evacuation",
      "AMC & Maintenance",
    ],
  },
  {
    title: "Resources",
    links: ["Featured Projects", "Certifications", "Company Profile (PDF)", "Datasheets", "Downloads", "FAQ"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "HSE Policy", "Quality Policy", "Cookie Notice"],
  },
];

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const { scrollYProgress } = useScroll();
  const showTop = useTransform(scrollYProgress, [0, 0.08, 1], [0, 1, 1]);

  return (
    <footer className="noise relative overflow-hidden bg-ink-950 pt-20 text-white/70">
      <div className="absolute inset-0 grid-lines-dark opacity-35" />
      <div className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-ember-500/12 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-flame-500/8 blur-[150px]" />

      <div className="container-x relative">
        {/* Newsletter */}
        <div className="grid gap-10 border-b border-white/8 pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <Logo dark />
            <p className="mt-6 max-w-md text-[14px] leading-relaxed text-white/45">
              Brounic Group delivers intelligent, economical fire protection solutions that minimise fire risk and
              safeguard lives, property and business continuity across the United Arab Emirates.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {["ISO 9001", "ISO 45001", "Civil Defence", "ICV Certified"].map((b) => (
                <span
                  key={b}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[10.5px] font-semibold tracking-[0.12em] text-white/50 uppercase"
                >
                  {b}
                </span>
              ))}
            </div>

            {/* Company profile download */}
            <a
              href={BRAND.profilePdf}
              download
              target="_blank"
              rel="noreferrer"
              className="group mt-7 inline-flex items-center gap-3 overflow-hidden rounded-full border border-ember-500/40 bg-ember-500/10 px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-ember-500 hover:bg-ember-500 hover:shadow-ember"
            >
              <svg
                className="h-4 w-4 text-ember-400 transition-colors group-hover:text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v12m0 0 4-4m-4 4-4-4" />
                <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
              </svg>
              Download Company Profile
              <span className="text-[10px] font-semibold tracking-[0.14em] text-white/40 uppercase group-hover:text-white/70">
                PDF
              </span>
            </a>
          </div>

          <div className="rounded-[26px] border border-white/8 bg-white/[0.03] p-7 backdrop-blur-sm">
            <h3 className="font-display text-lg font-bold tracking-tight text-white">
              Fire safety intelligence, quarterly.
            </h3>
            <p className="mt-2 text-[13px] leading-relaxed text-white/45">
              Code updates, NFPA revisions and maintenance guidance from our engineering desk.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubscribed(true);
              }}
              className="mt-5 flex gap-2"
            >
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="min-w-0 flex-1 rounded-full border border-white/12 bg-white/5 px-5 py-3 text-[13.5px] text-white outline-none transition-all placeholder:text-white/30 focus:border-ember-500/60 focus:ring-4 focus:ring-ember-500/10"
              />
              <button
                type="submit"
                className="group relative inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full px-5 py-3 text-[13px] font-bold text-white shadow-ember"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-ember-600 to-flame-500" />
                <span className="relative z-10 flex items-center gap-2">
                  {subscribed ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  <span className="hidden sm:inline">{subscribed ? "Subscribed" : "Subscribe"}</span>
                </span>
              </button>
            </form>
          </div>
        </div>

        {/* Link columns */}
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-6">
          {COLS.map((c) => (
            <nav key={c.title} className="lg:col-span-1" aria-label={c.title}>
              <h4 className="font-display text-[11px] font-bold tracking-[0.24em] text-white/85 uppercase">
                {c.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l}>
                    <a
                      href={FOOTER_ANCHORS[l] ?? "#contact"}
                      className="group inline-flex items-center gap-1.5 text-[13px] text-white/45 transition-colors hover:text-ember-400"
                    >
                      <span className="h-px w-0 bg-ember-500 transition-all duration-300 group-hover:w-3" />
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div className="sm:col-span-2">
            <h4 className="font-display text-[11px] font-bold tracking-[0.24em] text-white/85 uppercase">
              Head Office
            </h4>
            <div className="mt-5 space-y-4">
              <div className="flex gap-3">
                <Pin className="mt-0.5 h-4 w-4 shrink-0 text-ember-500" />
                <span className="text-[13px] leading-relaxed text-white/45">{CONTACT.address}</span>
              </div>
              <a href={CONTACT.phoneHref} className="flex items-center gap-3 text-[13px] text-white/45 hover:text-ember-400">
                <Phone className="h-4 w-4 shrink-0 text-ember-500" /> {CONTACT.phone}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-[13px] text-white/45 hover:text-ember-400">
                <Mail className="h-4 w-4 shrink-0 text-ember-500" /> {CONTACT.email}
              </a>
            </div>
            <div className="mt-6 flex gap-2.5">
              {[
                { i: <LinkedIn className="h-4 w-4" />, href: "https://www.linkedin.com/company/brounic-group", l: "LinkedIn" },
                { i: <WhatsApp className="h-4 w-4" />, href: CONTACT.whatsappHref, l: "WhatsApp" },
                { i: <Mail className="h-4 w-4" />, href: `mailto:${CONTACT.email}`, l: "Email" },
                { i: <Phone className="h-4 w-4" />, href: CONTACT.phoneHref, l: "Call" },
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.href}
                  aria-label={s.l}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/55 transition-all hover:-translate-y-0.5 hover:border-ember-500/40 hover:bg-ember-500/10 hover:text-ember-400"
                >
                  {s.i}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="relative select-none overflow-hidden pb-6">
          <div className="bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text text-center font-display text-[15vw] leading-[0.85] font-extrabold tracking-[-0.05em] text-transparent">
            BROUNIC
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/8 py-7 sm:flex-row">
          <p className="text-[12px] text-white/35">
            © {new Date().getFullYear()} Brounic Group Fire &amp; Safety. All rights reserved.
          </p>
          <p className="text-[12px] text-white/25">
            Design · Supply · Installation · Testing · Commissioning · Maintenance
          </p>
        </div>
      </div>

      {/* Back to top */}
      <motion.a
        href="#top"
        style={{ opacity: showTop }}
        aria-label="Back to top"
        className="group fixed bottom-6 right-6 z-[90] flex h-12 w-12 items-center justify-center rounded-full border border-white/12 bg-ink-900/80 text-white shadow-lux backdrop-blur-xl transition-all hover:border-ember-500/50 hover:bg-ember-500"
      >
        <motion.span animate={{ y: [0, -3, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ArrowRight className="h-4 w-4 -rotate-90" />
        </motion.span>
        <svg className="pointer-events-none absolute inset-0 h-12 w-12 -rotate-90" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="22" fill="none" stroke="rgba(244,122,32,0.25)" strokeWidth="1.5" />
        </svg>
      </motion.a>
    </footer>
  );
}
