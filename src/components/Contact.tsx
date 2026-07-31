import { AnimatePresence, motion } from "framer-motion";
import { useState, type FormEvent } from "react";
import { CONTACT, SERVICES } from "@/data/content";
import { Eyebrow, Reveal, SplitText } from "@/lib/ui";
import { ArrowRight, Check, Mail, Phone, Pin, SystemIcon, WhatsApp } from "./Icons";

const field =
  "peer w-full rounded-2xl border border-ink-200 bg-white/70 px-4 pb-2.5 pt-6 text-[14px] text-ink-900 outline-none transition-all duration-300 placeholder-transparent focus:border-ember-500 focus:ring-4 focus:ring-ember-500/10";
const label =
  "pointer-events-none absolute left-4 top-4 text-[13px] font-medium text-ink-400 transition-all duration-300 peer-focus:top-2 peer-focus:text-[10.5px] peer-focus:font-semibold peer-focus:tracking-[0.14em] peer-focus:text-ember-600 peer-focus:uppercase peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:text-[10.5px] peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:tracking-[0.14em] peer-[:not(:placeholder-shown)]:uppercase";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1100);
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-45" />
      <div className="pointer-events-none absolute -right-32 top-0 h-[520px] w-[520px] rounded-full bg-ember-500/8 blur-[140px]" />

      <div className="container-x relative">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Get in Touch</Eyebrow>
          </Reveal>
          <SplitText
            as="h2"
            text="Let's engineer your building's protection."
            className="mt-6 font-display text-[2.1rem] leading-[1.08] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-5xl"
          />
          <Reveal delay={0.14}>
            <p className="mt-6 text-[15px] leading-relaxed text-ink-500">
              Share your drawings, scope or challenge. A senior engineer — not a call centre — will respond
              within one business day.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          {/* Form */}
          <Reveal>
            <div className="relative overflow-hidden rounded-[32px] border border-ink-100 bg-gradient-to-br from-ink-50/80 to-white p-7 shadow-lux sm:p-10">
              <AnimatePresence mode="wait">
                {sent ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex min-h-[440px] flex-col items-center justify-center text-center"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 220, damping: 16 }}
                      className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-ember-500 to-flame-500 text-white shadow-ember"
                    >
                      <Check className="h-7 w-7" />
                    </motion.span>
                    <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-ink-900">
                      Request received
                    </h3>
                    <p className="mt-3 max-w-sm text-sm text-ink-500">
                      Thank you. A Brounic engineer will contact you within one business day. For urgent matters
                      call our 24/7 desk on {CONTACT.emergency}.
                    </p>
                    <button
                      onClick={() => setSent(false)}
                      className="mt-8 text-[12px] font-bold tracking-[0.18em] text-ember-600 uppercase"
                    >
                      Send another enquiry
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={submit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <div className="relative">
                      <input id="name" required placeholder="Full name" className={field} />
                      <label htmlFor="name" className={label}>
                        Full Name
                      </label>
                    </div>
                    <div className="relative">
                      <input id="company" placeholder="Company" className={field} />
                      <label htmlFor="company" className={label}>
                        Company
                      </label>
                    </div>
                    <div className="relative">
                      <input id="email" type="email" required placeholder="Email" className={field} />
                      <label htmlFor="email" className={label}>
                        Email Address
                      </label>
                    </div>
                    <div className="relative">
                      <input id="phone" type="tel" placeholder="Phone" className={field} />
                      <label htmlFor="phone" className={label}>
                        Phone Number
                      </label>
                    </div>
                    <div className="relative sm:col-span-2">
                      <select
                        id="service"
                        defaultValue=""
                        className="w-full appearance-none rounded-2xl border border-ink-200 bg-white/70 px-4 pb-2.5 pt-6 text-[14px] text-ink-900 outline-none transition-all duration-300 focus:border-ember-500 focus:ring-4 focus:ring-ember-500/10"
                      >
                        <option value="">Select a service…</option>
                        {SERVICES.map((s) => (
                          <option key={s.key} value={s.key}>
                            {s.title}
                          </option>
                        ))}
                        <option value="other">Other / Multiple systems</option>
                      </select>
                      <span className="pointer-events-none absolute left-4 top-2 text-[10.5px] font-semibold tracking-[0.14em] text-ink-400 uppercase">
                        Service Required
                      </span>
                      <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-ink-400">
                        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="m6 9 6 6 6-6" />
                        </svg>
                      </span>
                    </div>
                    <div className="relative sm:col-span-2">
                      <textarea id="message" rows={5} required placeholder="Message" className={`${field} resize-none`} />
                      <label htmlFor="message" className={label}>
                        Project Details
                      </label>
                    </div>

                    <div className="flex flex-col items-start gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                      <p className="max-w-xs text-[11.5px] leading-relaxed text-ink-400">
                        By submitting you agree to be contacted about your enquiry. We never share your data.
                      </p>
                      <button
                        type="submit"
                        disabled={loading}
                        className="group relative inline-flex shrink-0 items-center gap-2.5 overflow-hidden rounded-full px-8 py-4 text-sm font-semibold text-white shadow-ember transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-70"
                      >
                        <span className="absolute inset-0 bg-gradient-to-r from-ember-600 via-ember-500 to-flame-500 anim-pan" />
                        <span className="relative z-10 flex items-center gap-2.5">
                          {loading ? "Sending…" : "Send Enquiry"}
                          {!loading && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />}
                        </span>
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          {/* Details + map */}
          <div className="flex flex-col gap-5">
            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[32px] bg-ink-950 p-8">
                <div className="absolute inset-0 grid-lines-dark opacity-40" />
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-ember-500/20 blur-3xl" />
                <div className="relative space-y-6">
                  {[
                    { icon: <Pin className="h-4 w-4" />, k: "Head Office", v: CONTACT.address },
                    { icon: <Phone className="h-4 w-4" />, k: "Telephone", v: CONTACT.phone, href: CONTACT.phoneHref },
                    { icon: <Mail className="h-4 w-4" />, k: "Email", v: CONTACT.email, href: `mailto:${CONTACT.email}` },
                    { icon: <SystemIcon name="clock" className="h-4 w-4" />, k: "Business Hours", v: CONTACT.hours },
                  ].map((c) => (
                    <div key={c.k} className="flex gap-4">
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ember-500/15 text-ember-400">
                        {c.icon}
                      </span>
                      <div className="min-w-0">
                        <div className="text-[9.5px] font-bold tracking-[0.24em] text-white/35 uppercase">{c.k}</div>
                        {c.href ? (
                          <a
                            href={c.href}
                            className="mt-1 block text-[13.5px] leading-relaxed font-medium text-white/80 transition-colors hover:text-ember-400"
                          >
                            {c.v}
                          </a>
                        ) : (
                          <div className="mt-1 text-[13.5px] leading-relaxed font-medium text-white/80">{c.v}</div>
                        )}
                      </div>
                    </div>
                  ))}

                  <div className="border-t border-white/10 pt-6">
                    <div className="flex items-center gap-2 text-[9.5px] font-bold tracking-[0.24em] text-flame-400 uppercase">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame-500 opacity-80" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flame-500" />
                      </span>
                      24/7 Emergency
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href={CONTACT.emergencyHref}
                        className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-flame-600 to-flame-500 px-4 py-2.5 text-[12.5px] font-bold text-white"
                      >
                        <Phone className="h-3.5 w-3.5" /> {CONTACT.emergency}
                      </a>
                      <a
                        href={CONTACT.whatsappHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/18 px-4 py-2.5 text-[12.5px] font-bold text-white/85 transition-colors hover:bg-white/10"
                      >
                        <WhatsApp className="h-3.5 w-3.5" /> WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="group relative flex-1 overflow-hidden rounded-[32px] border border-ink-100 shadow-lux">
                <iframe
                  title="Brounic Group office location — Al Dhafra Region, Abu Dhabi"
                   src="https://maps.google.com/maps?q=Mussafah%20Industrial%20Area%20Abu%20Dhabi&z=13&output=embed"
                  className="h-[280px] w-full grayscale transition-all duration-700 group-hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href={CONTACT.mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-[12px] font-bold text-ink-900 shadow-lux backdrop-blur-md transition-transform hover:-translate-y-0.5"
                >
                  <Pin className="h-3.5 w-3.5 text-ember-600" /> Open in Maps
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
