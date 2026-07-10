# Phuket Elite Care — website

Marketing site for **Phuket Elite Care Property Maintenance Co., Ltd.**, a licensed villa-care company on Phuket's west coast (Cherngtalay / Bang Tao / Laguna).

**Live:** https://a1exxx.github.io/elitecare-phuket/

## What it is

A single static page. No build step, no framework, no dependencies: `index.html` + `styles.css` + `script.js`.

The only conversion path is WhatsApp. The quote form collects the same details the office asks for by hand (service, property type, bedrooms, bathrooms, size in m², location, preferred visit time) and opens a pre-filled message to **+66 66 074 8105**. Nothing is sent until the user presses send in WhatsApp.

## Ground rules for this content

- **Photography is documentary.** Every image is a real Elite Care employee on a real job. No stock, ever.
- **No invented social proof.** The 5.0★ / 23-review figure is real and links to the Google Maps listing. The review *texts* were never obtainable, so no testimonial quotes are printed.
- **Prices are the real rate card** and are labelled as excluding 7% VAT, confirmed after a free on-site assessment.

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
