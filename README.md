# Phuket Elite Care — website

Marketing site for **Phuket Elite Care Property Maintenance Co., Ltd.**, a licensed villa-care company on Phuket's west coast (Cherngtalay / Bang Tao / Laguna).

**Live:** https://a1exxx.github.io/elitecare-phuket/

## What it is

A single static page. No build step, no framework, no dependencies: `index.html` + `styles.css` + `script.js`.

The only conversion path is WhatsApp. The quote form collects the same details the office asks for by hand (service, property type, bedrooms, bathrooms, size in m², location, preferred visit time) and opens a pre-filled message to **+66 66 074 8105**. Nothing is sent until the user presses send in WhatsApp.

## Ground rules for this content

- **Work photography is documentary.** Every image of a job is a real Elite Care employee on a real villa.
- **The hero background is licensed stock** (Pexels — photo by Vero Benedini, free for commercial use), used at the owner's direction because no photo of a premium villa the company services exists yet. It is decorative. **Swap it for a real villa the moment one is available.** Before/after renovation photos must never be stock: that would be a false claim about work performed.
- **No invented social proof.** The 5.0★ / 23-review figure is real and links to the Google Maps listing. The review *texts* were never obtainable, so no testimonial quotes are printed.
- **Prices are the real rate card** and are labelled as excluding 7% VAT, confirmed after a free on-site assessment. The ฿17,000/month turnkey package and its 21-service scope come from the company's live advertising.

## Languages

Four languages, switched client-side (`i18n.js`, no page reload). The choice persists in `localStorage` and can be forced with `?lang=en|ru|th|zh`.

English and Russian are written natively. **Thai and Chinese are drafts and still need a native review pass** before this goes in front of customers — the client's team includes Thai speakers.

## Outstanding requests to the client

1. Photographs of premium villas they actually service (to replace the stock hero).
2. Before/after photo pairs from completed renovations (the renovation section is built to receive them).
3. Three or four review quotes cleared for publication.

See [PRODUCT.md](PRODUCT.md) for positioning and [DESIGN.md](DESIGN.md) for the design system. Brand colours were sampled from the client's own logo, vehicle wrap and ad creative, not chosen from a palette.

## Local development

```bash
python -m http.server 8975
# open http://127.0.0.1:8975/
```

## Images

The repository ships optimised `.webp` (≈1.5 MB total, down from 10.5 MB of source PNG/JPG). Source photography stays out of git — see `.gitignore`. To regenerate after adding a new source photo, resize to max 1400px wide and export WebP at quality 80.

## Accessibility

Verified, not assumed: all text meets WCAG AA contrast (the primary CTA uses a darkened terracotta because white on the brand coral only reaches 2.92:1), no horizontal scroll from 360px to 1440px, sequential heading order, alt text on every image, a skip link, visible focus rings, and `prefers-reduced-motion` disables all motion.
