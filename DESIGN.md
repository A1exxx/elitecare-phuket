# DESIGN.md — Phuket Elite Care

Design system for the marketing site. Colors are sampled from the client's actual assets (logo PNG, the vehicle wrap, and the current ad creatives), not chosen from a palette generator.

## Color

Brand colors are fixed. Neutrals are tinted toward the brand hues; no pure `#000` / `#fff` on any surface.

| Role | Hex | Notes |
|---|---|---|
| Navy 900 (primary) | `#1B1B2F` | Sampled from logo + ad creative. Dark sections, headings. |
| Navy 950 | `#15151F` | Footer. |
| Navy 800 | `#23233B` | Gradient partner for the map card. |
| Terracotta 500 (accent) | `#E27B54` | Sampled from ad creative + vehicle wrap. CTAs, icons, `<em>`. |
| Terracotta 600 | `#C8623D` | Hover, eyebrow text (darkened for contrast on cream). |
| Terracotta 100 | `#FBE4D8` | Icon tiles, focus ring. |
| Cream 50 (background) | `#FAF6F0` | Page ground. Warm, never white. |
| Cream 100 | `#F3ECE2` | Alternating section bands. |
| Sand 200 | `#E8DFD2` | Borders, rules. |
| Ink | `#33313A` | Body text. Warm-tinted, not black. |
| Ink soft | `#6B6873` | Secondary text. |

**Color strategy: Committed.** Navy carries the dark bands (trust bar, reviews, footer) and terracotta owns every interactive affordance. Terracotta never appears as decoration where it could be mistaken for a control.

## Theme

Light, warm. The scene: a villa owner in Bang Tao opening the site on a phone in full tropical daylight, mid-morning, wanting to know who to call about the pool. A dark UI would fight the ambient light and would also fight the photography, which is bright, sunlit and shot outdoors. The dark navy is used as *punctuation* between light sections, not as the ground.

## Typography

- **Outfit** (300–700) — all UI, headings and body. Geometric, clean, no personality tics.
- **Playfair Display** italic (500–600) — *accent only*: the emphasized phrase inside `h1`, the step numerals in the process section, the review score. Never for body, never for a full heading.

Scale is fluid via `clamp()`; steps keep a ≥1.25 ratio. Body is 16px minimum (prevents iOS auto-zoom on form inputs). Body copy is capped at 50–65ch.

## Elevation

Two shadows only, both tinted toward navy rather than neutral black:

- `--shadow-soft: 0 24px 60px -30px rgba(27,27,47,0.28)` — hero image, map card hover.
- `--shadow-card: 0 16px 40px -24px rgba(27,27,47,0.22)` — bento cards on hover, info card.

No glow, no glass. `backdrop-filter: blur(14px)` is used exactly once, on the sticky header, where it has an actual job: keeping nav legible over scrolling photography.

## Motion

- Single easing token: `cubic-bezier(0.16,1,0.3,1)` (ease-out-expo family). No bounce, no elastic, no `linear`.
- Durations: `180ms` micro (hover, focus), `300ms` base (card lift), `500ms` slow (scroll reveal).
- Only `transform` and `opacity` are animated. No layout properties.
- Scroll reveal is a 22px rise + fade, staggered ≤60ms per item, driven by `IntersectionObserver` and unobserved after firing.
- `prefers-reduced-motion: reduce` disables all of it and forces `.reveal` to its resting state.

## The blueprint

The turnkey-package section is drafting paper: a fine grid, a heavier line every fifth square, and a hand-authored architectural elevation of a villa (pool, palms, dimension line, the logo's sparkle) that draws itself line by line the first time the section scrolls into view. Stroke ends are staggered 70ms apart, so it reads as a hand moving across the page rather than a canned animation.

It exists because the section used to be a flat navy rectangle. It stays quiet: strokes fade out toward the top via an SVG gradient rather than a CSS mask (a mask over a layer that transforms every frame forces re-rasterisation), and the whole drawing drifts a few pixels against the scroll and toward the cursor. That parallax is the only "3D" here, and it is transform-only.

`prefers-reduced-motion` shows the elevation already drawn, with no drift.

## Layout

- Container `1240px`. Sections alternate cream-50 / cream-100 / navy to create rhythm without dividers.
- **Hero is asymmetric** (1.05fr / 0.95fr split, text left, photograph right). Not centered.
- **Services use a 4-column bento** where the two strategically important services (Rental & Property Management, Villa Technical Check-up) span two columns and the rest span one. Deliberately not a 3×3 grid of identical cards.
- Gallery is a 4-column grid, two rows, with one span-2 tile per row so the rhythm is uneven.
- Breakpoints: 1024 (two-column collapse), 768 (single column, hamburger nav), 480 (single-column pricing/gallery).

## Components

- **Buttons.** Fully rounded (`999px`). Primary is terracotta on cream; ghost is a sand-bordered outline. `:active` scales to `0.97`. Minimum height 44px.
- **Icons.** One hand-drawn SVG sprite, `stroke-width: 1.6` line icons with three deliberate solid exceptions (sparkle, star, bolt) that echo the logomark. No emoji, no icon-font, no mixed families.
- **Bento cards.** Border `1px` sand, lift `-4px` on hover, border fades out as the shadow arrives. No side-stripe accents.
- **Form fields.** Label above input, always visible. Focus is a terracotta border plus a 3px terracotta-100 ring, never a removed outline.
- **Map.** A navy gradient card linking to the Google Maps listing. Not an embedded iframe: the embed blocked rendering and cost a third-party request for a static address.

## Bans specific to this project

- No stock photography, ever. Only real Elite Care job photos.
- No invented testimonial quotes. Link the Google listing instead.
- No purple, no teal, no gradient text, no glassmorphic cards, no palm-frond dividers.
- No second conversion path competing with WhatsApp.
