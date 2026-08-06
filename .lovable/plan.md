# Layout tightening and experience updates

## 1. Hero spacing
Reduce hero vertical padding from `py-16 md:py-24` to roughly `py-10 md:py-14` so the page opens tighter.

## 2. Page width
Widen the page container from `max-w-5xl` to `max-w-6xl` (header, main, footer together) and reduce horizontal padding slightly, so content uses more of the screen.

## 3. Remove 3degrees
Drop the 3degrees entry from Ventures & Projects.

## 4. About text width
The About paragraph is capped at `max-w-2xl`, leaving an empty column. Let it span the content width (cap near `max-w-4xl` for readability) so it reads across the page.

## 5. Footer cleanup
Remove the Travel vlog and Medium links from the footer.

## 6. Sabbatical
Add a lucide plane icon in the logo slot (the experience list currently renders images only, so it will accept either an image or an icon), and link "Hsiehnanigans" to https://www.youtube.com/@hsiehnanigans.

## 7. Merge Google
Show Google once with a single logo, with the two roles (Workspace Essentials, Hire by Google) listed beneath it, each with its own title, dates, and bullets.

## 8. New Blind role
Group Blind the same way, with two roles under one logo:
- Advisor to CEO — Jun 2026 – Present, one bullet (advising the CEO on go-to-market strategy and US market expansion).
- VP of Sales and Product, North America — Feb 2023 – May 2026 (existing bullets).

## Technical notes
All changes are in `src/routes/index.tsx`. The experience data shape changes from one entry per role to one entry per company with a `roles` array, and the rendering loop is updated to match. No backend or dependency changes.
