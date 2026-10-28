/* Conteúdo do site.
   Para adicionar um projeto: coloque as imagens em img/ e copie um bloco de "projects".
   photo é a foto do especialista no card da página Projetos (a capa aparece ao passar o mouse).
   featured: true faz o projeto aparecer na página inicial.
   Para contatos: preencha os campos vazios; os que ficarem vazios aparecem como "em breve". */
window.SITE = {
  contact: {
    whatsapp: '5581997067970',   // só números com DDI e DDD
    instagram: 'brunotravassosdesign',
    linkedin: 'https://www.linkedin.com/in/bruno-travassos-ab3640220',
    email: 'brunotravassos3@gmail.com',
    behance: 'https://www.behance.net/brunotravassosdesign'
  },
  categories: ['Social media', 'Identidade visual', 'Webdesign', 'Apps e sistemas'],
  // carrosséis extras mostrados dentro de páginas de case (não aparecem em Projetos)
  carousels: {
    'blocko-quadro': {
      name: 'Blocko · Quadro', role: 'Lançamento do kanban da Blocko', category: 'Social media',
      slides: ['blocko/quadro-1', 'blocko/quadro-2', 'blocko/quadro-3', 'blocko/quadro-4', 'blocko/quadro-5', 'blocko/quadro-6', 'blocko/quadro-video.mp4']
    },
    'blocko-stockly': {
      name: 'Blocko · Stockly', role: 'Lançamento do sistema de estoque e vendas', category: 'Social media',
      slides: ['blocko/stockly-1', 'blocko/stockly-2', 'blocko/stockly-3', 'blocko/stockly-4', 'blocko/stockly-5', 'blocko/stockly-6', 'blocko/stockly-7.mp4', 'blocko/stockly-8', 'blocko/stockly-9']
    },
    'blocko-barberflow': {
      name: 'Blocko · BarberFlow', role: 'Lançamento do sistema para barbearias', category: 'Social media',
      slides: ['blocko/barberflow-1', 'blocko/barberflow-2', 'blocko/barberflow-3', 'blocko/barberflow-4', 'blocko/barberflow-5', 'blocko/barberflow-6', 'blocko/barberflow-7', 'blocko/barberflow-8', 'blocko/barberflow-9', 'blocko/barberflow-10', 'blocko/barberflow-video.mp4']
    },
    'blocko-menugo': {
      name: 'Blocko · MenuGo', role: 'Lançamento do cardápio digital', category: 'Social media',
      slides: ['blocko/post-main', 'blocko/post-s2', 'blocko/post-s3', 'blocko/post-s4', 'blocko/post-s5', 'blocko/post-s6', 'blocko/post-s7', 'blocko/post-s8']
    },
    'blocko-petid': {
      name: 'Blocko · Pet ID', role: 'Lançamento do app para tutores de pets', category: 'Social media',
      slides: ['blocko/petid-1', 'blocko/petid-2', 'blocko/petid-3', 'blocko/petid-4', 'blocko/petid-5', 'blocko/petid-6', 'blocko/petid-7', 'blocko/petid-video.mp4']
    }
  },

  // apps e sistemas da Blocko: cada um abre app.html?a=<id>, com as telas em img/apps/<id>/
  // m-*.webp = telas do celular, d-*.webp = telas do sistema web; carousel = posts de lançamento
  apps: {
    petid: {
      name: 'Pet ID', eyebrow: 'Case · App e painel web',
      who: 'Tudo do seu pet, num só lugar.',
      lede: 'App para tutores organizarem a vida dos pets: <strong>carteira de vacinação digital</strong>, passeios com GPS que viram story, lembretes da rotina, saúde e agenda. No painel web, o histórico vira gráficos e os documentos do pet saem <strong>prontos para imprimir</strong>, com QR Code de verificação.',
      facts: [['Cliente', 'Blocko · produto próprio'], ['Plataformas', 'App Android e iOS, painel web'], ['Entregas', 'Logo, UI do app com modo escuro, painel web, documentos do pet, story do passeio, posts de lançamento'], ['Ano', '2026']],
      bg: '#21503C', accent: '#2E6A4F', status: '#F6F1E9', addr: 'painel.petid.app',
      phone: [
        ['entrar', 'Entrar', 'Login com e-mail ou Google.'],
        ['inicio', 'Início', 'Próxima vacina em destaque, ações rápidas e os pets da família.'],
        ['ficha', 'Ficha do pet', 'Peso, vacinas, agenda e lembretes de cada pet numa ficha só.'],
        ['carteira', 'Carteira de vacinação', 'Doses aplicadas, atrasadas e previstas com comprovante.'],
        ['saude', 'Saúde', 'Alertas, próxima vacina, vermífugo, consultas e antipulgas.'],
        ['passeios', 'Passeios', 'GPS ligado e o percurso desenhado em tempo real.'],
        ['resumo-passeio', 'Resumo do passeio', 'Distância, tempo e ritmo ao fim de cada volta.'],
        ['lembretes', 'Lembretes', 'A rotina de cada pet filtrada por nome.'],
        ['notificacoes', 'Notificações', 'O que está atrasado e o que vem nos próximos dias.'],
        ['agendar', 'Agendar', 'Consulta, vacina, banho e tosa ou exame em poucos toques.'],
        ['s-story', 'Story do passeio', 'O passeio vira um story 9:16 para postar.', 'story']
      ],
      web: [
        ['entrar', 'Entrar no painel', 'O mesmo login do app, numa tela que apresenta o painel.'],
        ['visao', 'Visão geral', 'Peso, vacinas, passeios e agenda do pet num painel só.'],
        ['saude', 'Saúde', 'Condições, alergias, medicamentos, cirurgias e pesagens.'],
        ['vacinas', 'Vacinas', 'Linha do tempo de cada vacina e o registro de doses.'],
        ['atividade', 'Atividade', 'Distância por semana e o histórico de passeios.'],
        ['agenda', 'Agenda', 'Calendário do mês com os próximos compromissos.'],
        ['documentos', 'Documentos', 'Carteira de vacinação, identidade e certidão para emitir.'],
        ['identidade', 'Carteira de identidade', 'Frente e verso do RG do pet, com QR Code.'],
        ['certidao', 'Certidão de nascimento', 'Um documento de verdade para imprimir e emoldurar.'],
        ['verificar', 'Verificar documento', 'Página pública que confere se um documento é válido.']
      ],
      carousel: 'blocko-petid'
    },
    menugo: {
      name: 'MenuGo', eyebrow: 'Case · Cardápio digital e painel',
      who: 'Do cardápio ao pedido, num toque.',
      lede: 'Cardápio digital para restaurantes e lanchonetes. O cliente abre pelo <strong>QR Code da mesa</strong> ou pelo link, monta o pedido e ele chega pronto no <strong>WhatsApp</strong> e no painel do restaurante, que separa delivery, retirada e salão. Marca própria em vermelho pimenta, mostarda e tostado.',
      facts: [['Cliente', 'Blocko · produto próprio'], ['Plataformas', 'Web app do cliente, painel web e celular'], ['Entregas', 'Identidade visual, cardápio do cliente, painel do restaurante, landing page de venda, posts de lançamento'], ['Ano', '2026']],
      bg: '#1C1410', accent: '#D63B21', status: '#FBF6EE', addr: 'painel.menugo.app',
      brand: 'd-marca',
      phone: [
        ['cardapio', 'Cardápio', 'O cliente abre pelo QR Code e navega por categorias.'],
        ['produto', 'Produto', 'Tamanhos, adicionais e observações antes de pôr no pedido.'],
        ['pedido', 'Seu pedido', 'Entrega, retirada ou mesa, e o pedido segue para o WhatsApp.'],
        ['painel', 'Painel · pedidos', 'O restaurante aceita ou recusa cada pedido pelo celular.'],
        ['painel-cardapio', 'Painel · cardápio', 'Produtos ativos e esgotados com um toque.'],
        ['painel-qr', 'Painel · QR Code', 'O QR Code e o link do cardápio para imprimir na mesa.']
      ],
      web: [
        ['pedidos', 'Pedidos', 'Colunas por tipo de pedido, do novo ao entregue.'],
        ['cardapio', 'Cardápio', 'Categorias, preços, opções e disponibilidade.'],
        ['mesas', 'Mesas do salão', 'Mesas livres, ocupadas e reservadas, com a conta de cada uma.'],
        ['loja', 'Loja, horários e QR', 'Horário de funcionamento, entrega e o QR Code da loja.'],
        ['integracoes', 'Integrações', 'Pedidos do iFood e do 99Food no mesmo painel.'],
        ['landing', 'Landing page', 'A página de venda do MenuGo para restaurantes.']
      ],
      carousel: 'blocko-menugo'
    },
    kanban: {
      name: 'Kanban Blocko', eyebrow: 'Case · Sistema web',
      who: 'Todo projeto, montado bloco a bloco.',
      lede: 'O quadro de projetos da Blocko, feito para tocar <strong>vários projetos e várias empresas</strong> no mesmo lugar. Cada projeto tem as suas colunas, etiquetas e pessoas; os cartões têm checklist, comentários, prazos e imagens; e a administração separa cada empresa com as suas contas. Com <strong>modo escuro</strong>.',
      facts: [['Cliente', 'Blocko · ferramenta interna'], ['Plataformas', 'Sistema web'], ['Entregas', 'UI do quadro, cartões, projetos, configurações, administração multiempresa, modo escuro, posts de lançamento'], ['Ano', '2026']],
      bg: '#0E1424', accent: '#1F5BFF', status: '#F6F8FC', addr: 'kanban.blocko.com.br',
      web: [
        ['entrar', 'Entrar', 'Login com a apresentação do quadro ao lado.'],
        ['projetos', 'Projetos', 'Todos os projetos com progresso, cartões e pessoas.'],
        ['novo-projeto', 'Novo projeto', 'Nome, cor, imagem, colunas e etiquetas do quadro.'],
        ['quadro', 'Quadro', 'Colunas, prioridades, prazos e anotações do projeto.'],
        ['cartao', 'Cartão aberto', 'Descrição com checklist, responsável, prazo e comentários.'],
        ['quadro-escuro', 'Modo escuro', 'O mesmo quadro no tema escuro.'],
        ['config', 'Configurações do projeto', 'Quem participa, colunas, etiquetas e arquivamento.'],
        ['admin-tenants', 'Administração · empresas', 'Cada empresa num espaço isolado, com as suas contas.'],
        ['admin-contas', 'Administração · contas', 'Papéis, senhas e acessos de cada pessoa.']
      ],
      carousel: 'blocko-quadro'
    },
    barberflow: {
      name: 'BarberFlow', eyebrow: 'Case · Sistema web e app do cliente',
      who: 'A barbearia inteira num só painel.',
      lede: 'Sistema para barbearias com dois lados: o <strong>painel do dono</strong>, com agenda por barbeiro, atendimentos, clientes, financeiro, estoque e relatórios, e o <strong>app do cliente</strong> para agendar horário, acompanhar os próximos cortes, juntar selos de fidelidade e assinar planos.',
      facts: [['Cliente', 'Blocko · produto próprio'], ['Plataformas', 'Painel web, celular e app do cliente'], ['Entregas', 'Identidade visual, painel completo com tutorial, app do cliente, telas de login, posts de lançamento'], ['Ano', '2026']],
      bg: '#1B365D', accent: '#DA544B', status: '#F7F8FA', addr: 'app.barberflow.com.br',
      phone: [
        ['login', 'Entrar', 'O cliente entra com o celular e a senha.'],
        ['cliente-inicio', 'Início do cliente', 'A barbearia, o cartão fidelidade e os planos.'],
        ['cliente-agendar', 'Agendar', 'Escolha o barbeiro ou o serviço e o próximo horário livre.'],
        ['cliente-horarios', 'Meus horários', 'Próximos cortes e o histórico.'],
        ['cliente-fidelidade', 'Fidelidade', 'A cada 10 atendimentos, um corte grátis.'],
        ['cliente-planos', 'Planos', 'Assinaturas de corte e barba ilimitados.'],
        ['painel', 'Painel no celular', 'O dashboard do dono também cabe no bolso.']
      ],
      web: [
        ['login', 'Entrar', 'Login do painel da barbearia.'],
        ['dashboard', 'Dashboard', 'Resumo do dia, agenda, vendas e alertas numa rolagem só.'],
        ['agenda', 'Agenda', 'A grade do dia por barbeiro.'],
        ['atendimentos', 'Atendimentos', 'Fila do dia, de quem chegou a quem já saiu.'],
        ['clientes', 'Clientes', 'Cadastro, última visita e histórico de cada cliente.'],
        ['financeiro', 'Financeiro', 'Receitas, despesas, comissões e resultado do mês.'],
        ['relatorios', 'Relatórios', 'Faturamento por período, serviço e barbeiro.'],
        ['estoque', 'Estoque', 'Produtos, estoque mínimo e movimentações.'],
        ['fidelidade', 'Fidelidade', 'Selos de cada cliente e prêmios resgatados.'],
        ['planos', 'Planos', 'Planos de assinatura e quem assina cada um.']
      ],
      carousel: 'blocko-barberflow'
    },
    stockly: {
      name: 'Stockly', eyebrow: 'Case · Sistema web e app',
      who: 'Vendeu, baixou. Acabou, avisou.',
      lede: 'Sistema de estoque e vendas para lojas: <strong>caixa com Pix, débito, crédito e dinheiro</strong> que dá baixa no estoque sozinho, alerta de estoque mínimo, pedido de reposição pronto para o fornecedor e a <strong>margem real</strong> de cada produto. No celular, o dono vende, confere o estoque e recebe os alertas de onde estiver.',
      facts: [['Cliente', 'Blocko · produto próprio'], ['Plataformas', 'Sistema web e celular'], ['Entregas', 'Identidade visual, sistema web completo, app no celular, página do produto, posts de lançamento'], ['Ano', '2026']],
      bg: '#1E1B4B', accent: '#4F46E5', status: '#F5F6FB', addr: 'app.stockly.com.br', brand: 'marca',
      phone: [
        ['inicio', 'Início', 'Vendas do dia, itens abaixo do mínimo e o que precisa repor.'],
        ['vender', 'Vender', 'O caixa no celular: busca o produto, monta a venda e recebe.'],
        ['produtos', 'Produtos', 'Saldo, mínimo e preço de cada produto na palma da mão.'],
        ['alertas', 'Notificações', 'Cada produto que acabou ou passou do mínimo, avisado na hora.'],
        ['ajustes', 'Ajustes', 'Loja, categorias, fornecedores, caixa e o que cada perfil pode fazer.']
      ],
      web: [
        ['painel', 'Painel', 'O que repor, quanto está na prateleira e o que mexeu hoje.'],
        ['caixa', 'Caixa', 'Venda rápida com Pix, débito, crédito ou dinheiro, com baixa automática.'],
        ['fechamento', 'Fechamento de caixa', 'Vendas por forma de pagamento, sangria e o dinheiro conferido na gaveta.'],
        ['vendas', 'Vendas', 'O histórico do dia com o detalhe de cada venda e a margem real.'],
        ['produtos', 'Produtos', 'Catálogo com custo, preço, margem e estoque mínimo.'],
        ['movimentacao', 'Movimentações', 'Toda entrada, saída e ajuste registrada com motivo.'],
        ['fornecedores', 'Fornecedores', 'Prazo de entrega de cada fornecedor e o pedido sugerido pronto para copiar.'],
        ['configuracoes', 'Configurações', 'Dados da loja, categorias, estoque e alertas, caixa e equipe.'],
        ['vitrine', 'Página do produto', 'A landing que apresenta o Stockly para novas lojas.']
      ],
      carousel: 'blocko-stockly'
    }
  },
  projects: [
    {
      id: 'petid', photo: 'apps/petid/icon', photoLogo: true, page: 'app.html?a=petid',
      name: 'Pet ID', role: 'App para tutores · Blocko', category: 'Apps e sistemas', featured: false,
      summary: 'App e painel web para tutores de pets: carteira de vacinação, passeios com GPS, lembretes, saúde e documentos do pet prontos para imprimir.',
      tags: ['App mobile', 'Sistema web', 'UI design'], slides: ['apps/petid/cover']
    },
    {
      id: 'menugo', photo: 'apps/menugo/icon', photoLogo: true, page: 'app.html?a=menugo',
      name: 'MenuGo', role: 'Cardápio digital · Blocko', category: 'Apps e sistemas', featured: false,
      summary: 'Cardápio digital com pedido no WhatsApp, painel do restaurante e landing page de venda.',
      tags: ['App mobile', 'Sistema web', 'Identidade visual'], slides: ['apps/menugo/cover']
    },
    {
      id: 'kanban', photo: 'apps/kanban/icon', photoLogo: true, page: 'app.html?a=kanban',
      name: 'Kanban Blocko', role: 'Quadro de projetos · Blocko', category: 'Apps e sistemas', featured: false,
      summary: 'Quadro de projetos multiempresa com cartões, comentários, configurações e modo escuro.',
      tags: ['Sistema web', 'UI design'], slides: ['apps/kanban/cover']
    },
    {
      id: 'barberflow', photo: 'apps/barberflow/icon', photoLogo: true, page: 'app.html?a=barberflow',
      name: 'BarberFlow', role: 'Sistema para barbearias · Blocko', category: 'Apps e sistemas', featured: false,
      summary: 'Painel completo para barbearias e o app do cliente para agendar, juntar selos e assinar planos.',
      tags: ['Sistema web', 'App mobile', 'UI design'], slides: ['apps/barberflow/cover']
    },
    {
      id: 'stockly', photo: 'apps/stockly/icon', photoLogo: true, page: 'app.html?a=stockly',
      name: 'Stockly', role: 'Estoque e vendas · Blocko', category: 'Apps e sistemas', featured: false,
      summary: 'Sistema de estoque e vendas com caixa, alerta de estoque mínimo, fornecedores e margem real, no computador e no celular.',
      tags: ['Sistema web', 'App mobile', 'Identidade visual'], slides: ['apps/stockly/cover']
    },
    {
      id: 'visio-fusion',
      photo: 'foto-visio',           // monograma no card; a capa aparece ao passar o mouse
      photoLogo: true,
      name: 'Visio Fusion',
      role: 'Agência · 5 marcas',
      category: 'Social media',
      featured: false,
      summary: 'Posts criados para a agência Visio Fusion, cada cliente com o seu tom: serifa e luz natural para a arquiteta Cida Ribeiro, cor e movimento para a natação infantil da Limonta\'s, antes e depois para a Arco-Íris móveis, campanha de Natal e conteúdo útil sobre iPhone para a RS Digital e prova social para uma oficina mecânica.',
      tags: ['Social media', 'Agência', 'Carrosséis'],
      slides: ['vf1', 'vf2', 'vf3', 'vf4', 'vf5']
    },
    {
      id: 'deluccky',
      photo: 'foto-deluccky',
      photoLogo: true,
      page: 'deluccky.html',         // card abre a página do case em vez dos slides
      name: 'DeLuccky',
      role: 'Streamer de CS2',
      category: 'Identidade visual',
      featured: false,
      summary: 'Identidade visual, edits e link na bio para um streamer de Counter-Strike 2. Um trevo de quatro folhas em estilo sticker, roxo noite e verde trevo, que veste as edits do YouTube, o overlay da live, as telas de pausa e a página com todos os canais e o setup.',
      tags: ['Identidade visual', 'Edição de vídeo', 'Link na bio'],
      slides: ['deluccky/cover']
    },
    {
      id: 'blocko',
      photo: 'foto-blocko',
      photoLogo: true,
      page: 'blocko.html',           // card abre a página do case em vez dos slides
      name: 'Blocko',
      role: 'Software sob medida · Apps e SaaS',
      category: 'Identidade visual',
      featured: true,
      summary: 'Identidade visual, site e social media para uma empresa que cria apps e SaaS sob medida. Um B feito de dois blocos empilhados, azul elétrico sobre grafite, e a mesma ideia de peças que se encaixam no site de seis páginas e nos carrosséis de lançamento do Quadro, do Stockly, do BarberFlow, do Pet ID e do MenuGo.',
      tags: ['Identidade visual', 'Webdesign', 'Social media'],
      slides: ['blocko/post-main', 'blocko/post-s2', 'blocko/post-s3', 'blocko/post-s4', 'blocko/post-s5', 'blocko/post-s6', 'blocko/post-s7', 'blocko/post-s8']
    },
    {
      id: 'mariane-lima',
      photo: 'foto-mari',            // foto do card; a capa aparece ao passar o mouse
      photoLogo: true,                // monograma colorido no card, sem filtro preto e branco
      name: 'Dra. Mariane Lima',
      role: 'Medicina Integrativa',
      category: 'Social media',
      featured: false,
      summary: 'Feed para uma médica de Medicina Integrativa que fala de emagrecimento, saúde e mentalidade. Vinho e rosa sobre fotos reais, títulos serifados com itálicos sublinhados, elipses finas e caixas de destaque em capas que fazem parar o scroll e levam para a legenda.',
      tags: ['Social media', 'Saúde', 'Carrosséis'],
      slides: ['mm1', 'mm2', 'mm3', 'mm4', 'mm5']
    },
    {
      id: 'aline-foletto',
      photo: 'foto-aline',            // foto do card; a capa aparece ao passar o mouse
      photoLogo: true,                // monograma colorido no card, sem filtro preto e branco
      name: 'Aline Foletto',
      role: 'Emagrecimento',
      category: 'Social media',
      featured: false,
      summary: 'Feed para a Clínica Aline Foletto, com 15 anos de experiência em emagrecimento. Oliva, terra e areia, títulos serifados condensados com itálicos e elipses na palavra-chave, e muita luz natural em reflexões, ofertas e bastidores que acolhem antes de vender.',
      tags: ['Social media', 'Saúde', 'Carrosséis'],
      slides: ['af1', 'af2', 'af3', 'af4', 'af5']
    },
    {
      id: 'bico-pitanga',
      photo: 'foto-bico',            // foto do card; a capa aparece ao passar o mouse
      photoLogo: true,                // logo colorido no card, sem filtro preto e branco
      name: 'Bico Pitanga',
      role: 'Confeitaria',
      category: 'Social media',
      featured: false,
      summary: 'Feed para uma confeitaria artesanal com 32 anos de história. Rosa e vermelho da marca, títulos serifados com itálicos delicados e fotos reais da fundadora e dos bolos em carrosséis que contam a trajetória da casa e agradecem a cada cliente.',
      tags: ['Social media', 'Confeitaria', 'Carrosséis'],
      slides: ['bp1', 'bp2', 'bp3', 'bp5', 'bp6', 'bp4']
    },
    {
      id: 'gustavo-baptista',
      photo: 'foto-gustavo',            // foto do card; a capa aparece ao passar o mouse
      name: 'Dr. Gustavo Baptista',
      role: 'Médico Nutrólogo',
      category: 'Social media',
      featured: false,
      summary: 'Feed para um médico nutrólogo focado em emagrecimento, saúde e performance. Azul institucional com toques de branco, retratos sóbrios e carrosséis didáticos sobre massa muscular, treino e rotina, com a assinatura da marca em cada peça.',
      tags: ['Social media', 'Saúde', 'Carrosséis'],
      slides: ['gb1', 'gb2', 'gb3', 'gb4']
    },
    {
      id: 'thiago-guerra',
      photo: 'foto-thiago',            // foto do card; a capa aparece ao passar o mouse
      name: 'Thiago Guerra',
      role: 'Advogado · Governança e Compliance',
      category: 'Social media',
      featured: false,
      summary: 'Feed para um advogado com mais de 20 anos de experiência em direito empresarial, governança e compliance. Fotografia corporativa em tons frios, destaques em verde-água e títulos diretos que falam com empresários e advogados sobre gestão, liderança e proteção do negócio.',
      tags: ['Social media', 'Direito empresarial', 'Carrosséis'],
      slides: ['tg1', 'tg2', 'tg3', 'tg4']
    },
    {
      id: 'gabriel-ramalho',
      photo: 'foto-gabriel',            // foto do card; a capa aparece ao passar o mouse
      name: 'Gabriel Ramalho',
      role: 'Especialista em Cibersegurança',
      category: 'Social media',
      featured: false,
      summary: 'Perfil institucional para um especialista em segurança da informação. Tipografia monoespaçada, verde de terminal e vermelho de alerta, computadores retrô e referências da cultura hacker em carrosséis que explicam ataques reais de um jeito que qualquer pessoa entende.',
      tags: ['Social media', 'Perfil institucional', 'Carrosséis'],
      slides: ['gr1', 'gr2', 'gr3', 'gr4', 'gr5', 'gr6']
    },
    {
      id: 'natalia-pasin',
      photo: 'foto-natalia',            // foto do card; a capa aparece ao passar o mouse
      name: 'Dra. Natália Pasin',
      role: 'Médica Dermatologista',
      category: 'Social media',
      featured: true,
      summary: 'Feed editorial em preto e branco para uma médica que une tecnologia, ciência e beleza natural. Retratos de alto contraste, títulos manuscritos e serifados, e carrosséis que educam sem perder a elegância.',
      tags: ['Social media', 'Carrosséis', 'Direção de arte'],
      slides: ['44', '46', '47', '48']
    },
    {
      id: 'b-tailor',
      photo: 'foto-btailor',            // foto do card; a capa aparece ao passar o mouse
      name: 'B&Tailor',
      role: 'Alfaiataria',
      category: 'Social media',
      featured: true,
      summary: 'Vitrine digital para uma alfaiataria sob medida. Fotografia escura em tons de grafite, tecidos em close e textos serifados que traduzem o cuidado de cada detalhe, do primeiro botão à prova final.',
      tags: ['Social media', 'Feed', 'Moda masculina'],
      slides: ['39', '40', '41', '42']
    }
  ]
};
