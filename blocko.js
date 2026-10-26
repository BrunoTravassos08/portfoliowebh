(() => {
  const pad = n => String(n).padStart(2, '0');

  /* ---------- identity deck ---------- */
  const deck = document.getElementById('deck');
  const stage = document.getElementById('deckStage');
  const slides = [...stage.querySelectorAll('.sl')];
  const seg = document.getElementById('deckSeg');
  const num = document.getElementById('deckNum'), title = document.getElementById('deckTitle');
  let cur = 0;

  seg.innerHTML = slides.map((s, i) => `<button type="button" role="tab" aria-label="${pad(i + 1)} ${s.dataset.title}" title="${s.dataset.title}"></button>`).join('');
  const segs = [...seg.children];

  function go(i) {
    cur = (i + slides.length) % slides.length;
    slides.forEach((s, k) => {
      const on = k === cur;
      if (on && !s.classList.contains('on')) { s.classList.remove('on'); void s.offsetWidth; } // replay entrance
      s.classList.toggle('on', on);
      s.setAttribute('aria-hidden', String(!on));
      s.inert = !on;
    });
    segs.forEach((b, k) => b.setAttribute('aria-selected', String(k === cur)));
    num.textContent = `${pad(cur + 1)} / ${pad(slides.length)}`;
    title.textContent = slides[cur].dataset.title;
  }
  seg.addEventListener('click', e => { const b = e.target.closest('button'); if (b) go(segs.indexOf(b)); });
  deck.querySelector('.prev').onclick = () => go(cur - 1);
  deck.querySelector('.next').onclick = () => go(cur + 1);

  // swipe / drag between slides (ignores taps on controls inside a slide)
  let sx = null, sy = 0;
  stage.addEventListener('pointerdown', e => { if (e.target.closest('button, [contenteditable]')) return; sx = e.clientX; sy = e.clientY; });
  addEventListener('pointerup', e => {
    if (sx === null) return;
    const dx = e.clientX - sx, dy = e.clientY - sy; sx = null;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) go(cur + (dx < 0 ? 1 : -1));
  });

  // keyboard: arrows while the deck is on screen
  let inView = false;
  new IntersectionObserver(([en]) => { inView = en.intersectionRatio > .45; }, { threshold: [0, .45, 1] }).observe(stage);
  addEventListener('keydown', e => {
    const a = document.activeElement;
    if (a && (a.isContentEditable || /INPUT|TEXTAREA/.test(a.tagName))) return;
    if (document.querySelector('dialog[open]')) return;
    const theater = deck.classList.contains('theater');
    if (e.key === 'Escape' && theater) return setTheater(false);
    if (!inView && !theater) return;
    if (e.key === 'ArrowRight') { go(cur + 1); e.preventDefault(); }
    if (e.key === 'ArrowLeft') { go(cur - 1); e.preventDefault(); }
  });

  // theater mode (works inside frames where the Fullscreen API is blocked)
  const fit = () => {
    const w = innerWidth - 32, h = innerHeight - (innerWidth < 600 ? 150 : 110);
    let width = Math.min(w, h * 16 / 9);
    if (width <= 760) width = Math.min(w, h * 4 / 5);
    deck.style.width = width + 'px';
  };
  function setTheater(on) {
    deck.classList.toggle('theater', on);
    document.body.classList.toggle('theater-on', on);
    deck.querySelector('.full').setAttribute('aria-label', on ? 'Sair da tela cheia' : 'Tela cheia');
    if (on) { fit(); deck.focus({ preventScroll: true }); } else deck.style.width = '';
  }
  deck.querySelector('.full').onclick = () => setTheater(!deck.classList.contains('theater'));
  addEventListener('resize', () => { if (deck.classList.contains('theater')) fit(); });

  // slide 2: split blocks + highlight parts
  const concept = stage.querySelector('.s-concept');
  const splitBtn = concept.querySelector('[data-split-toggle]');
  splitBtn.onclick = () => {
    const on = concept.classList.toggle('apart');
    splitBtn.textContent = on ? 'Juntar os blocos' : 'Separar os blocos';
  };
  concept.querySelectorAll('[data-hl]').forEach(li => {
    li.addEventListener('pointerenter', () => { concept.dataset.hl = li.dataset.hl; });
    li.addEventListener('pointerleave', () => { delete concept.dataset.hl; });
    li.addEventListener('click', () => { concept.dataset.hl === li.dataset.hl ? delete concept.dataset.hl : (concept.dataset.hl = li.dataset.hl); });
  });

  // slide 5: colors, light/dark values, copy hex
  const colors = stage.querySelector('.s-colors');
  const paint = theme => {
    colors.dataset.theme = theme;
    colors.querySelectorAll('[data-theme-btn]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.themeBtn === theme)));
    colors.querySelectorAll('[data-l]').forEach(el => {
      const hex = theme === 'dark' ? el.dataset.dk : el.dataset.l;
      el.style.setProperty('--c', hex);
      const lum = parseInt(hex.slice(1, 3), 16) * .299 + parseInt(hex.slice(3, 5), 16) * .587 + parseInt(hex.slice(5, 7), 16) * .114;
      el.style.setProperty('--on', lum > 150 ? '#0E1424' : '#ffffff');
      const hx = el.querySelector('.hx'); if (hx) hx.textContent = hex;
    });
  };
  paint('light');
  colors.addEventListener('click', e => {
    const t = e.target.closest('[data-theme-btn]'); if (t) return paint(t.dataset.themeBtn);
    const c = e.target.closest('[data-l]'); if (!c) return;
    const hex = getComputedStyle(c).getPropertyValue('--c').trim();
    const label = c.querySelector('.hx') || c.lastChild;
    const prev = label.textContent;
    const show = txt => { label.textContent = txt; clearTimeout(c._t); c._t = setTimeout(() => { label.textContent = prev; }, 1300); };
    try { navigator.clipboard.writeText(hex).then(() => show('copiado'), () => show(hex)); } catch (err) { show(hex); }
  });

  // slide 8: business card flip
  const bcard = stage.querySelector('.bcard');
  bcard.onclick = () => bcard.classList.toggle('flip');

  go(0);

  /* ---------- site viewer ---------- */
  const PAGES = [
    { id: 'main', name: 'Home', path: '', desc: 'A primeira impressão: o que a Blocko faz, os produtos próprios, o processo em etapas e as dúvidas mais comuns.' },
    { id: 'servicos', name: 'Serviços', path: '/servicos', desc: 'Apps sob medida, SaaS e integração com IA, cada serviço como um bloco que abre os detalhes.' },
    { id: 'produtos', name: 'Produtos', path: '/produtos', desc: 'Quadro, PET ID, MenuGo e Stockly: os sistemas da própria Blocko, prontos para usar.' },
    { id: 'cases', name: 'Cases', path: '/cases', desc: 'Projetos entregues contados como história: o problema, a solução e o resultado.' },
    { id: 'sobre', name: 'Sobre', path: '/sobre', desc: 'Quem está por trás dos blocos e como a empresa trabalha, como um sócio técnico.' },
    { id: 'contato', name: 'Contato', path: '/contato', desc: 'Formulário curto para contar a ideia e começar o projeto.' }
  ];
  const vw = document.getElementById('viewer');
  const vStage = vw.querySelector('.vw-stage');
  const tabs = document.getElementById('vwPages');
  const mini = document.getElementById('vwMini'), miniImg = mini.querySelector('img'), win = mini.querySelector('.win');
  const bar = document.getElementById('vwBar'), tourBtn = document.getElementById('vwTour');
  let page = 0, dev = innerWidth < 700 ? 'm' : 'd';

  tabs.innerHTML = PAGES.map((p, i) => `<button type="button" role="tab"><span>${pad(i + 1)}</span>${p.name}</button>`).join('');
  const tabBtns = [...tabs.children];
  const screen = () => vStage.querySelector(dev === 'd' ? '.browser .screen' : '.phone .screen');
  const src = (p, d) => `img/blocko/${p.id}-${d}.webp`;

  function show(i, d = dev) {
    page = (i + PAGES.length) % PAGES.length; dev = d;
    const p = PAGES[page];
    vStage.dataset.dev = dev;
    vw.querySelectorAll('[data-dev]').forEach(b => b.tagName === 'BUTTON' && b.setAttribute('aria-pressed', String(b.dataset.dev === dev)));
    tabBtns.forEach((b, k) => b.setAttribute('aria-selected', String(k === page)));
    const tb = tabBtns[page];
    if (tabs.scrollWidth > tabs.clientWidth) tabs.scrollTo({ left: tb.offsetLeft - tabs.clientWidth / 2 + tb.offsetWidth / 2, behavior: 'smooth' });
    document.getElementById('vwAddr').textContent = 'blocko.com.br' + p.path;
    document.getElementById('vwNum').textContent = `${pad(page + 1)} / ${pad(PAGES.length)}`;
    document.getElementById('vwName').textContent = p.name;
    document.getElementById('vwDesc').textContent = p.desc;
    const sc = screen(), img = sc.querySelector('img');
    img.classList.add('out');
    const next = new Image(); next.src = src(p, dev);
    const swap = () => { img.src = next.src; img.alt = `Página ${p.name} do site da Blocko`; sc.scrollTop = 0; img.classList.remove('out'); syncMini(); };
    next.decode ? next.decode().then(swap, swap) : (next.onload = swap);
    miniImg.src = src(p, dev);
    [...PAGES.keys()].forEach(k => { if (Math.abs(k - page) === 1) new Image().src = src(PAGES[k], dev); });
  }

  function syncMini() {
    const sc = screen(), max = sc.scrollHeight - sc.clientHeight;
    const r = max > 0 ? sc.scrollTop / max : 0;
    bar.style.width = (r * 100).toFixed(2) + '%';
    if (!miniImg.naturalWidth) return;
    const h = miniImg.clientHeight, w = miniImg.clientWidth;
    const ratio = sc.clientHeight / Math.max(1, sc.scrollHeight);
    win.style.width = w + 4 + 'px';
    win.style.height = Math.max(8, h * ratio) + 'px';
    win.style.top = 6 + (h - h * ratio) * r - 2 + 'px';
  }
  miniImg.addEventListener('load', syncMini);
  vStage.querySelectorAll('.screen').forEach(sc => sc.addEventListener('scroll', syncMini, { passive: true }));
  addEventListener('resize', syncMini);

  const jump = e => {
    const r = miniImg.getBoundingClientRect(), sc = screen();
    const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    sc.scrollTop = y * sc.scrollHeight - sc.clientHeight / 2;
  };
  let miniDrag = false;
  mini.addEventListener('pointerdown', e => { miniDrag = true; stopTour(); jump(e); mini.setPointerCapture(e.pointerId); });
  mini.addEventListener('pointermove', e => { if (miniDrag) jump(e); });
  mini.addEventListener('pointerup', () => { miniDrag = false; });

  tabs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { stopTour(); show(tabBtns.indexOf(b)); } });
  vw.querySelectorAll('.seg [data-dev]').forEach(b => b.onclick = () => show(page, b.dataset.dev));

  // drag to scroll with the mouse inside the screens
  vStage.querySelectorAll('.screen').forEach(sc => {
    let y0 = null, t0 = 0;
    sc.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; stopTour(); y0 = e.clientY; t0 = sc.scrollTop; sc.style.cursor = 'grabbing'; });
    addEventListener('pointermove', e => { if (y0 !== null) sc.scrollTop = t0 - (e.clientY - y0); });
    addEventListener('pointerup', () => { y0 = null; sc.style.cursor = ''; });
    sc.addEventListener('wheel', stopTour, { passive: true });
    sc.addEventListener('touchstart', stopTour, { passive: true });
    sc.style.cursor = 'grab';
  });

  // guided tour: scroll each page top to bottom, then move on
  let touring = false, last = 0, hold = 0, pos = 0;
  function stopTour() { if (!touring) return; touring = false; tourBtn.setAttribute('aria-pressed', 'false'); }
  function tick(t) {
    if (!touring) return;
    const dt = Math.min(64, t - (last || t)); last = t;
    const sc = screen(), max = sc.scrollHeight - sc.clientHeight;
    if (hold > 0) hold -= dt;
    else if (pos < max - 1) {
      pos = Math.min(max, pos + dt * (dev === 'd' ? .32 : .26)); // px per ms
      sc.scrollTop = pos;
    } else { show(page + 1); pos = 0; hold = 1300; }
    requestAnimationFrame(tick);
  }
  tourBtn.onclick = () => {
    if (touring) return stopTour();
    touring = true; tourBtn.setAttribute('aria-pressed', 'true');
    pos = screen().scrollTop; hold = 500; last = 0;
    requestAnimationFrame(tick);
  };

  show(0, dev);
})();
