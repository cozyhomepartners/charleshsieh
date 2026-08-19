# Personal site: warm ivory palette, travel/blog split, richer posts

## 1. Background color
Replace the sage-green theme with a warm ivory paper tone (close to the original), keeping the terracotta and marigold accents:
- background `#faf8f5`, cards/surfaces `#fffdfa`, muted/borders in warm greige `#f2ede5` / `#e6ded2`
- no green tint anywhere in surfaces; teal stays only as a small accent

## 2. Admin sign-up
Sign-up/login lives at `/auth` (Google or email). Live links:
- Preview: `https://id-preview--81d26df7-c46f-40c2-a790-ae44946d5202.lovable.app/auth`
- Published: `https://charleshsieh.com/auth`

Sign up once, tell me, and I grant your account the admin role so `/admin` unlocks. (Admin role must be granted server-side, it can't be self-selected.)

## 3. Post categories: Travel vs Writing
- Editor gets a required category toggle: **Travel** or **Writing**.
- `/blog` lists Writing posts, `/travel` lists Travel posts.
- Post URLs: `/blog/<slug>` and `/travel/<slug>`, each rendering the same post view.
- Homepage keeps the existing curated travel cards, and gains a "Latest" strip linking to real posts.
- Sitemap includes both feeds and all published posts.

## 4. Photos and rich text
- New storage bucket for post images (public read, admin-only upload).
- Editor supports a cover image upload plus inline image uploads inside the body.
- Rich text editing (bold, italic, headings, quotes, lists, links, images) stored as HTML and rendered with sanitization.

## 5. Dynamic post layout based on photos
The post page picks a layout automatically:
- Cover image present → full-bleed hero with title overlaid, wide image treatment
- No cover → centered editorial layout with large serif title and drop-cap opener
- Many inline images (3+) → gallery-style rhythm, alternating full-width and inset images with captions
- Travel posts get the marigold/terracotta accent and a location/date line; Writing posts stay quieter and text-first

## Technical notes
- Migration: add `category` check constraint (`travel` | `writing`), optional `location` and `cover_focal` fields, storage bucket `post-images` with admin-only insert/update/delete policies and public select.
- Routes added: `travel.index.tsx`, `travel.$slug.tsx`; existing `blog.index.tsx` filters to writing.
- Editor: lightweight rich-text component (contenteditable + toolbar) writing HTML; sanitize on render with a small allowlist sanitizer.
- Shared `PostArticle` component holds the adaptive layout logic; head() per post route sets title, description, og:image from the cover.
