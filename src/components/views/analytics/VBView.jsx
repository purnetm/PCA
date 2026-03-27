import { useState } from 'react'

const TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'insights', label: 'Insights' },
  { id: 'resolution', label: 'Resolution' },
  { id: 'others', label: 'Others' },
]

const KPIS = [
  { label: 'Total Calls', value: '18,911' },
  { label: 'Voicebot Calls', value: '0' },
  { label: 'Resolved by Bot', value: '0' },
  { label: 'Agent Handover', value: '0' },
  { label: 'Avg Handle Time', value: '—' },
  { label: 'Drop Off Rate', value: '—' },
]

export default function VBView() {
  const [activeTab, setActiveTab] = useState('overview')
  return (
    <div className="view active" style={{ flexDirection: 'column', overflowY: 'auto' }}>
      <div className="analytics-topbar">
        <div>
          <div className="analytics-page-title">Voicebot Dashboard</div>
          <div style={{ fontSize: 12, color: 'var(--cutty-sark)', opacity: 0.7 }}>Voicebot performance and handover metrics</div>
        </div>
      </div>
      <div className="analytics-tabs-wrap" style={{ padding: '0 24px' }}>
        <div className="a-tabs-pill">
          {TABS.map(t => (
            <button key={t.id} className={`a-tab${activeTab === t.id ? ' active' : ''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
          ))}
        </div>
      </div>
      <div className="analytics-content">
        {activeTab === 'overview' ? (
          <div className="a-tab-content active">
            <div className="a-kpi-row" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
              {KPIS.map((k, i) => (
                <div key={i} className="a-kpi-card">
                  <div className="a-kpi-label">{k.label}</div>
                  <div className="a-kpi-value">{k.value}</div>
                </div>
              ))}
            </div>
            <div className="a-card">
              <div className="a-card-head">
                <div className="a-card-head-left">
                  <div className="a-card-title">Peak Call Hours</div>
                  <div className="a-card-sub">Hourly distribution of incoming calls</div>
                </div>
              </div>
              <div className="a-card-body">
                <div className="a-chart-empty">No voicebot data available for this period</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="a-tab-content active">
            <div className="a-chart-empty" style={{ height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cutty-sark)' }}>
              Coming soon
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
