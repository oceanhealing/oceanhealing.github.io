# Ocean — Readings & Reflections

Four new files: `posts.js` (your writing), `blog.js`, `blog.css`, `post.html`. Upload all four to the **top level** of your repo (next to index.html).

## 1. Add to every page you want a blog on
In the `<head>` (after the ocean.css line):
    <link rel="stylesheet" href="blog.css" />
Where you want the posts to appear (before the footer):
    <section class="section blog" id="readings">
      <p class="eyebrow">READINGS &amp; REFLECTIONS</p>
      <h2>Notes along the way.</h2>
      <div data-blog="consciousness"></div>
    </section>
Just before </body>:
    <script src="posts.js"></script>
    <script src="blog.js"></script>

## 2. Pick the topic for each page
consciousness.html → `data-blog="consciousness"`   healing.html → `"healing"`
psychedelics.html → `"psychedelics"`   relationship.html → `"relationship"`
index.html, about.html, podcast.html → `"all"` (add `data-limit="3"` to show only the newest three)

## 3. Write a new post
Open `posts.js`, copy a `{ ... }` block to the top of the list, change the id (no spaces), date, title, summary and paragraphs. A post can appear on several pages by listing several topics. Commit — it appears on every matching page.


## Journal sections
See `JOURNAL-GUIDE.md` for how to add reflections and readings. Each main page has its own topic-filtered journal section, powered by the shared `posts.js` and `blog.js` files.
