# Rebuild charleshsieh.com as a personal site

Move the site away from a resume/GTM page and toward a personal home: who I am, what I'm into, travel writing, thoughts, and the things I build for fun. NextRoot Ventures becomes the professional destination and is linked, not duplicated.

## Design recommendation

Warm and colorful, but still readable and grown-up, not a rainbow.

- Palette: warm sand paper background (#faf8f5) with a deeper clay ink (#2b2018) for text, and three warm accents used as section/topic colors: terracotta (#c4654a), marigold (#e0a33a), and a teal counterpoint (#2d8a8a) so it stays colorful rather than monochrome-warm. Accents color category tags, links, and card edges, never whole backgrounds.
- Typography: Lora headings, Nunito Sans body. Larger, looser body text than the current site since this is a reading site.
- Layout: magazine. Featured piece up top, then a grid of cards. Rounded corners, soft warm shadows, photo-forward.
- Motion: subtle fade/rise on scroll, gentle card hover lift. Nothing flashy.

## Page structure

1. Header, name plus a friendly one-liner, nav: About, Travel, Writing, Building, NextRoot (external).
2. Hero, family photo alongside a short human intro in first person. Primary link to NextRoot Ventures for anything work related.
3. Featured, one large card for the most recent travel post or essay.
4. Travel, grid of trip entries with photo, place, and a short blurb. Links out to the Hsiehnanigans YouTube channel.
5. Writing / thoughts, list of short essays with title, date, and one-line summary.
6. Passion work, three cards:
   - NextRoot Ventures, nextrootsventures.com, my professional home for advising and GTM work.
   - Cozy Home Partners, cozyhomepartners.com, buying and thoughtfully renovating homes.
   - Roofolio, roofolio.ai, an operating system for rental investors, property search, deal analysis, and portfolio operations in one workflow.
7. About me, longer personal section: background, family, interests, engineering roots, with a light nod to career and a link to NextRoot rather than a full resume.
8. Footer, email, LinkedIn, GitHub, YouTube.

## Content handling

- The full Experience, Ventures, Advisory, and Education sections are removed from this site (they live on NextRoot).
- Travel and writing entries start as a handful of placeholder posts with real titles you can replace; content stays in a simple typed array in the code so it's easy to edit. No CMS or backend unless you want one later.
- Cozy Home and Roofolio move from "ventures" framing to "passion work" framing.

## Technical notes

- Rewrite `src/routes/index.tsx` around the new sections; retire the resume data arrays.
- Update the palette tokens in `src/styles.css` (oklch) and swap the display font to Lora / body to Nunito Sans, loaded via the `<link>` in `src/routes/__root.tsx`.
- New page title, description, og tags, and Person JSON-LD reworded for a personal site; keep the canonical and sitemap as-is.
- No backend changes.

## Open items

- nextrootsventures.com and cozyhomepartners.com didn't return content when I fetched them, so their card copy is my draft, tell me if you want different wording.
- Send travel photos and any essays you want live and I'll drop them in; otherwise placeholders.
