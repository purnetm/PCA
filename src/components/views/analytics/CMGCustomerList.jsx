import { useState } from 'react'

const HIGH_RISK_CUSTOMERS = [
  { id: 'C-1042', name: 'Priya Sharma',   tier: 'Enterprise', value: '₹4.2L', score: 82, sentiment: '−0.34', repeat: '38%', resGap: '62%', intent: 'Refund' },
  { id: 'C-4455', name: 'Vikram Patel',   tier: 'SMB',        value: '₹0.9L', score: 76, sentiment: '−0.48', repeat: '45%', resGap: '71%', intent: 'Service Down' },
  { id: 'C-7743', name: 'Sneha Kulkarni', tier: 'SMB',        value: '₹0.7L', score: 71, sentiment: '−0.29', repeat: '41%', resGap: '55%', intent: 'Refund' },
  { id: 'C-9534', name: 'Amit Joshi',     tier: 'SMB',        value: '₹0.5L', score: 88, sentiment: '−0.52', repeat: '50%', resGap: '78%', intent: 'Service Down' },
]

const MEDIUM_RISK_CUSTOMERS = [
  { id: 'C-2210', name: 'Rohan Mehta',   tier: 'SMB',        value: '₹0.6L', score: 54, sentiment: '−0.18', repeat: '28%', resGap: '41%', intent: 'Billing' },
  { id: 'C-3381', name: 'Divya Nair',    tier: 'Enterprise', value: '₹2.1L', score: 48, sentiment: '−0.12', repeat: '22%', resGap: '38%', intent: 'Integration' },
  { id: 'C-5512', name: 'Karan Gupta',   tier: 'SMB',        value: '₹0.4L', score: 51, sentiment: '−0.21', repeat: '31%', resGap: '44%', intent: 'Refund' },
]

const LOW_RISK_CUSTOMERS = [
  { id: 'C-1190', name: 'Ananya Singh',  tier: 'Enterprise', value: '₹3.8L', score: 14, sentiment: '+0.22', repeat: '9%',  resGap: '12%', intent: 'Delivery' },
  { id: 'C-6670', name: 'Nikhil Rao',   tier: 'SMB',        value: '₹0.3L', score: 21, sentiment: '+0.15', repeat: '11%', resGap: '18%', intent: 'Billing' },
  { id: 'C-8843', name: 'Priya Kapoor',  tier: 'SMB',        value: '₹0.2L', score: 17, sentiment: '+0.19', repeat: '8%',  resGap: '14%', intent: 'Delivery' },
]

const TIERS = [
  {
    id: 'high',
    label: 'High Risk',
    dotColor: '#ef4444',
    customers: HIGH_RISK_CUSTOMERS,
    totalTickets: 81,
    avgScore: 79,
    defaultOpen: true,
    narrative: 'High-risk customers are experiencing compounding failure signals — repeat escalations on Service Down and Refund intents, combined with deeply negative sentiment trajectories. Without proactive outreach, this group has a >70% churn probability within 30 days.',
    stats: [
      { label: 'Avg Sentiment Drift', value: '−0.41', type: 'neg' },
      { label: 'Avg Repeat Rate',     value: '44%',   type: 'amber' },
      { label: 'Avg Resolution Gap',  value: '67%',   type: 'amber' },
    ],
    painPoints: [
      { name: 'Refund',       count: '2', pct: '50%' },
      { name: 'Service Down', count: '2', pct: '50%' },
    ],
    segments: [
      { name: 'SMB',        count: '3' },
      { name: 'Enterprise', count: '1' },
    ],
  },
  {
    id: 'medium',
    label: 'Medium Risk',
    dotColor: '#f59e0b',
    customers: MEDIUM_RISK_CUSTOMERS,
    totalTickets: 38,
    avgScore: 51,
    defaultOpen: false,
    narrative: 'Medium-risk customers show early signs of frustration — primarily around billing disputes and integration friction. Intervention at this stage has a high success rate and prevents migration to the high-risk tier.',
    stats: [
      { label: 'Avg Sentiment Drift', value: '−0.17', type: 'neg' },
      { label: 'Avg Repeat Rate',     value: '27%',   type: 'amber' },
      { label: 'Avg Resolution Gap',  value: '41%',   type: 'amber' },
    ],
    painPoints: [
      { name: 'Billing',     count: '1', pct: '33%' },
      { name: 'Integration', count: '1', pct: '33%' },
      { name: 'Refund',      count: '1', pct: '33%' },
    ],
    segments: [
      { name: 'SMB',        count: '2' },
      { name: 'Enterprise', count: '1' },
    ],
  },
  {
    id: 'low',
    label: 'Low Risk',
    dotColor: '#10b981',
    customers: LOW_RISK_CUSTOMERS,
    totalTickets: 22,
    avgScore: 17,
    defaultOpen: false,
    narrative: 'Low-risk customers are generally satisfied and show positive sentiment trajectories. Focus should be on retention offers and upsell opportunities rather than reactive intervention.',
    stats: [
      { label: 'Avg Sentiment Drift', value: '+0.19', type: 'pos' },
      { label: 'Avg Repeat Rate',     value: '9%',    type: 'ok' },
      { label: 'Avg Resolution Gap',  value: '15%',   type: 'ok' },
    ],
    painPoints: [
      { name: 'Delivery', count: '2', pct: '67%' },
      { name: 'Billing',  count: '1', pct: '33%' },
    ],
    segments: [
      { name: 'SMB',        count: '2' },
      { name: 'Enterprise', count: '1' },
    ],
  },
]

