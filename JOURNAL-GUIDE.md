# Adding writing to Ocean

Ocean now has a journal section on every main page. Each page automatically shows entries tagged for that subject.

## Where entries appear

- `index.html` — every entry (`topics` can be any of the supported topics)
- `healing.html` — `healing`
- `consciousness.html` — `consciousness`
- `psychedelics.html` — `psychedelics`
- `relationship.html` — `relationship`
- `about.html` — `about`
- `podcast.html` — `podcast`

## Add a new entry

Open `posts.js` and add an object inside the `POSTS` array. Separate entries with commas. Example:

```js
const POSTS = [
  {
    id: "a-practice-of-arriving",
    title: "A Practice of Arriving",
    date: "2026-11-01",
    type: "Practice",
    topics: ["healing", "consciousness"],
    summary: "A short invitation to notice what is already here.",
    artLabel: "Presence",
    body: [
      "The first paragraph of your reflection...",
      "A second paragraph..."
    ]
  }
];
```

Use a unique, lowercase, hyphenated `id`; dates must be `YYYY-MM-DD`. The `topics` array controls which pages display the post. Tag an entry with more than one topic to let it appear in multiple sections. `body` is an array of plain-text paragraphs. The page formats and escapes the text safely.

## Publish

Save `posts.js`, commit it to GitHub, and the post cards will appear on the relevant pages after the site rebuilds. The current setup is static and does not have a private admin dashboard or online editor; writing is added through `posts.js` in the repository.
