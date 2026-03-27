import { useState } from 'react'

const PANES = [
  { id: 'a', label: 'Behavior Patterns' },
  { id: 'b', label: 'Sentiment' },
  { id: 'c', label: 'Loyalty & Churn' },
  { id: 'd', label: 'Intent & Journey' },
]

const CMG_DATA = {
  a: {
    cards: [
      { id: 'a1', name: 'Repeat Issue Rate', badge: 'Watch', badgeColor: 'amber', value: '34.2%', desc: 'Customers contacting for the same issue more than once', sub: '+2.1% vs last period' },
      { id: 'a2', name: 'Issue Gravity Score', badge: 'High', badgeColor: 'alert', value: '6.8 / 10', desc: 'Composite severity of unresolved customer issues', sub: 'Above threshold' },
      { id: 'a3', name: 'Customer Loyalty Erosion', badge: 'Watch', badgeColor: 'amber', value: '12.4%', desc: 'Customers showing declining engagement patterns', sub: '-0.8% improvement' },
    ],
    secondary: ['Issue Gravity Escalation', 'Contact Velocity', 'Self-Resolution Dropout', 'Channel Switching', 'Silent Dissatisfaction'],
  },
  b: {
    cards: [
      { id: 'b1', name: 'Sentiment Distribution', badge: 'Stable', badgeColor: 'green', value: '62% Positive', desc: 'Overall sentiment split across all interactions', sub: '28% neutral, 10% negative' },
      { id: 'b2', name: 'Emotional Intensity', badge: 'Watch', badgeColor: 'amber', value: '4.1 / 10', desc: 'Average emotional intensity score per interaction', sub: '+0.3 vs last month' },
      { id: 'b3', name: 'Frustration Triggers', badge: 'Alert', badgeColor: 'alert', value: '3 active', desc: 'Top recurring frustration trigger categories', sub: 'Hold time, repeat info, transfers' },
    ],
    secondary: ['Sentiment Transition Matrix', 'Sentiment Drift', 'Customer Tone Shift Rate'],
  },
  c: {
    cards: [
      { id: 'c1', name: 'Churn Risk Distribution', badge: 'High', badgeColor: 'alert', value: '8.4% High Risk', desc: 'Customers showing pre-churn behavioral signals', sub: '1,550 customers' },
      { id: 'c2', name: 'High-Value Risk Concentration', badge: 'Alert', badgeColor: 'alert', value: '23%', desc: 'High-value segment customers in the high-risk churn band', sub: 'Requires immediate attention' },
      { id: 'c3', name: 'Recovery Rate', badge: 'Good', badgeColor: 'green', value: '71.2%', desc: 'At-risk customers successfully recovered', sub: '+3.4% vs last quarter' },
    ],
    secondary: ['Pre-Churn Behavioral Signature'],
  },
  d: {
    cards: [
      { id: 'd1', name: 'Journey Abandonment Rate', badge: 'Watch', badgeColor: 'amber', value: '18.7%', desc: 'Customers disengaging before issue resolution', sub: 'Highest at hold phase' },
      { id: 'd2', name: 'Unresolved Intent Accumulation', badge: 'Alert', badgeColor: 'alert', value: '2.3 avg', desc: 'Average unresolved intents per customer journey', sub: '+0.4 vs last month' },
      { id: 'd3', name: 'Resolution Journey Breakdown', badge: 'Stable', badgeColor: 'green', value: '4.2 stages', desc: 'Average stages traversed before resolution', sub: 'Target: ≤ 3.5' },
    ],
    secondary: ['Intent Shift Analysis', 'Intent Complexity Score', 'Repeat Contact Interval Trend'],
  },
}

const BADGE_COLORS = {
  alert: '#DC2626', amber: '#F59E0B', green: '#10B981', info: '#3B82F6',
}

