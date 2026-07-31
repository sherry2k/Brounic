/**
 * Central performance/environment detection.
 * Called once at mount; result is memoized via a module-level cache
 * so components can `import { PERF } from '@/lib/perf'` cheaply.
 */

type PerfFlags = {
  /** Coarse pointer (touchscreen). */
  touch: boolean;
  /** Viewport under 900px on first paint. */
  mobile: boolean;
  /** User asked for reduced motion. */
  reduced: boolean;
  /** Data-saver / 2G / 3G / hardware concurrency < 4. */
  lowPower: boolean;
  /** Combined — most animations should skip when this is true. */
  lite: boolean;
};

function detect(): PerfFlags {
  if (typeof window === "undefined") {
    return { touch: false, mobile: false, reduced: false, lowPower: false, lite: false };
  }

  const touch = window.matchMedia("(pointer: coarse)").matches;
  const mobile = window.innerWidth < 900;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const conn = (navigator as unknown as {
    connection?: { effectiveType?: string; saveData?: boolean };
  }).connection;
  const cores = (navigator as unknown as { hardwareConcurrency?: number }).hardwareConcurrency ?? 8;
  const mem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;

  const lowPower =
    !!conn?.saveData ||
    (!!conn?.effectiveType && !/4g/.test(conn.effectiveType)) ||
    cores < 4 ||
    mem < 4;

  const lite = reduced || mobile || lowPower;

  return { touch, mobile, reduced, lowPower, lite };
}

export const PERF: PerfFlags =
  typeof window === "undefined"
    ? { touch: false, mobile: false, reduced: false, lowPower: false, lite: false }
    : detect();
