import { useState } from 'react'

const CalendarSvg = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <rect x="1" y="2" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1 5h11" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M4 1v2M9 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
)

const INTENT_META = {
  cs: {
    label: 'Customer Support & General Assistance',
    count: '6,946',
    color: '#4DB6AC',
    trendPos: 'M0,60 C50,55 100,40 150,35 C200,30 250,45 300,42 C350,38 400,25 450,20 C500,15 550,28 600,22 C650,16 700,18 700,18',
    trendNeu: 'M0,70 C50,68 100,65 150,62 C200,59 250,63 300,60 C350,57 400,52 450,55 C500,58 550,54 600,50 C650,46 700,48 700,48',
  },
  orders: {
    label: 'Orders & Order Management',
    count: '5,063',
    color: '#8B5CF6',
    trendPos: 'M0,50 C50,52 100,58 150,55 C200,50 250,48 300,52 C350,55 400,45 450,42 C500,38 550,35 600,30 C650,28 700,25 700,25',
    trendNeu: 'M0,65 C50,67 100,64 150,60 C200,58 250,62 300,65 C350,62 400,58 450,60 C500,62 550,58 600,55 C650,52 700,50 700,50',
  },
  delivery: {
    label: 'Delivery, Tracking & Fulfilment',
    count: '2,392',
    color: '#3B82F6',
    trendPos: 'M0,35 C50,38 100,42 150,50 C200,55 250,52 300,58 C350,62 400,65 450,60 C500,55 550,58 600,62 C650,65 700,68 700,68',
    trendNeu: 'M0,55 C50,58 100,62 150,65 C200,68 250,65 300,68 C350,70 400,72 450,68 C500,65 550,68 600,70 C650,72 700,74 700,74',
  },
  prescription: {
    label: 'Prescription & Product Queries',
    count: '2,259',
    color: '#F59E0B',
    trendPos: 'M0,45 C50,42 100,38 150,35 C200,32 250,30 300,28 C350,26 400,24 450,22 C500,20 550,18 600,16 C650,14 700,15 700,15',
    trendNeu: 'M0,65 C50,63 100,60 150,58 C200,55 250,53 300,52 C350,50 400,48 450,47 C500,46 550,45 600,44 C650,43 700,43 700,43',
  },
  others: {
    label: 'Others',
    count: '942',
    color: '#10B981',
    trendPos: 'M0,55 C50,50 100,55 150,48 C200,55 250,52 300,58 C350,50 400,45 450,50 C500,55 550,45 600,48 C650,52 700,45 700,45',
    trendNeu: 'M0,68 C50,65 100,68 150,62 C200,68 250,65 300,70 C350,65 400,62 450,65 C500,68 550,62 600,65 C650,68 700,62 700,62',
  },
}

const TABS = [
  { id: 'overview',    label: 'Overview' },
  { id: 'sentiment',  label: 'Sentiment Analytics' },
  { id: 'performance',label: 'Performance Hub' },
  { id: 'risk',       label: 'Risk Management' },
  { id: 'product',    label: 'Product & Compensation' },
]

