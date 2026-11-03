/* OCEAN — hero video loader.
   Videos ship with no src, so nothing heavy downloads until we decide it should:
   skipped for reduced-motion and data-saver visitors, small file on phones. */
(() => {
  const videos = document.querySelectorAll('video.hero-video[data-src]');
  if (!videos.length) return;
  const conn = navigator.connection || {};
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const saving = conn.saveData || /(^|-)2g$/.test(conn.effectiveType || '');
  const small = matchMedia('(max-width: 700px)').matches;
  videos.forEach(v => {
    if (calm || saving) { v.remove(); return; }
    v.src = small && v.dataset.srcSm ? v.dataset.srcSm : v.dataset.src;
    v.muted = true;
    const go = () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((e, o) => { if (e[0].isIntersecting) { go(); } else { v.pause(); } }, { threshold: .05 }).observe(v);
    } else go();
  });
})();

/* Voice greeting: shows a quiet "coming soon" note until media/hello.mp3 exists, then becomes a player. */
(() => {
  const box = document.querySelector('[data-voice-hello]');
  if (!box) return;
  fetch('media/hello.mp3', { method: 'HEAD' }).then(r => {
    if (!r.ok) return;
    box.querySelector('.voice-soon').replaceWith(Object.assign(document.createElement('audio'), { controls: true, preload: 'none', src: 'media/hello.mp3' }));
  }).catch(() => {});
})();
