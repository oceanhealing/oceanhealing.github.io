# Ocean — oceanhealing.github.io

Static site for GitHub Pages. No build step.

- `polish.css` — layout, type scale, mobile menu, footer (loaded last; remove its link to undo)
- `nav.js` — shared header, mobile menu, skip link, floating "Book a call" button
- `polish.js` — loads hero videos lazily (small file on phones; skipped for reduced-motion / Data Saver)
- `journal.js` — loads reflections from `reflections/` (see `JOURNAL-GUIDE.md`)
- `grounding.js` — the 60-second arrival practice

## Before you upload
Delete these from the repo so the old heavy files do not stay in it: `media/high_level_mountain.mp4`, `reflections/the-space-between.jpg` (duplicate), `images/reflections/a`, `media/test`, `posts.js`, `blog.js`, `reflections.js`, `post.html`.
`media/ocean-loop.mp4` (5.7 MB) is not used by any page; delete it too unless you plan to use it.
