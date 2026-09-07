# Editor fixes and two more admins

## 1. Two more people who can write
Charles's other address (charles@nextrootventures.com) and Connie (conniechsieh@gmail.com) don't have accounts yet, so access can't simply be handed to an existing user.

- Add a small approved-writers list holding those two emails.
- The first time either of them signs in with Google, the site checks their email against that list and grants them writing access automatically.
- Nobody can add themselves to the list; only a database change can.

## 2. Everything typing as bold
The exact cause is not confirmed yet, so the first step is to reproduce it in the editor and inspect what the editor actually produces while typing. Likely candidates: the editor inheriting a heavier weight from the surrounding form, or the browser's built-in formatting commands wrapping text in styling tags. The fix follows the finding: pin normal weight for regular paragraph text in the editor and make sure new lines start as clean paragraphs, so only text you explicitly bold looks bold, in both the editor and the published post.

## 3. Toolbar that follows you
Make the formatting bar stick to the top of the editor while you scroll, so bold, italic, quotes, and photo upload stay reachable in long posts.

## 4. Keyboard shortcuts
Confirm and, where missing, wire up Cmd/Ctrl+B (bold), +I (italic), +U (underline), +K (link), and Cmd/Ctrl+Z (undo) so they work on the current selection. Add the shortcut hint to each toolbar button's tooltip.

## 5. Photo sizes
Add a size choice for each photo instead of every image running full width:

- Click a photo in the editor to get options: Full width, Medium (centered, about two-thirds), Small (centered, about one-third), and Left / Right wrap on wide screens.
- Default for newly inserted photos: Medium, so nothing swallows the page.
- Very tall photos get a height cap so portrait shots don't scroll forever.
- The same sizes render on the published post and stack to full width on phones.
- Existing posts keep their current look unless you re-pick a size.

## Technical notes
- Migration: `admin_emails` table (email text primary key, seeded with the two addresses, no anon/authenticated read), plus a `security definer` function `claim_admin()` that inserts an `admin` row into `user_roles` when `auth.jwt()->>'email'` matches. Call it from `useAuth` right after a session is detected; ignore failures.
- `RichTextEditor.tsx`: sticky toolbar (`sticky top-0 z-10`), `document.execCommand('defaultParagraphSeparator','p')` and `styleWithCSS=false` on mount, keydown handler for the shortcuts, click-to-select figure with a size popover writing `data-size` on the `figure`.
- `sanitizeHtml.ts`: allow `class`/`data-size` on `figure` and `img` (values restricted to the known size tokens).
- `styles.css`: `.prose-editor`/`.post-body` rules for `figure[data-size="medium|small|left|right|full"]`, plus explicit `font-weight: 400` on editor paragraphs and a `max-height` cap on tall images.
