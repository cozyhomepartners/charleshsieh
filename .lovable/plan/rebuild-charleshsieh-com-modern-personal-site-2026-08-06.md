# Rebuild charleshsieh.com — modern personal site

A full visual rebuild of the personal site: drop the old Bootstrap 3 theme and rebuild in the project's own design system, with content refreshed from the 2026 resume.

## Design direction

- Palette: Paper & Ink — warm off-white background (#f5f3ee), soft paper tone for section bands (#e8e4dd), near-black ink text (#0d0d0d / #2d2d2d). One restrained accent for links and hovers.
- Typography: Space Grotesk for headings, DM Sans for body. Tight, confident headline sizes; generous line height in body copy.
- Layout: single column, centered, editorial resume feel. Wide margins, clear section rules, no cards-on-gradients.
- Removed: Bootstrap grid, FontAwesome icons, the photo hero background with dark overlay, and the old orange link color.

## Page structure (one page, anchor sections)

1. Hero — name, one-line positioning ("Founding IC and revenue leader, $0 to $25M+ ARR at Google, LinkedIn, and venture-backed startups"), location, and two actions: email and LinkedIn.
2. About — short personal paragraph (kept from current site, tightened) plus four capability lines: Revenue leadership, Product, Team building, Engineering background.
3. Experience — Blind, Switchboard, Google (Workspace Essentials + Hire), HackerRank, LinkedIn, Agilent, United Technologies, and the sabbatical year. Each with company logo, title, dates, and the resume bullets (updated numbers: Blind $0→$6M ARR / 50 logos / 15-person team; Google Essentials $0→$8M; Hire $0→$25M and 3,000+ customers; HackerRank $5.8M/$10M/$7M).
4. Ventures & projects — Scale GTM, Cozy Home Partners, Roofolio, plus VacayBug and 3degrees as prior projects.
5. Advisory & investing — Zabal Media, Welcome, Byteboard, Coding Dojo, Agave, GrowingIO, Pathrise, each with logo and one line.
6. Education — Illinois (B.S. ECE, minor CS) and Tsinghua.
7. Contact / footer — email, phone, LinkedIn, GitHub, travel vlog.

## Navbar

Sticky, minimal: name/logo on the left; on the right, section links (About, Experience, Ventures, Contact) and three external links opening in a new tab — Scale GTM, Cozy Home Partners, Roofolio. Mobile collapses to a sheet menu.

Scale GTM has no site yet, so its link will be a disabled/"coming soon" item until you give me the URL. I also need the Cozy Home Partners URL; Roofolio will point to roofolio.ai.

## Technical notes

- Rewrite `src/routes/index.tsx` using semantic HTML plus Tailwind utilities and shadcn primitives; no Bootstrap classes.
- Define the Paper & Ink palette as oklch tokens in `src/styles.css` (light plus a matching dark set), and register Space Grotesk / DM Sans as `--font-display` / `--font-sans`, loaded via `<link>` tags in `src/routes/__root.tsx`.
- Delete `public/css/bootstrap.css` and `public/css/main.css` and their `<link>` tags; drop the FontAwesome CDN and swap icons for `lucide-react`.
- Keep all existing images under `public/img/` (company logos, project screenshots) and the current favicon.
- Update route `head()` with a refreshed title, description, and og/twitter tags; single H1 in the hero.
