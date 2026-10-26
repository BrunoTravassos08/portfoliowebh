(() => {
  const S = window.SITE;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const icon = d => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="${d}"/></svg>`;
  const ARROW_L = 'M15 5l-7 7 7 7', ARROW_R = 'M9 5l7 7-7 7', OUT = 'M5 19 19 5M9 5h10v10';
  // a slide is an image name (img/<name>.webp) or a video file (img/<name>.mp4, poster img/<name>.webp)
  const media = (s, alt, lazy) => s.endsWith('.mp4')
    ? `<video src="img/${s}" poster="img/${s.replace(/\.mp4$/, '.webp')}" muted loop playsinline data-auto preload="none" aria-label="${alt}" width="1080" height="1350"></video>`
    : `<img src="img/${s}.webp" alt="${alt}"${lazy ? ' loading="lazy"' : ''} decoding="async" width="1080" height="1350" draggable="false">`;
  // looping videos only download and play while on screen
  const vio = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
    const v = e.target;
    if (e.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); } else v.pause();
  }), { rootMargin: '200px' }) : null;
  const watch = root => root.querySelectorAll('video[data-auto]').forEach(v => vio ? vio.observe(v) : (v.autoplay = true));

  /* ---------- split headline letters ---------- */
  document.querySelectorAll('[data-split]').forEach(h => {
    const txt = h.textContent.trim();
    h.setAttribute('aria-label', txt); h.textContent = '';
    let i = 0;
    txt.split(' ').forEach((word, w) => {
      if (w) h.appendChild(document.createTextNode(' '));
      const ws = document.createElement('span'); ws.className = 'w'; ws.setAttribute('aria-hidden', 'true');
      [...word].forEach(ch => {
        const s = document.createElement('span');
        s.textContent = ch; s.style.animationDelay = (i++ * 0.04) + 's';
        ws.appendChild(s);
      });
      h.appendChild(ws);
    });
  });

  /* ---------- featured cases with carousels (home) ---------- */
  const featured = document.getElementById('featured');
  if (featured) {
    featured.innerHTML = S.projects.filter(p => p.featured).map(p => `
      <article class="case" data-id="${p.id}">
        <div class="case-top">
          <h3>${esc(p.name)}<small>${esc(p.role)}</small></h3>
          <div>
            <p>${esc(p.summary)}</p>
            <div class="tags">${p.tags.map(t => `<span>${esc(t)}</span>`).join('')}</div>
            ${p.page ? `<a class="btn case-link magnet" href="${p.page}">Ver case completo ${icon(OUT)}</a>` : ''}
          </div>
        </div>
        <div class="carousel"></div>
      </article>`).join('');
    featured.querySelectorAll('.case').forEach(el => carousel(el.querySelector('.carousel'), S.projects.find(p => p.id === el.dataset.id)));
    const total = document.getElementById('total');
    if (total) total.textContent = S.projects.length;
  }

  // extra carousels placed by a page (case pages)
  document.querySelectorAll('[data-carousel]').forEach(h => {
    const c = S.projects.find(p => p.id === h.dataset.carousel) || (S.carousels || {})[h.dataset.carousel];
    if (c) carousel(h, c);
  });

  function carousel(host, c) {
    host.innerHTML = `
      <div class="rail" data-cursor tabindex="0" aria-label="Slides de ${esc(c.name)}">
        ${c.slides.map((s, i) => `<button class="slide" type="button" data-i="${i}" aria-label="Ampliar slide ${i + 1} de ${c.slides.length}">
          ${media(s, `${esc(c.name)}, slide ${i + 1}`, true)}
          <span class="n">${i + 1}/${c.slides.length}</span></button>`).join('')}
      </div>
      <div class="ctrl">
        <div class="dots">${c.slides.map(() => '<i></i>').join('')}</div>
        <span class="hint">arraste e confira</span>
        <div class="arrows">
          <button type="button" class="prev" aria-label="Slide anterior">${icon(ARROW_L)}</button>
          <button type="button" class="next" aria-label="Próximo slide">${icon(ARROW_R)}</button>
        </div>
      </div>`;
    const rail = host.querySelector('.rail');
    watch(host);
    const dots = [...host.querySelectorAll('.dots i')];
    const step = () => rail.querySelector('.slide').getBoundingClientRect().width + 16;
    const sync = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      const idx = max <= 0 ? 0 : Math.round(rail.scrollLeft / max * (dots.length - 1));
      dots.forEach((d, i) => d.classList.toggle('on', i === idx));
    };
    rail.addEventListener('scroll', sync, { passive: true }); sync();
    host.querySelector('.prev').onclick = () => rail.scrollBy({ left: -step(), behavior: 'smooth' });
    host.querySelector('.next').onclick = () => rail.scrollBy({ left: step(), behavior: 'smooth' });

    let down = false, startX = 0, startL = 0, moved = 0;
    rail.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = 0; startX = e.clientX; startL = rail.scrollLeft;
    });
    addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - startX; moved = Math.max(moved, Math.abs(dx));
      if (moved > 4) rail.classList.add('dragging');
      rail.scrollLeft = startL - dx;
    });
    addEventListener('pointerup', () => {
      if (!down) return; down = false;
      if (rail.classList.contains('dragging')) {
        const keep = rail.scrollLeft; rail.classList.remove('dragging');
        rail.scrollLeft = keep;
        const s = step(); rail.scrollTo({ left: Math.round(keep / s) * s, behavior: 'smooth' });
      }
    });
    rail.addEventListener('click', e => {
      const b = e.target.closest('.slide');
      if (b && moved < 5) openLb(c, +b.dataset.i);
    });
  }

  /* ---------- all projects grid (projetos) ---------- */
  const grid = document.getElementById('grid');
  if (grid) {
    const filters = document.getElementById('filters');
    const cats = ['Todos', ...S.categories];
    const countOf = c => c === 'Todos' ? S.projects.length : S.projects.filter(p => p.category === c).length;
    let active = 'Todos';
    try { const h = decodeURIComponent(location.hash.slice(1)); if (cats.includes(h)) active = h; } catch (e) {}
    filters.innerHTML = cats.map(c => `<button type="button" data-c="${esc(c)}">${esc(c)}<span>${countOf(c)}</span></button>`).join('');
    const render = () => {
      filters.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', b.dataset.c === active));
      const list = S.projects.filter(p => active === 'Todos' || p.category === active);
      grid.innerHTML = list.length ? list.map(p => `
        <${p.page ? `a href="${p.page}"` : 'button type="button"'} class="card" data-id="${p.id}" data-cursor aria-label="${p.page ? 'Abrir o case' : 'Ver'} ${esc(p.name)}">
          <span class="pic">
            ${p.photo ? `<img class="face${p.photoLogo ? ' logo' : ''}" src="img/${p.photo}.webp" alt="" loading="lazy">` : ''}
            <img src="img/${p.slides[0]}.webp" alt="" loading="lazy" width="1080" height="1350">
            <span class="n">${p.page ? 'case completo' : p.slides.length + ' slides'}</span>
            ${p.photo ? `<span class="peek">${p.page ? 'abrir case' : 'ver capa'}</span>` : ''}
          </span>
          <span class="meta"><h3>${esc(p.name)}</h3><span class="cat">${esc(p.category)}</span><span>${esc(p.role)}</span></span>
        </${p.page ? 'a' : 'button'}>`).join('') : `<p class="empty">Ainda não há projetos de ${esc(active)} por aqui. Em breve.</p>`;
      const n = document.getElementById('total');
      if (n) n.textContent = String(list.length).padStart(2, '0');
    };
    filters.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { active = b.dataset.c; render(); } });
    grid.addEventListener('click', e => { const b = e.target.closest('button.card'); if (b) openLb(S.projects.find(p => p.id === b.dataset.id), 0); });
    render();
  }

  /* ---------- contacts (sobre) ---------- */
  const contacts = document.getElementById('contacts');
  if (contacts) {
    const c = S.contact;
    const rows = [
      { k: 'WhatsApp', v: c.whatsapp && '+' + c.whatsapp.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, '$1 $2 $3-$4'), href: c.whatsapp && `https://wa.me/${c.whatsapp}?text=${encodeURIComponent('Olá, Bruno! Vi seu portfólio e quero conversar sobre um projeto.')}` },
      { k: 'Instagram', v: c.instagram && '@' + c.instagram, href: c.instagram && `https://www.instagram.com/${c.instagram}/` },
      { k: 'LinkedIn', v: c.linkedin && c.linkedin.replace(/^https?:\/\/(www\.)?/, ''), href: c.linkedin },
      { k: 'Behance', v: c.behance && c.behance.replace(/^https?:\/\/(www\.)?/, ''), href: c.behance },
      { k: 'E-mail', v: c.email, copy: true }
    ];
    contacts.innerHTML = rows.map(r => {
      if (!r.v) return `<li><div class="off"><span class="k">${r.k}</span><span class="v">em breve</span><span></span></div></li>`;
      if (r.copy) return `<li><div class="copyrow"><span class="k">${r.k}</span><span class="v">${esc(r.v)}</span>
        <button class="copy" type="button" aria-label="Copiar e-mail" data-v="${esc(r.v)}">${icon('M9 9h10v10H9zM5 15V5h10')}</button></div></li>`;
      return `<li><a href="${esc(r.href)}" target="_blank" rel="noopener"><span class="k">${r.k}</span><span class="v">${esc(r.v)}</span><span class="ic">${icon(OUT)}</span></a></li>`;
    }).join('');
    contacts.addEventListener('click', e => {
      const b = e.target.closest('.copy'); if (!b) return;
      const done = () => { b.innerHTML = icon('M5 12l5 5 9-10'); setTimeout(() => { b.innerHTML = icon('M9 9h10v10H9zM5 15V5h10'); }, 1600); };
      const sel = () => { const r = document.createRange(); r.selectNodeContents(b.previousElementSibling); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };
      try { navigator.clipboard.writeText(b.dataset.v).then(done, sel); } catch (err) { sel(); }
    });
  }

  /* ---------- lightbox ---------- */
  const lb = document.getElementById('lb'), lbRail = document.getElementById('lbRail'), lbCount = document.getElementById('lbCount'), lbCap = document.getElementById('lbCap');
  let lbN = 0;
  function openLb(c, i) {
    lbN = c.slides.length;
    lbCap.innerHTML = `<b>${esc(c.name)}</b><span>${esc(c.role)} · ${esc(c.category)}</span>`;
    lbRail.innerHTML = c.slides.map((s, k) => `<figure>${media(s, `${esc(c.name)}, slide ${k + 1}`, Math.abs(k - i) > 1)}</figure>`).join('');
    lb.showModal();
    watch(lbRail);
    lbRail.scrollLeft = i * lbRail.clientWidth;
    lbSync();
  }
  const lbIdx = () => Math.round(lbRail.scrollLeft / Math.max(1, lbRail.clientWidth));
  const lbSync = () => { lbCount.textContent = String(lbIdx() + 1).padStart(2, '0') + ' / ' + String(lbN).padStart(2, '0'); };
  if (lb) {
    lbRail.addEventListener('scroll', lbSync, { passive: true });
    const lbGo = d => lbRail.scrollTo({ left: Math.min(lbN - 1, Math.max(0, lbIdx() + d)) * lbRail.clientWidth, behavior: 'smooth' });
    lb.querySelector('.x').onclick = () => lb.close();
    lb.querySelector('.pv').onclick = () => lbGo(-1);
    lb.querySelector('.nx').onclick = () => lbGo(1);
    lb.addEventListener('keydown', e => { if (e.key === 'ArrowRight') lbGo(1); if (e.key === 'ArrowLeft') lbGo(-1); });
    lb.addEventListener('click', e => { if (e.target.tagName === 'FIGURE') lb.close(); });
  }

  watch(document);
  lb && lb.addEventListener('close', () => { lbRail.querySelectorAll('video').forEach(v => { vio && vio.unobserve(v); v.pause(); }); lbRail.innerHTML = ''; });

  /* ---------- tone switching (light / graphite slides) ---------- */
  const toned = [...document.querySelectorAll('[data-tone]')];
  let scene = document.body.dataset.scene || 'hero';
  const pick = () => {
    const mid = innerHeight * 0.5;
    for (const el of toned) {
      const r = el.getBoundingClientRect();
      if (r.top <= mid && r.bottom > mid) {
        document.body.classList.toggle('dark', el.dataset.tone === 'dark');
        if (el.dataset.scene) scene = el.dataset.scene;
        break;
      }
    }
  };
  addEventListener('scroll', pick, { passive: true }); pick();

  /* ---------- cursor + magnetic buttons ---------- */
  const cur = document.querySelector('.cursor');
  let cx = innerWidth / 2, cy = innerHeight / 2, tx = cx, ty = cy;
  addEventListener('pointermove', e => {
    if (e.pointerType !== 'mouse') return;
    tx = e.clientX; ty = e.clientY;
    const t = e.target.closest('[data-cursor]');
    cur.classList.toggle('big', !!t);
    cur.firstElementChild.textContent = t && t.classList.contains('card') ? 'ver' : 'arraste';
  });
  document.querySelectorAll('.magnet').forEach(b => {
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px, ${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener('pointerleave', () => { b.style.transform = ''; });
  });
  (function loop() {
    cx += (tx - cx) * .2; cy += (ty - cy) * .2;
    cur.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  })();

  /* ---------- chrome objects ---------- */
  if (!window.THREE) return;
  const canvas = document.getElementById('stage');
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  const sc = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(35, 1, .1, 100);
  cam.position.z = 12;

  // studio environment: dark room with bright softbox stripes = the black/white chrome of the posts
  const ec = document.createElement('canvas'); ec.width = 1024; ec.height = 512;
  const g = ec.getContext('2d');
  const grd = g.createLinearGradient(0, 0, 0, 512);
  grd.addColorStop(0, '#d9d9d9'); grd.addColorStop(.35, '#2a2a2a'); grd.addColorStop(.55, '#0d0d0d'); grd.addColorStop(1, '#4a4a4a');
  g.fillStyle = grd; g.fillRect(0, 0, 1024, 512);
  g.filter = 'blur(5px)'; g.fillStyle = '#ffffff';
  [[0, 150, 1024, 16], [0, 196, 1024, 6], [120, 60, 160, 260], [620, 40, 90, 300], [820, 120, 60, 200], [0, 300, 1024, 10]]
    .forEach(([x, y, w, h]) => g.fillRect(x, y, w, h));
  g.filter = 'blur(18px)'; g.fillStyle = '#9a9a9a'; g.fillRect(380, 330, 220, 120);
  const etex = new THREE.CanvasTexture(ec);
  etex.mapping = THREE.EquirectangularReflectionMapping; etex.encoding = THREE.sRGBEncoding;
  const pmrem = new THREE.PMREMGenerator(renderer);
  sc.environment = pmrem.fromEquirectangular(etex).texture;
  const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 1, roughness: .07 });

  class Helix extends THREE.Curve {
    getPoint(t, out = new THREE.Vector3()) {
      const a = t * Math.PI * 2 * 5.5;
      return out.set(Math.cos(a) * 1.25, (t - .5) * 5.4, Math.sin(a) * 1.25);
    }
  }
  const spring = new THREE.Group();
  spring.add(new THREE.Mesh(new THREE.TubeGeometry(new Helix(), 480, .3, 28, false), mat));
  const cap = new THREE.SphereGeometry(.3, 32, 16), hx = new Helix();
  [0, 1].forEach(t => { const m = new THREE.Mesh(cap, mat); m.position.copy(hx.getPoint(t)); spring.add(m); });
  const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.35, .44, 256, 40, 2, 3), mat);
  sc.add(spring, knot);

  // positions per section, in "desktop" units (half width ≈ 6.7): [x, y, scale]
  const P = {
    hero:     { s: [5.6, -.1, .72], k: [-6.6, -3.3, .62] },
    work:     { s: [8.8, 2.8, .7],  k: [-8.6, -3.3, .7] },
    services: { s: [6.6, -.8, .7],  k: [-8.9, 3.6, .6] },
    grid:     { s: [7.9, 3.0, .6],  k: [5.4, 2.2, .45] },
    about:    { s: [-7.4, -2.6, .6], k: [7.6, 3.4, .5] },
    contact:  { s: [8.6, -2.2, .7], k: [-8.6, 2.8, .55] },
    cta:      { s: [-5.8, .2, .75], k: [-2.6, -3.6, .45] },
    ctaM:     { s: [6.4, .6, .8],   k: [5.6, -3.6, .55] }
  };
  const start = P[scene] || P.hero;
  const cur3 = { s: [...start.s], k: [...start.k] };
  let aspect = 1, mx = 0, my = 0, lastY = scrollY, vel = 0;
  const resize = () => {
    const w = innerWidth, hgt = innerHeight;
    renderer.setSize(w, hgt, false); cam.aspect = w / hgt; cam.updateProjectionMatrix(); aspect = w / hgt;
  };
  addEventListener('resize', resize); resize();
  addEventListener('pointermove', e => { mx = e.clientX / innerWidth - .5; my = e.clientY / innerHeight - .5; });

  const clock = new THREE.Clock();
  function frame() {
    const t = clock.getElapsedTime();
    const halfW = Math.tan(THREE.MathUtils.degToRad(17.5)) * 12 * aspect;
    const fx = halfW / 6.7, fs = THREE.MathUtils.clamp(aspect / 1.6, .42, 1);
    const tgt = (scene === 'cta' && aspect < 1) ? P.ctaM : (P[scene] || P.hero);
    ['s', 'k'].forEach(key => { for (let i = 0; i < 3; i++) cur3[key][i] += (tgt[key][i] - cur3[key][i]) * .045; });
    vel += ((scrollY - lastY) - vel) * .1; lastY = scrollY;
    const squash = THREE.MathUtils.clamp(vel * .004, -.18, .18);
    const wide = aspect < 1 ? 1.6 : 1;

    spring.position.set(cur3.s[0] * fx * wide, cur3.s[1], 0);
    spring.scale.set(cur3.s[2] * fs, cur3.s[2] * fs * (1 + squash), cur3.s[2] * fs);
    spring.rotation.set(.35 + my * .3, t * .5 + mx * .6, -.25);

    knot.position.set(cur3.k[0] * fx * wide, cur3.k[1], -1);
    knot.scale.setScalar(cur3.k[2] * fs);
    knot.rotation.set(t * .18 + my * .4, t * .27 + mx * .5, scrollY * .0012);

    renderer.render(sc, cam);
    if (!reduce) requestAnimationFrame(frame);
  }
  frame();
  if (reduce) addEventListener('scroll', () => requestAnimationFrame(frame), { passive: true });
})();
