# component-card-stories

Mini aplicação em Vite + React para listar cards e abrir cada coleção em um
modo stories com URL compartilhável.

## O que tem

- autoplay de 5 segundos por slide
- pausa quando o usuário toca/clica no slide
- transição suave entre temas
- miniaturas com formato quadrado, circular ou arredondado
- slides de conteúdo, vídeo, gráfico e dados, ads e enquete
- gráfico animado com Recharts

## Rodar

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Rotas

Os cards abrem URLs como:

```text
/stories/saude-bike-fit
```

## Reusar o componente

```tsx
import { CardStories, type StoryGroup } from './src'

export function Demo({ groups }: { groups: StoryGroup[] }) {
  return <CardStories groups={groups} displayLimit={4} cardRadius="circle" />
}
```
