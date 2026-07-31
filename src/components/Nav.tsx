import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV, CONTACT } from "@/data/content";
import { Logo } from "./Logo";
import { ArrowRight, Phone } from "./Icons";
import { cn } from "@/utils/cn";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const { scrollYProgress } = useScroll();
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled ? "py-2.5" : "py-4",
        )}
      >
        <div className="container-x">
          <div
            className={cn(
              "flex items-center justify-between rounded-2xl px-4 transition-all duration-500 md:px-5",
              scrolled
                ? "border border-ink-200/60 bg-white/78 py-2.5 shadow-lux backdrop-blur-2xl"
                : "border border-transparent py-3",
            )}
          >
            <a
              href="#top"
              aria-label="Brounic Group home"
              className={cn(
                "shrink-0 rounded-xl px-2.5 py-1.5 transition-all duration-500",
                scrolled
                  ? "bg-transparent"
                  : "bg-white/95 shadow-sm backdrop-blur-sm",
              )}
            >
              <Logo />
            </a>

            <nav className="hidden items-center gap-0 lg:flex" aria-label="Primary">
              {NAV.map((item) => {
                const isActive = active === item.href.slice(1);
                return (
                  <a
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "group relative rounded-full px-2.5 py-2 text-[12px] font-medium transition-colors duration-300 xl:px-3.5 xl:text-[13px]",
                      scrolled
                        ? isActive
                          ? "text-ember-600"
                          : "text-ink-600 hover:text-ink-900"
                        : isActive
                          ? "text-ember-400"
                          : "text-white/70 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-2.5 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-ember-500 to-flame-500 transition-transform duration-400 group-hover:scale-x-100 xl:inset-x-3.5",
                        isActive && "scale-x-100",
                      )}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-2.5">
              <a
                href={CONTACT.emergencyHref}
                className={cn(
                  "hidden items-center gap-2 rounded-full border px-3.5 py-2 text-[12px] font-semibold transition-colors xl:inline-flex",
                  scrolled
                    ? "border-flame-500/25 bg-flame-500/8 text-flame-600 hover:bg-flame-500/14"
                    : "border-white/15 bg-white/8 text-white backdrop-blur-md hover:bg-white/14",
                )}
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-flame-500 opacity-80" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-flame-500" />
                </span>
                24/7 Emergency
              </a>

              <a
                href="#contact"
                className="group relative hidden overflow-hidden rounded-full px-5 py-2.5 text-[12.5px] font-semibold text-white shadow-ember sm:inline-flex"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-ember-600 via-ember-500 to-flame-500 anim-pan" />
                <span className="relative z-10 flex items-center gap-2">
                  Get a Quote <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </a>

              <button
                onClick={() => setOpen(true)}
                aria-label="Open menu"
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-xl border transition-colors xl:hidden",
                  scrolled ? "border-ink-200 text-ink-800" : "border-white/18 text-white",
                )}
              >
                <span className="flex flex-col gap-[5px]">
                  <span className="block h-px w-4.5 bg-current" style={{ width: 18 }} />
                  <span className="block h-px bg-current" style={{ width: 12 }} />
                </span>
              </button>
            </div>
          </div>
        </div>

        <motion.div
          className="mx-auto mt-1 h-px bg-gradient-to-r from-ember-500 via-flame-500 to-ember-500"
          style={{ width: barWidth }}
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] bg-ink-950/95 backdrop-blur-xl xl:hidden"
          >
            <div className="container-x flex h-full flex-col py-6">
              <div className="flex items-center justify-between">
                <span className="rounded-xl bg-white/95 px-2.5 py-1.5">
                  <Logo compact />
                </span>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 text-white"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
                    <path d="M5 5l14 14M19 5L5 19" />
                  </svg>
                </button>
              </div>

              <nav className="mt-12 flex flex-col gap-1 overflow-y-auto">
                {NAV.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="group flex items-center justify-between border-b border-white/8 py-4 font-display text-2xl font-semibold text-white/85"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 text-ember-500 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
                  </motion.a>
                ))}
              </nav>

              <div className="mt-auto space-y-3 pt-8">
                <a
                  href={CONTACT.emergencyHref}
                  className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-flame-600 to-flame-500 py-3.5 text-sm font-semibold text-white"
                >
                  <Phone className="h-4 w-4" /> Emergency {CONTACT.emergency}
                </a>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-full border border-white/18 py-3.5 text-sm font-semibold text-white"
                >
                  Request a Quote
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
