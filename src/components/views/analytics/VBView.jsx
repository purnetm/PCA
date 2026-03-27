import { useState } from 'react'

const CalendarSvg = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="1" y="2" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1 5h11" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M4 1v2M9 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const TABS = [
  { id: 'overview',   label: 'Overview' },
  { id: 'insights',   label: 'Insights & Performance' },
  { id: 'resolution', label: 'Resolution Health' },
  { id: 'others',     label: 'Others' },
]

export default function VBView() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="view active" id="view-analytics" style={{ flexDirection: 'column' }}>
      <div style={{ flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden', display: 'flex' }}>

        {/* Topbar */}
        <div className="analytics-topbar">
          <div>
            <div className="analytics-page-title">Voicebot Dashboard</div>
            <div className="analytics-page-sub">Voicebot call analytics, resolution rates, and operational metrics.</div>
          </div>
          <div className="analytics-date-controls">
            <div className="analytics-date-group">
              <span className="analytics-date-label">Start Date:</span>
              <div className="analytics-date-field"><CalendarSvg />Mar 18th, 2026</div>
            </div>
            <div className="analytics-date-group">
              <span className="analytics-date-label">End Date:</span>
              <div className="analytics-date-field"><CalendarSvg />Mar 25th, 2026</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="analytics-tabs-wrap">
          <div className="a-tabs-pill">
            <button className={`a-tab${activeTab === 'overview' ? ' active' : ''}`} id="vb-tab-overview" onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={`a-tab${activeTab === 'insights' ? ' active' : ''}`} id="vb-tab-insights" onClick={() => setActiveTab('insights')}>Insights &amp; Performance</button>
            <button className={`a-tab${activeTab === 'resolution' ? ' active' : ''}`} id="vb-tab-resolution" onClick={() => setActiveTab('resolution')}>Resolution Health</button>
            <button className={`a-tab${activeTab === 'others' ? ' active' : ''}`} id="vb-tab-others" onClick={() => setActiveTab('others')}>Others</button>
          </div>
        </div>

        {/* Content */}
        <div className="analytics-content">

          {/* Overview Pane */}
          <div className={`a-tab-content${activeTab === 'overview' ? ' active' : ''}`} id="vb-pane-overview" style={{ display: activeTab === 'overview' ? undefined : 'none' }}>

            {/* KPI row 1 */}
            <div className="vb-kpi-row">
              <div className="a-kpi-card">
                <div className="a-kpi-label">Total Calls</div>
                <div className="a-kpi-value">18,911</div>
                <div className="a-kpi-trend negative">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3l4 6 4-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  -7.7% vs previous period
                </div>
              </div>
              <div className="a-kpi-card"><div className="a-kpi-label">Total Voicebot Calls</div><div className="a-kpi-value">0</div></div>
              <div className="a-kpi-card"><div className="a-kpi-label">Resolved by Bot</div><div className="a-kpi-value">0</div><div className="a-kpi-sub">(0.00%)</div></div>
              <div className="a-kpi-card"><div className="a-kpi-label">Agent Handover</div><div className="a-kpi-value">0</div><div className="a-kpi-sub">(0.00%)</div></div>
            </div>

            {/* KPI row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div className="a-kpi-card"><div className="a-kpi-label">Avg Handling Time</div><div className="a-kpi-value">—</div></div>
              <div className="a-kpi-card"><div className="a-kpi-label">Drop Off Rate</div><div className="a-kpi-value">0%</div></div>
            </div>

            {/* Peak Call Hours + Weekly Breakdown */}
            <div className="a-2col-wide">
              <div className="a-card">
                <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Peak Call Hours</div></div></div>
                <div className="a-card-body">
                  <div className="a-chart-empty">No peak hours data available</div>
                </div>
              </div>
              <div className="a-card">
                <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Weekly Breakdown</div></div></div>
                <div className="a-card-body">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                    <div className="a-bar-row" style={{ gap: 6 }}><span style={{ minWidth: 30, fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}>Mon</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '0%' }}></div></div></div>
                    <div className="a-bar-row" style={{ gap: 6 }}><span style={{ minWidth: 30, fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}>Tue</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '0%' }}></div></div></div>
                    <div className="a-bar-row" style={{ gap: 6 }}><span style={{ minWidth: 30, fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}>Wed</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '0%' }}></div></div></div>
                    <div className="a-bar-row" style={{ gap: 6 }}><span style={{ minWidth: 30, fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}>Thu</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '0%' }}></div></div></div>
                    <div className="a-bar-row" style={{ gap: 6 }}><span style={{ minWidth: 30, fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}>Fri</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '0%' }}></div></div></div>
                    <div className="a-bar-row" style={{ gap: 6 }}><span style={{ minWidth: 30, fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}>Sat</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '0%' }}></div></div></div>
                    <div className="a-bar-row" style={{ gap: 6 }}><span style={{ minWidth: 30, fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}>Sun</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '0%' }}></div></div></div>
                  </div>
                  <div style={{ display: 'flex', gap: 14, marginTop: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-info)', display: 'inline-block' }}></span>Escalated</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: '#8B5CF6', display: 'inline-block' }}></span>Resolved</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hourly Trend */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Hourly Trend</div></div></div>
              <div className="a-card-body">
                <svg width="100%" height="80" viewBox="0 0 700 80" preserveAspectRatio="none">
                  <line x1="0" y1="75" x2="700" y2="75" stroke="var(--aqua-haze)" strokeWidth="1"/>
                  <line x1="0" y1="55" x2="700" y2="55" stroke="var(--aqua-haze)" strokeWidth="1"/>
                  <line x1="0" y1="35" x2="700" y2="35" stroke="var(--aqua-haze)" strokeWidth="1"/>
                  <line x1="0" y1="15" x2="700" y2="15" stroke="var(--aqua-haze)" strokeWidth="1"/>
                  <path d="M0,75 L700,75" fill="none" stroke="var(--accent-info)" strokeWidth="2"/>
                </svg>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 4 }}>
                  <span>11 AM – 12 PM</span><span>12 PM – 1 PM</span><span>1 PM – 2 PM</span><span>2 PM – 3 PM</span><span>3 PM – 4 PM</span><span>4 PM – 5 PM</span><span>5 PM – 6 PM</span><span>6 PM – 7 PM</span><span>7 PM – 8 PM</span>
                </div>
                <div style={{ display: 'flex', gap: 14, marginTop: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}><span style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent-info)', display: 'inline-block' }}></span>Total Calls</div>
                </div>
              </div>
            </div>

          </div>{/* /vb-pane-overview */}

          <div className="a-tab-content" id="vb-pane-insights" style={{ display: activeTab === 'insights' ? undefined : 'none' }}>
            <div className="a-placeholder"><div className="a-placeholder-icon">📈</div><div className="a-placeholder-title">Insights &amp; Performance</div><div className="a-placeholder-sub">Voicebot performance analytics coming soon.</div></div>
          </div>
          <div className="a-tab-content" id="vb-pane-resolution" style={{ display: activeTab === 'resolution' ? undefined : 'none' }}>
            <div className="a-placeholder"><div className="a-placeholder-icon">✅</div><div className="a-placeholder-title">Resolution Health</div><div className="a-placeholder-sub">Resolution quality metrics coming soon.</div></div>
          </div>
          <div className="a-tab-content" id="vb-pane-others" style={{ display: activeTab === 'others' ? undefined : 'none' }}>
            <div className="a-placeholder"><div className="a-placeholder-icon">📋</div><div className="a-placeholder-title">Others</div><div className="a-placeholder-sub">Additional voicebot metrics coming soon.</div></div>
          </div>

        </div>
      </div>
    </div>
  )
}
