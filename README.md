# Ocean — V2 (interactive)

Plain HTML/CSS/JS for GitHub Pages. No build step, no backend.

## Publish
Upload `index.html`, `style.css`, `script.js` to your repo, then Settings → Pages → Deploy from a branch → `main`.

## What's new
- Living water canvas (waves, drifting particles, cursor/touch ripples)
- Colour shifts with scroll: water → depth → darkness → light
- Journey navigation: Enter · Explore · Experience · Reflect · Connect
- Interactive exploration map (click a point of light)
- 60-second guided breathing pause (also in the top bar; Esc to exit)
- Quote that lights up word by word as you scroll
- Filterable journal
- Respects reduced-motion settings; works on mobile

## Customize
- Colours: the `stops` array at the top of `script.js`
- Email: `mailto:` link in `index.html`
- Journal posts: the `<article data-c="...">` blocks (placeholder copy for the two new ones)
