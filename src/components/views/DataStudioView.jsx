import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { DASHBOARDS_DATA } from '../../data'

function DashboardCard({ dash, onOpen }) {
  const THUMB_COLORS = {
    area: '#4DB6AC', donut: '#3B82F6', bar: '#A78BFA',
    line: '#F59E0B', table: '#10B981', gauge: '#F87171',
  }
  const color = THUMB_COLORS[dash.thumb] || '#4DB6AC'
  const ModeIcon = dash.mode === 'ai' ? '✦' : dash.mode === 'hybrid' ? '◈' : '⊞'
  return (
    <div className="dash-card" onClick={() => onOpen(dash.id)} style={{ cursor: 'pointer' }}>
      <div className="dash-card-thumb" style={{ background: `linear-gradient(135deg, ${color}22, ${color}44)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 24, opacity: 0.5 }}>{ModeIcon}</span>
      </div>
      <div style={{ padding: '12px 14px 0' }}>
        <div className="dash-card-title">{dash.name}</div>
        <div className="dash-card-desc">{dash.desc}</div>
      </div>
      <div className="dash-card-meta">
        <span>{dash.tiles} tiles</span>
        <span>·</span>
        <span>{dash.updated}</span>
        <span style={{ marginLeft: 'auto', textTransform: 'capitalize' }}>{dash.mode}</span>
      </div>
    </div>
  )
}

const PlusIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 2v10M2 7h10" strokeLinecap="round"/>
  </svg>
)

export default function DataStudioView() {
  const { state, dispatch, openModal } = useApp()
  const { dsSection } = state
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all'
    ? DASHBOARDS_DATA
    : DASHBOARDS_DATA.filter(d => d.mode === activeTab)

  if (dsSection === 'new-question') {
    return (
      <div className="view active" id="view-data-studio">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cutty-sark)', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 32, opacity: 0.3 }}>⊕</span>
          <span style={{ fontSize: 13 }}>New Query builder — coming soon</span>
        </div>
      </div>
    )
  }

  if (dsSection === 'composer') {
    return (
      <div className="view active" id="view-data-studio">
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--cutty-sark)', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 32, opacity: 0.3 }}>⊞</span>
          <span style={{ fontSize: 13 }}>Dashboard composer — coming soon</span>
        </div>
      </div>
    )
  }

  // Home gallery
  return (
    <div className="view active ds-view" id="view-data-studio">
      <div className="qs-page-topbar" id="home-topbar" style={{ display: 'flex', alignItems: 'center', padding: '12px 28px', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark-teal)' }}>My Dashboards</div>
          <div style={{ fontSize: 12, color: 'var(--cutty-sark)', opacity: 0.7 }}>{filtered.length} dashboards</div>
        </div>
        <button className="qs-primary-btn" onClick={() => openModal('create-dashboard')}
          style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'var(--teal)', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 16px', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
          {PlusIcon} Create New Dashboard
        </button>
      </div>

      {/* Mode tabs */}
      <div className="home-mode-tabs" id="home-mode-tabs" style={{ display: 'flex', gap: 4, padding: '0 28px 12px' }}>
        {['all', 'manual', 'ai', 'hybrid'].map(tab => (
          <button key={tab} className={`home-tab${activeTab === tab ? ' active' : ''}`}
            onClick={() => setActiveTab(tab)}
            style={{ padding: '5px 14px', borderRadius: 20, border: '1px solid var(--nebula)', background: activeTab === tab ? 'var(--teal)' : 'transparent', color: activeTab === tab ? '#fff' : 'var(--cutty-sark)', fontSize: 12, fontWeight: 500, cursor: 'pointer', textTransform: 'capitalize' }}>
            {tab === 'all' ? 'All' : tab}
          </button>
        ))}
      </div>

      {/* Gallery */}
      <div className="dash-grid-wrap">
        <div className="dash-grid" id="home-dash-grid">
          {filtered.map(d => (
            <DashboardCard key={d.id} dash={d} onOpen={id => dispatch({ type: 'SET_DS_SECTION', section: 'dashboard-view' })} />
          ))}
        </div>
      </div>
    </div>
  )
}
