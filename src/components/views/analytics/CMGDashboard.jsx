const METRICS = [
  {
    id: 'churn',
    label: 'Churn Risk (High)',
    stat: '27%',
    trend: '↑ 3.2% vs last month',
    trendType: 'neg',
    iconBg: 'rgba(239,68,68,0.1)',
    iconColor: '#ef4444',
  },
  {
    id: 'sentiment',
    label: 'Sentiment Drift',
    stat: '−0.14',
    trend: '↓ 8% worsening',
    trendType: 'neg',
    iconBg: 'rgba(249,115,22,0.1)',
    iconColor: '#f97316',
  },
  {
    id: 'repeat',
    label: 'Repeat Issue Rate',
    stat: '24%',
    trend: '↑ 2.1% vs last month',
    trendType: 'warn',
    iconBg: 'rgba(20,184,166,0.1)',
    iconColor: '#14b8a6',
  },
  {
    id: 'resolution',
    label: 'Resolution Gap',
    stat: '38%',
    trend: '↓ 4.5% improving',
    trendType: 'pos',
    iconBg: 'rgba(245,158,11,0.1)',
    iconColor: '#f59e0b',
  },
  {
    id: 'velocity',
    label: 'Contact Velocity (High)',
    stat: '28%',
    trend: '↑ 5.3% accelerating',
    trendType: 'neg',
    iconBg: 'rgba(236,72,153,0.1)',
    iconColor: '#ec4899',
  },
  {
    id: 'recovery',
    label: 'Recovery Rate',
    stat: '28%',
    trend: '↑ 6.2% improving',
    trendType: 'pos',
    iconBg: 'rgba(16,185,129,0.1)',
    iconColor: '#10b981',
  },
]

const AT_RISK = [
  { id: 'C-1042', name: 'Priya Sharma',   score: 82, intent: 'Refund',       tickets: 24, lastContact: '2d', tier: 'Enterprise', value: '₹4.2L' },
  { id: 'C-4455', name: 'Vikram Patel',   score: 76, intent: 'Service Down', tickets: 19, lastContact: '1d', tier: 'SMB',        value: '₹0.9L' },
  { id: 'C-7743', name: 'Sneha Kulkarni', score: 71, intent: 'Refund',       tickets: 16, lastContact: '1d', tier: 'SMB',        value: '₹0.7L' },
  { id: 'C-9534', name: 'Amit Joshi',     score: 88, intent: 'Service Down', tickets: 22, lastContact: '0d', tier: 'SMB',        value: '₹0.5L' },
]

function MetricIcon({ id, color, bg }) {
  const paths = {
    churn:      'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z',
    sentiment:  'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z',
    repeat:     'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0020 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 004 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z',
    resolution: 'M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z',
    velocity:   'M13 2.05V5.08c3.39.49 6 3.39 6 6.92 0 2.74-1.56 5.13-3.89 6.4L13 17v-5h-2v5l-2.11 1.4C6.56 17.13 5 14.74 5 12c0-3.53 2.61-6.43 6-6.92V2.05C6.17 2.56 3 6.92 3 12c0 3.54 1.78 6.64 4.5 8.55V22h9v-1.45C19.22 18.63 21 15.54 21 12c0-5.08-3.17-9.44-8-9.95z',
    recovery:   'M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z',
  }
  return (
    <div className="cmg2-metric-icon" style={{ background: bg }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d={paths[id]} fill={color} />
      </svg>
    </div>
  )
}

export default function CMGDashboard({ onMetricClick, onCustomerClick }) {
  return (
    <>
      {/* 6 metric cards */}
      <div className="cmg2-metric-grid">
        {METRICS.map(m => (
          <div
            key={m.id}
            className="cmg2-metric-card"
            onClick={() => onMetricClick(m.id)}
            role="button"
            tabIndex={0}
            onKeyDown={e => e.key === 'Enter' && onMetricClick(m.id)}
          >
            <div className="cmg2-metric-card-top">
              <span className="cmg2-metric-label">{m.label}</span>
              <MetricIcon id={m.id} color={m.iconColor} bg={m.iconBg} />
            </div>
            <div className="cmg2-metric-stat">{m.stat}</div>
            <div className={`cmg2-metric-trend ${m.trendType}`}>{m.trend}</div>
          </div>
        ))}
      </div>

      {/* Cross-metric divergence alert */}
      <div className="cmg2-alert-banner">
        <div className="cmg2-alert-heading">⚠️ Cross-Metric Divergence Alert</div>
        <p className="cmg2-alert-text">
          Customers with{' '}
          <b style={{ color: '#b91c1c' }}>high churn risk</b> are simultaneously showing{' '}
          <b style={{ color: '#be185d' }}>accelerating contact velocity</b> (+5.3%) and a{' '}
          <b style={{ color: '#c2410c' }}>worsening sentiment drift</b> (−0.14).
          This convergence of 3 risk signals across 27% of the customer base indicates a potential{' '}
          <b style={{ color: '#b45309' }}>escalation wave within 14 days</b>.
          The current recovery rate of 28% is insufficient to offset the ongoing churn pressure.
        </p>
      </div>

      {/* At-risk customers */}
      <div>
        <div className="cmg2-section-hd">
          <div className="cmg2-section-title">At-Risk Customers</div>
          <div style={{ fontSize: '12px', color: 'var(--cutty-sark)', opacity: .65 }}>Sorted by risk score</div>
        </div>
        <div className="cmg2-at-risk-list">
          {AT_RISK.map(c => (
            <div
              key={c.id}
              className="cmg2-at-risk-row"
              onClick={() => onCustomerClick(c)}
              role="button"
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onCustomerClick(c)}
            >
              <div className="cmg2-score-circle">{c.score}</div>
              <div className="cmg2-customer-info">
                <div className="cmg2-customer-name">
                  {c.name}{' '}
                  <span style={{ fontWeight: 400, color: 'var(--cutty-sark)', opacity: .65 }}>{c.id}</span>
                </div>
                <div className="cmg2-customer-meta">
                  {c.intent} · {c.tickets} tickets · Last {c.lastContact}{c.lastContact !== '0d' ? ' ago' : ' (today)'}
                </div>
              </div>
              <div className="cmg2-customer-right">
                <span className={`cmg2-tier-badge ${c.tier.toLowerCase()}`}>{c.tier}</span>
                <span className="cmg2-customer-value">{c.value}</span>
                <span className="cmg2-row-arrow">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
