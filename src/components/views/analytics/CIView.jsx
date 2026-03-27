import { useState } from 'react'
import { INTENT_DATA } from '../../../data'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'sentiment', label: 'Sentiment' },
  { id: 'performance', label: 'Performance' },
  { id: 'risk', label: 'Risk' },
  { id: 'product', label: 'Product' },
]

const KPI_CARDS = [
  { label: 'Total Tickets', value: '18,462', trend: '+4.2%', up: true, sub: 'vs last period' },
  { label: 'Avg Resolution Time', value: '1h 5m', trend: '-8m', up: true, sub: 'improvement' },
  { label: 'Risk Conversations', value: '1,620', trend: '+2.1%', up: false, sub: '8.8% of total' },
  { label: 'Avg Sentiment', value: '😐 Neutral', trend: '', up: null, sub: 'Stable' },
]

const INTENT_COLORS = {
  cs: '#4DB6AC', orders: '#3B82F6', delivery: '#F59E0B', prescription: '#A78BFA', others: '#94A3B8',
}

export default function CIView() {
  const [activeTab, setActiveTab] = useState('overview')
  const [activeIntent, setActiveIntent] = useState('cs')

  const totalTickets = INTENT_DATA.reduce((s, d) => s + d.count, 0)
  let cumAngle = 0
  const donutPaths = INTENT_DATA.map(d => {
    const frac = d.count / totalTickets
    const startAngle = cumAngle
    cumAngle += frac * 360
    const largeArc = frac > 0.5 ? 1 : 0
    const r = 40, cx = 50, cy = 50
    const start = polarToCartesian(cx, cy, r, startAngle - 90)
    const end = polarToCartesian(cx, cy, r, cumAngle - 90)
    return { d: `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y} Z`, color: INTENT_COLORS[d.id], id: d.id, pct: d.pct }
  })

  function polarToCartesian(cx, cy, r, angle) {
    const rad = (angle * Math.PI) / 180
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  return (
    <div className="view active" id="view-analytics" style={{ flexDirection: 'column', overflowY: 'auto' }}>
      {/* Topbar */}
      <div className="analytics-topbar">
        <div>
          <div className="analytics-page-title">Conversational Intelligence</div>
          <div style={{ fontSize: 12, color: 'var(--cutty-sark)', opacity: 0.7 }}>Ticket intent, sentiment and risk analysis</div>
        </div>
        <div className="analytics-date-controls" style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input type="date" defaultValue="2026-03-01" style={{ fontSize: 12, padding: '4px 8px', border: '1px solid var(--nebula)', borderRadius: 6, color: 'var(--dark-teal)' }} />
          <span style={{ fontSize: 12, color: 'var(--cutty-sark)' }}>–</span>
          <input type="date" defaultValue="2026-03-27" style={{ fontSize: 12, padding: '4px 8px', border: '1px solid var(--nebula)', borderRadius: 6, color: 'var(--dark-teal)' }} />
        </div>
      </div>

      {/* Tabs */}
      <div className="analytics-tabs-wrap" style={{ padding: '0 24px 0' }}>
        <div className="a-tabs-pill">
          {TABS.map(t => (
            <button key={t.id} className={`a-tab${activeTab === t.id ? ' active' : ''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="analytics-content">
        {activeTab === 'overview' && (
          <div className="a-tab-content active">
            {/* KPI row */}
            <div className="a-kpi-row">
              {KPI_CARDS.map((k, i) => (
                <div key={i} className="a-kpi-card">
                  <div className="a-kpi-label">{k.label}</div>
                  <div className="a-kpi-value">{k.value}</div>
                  {k.trend && <div className={`a-kpi-trend${k.up ? ' positive' : ' negative'}`}>{k.trend}</div>}
                  <div className="a-kpi-sub">{k.sub}</div>
                </div>
              ))}
            </div>

            {/* Intent Analysis */}
            <div className="a-card">
              <div className="a-card-head">
                <div className="a-card-head-left">
                  <div className="a-card-title">Intent Analysis</div>
                  <div className="a-card-sub">Ticket distribution by customer intent</div>
                </div>
              </div>
              <div className="a-card-body" style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
                {/* Donut */}
                <div className="a-donut-wrap" style={{ flexShrink: 0 }}>
                  <svg className="a-donut-svg" viewBox="0 0 100 100" width="140" height="140">
                    {donutPaths.map(p => (
                      <path key={p.id} d={p.d} fill={p.color} opacity={activeIntent === p.id ? 1 : 0.6}
                        style={{ cursor: 'pointer', transition: 'opacity 0.15s' }}
                        onClick={() => setActiveIntent(p.id)} />
                    ))}
                    <circle cx="50" cy="50" r="24" fill="white"/>
                    <text x="50" y="47" textAnchor="middle" fontSize="9" fill="var(--cutty-sark)" className="a-donut-center">
                      {INTENT_DATA.find(d => d.id === activeIntent)?.pct.toFixed(1)}%
                    </text>
                    <text x="50" y="57" textAnchor="middle" fontSize="7" fill="var(--cutty-sark)" opacity="0.7" className="a-donut-center">
                      {INTENT_DATA.find(d => d.id === activeIntent)?.label.split(' ')[0]}
                    </text>
                  </svg>
                </div>
                {/* Intent rows */}
                <div style={{ flex: 1 }}>
                  {INTENT_DATA.map(d => (
                    <div key={d.id} className="a-bar-row" style={{ cursor: 'pointer', borderRadius: 6, padding: '4px 6px', background: activeIntent === d.id ? 'var(--teal-10)' : 'transparent', marginBottom: 4 }}
                      onClick={() => setActiveIntent(d.id)}>
                      <span style={{ width: 10, height: 10, borderRadius: 2, background: INTENT_COLORS[d.id], flexShrink: 0, display: 'inline-block', marginRight: 8 }} />
                      <span className="a-bar-name" style={{ flex: 1 }}>{d.label}</span>
                      <span className="a-bar-val">{d.count.toLocaleString()}</span>
                      <span className="a-bar-pct" style={{ width: 44, textAlign: 'right' }}>{d.pct.toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Emerging Issues — placeholder */}
            <div className="a-card">
              <div className="a-card-head">
                <div className="a-card-head-left">
                  <div className="a-card-title">Emerging Issues</div>
                  <div className="a-card-sub">Topics gaining traction in recent tickets</div>
                </div>
                <span className="a-card-badge alert">3 new</span>
              </div>
              <div className="a-card-body">
                {[
                  { topic: 'App login failures', count: 142, trend: '+38%', color: '#F87171' },
                  { topic: 'Delayed delivery complaints', count: 98, trend: '+21%', color: '#F59E0B' },
                  { topic: 'Prescription refill errors', count: 74, trend: '+15%', color: '#A78BFA' },
                ].map((issue, i) => (
                  <div key={i} className="a-bar-row" style={{ marginBottom: 8 }}>
                    <span className="a-bar-name">{issue.topic}</span>
                    <div className="a-bar-track" style={{ flex: 1, height: 6, background: 'var(--aqua-haze)', borderRadius: 3, margin: '0 12px' }}>
                      <div className="a-bar-fill" style={{ width: `${(issue.count / 150) * 100}%`, background: issue.color, height: '100%', borderRadius: 3 }} />
                    </div>
                    <span className="a-bar-val" style={{ minWidth: 32 }}>{issue.count}</span>
                    <span style={{ fontSize: 11, color: '#F87171', marginLeft: 8, minWidth: 40 }}>{issue.trend}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {activeTab !== 'overview' && (
          <div className="a-tab-content active">
            <div className="a-chart-empty" style={{ height: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--cutty-sark)', gap: 8 }}>
              <span style={{ fontSize: 32, opacity: 0.3 }}>📊</span>
              <span style={{ fontSize: 13 }}>{TABS.find(t => t.id === activeTab)?.label} — coming soon</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
