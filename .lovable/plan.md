# Editor fixes: double-click bolding + multi-photo galleries

## 1. Double-click should not bold text
Selecting a word by double-clicking must only select it, never change its weight.

Steps:
- Reproduce in the live editor and confirm whether the text is actually wrapped in bold markup or only looks bold (selection styling / heading inheritance).
- Fix the real cause once confirmed. Likely candidates to check: the editor sitting inside a `<label>` element (a double-click on a label re-fires activation on its control), and the `.prose-editor` selection/weight rules in `src/styles.css`.
- Verify: double-click a word, blur, re-open the post, and confirm the saved content has no new bold markup.

## 2. Upload several photos at once
- The photo button opens a file picker that accepts multiple images.
- All chosen files upload in order, with a progress state on the button, and any failed file is reported without blocking the rest.
- One photo selected keeps today's behavior exactly.

## 3. Photo groups displayed side by side
When more than one photo is inserted at once, they are placed in a single photo group instead of stacked one after another, with a shared caption line.

Layout by count:
- 2 photos: equal side-by-side pair
- 3 photos: one larger lead photo with two stacked beside it
- 4+ photos: even grid, two per row
- On phones every group falls back to a single column

The group gets its own small layout switcher in the toolbar (Grid, Side by side, Full-width stack) so the arrangement can be changed after inserting, the same way single photo sizes work today. Existing single photos and their Full/Medium/Small/Wrap options are untouched.

## Technical notes
- `src/components/RichTextEditor.tsx`: multi-file picking and upload loop; insert a `<figure data-group="grid">` wrapper containing the images plus one `<figcaption>`; extend the selected-figure toolbar to recognize a group and offer group layouts.
- `src/lib/sanitizeHtml.ts`: allow `data-group` on `figure` with an allowlist of layout values, so groups survive save/publish.
- `src/styles.css`: grid rules for `figure[data-group]` under both `.prose-editor` and `.post-body`, including the 3-photo lead layout and the mobile single-column fallback.
- Verify with `bunx tsgo --noEmit` and a browser pass over the admin editor, live preview, and a published post.
