# Cool paper background refresh

Move the site off the warm ivory shared with NextRoot Ventures and onto a cool paper palette, then re-tune the accents so every page still reads cleanly.

## New palette

- Page background: cool near-white with a faint blue-gray tint (#f4f6f8)
- Surfaces (cards, popovers): a touch lighter than the page so cards still lift
- Borders, muted fills, inputs: cool light gray (#e6eaee family) instead of sand
- Text: cool near-black / slate-gray instead of warm brown-gray
- Primary accent: terracotta warmed to #c56a4b, kept as the main link and button color
- Teal accent: brightened to #2f8a92 so the Blog button and travel labels stay legible on a cool page
- Marigold accent: shifted slightly cooler and deeper so the tag pills don't look muddy against blue-gray

## Consistency pass across pages

Check and adjust wherever these tokens show up so nothing clashes:

- Home: hero, terracotta button, teal Blog button, marigold photo frame, tag pills, section dividers, passion-work icons, footer
- Travel and Blog feeds: card borders, cover images, date/location eyebrow text, tag pills
- Post pages: cover-image gradient overlay, drop caps, blockquote rule, image captions
- Admin editor and preview pane, plus the auth page: form fields, buttons, focus rings
- Dark mode variants of every token above

Contrast is verified for accent text and buttons against the new background so nothing falls below readable levels.

## Technical notes

- All changes are token edits in `src/styles.css` (`:root` and `.dark`): background, foreground, card, popover, secondary, muted, border, input, ring, primary, accent, marigold, teal, and their foregrounds.
- Any place a component hardcodes an accent tint (for example tag pill backgrounds using `bg-marigold/25` or `bg-teal/15`) gets its opacity nudged only if it reads weak on the cooler surface.
- No layout, content, or data changes.
