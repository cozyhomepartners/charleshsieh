# Editor preview, tags, seeded posts, homepage writing section

## 1. Live preview while typing
Add a Preview toggle to `/admin`. Editing and preview sit side by side on wide screens (stacked with a toggle on mobile), and the preview renders the post exactly as the published page would: cover treatment, title, location, tags, excerpt, and body typography, updating as you type.

## 2. Tags on posts
- New optional Tags field in the editor (comma-separated, e.g. `Family trip, Food & wandering`).
- Tags render as pills on post cards in `/travel` and `/blog`, and under the title on the post page, using the same warm palette as the curated homepage cards.
- Tags saved with the post in the database.

## 3. Sample posts with photos
Seed six published posts (3 travel, 3 writing), each with a cover photo, tags, location where relevant, and a few paragraphs plus one or two inline photos so the adaptive layouts are visible. Photos are generated and shipped with the site, so they load without any upload step. These are real editable rows, delete or rewrite them from `/admin` at any time.

## 4. Homepage changes
- Remove the "Latest" featured writing block from the hero area.
- Add a Writing section (after Travel) that pulls the most recent published writing posts from the database and links to `/blog`.
- Add "Writing" to the section anchors so the nav still lines up.

## 5. Remove the YouTube button
Delete the "Watch on Hsiehnanigans" button from the Travel section. The YouTube link in the footer stays.

## Technical notes
- Migration: `alter table posts add column tags text[] not null default '{}'`; insert the six seed rows literally, resolving `author_id` from the existing admin user.
- Seed images generated into `public/img/posts/*.jpg`, referenced by absolute site paths in the seeded post rows.
- Extract the preview renderer from `PostArticle` so `/admin` can render an unsaved draft object without a DB round trip.
- Homepage writing feed uses a public Supabase read (published + category `writing`) with the existing anon SELECT policy.
