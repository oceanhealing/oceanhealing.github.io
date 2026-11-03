# Adding a reflection

Reflections are Markdown files in `reflections/`. One loader (`journal.js`) shows them everywhere.

1. Create `reflections/your-title.md`:

   ```
   ---
   id: your-title
   title: Your Title
   date: 2026-11-05
   type: Reflection
   topics: [healing, consciousness]
   summary: One or two sentences for the card.
   image: images/reflections/your-title.jpg
   ---

   Your text here. Blank line between paragraphs.
   ```
2. Add `"your-title.md"` to `reflections/index.json`. (Right now the list is empty `[]` on purpose, so every page shows only the placeholder. Your three drafts are still in `reflections/`; add `"the-space-between.md"`, `"learning-to-be-present.md"`, `"what-healing-means.md"` to the list to show them.)
3. Optional image: about 1200 px wide, JPG under 200 KB, saved at the path in `image:`. A missing image shows a calm colour block, not a broken icon.
4. Commit. It appears on every page whose topic matches.

Topics: `healing`, `consciousness`, `psychedelics`, `relationship`, `about`, `podcast`.
Home and `journal.html` show everything. A page with no matching reflection hides its journal section instead of showing an empty box.
