(() => {
  const pad = n => String(n).padStart(2, '0');
  const ico = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="${d}"/></svg>`;

  /* ---------- edits player ---------- */
  const EDITS = [
    { id: 'rapture', name: 'Ruptura de AWP', note: 'Edit de AWP', time: '0:35' },
    { id: 'ancora', name: 'Âncora', note: 'Bomb B · Cache', time: '0:37' },
    { id: 'acido', name: 'Ácido', note: 'Edit de CS2', time: '0:28' },
    { id: 'dancin', name: "Dancin'", note: 'Edit de CS2', time: '0:34' },
    { id: 'cs2', name: 'CS2 Fragmovie', note: 'Fragmovie', time: '0:22' }
  ];
  const video = document.getElementById('plVideo');
  const list = document.getElementById('plList');
  if (video && list) {
    list.innerHTML = EDITS.map((e, i) => `<li><button type="button" data-i="${i}" aria-current="${i === 0}">
      <span class="th"><img src="img/deluccky/${e.id}.jpg" alt="" loading="lazy" width="320" height="180"><time>${e.time}</time></span>
      <span><b>${e.name}</b><small>${e.note}</small></span></button></li>`).join('');
    const btns = [...list.querySelectorAll('button')];
    const load = (i, play) => {
      const e = EDITS[i];
      video.poster = `img/deluccky/${e.id}.jpg`;
      video.src = `img/deluccky/${e.id}.mp4`;
      video.setAttribute('aria-label', `Edit ${e.name}`);
      btns.forEach((b, j) => b.setAttribute('aria-current', i === j));
      if (play) video.play().catch(() => {});
    };
    load(0, false);
    list.addEventListener('click', ev => {
      const b = ev.target.closest('button');
      if (b) load(+b.dataset.i, true);
    });
    video.addEventListener('ended', () => {
      const i = btns.findIndex(b => b.getAttribute('aria-current') === 'true');
      load((i + 1) % EDITS.length, true);
    });
  }

  /* ---------- slide decks ---------- */
  document.querySelectorAll('.dl-deck').forEach(deck => {
    const pre = deck.dataset.deck, n = +deck.dataset.count;
    const src = i => `img/deluccky/${pre}-${pre === 'id' ? pad(i + 1) : i + 1}.jpg`;
    deck.innerHTML = `
      <div class="stage" tabindex="0" role="region" aria-roledescription="apresentação" aria-label="${deck.getAttribute('aria-label')}">
        <div class="track">${Array.from({ length: n }, (_, i) => `<img src="${src(i)}" alt="Página ${i + 1} de ${n}" ${i > 1 ? 'loading="lazy"' : ''} width="1600" height="900" draggable="false">`).join('')}</div>
      </div>
      <div class="ctrl">
        <span class="count" aria-live="polite"></span>
        <div class="btns">
          <button type="button" class="full" aria-label="Tela cheia">${ico('M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5')}</button>
          <button type="button" class="prev" aria-label="Página anterior">${ico('M15 5l-7 7 7 7')}</button>
          <button type="button" class="next" aria-label="Próxima página">${ico('M9 5l7 7-7 7')}</button>
        </div>
      </div>
      <div class="thumbs">${Array.from({ length: n }, (_, i) => `<button type="button" data-i="${i}" aria-label="Ir para a página ${i + 1}"><img src="${src(i)}" alt="" loading="lazy" width="160" height="90"></button>`).join('')}</div>`;
    const stage = deck.querySelector('.stage'), track = deck.querySelector('.track');
    const count = deck.querySelector('.count'), thumbs = [...deck.querySelectorAll('.thumbs button')];
    let cur = 0;
    const go = i => {
      cur = Math.max(0, Math.min(n - 1, i));
      track.style.transform = `translateX(${-cur * 100}%)`;
      count.innerHTML = `<b>${pad(cur + 1)}</b> / ${pad(n)}`;
      thumbs.forEach((t, j) => t.setAttribute('aria-current', j === cur));
      const t = thumbs[cur], box = t.parentElement;
      box.scrollTo({ left: t.offsetLeft - box.clientWidth / 2 + t.clientWidth / 2, behavior: 'smooth' });
    };
    go(0);
    deck.querySelector('.prev').onclick = () => go(cur - 1);
    deck.querySelector('.next').onclick = () => go(cur + 1);
    deck.querySelector('.thumbs').onclick = e => { const b = e.target.closest('button'); if (b) go(+b.dataset.i); };
    deck.querySelector('.full').onclick = () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else if (deck.requestFullscreen) deck.requestFullscreen().catch(() => {});
    };
    stage.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { go(cur + 1); e.preventDefault(); }
      if (e.key === 'ArrowLeft') { go(cur - 1); e.preventDefault(); }
    });

    // drag / swipe
    let x0 = null, dx = 0;
    stage.addEventListener('pointerdown', e => { x0 = e.clientX; dx = 0; stage.setPointerCapture(e.pointerId); });
    stage.addEventListener('pointermove', e => {
      if (x0 === null) return;
      dx = e.clientX - x0;
      if (Math.abs(dx) > 4) {
        stage.classList.add('drag');
        track.style.transform = `translateX(calc(${-cur * 100}% + ${dx}px))`;
      }
    });
    const end = () => {
      if (x0 === null) return;
      stage.classList.remove('drag'); x0 = null;
      const w = stage.clientWidth;
      if (dx < -w * .12) go(cur + 1); else if (dx > w * .12) go(cur - 1); else go(cur);
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
  });
})();
