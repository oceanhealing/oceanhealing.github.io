/* OCEAN — journal loader (replaces reflections.js, blog.js and posts.js).
   Any <div data-journal="TOPIC"> lists reflections from reflections/index.json.
   TOPIC = "all" shows everything. Optional: data-limit="3".
   If a topic has no reflections yet, its whole section hides itself
   (add data-keep-empty to keep an "unfolding" note instead). */
(() => {
  const boxes = document.querySelectorAll('[data-journal]');
  if (!boxes.length) return;

  const parse = text => {
    const m = text.replace(/\r/g, '').match(/^---\n([\s\S]*?)\n---\n?/);
    if (!m) return null;
    const meta = {};
    m[1].split('\n').forEach(line => {
      const i = line.indexOf(':');
      if (i < 1) return;
      let v = line.slice(i + 1).trim();
      v = v.startsWith('[') && v.endsWith(']')
        ? v.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean)
        : v.replace(/^["']|["']$/g, '');
      meta[line.slice(0, i).trim()] = v;
    });
    return meta;
  };

  // Fetch the index and every file exactly once, however many lists the page has.
  const load = fetch('reflections/index.json')
    .then(r => { if (!r.ok) throw new Error('index ' + r.status); return r.json(); })
    .then(files => Promise.all(files.map(file =>
      fetch('reflections/' + file)
        .then(r => (r.ok ? r.text() : null))
        .then(t => { const meta = t && parse(t); return meta && meta.title ? { ...meta, file } : null; })
        .catch(() => null))))
    .then(list => list.filter(Boolean).sort((a, b) => String(b.date).localeCompare(String(a.date))))
    .catch(() => []);  // no server (e.g. opened from disk) or no index: behave as if there are no reflections yet

  const fmt = d => { const t = new Date(d + 'T12:00:00'); return isNaN(t) ? '' : t.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); };
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };

  function card(post) {
    const art = el('article', 'journal-card');
    const a = el('a', 'journal-card-link');
    a.href = 'reflection.html?file=' + encodeURIComponent(post.file);
    if (post.image) {
      const fig = el('div', 'journal-card-image');
      const img = new Image();
      img.alt = ''; img.loading = 'lazy'; img.decoding = 'async'; img.width = 1200; img.height = 750;
      img.onerror = () => fig.classList.add('journal-image-placeholder') || img.remove();  // missing file: calm placeholder, no broken icon
      img.src = post.image;
      fig.append(img);
      a.append(fig);
    }
    const body = el('div', 'journal-card-content');
    const meta = fmt(post.date);
    if (meta) body.append(el('p', 'journal-card-meta', (post.type || 'Reflection') + ' · ' + meta));
    body.append(el('h3', '', post.title), el('p', '', post.summary || ''), el('span', 'journal-read-more', 'Read reflection →'));
    a.append(body); art.append(a);
    return art;
  }

  const WAVES = [
    'M0 70 q30 -26 60 0 t60 0 t60 0 t60 0 t60 0 M0 96 q30 -26 60 0 t60 0 t60 0 t60 0 t60 0',
    'M0 60 q40 -34 80 0 t80 0 t80 0 t80 0 M0 90 q40 -34 80 0 t80 0 t80 0 t80 0',
    'M0 80 q24 -20 48 0 t48 0 t48 0 t48 0 t48 0 t48 0 M0 104 q24 -20 48 0 t48 0 t48 0 t48 0 t48 0 t48 0'
  ];
  function placeholder(i) {
    const art = el('article', 'journal-card is-placeholder');
    const wrap = el('div', 'journal-card-link');
    const fig = el('div', 'journal-card-image placeholder-art placeholder-art-' + (i % 3));
    fig.setAttribute('aria-hidden', 'true');
    fig.innerHTML = '<svg viewBox="0 0 300 150" preserveAspectRatio="xMidYMid slice"><path d="' + WAVES[i % 3] + '"/></svg>';
    const body = el('div', 'journal-card-content');
    body.append(
      el('p', 'journal-card-meta', 'Reflection'),
      el('h3', '', 'A reflection is on its way'),
      el('p', '', 'A short piece of writing will be added here.'),
      el('span', 'journal-read-more', 'Coming soon')
    );
    wrap.append(fig, body); art.append(wrap);
    return art;
  }

  load.then(all => {
    boxes.forEach(box => {
      const topic = box.dataset.journal, limit = Number(box.dataset.limit) || Infinity;
      const posts = all.filter(p => topic === 'all' || (p.topics || []).includes(topic)).slice(0, limit);
      box.replaceChildren();
      if (posts.length) { posts.forEach(p => box.append(card(p))); return; }
      const section = box.closest('section');
      if (section && !('keepEmpty' in box.dataset)) section.hidden = true;
      else {
        const n = Number(box.dataset.limit) || 3;
        for (let i = 0; i < n; i++) box.append(placeholder(i));
      }
    });
  }).catch(() => boxes.forEach(box => {
    const section = box.closest('section');
    if (section && !('keepEmpty' in box.dataset)) section.hidden = true;
  }));
})();
