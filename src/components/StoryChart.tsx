import { useMemo, useState } from 'react'
import type { CSSProperties } from 'react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from 'recharts'
import type { StoryMetric } from './CardStories'

type StoryChartProps = {
  metrics: StoryMetric[]
  accent: string
}

export function StoryChart({ metrics, accent }: StoryChartProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedMetric = metrics[selectedIndex] ?? metrics[0]
  const maxValue = Math.max(...metrics.map((metric) => metric.value), 1)
  const gradientId = useMemo(
    () => `area-${accent.replace(/[^a-z0-9]/gi, '')}`,
    [accent],
  )
  const chartData = metrics.map((metric) => ({
    name: metric.label,
    value: metric.value,
  }))

  return (
    <div className="story-chart" role="group" aria-label="Grafico interativo">
      <div className="story-chart-head">
        <div>
          <span>Resultado em destaque</span>
          <strong>{selectedMetric?.label}</strong>
        </div>
        <p>
          {selectedMetric?.value}%{' '}
          {selectedMetric?.delta ? `| ${selectedMetric.delta > 0 ? '+' : ''}${selectedMetric.delta}%` : ''}
        </p>
      </div>

      <div className="story-chart-frame">
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="8%" stopColor={accent} stopOpacity={0.36} />
                <stop offset="92%" stopColor={accent} stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tick={{ fill: 'rgba(255,255,255,0.72)', fontSize: 12 }}
            />
            <Tooltip
              cursor={{ stroke: accent, strokeOpacity: 0.18 }}
              contentStyle={{
                borderRadius: '12px',
                border: '0',
                background: 'rgba(10, 14, 20, 0.92)',
                color: '#fff',
                boxShadow: '0 12px 28px rgba(0,0,0,0.28)',
              }}
              labelStyle={{ color: 'rgba(255,255,255,0.72)' }}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={accent}
              strokeWidth={3}
              fill={`url(#${gradientId})`}
              isAnimationActive
              animationDuration={1100}
              animationEasing="ease-out"
              dot={{ r: 3, strokeWidth: 2, fill: '#fff' }}
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="story-chart-bars" style={{ '--accent': accent } as CSSProperties}>
        {metrics.map((metric, index) => (
          <button
            key={metric.label}
            type="button"
            className={index === selectedIndex ? 'is-active' : ''}
            onClick={() => setSelectedIndex(index)}
            aria-label={`${metric.label}: ${metric.value}%`}
          >
            <span style={{ height: `${Math.max((metric.value / maxValue) * 100, 12)}%` }} />
            <strong>{metric.label}</strong>
          </button>
        ))}
      </div>
    </div>
  )
}
