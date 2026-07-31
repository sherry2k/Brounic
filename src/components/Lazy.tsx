import { useEffect, useRef, useState, type ReactNode } from "react";

/** Fired by the nav when an in-page anchor is clicked, so every Lazy
 *  section mounts immediately and the browser can find the target id. */
export const MOUNT_ALL_EVENT = "brounic:mount-all";

export function mountAllSections() {
  window.dispatchEvent(new CustomEvent(MOUNT_ALL_EVENT));
}

/**
 * Only mounts children when the placeholder is within ~1.5 viewports of the
 * scroll position. Before that, renders a plain sized <div> that CARRIES THE
 * SECTION ID, so anchor links still resolve to the right scroll offset.
 *
 * Also listens for MOUNT_ALL_EVENT so nav clicks can force everything to
 * mount before scrolling.
 */
export default function Lazy({
  children,
  id,
  minHeight = 800,
  rootMargin = "150% 0px",
  disabled = false,
}: {
  children: ReactNode;
  /** Same id as the <section> inside — keeps anchors working while unmounted. */
  id?: string;
  minHeight?: number;
  rootMargin?: string;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(disabled);

  useEffect(() => {
    if (disabled || mounted) return;

    const mount = () => setMounted(true);
    window.addEventListener(MOUNT_ALL_EVENT, mount);

    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) {
      setMounted(true);
      return () => window.removeEventListener(MOUNT_ALL_EVENT, mount);
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

    return () => {
      obs.disconnect();
      window.removeEventListener(MOUNT_ALL_EVENT, mount);
    };
  }, [disabled, mounted, rootMargin]);

  if (mounted) return <>{children}</>;

  // Placeholder keeps the id so `document.querySelector('#projects')` works.
  return <div ref={ref} id={id} aria-hidden style={{ minHeight }} />;
}
