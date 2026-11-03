/* OCEAN — reflection (article) page: a quiet, poetic reading room. */
:root { --cream: #f3eee4; }
body { background-color: var(--cream); }

/* ---------- Hero: deep water with slow ripples ---------- */
.reflection-hero { position: relative; overflow: hidden; text-align: center; color: var(--paper);
  padding: clamp(150px, 22vh, 220px) 7vw clamp(120px, 17vh, 170px);
  background: radial-gradient(120% 95% at 50% 0%, #21585b 0%, #153b3e 55%, #0f2f32 100%); }
.reflection-hero > * { position: relative; z-index: 1; }
.reflection-hero .ripples { position: absolute; inset: -10% -5% 0; z-index: 0; pointer-events: none; opacity: .9;
  background: repeating-radial-gradient(circle at 50% 118%, transparent 0 54px, rgba(239,230,214,.075) 55px 56px);
  -webkit-mask-image: linear-gradient(to top, #000 0%, transparent 88%); mask-image: linear-gradient(to top, #000 0%, transparent 88%);
  animation: ripple-drift 16s ease-in-out infinite alternate; }
@keyframes ripple-drift { from { transform: scale(1); } to { transform: scale(1.07); } }
.reflection-hero .eyebrow { font-family: var(--hand); font-size: clamp(24px, 2.6vw, 30px); letter-spacing: 0; text-transform: lowercase; color: #e3b985; opacity: 1; margin: 0 0 6px; }
.reflection-hero h1 { font-family: "Cormorant Garamond", Georgia, serif; font-style: italic; font-weight: 400;
  font-size: clamp(44px, 7.4vw, 88px); line-height: 1.04; max-width: 15ch; margin: 0 auto .35em; color: #f6f0e4; text-wrap: balance; }
.reflection-summary { max-width: 34ch; margin: 0 auto 1.1em; font-family: "Newsreader", Georgia, serif; font-style: italic;
  font-size: clamp(18px, 2vw, 22px); line-height: 1.6; color: #d4e2db; }
.reflection-summary:empty, .reflection-meta:empty { display: none; }
.reflection-meta { margin: 0; font-family: var(--hand); font-size: 24px; letter-spacing: 0; color: #e3b985; }
.hero-wave { position: absolute; left: 0; right: 0; bottom: -1px; width: 100%; height: clamp(34px, 5vw, 60px); z-index: 1; display: block; }

/* ---------- Page: paper, narrow measure ---------- */
.reflection-main { background: var(--cream); padding: 6px 7vw clamp(90px, 12vw, 140px); }
.reflection-article { max-width: 660px; margin: 0 auto; }
.reflection-image { display: block; width: 100%; max-height: 440px; object-fit: cover; margin: 10px auto clamp(44px, 7vw, 72px);
  border-radius: 50% 50% 10px 10px / 36% 36% 10px 10px; box-shadow: 0 34px 60px -34px rgba(15,48,51,.5); }

.reflection-content { font-family: "Newsreader", "Cormorant Garamond", Georgia, serif; font-weight: 400;
  font-size: clamp(19px, 2.1vw, 22px); line-height: 1.95; color: #23403f; hyphens: manual; }
.reflection-content p { margin: 0 0 1.5em; }
.reflection-content:not(.is-poem) > p:first-child::first-letter { font-family: "Cormorant Garamond", Georgia, serif; font-weight: 500;
  font-size: 4.3em; float: left; line-height: .8; padding: .07em .12em 0 0; color: #276b72; }
.reflection-content h2 { font-family: "Cormorant Garamond", Georgia, serif; font-style: italic; font-weight: 400; font-size: clamp(30px, 4vw, 42px); line-height: 1.15; margin: 2em 0 .6em; color: #173b3c; }
.reflection-content h3 { font-family: var(--hand); font-weight: 500; font-size: 30px; margin: 1.8em 0 .4em; color: #276b72; }
.reflection-content blockquote { margin: 2em 0; padding: 0 0 0 1.4em; border-left: 1px solid var(--amber); font-style: italic; font-size: 1.1em; color: #1d4a4c; }
.reflection-content blockquote p { margin-bottom: .6em; }
.reflection-content ul, .reflection-content ol { padding-left: 1.3em; margin: 0 0 1.5em; }
.reflection-content li { margin: .4em 0; }
.reflection-content a { color: #276b72; text-underline-offset: 4px; text-decoration-thickness: 1px; }
.reflection-content a:hover { color: var(--amber-deep); }
.reflection-content hr { border: 0; height: 26px; margin: 3em auto; width: 140px; opacity: .7;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 140 26'%3E%3Cpath d='M0 13 q17 -14 35 0 t35 0 t35 0 t35 0' fill='none' stroke='%232f7f86' stroke-width='1.6' stroke-linecap='round'/%3E%3C/svg%3E") center / contain no-repeat; }
.reflection-content pre { overflow-x: auto; padding: 16px; background: rgba(23,59,60,.06); border-radius: 8px; font-size: 15px; }
/* poem mode: add  style: poem  to the file header — line breaks are kept */
.reflection-content.is-poem p { white-space: pre-line; font-size: 1.08em; line-height: 2.1; margin-bottom: 2.2em; }
.reflection-message { text-align: center; font-style: italic; padding: 40px 0; }
.reflection-message h2 { margin-top: 0; }

/* gentle arrival of each paragraph */
.reflection-content .fade { opacity: 0; transform: translateY(14px); transition: opacity 1.1s ease, transform 1.1s ease; }
.reflection-content .fade.in { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .reflection-content .fade { opacity: 1; transform: none; transition: none; } .reflection-hero .ripples { animation: none; } }

/* ---------- The close ---------- */
.reflection-end { margin: clamp(48px, 7vw, 72px) 0 0; text-align: center; }
.reflection-end[hidden] { display: none; }
.reflection-end .ornament { display: flex; align-items: center; justify-content: center; gap: 18px; color: var(--amber); font-size: 22px; }
.reflection-end .ornament span { flex: 0 1 130px; height: 1px; background: linear-gradient(90deg, transparent, rgba(197,138,79,.65)); }
.reflection-end .ornament span:last-child { transform: scaleX(-1); }
.reflection-end .signoff { margin: .5em 0 0; font-family: var(--hand); font-size: 32px; color: #276b72; }
.reflection-topics { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin: 30px 0 0; }
.reflection-topics a { font-family: var(--hand); font-size: 23px; line-height: 1; text-transform: lowercase; color: #276b72; text-decoration: none;
  border: 1px solid rgba(39,107,114,.35); border-radius: 999px; padding: 7px 20px 8px; transition: background .25s, border-color .25s; }
.reflection-topics a:hover { background: rgba(197,138,79,.14); border-color: var(--amber-deep); color: #1d4a4c; }
.reflection-back { display: flex; flex-wrap: wrap; gap: 4px 26px; justify-content: center; margin-top: 34px; }
.reflection-back a { font-family: "Inter", system-ui, sans-serif; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; color: #31575a; text-decoration: none;
  padding: 12px 0; border-bottom: 1px solid transparent; }
.reflection-back a:hover { border-bottom-color: var(--amber); color: #1d4a4c; }
@media (max-width: 600px) { .reflection-image { max-height: 320px; } }
