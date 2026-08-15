import { useState } from 'react'
import { CardStories } from './components/CardStories'
import { storyGroups } from './data/stories'
import './App.css'

const displayCountOptions = [3, 4, 5] as const
const cardRadiusOptions = [
  { id: 'square', label: 'Quadrado' },
  { id: 'circle', label: 'Circular' },
  { id: 'rounded', label: 'Arredondado' },
] as const

function App() {
  const [displayCount, setDisplayCount] = useState<(typeof displayCountOptions)[number]>(4)
  const [cardRadius, setCardRadius] = useState<(typeof cardRadiusOptions)[number]['id']>('rounded')

  return (
    <main className="app-shell">
      <header className="app-header">
        <div className="app-titleblock">
          <span className="app-kicker">Cards Stories</span>
          <h1>Stories em cards com uma interface limpa e elegante.</h1>
        </div>
        <p className="app-lead">
          Ajuste a quantidade e o formato das miniaturas e teste a navegação do
          componente em um ambiente leve, direto e moderno.
        </p>
      </header>

      <section className="showcase-controls" aria-label="Controles de apresentação">
        <div className="control-block">
          <span>Quantidade de miniaturas</span>
          <div className="segmented-control" role="group" aria-label="Quantidade de cards">
            {displayCountOptions.map((count) => (
              <button
                key={count}
                type="button"
                className={count === displayCount ? 'is-active' : ''}
                aria-pressed={count === displayCount}
                onClick={() => setDisplayCount(count)}
              >
                {count}
              </button>
            ))}
          </div>
        </div>

        <div className="control-block">
          <span>Formato da miniatura</span>
          <div className="segmented-control" role="group" aria-label="Formato dos cards">
            {cardRadiusOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                className={option.id === cardRadius ? 'is-active' : ''}
                aria-pressed={option.id === cardRadius}
                onClick={() => setCardRadius(option.id)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="story-stage">
        <CardStories
          groups={storyGroups}
          displayLimit={displayCount}
          cardRadius={cardRadius}
        />
      </section>
    </main>
  )
}

export default App
