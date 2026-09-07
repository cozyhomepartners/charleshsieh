# Edit shortcut + richer post endings

## 1. Edit button on published posts

- When you are signed in as an admin and viewing any travel note or blog post, a small "Edit this post" button appears (top of the article, next to the back link, plus a floating button on mobile).
- Clicking it opens the writer with that post already loaded, so no hunting through the admin list.
- Visitors who are not signed in as admins never see it.

## 2. A proper ending for every post

Below the article body, each post gets:

- A short author line (name + one-sentence bio) with a link to get in touch.
- "Keep reading" — up to 3 other published posts, preferring the same category (travel or blog), newest first, shown as cards with cover image, date, and excerpt. Falls back to the other category if there aren't enough.
- Buttons linking to all travel notes and all blog posts, plus a back-to-home link.
- Tags shown at the end for posts that have them.

Nothing about the existing article layout, colors, or typography changes; this is added underneath.

## Technical notes

- `src/routes/admin.tsx`: add a validated `edit` search param (post id). On load, when the param is present and the post list has loaded, populate the draft from that post and scroll to the form.
- `src/components/PostArticle.tsx`: use `useAuth()` for `isAdmin` to render the edit link (`to="/admin"`, `search={{ edit: post.id }}`); add a `PostFooter` section rendering author bio, related posts, and navigation buttons. Related posts are fetched with a `useQuery` on published posts, excluding the current slug, ordered by `published_at` desc, limited to 3 same-category with backfill.
- Reuse the existing `PostCard` component for the related cards (rendered in a responsive 1/3-column grid).
- No database or policy changes needed: published posts are already publicly readable and `posts.id` is already selected.