function intentPillClass(intent) {
  if (intent === 'Refund')       return 'refund'
  if (intent === 'Service Down') return 'service'
  return 'billing'
}

function AccordionTier({ tier, onCustomerClick }) {
  const [open, setOpen] = useState(tier.defaultOpen)

  return (
    <div className="cmg2-accordion-item">
      <div
        className="cmg2-accordion-hd"
        onClick={() => setOpen(o => !o)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setOpen(o => !o)}
        aria-expanded={open}
      >
        <span className="cmg2-accordion-dot" style={{ background: tier.dotColor }} />
        <span className="cmg2-accordion-label">{tier.label}</span>
        <span className="cmg2-accordion-meta">
          {tier.customers.length} customers · {tier.totalTickets} total tickets
        </span>
        <span className="cmg2-accordion-avg" style={{ marginLeft: 16 }}>
          Avg Score {tier.avgScore}
        </span>
        <span className={`cmg2-accordion-arrow${open ? ' open' : ''}`}>▼</span>
      </div>

      {open && (
        <div className="cmg2-accordion-body">
          <p className="cmg2-accordion-narrative">{tier.narrative}</p>

          <div className="cmg2-stat-tiles-row">
            {tier.stats.map(s => (
              <div key={s.label} className="cmg2-mini-tile">
                <div className={`cmg2-mini-tile-val${s.type === 'amber' ? ' amber' : s.type === 'ok' ? '' : ''}`}
                  style={s.type === 'pos' ? { color: 'var(--accent-success)' } : s.type === 'ok' ? { color: 'var(--dark-teal)' } : {}}
                >
                  {s.value}
                </div>
                <div className="cmg2-mini-tile-label">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="cmg2-pain-seg-row">
            <div>
              <div className="cmg2-seg-title">Top Pain Points</div>
              {tier.painPoints.map(p => (
                <div key={p.name} className="cmg2-seg-item">
                  <div className="a-bar-track" style={{ flex: 1, height: 4 }}>
                    <div className="a-bar-fill" style={{ width: p.pct }} />
                  </div>
                  <span className="cmg2-seg-name" style={{ flex: 'unset', width: 90 }}>{p.name}</span>
                  <span className="cmg2-seg-count">{p.count}</span>
                  <span className="cmg2-seg-pct">{p.pct}</span>
                </div>
              ))}
            </div>
            <div>
              <div className="cmg2-seg-title">Segment Distribution</div>
              {tier.segments.map(s => (
                <div key={s.name} className="cmg2-seg-item">
                  <span className="cmg2-seg-name">{s.name}</span>
                  <span className="cmg2-seg-count">{s.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ overflowX: 'auto', border: '1px solid var(--nebula)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            <table className="cmg2-customer-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Score</th>
                  <th>Sentiment</th>
                  <th>Repeat %</th>
                  <th>Res. Gap</th>
                  <th>Top Intent</th>
                </tr>
              </thead>
              <tbody>
                {tier.customers.map(c => (
                  <tr key={c.id} onClick={() => onCustomerClick(c)}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{c.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: .7 }}>
                        {c.id} · {c.tier} · {c.value}
                      </div>
                    </td>
                    <td style={{ fontWeight: 600 }}>{c.score}</td>
                    <td className="cmg2-val-neg">{c.sentiment}</td>
                    <td className="cmg2-val-warn">{c.repeat}</td>
                    <td className="cmg2-val-warn">{c.resGap}</td>
                    <td>
                      <span className={`cmg2-intent-pill ${intentPillClass(c.intent)}`}>{c.intent}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CMGCustomerList({ onCustomerClick }) {
  const [query, setQuery] = useState('')

  return (
    <>
      <div className="cmg2-search-wrap">
        <span className="cmg2-search-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="m21 21-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          className="cmg2-search-input"
          type="text"
          placeholder="Search by name, ID, segment, or intent…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </div>

      <div className="cmg2-accordion">
        {TIERS.map(tier => (
          <AccordionTier key={tier.id} tier={tier} onCustomerClick={onCustomerClick} />
        ))}
      </div>
    </>
  )
}
