import { useState } from 'react'

const TABS = [
  { id: 'a', label: 'Behavior Patterns' },
  { id: 'b', label: 'Sentiment' },
  { id: 'c', label: 'Loyalty & Churn' },
  { id: 'd', label: 'Intent & Journey' },
]

export default function CMGView() {
  const [activeTab, setActiveTab] = useState('a')
  const [expandedPanes, setExpandedPanes] = useState(new Set())
  const [expandedCard, setExpandedCard] = useState(null)

  function toggleMore(id) {
    setExpandedPanes(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }
  function toggleCard(id) {
    setExpandedCard(prev => prev === id ? null : id)
  }

  return (
    <div className="view active" id="view-analytics" style={{ flexDirection: 'column' }}>
      <div style={{ flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden', display: 'flex' }}>

        {/* Topbar */}
        <div className="analytics-topbar">
          <div>
            <div className="analytics-page-title">Customer Memory Graph</div>
            <div className="analytics-page-sub">Deep customer history, relationship patterns, and memory-based insights.</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="analytics-date-range">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="1" y="2" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 5h12" stroke="currentColor" strokeWidth="1.2"/><path d="M4 1v2M10 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
              Last 30 days
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="analytics-tabs-wrap">
          <div className="a-tabs-pill">
            {TABS.map(t => (
              <button key={t.id}
                className={`a-tab${activeTab === t.id ? ' active' : ''}`}
                id={`cmg-hcard-${t.id}`}
                role="tab"
                aria-selected={activeTab === t.id}
                onClick={() => { setActiveTab(t.id); setExpandedCard(null); }}>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 48px', scrollbarGutter: 'stable' }}>

          {/* ══ PANE A: Behavior Patterns ══ */}
          <div className={`cmg-pane${activeTab === 'a' ? ' active' : ''}`} id="cmg-pane-a">
            <div className="cmg-pane-hd">
              <span className="cmg-pane-title">Customer Behavior Patterns</span>
              {!expandedPanes.has('a') && (
                <button className="cmg-show-more-btn" id="cmg-more-btn-a" onClick={() => toggleMore('a')}>Show 9 more ›</button>
              )}
            </div>

            <div className="cmg-grid">

              {/* Card A1: Repeat Issue Rate */}
              <div className={`cmg-card${expandedCard === 'a1' ? ' expanded' : ''}`} id="cmg-card-a1">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">Repeat Issue Rate</span>
                  <span className="cmg-card-badge caution">Caution</span>
                </div>
                <div className="cmg-card-desc">% of customers who raised the same intent more than once</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">23.4%<span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 6 }}>this period</span></div>
                  <div className="cmg-stat-compare">
                    <span className="cmg-stat-arrow warn">&#9650;</span> vs 19.8% last period &nbsp;<span style={{ color: '#e07a2a', fontSize: 11, fontWeight: 600 }}>+3.6pp</span>
                  </div>
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Top repeating intents</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}><span>Refund request</span><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>38%</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}><span>Order status</span><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>27%</span></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}><span>Delivery delay</span><span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>19%</span></div>
                    </div>
                  </div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'a1' ? <button className="cmg-detail-btn" onClick={() => toggleCard('a1')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('a1')}>Details ›</button>}
                </div>
              </div>

              {/* Card A2: Issue Gravity Score */}
              <div className={`cmg-card${expandedCard === 'a2' ? ' expanded' : ''}`} id="cmg-card-a2">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">Issue Gravity Score</span>
                  <span className="cmg-card-badge caution">Caution</span>
                </div>
                <div className="cmg-card-desc">Severity of issues — combines type, order value, prior attempts, and sentiment</div>
                <div className="cmg-card-vis">
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Distribution by gravity band</div>
                  <div className="cmg-dist-bar">
                    <div className="cmg-dist-segment" style={{ width: '41%', background: '#27ae7a' }} title="Low 41%"></div>
                    <div className="cmg-dist-segment" style={{ width: '33%', background: '#e0b22a' }} title="Medium 33%"></div>
                    <div className="cmg-dist-segment" style={{ width: '19%', background: '#e07a2a' }} title="High 19%"></div>
                    <div className="cmg-dist-segment" style={{ width: '7%', background: '#e03a2a' }} title="Critical 7%"></div>
                  </div>
                  <div className="cmg-dist-labels">
                    <div className="cmg-dist-label"><span style={{ color: '#27ae7a' }}>&#9632;</span> Low 41%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#e0b22a' }}>&#9632;</span> Med 33%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#e07a2a' }}>&#9632;</span> High 19%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#e03a2a' }}>&#9632;</span> Crit 7%</div>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#e07a2a', fontWeight: 600 }}>19% High or Critical — monitor closely</div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'a2' ? <button className="cmg-detail-btn" onClick={() => toggleCard('a2')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('a2')}>Details ›</button>}
                </div>
              </div>

              {/* Card A3: Customer Loyalty Erosion Score */}
              <div className={`cmg-card${expandedCard === 'a3' ? ' expanded' : ''}`} id="cmg-card-a3">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">Customer Loyalty Erosion Score</span>
                  <span className="cmg-card-badge caution">Caution</span>
                </div>
                <div className="cmg-card-desc">Composite deterioration score: worsening sentiment, contact frequency, lower CSAT, higher-gravity intents</div>
                <div className="cmg-card-vis">
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Distribution by erosion band</div>
                  <div className="cmg-dist-bar">
                    <div className="cmg-dist-segment" style={{ width: '12%', background: '#e03a2a' }} title="High 12%"></div>
                    <div className="cmg-dist-segment" style={{ width: '28%', background: '#e0b22a' }} title="Medium 28%"></div>
                    <div className="cmg-dist-segment" style={{ width: '60%', background: '#27ae7a' }} title="Low 60%"></div>
                  </div>
                  <div className="cmg-dist-labels">
                    <div className="cmg-dist-label"><span style={{ color: '#e03a2a' }}>&#9632;</span> High 12%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#e0b22a' }}>&#9632;</span> Med 28%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#27ae7a' }}>&#9632;</span> Low 60%</div>
                  </div>
                  <div className="cmg-stat-compare" style={{ marginTop: 8 }}>
                    <span className="cmg-stat-arrow warn">&#9650;</span> 3.2% moved into High band this period
                  </div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'a3' ? <button className="cmg-detail-btn" onClick={() => toggleCard('a3')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('a3')}>Details ›</button>}
                </div>
              </div>

              {/* Full-width detail row for pane A */}
              <div className={`cmg-detail-row${['a1','a2','a3'].includes(expandedCard) ? ' open' : ''}`}>
                <div className="cmg-detail-row-inner">
                {expandedCard === 'a1' && (
                  <div className="cmg-detail-panel" id="cmg-detail-a1">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">Repeat Issue Rate — Drill-down</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('a1')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <div style={{ marginBottom: 10, fontSize: 12, color: 'var(--text-muted)' }}>Ranked by repeat frequency · Period-over-period trend</div>
                      <table className="cmg-detail-table">
                        <thead><tr><th>Intent</th><th>Repeat %</th><th>vs Last</th><th>Signal</th></tr></thead>
                        <tbody>
                          <tr><td>Refund request</td><td>38%</td><td style={{ color: '#e07a2a' }}>&#9650; +5pp</td><td><span className="cmg-card-badge red" style={{ fontSize: 10 }}>High</span></td></tr>
                          <tr><td>Order status</td><td>27%</td><td style={{ color: '#e07a2a' }}>&#9650; +2pp</td><td><span className="cmg-card-badge caution" style={{ fontSize: 10 }}>Med</span></td></tr>
                          <tr><td>Delivery delay</td><td>19%</td><td style={{ color: 'var(--text-muted)' }}>— flat</td><td><span className="cmg-card-badge caution" style={{ fontSize: 10 }}>Med</span></td></tr>
                          <tr><td>Product defect</td><td>11%</td><td style={{ color: '#27ae7a' }}>&#9660; -1pp</td><td><span className="cmg-card-badge green" style={{ fontSize: 10 }}>Low</span></td></tr>
                          <tr><td>Account issue</td><td>5%</td><td style={{ color: 'var(--text-muted)' }}>— flat</td><td><span className="cmg-card-badge green" style={{ fontSize: 10 }}>Low</span></td></tr>
                        </tbody>
                      </table>
                      <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)' }}>A high repeat issue rate at base level signals systemic product or service failure, not a support failure.</div>
                    </div>
                  </div>
                )}
                {expandedCard === 'a2' && (
                  <div className="cmg-detail-panel" id="cmg-detail-a2">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">Issue Gravity Score — Drill-down</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('a2')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <div style={{ marginBottom: 10, fontSize: 12, color: 'var(--text-muted)' }}>Breakdown by intent and channel</div>
                      <table className="cmg-detail-table">
                        <thead><tr><th>Intent</th><th>Low</th><th>Med</th><th>High</th><th>Critical</th></tr></thead>
                        <tbody>
                          <tr><td>Refund request</td><td>22%</td><td>31%</td><td>34%</td><td style={{ color: '#e03a2a', fontWeight: 600 }}>13%</td></tr>
                          <tr><td>Order status</td><td>61%</td><td>29%</td><td>8%</td><td>2%</td></tr>
                          <tr><td>Delivery delay</td><td>38%</td><td>40%</td><td>18%</td><td>4%</td></tr>
                          <tr><td>Product defect</td><td>29%</td><td>35%</td><td>27%</td><td style={{ color: '#e03a2a', fontWeight: 600 }}>9%</td></tr>
                        </tbody>
                      </table>
                      <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)' }}>A refund request for ₹200 and ₹20,000 are both "refund" intents — gravity captures the real impact difference.</div>
                    </div>
                  </div>
                )}
                {expandedCard === 'a3' && (
                  <div className="cmg-detail-panel" id="cmg-detail-a3">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">Customer Loyalty Erosion — Drill-down</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('a3')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <div style={{ marginBottom: 10, fontSize: 12, color: 'var(--text-muted)' }}>Band movement this period · by customer segment</div>
                      <table className="cmg-detail-table">
                        <thead><tr><th>Segment</th><th>High Erosion</th><th>Movement</th></tr></thead>
                        <tbody>
                          <tr><td>Premium</td><td style={{ color: '#e03a2a', fontWeight: 600 }}>18%</td><td style={{ color: '#e07a2a' }}>&#9650; +4.1pp</td></tr>
                          <tr><td>Standard</td><td>11%</td><td style={{ color: '#e07a2a' }}>&#9650; +2.8pp</td></tr>
                          <tr><td>New (&lt;90 days)</td><td>8%</td><td style={{ color: 'var(--text-muted)' }}>— flat</td></tr>
                        </tbody>
                      </table>
                      <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)' }}>Premium segment seeing highest erosion — warrants priority review of high-value customer experience.</div>
                    </div>
                  </div>
                )}
                </div>
              </div>

            </div>{/* /cmg-grid spotlight A */}

            {/* Secondary metrics grid A */}
            <div className="cmg-hidden-grid" id="cmg-hidden-a" style={{ display: expandedPanes.has('a') ? 'grid' : 'none' }}>

              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
                <button className="cmg-close-btn" onClick={() => toggleMore('a')} aria-label="Collapse">✕</button>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Issue Gravity Escalation Pattern</span><span className="cmg-card-badge red">Watch</span></div>
                <div className="cmg-card-desc">% of customers whose issues are getting more severe over time</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">8.3%</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>of base showing escalation trajectory</div>
                  <div style={{ fontSize: 12, marginTop: 6 }}>Avg <strong>3.4 tickets</strong> before gravity shift detected</div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Customer Contact Velocity</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">Rate at which customers are accelerating their contact frequency</div>
                <div className="cmg-card-vis">
                  <div className="cmg-dist-bar" style={{ height: 10 }}>
                    <div className="cmg-dist-segment" style={{ width: '9%', background: '#e03a2a' }} title="High 9%"></div>
                    <div className="cmg-dist-segment" style={{ width: '22%', background: '#e0b22a' }} title="Med 22%"></div>
                    <div className="cmg-dist-segment" style={{ width: '69%', background: '#27ae7a' }} title="Low 69%"></div>
                  </div>
                  <div className="cmg-dist-labels">
                    <div className="cmg-dist-label"><span style={{ color: '#e03a2a' }}>&#9632;</span> High 9%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#e0b22a' }}>&#9632;</span> Med 22%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#27ae7a' }}>&#9632;</span> Low 69%</div>
                  </div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Self-Resolution Dropout Rate</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">% who tried self-service before reaching a live agent and failed</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">34.7%</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>preceded by failed self-service attempt</div>
                  <div style={{ marginTop: 8, fontSize: 11, display: 'flex', gap: 8 }}>
                    <span>IVR <strong>41%</strong></span><span>Chatbot <strong>36%</strong></span><span>KB <strong>23%</strong></span>
                  </div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Channel Switching Behavior</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">% of customers switching support channels within the same issue journey</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">27.1%</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>switched channels for same issue</div>
                  <div style={{ fontSize: 12, marginTop: 6 }}>Top path: <strong>Chat → Voice</strong> (52% of switches)</div>
                  <div style={{ fontSize: 12 }}>Avg <strong>2.1 channels</strong> per issue journey</div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Silent Dissatisfaction Rate</span><span className="cmg-card-badge red">Action Needed</span></div>
                <div className="cmg-card-desc">Negative sentiment, no CSAT submitted, no escalation raised — highest churn risk</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">6.2%</div>
                  <div className="cmg-stat-compare"><span className="cmg-stat-arrow warn">&#9650;</span> vs 4.8% last period</div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>These customers leave without signaling</div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Issue Resolution Satisfaction Gap</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">Gap between resolution asked for vs resolution actually received</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">31.4%</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>of tickets have a resolution gap</div>
                  <div style={{ fontSize: 12, marginTop: 6 }}>Most common: asked for <strong>full refund</strong>, received <strong>coupon</strong></div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Post-Resolution Sentiment Drop</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">% of customers whose sentiment worsens after resolution is provided</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">17.8%</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>sentiment drop at resolution point</div>
                  <div style={{ fontSize: 12, marginTop: 6 }}>Highest in: <strong>Coupon offers</strong> (29%), <strong>Partial refunds</strong> (24%)</div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Issue Persistence Score</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">How consistently a customer contacts for the same unresolved intent category</div>
                <div className="cmg-card-vis">
                  <div className="cmg-dist-bar" style={{ height: 10 }}>
                    <div className="cmg-dist-segment" style={{ width: '14%', background: '#e03a2a' }}></div>
                    <div className="cmg-dist-segment" style={{ width: '31%', background: '#e0b22a' }}></div>
                    <div className="cmg-dist-segment" style={{ width: '55%', background: '#27ae7a' }}></div>
                  </div>
                  <div className="cmg-dist-labels">
                    <div className="cmg-dist-label"><span style={{ color: '#e03a2a' }}>&#9632;</span> High 14%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#e0b22a' }}>&#9632;</span> Med 31%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#27ae7a' }}>&#9632;</span> Low 55%</div>
                  </div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Resolution Acceptance Rate</span><span className="cmg-card-badge green">Healthy</span></div>
                <div className="cmg-card-desc">% of tickets where customer explicitly or implicitly accepted the resolution</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">68.4%</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>accepted vs closed-but-rejected</div>
                  <div className="cmg-stat-compare"><span className="cmg-stat-arrow up">&#9650;</span> vs 65.1% last period</div>
                </div>
              </div>

            </div>{/* /cmg-hidden-a */}
          </div>{/* /cmg-pane-a */}


          {/* ══ PANE B: Sentiment Intelligence ══ */}
          <div className={`cmg-pane${activeTab === 'b' ? ' active' : ''}`} id="cmg-pane-b">
            <div className="cmg-pane-hd">
              <span className="cmg-pane-title">Customer Sentiment Intelligence</span>
              {!expandedPanes.has('b') && (
                <button className="cmg-show-more-btn" id="cmg-more-btn-b" onClick={() => toggleMore('b')}>Show 3 more ›</button>
              )}
            </div>

            <div className="cmg-grid">

              {/* Card B1: Sentiment Distribution */}
              <div className={`cmg-card${expandedCard === 'b1' ? ' expanded' : ''}`} id="cmg-card-b1">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">Customer Sentiment Distribution</span>
                  <span className="cmg-card-badge caution">Caution</span>
                </div>
                <div className="cmg-card-desc">Population-level snapshot: how the entire customer base feels across all tickets</div>
                <div className="cmg-card-vis">
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Base-wide sentiment · last 30 days</div>
                  <div className="cmg-dist-bar" style={{ height: 18, borderRadius: 6, overflow: 'hidden' }}>
                    <div className="cmg-dist-segment" style={{ width: '42%', background: '#27ae7a' }} title="Positive 42%"></div>
                    <div className="cmg-dist-segment" style={{ width: '38%', background: '#b0bec5' }} title="Neutral 38%"></div>
                    <div className="cmg-dist-segment" style={{ width: '20%', background: '#e03a2a' }} title="Negative 20%"></div>
                  </div>
                  <div className="cmg-dist-labels">
                    <div className="cmg-dist-label"><span style={{ color: '#27ae7a' }}>&#9632;</span> Positive 42%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#b0bec5' }}>&#9632;</span> Neutral 38%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#e03a2a' }}>&#9632;</span> Negative 20%</div>
                  </div>
                  <div className="cmg-stat-compare" style={{ marginTop: 8 }}><span className="cmg-stat-arrow warn">&#9650;</span> Negative up from 16.4% last period</div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'b1' ? <button className="cmg-detail-btn" onClick={() => toggleCard('b1')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('b1')}>Details ›</button>}
                </div>
              </div>

              {/* Card B2: Emotional Intensity Distribution */}
              <div className={`cmg-card${expandedCard === 'b2' ? ' expanded' : ''}`} id="cmg-card-b2">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">Emotional Intensity Distribution</span>
                  <span className="cmg-card-badge red">Action Needed</span>
                </div>
                <div className="cmg-card-desc">5-tier emotional intensity: Calm to Irate — beyond simple positive/negative classification</div>
                <div className="cmg-card-vis">
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Intensity tiers across all tickets</div>
                  <div className="cmg-dist-bar" style={{ height: 16, borderRadius: 6, overflow: 'hidden' }}>
                    <div className="cmg-dist-segment" style={{ width: '31%', background: '#27ae7a' }} title="Calm 31%"></div>
                    <div className="cmg-dist-segment" style={{ width: '24%', background: '#8bc34a' }} title="Mildly Frustrated 24%"></div>
                    <div className="cmg-dist-segment" style={{ width: '22%', background: '#e0b22a' }} title="Frustrated 22%"></div>
                    <div className="cmg-dist-segment" style={{ width: '15%', background: '#e07a2a' }} title="Distressed 15%"></div>
                    <div className="cmg-dist-segment" style={{ width: '8%', background: '#e03a2a' }} title="Irate 8%"></div>
                  </div>
                  <div className="cmg-dist-labels" style={{ flexWrap: 'wrap', gap: 4 }}>
                    <div className="cmg-dist-label"><span style={{ color: '#27ae7a' }}>&#9632;</span> Calm 31%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#8bc34a' }}>&#9632;</span> Mild 24%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#e0b22a' }}>&#9632;</span> Frust 22%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#e07a2a' }}>&#9632;</span> Dist 15%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#e03a2a' }}>&#9632;</span> Irate 8%</div>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#e03a2a', fontWeight: 600 }}>Distressed + Irate = 23% of base</div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'b2' ? <button className="cmg-detail-btn" onClick={() => toggleCard('b2')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('b2')}>Details ›</button>}
                </div>
              </div>

              {/* Card B3: Frustration Trigger Mapping */}
              <div className={`cmg-card${expandedCard === 'b3' ? ' expanded' : ''}`} id="cmg-card-b3">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">Frustration Trigger Mapping</span>
                  <span className="cmg-card-badge caution">Watch</span>
                </div>
                <div className="cmg-card-desc">Specific moments/statements that caused measurable negative sentiment shift</div>
                <div className="cmg-card-vis">
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>Top triggers · ranked by frequency</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div className="cmg-trigger-row">
                      <span className="cmg-trigger-rank">1</span>
                      <span className="cmg-trigger-name">"your policy states"</span>
                      <span className="cmg-trigger-freq">1,243</span>
                      <span className="cmg-trigger-drop">-0.38</span>
                    </div>
                    <div className="cmg-trigger-row">
                      <span className="cmg-trigger-rank">2</span>
                      <span className="cmg-trigger-name">"we can't process that"</span>
                      <span className="cmg-trigger-freq">987</span>
                      <span className="cmg-trigger-drop">-0.31</span>
                    </div>
                    <div className="cmg-trigger-row">
                      <span className="cmg-trigger-rank">3</span>
                      <span className="cmg-trigger-name">"please hold for a moment"</span>
                      <span className="cmg-trigger-freq">756</span>
                      <span className="cmg-trigger-drop">-0.22</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 6, fontSize: 10, color: 'var(--text-muted)' }}>Freq = occurrences · Drop = avg sentiment score change</div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'b3' ? <button className="cmg-detail-btn" onClick={() => toggleCard('b3')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('b3')}>Details ›</button>}
                </div>
              </div>

              {/* Full-width detail row for pane B */}
              <div className={`cmg-detail-row${['b1','b2','b3'].includes(expandedCard) ? ' open' : ''}`}>
                <div className="cmg-detail-row-inner">
                {expandedCard === 'b1' && (
                  <div className="cmg-detail-panel" id="cmg-detail-b1">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">Sentiment Distribution — Drill-down</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('b1')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <table className="cmg-detail-table">
                        <thead><tr><th>Channel</th><th>Positive</th><th>Neutral</th><th>Negative</th></tr></thead>
                        <tbody>
                          <tr><td>Voice</td><td>39%</td><td>35%</td><td style={{ color: '#e03a2a', fontWeight: 600 }}>26%</td></tr>
                          <tr><td>Chat</td><td>45%</td><td>39%</td><td>16%</td></tr>
                          <tr><td>Email</td><td>44%</td><td>40%</td><td>16%</td></tr>
                        </tbody>
                      </table>
                      <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)' }}>Voice channel shows highest negative sentiment — consider call handling experience review.</div>
                    </div>
                  </div>
                )}
                {expandedCard === 'b2' && (
                  <div className="cmg-detail-panel" id="cmg-detail-b2">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">Emotional Intensity — Drill-down by Intent</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('b2')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <table className="cmg-detail-table">
                        <thead><tr><th>Intent</th><th>Distressed</th><th>Irate</th><th>Combined</th></tr></thead>
                        <tbody>
                          <tr><td>Refund request</td><td>21%</td><td style={{ color: '#e03a2a', fontWeight: 600 }}>14%</td><td style={{ color: '#e03a2a', fontWeight: 600 }}>35%</td></tr>
                          <tr><td>Delivery delay</td><td>18%</td><td>9%</td><td>27%</td></tr>
                          <tr><td>Product defect</td><td>16%</td><td>8%</td><td>24%</td></tr>
                          <tr><td>Order status</td><td>8%</td><td>3%</td><td>11%</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {expandedCard === 'b3' && (
                  <div className="cmg-detail-panel" id="cmg-detail-b3">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">Frustration Triggers — Full Ranked List</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('b3')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <table className="cmg-detail-table">
                        <thead><tr><th>#</th><th>Trigger phrase</th><th>Occurrences</th><th>Avg sentiment drop</th></tr></thead>
                        <tbody>
                          <tr><td>1</td><td>"your policy states"</td><td>1,243</td><td style={{ color: '#e03a2a' }}>-0.38</td></tr>
                          <tr><td>2</td><td>"we can't process that"</td><td>987</td><td style={{ color: '#e03a2a' }}>-0.31</td></tr>
                          <tr><td>3</td><td>"please hold for a moment"</td><td>756</td><td style={{ color: '#e07a2a' }}>-0.22</td></tr>
                          <tr><td>4</td><td>"I understand your frustration"</td><td>612</td><td style={{ color: '#e07a2a' }}>-0.19</td></tr>
                          <tr><td>5</td><td>"that's outside our scope"</td><td>498</td><td style={{ color: '#e03a2a' }}>-0.34</td></tr>
                          <tr><td>6</td><td>"let me transfer you"</td><td>441</td><td style={{ color: '#e07a2a' }}>-0.28</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                </div>
              </div>

            </div>{/* /cmg-grid spotlight B */}

            {/* Secondary metrics grid B */}
            <div className="cmg-hidden-grid" id="cmg-hidden-b" style={{ display: expandedPanes.has('b') ? 'grid' : 'none' }}>

              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
                <button className="cmg-close-btn" onClick={() => toggleMore('b')} aria-label="Collapse">✕</button>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Sentiment Transition Matrix</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">How customer sentiment shifts between consecutive tickets (not within a ticket)</div>
                <div className="cmg-card-vis">
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}>Ticket N → Ticket N+1 transitions (customer count)</div>
                  <div className="cmg-crosstab">
                    <div className="cmg-crosstab-cell cmg-crosstab-hd" style={{ background: 'transparent' }}></div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">→ Pos</div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">→ Neu</div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">→ Neg</div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">Pos ↓</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(39,174,122,0.2)' }}>2,841</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(176,190,197,0.2)' }}>612</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(224,58,42,0.1)' }}>247</div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">Neu ↓</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(39,174,122,0.1)' }}>489</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(176,190,197,0.2)' }}>1,934</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(224,58,42,0.15)' }}>418</div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">Neg ↓</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(39,174,122,0.15)' }}>312</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(176,190,197,0.15)' }}>287</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(224,58,42,0.25)' }}>764</div>
                  </div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Sentiment Drift Throughout Journey</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">Net sentiment change measured at 4 conversation stages: open → mid → post-resolution → close</div>
                <div className="cmg-card-vis">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', height: 48, marginBottom: 4, gap: 4 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#27ae7a' }}>+0.42</div>
                      <div style={{ width: '100%', background: '#27ae7a', height: 32, borderRadius: '3px 3px 0 0' }}></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#e0b22a' }}>+0.18</div>
                      <div style={{ width: '100%', background: '#e0b22a', height: 14, borderRadius: '3px 3px 0 0' }}></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#e07a2a' }}>-0.08</div>
                      <div style={{ width: '100%', background: '#e07a2a', height: 6, borderRadius: '3px 3px 0 0' }}></div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, flex: 1 }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: '#27ae7a' }}>+0.24</div>
                      <div style={{ width: '100%', background: '#27ae7a', height: 18, borderRadius: '3px 3px 0 0' }}></div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--text-muted)' }}>
                    <span>Open</span><span>Mid</span><span>Post-res</span><span>Close</span>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>Dip at post-resolution stage — resolution delivery experience needs attention</div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Customer Tone Shift Rate</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">% of tickets where customer tone changed significantly mid-conversation</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">14.3%</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>of tickets with detected tone shift</div>
                  <div style={{ marginTop: 8, display: 'flex', gap: 12, fontSize: 12 }}>
                    <span><span style={{ color: '#e03a2a' }}>&#9660;</span> Neg shift <strong>71%</strong></span>
                    <span><span style={{ color: '#27ae7a' }}>&#9650;</span> Pos shift <strong>29%</strong></span>
                  </div>
                </div>
              </div>

            </div>{/* /cmg-hidden-b */}
          </div>{/* /cmg-pane-b */}


          {/* ══ PANE C: Loyalty & Churn Intelligence ══ */}
          <div className={`cmg-pane${activeTab === 'c' ? ' active' : ''}`} id="cmg-pane-c">
            <div className="cmg-pane-hd">
              <span className="cmg-pane-title">Customer Loyalty &amp; Churn Intelligence</span>
              {!expandedPanes.has('c') && (
                <button className="cmg-show-more-btn" id="cmg-more-btn-c" onClick={() => toggleMore('c')}>Show 1 more ›</button>
              )}
            </div>

            <div className="cmg-grid">

              {/* Card C1: Churn Risk Distribution */}
              <div className={`cmg-card${expandedCard === 'c1' ? ' expanded' : ''}`} id="cmg-card-c1">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">Churn Risk Distribution</span>
                  <span className="cmg-card-badge red">Action Needed</span>
                </div>
                <div className="cmg-card-desc">Count and % of customers in High / Medium / Low churn risk bands</div>
                <div className="cmg-card-vis">
                  <div className="cmg-risk-blocks">
                    <div className="cmg-risk-block high">
                      <div className="cmg-risk-val">847</div>
                      <div className="cmg-risk-pct">12%</div>
                      <div className="cmg-risk-lbl">HIGH</div>
                    </div>
                    <div className="cmg-risk-block medium">
                      <div className="cmg-risk-val">2,341</div>
                      <div className="cmg-risk-pct">34%</div>
                      <div className="cmg-risk-lbl">MEDIUM</div>
                    </div>
                    <div className="cmg-risk-block low">
                      <div className="cmg-risk-val">3,754</div>
                      <div className="cmg-risk-pct">54%</div>
                      <div className="cmg-risk-lbl">LOW</div>
                    </div>
                  </div>
                  <div className="cmg-stat-compare" style={{ marginTop: 10 }}><span className="cmg-stat-arrow warn">&#9650;</span> High band grew by 89 customers this period</div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'c1' ? <button className="cmg-detail-btn" onClick={() => toggleCard('c1')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('c1')}>Details ›</button>}
                </div>
              </div>

              {/* Card C2: High-Value Customer Risk Concentration */}
              <div className={`cmg-card${expandedCard === 'c2' ? ' expanded' : ''}`} id="cmg-card-c2">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">High-Value Customer Risk Concentration</span>
                  <span className="cmg-card-badge red">Action Needed</span>
                </div>
                <div className="cmg-card-desc">Churn risk segmented by customer value tier — revenue at risk</div>
                <div className="cmg-card-vis">
                  <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 6 }}>Value tier × Churn risk (customer count)</div>
                  <div className="cmg-crosstab">
                    <div className="cmg-crosstab-cell cmg-crosstab-hd" style={{ background: 'transparent' }}></div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">High Risk</div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">Med Risk</div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">Low Risk</div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">High Value</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(224,58,42,0.35)', fontWeight: 700, color: '#e03a2a' }}>187</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(224,178,42,0.2)' }}>341</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(39,174,122,0.1)' }}>612</div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">Mid Value</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(224,58,42,0.15)' }}>412</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(224,178,42,0.15)' }}>987</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(39,174,122,0.1)' }}>1,843</div>
                    <div className="cmg-crosstab-cell cmg-crosstab-hd">Low Value</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(224,58,42,0.08)' }}>248</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(224,178,42,0.08)' }}>1,013</div>
                    <div className="cmg-crosstab-cell" style={{ background: 'rgba(39,174,122,0.12)' }}>1,299</div>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#e03a2a', fontWeight: 600 }}>187 High-Value customers at High churn risk</div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'c2' ? <button className="cmg-detail-btn" onClick={() => toggleCard('c2')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('c2')}>Details ›</button>}
                </div>
              </div>

              {/* Card C3: Recovery Rate */}
              <div className={`cmg-card${expandedCard === 'c3' ? ' expanded' : ''}`} id="cmg-card-c3">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">Recovery Rate</span>
                  <span className="cmg-card-badge green">Healthy</span>
                </div>
                <div className="cmg-card-desc">% of previously high churn risk customers who moved to Medium or Low this period</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">18.3%<span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 6 }}>recovery rate</span></div>
                  <div className="cmg-stat-compare">
                    <span className="cmg-stat-arrow up">&#9650;</span> vs 14.7% last period &nbsp;<span style={{ color: '#27ae7a', fontSize: 11, fontWeight: 600 }}>+3.6pp improving</span>
                  </div>
                  <div style={{ marginTop: 10, fontSize: 12 }}><strong>38 customers</strong> de-escalated from High risk band this period</div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'c3' ? <button className="cmg-detail-btn" onClick={() => toggleCard('c3')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('c3')}>Details ›</button>}
                </div>
              </div>

              {/* Full-width detail row for pane C */}
              <div className={`cmg-detail-row${['c1','c2','c3'].includes(expandedCard) ? ' open' : ''}`}>
                <div className="cmg-detail-row-inner">
                {expandedCard === 'c1' && (
                  <div className="cmg-detail-panel" id="cmg-detail-c1">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">Churn Risk — Drill-down by Segment &amp; Tenure</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('c1')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <table className="cmg-detail-table">
                        <thead><tr><th>Segment</th><th>High Risk</th><th>Period change</th></tr></thead>
                        <tbody>
                          <tr><td>Premium</td><td style={{ color: '#e03a2a', fontWeight: 600 }}>19% (156)</td><td style={{ color: '#e07a2a' }}>&#9650; +31</td></tr>
                          <tr><td>Standard</td><td>11% (524)</td><td style={{ color: '#e07a2a' }}>&#9650; +47</td></tr>
                          <tr><td>New (&lt;90d)</td><td>8% (167)</td><td style={{ color: '#e07a2a' }}>&#9650; +11</td></tr>
                        </tbody>
                      </table>
                      <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>Band movement: 127 customers escalated to High; 38 de-escalated from High.</div>
                    </div>
                  </div>
                )}
                {expandedCard === 'c2' && (
                  <div className="cmg-detail-panel" id="cmg-detail-c2">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">High-Value Risk — Revenue at Risk Estimate</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('c2')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 12 }}>
                        <div style={{ background: 'rgba(224,58,42,0.08)', border: '1px solid rgba(224,58,42,0.2)', borderRadius: 6, padding: '10px 14px', flex: 1, minWidth: 120 }}>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Revenue at risk</div>
                          <div style={{ fontSize: 20, fontWeight: 700, color: '#e03a2a' }}>₹2.4Cr</div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>High-Value × High-Risk</div>
                        </div>
                        <div style={{ background: 'rgba(224,178,42,0.08)', border: '1px solid rgba(224,178,42,0.2)', borderRadius: 6, padding: '10px 14px', flex: 1, minWidth: 120 }}>
                          <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>At-risk customers</div>
                          <div style={{ fontSize: 20, fontWeight: 700, color: '#e0b22a' }}>187</div>
                          <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Avg LTV ₹1.28L</div>
                        </div>
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Prioritize outreach to the 187 High-Value × High-Risk customers — highest revenue protection per intervention.</div>
                    </div>
                  </div>
                )}
                {expandedCard === 'c3' && (
                  <div className="cmg-detail-panel" id="cmg-detail-c3">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">Recovery Rate — What's Working</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('c3')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <div style={{ marginBottom: 8, fontSize: 12, color: 'var(--text-muted)' }}>Factors correlated with successful recovery</div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 12 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Proactive outreach call</span><span style={{ fontWeight: 600, color: '#27ae7a' }}>+8.2pp recovery lift</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Full resolution on re-contact</span><span style={{ fontWeight: 600, color: '#27ae7a' }}>+6.1pp recovery lift</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Manager callback offered</span><span style={{ fontWeight: 600, color: '#27ae7a' }}>+4.7pp recovery lift</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Goodwill gesture applied</span><span style={{ fontWeight: 600, color: '#27ae7a' }}>+3.3pp recovery lift</span></div>
                      </div>
                    </div>
                  </div>
                )}
                </div>
              </div>

            </div>{/* /cmg-grid spotlight C */}

            {/* Secondary metrics grid C */}
            <div className="cmg-hidden-grid" id="cmg-hidden-c" style={{ display: expandedPanes.has('c') ? 'grid' : 'none' }}>

              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
                <button className="cmg-close-btn" onClick={() => toggleMore('c')} aria-label="Collapse">✕</button>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Pre-Churn Behavioral Signature</span><span className="cmg-card-badge red">Action Needed</span></div>
                <div className="cmg-card-desc">Pattern observed in customers who churned in the 60–90 days before leaving</div>
                <div className="cmg-card-vis">
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Signature checklist (% of pre-churn cohort showing signal)</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>3+ ticket reopens</span><span style={{ fontWeight: 600, color: '#e03a2a' }}>78%</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Negative post-resolution sentiment</span><span style={{ fontWeight: 600, color: '#e03a2a' }}>72%</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Contact velocity increase (&gt;50%)</span><span style={{ fontWeight: 600, color: '#e07a2a' }}>61%</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>CSAT below 3 in last ticket</span><span style={{ fontWeight: 600, color: '#e07a2a' }}>58%</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Channel switch in last journey</span><span style={{ fontWeight: 600, color: '#e0b22a' }}>44%</span></div>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#e07a2a', fontWeight: 600 }}>14.2% of current active base matches this signature</div>
                </div>
              </div>

            </div>{/* /cmg-hidden-c */}
          </div>{/* /cmg-pane-c */}


          {/* ══ PANE D: Intent & Journey Intelligence ══ */}
          <div className={`cmg-pane${activeTab === 'd' ? ' active' : ''}`} id="cmg-pane-d">
            <div className="cmg-pane-hd">
              <span className="cmg-pane-title">Intent &amp; Journey Intelligence</span>
              {!expandedPanes.has('d') && (
                <button className="cmg-show-more-btn" id="cmg-more-btn-d" onClick={() => toggleMore('d')}>Show 3 more ›</button>
              )}
            </div>

            <div className="cmg-grid">

              {/* Card D1: Journey Abandonment Rate */}
              <div className={`cmg-card${expandedCard === 'd1' ? ' expanded' : ''}`} id="cmg-card-d1">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">Customer Journey Abandonment Rate</span>
                  <span className="cmg-card-badge caution">Caution</span>
                </div>
                <div className="cmg-card-desc">% of customers who disengaged mid-conversation before a resolution was reached</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">7.4%<span style={{ fontSize: 13, fontWeight: 400, color: 'var(--text-muted)', marginLeft: 6 }}>abandonment rate</span></div>
                  <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>By channel</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                      <span style={{ width: 40 }}>Voice</span>
                      <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '11.2%', height: '100%', background: '#e03a2a', borderRadius: 4 }}></div>
                      </div>
                      <span style={{ fontWeight: 600, color: '#e03a2a' }}>11.2%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                      <span style={{ width: 40 }}>Chat</span>
                      <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '6.8%', height: '100%', background: '#e07a2a', borderRadius: 4 }}></div>
                      </div>
                      <span style={{ fontWeight: 600, color: '#e07a2a' }}>6.8%</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
                      <span style={{ width: 40 }}>Email</span>
                      <div style={{ flex: 1, height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden' }}>
                        <div style={{ width: '3.1%', height: '100%', background: '#27ae7a', borderRadius: 4 }}></div>
                      </div>
                      <span style={{ fontWeight: 600, color: '#27ae7a' }}>3.1%</span>
                    </div>
                  </div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'd1' ? <button className="cmg-detail-btn" onClick={() => toggleCard('d1')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('d1')}>Details ›</button>}
                </div>
              </div>

              {/* Card D2: Unresolved Intent Accumulation */}
              <div className={`cmg-card${expandedCard === 'd2' ? ' expanded' : ''}`} id="cmg-card-d2">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">Unresolved Intent Accumulation</span>
                  <span className="cmg-card-badge red">Action Needed</span>
                </div>
                <div className="cmg-card-desc">Customers who raised the same intent across multiple tickets without confirmed resolution</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">1,847</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>customers with 2+ unresolved instances of same intent</div>
                  <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>Top unresolved intents</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Refund request</span><span style={{ fontWeight: 600, color: '#e03a2a' }}>621 customers</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Delivery delay</span><span style={{ fontWeight: 600, color: '#e07a2a' }}>448 customers</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Account issue</span><span style={{ fontWeight: 600, color: '#e07a2a' }}>387 customers</span></div>
                  </div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'd2' ? <button className="cmg-detail-btn" onClick={() => toggleCard('d2')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('d2')}>Details ›</button>}
                </div>
              </div>

              {/* Card D3: Resolution Journey Stage Breakdown */}
              <div className={`cmg-card${expandedCard === 'd3' ? ' expanded' : ''}`} id="cmg-card-d3">
                <div className="cmg-card-hd">
                  <span className="cmg-card-name">Resolution Journey Stage Breakdown</span>
                  <span className="cmg-card-badge caution">Caution</span>
                </div>
                <div className="cmg-card-desc">Total handle time split across: Greeting → Probing → Hold → Execution → Closing</div>
                <div className="cmg-card-vis">
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 6 }}>Avg time per phase (% of total handle time)</div>
                  <div className="cmg-phase-bar">
                    <div className="cmg-phase-seg" style={{ width: '8%', background: '#5c6bc0' }} title="Greeting 8%">8%</div>
                    <div className="cmg-phase-seg" style={{ width: '31%', background: 'var(--teal)' }} title="Probing 31%">31%</div>
                    <div className="cmg-phase-seg" style={{ width: '22%', background: '#e07a2a' }} title="Hold 22%">22%</div>
                    <div className="cmg-phase-seg" style={{ width: '28%', background: '#8bc34a' }} title="Execution 28%">28%</div>
                    <div className="cmg-phase-seg" style={{ width: '11%', background: '#b0bec5' }} title="Closing 11%">11%</div>
                  </div>
                  <div className="cmg-phase-labels">
                    <span><span style={{ color: '#5c6bc0' }}>&#9632;</span> Greeting</span>
                    <span><span style={{ color: 'var(--teal)' }}>&#9632;</span> Probing</span>
                    <span><span style={{ color: '#e07a2a' }}>&#9632;</span> Hold</span>
                    <span><span style={{ color: '#8bc34a' }}>&#9632;</span> Execution</span>
                    <span><span style={{ color: '#b0bec5' }}>&#9632;</span> Closing</span>
                  </div>
                  <div style={{ marginTop: 8, fontSize: 12, color: '#e07a2a', fontWeight: 600 }}>Hold phase (22%) above 15% benchmark — investigate hold causes</div>
                </div>
                <div className="cmg-card-footer">
                  {expandedCard === 'd3' ? <button className="cmg-detail-btn" onClick={() => toggleCard('d3')}>Close</button> : <button className="cmg-detail-btn" onClick={() => toggleCard('d3')}>Details ›</button>}
                </div>
              </div>

              {/* Full-width detail row for pane D */}
              <div className={`cmg-detail-row${['d1','d2','d3'].includes(expandedCard) ? ' open' : ''}`}>
                <div className="cmg-detail-row-inner">
                {expandedCard === 'd1' && (
                  <div className="cmg-detail-panel" id="cmg-detail-d1">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">Journey Abandonment — Drill-down by Intent &amp; Stage</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('d1')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <table className="cmg-detail-table">
                        <thead><tr><th>Intent</th><th>Abandon %</th><th>Avg time before abandon</th></tr></thead>
                        <tbody>
                          <tr><td>Refund request</td><td style={{ color: '#e03a2a', fontWeight: 600 }}>11.8%</td><td>8.4 min</td></tr>
                          <tr><td>Delivery delay</td><td style={{ color: '#e07a2a' }}>9.2%</td><td>6.1 min</td></tr>
                          <tr><td>Account issue</td><td>7.4%</td><td>11.2 min</td></tr>
                          <tr><td>Order status</td><td>4.1%</td><td>4.3 min</td></tr>
                        </tbody>
                      </table>
                      <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>Abandonment is the strongest indicator of immediate churn risk — these customers leave without any signal.</div>
                    </div>
                  </div>
                )}
                {expandedCard === 'd2' && (
                  <div className="cmg-detail-panel" id="cmg-detail-d2">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">Unresolved Intent Accumulation — Full Breakdown</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('d2')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <table className="cmg-detail-table">
                        <thead><tr><th>Intent</th><th>Customers</th><th>Avg attempts</th><th>Max attempts</th></tr></thead>
                        <tbody>
                          <tr><td>Refund request</td><td style={{ color: '#e03a2a', fontWeight: 600 }}>621</td><td>3.4</td><td>9</td></tr>
                          <tr><td>Delivery delay</td><td style={{ color: '#e07a2a' }}>448</td><td>2.8</td><td>7</td></tr>
                          <tr><td>Account issue</td><td style={{ color: '#e07a2a' }}>387</td><td>3.1</td><td>11</td></tr>
                          <tr><td>Product defect</td><td>248</td><td>2.6</td><td>6</td></tr>
                          <tr><td>Order status</td><td>143</td><td>2.2</td><td>5</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                {expandedCard === 'd3' && (
                  <div className="cmg-detail-panel" id="cmg-detail-d3">
                    <div className="cmg-detail-panel-hd">
                      <div className="cmg-detail-title">Journey Stage Breakdown — By Intent</div>
                      <button className="cmg-close-btn" onClick={() => toggleCard('d3')} aria-label="Close">✕</button>
                    </div>
                    <div className="cmg-detail-body">
                      <table className="cmg-detail-table">
                        <thead><tr><th>Intent</th><th>Greeting</th><th>Probing</th><th>Hold</th><th>Execution</th><th>Closing</th></tr></thead>
                        <tbody>
                          <tr><td>Refund request</td><td>6%</td><td>28%</td><td style={{ color: '#e03a2a', fontWeight: 600 }}>31%</td><td>27%</td><td>8%</td></tr>
                          <tr><td>Order status</td><td>10%</td><td>22%</td><td>14%</td><td>42%</td><td>12%</td></tr>
                          <tr><td>Delivery delay</td><td>8%</td><td>34%</td><td style={{ color: '#e07a2a', fontWeight: 600 }}>24%</td><td>26%</td><td>8%</td></tr>
                          <tr><td>Account issue</td><td>7%</td><td>38%</td><td>19%</td><td>27%</td><td>9%</td></tr>
                        </tbody>
                      </table>
                      <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>Refund requests spend 31% of time on hold — highest among all intent types. Check system lookup bottlenecks.</div>
                    </div>
                  </div>
                )}
                </div>
              </div>

            </div>{/* /cmg-grid spotlight D */}

            {/* Secondary metrics grid D */}
            <div className="cmg-hidden-grid" id="cmg-hidden-d" style={{ display: expandedPanes.has('d') ? 'grid' : 'none' }}>

              <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end', marginBottom: 4 }}>
                <button className="cmg-close-btn" onClick={() => toggleMore('d')} aria-label="Collapse">✕</button>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Intent Shift Analysis</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">How customer intent changes turn-by-turn within a conversation — from opening to closing intent</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">41.2%</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>of tickets show intent shift mid-conversation</div>
                  <div style={{ marginTop: 8, fontSize: 12 }}>Avg <strong>2.3 intents</strong> per ticket · Most common shift:<br /><strong>Order Status → Delivery Delay</strong> (18% of shifts)</div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Intent Complexity Score</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">How complex a customer's support needs are — distinct intents, escalations, multi-agent handling</div>
                <div className="cmg-card-vis">
                  <div className="cmg-dist-bar" style={{ height: 10 }}>
                    <div className="cmg-dist-segment" style={{ width: '11%', background: '#e03a2a' }}></div>
                    <div className="cmg-dist-segment" style={{ width: '34%', background: '#e0b22a' }}></div>
                    <div className="cmg-dist-segment" style={{ width: '55%', background: '#27ae7a' }}></div>
                  </div>
                  <div className="cmg-dist-labels">
                    <div className="cmg-dist-label"><span style={{ color: '#e03a2a' }}>&#9632;</span> High 11%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#e0b22a' }}>&#9632;</span> Med 34%</div>
                    <div className="cmg-dist-label"><span style={{ color: '#27ae7a' }}>&#9632;</span> Low 55%</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>High complexity customers avg 3.8 intents and 2.1 agent handoffs per journey</div>
                </div>
              </div>

              <div className="cmg-sec-card">
                <div className="cmg-card-hd"><span className="cmg-card-name">Repeat Contact Interval Trend</span><span className="cmg-card-badge caution">Watch</span></div>
                <div className="cmg-card-desc">Whether time gap between consecutive tickets is shrinking, stable, or growing</div>
                <div className="cmg-card-vis">
                  <div className="cmg-big-stat">28.7%</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>of base with shrinking contact intervals</div>
                  <div style={{ marginTop: 8, fontSize: 12 }}>
                    High risk avg: <strong>4.2 days</strong> between tickets<br />
                    Base avg: <strong>18.6 days</strong> between tickets
                  </div>
                </div>
              </div>

            </div>{/* /cmg-hidden-d */}
          </div>{/* /cmg-pane-d */}

        </div>{/* /scrollable body */}
      </div>
    </div>
  )
}
