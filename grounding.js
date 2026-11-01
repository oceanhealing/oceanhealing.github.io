/* OCEAN — 60-second arrival practice.
   No breath holds, prescribed breathing cadence, tracking, or local storage. */
(() => {
  const card = document.querySelector('[data-grounding-timer]');
  if (!card) return;
  const $ = selector => card.querySelector(selector);
  const startButton = $('[data-start]');
  const resetButton = $('[data-reset]');
  const phaseLabel = $('[data-phase]');
  const countLabel = $('[data-count]');
  const progress = $('[data-progress]');
  const progressFill = $('[data-progress-fill]');
  const orb = $('[data-orb]');
  const hint = $('[data-hint]');
  const complete = $('[data-complete]');
  const total = 60;
  const moments = [
    { at: 60, title: 'Arrive', text: 'Let your eyes settle. Notice the space around you. There is nowhere else you need to be for this moment.' },
    { at: 45, title: 'Feel what supports you', text: 'Notice the surface beneath you. Feel your feet, your seat, or the gentle support holding your body.' },
    { at: 30, title: 'Listen inward', text: 'Notice one sensation, one sound, or one feeling. You do not need to name it or change it.' },
    { at: 15, title: 'Make a little room', text: 'Let your breathing find its own rhythm. If it feels comfortable, soften your shoulders or unclench your jaw.' }
  ];
  let elapsed = 0;
  let startedAt = 0;
  let interval = null;
  let running = false;

  const remaining = () => Math.max(0, total - elapsed);
  const format = seconds => `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  const momentFor = seconds => moments.find(moment => seconds <= moment.at) || moments[0];

  function render() {
    const left = remaining();
    const current = momentFor(left);
    countLabel.textContent = format(left);
    progressFill.style.width = `${(elapsed / total) * 100}%`;
    progress.setAttribute('aria-valuenow', String(elapsed));
    phaseLabel.textContent = elapsed === 0 && !running ? 'When you’re ready, begin.' : current.title;
    hint.textContent = elapsed === 0 && !running
      ? 'Follow the gentle prompts, or simply sit quietly. Let your breathing remain natural.'
      : current.text;
    startButton.textContent = left === 0 ? 'Begin again' : running ? 'Pause practice' : elapsed ? 'Continue' : 'Begin 60 seconds';
    resetButton.disabled = elapsed === 0 && !running;
    card.classList.toggle('is-running', running);
    card.classList.toggle('is-complete', left === 0);
  }

  function stopClock() {
    if (interval !== null) window.clearInterval(interval);
    interval = null;
  }

  function finish() {
    stopClock();
    running = false;
    complete.hidden = false;
    phaseLabel.textContent = 'You’re here.';
    hint.textContent = 'Take a moment before moving on. Notice what you would like to carry with you.';
    startButton.textContent = 'Begin again';
    card.classList.remove('is-running');
    card.classList.add('is-complete');
    renderProgressOnly();
  }

  function renderProgressOnly() {
    countLabel.textContent = '00:00';
    progressFill.style.width = '100%';
    progress.setAttribute('aria-valuenow', '60');
    resetButton.disabled = false;
  }

  function tick() {
    elapsed = Math.min(total, Math.floor((Date.now() - startedAt) / 1000));
    if (elapsed >= total) finish();
    else render();
  }

  function start() {
    if (elapsed >= total) elapsed = 0;
    running = true;
    complete.hidden = true;
    startedAt = Date.now() - elapsed * 1000;
    render();
    interval = window.setInterval(tick, 250);
  }

  function pause() {
    tick();
    if (elapsed >= total) return;
    stopClock();
    running = false;
    phaseLabel.textContent = 'Take your time.';
    hint.textContent = 'The practice is paused. Continue whenever you feel ready.';
    renderControls();
  }

  function renderControls() {
    startButton.textContent = 'Continue';
    resetButton.disabled = false;
    card.classList.remove('is-running');
  }

  function reset() {
    stopClock();
    elapsed = 0;
    running = false;
    complete.hidden = true;
    render();
  }

  startButton.addEventListener('click', () => running ? pause() : start());
  resetButton.addEventListener('click', reset);
  document.addEventListener('visibilitychange', () => {
    // Pause when the tab is hidden so the practice never silently runs down.
    if (document.hidden && running) pause();
  });
  render();
})();
