/* Vídeos · biblioteca de vídeos por categoria (videos.html). Os vídeos ficam em videos-data.js. */
(() => {
  const { LIB, ALL } = window.BT_VIDEOS; // dados e ordem (mais novo primeiro) em videos-data.js

  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const secs = t => { const [m, s] = t.split(':').map(Number); return m * 60 + s; };
  const fmtTotal = s => s >= 60 ? `${Math.round(s / 60)} min` : `${s} s`;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = matchMedia('(hover: hover) and (pointer: fine)').matches;

  const arVal = r => r.replace(':', ' / ');

  /* ---------- head counts ---------- */
  const total = ALL.reduce((a, v) => a + secs(v.time), 0);
  document.getElementById('vtTotal').textContent = ALL.length;
  document.getElementById('vtMins').textContent = fmtTotal(total);
  document.getElementById('vtCats').textContent = LIB.length;

  /* ---------- filters ---------- */
  const filters = document.getElementById('vtFilters');
  filters.innerHTML = `<button type="button" data-f="all" aria-pressed="true">Todos<span>${ALL.length}</span></button>` +
    LIB.map(c => `<button type="button" data-f="${c.id}" aria-pressed="false">${esc(c.name)}<span>${c.items.length}</span></button>`).join('');

  /* ---------- shelves ---------- */
  const shelves = document.getElementById('vtShelves');
  shelves.innerHTML = LIB.map((c, ci) => {
    const t = c.items.reduce((a, v) => a + secs(v.time), 0);
    const tall = c.items.every(v => (v.ratio || '16:9') !== '16:9');
    return `<section class="vt-shelf closed${tall ? ' tall' : ''}" id="${c.id}" data-cat="${c.id}" aria-labelledby="vt-h-${c.id}">
      <header class="vt-shelf-head">
        <span class="vt-num" aria-hidden="true">${pad(ci + 1)}</span>
        <div>
          <p class="eyebrow">${esc(c.client)} · ${c.items.length} ${c.items.length > 1 ? 'vídeos' : 'vídeo'} · ${fmtTotal(t)}</p>
          <h2 id="vt-h-${c.id}">${esc(c.name)}</h2>
        </div>
        <p class="vt-desc">${esc(c.desc)} <a href="${c.link}">${esc(c.linkText)} →</a></p>
        <button type="button" class="vt-toggle" aria-expanded="false" aria-controls="vt-body-${c.id}"><span class="vt-tg-label">Abrir · ${c.items.length}</span><span class="vt-tg-ic" aria-hidden="true"></span></button>
      </header>
      <div class="vt-body" id="vt-body-${c.id}"><div class="vt-body-in">
      <ul class="vt-grid">${c.items.map((v, i) => {
        const it = ALL.find(a => a.key === `${c.id}/${v.id}`);
        return `<li class="vt-card" data-key="${it.key}" style="--ar:${tall ? arVal(it.ratio === '9:16' ? '4:5' : it.ratio) : '16 / 9'}">
          <button type="button" class="vt-hit" aria-label="Assistir ${esc(v.name)}">
            <span class="vt-media">
              <img src="img/${v.poster}" alt="" loading="lazy" width="640" height="360">
              <video data-src="img/${v.src}" muted playsinline preload="none" tabindex="-1" aria-hidden="true"></video>
              ${v.isNew ? '<span class="new-badge"><i></i>Novo</span>' : ''}
              <span class="vt-play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg></span>
              <time>${v.time}</time>
              <span class="vt-on" aria-hidden="true"><i></i><i></i><i></i>tocando</span>
            </span>
            <span class="vt-meta"><b>${pad(i + 1)}</b><span><strong>${esc(v.name)}</strong><small>${esc(v.note)}${v.silent ? ' · sem áudio' : ''}</small></span></span>
          </button>
        </li>`;
      }).join('')}</ul>
      </div></div>
    </section>`;
  }).join('');

  // a numeração das categorias segue o que está visível: sempre começa no 01
  const renumber = () => [...shelves.querySelectorAll('.vt-shelf:not([hidden])')].forEach((sh, k) => { sh.querySelector('.vt-num').textContent = pad(k + 1); });

  /* ---------- prateleiras retráteis (clique no título ou no botão) ---------- */
  const setOpen = (sh, open) => {
    sh.classList.toggle('closed', !open);
    const b = sh.querySelector('.vt-toggle');
    b.setAttribute('aria-expanded', open);
    b.querySelector('.vt-tg-label').textContent = open ? 'Recolher' : `Abrir · ${sh.querySelectorAll('.vt-card').length}`;
    sh.querySelector('.vt-body').inert = !open;
    const btn = document.getElementById('vtToggleAll');
    if (btn) btn.textContent = [...shelves.querySelectorAll('.vt-shelf:not([hidden])')].some(x => x.classList.contains('closed')) ? 'Abrir todas' : 'Recolher todas';
  };
  shelves.querySelectorAll('.vt-shelf').forEach(sh => {
    sh.querySelector('.vt-body').inert = true; // começa fechada; o visitante escolhe abrir
    sh.querySelector('.vt-shelf-head').addEventListener('click', e => {
      if (e.target.closest('a')) return;
      setOpen(sh, sh.classList.contains('closed'));
    });
  });
  document.getElementById('vtToggleAll').addEventListener('click', e => {
    const all = [...shelves.querySelectorAll('.vt-shelf:not([hidden])')];
    const open = all.some(sh => sh.classList.contains('closed'));
    all.forEach(sh => setOpen(sh, open));
  });

  /* ---------- theater ---------- */
  const th = document.getElementById('vtTheater');
  const screen = th.querySelector('.vt-screen');
  const video = th.querySelector('video');
  const bg = th.querySelector('.vt-bg');
  const big = th.querySelector('.vt-big');
  const info = document.getElementById('vtInfo');
  const ctrl = document.getElementById('vtCtrl'); // setas embaixo da lista A seguir
  const nextList = document.getElementById('vtNext');
  let list = ALL, cur = ALL[0], started = false;

  const nextOf = (v, step = 1) => { const i = list.indexOf(v); return list[(i + step + list.length) % list.length]; };
  const renderInfo = () => {
    const v = cur, i = list.indexOf(v);
    info.innerHTML = `
      <p class="eyebrow"><span class="vt-dot"></span>${started ? 'Tocando agora' : 'Em cartaz'} · ${esc(v.cat.name)}</p>
      <h2>${esc(v.name)}</h2>
      <p class="vt-note">${esc(v.cat.client)} · ${esc(v.note)} · ${v.time}${v.silent ? ' · sem áudio' : ''}</p>`;
    ctrl.innerHTML = `
        <button type="button" class="vt-arrow" data-step="-1" aria-label="Vídeo anterior"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M15 5l-7 7 7 7"/></svg></button>
        <span class="vt-count"><b>${pad(i + 1)}</b> / ${pad(list.length)}</span>
        <button type="button" class="vt-arrow" data-step="1" aria-label="Próximo vídeo"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 5l7 7-7 7"/></svg></button>
        ${v.case ? `<a class="vt-case" href="${v.case}">ver no case →</a>` : ''}`;
    const ups = [1, 2, 3, 4, 5, 6].map(k => nextOf(v, k)).filter((u, k, a) => u !== v && a.indexOf(u) === k);
    nextList.innerHTML = ups.length ? `<p class="eyebrow">A seguir</p><ol>${ups.map(u => `<li><button type="button" data-key="${u.key}">
      <span class="vt-thumb" style="--ar:${arVal(u.ratio)}"><img src="img/${u.poster}" alt="" loading="lazy" width="160" height="90"></span>
      <span><strong>${esc(u.name)}</strong><small>${esc(u.cat.name)} · ${u.time}</small></span></button></li>`).join('')}</ol>` : '';
  };
  const mark = () => document.querySelectorAll('.vt-card').forEach(c => c.classList.toggle('current', c.dataset.key === cur.key));

  const load = (v, play) => {
    cur = v;
    th.style.setProperty('--ar', arVal(v.ratio));
    th.dataset.ratio = v.ratio;
    bg.style.backgroundImage = `url("img/${v.poster}")`;
    video.poster = `img/${v.poster}`;
    video.removeAttribute('src'); video.load();
    video.setAttribute('aria-label', v.name);
    if (play) {
      started = true;
      video.src = `img/${v.src}`;
      video.muted = false; video.controls = true;
      th.classList.add('playing');
      // pausa qualquer prévia com som em outro lugar
      document.querySelectorAll('video').forEach(o => { if (o !== video && !o.paused) o.pause(); });
      video.play().catch(() => { video.muted = true; video.play().catch(() => {}); });
    } else {
      th.classList.remove('playing'); video.controls = false;
    }
    renderInfo(); mark();
    try { history.replaceState(null, '', `?v=${encodeURIComponent(v.key)}${location.hash}`); } catch (e) {}
  };
  const go = (v, scroll) => {
    load(v, true);
    if (scroll) {
      const r = th.getBoundingClientRect();
      if (r.top < 0 || r.bottom > innerHeight) th.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'center' });
    }
  };

  big.addEventListener('click', () => go(cur));
  video.addEventListener('ended', () => go(nextOf(cur)));
  ctrl.addEventListener('click', e => { const b = e.target.closest('[data-step]'); if (b) go(nextOf(cur, +b.dataset.step)); });
  nextList.addEventListener('click', e => { const b = e.target.closest('[data-key]'); if (b) go(ALL.find(a => a.key === b.dataset.key)); });
  th.addEventListener('keydown', e => {
    if (e.target.closest('video') && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return; // seek nativo
    if (e.key === 'ArrowRight') go(nextOf(cur)); else if (e.key === 'ArrowLeft') go(nextOf(cur, -1));
  });

  /* ---------- cards: prévia muda no hover, clique leva ao palco ---------- */
  document.querySelectorAll('.vt-card').forEach(card => {
    const v = card.querySelector('video');
    const item = ALL.find(a => a.key === card.dataset.key);
    card.querySelector('.vt-hit').addEventListener('click', () => go(item, true));
    if (fine && !reduce) {
      card.addEventListener('mouseenter', () => { if (!v.src) v.src = v.dataset.src; v.loop = true; v.play().then(() => card.classList.add('preview')).catch(() => {}); });
      card.addEventListener('mouseleave', () => { v.pause(); card.classList.remove('preview'); });
    }
  });

  /* ---------- filter ---------- */
  filters.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    const f = b.dataset.f;
    filters.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    document.querySelectorAll('.vt-shelf').forEach(s => { s.hidden = f !== 'all' && s.dataset.cat !== f; if (f !== 'all' && !s.hidden) setOpen(s, true); });
    renumber();
    list = f === 'all' ? ALL : ALL.filter(v => v.cat.id === f);
    if (!list.includes(cur)) load(list[0], false); else renderInfo();
    shelves.classList.remove('in'); void shelves.offsetWidth; shelves.classList.add('in');
  });

  // pausa o palco quando sai da tela
  if ('IntersectionObserver' in window) new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting && !video.paused) video.pause(); })).observe(screen);

  /* ---------- start: ?v=cat/id ou #categoria ---------- */
  const q = new URLSearchParams(location.search).get('v');
  const first = (q && ALL.find(a => a.key === q || a.id === q)) || ALL[0];
  const hashCat = location.hash.slice(1);
  if (hashCat && LIB.some(c => c.id === hashCat)) {
    const b = filters.querySelector(`[data-f="${hashCat}"]`); b && b.click();
    if (!q) load(list[0], false); else load(first, false);
  } else load(first, false);
})();
