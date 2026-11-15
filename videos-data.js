/* Biblioteca de vídeos do portfólio: usada pela página Vídeos (videos.js) e pela seção "Vídeos novos" do Início (home-videos.js).
   Para adicionar um vídeo: coloque o .mp4 e o pôster .webp em img/ e acrescente uma linha na categoria certa, com `added` = data de hoje
   ('AAAA-MM-DD' ou 'AAAA-MM-DDTHH:MM'). A ordem é automática: o vídeo mais novo vai para o primeiro lugar em todo o site, a categoria
   dele sobe para o topo e ele ganha o selo "Novo" por 14 dias. src/poster são caminhos dentro de img/ (sem "img/").
   ratio: '16:9' (padrão), '4:5' ou '9:16'. silent: vídeo sem áudio. */
(() => {
  const LIB = [
    {
      id: 'animacao', name: 'Animação narrada', client: 'Motion graphics',
      desc: 'Histórias curtas contadas com pictogramas em preto e branco: motion graphics 2D com narração, efeitos sonoros e legenda, no formato vertical dos Reels e do TikTok.',
      link: 'sobre.html#contato', linkText: 'Quero um vídeo assim',
      items: [
        { id: 'so-mais-cinco-minutos', added: '2026-11-13T03:20', name: 'Só mais cinco minutos', note: 'Animação 2D narrada · Reels 9:16', time: '1:29', src: 'videos/so-mais-cinco-minutos.mp4', poster: 'videos/so-mais-cinco-minutos.webp', ratio: '9:16' },
        { id: 'corrida-dos-ratos', added: '2026-11-13T03:19', name: 'Corrida dos Ratos', note: 'Animação 2D narrada · Reels 9:16', time: '1:21', src: 'videos/corrida-dos-ratos.mp4', poster: 'videos/corrida-dos-ratos.webp', ratio: '9:16' }
      ]
    },
    {
      id: 'edits', name: 'Edits de CS2', client: 'DeLuccky',
      desc: 'Gameplay de Counter-Strike 2 virando edit: cortes no ritmo da música, zoom, velocidade e efeitos, para o canal do DeLuccky.',
      link: 'deluccky.html#edits', linkText: 'Ver o case DeLuccky',
      items: [
        { id: 'kill-varada', added: '2026-11-12', name: '2 Kill de varada', note: 'Edit de AWP · Nuke', time: '0:22', case: 'deluccky.html?edit=kill-varada#edits' },
        { id: 'defuse-fail', added: '2026-11-12', name: 'Defuse fail', note: 'Edit de CS2 · Dust II', time: '1:04', case: 'deluccky.html?edit=defuse-fail#edits' },
        { id: 'rocambolezinho', added: '2026-11-12', name: 'Meu rocambolezinho', note: 'Edit de CS2 · Mirage', time: '0:38', case: 'deluccky.html?edit=rocambolezinho#edits' },
        { id: 'nike-007', added: '2026-11-12', name: 'Nike 007 xitado', note: 'Edit de AWP · Mirage', time: '1:00', case: 'deluccky.html?edit=nike-007#edits' },
        { id: 'rapture', added: '2026-10-26', name: 'Ruptura de AWP', note: 'Edit de AWP', time: '0:35' },
        { id: 'ancora', added: '2026-10-26', name: 'Âncora', note: 'Bomb B · Cache', time: '0:37' },
        { id: 'acido', added: '2026-10-26', name: 'Ácido', note: 'Edit de CS2', time: '0:28' },
        { id: 'dancin', added: '2026-10-26', name: "Dancin'", note: 'Edit de CS2', time: '0:34' },
        { id: 'cs2', added: '2026-10-26', name: 'CS2 Fragmovie', note: 'Fragmovie', time: '0:22' },
        { id: 'tunel', added: '2026-10-26', name: 'Túnel superior', note: 'Edit de AWP · Mirage', time: '0:41' },
        { id: 'sala', added: '2026-10-26', name: 'Sala', note: 'Edit de AWP · Mirage', time: '1:00' },
        { id: 'vhs', added: '2026-10-26', name: 'Fita VHS', note: 'Edit de CS2 · efeito VHS', time: '0:49' }
      ].map(v => ({ ...v, src: `deluccky/${v.id}.mp4`, poster: `deluccky/${v.id}.webp`, case: v.case || `deluccky.html?edit=${v.id}#edits` }))
    },
    {
      id: 'apps', name: 'Motion para apps', client: 'Blocko',
      desc: 'Vídeos de lançamento dos produtos da Blocko: as telas do app ganham movimento para mostrar o fluxo inteiro em poucos segundos, no formato do feed e dos Reels.',
      link: 'blocko.html', linkText: 'Ver o case Blocko',
      items: [
        { id: 'petid', added: '2026-10-26', name: 'Pet ID em ação', note: 'Lançamento do app · Feed 4:5', time: '0:39', src: 'blocko/petid-video.mp4', poster: 'blocko/petid-video.webp', ratio: '4:5', silent: true, case: 'app.html?a=petid' },
        { id: 'stockly', added: '2026-10-26', name: 'Stockly', note: 'Sistema de estoque e vendas · Feed 4:5', time: '0:40', src: 'blocko/stockly-7.mp4', poster: 'blocko/stockly-7.webp', ratio: '4:5', silent: true, case: 'app.html?a=stockly' },
        { id: 'barberflow', added: '2026-10-26', name: 'BarberFlow', note: 'Sistema para barbearias · Feed 4:5', time: '0:40', src: 'blocko/barberflow-video.mp4', poster: 'blocko/barberflow-video.webp', ratio: '4:5', silent: true, case: 'app.html?a=barberflow' },
        { id: 'kanban', added: '2026-10-26', name: 'Quadro · Kanban Blocko', note: 'Kanban da Blocko · Feed 4:5', time: '0:38', src: 'blocko/quadro-video.mp4', poster: 'blocko/quadro-video.webp', ratio: '4:5', silent: true, case: 'app.html?a=kanban' },
        { id: 'menugo', added: '2026-10-26', name: 'MenuGo · Reels', note: 'Cardápio digital · Reels 9:16', time: '0:18', src: 'blocko/reels.mp4', poster: 'blocko/post-reels.webp', ratio: '9:16', silent: true, case: 'app.html?a=menugo' }
      ]
    },
    {
      id: 'web', name: 'Sites em movimento', client: 'Webdesign',
      desc: 'Tours gravados dos sites que eu desenho e desenvolvo, de ponta a ponta, com as animações e os objetos 3D rodando de verdade.',
      link: 'projetos.html', linkText: 'Ver projetos de webdesign',
      items: [
        { id: 'tour-portfolio', added: '2026-11-13T02:04', name: 'Tour do portfólio', note: 'Este site · gravação de tela', time: '1:34', src: 'videos/tour-portfolio.mp4', poster: 'videos/tour-portfolio.webp', silent: true }
      ]
    }
  ];

  const NEW_DAYS = 14;
  const now = Date.now();
  const time = v => Date.parse(v.added.length === 10 ? v.added + 'T00:00' : v.added) || 0;
  const byNewest = (a, b) => time(b) - time(a); // sort estável: mesma data mantém a ordem da lista
  LIB.forEach(c => {
    c.items.forEach(v => { v.isNew = now - time(v) < NEW_DAYS * 864e5; });
    c.items.sort(byNewest);
  });
  LIB.sort((a, b) => byNewest(a.items[0], b.items[0]));
  const ALL = [];
  LIB.forEach(c => c.items.forEach(v => ALL.push({ ...v, ratio: v.ratio || '16:9', cat: c, key: `${c.id}/${v.id}` })));
  ALL.sort(byNewest);
  window.BT_VIDEOS = { LIB, ALL };
})();
