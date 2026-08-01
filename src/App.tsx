import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PERF } from "@/lib/perf";
import Preloader from "@/components/Preloader";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Showcase from "@/components/Showcase";
import Industries from "@/components/Industries";
import WhyChoose from "@/components/WhyChoose";
import Projects from "@/components/Projects";
import Clients from "@/components/Clients";
import Certifications from "@/components/Certifications";
import Team from "@/components/Team";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Partners from "@/components/Partners";
import Emergency from "@/components/Emergency";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Lazy from "@/components/Lazy";
import { BRAND, CONTACT } from "@/data/content";
import { WhatsApp } from "@/components/Icons";

export default function App() {
  // Skip the preloader entirely on mobile — it delays first paint by 2s.
  const [ready, setReady] = useState(PERF.lite);

  // Browser-tab icon: prefer an explicitly configured logo, otherwise auto-detect
  // /favicon.png in public/. The drawn SVG mark stays as the final fallback, so a
  // missing file never leaves the tab empty.
  useEffect(() => {
    const candidates = [BRAND.logoUrl, "/favicon.png"].filter(Boolean) as string[];
    if (!candidates.length) return;
    let cancelled = false;
    (async () => {
      for (const src of candidates) {
        try {
          const res = await fetch(src, { method: "HEAD" });
          if (!res.ok) continue;
          if (cancelled) return;
          document
            .querySelectorAll<HTMLLinkElement>("link[rel='icon'], link[rel='apple-touch-icon']")
            .forEach((l) => {
              l.href = src;
              if (l.rel === "icon") l.type = src.endsWith(".svg") ? "image/svg+xml" : "image/png";
            });
          return;
        } catch {
          /* file absent — try the next candidate */
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    // Native anchor scrolling only on mobile & low-end desktops.
    if (PERF.lite) {
      const onClickNative = (e: MouseEvent) => {
        const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const target = document.getElementById(id.slice(1));
        if (!target) return;
        e.preventDefault();
        // Defer the scroll: the mobile menu locks body scroll while open and
        // releases it on the next React commit. Scrolling immediately would be
        // silently ignored, making menu taps appear dead.
        const go = () => {
          const y = target.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        };
        if (document.body.style.overflow === "hidden") {
          setTimeout(go, 90);
        } else {
          go();
        }
      };
      document.addEventListener("click", onClickNative);
      return () => document.removeEventListener("click", onClickNative);
    }

    let cleanup: (() => void) | undefined;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      let raf = 0;
      const loop = (time: number) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      const onClick = (e: MouseEvent) => {
        const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
        if (!a) return;
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: id === "#top" ? 0 : -80, duration: 1.35 });
      };
      document.addEventListener("click", onClick);

      cleanup = () => {
        document.removeEventListener("click", onClick);
        cancelAnimationFrame(raf);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
  }, [ready]);

  return (
    <>
      {!PERF.lite && <Preloader onDone={() => setReady(true)} />}
      <Cursor />

      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-ink-900 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Nav />

      <motion.main
        initial={PERF.lite ? false : { opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Hero always mounts (above the fold) */}
        <Hero />

        {/* Everything below gets lazy-mounted on mobile via IntersectionObserver.
            On desktop `disabled` short-circuits to plain rendering. */}
        <Lazy disabled={!PERF.lite} minHeight={900}>
          <About />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={1600}>
          <Services />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={900}>
          <Showcase />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={900}>
          <Industries />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={1400}>
          <WhyChoose />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={1200}>
          <Projects />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={900}>
          <Clients />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={900}>
          <Certifications />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={1200}>
          <Team />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={1400}>
          <Process />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={700}>
          <Testimonials />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={500}>
          <Partners />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={500}>
          <Emergency />
        </Lazy>
        <Lazy disabled={!PERF.lite} minHeight={1000}>
          <Contact />
        </Lazy>
      </motion.main>

      <Footer />

      {/* Floating WhatsApp */}
      <a
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noreferrer"
        aria-label="Chat with Brounic Group on WhatsApp"
        className="group fixed bottom-6 left-6 z-[90] flex h-12 items-center gap-2.5 rounded-full bg-gradient-to-r from-ember-600 to-flame-500 px-4 text-white shadow-ember transition-transform duration-300 hover:-translate-y-0.5"
      >
        {!PERF.lite && (
          <span
            className="absolute inset-0 animate-ping rounded-full bg-ember-500/25"
            style={{ animationDuration: "3s" }}
          />
        )}
        <WhatsApp className="relative h-5 w-5" />
        <span className="relative hidden text-[12.5px] font-bold sm:inline">24/7 Support</span>
      </a>
    </>
  );
}
