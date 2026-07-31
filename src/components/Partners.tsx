import { PARTNERS } from "@/data/content";
import { Eyebrow, Reveal } from "@/lib/ui";
import { PERF } from "@/lib/perf";
import { cn } from "@/utils/cn";

function Row({ items, reverse = false, dur }: { items: string[]; reverse?: boolean; dur: string }) {
  // The marquee runs on ALL devices — a `translateX` keyframe is GPU
  // composited (no layout/paint) so it's cheap. What was actually costly
  // here was `backdrop-blur` + a `blur-xl` glow on every card, so those
  // are dropped on mobile instead of the motion.
  // Slightly slower on mobile so fewer pixels move per frame.
  const duration = PERF.lite ? `${parseInt(dur) * 1.6}s` : dur;

  return (
    <div className="group relative flex overflow-hidden">
      <div
        className="anim-marquee flex shrink-0 items-center gap-4 group-hover:[animation-play-state:paused]"
        style={{
          ["--dur" as string]: duration,
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {[...items, ...items].map((p, i) => (
          <span
            key={`${p}-${i}`}
            className={cn(
              "group/item relative flex h-[86px] w-[220px] shrink-0 items-center justify-center rounded-2xl border border-ink-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-ember-500/30 hover:shadow-lux",
              !PERF.lite && "bg-white/70 backdrop-blur-sm",
            )}
          >
            {!PERF.lite && (
              <span className="pointer-events-none absolute inset-0 rounded-2xl bg-ember-500/0 blur-xl transition-all duration-500 group-hover/item:bg-ember-500/12" />
            )}
            <span className="relative font-display text-[15px] font-extrabold tracking-[0.06em] text-ink-300 transition-colors duration-500 group-hover/item:text-ink-900">
              {p}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  const half = Math.ceil(PARTNERS.length / 2);
  return (
    <section id="partners" className="relative overflow-hidden bg-ink-50/70 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 grid-lines opacity-50" />

      <div className="container-x relative">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal className="flex justify-center">
            <Eyebrow>Technology Partners</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[1.9rem] leading-[1.1] font-extrabold tracking-[-0.035em] text-ink-900 sm:text-4xl">
              We specify only listed, world-class equipment.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-ink-500">
              UL, FM and EN listed products from manufacturers whose spares, firmware and support will still be
              available in twenty years.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-14 space-y-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-ink-50 to-transparent sm:w-40" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-ink-50 to-transparent sm:w-40" />
        <Row items={PARTNERS.slice(0, half)} dur="38s" />
        <Row items={PARTNERS.slice(half)} dur="46s" reverse />
      </div>
    </section>
  );
}
