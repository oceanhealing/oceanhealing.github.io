(() => {
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Water → depth → darkness → light, driven by scroll ---- */
  const stops = [[0,[58,138,143]],[.3,[29,90,104]],[.55,[8,38,48]],[.72,[3,18,25]],[.9,[207,224,218]],[1,[236,228,212]]];
  const colour = p => {
    for (let i = 1; i < stops.length; i++) if (p <= stops[i][0]) {
      const [a, A] = stops[i-1], [b, B] = stops[i], t = (p - a) / (b - a);
      return A.map((v, k) => v + (B[k] - v) * t);
    }
    return stops.at(-1)[1];
  };

  const cv = $('#sea'), cx = cv.getContext('2d');
  let W, H, P = 0, target = 0, dots = [], ripples = [], T = 0;
  const size = () => {
    const d = devicePixelRatio || 1;
    cv.width = innerWidth * d; cv.height = innerHeight * d;
    cx.setTransform(d, 0, 0, d, 0, 0); W = innerWidth; H = innerHeight;
    dots = Array.from({ length: W < 700 ? 28 : 60 }, () => ({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .4, v: Math.random() * .25 + .08 }));
  };

  const draw = () => {
    P += (target - P) * .06; T += reduce ? 0 : .012;
    const c = colour(P), light = P > .82;
    cx.fillStyle = `rgb(${c.map(Math.round)})`; cx.fillRect(0, 0, W, H);
    document.body.classList.toggle('dark', !light);
    const calm = 1 - Math.min(P / .75, 1) * .7;               // deeper = calmer
    for (let i = 0; i < 4; i++) {
      const base = H * (.3 + i * .2) - target * 60, amp = (22 - i * 3) * calm;
      cx.beginPath(); cx.moveTo(0, H);
      for (let x = 0; x <= W; x += 14) cx.lineTo(x, base + Math.sin(x / (190 + i * 60) + T * (1 + i * .3) + i) * amp + Math.sin(x / 70 - T) * amp * .3);
      cx.lineTo(W, H); cx.closePath();
      cx.fillStyle = light ? `rgba(255,255,255,${.12})` : `rgba(180,235,235,${.045 + i * .01})`; cx.fill();
    }
    cx.fillStyle = light ? 'rgba(23,59,60,.15)' : 'rgba(200,245,245,.5)';
    for (const d of dots) {                                   // drifting particles
      d.y -= d.v; d.x += Math.sin(T + d.y / 90) * .15; if (d.y < -5) { d.y = H + 5; d.x = Math.random() * W; }
      cx.globalAlpha = .25 + .35 * (1 - d.y / H); cx.beginPath(); cx.arc(d.x, d.y, d.r, 0, 6.3); cx.fill();
    }
    cx.globalAlpha = 1;
    ripples = ripples.filter(r => r.a > .02);                  // cursor / touch ripples
    for (const r of ripples) {
      r.r += 1.6; r.a *= .965; cx.strokeStyle = `rgba(${light ? '23,59,60' : '220,250,250'},${r.a})`;
      cx.lineWidth = 1; cx.beginPath(); cx.arc(r.x, r.y, r.r, 0, 6.3); cx.stroke();
    }
    requestAnimationFrame(draw);
  };

  let last = 0;
  addEventListener('pointermove', e => { if (reduce || e.timeStamp - last < 90) return; last = e.timeStamp; ripples.push({ x: e.clientX, y: e.clientY, r: 4, a: .35 }); });
  addEventListener('pointerdown', e => { if (!reduce) ripples.push({ x: e.clientX, y: e.clientY, r: 6, a: .6 }); });

  /* ---- Scroll: depth, journey dots, quote reveal ---- */
  const q = $('#quoteText'); q.innerHTML = q.textContent.split(' ').map(w => `<span>${w}</span>`).join(' ');
  const words = $$('#quoteText span'), links = $$('.journey a'), secs = links.map(a => $('#' + a.dataset.s));
  const onScroll = () => {
    target = Math.min(scrollY / (document.body.scrollHeight - innerHeight || 1), 1);
    const r = $('#quote').getBoundingClientRect(), t = Math.max(0, Math.min(1, (H * .75 - r.top) / (r.height * .6)));
    words.forEach((w, i) => w.classList.toggle('on', i < t * words.length + .5 && t > 0));
    let cur = 0; secs.forEach((s, i) => { if (s.getBoundingClientRect().top < H * .5) cur = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === cur));
  };
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => { size(); onScroll(); });
  size(); onScroll(); P = target; draw();

  /* ---- Exploration map ---- */
  const topics = [
    'Curiosity about awareness, meaning, presence, and the mystery of being human.',
    'Exploring relational intelligence, the body, nervous-system awareness, and compassionate presence.',
    'Learning about psychedelic medicines, altered states, integration, and the science surrounding them.',
    'Bringing a scientific mind to questions of consciousness, human experience, and emerging technologies.'
  ];
  $$('.node').forEach(n => n.addEventListener('click', () => {
    $$('.node').forEach(o => o.setAttribute('aria-pressed', o === n));
    $('#mapText').textContent = topics[n.dataset.i];
  }));

  /* ---- 60-second pause ---- */
  const ov = $('#breath'), cue = $('#cue'), count = $('#count'), end = $('#closeBreath');
  let timer, opener;
  const close = () => { clearInterval(timer); ov.hidden = true; ov.classList.remove('run'); document.body.style.overflow = ''; opener && opener.focus(); };
  const open = e => {
    opener = e.currentTarget; ov.hidden = false; document.body.style.overflow = 'hidden'; end.focus();
    ov.classList.remove('run'); void ov.offsetWidth; ov.classList.add('run');
    let s = 0; cue.textContent = 'Breathe in'; count.textContent = '60';
    timer = setInterval(() => {
      s++; count.textContent = Math.max(60 - s, 0);
      const ph = s % 10; cue.textContent = ph < 4 ? 'Breathe in' : 'Breathe out';
      if (s >= 60) { clearInterval(timer); cue.textContent = 'Notice how you feel.'; end.textContent = 'Return'; }
    }, 1000);
  };
  ['#openBreath', '#openBreath2'].forEach(id => $(id).addEventListener('click', e => { end.textContent = 'End pause'; open(e); }));
  end.addEventListener('click', close);
  addEventListener('keydown', e => { if (e.key === 'Escape' && !ov.hidden) close(); });

  /* ---- Journal filters ---- */
  $$('.filters button').forEach(b => b.addEventListener('click', () => {
    $$('.filters button').forEach(o => o.classList.toggle('on', o === b));
    $$('.posts article').forEach(a => { a.hidden = b.dataset.f !== 'all' && a.dataset.c !== b.dataset.f; });
  }));
})();
