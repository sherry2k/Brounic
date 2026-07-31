type P = { className?: string };

const base = "none";

export function SystemIcon({ name, className = "h-6 w-6" }: { name: string; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 32 32",
    fill: base,
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "sprinkler":
      return (
        <svg {...common}>
          <path d="M6 6h20M16 6v6" />
          <path d="M11.5 12h9l-1.6 3.2h-5.8z" />
          <path d="M16 15.2v2.4" />
          <path d="M9 21c1.2 1.6 1.6 3.4 1.4 5M16 20.4c.4 2 .4 4 0 5.6M23 21c-1.2 1.6-1.6 3.4-1.4 5" />
        </svg>
      );
    case "alarm":
      return (
        <svg {...common}>
          <rect x="7" y="5" width="18" height="22" rx="2.5" />
          <path d="M10.5 9.5h11M10.5 13h7" />
          <circle cx="16" cy="20" r="3.4" />
          <path d="M16 18.4v1.6l1.2.9" />
        </svg>
      );
    case "emergency-light":
      return (
        <svg {...common}>
          <path d="M9 7h14v7a7 7 0 0 1-14 0z" />
          <path d="M13 21h6l-1 6h-4z" />
          <path d="M5 5l2 2M27 5l-2 2M4 13h2M26 13h2" />
        </svg>
      );
    case "exit":
      return (
        <svg {...common}>
          <rect x="4" y="8" width="24" height="16" rx="2.5" />
          <path d="M11 12v8M11 12h5M11 16h4M11 20h5" />
          <path d="M19 16h6m-2.6-2.8L25 16l-2.6 2.8" />
        </svg>
      );
    case "extinguisher":
      return (
        <svg {...common}>
          <rect x="11" y="10" width="10" height="18" rx="3" />
          <path d="M14 10V7.5a2 2 0 0 1 2-2h1.5" />
          <path d="M17.5 5.5h4.5M22 5.5v4l-4 2.2" />
          <path d="M13.5 15h5" />
        </svg>
      );
    case "call-point":
      return (
        <svg {...common}>
          <rect x="6" y="6" width="20" height="20" rx="3" />
          <path d="M12 12h8v8h-8z" />
          <path d="M12 12l8 8M20 12l-8 8" />
        </svg>
      );
    case "hydrant":
      return (
        <svg {...common}>
          <path d="M12 12a4 4 0 0 1 8 0v11h-8z" />
          <path d="M10 23h12M11 26h10" />
          <path d="M12 8.5h8" />
          <path d="M9 15h3M20 15h3" />
        </svg>
      );
    case "pump":
      return (
        <svg {...common}>
          <circle cx="16" cy="17" r="6.5" />
          <path d="M16 10.5V17l4.2 2.6" />
          <path d="M4 17h5M23 17h5M16 4v3.5" />
          <path d="M6.5 24.5l2.6-2.6M25.5 24.5l-2.6-2.6" />
        </svg>
      );
    case "hose-reel":
      return (
        <svg {...common}>
          <circle cx="15" cy="16" r="9" />
          <circle cx="15" cy="16" r="3.4" />
          <path d="M24 16h3.5v5" />
        </svg>
      );
    case "pava":
      return (
        <svg {...common}>
          <path d="M6 13h4l7-5v16l-7-5H6z" />
          <path d="M21.5 12.5a5 5 0 0 1 0 7M25 9.5a9.5 9.5 0 0 1 0 13" />
        </svg>
      );
    case "suppression":
      return (
        <svg {...common}>
          <path d="M16 4c3.5 4.6 1.2 7 3.5 9.2 1.7 1.7 3.5.6 3.5.6 1.2 7-2.3 13.2-7 13.2S8.6 21 9.8 15.2C10.4 11.7 13 9.9 13.6 7c.4-1.6 1.4-2.3 2.4-3z" />
          <path d="M4 11h4M24 11h4M5 20h3M24 20h3" />
        </svg>
      );
    case "testing":
      return (
        <svg {...common}>
          <path d="M8 4h16v6l-5.5 7v9h-5v-9L8 10z" />
          <path d="M8 4h16" />
          <path d="M13 17h6" />
        </svg>
      );
    case "amc":
      return (
        <svg {...common}>
          <path d="M20.5 6.5a6 6 0 0 0-8 8L7 20a2.8 2.8 0 0 0 4 4l5.5-5.5a6 6 0 0 0 8-8l-3.4 3.4-3-.6-.6-3z" />
        </svg>
      );
    case "design":
      return (
        <svg {...common}>
          <path d="M6 26L16 5l10 21" />
          <path d="M10.5 18h11" />
          <path d="M4 26h24" />
        </svg>
      );
    case "install":
      return (
        <svg {...common}>
          <path d="M16 3l11 6v14l-11 6L5 23V9z" />
          <path d="M5 9l11 6 11-6M16 15v14" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M16 3l11 4v9c0 7-4.6 11.6-11 13C9.6 27.6 5 23 5 16V7z" />
          <path d="M11.5 16l3 3 6-6.5" />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="12" />
          <path d="M16 8.5V16l5 3" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="16" cy="16" r="11" />
        </svg>
      );
  }
}

export const ArrowRight = ({ className = "h-4 w-4" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const Phone = ({ className = "h-4 w-4" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const Mail = ({ className = "h-4 w-4" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2.5" />
    <path d="m3 6.5 9 6 9-6" />
  </svg>
);

export const Pin = ({ className = "h-4 w-4" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0z" />
    <circle cx="12" cy="10" r="2.8" />
  </svg>
);

export const WhatsApp = ({ className = "h-4 w-4" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.04 2C6.6 2 2.2 6.4 2.2 11.84c0 1.74.46 3.44 1.32 4.94L2 22l5.36-1.4a9.9 9.9 0 0 0 4.68 1.19h.01c5.43 0 9.84-4.4 9.84-9.84A9.78 9.78 0 0 0 12.04 2zm5.76 14.02c-.24.68-1.4 1.3-1.94 1.34-.5.05-.98.23-3.32-.7-2.8-1.1-4.57-3.96-4.71-4.15-.14-.19-1.13-1.5-1.13-2.87s.72-2.03.98-2.31c.25-.28.55-.35.73-.35h.53c.17 0 .4-.06.63.48.24.57.8 1.97.87 2.11.07.14.12.31.02.5-.1.19-.15.31-.29.48-.14.16-.3.37-.43.49-.14.14-.29.29-.12.57.17.28.75 1.23 1.6 2 1.1.98 2.02 1.28 2.3 1.42.29.14.45.12.62-.07.17-.19.72-.84.91-1.13.19-.28.38-.23.64-.14.26.1 1.66.78 1.94.92.29.14.48.21.55.33.07.11.07.66-.17 1.34z" />
  </svg>
);

export const LinkedIn = ({ className = "h-4 w-4" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9.5 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95C21.1 8.75 22 11.1 22 14.3V21h-4v-5.9c0-1.4-.03-3.2-2-3.2s-2.3 1.5-2.3 3.1V21h-4z" />
  </svg>
);

export const Check = ({ className = "h-4 w-4" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="m4 12.5 5 5L20 6.5" />
  </svg>
);

export const Star = ({ className = "h-4 w-4" }: P) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 2 2.9 6.2 6.8.9-5 4.7 1.3 6.7L12 17.3 6 20.5l1.3-6.7-5-4.7 6.8-.9z" />
  </svg>
);
