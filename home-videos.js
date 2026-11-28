/* Início · "Vídeos novos": mostra sempre os 4 vídeos mais novos da videoteca (videos-data.js).
   Roda antes do app.js, que cuida da prévia no hover e do play com som. */
(() => {
  const list = document.querySelector('#videos .vid-list');
  if (!list || !window.BT_VIDEOS) return;
  const { ALL } = window.BT_VIDEOS;
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const top = ALL.slice(0, 4);
  list.innerHTML = top.map(v => {
    const tall = v.ratio !== '16:9';
    const link = v.case || `videos.html?v=${encodeURIComponent(v.key)}`;
    return `<li class="vid${tall ? ' vid-tall' : ''}">
        <div class="vid-media"${tall ? ` style="--poster:url('img/${v.poster}')"` : ''}>
          <img src="img/${v.poster}" alt="" loading="lazy" width="960" height="540">
          <video data-src="img/${v.src}" poster="img/${v.poster}" muted playsinline preload="none" width="1280" height="720" aria-label="${esc(v.name)}"></video>
          ${v.isNew ? '<span class="new-badge"><i></i>Novo</span>' : ''}
          <button type="button" class="vid-play" aria-label="Assistir ${esc(v.name)}${v.silent ? '' : ' com som'}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/></svg></button>
          <time>${v.time}</time>
        </div>
        <h3>${esc(v.name)}</h3>
        <p>${esc(v.cat.client)} · ${esc(v.note.split(" · ")[0])} · <a href="${link}">${v.case ? 'ver no case' : 'ver na videoteca'}</a></p>
      </li>`;
  }).join('');
  const more = document.getElementById('vidMore');
  if (more) more.textContent = `Mais ${ALL.length - top.length} vídeos na videoteca, entre ${window.BT_VIDEOS.LIB.map(c => /^[A-Z0-9]+$/.test(c.name) ? c.name : c.name.charAt(0).toLowerCase() + c.name.slice(1)).join(', ').replace(/, ([^,]*)$/, ' e $1')}`;
})();