export default function CIView() {
  const [activeTab, setActiveTab] = useState('overview')
  const [activeIntent, setActiveIntent] = useState('cs')

  return (
    <div className="view active" id="view-analytics" style={{ flexDirection: 'column' }}>
      <div style={{ flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden', display: 'flex' }}>

        {/* Topbar */}
        <div className="analytics-topbar">
          <div>
            <div className="analytics-page-title">Conversational Intelligence Dashboard</div>
            <div className="analytics-page-sub">Monitor and analyze ticket patterns, resolution times, customer sentiments, and service quality metrics for resolved tickets.</div>
          </div>
          <div className="analytics-date-controls">
            <div className="analytics-date-group">
              <span className="analytics-date-label">Start Date:</span>
              <div className="analytics-date-field">
                <CalendarSvg />
                Mar 18th, 2026
              </div>
            </div>
            <div className="analytics-date-group">
              <span className="analytics-date-label">End Date:</span>
              <div className="analytics-date-field">
                <CalendarSvg />
                Mar 25th, 2026
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="analytics-tabs-wrap">
          <div className="a-tabs-pill">
            {TABS.map(t => (
              <button key={t.id} className={`a-tab${activeTab === t.id ? ' active' : ''}`} onClick={() => setActiveTab(t.id)}>{t.label}</button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="analytics-content">
          {activeTab === 'overview' && (
            <div className="a-tab-content active" id="ci-pane-overview">
              {/* KPI Row */}
              <div className="a-kpi-row">
                <div className="a-kpi-card">
                  <div className="a-kpi-label">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 7h12M7 1l5 6-5 6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity=".5"/></svg>
                    Total Tickets
                  </div>
                  <div className="a-kpi-value">18,462</div>
                </div>
                <div className="a-kpi-card">
                  <div className="a-kpi-label">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" opacity=".5"/><path d="M7 4v3l2 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    Avg Resolution Time
                  </div>
                  <div className="a-kpi-value">1h 5m</div>
                </div>
                <div className="a-kpi-card">
                  <div className="a-kpi-label">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2v5M7 9.5v1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".5"/><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.3" opacity=".5"/></svg>
                    Risk Conversations
                  </div>
                  <div className="a-kpi-value">1,620</div>
                </div>
                <div className="a-kpi-card">
                  <div className="a-kpi-label">Avg Sentiment</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                    <span style={{ fontSize: 22 }}>🙂</span>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 'var(--weight-bold)', color: 'var(--dark-teal)' }}>Neutral</span>
                  </div>
                </div>
              </div>

              {/* Intent Analysis + Emerging Issues */}
              <div className="a-2col-wide">
                {/* Left: Intent Analysis + Weekly Sentiment Trend */}
                <div className="a-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="a-card-head">
                    <div className="a-card-head-left">
                      <div className="a-card-title">Intent Analysis</div>
                      <div className="a-card-sub">Top intents by ticket volume</div>
                    </div>
                    <button className="intent-cat-btn" id="intent-cat-btn">{INTENT_META[activeIntent].label}</button>
                  </div>
                  <div className="a-card-body">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      {/* Donut */}
                      <div style={{ flexShrink: 0 }}>
                        <svg width="110" height="110" viewBox="0 0 130 130">
                          <circle cx="65" cy="65" r="52" fill="none" stroke="var(--aqua-haze)" strokeWidth="18"/>
                          {[
                            { id: 'cs',           dasharray: '131 196', dashoffset: '0'    },
                            { id: 'orders',       dasharray: '100 227', dashoffset: '-131' },
                            { id: 'delivery',     dasharray: '46 281',  dashoffset: '-231' },
                            { id: 'prescription', dasharray: '43 284',  dashoffset: '-277' },
                            { id: 'others',       dasharray: '18 309',  dashoffset: '-320' },
                          ].map(seg => {
                            const isActive = activeIntent === seg.id
                            return (
                              <circle key={seg.id} cx="65" cy="65" r="52" fill="none"
                                stroke={INTENT_META[seg.id].color}
                                strokeWidth={isActive ? 22 : 18}
                                strokeDasharray={seg.dasharray}
                                strokeDashoffset={seg.dashoffset}
                                strokeLinecap="butt"
                                transform="rotate(-90 65 65)"
                                style={{ opacity: isActive ? 1 : 0.35, cursor: isActive ? 'default' : 'pointer', transition: 'opacity 0.2s, stroke-width 0.2s' }}
                                onClick={() => setActiveIntent(seg.id)}
                              />
                            )
                          })}
                          <text x="65" y="61" textAnchor="middle" fontFamily="var(--font-display)" fontSize="16" fontWeight="700" fill={INTENT_META[activeIntent].color}>{INTENT_META[activeIntent].count}</text>
                          <text x="65" y="75" textAnchor="middle" fontFamily="var(--font-body)" fontSize="9" fill="var(--cutty-sark)" opacity=".7">Tickets</text>
                        </svg>
                      </div>
                      {/* Legend */}
                      <div className="intent-list" style={{ flex: 1 }}>
                        {[
                          { id: 'cs',           name: 'Customer Support & General',       count: '6,946', avg: '43m avg'  },
                          { id: 'orders',       name: 'Orders & Order Management',         count: '5,063', avg: '1.2h avg' },
                          { id: 'delivery',     name: 'Delivery, Tracking & Fulfilment',   count: '2,392', avg: '1.2h avg' },
                          { id: 'prescription', name: 'Prescription & Product Queries',    count: '2,259', avg: '47m avg'  },
                          { id: 'others',       name: 'Others',                            count: '942',   avg: '49m avg'  },
                        ].map(row => (
                          <div key={row.id} className={`intent-row${activeIntent === row.id ? ' active' : ''}`} onClick={() => setActiveIntent(row.id)}>
                            <span className="intent-dot" style={{ background: INTENT_META[row.id].color }}></span>
                            <span className="intent-name">{row.name}</span>
                            <span className="intent-count">{row.count}</span>
                            <span className="intent-avg">{row.avg}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Weekly Sentiment Trend */}
                    <div style={{ borderTop: '1px solid var(--nebula)', marginTop: 20, paddingTop: 16 }}>
                      <div className="a-card-title" style={{ fontSize: 'var(--font-sm)', marginBottom: 10 }}>Weekly Sentiment Trend</div>
                      <svg width="100%" height="104" viewBox="0 0 700 104" preserveAspectRatio="none">
                        <defs><linearGradient id="ci-grad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={INTENT_META[activeIntent].color} stopOpacity=".25"/><stop offset="100%" stopColor={INTENT_META[activeIntent].color} stopOpacity="0"/></linearGradient></defs>
                        <path d={`${INTENT_META[activeIntent].trendPos} L700,90 L0,90 Z`} fill="url(#ci-grad)"/>
                        <path d={INTENT_META[activeIntent].trendPos} fill="none" stroke={INTENT_META[activeIntent].color} strokeWidth="2"/>
                        <path d={INTENT_META[activeIntent].trendNeu} fill="none" stroke={INTENT_META[activeIntent].color} strokeWidth="1.5" strokeDasharray="4 3" opacity=".4"/>
                        <text x="50" y="100" fontSize="9" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Mon</text>
                        <text x="150" y="100" fontSize="9" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Tue</text>
                        <text x="250" y="100" fontSize="9" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Wed</text>
                        <text x="350" y="100" fontSize="9" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Thu</text>
                        <text x="450" y="100" fontSize="9" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Fri</text>
                        <text x="550" y="100" fontSize="9" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Sat</text>
                        <text x="650" y="100" fontSize="9" textAnchor="middle" fill="var(--cutty-sark)" opacity=".6">Sun</text>
                      </svg>
                      <div style={{ display: 'flex', gap: 16, marginTop: 6 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}><span style={{ width: 12, height: 3, background: INTENT_META[activeIntent].color, borderRadius: 2, display: 'inline-block' }}></span>Positive</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--cutty-sark)', opacity: .5 }}><span style={{ width: 12, height: 3, background: INTENT_META[activeIntent].color, borderRadius: 2, display: 'inline-block', opacity: .4 }}></span>Neutral</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Emerging Issues */}
                <div className="a-card" style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="a-card-head">
                    <div className="a-card-head-left"><div className="a-card-title">Emerging Issues</div><div className="a-card-sub">Intents with sudden spikes</div></div>
                    <span className="a-card-badge alert">Alert</span>
                  </div>
                  <div className="a-card-body" style={{ gap: 10, flex: 1 }}>
                    <div className="emerging-item">
                      <div className="emerging-item-l">
                        <div className="emerging-icon">⚠️</div>
                        <div className="emerging-text">
                          <div className="emerging-name">Rider Not Assigned</div>
                          <div className="emerging-meta">1,770 tickets</div>
                        </div>
                      </div>
                      <div className="emerging-sentiment pos">+0.04 sentiment</div>
                    </div>
                    <div className="emerging-item">
                      <div className="emerging-item-l">
                        <div className="emerging-icon">⚠️</div>
                        <div className="emerging-text">
                          <div className="emerging-name">Delivery Delay</div>
                          <div className="emerging-meta">1,756 tickets</div>
                        </div>
                      </div>
                      <div className="emerging-sentiment neg">-0.31 sentiment</div>
                    </div>
                    <div className="emerging-item">
                      <div className="emerging-item-l">
                        <div className="emerging-icon">⚠️</div>
                        <div className="emerging-text">
                          <div className="emerging-name">Product Out of Stock</div>
                          <div className="emerging-meta">1,285 tickets</div>
                        </div>
                      </div>
                      <div className="emerging-sentiment neg">-0.33 sentiment</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Categories */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div className="a-section-hd" style={{ border: 'none', padding: 0, flex: 1 }}>
                  <div className="a-section-hd-left"><span className="a-section-title">Top Categories</span></div>
                  <span style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}>Most common requests, queries &amp; complaints</span>
                </div>
                <button className="a-card-btn">Top 5 Each</button>
              </div>
              <div className="a-3col">
                {/* Requests */}
                <div className="a-cat-card">
                  <div className="a-cat-head">
                    <div className="a-cat-icon" style={{ background: 'rgba(139,92,246,0.10)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2h10v10H2z" stroke="#8B5CF6" strokeWidth="1.3" rx="2"/><path d="M5 7h4M7 5v4" stroke="#8B5CF6" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    </div>
                    <div><div className="a-cat-title">Requests</div><div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>Customer service requests</div></div>
                  </div>
                  <div className="a-cat-vol">8,280 <span style={{ fontSize: 13, fontWeight: 400, opacity: .6 }}>Total Volume</span></div>
                  <div className="a-cat-row"><span className="a-cat-name">Place Order</span><span className="a-cat-pct">18.3%</span><span className="a-cat-num">1,515</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '18.3%', background: '#8B5CF6', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Assign Rider</span><span className="a-cat-pct">9.7%</span><span className="a-cat-num">805</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '9.7%', background: '#8B5CF6', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Order Placement</span><span className="a-cat-pct">9.7%</span><span className="a-cat-num">800</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '9.7%', background: '#8B5CF6', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Order Status</span><span className="a-cat-pct">6.7%</span><span className="a-cat-num">558</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '6.7%', background: '#8B5CF6', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Product Inquiry</span><span className="a-cat-pct">6.6%</span><span className="a-cat-num">547</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '6.6%', background: '#8B5CF6', height: '100%', borderRadius: 2 }}></div></div>
                </div>
                {/* Queries */}
                <div className="a-cat-card">
                  <div className="a-cat-head">
                    <div className="a-cat-icon" style={{ background: 'rgba(59,130,246,0.10)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5" stroke="#3B82F6" strokeWidth="1.3"/><path d="M7 5v2l1.5 1.5" stroke="#3B82F6" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    </div>
                    <div><div className="a-cat-title">Queries</div><div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>Information requests</div></div>
                  </div>
                  <div className="a-cat-vol">8,831 <span style={{ fontSize: 13, fontWeight: 400, opacity: .6 }}>Total Volume</span></div>
                  <div className="a-cat-row"><span className="a-cat-name">Order Status</span><span className="a-cat-pct">6.0%</span><span className="a-cat-num">530</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '18%', background: '#3B82F6', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Product Inquiry</span><span className="a-cat-pct">2.4%</span><span className="a-cat-num">208</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '7%', background: '#3B82F6', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Product Availability</span><span className="a-cat-pct">1.8%</span><span className="a-cat-num">156</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '5%', background: '#3B82F6', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Delivery Inquiry</span><span className="a-cat-pct">1.5%</span><span className="a-cat-num">134</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '4%', background: '#3B82F6', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Product Availability Query</span><span className="a-cat-pct">1.5%</span><span className="a-cat-num">132</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '4%', background: '#3B82F6', height: '100%', borderRadius: 2 }}></div></div>
                </div>
                {/* Complaints */}
                <div className="a-cat-card">
                  <div className="a-cat-head">
                    <div className="a-cat-icon" style={{ background: 'rgba(220,38,38,0.08)' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 2l5 9H2z" stroke="#DC2626" strokeWidth="1.3" strokeLinejoin="round"/><path d="M7 6v2M7 9.5v.5" stroke="#DC2626" strokeWidth="1.3" strokeLinecap="round"/></svg>
                    </div>
                    <div><div className="a-cat-title">Complaints</div><div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6 }}>Customer complaints</div></div>
                  </div>
                  <div className="a-cat-vol">1,345 <span style={{ fontSize: 13, fontWeight: 400, opacity: .6 }}>Total Volume</span></div>
                  <div className="a-cat-row"><span className="a-cat-name">Order Status</span><span className="a-cat-pct">30.9%</span><span className="a-cat-num">416</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '30.9%', background: '#DC2626', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Delivery Issue</span><span className="a-cat-pct">23.5%</span><span className="a-cat-num">316</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '23.5%', background: '#DC2626', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Order Cancellation</span><span className="a-cat-pct">7.9%</span><span className="a-cat-num">106</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '7.9%', background: '#DC2626', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Order Issue</span><span className="a-cat-pct">6.9%</span><span className="a-cat-num">93</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '6.9%', background: '#DC2626', height: '100%', borderRadius: 2 }}></div></div>
                  <div className="a-cat-row"><span className="a-cat-name">Technical Issue</span><span className="a-cat-pct">4.8%</span><span className="a-cat-num">64</span></div>
                  <div className="a-cat-bar"><div className="a-cat-bar-fill" style={{ width: '4.8%', background: '#DC2626', height: '100%', borderRadius: 2 }}></div></div>
                </div>
              </div>

              {/* Folder Breakdown */}
              <div className="a-card">
                <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Folder Breakdown</div><div className="a-card-sub">Tickets by folder structure</div></div></div>
                <div className="a-card-body">
                  <div className="a-folder-group">
                    <div className="a-folder-group-hd">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M1 3h5l1.5 2H13v7H1z" stroke="var(--teal)" strokeWidth="1.2" strokeLinejoin="round"/></svg>
                      Command Centre <span className="a-folder-badge">18,245 tickets</span>
                      <button className="a-card-btn" style={{ marginLeft: 'auto' }}>Show All (243)</button>
                    </div>
                    <div className="a-folder-grid">
                      <div className="a-folder-card">
                        <div className="a-folder-card-path">Command Centre › Retention › Service</div>
                        <div className="a-folder-card-name">Not Connected</div>
                        <div className="a-folder-stats"><div><div className="a-folder-stat-val">3,626</div><div className="a-folder-stat-lbl">Tickets</div></div><div><div className="a-folder-stat-val">17m</div><div className="a-folder-stat-lbl">Avg Resolution</div></div></div>
                        <div className="a-folder-sentiment-bar"><div className="a-folder-sentiment-fill" style={{ width: '50%' }}></div></div>
                        <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 2 }}>Sentiment 50%</div>
                      </div>
                      <div className="a-folder-card">
                        <div className="a-folder-card-path">Command Centre › C3 Whatsapp suppo...</div>
                        <div className="a-folder-card-name">Delivery Related_Rider As...</div>
                        <div className="a-folder-stats"><div><div className="a-folder-stat-val">2,060</div><div className="a-folder-stat-lbl">Tickets</div></div><div><div className="a-folder-stat-val">10m</div><div className="a-folder-stat-lbl">Avg Resolution</div></div></div>
                        <div className="a-folder-sentiment-bar"><div className="a-folder-sentiment-fill" style={{ width: '59%' }}></div></div>
                        <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 2 }}>Sentiment 59%</div>
                      </div>
                      <div className="a-folder-card">
                        <div className="a-folder-card-path">Command Centre › C3 Whatsapp suppo...</div>
                        <div className="a-folder-card-name">Order Placed</div>
                        <div className="a-folder-stats"><div><div className="a-folder-stat-val">1,139</div><div className="a-folder-stat-lbl">Tickets</div></div><div><div className="a-folder-stat-val">47m</div><div className="a-folder-stat-lbl">Avg Resolution</div></div></div>
                        <div className="a-folder-sentiment-bar"><div className="a-folder-sentiment-fill" style={{ width: '80%' }}></div></div>
                        <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 2 }}>Sentiment 80%</div>
                      </div>
                      <div className="a-folder-card">
                        <div className="a-folder-card-path">Command Centre › C3 Whatsapp suppo...</div>
                        <div className="a-folder-card-name">No Response from Customer</div>
                        <div className="a-folder-stats"><div><div className="a-folder-stat-val">676</div><div className="a-folder-stat-lbl">Tickets</div></div><div><div className="a-folder-stat-val">50m</div><div className="a-folder-stat-lbl">Avg Resolution</div></div></div>
                        <div className="a-folder-sentiment-bar"><div className="a-folder-sentiment-fill" style={{ width: '48%' }}></div></div>
                        <div style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: .6, marginTop: 2 }}>Sentiment 48%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Channel Performance */}
              <div className="a-card">
                <div className="a-card-head">
                  <div className="a-card-head-left"><div className="a-card-title">Channel Performance</div><div className="a-card-sub">Voice vs Non-Voice breakdown</div></div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <svg width="28" height="28" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="32" fill="none" stroke="var(--aqua-haze)" strokeWidth="14"/>
                      <circle cx="40" cy="40" r="32" fill="none" stroke="#60A5FA" strokeWidth="14" strokeDasharray="196 5" strokeDashoffset="0" transform="rotate(-90 40 40)"/>
                      <circle cx="40" cy="40" r="32" fill="none" stroke="#f87171" strokeWidth="14" strokeDasharray="5 196" strokeDashoffset="-196" transform="rotate(-90 40 40)"/>
                    </svg>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ width: 4, height: 4, borderRadius: 2, background: 'var(--blue-400)', flexShrink: 0 }}></span>
                          <span style={{ fontSize: 12, fontWeight: 'var(--weight-bold)', color: 'var(--blue-400)' }}>97.59%</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ width: 4, height: 4, borderRadius: 2, background: '#f87171', flexShrink: 0 }}></span>
                          <span style={{ fontSize: 12, fontWeight: 'var(--weight-bold)', color: '#f87171' }}>2.41%</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                        <span style={{ fontSize: 10, color: '#365655', whiteSpace: 'nowrap' }}>Not Escalated</span>
                        <span style={{ fontSize: 10, color: '#365655', whiteSpace: 'nowrap' }}>Escalated</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="a-card-body">
                  <div className="a-channel-grid">
                    <div className="a-channel-card"><div className="a-channel-l"><div className="a-channel-name">Whatsapp</div><div className="a-channel-vol">9,571</div><div className="a-channel-conversations">conversations</div></div><div className="a-channel-stats"><div className="a-channel-stat pos"><div className="lbl">Not Escalated</div><div className="val">96.7%</div></div><div className="a-channel-stat neg"><div className="lbl">Escalated</div><div className="val">3.3%</div></div></div></div>
                    <div className="a-channel-card"><div className="a-channel-l"><div className="a-channel-name">Call</div><div className="a-channel-vol">8,291</div><div className="a-channel-conversations">conversations</div></div><div className="a-channel-stats"><div className="a-channel-stat pos"><div className="lbl">Not Escalated</div><div className="val">99%</div></div><div className="a-channel-stat neg"><div className="lbl">Escalated</div><div className="val">1%</div></div></div></div>
                    <div className="a-channel-card"><div className="a-channel-l"><div className="a-channel-name">Email</div><div className="a-channel-vol">454</div><div className="a-channel-conversations">conversations</div></div><div className="a-channel-stats"><div className="a-channel-stat pos"><div className="lbl">Not Escalated</div><div className="val">90.7%</div></div><div className="a-channel-stat neg"><div className="lbl">Escalated</div><div className="val">9.3%</div></div></div></div>
                    <div className="a-channel-card"><div className="a-channel-l"><div className="a-channel-name">General</div><div className="a-channel-vol">138</div><div className="a-channel-conversations">conversations</div></div><div className="a-channel-stats"><div className="a-channel-stat pos"><div className="lbl">Not Escalated</div><div className="val">100%</div></div><div className="a-channel-stat neg"><div className="lbl">Escalated</div><div className="val">0%</div></div></div></div>
                    <div className="a-channel-card"><div className="a-channel-l"><div className="a-channel-name">Custom</div><div className="a-channel-vol">7</div><div className="a-channel-conversations">conversations</div></div><div className="a-channel-stats"><div className="a-channel-stat pos"><div className="lbl">Not Escalated</div><div className="val">100%</div></div><div className="a-channel-stat neg"><div className="lbl">Escalated</div><div className="val">0%</div></div></div></div>
                    <div className="a-channel-card"><div className="a-channel-l"><div className="a-channel-name">Facebook</div><div className="a-channel-vol">1</div><div className="a-channel-conversations">conversations</div></div><div className="a-channel-stats"><div className="a-channel-stat pos"><div className="lbl">Not Escalated</div><div className="val">100%</div></div><div className="a-channel-stat neg"><div className="lbl">Escalated</div><div className="val">0%</div></div></div></div>
                  </div>
                </div>
              </div>

              {/* Drop-off + Ticket Type */}
              <div className="a-2col">
                <div className="a-card">
                  <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Customer Drop-off Stage</div><div className="a-card-sub">Where customers abandon conversations</div></div><button className="a-card-btn">Drop-off</button></div>
                  <div className="a-card-body">
                    <div className="a-bar-row"><span className="a-bar-name">Post-Resolution</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '39%', background: '#8B5CF6' }}></div></div><span className="a-bar-val">7,137</span><span className="a-bar-pct">39%</span></div>
                    <div className="a-bar-row"><span className="a-bar-name">Probing</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '11%' }}></div></div><span className="a-bar-val">1,974</span><span className="a-bar-pct">11%</span></div>
                    <div className="a-bar-row"><span className="a-bar-name">Execution</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '3%', background: 'var(--accent-warning)' }}></div></div><span className="a-bar-val">61</span><span className="a-bar-pct">3%</span></div>
                    <div className="a-bar-row"><span className="a-bar-name">Hold</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '1%', background: '#F97316' }}></div></div><span className="a-bar-val">—</span><span className="a-bar-pct">1%</span></div>
                    <div className="a-bar-row"><span className="a-bar-name">Escalation</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '1%', background: '#3B82F6' }}></div></div><span className="a-bar-val">—</span><span className="a-bar-pct">1%</span></div>
                    <div className="a-bar-row"><span className="a-bar-name">Customer Dropoff</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '0.5%', background: '#DC2626' }}></div></div><span className="a-bar-val">—</span><span className="a-bar-pct">0%</span></div>
                    <div className="a-bar-row"><span className="a-bar-name">Request Unaddressed</span><div className="a-bar-track"><div className="a-bar-fill" style={{ width: '0.5%', background: 'var(--cutty-sark)' }}></div></div><span className="a-bar-val">—</span><span className="a-bar-pct">0%</span></div>
                    <div className="a-bar-row"><span className="a-bar-name">Escalation to another team</span><div className="a-bar-track"></div><span className="a-bar-val">—</span><span className="a-bar-pct">0%</span></div>
                    <div className="a-bar-row"><span className="a-bar-name">probing</span><div className="a-bar-track"></div><span className="a-bar-val">—</span><span className="a-bar-pct">0%</span></div>
                  </div>
                </div>
                <div className="a-card">
                  <div className="a-card-head"><div className="a-card-head-left"><div className="a-card-title">Ticket Type Distribution</div><div className="a-card-sub">Breakdown by ticket category</div></div></div>
                  <div className="a-card-body">
                    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: 0, padding: '0 40px' }}>
                      <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', borderBottom: '1px solid var(--aqua-haze)' }}>
                        <div style={{ width: 40, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, justifyContent: 'flex-end', height: '100%' }}><span style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue-500)' }}>98%</span><div style={{ width: 40, height: 160, background: 'var(--blue-500)', borderRadius: '6px 6px 0 0' }}></div></div>
                        <div style={{ width: 40, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, justifyContent: 'flex-end', height: '100%' }}><span style={{ fontSize: 10, fontWeight: 700, color: '#22C55E' }}>14%</span><div style={{ width: 40, height: 23, background: '#22C55E', borderRadius: '6px 6px 0 0' }}></div></div>
                        <div style={{ width: 40, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, justifyContent: 'flex-end', height: '100%' }}><span style={{ fontSize: 10, fontWeight: 700, color: '#9C74F7' }}>51%</span><div style={{ width: 40, height: 82, background: '#9C74F7', borderRadius: '6px 6px 0 0' }}></div></div>
                        <div style={{ width: 40, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, justifyContent: 'flex-end', height: '100%' }}><span style={{ fontSize: 10, fontWeight: 700, color: '#FCA5A5' }}>34%</span><div style={{ width: 40, height: 55, background: '#FCA5A5', borderRadius: '6px 6px 0 0' }}></div></div>
                        <div style={{ width: 40, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, justifyContent: 'flex-end', height: '100%' }}><span style={{ fontSize: 10, fontWeight: 700, color: 'var(--accent-warning)' }}>63%</span><div style={{ width: 40, height: 101, background: 'var(--accent-warning)', borderRadius: '6px 6px 0 0' }}></div></div>
                        <div style={{ width: 40, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, justifyContent: 'flex-end', height: '100%' }}><span style={{ fontSize: 10, fontWeight: 700, color: 'var(--blue-300)' }}>23%</span><div style={{ width: 40, height: 37, background: 'var(--blue-300)', borderRadius: '6px 6px 0 0' }}></div></div>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 7 }}>
                        <div style={{ width: 40, flexShrink: 0, fontSize: 10, color: 'var(--cutty-sark)', textAlign: 'center', lineHeight: 1.5 }}>Technical<br/>Support</div>
                        <div style={{ width: 40, flexShrink: 0, fontSize: 10, color: 'var(--cutty-sark)', textAlign: 'center', lineHeight: 1.5 }}>General<br/>Query</div>
                        <div style={{ width: 40, flexShrink: 0, fontSize: 10, color: 'var(--cutty-sark)', textAlign: 'center', lineHeight: 1.5 }}>Order<br/>Inquiry</div>
                        <div style={{ width: 40, flexShrink: 0, fontSize: 10, color: 'var(--cutty-sark)', textAlign: 'center', lineHeight: 1.5 }}>Complaint</div>
                        <div style={{ width: 40, flexShrink: 0, fontSize: 10, color: 'var(--cutty-sark)', textAlign: 'center', lineHeight: 1.5 }}>Billing &amp;<br/>Payment</div>
                        <div style={{ width: 40, flexShrink: 0, fontSize: 10, color: 'var(--cutty-sark)', textAlign: 'center', lineHeight: 1.5 }}>Account<br/>Mngt</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sentiment' && (
            <div className="a-tab-content active"><div className="a-placeholder"><div className="a-placeholder-icon">📊</div><div className="a-placeholder-title">Sentiment Analytics</div><div className="a-placeholder-sub">Detailed sentiment scoring and trend analysis coming soon.</div></div></div>
          )}
          {activeTab === 'performance' && (
            <div className="a-tab-content active"><div className="a-placeholder"><div className="a-placeholder-icon">⚡</div><div className="a-placeholder-title">Performance Hub</div><div className="a-placeholder-sub">Agent and queue performance metrics coming soon.</div></div></div>
          )}
          {activeTab === 'risk' && (
            <div className="a-tab-content active"><div className="a-placeholder"><div className="a-placeholder-icon">🛡️</div><div className="a-placeholder-title">Risk Management</div><div className="a-placeholder-sub">Risk flagging and escalation tracking coming soon.</div></div></div>
          )}
          {activeTab === 'product' && (
            <div className="a-tab-content active"><div className="a-placeholder"><div className="a-placeholder-icon">📦</div><div className="a-placeholder-title">Product &amp; Compensation</div><div className="a-placeholder-sub">Product issue and compensation tracking coming soon.</div></div></div>
          )}
        </div>
      </div>
    </div>
  )
}
