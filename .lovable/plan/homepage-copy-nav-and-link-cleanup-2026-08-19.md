# Homepage copy, nav, and link cleanup

All changes are on the homepage (`src/routes/index.tsx`) plus the site metadata it defines.

## Navigation
- Remove the "Writing" anchor link.
- Rename "NextRoot" to "NextRoot Ventures" and fix the URL to `https://nextrootventures.com`.
- Add a thin vertical divider between the internal page links and the NextRoot Ventures link (desktop nav; mobile menu keeps a simple separator line).

## Hero
- Headline becomes: "Dad, husband, traveler, and a builder who can't sit still."
- Exactly three buttons: **Travel notes**, **Blog**, **NextRoot Ventures**.

## Sections
- Rename the "Writing" section to "Blog" (eyebrow and heading), keeping the dynamic feed of the 3 latest published writing posts.
- Remove the intro subtext paragraphs under both the Travel and Blog headings, so the section heading sits directly above the cards. (This supersedes widening those paragraphs, since they no longer exist.)
- Any remaining descriptive paragraphs on the page drop their `max-w-3xl` constraint so text runs the full content width.

## Passion work
- NextRoot Ventures card links to `https://nextrootventures.com` and displays that domain.

## About
Replace the first paragraph with:
"I grew up an engineer, started my career writing C++ for embedded systems, and somehow ended up spending most of it in front of customers. I've built and led go-to-market teams at Google, LinkedIn, HackerRank, and Blind, and now I just vibecode for fun."

## Contact
- Footer email link and the JSON-LD person email become `hello@charleshsieh.com`.
- JSON-LD `sameAs` NextRoot URL updated to the corrected domain.