export default function CMGView() {
  const [activePane, setActivePane] = useState('a')
  const [expandedPanes, setExpandedPanes] = useState(new Set())
  const [expandedCards, setExpandedCards] = useState(new Set())
  const pane = CMG_DATA[activePane]

  function toggleMore(id) {
    setExpandedPanes(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }
  function toggleCard(id) {
    setExpandedCards(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  return (
    <div className="view active" style={{ flexDirection: 'column', overflowY: 'auto' }}>
      <div className="analytics-topbar">
        <div>
          <div className="analytics-page-title">Customer Memory Graph</div>
          <div style={{ fontSize: 12, color: 'var(--cutty-sark)', opacity: 0.7 }}>Last 30 days · Behavioral intelligence across customer journeys</div>
        </div>
      </div>

      {/* Tab cards */}
      <div style={{ display: 'flex', gap: 10, padding: '12px 24px' }}>
        {PANES.map(p => (
          <button key={p.id}
            className={`cmg-hcard${activePane === p.id ? ' active' : ''}`}
            id={`cmg-hcard-${p.id}`}
            onClick={() => setActivePane(p.id)}
            style={{ flex: 1, padding: '10px 14px', border: `1px solid ${activePane === p.id ? 'var(--teal)' : 'var(--nebula)'}`, borderRadius: 10, background: activePane === p.id ? 'var(--teal-10)' : '#fff', cursor: 'pointer', fontSize: 12, fontWeight: activePane === p.id ? 600 : 400, color: activePane === p.id ? 'var(--teal)' : 'var(--cutty-sark)', textAlign: 'left', transition: 'all 0.15s' }}>
            {p.label}
          </button>
        ))}
      </div>

      {/* Pane */}
      <div className="analytics-content">
        <div className="cmg-pane active">
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
            <button className="cmg-show-more-btn" onClick={() => toggleMore(activePane)}
              style={{ fontSize: 12, color: 'var(--teal)', background: 'none', border: '1px solid var(--teal)', borderRadius: 6, padding: '4px 12px', cursor: 'pointer' }}>
              {expandedPanes.has(activePane) ? 'Show less ↑' : 'Show more ↓'}
            </button>
          </div>

          {/* Primary cards */}
          <div className="cmg-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 14 }}>
            {pane.cards.map(card => (
              <div key={card.id} className="cmg-card" id={`cmg-card-${card.id}`}>
                <div className="cmg-card-hd" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span className="cmg-card-name" style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark-teal)' }}>{card.name}</span>
                  <span className="cmg-card-badge" style={{ fontSize: 10, fontWeight: 700, color: BADGE_COLORS[card.badgeColor], background: `${BADGE_COLORS[card.badgeColor]}18`, borderRadius: 20, padding: '2px 8px' }}>{card.badge}</span>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--dark-teal)', marginBottom: 4 }}>{card.value}</div>
                <div style={{ fontSize: 11, color: 'var(--cutty-sark)', lineHeight: 1.4, marginBottom: 6 }}>{card.desc}</div>
                <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: 0.65 }}>{card.sub}</div>
                <button className="cmg-detail-btn" onClick={() => toggleCard(card.id)}
                  style={{ marginTop: 8, fontSize: 11, color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                  {expandedCards.has(card.id) ? 'Hide ↑' : 'Details ›'}
                </button>
                {expandedCards.has(card.id) && (
                  <div className={`cmg-detail-${card.id}`} style={{ marginTop: 10, padding: 10, background: 'var(--aqua-haze)', borderRadius: 8, fontSize: 12, color: 'var(--cutty-sark)' }}>
                    Detailed breakdown for {card.name} — drill-down data coming soon.
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Secondary grid */}
          {expandedPanes.has(activePane) && (
            <div className="cmg-hidden-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, marginTop: 14 }}>
              {pane.secondary.map((name, i) => (
                <div key={i} className="cmg-sec-card" style={{ padding: '12px 14px', border: '1px solid var(--nebula)', borderRadius: 10, background: '#fff' }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--dark-teal)', marginBottom: 4 }}>{name}</div>
                  <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: 0.6 }}>Coming soon</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
