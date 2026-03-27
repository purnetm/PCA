import { useState } from 'react'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'orders', label: 'Orders' },
  { id: 'delivery', label: 'Delivery' },
  { id: 'returns', label: 'Returns' },
  { id: 'payments', label: 'Payments' },
]

const KPI_CARDS = [
  { label: 'Total Tickets', value: '18,462', trend: '+4.2%', up: true },
  { label: 'Avg Resolution Time', value: '1h 6m', trend: '-2m', up: true },
  { label: 'FCR Rate', value: '97.6%', trend: '+0.4%', up: true },
  { label: 'CSAT Score', value: '0.87', trend: '+0.02', up: true },
]

const BOTTLENECKS = [
  { name: 'Hold Phase Overrun', count: 842, pct: 72, color: '#F87171' },
  { name: 'Over-Probing', count: 531, pct: 45, color: '#F59E0B' },
  { name: 'Context Lost on Transfer', count: 318, pct: 27, color: '#A78BFA' },
  { name: 'Late Escalation', count: 214, pct: 18, color: '#3B82F6' },
]

const PHASES = [
  { name: 'Probing', pct: 28, color: '#4DB6AC' },
  { name: 'Hold', pct: 19, color: '#F59E0B' },
  { name: 'Execution', pct: 41, color: '#3B82F6' },
  { name: 'Transition', pct: 12, color: '#A78BFA' },
]

export default function RPAView() {
  const [activeTab, setActiveTab] = useState('overview')
  return (
    <div className="view active" id="view-analytics" style={{ flexDirection: 'column', overflowY: 'auto' }}>
      <div className="analytics-topbar">
        <div>
          <div className="analytics-page-title">Resolution Path Analytics</div>
          <div style={{ fontSize: 12, color: 'var(--cutty-sark)', opacity: 0.7 }}>Resolution efficiency, effort and escalation patterns</div>
        </div>
        <div className="analytics-date-controls" style={{ display: 'flex', gap: 8 }}>
          <input type="date" defaultValue="2026-03-01" style={{ fontSize: 12, padding: '4px 8px', border: '1px solid var(--nebula)', borderRadius: 6 }} />
          <span style={{ fontSize: 12, color: 'var(--cutty-sark)' }}>–</span>
          <input type="date" defaultValue="2026-03-27" style={{ fontSize: 12, padding: '4px 8px', border: '1px solid var(--nebula)', borderRadius: 6 }} />
        </div>
      </div>
      <div className="analytics-tabs-wrap" style={{ padding: '0 24px' }}>
        <div className="a-tabs-pill">
          {TABS.map(t => <button key={t.id} className={`a-tab${activeTab === t.id ? ' active' : ''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>)}
        </div>
      </div>
      <div className="analytics-content">
        {activeTab === 'overview' ? (
          <div className="a-tab-content active">
            <div className="a-kpi-row">
              {KPI_CARDS.map((k, i) => (
                <div key={i} className="a-kpi-card">
                  <div className="a-kpi-label">{k.label}</div>
                  <div className="a-kpi-value">{k.value}</div>
                  <div className={`a-kpi-trend${k.up ? ' positive' : ' negative'}`}>{k.trend}</div>
                </div>
              ))}
            </div>

            {/* Top Bottlenecks */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Top Bottlenecks</div><div className="a-card-sub">Process friction points by frequency</div></div><span className="a-card-badge alert">High impact</span></div>
              <div className="a-card-body">
                {BOTTLENECKS.map((b, i) => (
                  <div key={i} className="a-bottleneck-row">
                    <div className="a-bottleneck-color" style={{ background: b.color }} />
                    <span className="a-bottleneck-name">{b.name}</span>
                    <div className="a-bottleneck-bar-wrap" style={{ flex: 1, margin: '0 12px' }}>
                      <div className="a-bottleneck-bar" style={{ height: 6, background: 'var(--aqua-haze)', borderRadius: 3 }}>
                        <div className="a-bottleneck-bar-fill" style={{ width: `${b.pct}%`, background: b.color, height: '100%', borderRadius: 3 }} />
                      </div>
                    </div>
                    <span className="a-bottleneck-count">{b.count.toLocaleString()}</span>
                    <span style={{ fontSize: 11, color: 'var(--cutty-sark)', marginLeft: 8, minWidth: 30 }}>{b.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase Duration */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Phase Duration Breakdown</div><div className="a-card-sub">Average time spent per resolution phase</div></div></div>
              <div className="a-card-body">
                {PHASES.map((p, i) => (
                  <div key={i} className="a-phase-row" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <span className="a-phase-name" style={{ minWidth: 80, fontSize: 12, color: 'var(--cutty-sark)' }}>{p.name}</span>
                    <div className="a-phase-bar" style={{ flex: 1, height: 10, background: 'var(--aqua-haze)', borderRadius: 5 }}>
                      <div className="a-phase-fill" style={{ width: `${p.pct}%`, background: p.color, height: '100%', borderRadius: 5 }} />
                    </div>
                    <span className="a-phase-pct" style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-teal)', minWidth: 32 }}>{p.pct}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
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
