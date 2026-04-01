import { useState } from 'react'

const CalendarSvg = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="1" y="2" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1 5h11" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M4 1v2M9 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const TABS = [
  { id: 'overview',  label: 'Overview' },
  { id: 'orders',    label: 'Orders & Order Management' },
  { id: 'delivery',  label: 'Delivery, Tracking & Fulfillment' },
  { id: 'returns',   label: 'Returns, Replacements & Refunds' },
  { id: 'payments',  label: 'Payments, Billing & Wallet Issues' },
]

export default function RPAView() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="view active" id="view-analytics" style={{ flexDirection: 'column' }}>
      <div style={{ flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden', display: 'flex' }}>

        {/* Topbar */}
        <div className="analytics-topbar">
          <div>
            <div className="analytics-page-title">RPA Analytics Dashboard</div>
            <div className="analytics-page-sub">Comprehensive resolution journey, agent behavior &amp; quality metrics</div>
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
            <button className={`a-tab${activeTab === 'overview' ? ' active' : ''}`} id="rpa-tab-overview" onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={`a-tab${activeTab === 'orders' ? ' active' : ''}`} id="rpa-tab-orders" onClick={() => setActiveTab('orders')}>Orders &amp; Order Management</button>
            <button className={`a-tab${activeTab === 'delivery' ? ' active' : ''}`} id="rpa-tab-delivery" onClick={() => setActiveTab('delivery')}>Delivery, Tracking &amp; Fulfillment</button>
            <button className={`a-tab${activeTab === 'returns' ? ' active' : ''}`} id="rpa-tab-returns" onClick={() => setActiveTab('returns')}>Returns, Replacements &amp; Refunds</button>
            <button className={`a-tab${activeTab === 'payments' ? ' active' : ''}`} id="rpa-tab-payments" onClick={() => setActiveTab('payments')}>Payments, Billing &amp; Wallet Issues</button>
          </div>
        </div>

        {/* Content */}
        <div className="analytics-content">

          {/* Overview Pane */}
          <div className={`a-tab-content${activeTab === 'overview' ? ' active' : ''}`} id="rpa-pane-overview" style={{ display: activeTab === 'overview' ? undefined : 'none' }}>

            {/* KPI Row */}
            <div className="a-kpi-row">
              <div className="a-kpi-card"><div className="a-kpi-label">Total Tickets</div><div className="a-kpi-value">18,462</div><div className="a-kpi-trend positive"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9l4-6 4 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg> Trending up</div></div>
              <div className="a-kpi-card"><div className="a-kpi-label">Avg Resolution Time</div><div className="a-kpi-value">1h 6m</div><div className="a-kpi-trend positive"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 3l4 6 4-6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg> ↓ 4m vs last week</div></div>
              <div className="a-kpi-card"><div className="a-kpi-label">FCR Rate</div><div className="a-kpi-value">97.6%</div><div className="a-kpi-trend positive"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9l4-6 4 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg> ↑ 2.4 pp vs last week</div></div>
              <div className="a-kpi-card"><div className="a-kpi-label">CSAT Score</div><div className="a-kpi-value">0.87</div><div className="a-kpi-trend positive"><svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 9l4-6 4 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg> ↑ 0.05 vs last period</div></div>
            </div>

            {/* Bottlenecks + CES */}
            <div className="a-2col-wide">
              <div className="a-card">
                <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Top Bottlenecks</div><div className="a-card-sub">Leading causes of delays or escalations</div></div><span className="a-card-badge info">5 identified</span></div>
                <div className="a-card-body">
                  <div className="a-bottleneck-row"><div className="a-bottleneck-color" style={{ background: '#F97316' }}></div><div style={{ flex: 1, minWidth: 0 }}><div className="a-bottleneck-name">Excessive Customer Frustration</div><div className="a-bottleneck-bar-wrap"><div className="a-bottleneck-bar"><div className="a-bottleneck-bar-fill" style={{ width: '100%', background: '#F97316' }}></div></div><div className="a-bottleneck-footer"><span className="a-bottleneck-count">134 tickets</span><span className="a-card-badge alert" style={{ fontSize: 9, padding: '1px 6px' }}>High Impact 3.4</span></div></div></div></div>
                  <div className="a-bottleneck-row"><div className="a-bottleneck-color" style={{ background: '#F59E0B' }}></div><div style={{ flex: 1, minWidth: 0 }}><div className="a-bottleneck-name">Level 2 Technical Support Needed</div><div className="a-bottleneck-bar-wrap"><div className="a-bottleneck-bar"><div className="a-bottleneck-bar-fill" style={{ width: '59%', background: '#F59E0B' }}></div></div><div className="a-bottleneck-footer"><span className="a-bottleneck-count">79 tickets</span><span className="a-card-badge info" style={{ fontSize: 9, padding: '1px 6px' }}>Low Impact 1.2</span></div></div></div></div>
                  <div className="a-bottleneck-row"><div className="a-bottleneck-color" style={{ background: '#6B7280' }}></div><div style={{ flex: 1, minWidth: 0 }}><div className="a-bottleneck-name">Others</div><div className="a-bottleneck-bar-wrap"><div className="a-bottleneck-bar"><div className="a-bottleneck-bar-fill" style={{ width: '44%', background: '#6B7280' }}></div></div><div className="a-bottleneck-footer"><span className="a-bottleneck-count">59 tickets</span><span className="a-card-badge info" style={{ fontSize: 9, padding: '1px 6px' }}>Low Impact 1.2</span></div></div></div></div>
                  <div className="a-bottleneck-row"><div className="a-bottleneck-color" style={{ background: '#DC2626' }}></div><div style={{ flex: 1, minWidth: 0 }}><div className="a-bottleneck-name">Unresolved Complaint Deadlock</div><div className="a-bottleneck-bar-wrap"><div className="a-bottleneck-bar"><div className="a-bottleneck-bar-fill" style={{ width: '39%', background: '#DC2626' }}></div></div><div className="a-bottleneck-footer"><span className="a-bottleneck-count">52 tickets</span><span className="a-card-badge caution" style={{ fontSize: 9, padding: '1px 6px' }}>Med Impact 1.5</span></div></div></div></div>
                  <div className="a-bottleneck-row"><div className="a-bottleneck-color" style={{ background: '#3B82F6' }}></div><div style={{ flex: 1, minWidth: 0 }}><div className="a-bottleneck-name">Complex Logistics Coordination</div><div className="a-bottleneck-bar-wrap"><div className="a-bottleneck-bar"><div className="a-bottleneck-bar-fill" style={{ width: '38%', background: '#3B82F6' }}></div></div><div className="a-bottleneck-footer"><span className="a-bottleneck-count">51 tickets</span><span className="a-card-badge info" style={{ fontSize: 9, padding: '1px 6px' }}>Low Impact 0.8</span></div></div></div></div>
                </div>
              </div>
              <div className="a-card">
                <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Customer Effort Score</div><div className="a-card-sub">Avg effort level for customers</div></div><span className="a-card-badge info">0.8/5</span></div>
                <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingTop: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <svg width="100" height="100" viewBox="0 0 110 110" style={{ flexShrink: 0 }}>
                      <circle cx="55" cy="55" r="44" fill="none" stroke="rgba(16,185,129,0.12)" strokeWidth="14"/>
                      <circle cx="55" cy="55" r="44" fill="none" stroke="var(--accent-success)" strokeWidth="14" strokeDasharray="44 232" strokeDashoffset="0" transform="rotate(-90 55 55)"/>
                      <text x="55" y="51" textAnchor="middle" fontFamily="var(--font-display)" fontSize="20" fontWeight="700" fill="var(--accent-success)">0.8</text>
                      <text x="55" y="64" textAnchor="middle" fontFamily="var(--font-body)" fontSize="9" fill="var(--accent-success)" opacity=".7">/ 5</text>
                    </svg>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--accent-success)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>Excellent</div>
                      <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .6, marginBottom: 4 }}>Low customer effort</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, padding: '10px 12px', background: 'var(--surface)', border: '1px solid var(--nebula)', borderRadius: 8 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--cutty-sark)', opacity: .6, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.05em' }}>Benchmark Comparison</div>
                    <div style={{ display: 'flex', gap: 10, marginBottom: 8 }}>
                      <div style={{ flex: 1, textAlign: 'center', padding: '6px 8px', borderRadius: 6, background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-success)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>0.8</div>
                        <div style={{ fontSize: 9, color: 'var(--cutty-sark)', opacity: .7, marginTop: 3 }}>Yours</div>
                      </div>
                      <div style={{ flex: 1, textAlign: 'center', padding: '6px 8px', borderRadius: 6, border: '1px solid var(--nebula)' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark-teal)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>1.0</div>
                        <div style={{ fontSize: 9, color: 'var(--cutty-sark)', opacity: .7, marginTop: 3 }}>Target</div>
                      </div>
                      <div style={{ flex: 1, textAlign: 'center', padding: '6px 8px', borderRadius: 6, border: '1px solid var(--nebula)' }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--cutty-sark)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>2.1</div>
                        <div style={{ fontSize: 9, color: 'var(--cutty-sark)', opacity: .7, marginTop: 3 }}>Ind. Avg</div>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>vs last period: <strong style={{ color: 'var(--accent-success)' }}>1.1/5</strong> → <strong style={{ color: 'var(--accent-success)' }}>0.8/5</strong> <span style={{ color: 'var(--accent-success)' }}>↓ improving</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Internal Effort + Interaction Efficiency */}
            <div className="a-2col">
              <div className="a-card">
                <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Internal Effort Score</div><div className="a-card-sub">Average agent effort (messages, holds, escalations per ticket)</div></div><span className="a-card-badge info">1.6/5</span></div>
                <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <svg width="90" height="90" viewBox="0 0 90 90" style={{ flexShrink: 0 }}>
                      <circle cx="45" cy="45" r="36" fill="none" stroke="var(--aqua-haze)" strokeWidth="12"/>
                      <circle cx="45" cy="45" r="36" fill="none" stroke="#F97316" strokeWidth="12" strokeDasharray="72 154" strokeDashoffset="0" transform="rotate(-90 45 45)"/>
                      <text x="45" y="42" textAnchor="middle" fontFamily="var(--font-display)" fontSize="16" fontWeight="700" fill="var(--accent-info-dark)">1.6</text>
                      <text x="45" y="54" textAnchor="middle" fontFamily="var(--font-body)" fontSize="8" fill="var(--accent-info-mid)" opacity=".7">/ 5</text>
                    </svg>
                    <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, lineHeight: 1.5 }}>Lower is better. Captures agent messages, hold frequency, and escalation count per ticket.</div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <div className="a-effort-pill"><span className="a-effort-pill-label">Avg Messages</span><span className="a-effort-pill-value">11.8</span></div>
                    <div className="a-effort-pill"><span className="a-effort-pill-label">Hold Rate</span><span className="a-effort-pill-value">20.7%</span></div>
                    <div className="a-effort-pill"><span className="a-effort-pill-label">Escalation</span><span className="a-effort-pill-value">0.5%</span></div>
                  </div>
                </div>
              </div>
              <div className="a-card">
                <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Interaction Efficiency</div><div className="a-card-sub">Combined metric of speed, effort, and resolution quality</div></div><span className="a-card-badge green">High Efficiency</span></div>
                <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 700, color: 'var(--dark-teal)', marginBottom: 12 }}>1,561</div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <div style={{ flex: 1, padding: '12px', border: '1px solid var(--nebula)', borderRadius: 'var(--radius-sm)' }}><div style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark-teal)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>1h 6m</div><div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .6, marginTop: 6 }}>Speed</div></div>
                      <div style={{ flex: 1, padding: '12px', border: '1px solid var(--nebula)', borderRadius: 'var(--radius-sm)' }}><div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-success)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>0.8/5</div><div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .6, marginTop: 6 }}>Cust. Effort</div></div>
                      <div style={{ flex: 1, padding: '12px', border: '1px solid var(--nebula)', borderRadius: 'var(--radius-sm)' }}><div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-success)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>97.6%</div><div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .6, marginTop: 6 }}>FCR</div></div>
                    </div>
                  </div>
                  <div style={{ marginTop: 12, padding: '8px 12px', background: 'var(--surface)', border: '1px solid var(--nebula)', borderRadius: 6, fontFamily: 'var(--font-mono, monospace)' }}>
                    <div style={{ fontSize: 9, color: 'var(--cutty-sark)', opacity: .5, marginBottom: 3, fontFamily: 'inherit' }}>EFFICIENCY FORMULA</div>
                    <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .7, fontFamily: 'inherit' }}>Score = FCR × (1 / Effort) × (1 / ResolutionTime<sub>norm</sub>)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sentiment & Journey Analysis */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Sentiment &amp; Journey Analysis</div></div><button className="a-card-btn">Journey</button></div>
              <div className="a-card-body">
                <div className="a-2col">
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-teal)', marginBottom: 12 }}>Sentiment Distribution</div>
                    <div style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
                      <div style={{ flex: 1, padding: '12px', border: '1px solid var(--nebula)', borderRadius: 'var(--radius-sm)', background: 'rgba(16,185,129,0.05)', borderTop: '3px solid var(--accent-success)' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--accent-success)', lineHeight: 1 }}>15.32%</div>
                        <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, marginTop: 6 }}>Improved<br/>2,928 cases</div>
                      </div>
                      <div style={{ flex: 1, padding: '12px', border: '1px solid var(--nebula)', borderRadius: 'var(--radius-sm)', borderTop: '3px solid var(--cutty-sark)' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--cutty-sark)', lineHeight: 1 }}>76.83%</div>
                        <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, marginTop: 6 }}>No Change<br/>14,184 cases</div>
                      </div>
                      <div style={{ flex: 1, padding: '12px', border: '1px solid var(--nebula)', borderRadius: 'var(--radius-sm)', background: 'rgba(220,38,38,0.04)', borderTop: '3px solid var(--status-negative)' }}>
                        <div style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 700, color: 'var(--status-negative)', lineHeight: 1 }}>7.85%</div>
                        <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, marginTop: 6 }}>Worsened<br/>1,450 cases</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-teal)', marginBottom: 12 }}>CX Impact Score</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <svg width="80" height="80" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r="32" fill="none" stroke="var(--accent-info-10)" strokeWidth="12"/>
                        <circle cx="40" cy="40" r="32" fill="none" stroke="var(--accent-info)" strokeWidth="12" strokeDasharray="123 78" strokeDashoffset="0" transform="rotate(-90 40 40)"/>
                        <text x="40" y="38" textAnchor="middle" fontFamily="var(--font-display)" fontSize="14" fontWeight="700" fill="var(--accent-info-dark)">43</text>
                        <text x="40" y="48" textAnchor="middle" fontFamily="var(--font-body)" fontSize="7" fill="var(--accent-info-mid)" opacity=".7">/ 100</text>
                      </svg>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                        <div style={{ marginBottom: 2 }}><span style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent-warning)', padding: '1px 6px', background: 'rgba(245,158,11,0.1)', borderRadius: 4 }}>Moderate</span></div>
                        <div><span style={{ fontSize: 20, fontWeight: 700, color: 'var(--dark-teal)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>4.4/5</span> <span style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .6 }}>CSAT</span> <span style={{ fontSize: 10, color: 'var(--accent-success)' }}>↑ +0.2</span></div>
                        <div><span style={{ fontSize: 20, fontWeight: 700, color: 'var(--dark-teal)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>0.8/5</span> <span style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .6 }}>Effort</span> <span style={{ fontSize: 10, color: 'var(--accent-success)' }}>↓ -0.1</span></div>
                        <div><span style={{ fontSize: 20, fontWeight: 700, color: 'var(--dark-teal)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>2,721</span> <span style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .6 }}>Happy</span> <span style={{ fontSize: 10, color: 'var(--accent-success)' }}>↑ +124</span></div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12, padding: '8px 10px', background: 'var(--surface)', border: '1px solid var(--nebula)', borderRadius: 6 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--cutty-sark)', opacity: .5, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.05em' }}>3-Month Trend</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .7 }}>CSAT</span>
                          <span style={{ fontSize: 10, color: 'var(--dark-teal)', fontFamily: 'var(--font-mono, monospace)' }}>4.4 → 4.2 → <strong style={{ color: 'var(--accent-success)' }}>4.4</strong></span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .7 }}>Effort</span>
                          <span style={{ fontSize: 10, color: 'var(--dark-teal)', fontFamily: 'var(--font-mono, monospace)' }}>1.1 → 0.9 → <strong style={{ color: 'var(--accent-success)' }}>0.8</strong> <span style={{ color: 'var(--accent-success)' }}>↓</span></span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .7 }}>Sentiment Improved %</span>
                          <span style={{ fontSize: 10, color: 'var(--dark-teal)', fontFamily: 'var(--font-mono, monospace)' }}>13% → 14.5% → <strong style={{ color: 'var(--accent-success)' }}>15.3%</strong> <span style={{ color: 'var(--accent-success)' }}>↑</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phase-Specific Quality Metrics */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Phase-Specific Quality Metrics</div></div></div>
              <div className="a-card-body">
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--cutty-sark)', letterSpacing: '.06em', opacity: .7, marginBottom: 12, textTransform: 'uppercase' }}>Probing Phase</div>
                <div className="a-card" style={{ marginBottom: 20 }}>
                  <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Probing Quality</div><div className="a-card-sub">Over/under-probing, repeated info requests, re-explanations, intent match</div></div><span className="a-card-badge caution">46.7% match</span></div>
                  <div className="a-card-body">
                    <div className="a-probe-grid">
                      <div className="a-probe-stat"><div className="a-probe-val">1.4%</div><div className="a-probe-lbl">Over-Probing</div></div>
                      <div className="a-probe-stat highlight" style={{ background: 'rgba(245,158,11,0.07)' }}><div className="a-probe-val">24.2%</div><div className="a-probe-lbl">Under-Probing</div></div>
                      <div className="a-probe-stat"><div className="a-probe-val">3.0%</div><div className="a-probe-lbl">Repeated Info</div></div>
                      <div className="a-probe-stat highlight" style={{ background: 'rgba(245,158,11,0.07)' }}><div className="a-probe-val">17.4%</div><div className="a-probe-lbl">Re-Explanations</div></div>
                    </div>
                    <div style={{ background: 'var(--surface)', border: '1px solid var(--nebula)', borderRadius: 8, padding: '8px 12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                        <span style={{ fontSize: 'var(--font-sm)', color: 'var(--dark-teal)' }}>Intent-Response Match Rate</span>
                        <span style={{ fontSize: 'var(--font-md)', fontWeight: 700, color: 'var(--accent-warning)' }}>46.7%</span>
                      </div>
                      <div style={{ position: 'relative', height: 5, background: 'var(--aqua-haze)', borderRadius: 3, overflow: 'visible' }}>
                        <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '46.7%', background: 'var(--accent-warning)', borderRadius: 3 }}></div>
                        <div style={{ position: 'absolute', left: '70%', top: -4, width: 2, height: 13, background: 'var(--dark-teal)', borderRadius: 1 }} title="Target: 70%"></div>
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--accent-warning)', marginTop: 5 }}>Below target (70%)</div>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--cutty-sark)', letterSpacing: '.06em', opacity: .7, marginBottom: 12, textTransform: 'uppercase' }}>Hold Phase</div>
                <div className="a-card">
                  <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Hold Analysis</div><div className="a-card-sub">Tickets with holds, dead air incidents, hold time breaches, delay explanations</div></div><span className="a-card-badge caution">20.7% with holds</span></div>
                  <div className="a-card-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <svg width="90" height="90" viewBox="0 0 90 90" style={{ flexShrink: 0 }}>
                        <circle cx="45" cy="45" r="36" fill="none" stroke="var(--aqua-haze)" strokeWidth="12"/>
                        <circle cx="45" cy="45" r="36" fill="none" stroke="#F97316" strokeWidth="12" strokeDasharray="47 179" strokeDashoffset="0" transform="rotate(-90 45 45)"/>
                        <text x="45" y="42" textAnchor="middle" fontFamily="var(--font-display)" fontSize="14" fontWeight="700" fill="var(--dark-teal)">20.1%</text>
                        <text x="45" y="54" textAnchor="middle" fontFamily="var(--font-body)" fontSize="7" fill="var(--cutty-sark)" opacity=".7">Hold Rate</text>
                      </svg>
                      <div className="a-2col" style={{ flex: 1 }}>
                        <div><div style={{ fontSize: 24, fontWeight: 700, color: 'var(--dark-teal)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>34.3%</div><div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, marginTop: 4 }}>Dead Air</div></div>
                        <div><div style={{ fontSize: 24, fontWeight: 700, color: 'var(--dark-teal)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>22.4%</div><div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, marginTop: 4 }}>Time Breaches</div></div>
                        <div><div style={{ fontSize: 24, fontWeight: 700, color: 'var(--dark-teal)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>9.8%</div><div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, marginTop: 4 }}>Delay Explained <span style={{ fontSize: 9, color: 'var(--accent-warning)', display: 'block', fontWeight: 400 }}>should be &gt;80%</span></div></div>
                      </div>
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--nebula)' }}>Of tickets with holds (20.1%)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Escalation & Transfer */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Escalation &amp; Transfer</div></div></div>
              <div className="a-card-body">
                <div className="a-2col">
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-teal)', marginBottom: 12 }}>Escalations <span style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--status-negative)', lineHeight: 1 }}> 444 </span><span style={{ fontSize: 11, fontWeight: 400, opacity: .6 }}>total</span></div>
                    <svg width="100%" height="160" viewBox="0 0 260 120" preserveAspectRatio="none">
                      <defs><linearGradient id="esc-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#DC2626" stopOpacity=".2"/><stop offset="100%" stopColor="#DC2626" stopOpacity="0"/></linearGradient></defs>
                      <line x1="30" y1="10" x2="255" y2="10" stroke="var(--nebula)" strokeWidth=".5" opacity=".5"/>
                      <line x1="30" y1="40" x2="255" y2="40" stroke="var(--nebula)" strokeWidth=".5" opacity=".5"/>
                      <line x1="30" y1="70" x2="255" y2="70" stroke="var(--nebula)" strokeWidth=".5" opacity=".5"/>
                      <text x="26" y="13" fontFamily="var(--font-body)" fontSize="7" textAnchor="end" fill="var(--cutty-sark)" opacity=".6">140</text>
                      <text x="26" y="43" fontFamily="var(--font-body)" fontSize="7" textAnchor="end" fill="var(--cutty-sark)" opacity=".6">100</text>
                      <text x="26" y="73" fontFamily="var(--font-body)" fontSize="7" textAnchor="end" fill="var(--cutty-sark)" opacity=".6">50</text>
                      <path d="M30,10 C70,10 90,28 110,43 C150,73 200,88 255,94 L255,94 L255,97 L30,97 Z" fill="url(#esc-grad)"/>
                      <path d="M30,10 C70,10 90,28 110,43 C150,73 200,88 255,94" fill="none" stroke="var(--status-negative)" strokeWidth="1.8" strokeLinecap="round"/>
                      <text x="30"  y="114" fontSize="7" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Mon</text>
                      <text x="72"  y="114" fontSize="7" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Tue</text>
                      <text x="114" y="114" fontSize="7" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Wed</text>
                      <text x="156" y="114" fontSize="7" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Thu</text>
                      <text x="198" y="114" fontSize="7" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Fri</text>
                      <text x="255" y="114" fontSize="7" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Sat</text>
                    </svg>
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-teal)', marginBottom: 8 }}>Escalation Avoidability <span className="a-card-badge green" style={{ display: 'inline-flex' }}>37 avoidable</span></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <svg width="70" height="70" viewBox="0 0 70 70" style={{ flexShrink: 0 }}>
                        <circle cx="35" cy="35" r="28" fill="none" stroke="var(--aqua-haze)" strokeWidth="10"/>
                        <circle cx="35" cy="35" r="28" fill="none" stroke="var(--accent-success)" strokeWidth="10" strokeDasharray="141 35" strokeDashoffset="0" transform="rotate(-90 35 35)"/>
                        <text x="35" y="33" textAnchor="middle" fontFamily="var(--font-display)" fontSize="12" fontWeight="700" fill="var(--dark-teal)">80%</text>
                        <text x="35" y="44" textAnchor="middle" fontFamily="var(--font-body)" fontSize="7" fill="var(--cutty-sark)" opacity=".6">avoidable</text>
                      </svg>
                      <div>
                        <div style={{ display: 'flex', gap: 10, marginBottom: 6 }}>
                          <div style={{ border: '1px solid var(--nebula)', borderRadius: 6, padding: '8px 12px', textAlign: 'center' }}><div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--dark-teal)', lineHeight: 1 }}>401</div><div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 3 }}>Early-stage</div></div>
                          <div style={{ border: '1px solid var(--nebula)', borderRadius: 6, padding: '8px 12px', textAlign: 'center' }}><div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--dark-teal)', lineHeight: 1 }}>43</div><div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 3 }}>Late-stage</div></div>
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .6 }}>Escalation Rate: <strong style={{ color: 'var(--dark-teal)' }}>0.5%</strong></div>
                      </div>
                    </div>
                    <div style={{ marginTop: 10 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--dark-teal)', marginBottom: 4 }}>Top Reasons</div>
                      <div className="a-top-reason"><span className="a-top-reason-lbl">Excessive Customer Frustration</span><span className="a-top-reason-val">134</span></div>
                      <div className="a-top-reason"><span className="a-top-reason-lbl">Level 2 Technical Support Needed</span><span className="a-top-reason-val">79</span></div>
                      <div className="a-top-reason"><span className="a-top-reason-lbl">Others</span><span className="a-top-reason-val">59</span></div>
                      <div className="a-top-reason"><span className="a-top-reason-lbl">Unresolved Complaint Deadlock</span><span className="a-top-reason-val">52</span></div>
                      <div className="a-top-reason"><span className="a-top-reason-lbl">Complex Logistics Coordination</span><span className="a-top-reason-val">51</span></div>
                      <div className="a-top-reason" style={{ opacity: .5 }}><span className="a-top-reason-lbl">Unaccounted</span><span className="a-top-reason-val">69</span></div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                  <div className="a-esc-timing-block" style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--dark-teal)', lineHeight: 1 }}>28m</div>
                    <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 3 }}>Avg Time to Escalate</div>
                    <div style={{ fontSize: 9, color: 'var(--cutty-sark)', opacity: .5, marginTop: 2 }}>from ticket open</div>
                  </div>
                  <div className="a-esc-timing-block" style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--dark-teal)', lineHeight: 1 }}>1h 14m</div>
                    <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 3 }}>Post-Escalation Resolution</div>
                    <div style={{ fontSize: 9, color: 'var(--cutty-sark)', opacity: .5, marginTop: 2 }}>escalation to close</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Execution & Communication */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Execution &amp; Communication</div></div></div>
              <div className="a-card-body">
                <div className="a-kpi-row">
                  <div className="a-kpi-card"><div className="a-kpi-label">Replies per Resolution</div><div className="a-kpi-value">11.8</div><div className="a-kpi-sub" style={{ color: 'var(--accent-warning)' }}>Target: 8 · Over by 3.8</div></div>
                  <div className="a-kpi-card"><div className="a-kpi-label">Turn Ratio</div><div className="a-kpi-value">1.3:1</div><div className="a-kpi-sub" style={{ color: 'var(--accent-success)' }}>Healthy range: 1–1.5:1</div></div>
                  <div className="a-kpi-card"><div className="a-kpi-label">Repeated Info Requests</div><div className="a-kpi-value">3.0%</div><div className="a-kpi-sub" style={{ color: 'var(--accent-success)' }}>Target: &lt;5% ✓</div></div>
                  <div className="a-kpi-card"><div className="a-kpi-label">Re-Explanation Rate</div><div className="a-kpi-value">17.4%</div><div className="a-kpi-sub" style={{ color: 'var(--accent-warning)' }}>Target: 15% · Slightly over</div></div>
                </div>
              </div>
            </div>

            {/* Resolution Journey Breakdown */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Resolution Journey Breakdown</div></div><button className="a-card-btn">Journey</button></div>
              <div className="a-card-body">
                <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-teal)', marginBottom: 10 }}>Phase Durations <span style={{ fontSize: 11, fontWeight: 400, opacity: .6 }}>Time spent in probing, hold, escalation, and execution phases</span></div>
                <div className="a-phase-row" style={{ padding: '13px 0' }}><span className="a-phase-name">Execution</span><div className="a-phase-bar"><div className="a-phase-fill" style={{ width: '53%', background: '#8B5CF6', transition: 'width .4s ease' }}></div></div><span className="a-phase-pct"><span>53%</span><span style={{ opacity: .5, fontSize: 10, marginLeft: 4 }}>~35m</span></span></div>
                <div className="a-phase-row" style={{ padding: '13px 0' }}><span className="a-phase-name">Hold</span><div className="a-phase-bar"><div className="a-phase-fill" style={{ width: '27%', background: '#F59E0B', transition: 'width .4s ease' }}></div></div><span className="a-phase-pct"><span>27%</span><span style={{ opacity: .5, fontSize: 10, marginLeft: 4 }}>~18m</span></span></div>
                <div className="a-phase-row" style={{ padding: '13px 0' }}><span className="a-phase-name">Probing</span><div className="a-phase-bar"><div className="a-phase-fill" style={{ width: '12%', background: 'var(--accent-info)', transition: 'width .4s ease' }}></div></div><span className="a-phase-pct"><span>12%</span><span style={{ opacity: .5, fontSize: 10, marginLeft: 4 }}>~8m</span></span></div>
                <div className="a-phase-row" style={{ padding: '13px 0' }}><span className="a-phase-name">Transition</span><div className="a-phase-bar"><div className="a-phase-fill" style={{ width: '8%', background: '#F97316', transition: 'width .4s ease' }}></div></div><span className="a-phase-pct"><span>8%</span><span style={{ opacity: .5, fontSize: 10, marginLeft: 4 }}>~5m</span></span></div>
                <div style={{ borderTop: '1px solid var(--nebula)', marginTop: 8, paddingTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>Total handle time</div>
                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--dark-teal)', fontFamily: 'var(--font-display)', marginTop: 2 }}>~66 min avg</div>
                  </div>
                  <div style={{ flex: 1, marginLeft: 16, padding: '8px 10px', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.25)', borderLeft: '3px solid #F59E0B', borderRadius: 6, fontSize: 10, color: 'var(--cutty-sark)', lineHeight: 1.5 }}>
                    Hold (27%) is the largest non-execution phase — review hold SOP compliance
                  </div>
                </div>
              </div>
            </div>

            {/* Recontact & Repeat Issues */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Recontact &amp; Repeat Issues</div></div><span className="a-card-badge caution">43.0%</span></div>
              <div className="a-card-body">
                <div className="a-recontact-split">
                  <svg width="100" height="100" viewBox="0 0 100 100" style={{ flexShrink: 0 }}>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--aqua-haze)" strokeWidth="14"/>
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#F97316" strokeWidth="14" strokeDasharray="109 142" strokeDashoffset="0" transform="rotate(-90 50 50)"/>
                    <text x="50" y="47" textAnchor="middle" fontFamily="var(--font-display)" fontSize="14" fontWeight="700" fill="var(--dark-teal)">43.0%</text>
                    <text x="50" y="59" textAnchor="middle" fontFamily="var(--font-body)" fontSize="8" fill="var(--cutty-sark)" opacity=".6">Recontact</text>
                  </svg>
                  <div className="a-recontact-right">
                    <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--dark-teal)' }}>8,618 <span style={{ fontSize: 12, fontWeight: 400, opacity: .6 }}>Unique Customers</span></div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--dark-teal)', margin: '8px 0 4px' }}>Top Reasons</div>
                    <div className="a-top-reason"><span className="a-top-reason-lbl">Incomplete Resolution</span><span className="a-top-reason-val">3,321</span></div>
                    <div className="a-top-reason"><span className="a-top-reason-lbl">Status Follow-up</span><span className="a-top-reason-val">387</span></div>
                    <div className="a-top-reason" style={{ opacity: .6 }}><span className="a-top-reason-lbl">Other Reasons</span><span className="a-top-reason-val">7,910</span></div>
                    <div style={{ fontSize: 10, color: 'var(--accent-warning)', marginTop: 8 }}>43% recontact is above industry benchmark (~25%)</div>
                    <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 4 }}>8,618 unique × avg 1.5 contacts = ~12,927 recontact tickets</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compensation Analysis */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Compensation Analysis</div></div><span className="a-card-badge info">3.8%</span></div>
              <div className="a-card-body">
                <div className="a-2col">
                  <div>
                    <div style={{ display: 'flex', gap: 16, marginBottom: 14 }}>
                      <div style={{ padding: '10px 14px', border: '1px solid var(--nebula)', borderRadius: 8 }}><div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--dark-teal)' }}>3.8%</div><div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>of tickets compensated</div></div>
                      <div style={{ padding: '10px 14px', border: '1px solid var(--nebula)', borderRadius: 8 }}><div style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--dark-teal)' }}>$55K</div><div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>total compensation value</div></div>
                    </div>
                    <table className="a-comp-table">
                      <tbody>
                        <tr><td>Discount</td><td><div className="a-comp-bar" style={{ width: '100%' }}></div></td><td>$20K (36%)</td></tr>
                        <tr><td>Refund</td><td><div className="a-comp-bar" style={{ width: '65%' }}></div></td><td>$13K (24%)</td></tr>
                        <tr><td>Delivery Fee Waiver</td><td><div className="a-comp-bar" style={{ width: '50%' }}></div></td><td>$10K (18%)</td></tr>
                        <tr><td>Miscellaneous</td><td><div className="a-comp-bar" style={{ width: '35%' }}></div></td><td>$7K (13%)</td></tr>
                        <tr><td>Promo Coupon</td><td><div className="a-comp-bar" style={{ width: '25%' }}></div></td><td>$5K (9%)</td></tr>
                        <tr><td>Replacement</td><td><div className="a-comp-bar" style={{ width: '15%' }}></div></td><td>$3K (5%)</td></tr>
                        <tr><td>Price Adjustment</td><td><div className="a-comp-bar" style={{ width: '15%' }}></div></td><td>$3K (5%)</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-teal)', marginBottom: 4 }}>Sentiment by Compensation Type <button className="a-card-btn">Sentiment</button></div>
                      <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, marginBottom: 16 }}>Post-compensation sentiment by type</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                        <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}><span>Type</span><span style={{ display: 'flex', gap: 10 }}><span style={{ color: 'var(--accent-success)' }}>Pos</span><span>Neu</span><span style={{ color: 'var(--status-negative)' }}>Neg</span></span></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 10, color: 'var(--cutty-sark)', width: 80, flexShrink: 0 }}>Discount</span><div style={{ flex: 1, display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}><div style={{ width: '62%', background: 'var(--accent-success)', opacity: .7 }}></div><div style={{ width: '28%', background: 'var(--accent-info-10)' }}></div><div style={{ width: '10%', background: 'var(--status-negative)', opacity: .7 }}></div></div></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 10, color: 'var(--cutty-sark)', width: 80, flexShrink: 0 }}>Refund</span><div style={{ flex: 1, display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}><div style={{ width: '48%', background: 'var(--accent-success)', opacity: .7 }}></div><div style={{ width: '33%', background: 'var(--accent-info-10)' }}></div><div style={{ width: '19%', background: 'var(--status-negative)', opacity: .7 }}></div></div></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 10, color: 'var(--cutty-sark)', width: 80, flexShrink: 0 }}>Fee Waiver</span><div style={{ flex: 1, display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}><div style={{ width: '71%', background: 'var(--accent-success)', opacity: .7 }}></div><div style={{ width: '22%', background: 'var(--accent-info-10)' }}></div><div style={{ width: '7%', background: 'var(--status-negative)', opacity: .7 }}></div></div></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 10, color: 'var(--cutty-sark)', width: 80, flexShrink: 0 }}>Promo</span><div style={{ flex: 1, display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}><div style={{ width: '55%', background: 'var(--accent-success)', opacity: .7 }}></div><div style={{ width: '35%', background: 'var(--accent-info-10)' }}></div><div style={{ width: '10%', background: 'var(--status-negative)', opacity: .7 }}></div></div></div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 10, color: 'var(--cutty-sark)', width: 80, flexShrink: 0 }}>Replacement</span><div style={{ flex: 1, display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden' }}><div style={{ width: '40%', background: 'var(--accent-success)', opacity: .7 }}></div><div style={{ width: '38%', background: 'var(--accent-info-10)' }}></div><div style={{ width: '22%', background: 'var(--status-negative)', opacity: .7 }}></div></div></div>
                      </div>
                    </div>
                    <div style={{ marginTop: 20, padding: '10px 12px', background: 'var(--surface)', border: '1px solid var(--nebula)', borderLeft: '3px solid var(--accent-info)', borderRadius: 6, display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .8 }}><span style={{ color: 'var(--accent-success)', fontWeight: 600 }}>Fee Waiver</span> yields highest positive sentiment <strong>71%</strong></div>
                      <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .8 }}><span style={{ color: 'var(--status-negative)', fontWeight: 600 }}>Replacement</span> carries highest negative sentiment <strong>22%</strong></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Performance & Behavioral Metrics */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Agent Performance &amp; Behavioral Metrics</div></div></div>
              <div className="a-card-body">
                <div className="a-2col" style={{ marginBottom: 12 }}>
                  <div className="a-card" style={{ boxShadow: 'none' }}>
                    <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title" style={{ fontSize: 13 }}>Shift-End Rush Metrics</div><div className="a-card-sub">Resolution time and CSAT for last 30 min vs mid-shift</div></div><button className="a-card-btn">Compare</button></div>
                    <div className="a-card-body">
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.05em', color: 'var(--cutty-sark)', opacity: .6, marginBottom: 6, textTransform: 'uppercase' }}>AVG RESOLUTION TIME</div>
                      <div className="a-agent-row"><span className="a-agent-row-lbl">Last 30 min</span><span className="a-agent-row-val">2h 48m</span></div>
                      <div className="a-agent-bar"><div className="a-agent-bar-fill" style={{ width: '80%', background: 'var(--status-negative)', height: '100%', borderRadius: 2 }}></div></div>
                      <div className="a-agent-row"><span className="a-agent-row-lbl">Mid-Shift</span><span className="a-agent-row-val">1h 5m</span></div>
                      <div className="a-agent-bar"><div className="a-agent-bar-fill" style={{ width: '35%', background: 'var(--accent-info)', height: '100%', borderRadius: 2 }}></div></div>
                      <div style={{ display: 'flex', gap: 16, marginTop: 10 }}>
                        <div><div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--cutty-sark)', lineHeight: 1, opacity: .4 }}>—</div><div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>CSAT (Last 30m)</div><div style={{ fontSize: 9, color: 'var(--cutty-sark)', opacity: .5 }}>(insufficient data)</div></div>
                        <div><div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--dark-teal)', lineHeight: 1 }}>0.9</div><div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>CSAT (Mid-Shift)</div></div>
                      </div>
                    </div>
                  </div>
                  <div className="a-card" style={{ boxShadow: 'none' }}>
                    <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title" style={{ fontSize: 13 }}>Peak Load Efficiency</div><div className="a-card-sub">Avg resolution time and CSAT during rush hours vs normal</div></div><button className="a-card-btn">Load</button></div>
                    <div className="a-card-body">
                      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '.05em', color: 'var(--cutty-sark)', opacity: .6, marginBottom: 6, textTransform: 'uppercase' }}>RESOLUTION TIME</div>
                      <div className="a-agent-row"><span className="a-agent-row-lbl">Rush Hour</span><span className="a-agent-row-val">1h 7m</span></div>
                      <div className="a-agent-bar"><div className="a-agent-bar-fill" style={{ width: '38%', background: '#F97316', height: '100%', borderRadius: 2 }}></div></div>
                      <div className="a-agent-row"><span className="a-agent-row-lbl">Normal</span><span className="a-agent-row-val">1h 6m</span></div>
                      <div className="a-agent-bar"><div className="a-agent-bar-fill" style={{ width: '36%', background: 'var(--accent-info)', height: '100%', borderRadius: 2 }}></div></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
                        <span className="a-card-badge green">Stable</span>
                        <span style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .7 }}>No significant degradation under peak load</span>
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 6 }}>1% slower during rush hours</div>
                    </div>
                  </div>
                </div>
                <div className="a-2col">
                  <div className="a-card" style={{ boxShadow: 'none' }}>
                    <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title" style={{ fontSize: 13 }}>Agent Empathy Index</div><div className="a-card-sub">Average empathy score across all agent interactions</div></div><span className="a-card-badge alert">Needs Improvement</span></div>
                    <div className="a-card-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <svg width="80" height="80" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
                        <circle cx="40" cy="40" r="32" fill="none" stroke="var(--aqua-haze)" strokeWidth="11"/>
                        <circle cx="40" cy="40" r="32" fill="none" stroke="#F97316" strokeWidth="11" strokeDasharray="62 139" strokeDashoffset="0" transform="rotate(-90 40 40)"/>
                        <text x="40" y="37" textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fontWeight="700" fill="var(--dark-teal)">31%</text>
                        <text x="40" y="48" textAnchor="middle" fontFamily="var(--font-body)" fontSize="7" fill="var(--cutty-sark)" opacity=".6">empathy</text>
                      </svg>
                      <div>
                        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--dark-teal)', lineHeight: 1 }}>31.0%</div>
                        <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, marginTop: 4 }}>Empathy Score</div>
                        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>5,723 empathetic interactions</div>
                          <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>12,739 below threshold</div>
                        </div>
                        <div style={{ marginTop: 8 }}>
                          <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>Industry benchmark: &gt;60%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="a-card" style={{ boxShadow: 'none' }}>
                    <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title" style={{ fontSize: 13 }}>Tone Consistency Score</div><div className="a-card-sub">Agent tone consistency across interactions</div></div><span className="a-card-badge caution">Moderate</span></div>
                    <div className="a-card-body" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <svg width="80" height="80" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
                        <circle cx="40" cy="40" r="32" fill="none" stroke="var(--accent-info-10)" strokeWidth="11"/>
                        <circle cx="40" cy="40" r="32" fill="none" stroke="var(--accent-info)" strokeWidth="11" strokeDasharray="104 97" strokeDashoffset="0" transform="rotate(-90 40 40)"/>
                        <text x="40" y="37" textAnchor="middle" fontFamily="var(--font-display)" fontSize="14" fontWeight="700" fill="var(--accent-info-dark)">52</text>
                        <text x="40" y="48" textAnchor="middle" fontFamily="var(--font-body)" fontSize="7" fill="var(--accent-info-mid)" opacity=".6">/ 100</text>
                      </svg>
                      <div>
                        <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--dark-teal)', lineHeight: 1 }}>52.0<span style={{ fontSize: 13, fontWeight: 400, opacity: .5 }}> / 100</span></div>
                        <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, marginTop: 2 }}>Tone Consistency</div>
                        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>9,600 consistent interactions</div>
                          <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>8,862 tone variation detected</div>
                        </div>
                        <div style={{ marginTop: 8, display: 'flex', flexDirection: 'column', gap: 3 }}>
                          <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>Target: &gt;75%</div>
                          <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>18,462 interactions reviewed</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Path & Process Adherence */}
            <div className="a-card">
              <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Path &amp; Process Adherence</div></div></div>
              <div className="a-card-body">
                <div className="a-2col">
                  <div className="a-card" style={{ boxShadow: 'none' }}>
                    <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title" style={{ fontSize: 13 }}>Path Completion Rate</div><div className="a-card-sub">Percentage following optimal resolution paths</div></div><span className="a-card-badge info">40.0%</span></div>
                    <div className="a-card-body" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                      <svg width="80" height="80" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
                        <circle cx="40" cy="40" r="32" fill="none" stroke="var(--aqua-haze)" strokeWidth="11"/>
                        <circle cx="40" cy="40" r="32" fill="none" stroke="#F59E0B" strokeWidth="11" strokeDasharray="80 121" strokeDashoffset="0" transform="rotate(-90 40 40)"/>
                        <text x="40" y="37" textAnchor="middle" fontFamily="var(--font-display)" fontSize="12" fontWeight="700" fill="var(--dark-teal)">40.0%</text>
                        <text x="40" y="49" textAnchor="middle" fontFamily="var(--font-body)" fontSize="7" fill="var(--cutty-sark)" opacity=".6">on-path</text>
                      </svg>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--dark-teal)', lineHeight: 1 }}>7,385 <span style={{ fontSize: 11, opacity: .6, fontFamily: 'var(--font-body)', fontWeight: 400 }}>on optimal path</span></div>
                        <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--status-negative)', lineHeight: 1, marginTop: 6 }}>11,077 <span style={{ fontSize: 11, opacity: .6, fontFamily: 'var(--font-body)', fontWeight: 400 }}>deviated</span></div>
                        <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 6 }}>Target: 65%</div>
                        <div style={{ fontSize: 10, color: 'var(--accent-warning)', marginTop: 3 }}>Currently 25pp below target</div>
                      </div>
                    </div>
                  </div>
                  <div className="a-card" style={{ boxShadow: 'none' }}>
                    <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title" style={{ fontSize: 13 }}>SOP Adherence Rate</div><div className="a-card-sub">Adherence to standard operating procedures</div></div><span className="a-card-badge info">38.5%</span></div>
                    <div className="a-card-body" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 16 }}>
                      <svg width="80" height="80" viewBox="0 0 80 80" style={{ flexShrink: 0 }}>
                        <circle cx="40" cy="40" r="32" fill="none" stroke="var(--accent-info-10)" strokeWidth="11"/>
                        <circle cx="40" cy="40" r="32" fill="none" stroke="var(--accent-info)" strokeWidth="11" strokeDasharray="77 124" strokeDashoffset="0" transform="rotate(-90 40 40)"/>
                        <text x="40" y="37" textAnchor="middle" fontFamily="var(--font-display)" fontSize="13" fontWeight="700" fill="var(--accent-info-dark)">38.5</text>
                        <text x="40" y="49" textAnchor="middle" fontFamily="var(--font-body)" fontSize="7" fill="var(--cutty-sark)" opacity=".6">%</text>
                      </svg>
                      <div>
                        <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--dark-teal)', lineHeight: 1 }}>7,108 <span style={{ fontSize: 11, opacity: .6, fontFamily: 'var(--font-body)', fontWeight: 400 }}>compliant tickets</span></div>
                        <div style={{ fontSize: 18, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--status-negative)', lineHeight: 1, marginTop: 6 }}>11,354 <span style={{ fontSize: 11, opacity: .6, fontFamily: 'var(--font-body)', fontWeight: 400 }}>non-compliant</span></div>
                        <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 6 }}>Target: 75%</div>
                        <div style={{ fontSize: 10, color: 'var(--accent-warning)', marginTop: 3 }}>Currently 36.5pp below target</div>
                        <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 4 }}>Common violations: Hold SOP, Escalation SOP</div>
                      </div>
                    </div>
                  </div>
                  <div className="a-card" style={{ boxShadow: 'none' }}>
                    <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title" style={{ fontSize: 13 }}>Multi-Channel Switch Rate</div><div className="a-card-sub">Customers switching channels for same issue</div></div><span className="a-card-badge info">0.0%</span></div>
                    <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ flexShrink: 0, width: 60, height: 60, borderRadius: '50%', border: '9px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--accent-success)' }}>—</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent-success)', lineHeight: 1 }}>0.0%</div>
                          <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, marginTop: 4 }}>Multi-Channel Switch Rate</div>
                        </div>
                      </div>
                      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', fontSize: 10, fontWeight: 600, color: 'var(--accent-success)', padding: '2px 8px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 4 }}>No cross-channel re-contacts detected</div>
                      <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .65, lineHeight: 1.5 }}>Customers are resolving on first channel. If switching occurs, it appears here with path data.</div>
                      <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .5, paddingTop: 6, borderTop: '1px solid var(--nebula)' }}>Monitored: 18,462 tickets · Period: Mar 18–25</div>
                    </div>
                  </div>
                  <div className="a-card" style={{ boxShadow: 'none' }}>
                    <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title" style={{ fontSize: 13 }}>Follow-Up Action Rate</div><div className="a-card-sub">Tickets ending with scheduled follow-ups</div></div><span className="a-card-badge info">0.0%</span></div>
                    <div className="a-card-body" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ flexShrink: 0, width: 60, height: 60, borderRadius: '50%', border: '9px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 700, color: 'var(--accent-success)' }}>—</span>
                        </div>
                        <div>
                          <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-display)', color: 'var(--accent-success)', lineHeight: 1 }}>0.0%</div>
                          <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7, marginTop: 4 }}>Follow-Up Action Rate</div>
                        </div>
                      </div>
                      <div style={{ display: 'inline-flex', alignSelf: 'flex-start', fontSize: 10, fontWeight: 600, color: 'var(--accent-info-dark)', padding: '2px 8px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)', borderRadius: 4 }}>No scheduled follow-ups in this period</div>
                      <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .65, lineHeight: 1.5 }}>Follow-up actions are logged when agents schedule callbacks or promise re-contacts. Currently 0 detected.</div>
                      <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .5, paddingTop: 6, borderTop: '1px solid var(--nebula)' }}>Review: 18,462 tickets analysed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>{/* /rpa-pane-overview */}

          {/* Placeholder panes */}
          <div className="a-tab-content" id="rpa-pane-orders" style={{ display: activeTab === 'orders' ? undefined : 'none' }}>
            <div className="a-placeholder">
              <div className="a-placeholder-icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--dark-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/><path d="M12 12v4m-2-2h4"/></svg></div>
              <div className="a-placeholder-title">Orders &amp; Order Management</div>
              <div className="a-placeholder-sub">Order resolution analytics coming soon.</div>
            </div>
          </div>
          <div className="a-tab-content" id="rpa-pane-delivery" style={{ display: activeTab === 'delivery' ? undefined : 'none' }}>
            <div className="a-placeholder">
              <div className="a-placeholder-icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--dark-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v4h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg></div>
              <div className="a-placeholder-title">Delivery, Tracking &amp; Fulfilment</div>
              <div className="a-placeholder-sub">Delivery path analytics coming soon.</div>
            </div>
          </div>
          <div className="a-tab-content" id="rpa-pane-returns" style={{ display: activeTab === 'returns' ? undefined : 'none' }}>
            <div className="a-placeholder">
              <div className="a-placeholder-icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--dark-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 14l-4-4 4-4"/><path d="M5 10h11a4 4 0 010 8h-1"/></svg></div>
              <div className="a-placeholder-title">Returns, Replacements &amp; Refunds</div>
              <div className="a-placeholder-sub">Returns analytics coming soon.</div>
            </div>
          </div>
          <div className="a-tab-content" id="rpa-pane-payments" style={{ display: activeTab === 'payments' ? undefined : 'none' }}>
            <div className="a-placeholder">
              <div className="a-placeholder-icon"><svg viewBox="0 0 24 24" fill="none" stroke="var(--dark-teal)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><path d="M1 10h22"/></svg></div>
              <div className="a-placeholder-title">Payments, Billing &amp; Wallet Issues</div>
              <div className="a-placeholder-sub">Payments analytics coming soon.</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
