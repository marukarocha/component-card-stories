import type { StoryGroup } from '../components/CardStories'

const demoVideo =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

export const storyGroups: StoryGroup[] = [
  {
    id: 'saude-bike-fit',
    slug: 'saude-bike-fit',
    title: 'Bike Fit',
    category: 'Saúde',
    subtitle: 'Postura, conforto e performance para pedalar melhor.',
    accent: '#16a085',
    cover:
      'https://images.unsplash.com/photo-1485463611174-f302f4c7cdd0?auto=format&fit=crop&w=1200&q=80',
    shareLabel: 'Gostou desse Conteudo? Compartilhe!',
    shareText: 'Compartilhe este conteúdo de saúde e bike fit com seu amigo.',
    stories: [
      {
        id: 'saude-1',
        kind: 'image',
        eyebrow: 'Saúde',
        title: 'Uma boa posição na bike muda tudo.',
        description:
          'Pequenos ajustes reduzem fadiga, melhoram a respiração e deixam a pedalada mais leve.',
        image:
          'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'saude-2',
        kind: 'data',
        eyebrow: 'Dados',
        title: 'Evolução de conforto',
        description: 'Interaja com o gráfico para ver o progresso da adaptação.',
        summary:
          'Misture métricas de ajuste, recuperação e consistência para mostrar valor de forma rápida.',
        metrics: [
          { label: 'Postura', value: 72, delta: 8 },
          { label: 'Conforto', value: 85, delta: 14 },
          { label: 'Respiração', value: 67, delta: 6 },
          { label: 'Cadência', value: 91, delta: 18 },
        ],
      },
      {
        id: 'saude-ads',
        kind: 'ad',
        eyebrow: 'Ads',
        title: 'Ajuste de bike fit com avaliação rápida.',
        description:
          'Anuncie a oferta com um card limpo entre conteúdos editoriais e destaque a ação.',
        brand: 'BikeLab',
        sponsor: 'Patrocinado',
        ctaLabel: 'Agendar ajuste',
      },
      {
        id: 'saude-4',
        kind: 'poll',
        eyebrow: 'Enquete',
        title: 'Qual ajuste faz mais diferença?',
        description: 'Teste uma enquete para gerar engajamento dentro da sequência.',
        question: 'O que você melhora primeiro?',
        options: [
          { id: 'selim', label: 'Selim', votes: 46 },
          { id: 'guidao', label: 'Guidão', votes: 28 },
          { id: 'pedal', label: 'Pedal', votes: 26 },
        ],
      },
    ],
  },
  {
    id: 'manutencao-oficina',
    slug: 'manutencao-oficina',
    title: 'Oficina',
    category: 'Manutenção',
    subtitle: 'Checklist rápido para manter a bike redonda.',
    accent: '#f97316',
    cover:
      'https://images.unsplash.com/photo-1489493887464-892be6d1daae?auto=format&fit=crop&w=1200&q=80',
    shareLabel: 'Gostou desse Conteudo? Compartilhe!',
    shareText: 'Compartilhe o passo a passo de manutenção da bike.',
    stories: [
      {
        id: 'manutencao-1',
        kind: 'image',
        eyebrow: 'Manutenção',
        title: 'Limpeza frequente evita desgaste prematuro.',
        description:
          'Troque o discurso técnico por uma sequência visual que o usuário entende em poucos segundos.',
        image:
          'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'manutencao-2',
        kind: 'video',
        eyebrow: 'Vídeo',
        title: 'Um clipe curto mostra a manutenção com muito mais clareza.',
        description:
          'Use vídeo para demonstrar lubrificação, revisão e pequenas tarefas em tempo real.',
        videoSrc: demoVideo,
        poster:
          'https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'manutencao-ads',
        kind: 'ad',
        eyebrow: 'Ads',
        title: 'Kit de manutenção completo para ciclistas.',
        description:
          'Esse formato funciona bem entre passos editoriais e uma oferta comercial clara.',
        brand: 'Workshop Pro',
        sponsor: 'Patrocinado',
        ctaLabel: 'Ver kit',
      },
      {
        id: 'manutencao-4',
        kind: 'image',
        eyebrow: 'Final',
        title: 'Feche com um lembrete prático e útil.',
        description:
          'A última tela pode reforçar frequência, rotina e próximos passos de manutenção.',
        image:
          'https://images.unsplash.com/photo-1502744688674-c619d1586c9e?auto=format&fit=crop&w=1200&q=80',
      },
    ],
  },
  {
    id: 'equipamentos-gear',
    slug: 'equipamentos-gear',
    title: 'Gear',
    category: 'Equipamentos',
    subtitle: 'Capacete, luz, garrafa e acessórios essenciais.',
    accent: '#3b82f6',
    cover:
      'https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80',
    shareLabel: 'Gostou desse Conteudo? Compartilhe!',
    shareText: 'Compartilhe esse guia de equipamentos com sua turma.',
    stories: [
      {
        id: 'equip-1',
        kind: 'image',
        eyebrow: 'Equipamentos',
        title: 'Escolher bem os acessórios muda a experiência.',
        description:
          'Uma mini coleção editorial pode mostrar os itens essenciais com muito mais presença.',
        image:
          'https://images.unsplash.com/photo-1517949908117-e8b5b4b4ad01?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'equip-2',
        kind: 'data',
        eyebrow: 'Dados',
        title: 'Itens mais usados na temporada',
        description: 'Use o gráfico para comparar preferência e adesão.',
        summary:
          'Gráficos animados ajudam a destacar o equipamento mais buscado ou mais vendido.',
        metrics: [
          { label: 'Capacete', value: 89, delta: 21 },
          { label: 'Luz', value: 76, delta: 13 },
          { label: 'Bomba', value: 63, delta: 6 },
          { label: 'Garrafa', value: 94, delta: 24 },
        ],
      },
      {
        id: 'equip-3',
        kind: 'poll',
        eyebrow: 'Enquete',
        title: 'O que nunca pode faltar?',
        description: 'Uma enquete rápida deixa o tema mais social.',
        question: 'Qual acessório você leva sempre?',
        options: [
          { id: 'agua', label: 'Água', votes: 52 },
          { id: 'luz', label: 'Luz', votes: 33 },
          { id: 'ferramenta', label: 'Ferramenta', votes: 15 },
        ],
      },
      {
        id: 'equip-4',
        kind: 'ad',
        eyebrow: 'Ads',
        title: 'Promoção de acessórios para pedal noturno.',
        description: 'Entre conteúdo e anúncio, o fluxo continua natural.',
        brand: 'Night Ride',
        sponsor: 'Patrocinado',
        ctaLabel: 'Comprar agora',
      },
    ],
  },
  {
    id: 'bikes-road-mtb',
    slug: 'bikes-road-mtb',
    title: 'Bikes',
    category: 'Bikes',
    subtitle: 'Road, MTB e urbana em sequência rápida.',
    accent: '#8b5cf6',
    cover:
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=1200&q=80',
    shareLabel: 'Gostou desse Conteudo? Compartilhe!',
    shareText: 'Compartilhe essa seleção de bikes e inspire outra pessoa.',
    stories: [
      {
        id: 'bike-1',
        kind: 'image',
        eyebrow: 'Bikes',
        title: 'Cada tipo de bike pode virar uma coleção própria.',
        description:
          'A troca entre temas fica muito boa quando o visual marca bem a categoria.',
        image:
          'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'bike-2',
        kind: 'video',
        eyebrow: 'Vídeo',
        title: 'Movimento, trilha e estrada no mesmo fluxo.',
        description:
          'A imagem em movimento ajuda a valorizar o feeling da categoria.',
        videoSrc: demoVideo,
        poster:
          'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'bike-3',
        kind: 'data',
        eyebrow: 'Dados',
        title: 'Preferência por estilo de bike',
        description: 'O gráfico dá corpo ao slide sem abandonar a narrativa.',
        summary:
          'Dados e história juntos deixam a experiência mais rica e mais fácil de comparar.',
        metrics: [
          { label: 'Road', value: 71, delta: 10 },
          { label: 'MTB', value: 84, delta: 18 },
          { label: 'Urbana', value: 58, delta: 5 },
          { label: 'Gravel', value: 66, delta: 9 },
        ],
      },
      {
        id: 'bike-ads',
        kind: 'ad',
        eyebrow: 'Ads',
        title: 'Nova linha de bikes leves para cidade.',
        description:
          'Um bloco de anúncio no meio da coleção é perfeito para campanhas sazonais.',
        brand: 'Urban Motion',
        sponsor: 'Patrocinado',
        ctaLabel: 'Ver coleção',
      },
    ],
  },
  {
    id: 'campeonatos-race-day',
    slug: 'campeonatos-race-day',
    title: 'Race Day',
    category: 'Campeonatos',
    subtitle: 'Pré-largada, ação e resultado final.',
    accent: '#ef4444',
    cover:
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=80',
    shareLabel: 'Gostou desse Conteudo? Compartilhe!',
    shareText: 'Compartilhe a emoção do campeonato com sua audiência.',
    stories: [
      {
        id: 'race-1',
        kind: 'image',
        eyebrow: 'Campeonatos',
        title: 'A pré-largada já pode virar um story forte.',
        description:
          'Basta uma imagem boa e uma linha de copy enxuta para prender atenção.',
        image:
          'https://images.unsplash.com/photo-1493649203865-a27d1cb0f8f6?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'race-2',
        kind: 'poll',
        eyebrow: 'Enquete',
        title: 'Quem leva a etapa?',
        description: 'Use enquete para aquecer a audiência antes do campeonato.',
        question: 'Qual equipe vence hoje?',
        options: [
          { id: 'equipe-a', label: 'Equipe A', votes: 41 },
          { id: 'equipe-b', label: 'Equipe B', votes: 37 },
          { id: 'equipe-c', label: 'Equipe C', votes: 22 },
        ],
      },
      {
        id: 'race-3',
        kind: 'video',
        eyebrow: 'Vídeo',
        title: 'O ritmo da corrida merece um trecho em movimento.',
        description:
          'Vídeo curto ajuda a criar clima e expectativa até o resultado final.',
        videoSrc: demoVideo,
        poster:
          'https://images.unsplash.com/photo-1493649203865-a27d1cb0f8f6?auto=format&fit=crop&w=1200&q=80',
      },
      {
        id: 'race-4',
        kind: 'data',
        eyebrow: 'Dados',
        title: 'Desempenho por volta',
        description: 'Transforme resultado em um gráfico curto e visual.',
        summary:
          'A leitura de dados em formato stories ajuda a comunicar performance sem virar planilha.',
        metrics: [
          { label: 'Volta 1', value: 68, delta: 7 },
          { label: 'Volta 2', value: 74, delta: 12 },
          { label: 'Volta 3', value: 82, delta: 15 },
          { label: 'Final', value: 94, delta: 23 },
        ],
      },
    ],
  },
]
