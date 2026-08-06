# Hero photo + layout and content fixes

## 1. Family photo in the hero — recommendation
Yes, a personal photo adds relevance, but a full-bleed background photo behind the headline usually hurts readability and looks dated. Better: keep the clean editorial hero and place the photo as a framed image beside the text (two-column on desktop, stacked on mobile). The old site's `header-bg.jpg` is a 3-up collage of you and the kids — I can crop it into a single frame, or you can upload a current family photo.

Fallback if you prefer the background look: full-width photo band with a soft ink overlay and the headline on top — I'll only do that if you say so.

## 2. Remove the extra divider above About
The About section heading renders its own bottom border, and the hero section above it also has a bottom border, producing two lines. Remove the hero's bottom border.

## 3. Tighten side margins
The header uses a 5xl container while the page content uses 3xl, so content looks narrow and the page runs long. Move the main content to the same 5xl width and slightly reduce vertical section padding so the page reads shorter.

## 4. Rename venture
"Cozy Home Partners" becomes "Cozy Home" in the navbar and the Ventures section.

## 5. Cozy Home link
Point it to https://www.cozyhomepartners.com/ in both places.

## 6. VacayBug press links
Remove the VacayBug screenshot and add three press/media links under its description:
- Product Hunt
- Explore Inspired
- WWWhat's New

## Technical notes
All changes live in `src/routes/index.tsx`. The hero photo would be added to `src/assets` and imported; no new dependencies, no backend changes.
