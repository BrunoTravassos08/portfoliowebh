/* Case page shared by the Blocko apps: app.html?a=<id> reads SITE.apps[id] (data.js).
   Runs before app.js so the headline split, tones and carousel find the finished page. */
(() => {
  const S = window.SITE, apps = S.apps || {};
  let id = new URLSearchParams(location.search).get('a');
  if (!apps[id]) id = Object.keys(apps)[0];
  const A = apps[id], dir = `img/apps/${id}/`;
  const $ = s => document.getElementById(s);
  const pad = n => String(n).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  document.title = `${A.name} · Bruno Travassos`;
  const root = document.documentElement.style;
  root.setProperty('--ap-bg', A.bg); root.setProperty('--ap-accent', A.accent); root.setProperty('--ap-status', A.status || '#fff');
  $('apEyebrow').textContent = A.eyebrow;
  $('apName').textContent = A.name;
  $('apIcon').src = dir + 'icon.webp';
  $('apWho').textContent = A.who;
  $('apLede').innerHTML = A.lede;
  $('apFacts').innerHTML = A.facts.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join('');

  const parts = [];
  /* ---------- phone screens ---------- */
  if (A.phone && A.phone.length) {
    $('celular').hidden = false; parts.push(['celular', 'Celular']);
    const rail = $('apPhones');
    rail.innerHTML = A.phone.map(([f, t, d, kind], i) => {
      const src = dir + (f.startsWith('s-') ? f : 'm-' + f) + '.webp';
      return `<figure class="ap-ph${kind === 'story' ? ' story' : ''}">
        <div class="phone"><div class="screen" tabindex="0" aria-label="${esc(t)}, role para ver"><img src="${src}" alt="Tela ${esc(t)} do ${esc(A.name)}" ${i > 2 ? 'loading="lazy"' : ''} draggable="false"></div><span class="island"></span></div>
        <figcaption><b>${pad(i + 1)}</b> ${esc(t)}<span>${esc(d)}</span></figcaption></figure>`;
    }).join('');
    const count = $('apPhoneCount'), n = A.phone.length;
    const step = () => rail.firstElementChild.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || 24);
    const sync = () => { const i = Math.min(n - 1, Math.round(rail.scrollLeft / step())); count.innerHTML = `<b>${pad(i + 1)}</b> / ${pad(n)}`; };
    rail.addEventListener('scroll', sync, { passive: true }); sync();
    const sec = $('celular');
    sec.querySelector('.prev').onclick = () => rail.scrollBy({ left: -step(), behavior: 'smooth' });
    sec.querySelector('.next').onclick = () => rail.scrollBy({ left: step(), behavior: 'smooth' });
    // drag the rail sideways with the mouse; vertical drags scroll the phone screen
    let down = null;
    rail.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      const sc = e.target.closest('.screen');
      down = { x: e.clientX, y: e.clientY, l: rail.scrollLeft, sc, t: sc ? sc.scrollTop : 0, axis: null };
    });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - down.x, dy = e.clientY - down.y;
      if (!down.axis && Math.hypot(dx, dy) > 5) { down.axis = Math.abs(dx) > Math.abs(dy) || !down.sc ? 'x' : 'y'; rail.classList.add('dragging'); }
      if (down.axis === 'x') rail.scrollLeft = down.l - dx;
      if (down.axis === 'y') down.sc.scrollTop = down.t - dy;
    });
    addEventListener('pointerup', () => {
      if (!down) return;
      if (down.axis === 'x') { const s = step(); rail.scrollTo({ left: Math.round(rail.scrollLeft / s) * s, behavior: 'smooth' }); }
      rail.classList.remove('dragging'); down = null;
    });
  }

  /* ---------- web screens ---------- */
  if (A.web && A.web.length) {
    $('web').hidden = false; parts.push(['web', 'Sistema web']);
    $('apAddr').textContent = A.addr || '';
    const tabs = $('apTabs'), screen = $('apScreen'), img = screen.querySelector('img');
    tabs.innerHTML = A.web.map(([, t], i) => `<button type="button" role="tab" data-i="${i}" aria-selected="false"><span>${pad(i + 1)}</span>${esc(t)}</button>`).join('');
    const btns = [...tabs.children];
    const show = i => {
      const [f, t, d] = A.web[i];
      btns.forEach((b, j) => b.setAttribute('aria-selected', i === j));
      $('apNum').textContent = `${pad(i + 1)} / ${pad(A.web.length)}`;
      $('apTabName').textContent = t; $('apTabDesc').textContent = d;
      img.classList.add('out');
      const next = new Image();
      next.onload = () => { img.src = next.src; img.alt = `Tela ${t} do ${A.name}`; screen.scrollTop = 0; img.classList.remove('out'); };
      next.src = dir + 'd-' + f + '.webp';
    };
    tabs.addEventListener('click', e => { const b = e.target.closest('button'); if (b) show(+b.dataset.i); });
    tabs.addEventListener('keydown', e => {
      const i = btns.indexOf(document.activeElement); if (i < 0) return;
      const j = e.key === 'ArrowRight' ? i + 1 : e.key === 'ArrowLeft' ? i - 1 : -1;
      if (j >= 0 && j < btns.length) { btns[j].focus(); show(j); e.preventDefault(); }
    });
    // drag to scroll with the mouse inside the browser
    let d = null;
    screen.addEventListener('pointerdown', e => { if (e.pointerType === 'mouse') { d = { y: e.clientY, t: screen.scrollTop }; screen.classList.add('grab'); } });
    addEventListener('pointermove', e => { if (d) screen.scrollTop = d.t - (e.clientY - d.y); });
    addEventListener('pointerup', () => { d = null; screen.classList.remove('grab'); });
    show(0);
  }

  /* ---------- brand ---------- */
  if (A.brand) { $('marca').hidden = false; parts.push(['marca', 'Marca']); $('apBrand').src = dir + A.brand + '.webp'; $('apBrand').alt = `Identidade visual ${A.name}`; }

  /* ---------- launch carousel (rendered by app.js) ---------- */
  if (A.carousel && (S.carousels || {})[A.carousel]) { $('lancamento').hidden = false; parts.push(['lancamento', 'Lançamento']); $('apCarousel').dataset.carousel = A.carousel; }

  parts.forEach(([sid], i) => { const e = document.querySelector(`#${sid} [data-n]`); e.textContent = `${pad(i + 1)} · ${e.textContent}`; });
  // alternate graphite / light slides like the rest of the portfolio
  parts.forEach(([sid], i) => { document.getElementById(sid).dataset.tone = i % 2 ? 'dark' : 'light'; });
  $('apToc').innerHTML = parts.map(([sid, t], i) => `<a href="#${sid}"><b>${pad(i + 1)}</b> ${t}</a>`).join('');
})();
