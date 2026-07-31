import { BRAND } from "@/data/content";
import { cn } from "@/utils/cn";

/**
 * ── Swappable brand logo ─────────────────────────────────────────────
 * Configure in src/data/content.ts → BRAND.logoUrl
 *   1. Drop your file into /public          → public/logo.png
 *   2. Set BRAND.logoUrl = "/logo.png"
 * The image then replaces the drawn mark in the header, mobile menu,
 * preloader, footer and the certificate document — the wordmark text
 * ("BROUNIC GROUP / FIRE & SAFETY") always stays beside it.
 *
 * On dark surfaces (transparent hero header, mobile menu, footer) the
 * image automatically gets a white rounded tile behind it so black or
 * dark logo areas stay fully legible. On light surfaces it renders plain.
 * Transparent PNG or SVG recommended. Leave "" to keep the drawn mark.
 */
export const LOGO_URL = BRAND.logoUrl;

/** Drawn fallback mark (used when no custom logo file is configured). */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" aria-hidden>
      <defs>
        <linearGradient id="bg-ember" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF9A3F" />
          <stop offset="55%" stopColor="#F47A20" />
          <stop offset="100%" stopColor="#E8321F" />
        </linearGradient>
      </defs>
      <path
        d="M6 44C10 20 26 10 39 13c9 2 13 11 8 17-4.6 5.4-13.4 3.6-14.4-3-1-6.8 6.6-11 15.4-8.4C56 21 60 30 59 40"
        stroke="url(#bg-ember)"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M6 53c6-14 20-21 33-19 8 1.3 14 6 17 13"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.92"
      />
    </svg>
  );
}

export function Logo({
  className,
  dark = false,
  compact = false,
}: {
  className?: string;
  /** True when rendered over a dark/black surface */
  dark?: boolean;
  compact?: boolean;
}) {
  const [first, ...rest] = BRAND.name.split(" ");

  const icon = LOGO_URL ? (
    <img
      src={LOGO_URL}
      alt={`${BRAND.name} logo`}
      className="w-auto shrink-0 object-contain"
      style={{ height: dark ? Math.min(BRAND.logoHeight, 34) : BRAND.logoHeight }}
    />
  ) : (
    <LogoMark className={cn("h-9 w-9 shrink-0", dark ? "text-white/85" : "text-ink-900")} />
  );

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      {/* White tile keeps dark/black logo areas legible on dark surfaces */}
      {LOGO_URL && dark ? (
        <span className="flex shrink-0 items-center justify-center rounded-xl bg-white px-3 py-1.5 shadow-[0_2px_12px_rgba(0,0,0,0.3),inset_0_0_0_1px_rgba(255,255,255,0.25)]">
          {icon}
        </span>
      ) : (
        icon
      )}

      <div className="leading-none">
        <div
          className={cn(
            "font-display text-[17px] font-extrabold tracking-tight",
            dark ? "text-white" : "text-ink-900",
          )}
        >
          {first} <span className="text-ember-500">{rest.join(" ")}</span>
        </div>
        {!compact && (
          <div
            className={cn(
              "mt-1 text-[8.5px] font-semibold tracking-[0.42em]",
              dark ? "text-white/45" : "text-ink-400",
            )}
          >
            {BRAND.tagline}
          </div>
        )}
      </div>
    </div>
  );
}
