/* OCEAN — blog engine. You shouldn't need to edit this file.
   1) Any <div data-blog="TOPIC"></div> shows the posts for that topic ("all" = every post; data-limit="3" caps it).
   2) post.html shows one full post, chosen by ?id=... */
(() => {
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const fmt = d => new Date(d + 'T12:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const pages = { consciousness: 'consciousness.html', healing: 'healing.html', psychedelics: 'psychedelics.html', relationship: 'relationship.html' };
  const newest = [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

  /* Post lists */
  document.querySelectorAll('[data-blog]').forEach(box => {
    const topic = box.dataset.blog, limit = +box.dataset.limit || 99;
    const list = newest.filter(p => topic === 'all' || p.topics.includes(topic)).slice(0, limit);
    box.classList.add('blog-list');
    box.innerHTML = list.length
      ? list.map(p => `<a class="blog-card" href="post.html?id=${encodeURIComponent(p.id)}">
          <span class="blog-meta">${esc(p.type)} · ${fmt(p.date)}</span>
          <h3>${esc(p.title)}</h3><p>${esc(p.summary)}</p><span class="blog-more">Read ↗</span></a>`).join('')
      : '<p class="blog-empty">New readings and reflections are on their way.</p>';
  });

  /* Single post page */
  const art = document.getElementById('post');
  if (!art) return;
  const p = POSTS.find(x => x.id === new URLSearchParams(location.search).get('id'));
  if (!p) { art.innerHTML = '<h1>Post not found</h1><p><a class="text-link" href="index.html">← Back home</a></p>'; return; }
  document.title = p.title + ' — Ocean';
  const src = p.source ? `<p class="post-source">From <em>${p.source.url ? `<a href="${esc(p.source.url)}" rel="noopener">${esc(p.source.title)}</a>` : esc(p.source.title)}</em>${p.source.author ? ' by ' + esc(p.source.author) : ''}</p>` : '';
  const more = p.topics.filter(t => pages[t]).map(t => `<a class="text-link" href="${pages[t]}">${t}</a>`).join(' ');
  art.innerHTML = `<p class="blog-meta">${esc(p.type)} · ${fmt(p.date)}</p><h1>${esc(p.title)}</h1>${src}
    <div class="post-body">${p.body.map(t => `<p>${t}</p>`).join('')}</div>
    <p class="post-foot"><a class="text-link" href="index.html#writing">← All readings &amp; reflections</a> ${more}</p>`;
})();
