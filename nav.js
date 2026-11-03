/* OCEAN — shared header: accessible mobile menu, sticky bar, current page, skip link, "book a call" button. */
document.addEventListener('DOMContentLoaded', function () {
  const placeholder = document.getElementById('site-header');
  if (!placeholder) return;

  const links = [
    ['index.html', 'Home'], ['about.html', 'Meet Ocean'], ['healing.html', 'Healing &amp; Embodiment'],
    ['consciousness.html', 'Consciousness'], ['psychedelics.html', 'Psychedelics &amp; Science'],
    ['relationship.html', 'Relational Intelligence']
  ];
  const here = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  const isCall = here === 'discovery-call.html';

  const header = document.createElement('header');
  header.className = 'nav';
  header.innerHTML = `
    <a class="brand" href="index.html">OCEAN</a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="nav-toggle-label">Menu</span><span class="bars" aria-hidden="true"></span></button>
    <nav class="site-nav" id="site-nav" aria-label="Main navigation">
      <ul>
        ${links.map(([href, label]) => `<li><a href="${href}"${href === here ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}
        <li class="nav-cta"><a href="discovery-call.html"${isCall ? ' aria-current="page"' : ''}>Free Discovery Call</a></li>
      </ul>
    </nav>`;
  placeholder.replaceWith(header);

  // Skip link + a landmark to skip to, on every page.
  const main = document.querySelector('main');
  if (main && !main.id) main.id = 'main-content';
  if (main && !document.querySelector('.skip-link')) {
    const skip = document.createElement('a');
    skip.className = 'skip-link';
    skip.href = '#' + main.id;
    skip.textContent = 'Skip to content';
    document.body.prepend(skip);
  }

  // Menu open / close
  const toggle = header.querySelector('.nav-toggle');
  const label = header.querySelector('.nav-toggle-label');
  const root = document.documentElement;
  function setOpen(open, returnFocus) {
    header.classList.toggle('nav-open', open);
    root.classList.toggle('nav-locked', open);
    toggle.setAttribute('aria-expanded', String(open));
    label.textContent = open ? 'Close' : 'Menu';
    if (!open && returnFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => setOpen(!header.classList.contains('nav-open')));
  header.addEventListener('keydown', e => { if (e.key === 'Escape' && header.classList.contains('nav-open')) setOpen(false, true); });
  header.querySelectorAll('.site-nav a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  matchMedia('(min-width: 1321px)').addEventListener('change', e => { if (e.matches) setOpen(false); });

  // Solid bar once the page scrolls
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Floating call-to-action for phones (not on the booking page itself)
  if (!isCall) {
    const cta = document.createElement('a');
    cta.className = 'm-cta';
    cta.href = 'discovery-call.html';
    cta.textContent = 'Book a call';
    document.body.append(cta);
    const show = () => cta.classList.toggle('show', window.scrollY > window.innerHeight * 0.7 && !header.classList.contains('nav-open'));
    show();
    window.addEventListener('scroll', show, { passive: true });
  }
});
