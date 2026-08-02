import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Only mounts children when the placeholder is within 1.5 viewports of the
 * scroll position. Before that, renders a plain sized <div> so page height
 * stays correct and scroll depth doesn't jump.
 *
 * This is the biggest mobile-perf win in the codebase — instead of mounting
 * ~15 sections × dozens of framer-motion components on first paint, we only
 * mount what's about to be seen. Skipped entirely on desktop where the
 * browser handles it fine.
 */
export default function Lazy({
  children,
  minHeight = 800,
  rootMargin = "150% 0px",
  disabled = false,
  id,
}: {
  /** Optional: if the parent passes a section id (e.g. "services"), the
   * observer is forced to observe immediately so menu navigation works. */
  id?: string;
  children: ReactNode;
  /** Fallback height so the page doesn't collapse before mount. */
  minHeight?: number;
  rootMargin?: string;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(disabled || !!id);

  useEffect(() => {
    if (disabled || mounted) return;
    const el = ref.current;
    if (!el) return;

    // Fallback for very old browsers
    if (!("IntersectionObserver" in window)) {
      setMounted(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setMounted(true);
            obs.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [disabled, mounted, rootMargin]);

  if (mounted) return <>{children}</>;

  return <div ref={ref} aria-hidden style={{ minHeight }} />;
}
