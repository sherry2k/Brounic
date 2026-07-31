# Brounic Group — Deployment & Editing Guide

Production build: `npm run build` → outputs a **single self-contained `dist/index.html`**
(all CSS + JS inlined). Upload that one file to any host — Netlify, Vercel, cPanel,
S3, or straight into your existing web root. No server or Node runtime required.

---

## 1. Your logo

Open **`src/data/content.ts`** → `BRAND` block at the very top.

```ts
export const BRAND = {
  logoUrl: "",        // ← set to "/logo.png"
  logoHeight: 40,     // ← header height in px
  name: "BROUNIC GROUP",
  tagline: "FIRE & SAFETY",
  siteUrl: "https://www.brounicgroup.com",
};
```

Steps:
1. Save your file as `public/logo.png` (transparent PNG or SVG).
2. Set `logoUrl: "/logo.png"`.
3. Rebuild.

It replaces the drawn mark in the **header, mobile menu, preloader, footer and the
certificate document**. Leaving it `""` keeps the current SVG mark with the
`BROUNIC GROUP` / `FIRE & SAFETY` two-line lockup.

> Note: because the build inlines everything into one HTML file, a logo in
> `public/` stays as a separate file next to `index.html`. Keep them together.
> To make it truly single-file, paste a base64 data-URI into `logoUrl` instead.

---

## 2. Client logos (`#clients` section)

**`src/data/content.ts`** → `CLIENTS` array. Each entry:

```ts
{ name: "TAQA", abbr: "TAQA", color: "#1B75BB", sub: "طاقة", logo: "/clients/taqa.png" }
```

- Drop files into `public/clients/`.
- Add the `logo:` path to the matching entry.
- Any entry **without** `logo` renders the branded typographic placeholder — so you
  can add logos gradually without breaking the grid.

All 20 clients from your profile slide are already listed in the correct order.

---

## 3. Certificates (`#certifications` section)

**`src/data/content.ts`** → `CERTS` array (10 cards).

```ts
{
  code: "ISO 9001:2015",
  name: "Quality Management System",
  issuer: "International Accredited",
  tone: "ember",              // "ember" | "ink" | "flame" — card accent
  no: "QMS-2024-1187",        // certificate number
  scope: "…",                 // shown in the popup
  valid: "Valid through Dec 2027",
  image: "/certificates/iso9001.jpg",   // ← optional real scan
}
```

- **Without `image`** → the popup renders the designed certificate document
  (ornamental frame, ember seal, signature line, cert number).
- **With `image`** → the popup shows your actual scan at full size instead.
- Put scans in `public/certificates/`. JPG or PNG, ideally ≥1400px wide.

Popup controls: click card to open · ← → keys or arrow buttons to browse ·
Esc or backdrop click to close.

---

## 4. Contact details, address, phone numbers

**`src/data/content.ts`** → `CONTACT` object. Update `address`, `phone`,
`emergency`, `email`, `hours`, `whatsappHref`, and the Google Maps query.
These feed the contact section, footer, header emergency pill, emergency banner
and the floating WhatsApp button simultaneously.

---

## 5. Leadership & org chart

**`src/data/content.ts`**
- `TEAM` → the two executive cards (CEO, General Manager) with photo + bio.
- `ORG_REPORTS` → the three boxes beneath the GM (Secretary, Engineering
  Manager, Projects Head). Add or remove entries and the connectors re-flow.

Replace the placeholder portraits by setting `img:` to `/team/ahmed.jpg` etc.
after adding files to `public/team/`.

---

## 6. Other content

| What | Where in `src/data/content.ts` |
|---|---|
| Navigation items | `NAV` |
| Hero statistics | `HERO_STATS` |
| Company timeline (2011 → today) | `TIMELINE` |
| Core values | `VALUES` |
| 15 services + expand detail | `SERVICES` |
| Interactive building systems | `SYSTEMS` |
| Industries grid | `INDUSTRIES` |
| Why-choose reasons | `WHY` |
| Featured projects + filters | `PROJECTS` |
| Process steps | `PROCESS` |
| Testimonials | `TESTIMONIALS` |
| Technology partners marquee | `PARTNERS` |

Imagery currently streams from Pexels CDN via the `IMG` map. Swap any value for a
local path (`/images/hero.jpg`) once you have your own photography.

---

## 7. SEO

`index.html` holds the title, meta description, Open Graph tags, canonical URL and
two JSON-LD schema blocks (Organization + Service). Update the phone numbers,
address and `siteUrl` there to match `CONTACT` before going live.

---

## 8. Brand colours

`src/index.css` → `@theme` block.
`--color-ember-*` is the orange scale, `--color-flame-*` the emergency red,
`--color-ink-*` the charcoal neutrals. Change the hex values and the entire site
re-themes, including gradients, glows and the certificate seal.
