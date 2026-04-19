import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  LineChart, Line,
  AreaChart, Area,
  ResponsiveContainer, Legend,
} from 'recharts'

const TEAL    = '#14b8a6'
const AMBER   = '#f59e0b'
const RED     = '#ef4444'
const PURPLE  = '#8b5cf6'
const PINK    = '#ec4899'
const GREEN   = '#10b981'
const CORAL   = '#f97316'

/* ── Shared tooltip style ─────────────────────────────────────── */
const tooltipStyle = {
  contentStyle: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    fontSize: 12,
    fontFamily: 'Plus Jakarta Sans, sans-serif',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
  },
  labelStyle: { color: '#1f4141', fontWeight: 600 },
  itemStyle: { color: '#5b7f7f' },
}

/* ── Back arrow + title wrapper ───────────────────────────────── */
function DetailShell({ title, onBack, children }) {
  return (
    <>
      <button className="cmg2-back-link" onClick={onBack}>
        ← Back to Dashboard
      </button>
      <div className="cmg2-detail-title">{title}</div>
      {children}
    </>
  )
}

/* ══════════════════════════════════════════════════════════════
   CHURN RISK
   ══════════════════════════════════════════════════════════════ */
function ChurnDetail({ onBack }) {
  const donutData = [
    { name: 'Low', value: 42 },
    { name: 'Medium', value: 31 },
    { name: 'High', value: 27 },
  ]
  const donutColors = [TEAL, AMBER, RED]

  const revenueData = [
    { seg: 'Enterprise', atRisk: 58, safe: 42 },
    { seg: 'Mid-Market', atRisk: 34, safe: 66 },
    { seg: 'SMB',        atRisk: 71, safe: 29 },
  ]

  return (
    <DetailShell title="Churn Risk Distribution" onBack={onBack}>
      <div className="a-2col">
        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Risk Band Distribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={false}
                labelLine={false}
              >
                {donutData.map((_, i) => <Cell key={i} fill={donutColors[i]} />)}
              </Pie>
              <Tooltip {...tooltipStyle} formatter={v => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 4 }}>
            {donutData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--cutty-sark)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: donutColors[i], flexShrink: 0 }} />
                {d.name} {d.value}%
              </div>
            ))}
          </div>
        </div>

        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Revenue at Risk by Segment (%)</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={revenueData} margin={{ top: 4, right: 8, left: -10, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="seg" tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} />
              <YAxis tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} unit="%" />
              <Tooltip {...tooltipStyle} formatter={v => `${v}%`} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'Plus Jakarta Sans' }} />
              <Bar dataKey="atRisk" name="At Risk" fill={PINK} radius={[3,3,0,0]} />
              <Bar dataKey="safe"   name="Safe"    fill="#134e4a" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DetailShell>
  )
}

/* ══════════════════════════════════════════════════════════════
   SENTIMENT DRIFT
   ══════════════════════════════════════════════════════════════ */
function SentimentDetail({ onBack }) {
  const lineData = [
    { stage: 'Open',       score:  0.55 },
    { stage: 'Probing',    score:  0.38 },
    { stage: 'Hold',       score:  0.18 },
    { stage: 'Resolution', score: -0.14 },
    { stage: 'Close',      score:  0.08 },
  ]

  const triggers = [
    { name: '"You told me this was resolved"',       drop: '−0.42' },
    { name: '"I\'ve been waiting for 3 days"',       drop: '−0.38' },
    { name: '"No one is following up"',              drop: '−0.31' },
    { name: '"The replacement doesn\'t work either"',drop: '−0.28' },
  ]

  return (
    <DetailShell title="Sentiment Drift Through Journey" onBack={onBack}>
      <div className="cmg2-chart-card" style={{ marginBottom: 16 }}>
        <div className="cmg2-chart-title">Sentiment Score by Conversation Stage</div>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={lineData} margin={{ top: 4, right: 12, left: -20, bottom: 4 }}>
            <defs>
              <linearGradient id="sentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={PURPLE} stopOpacity={0.25} />
                <stop offset="95%" stopColor={PURPLE} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} />
            <YAxis domain={[-0.3, 0.7]} tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} />
            <Tooltip {...tooltipStyle} />
            <Area type="monotone" dataKey="score" name="Sentiment" stroke={PURPLE} fill="url(#sentGrad)" strokeWidth={2.5} dot={{ fill: PURPLE, r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="a-2col">
        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Key Insight</div>
          <p className="cmg2-insight-text">
            Sentiment starts <b style={{ color: GREEN }}>positive at Open (+0.55)</b> but collapses
            sharply during the <b style={{ color: RED }}>Hold phase</b>, reaching its lowest at Resolution (−0.14).
            The partial recovery at Close (+0.08) is insufficient — customers remember the trough,
            not the ending.
          </p>
        </div>

        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Top Frustration Triggers</div>
          <div className="cmg2-trigger-list">
            {triggers.map((t, i) => (
              <div key={i} className="cmg2-trigger-item">
                <span className="cmg2-trigger-name">{t.name}</span>
                <span className="cmg2-trigger-drop">{t.drop}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DetailShell>
  )
}

/* ══════════════════════════════════════════════════════════════
   REPEAT ISSUE RATE
   ══════════════════════════════════════════════════════════════ */
function RepeatDetail({ onBack }) {
  const intentData = [
    { intent: 'Refund',       rate: 38 },
    { intent: 'Billing',      rate: 29 },
    { intent: 'Service Down', rate: 44 },
    { intent: 'Integration',  rate: 21 },
    { intent: 'Delivery',     rate: 17 },
  ]

  const trendData = [
    { month: 'Oct', rate: 16 },
    { month: 'Nov', rate: 18 },
    { month: 'Dec', rate: 19 },
    { month: 'Jan', rate: 21 },
    { month: 'Feb', rate: 22 },
    { month: 'Mar', rate: 24 },
  ]

  return (
    <DetailShell title="Repeat Issue Rate" onBack={onBack}>
      <div className="a-2col">
        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Repeat Rate by Intent (%)</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={intentData} layout="vertical" margin={{ top: 4, right: 12, left: 60, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} unit="%" />
              <YAxis type="category" dataKey="intent" tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} />
              <Tooltip {...tooltipStyle} formatter={v => `${v}%`} />
              <Bar dataKey="rate" name="Repeat Rate" fill={PURPLE} radius={[0,3,3,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">6-Month Trend</div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={trendData} margin={{ top: 4, right: 12, left: -20, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} />
              <YAxis domain={[10, 30]} tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} unit="%" />
              <Tooltip {...tooltipStyle} formatter={v => `${v}%`} />
              <Line type="monotone" dataKey="rate" name="Rate" stroke={PURPLE} strokeWidth={2.5} dot={{ fill: PURPLE, r: 5 }} activeDot={{ r: 7 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </DetailShell>
  )
}

/* ══════════════════════════════════════════════════════════════
   RESOLUTION GAP
   ══════════════════════════════════════════════════════════════ */
function ResolutionDetail({ onBack }) {
  const gapData = [
    { type: 'Full Refund',  gap: 62 },
    { type: 'Replacement',  gap: 48 },
    { type: 'Credit',       gap: 71 },
    { type: 'Escalation',   gap: 38 },
    { type: 'Info Only',    gap: 29 },
  ]

  return (
    <DetailShell title="Resolution Satisfaction Gap" onBack={onBack}>
      <div className="a-2col">
        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Gap % by Resolution Type</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={gapData} layout="vertical" margin={{ top: 4, right: 12, left: 70, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} unit="%" />
              <YAxis type="category" dataKey="type" tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} />
              <Tooltip {...tooltipStyle} formatter={v => `${v}%`} />
              <Bar dataKey="gap" name="Gap" fill={AMBER} radius={[0,3,3,0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="cmg2-chart-card" style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'space-between' }}>
          <div>
            <div className="cmg2-chart-title">Sentiment Impact</div>
            <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
              <div className="cmg2-stat-tile" style={{ flex: 1 }}>
                <div className="cmg2-stat-tile-val neg">−0.38</div>
                <div className="cmg2-stat-tile-label">With Resolution Gap</div>
              </div>
              <div className="cmg2-stat-tile" style={{ flex: 1 }}>
                <div className="cmg2-stat-tile-val pos">+0.21</div>
                <div className="cmg2-stat-tile-label">Without Gap</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: -8 }}>
            <p className="cmg2-insight-text" style={{ marginBottom: 16 }}>
              <b>Credit resolutions</b> have the highest gap (71%) — customers expect full refunds.
            </p>
            <p className="cmg2-insight-text">
              <b>Escalation</b> paths perform best (38% gap), suggesting direct human intervention
              still meaningfully closes the expectation-outcome distance.
            </p>
          </div>
        </div>
      </div>
    </DetailShell>
  )
}

/* ══════════════════════════════════════════════════════════════
   CONTACT VELOCITY
   ══════════════════════════════════════════════════════════════ */
function VelocityDetail({ onBack, onCustomerClick }) {
  const donutData = [
    { name: 'Low',    value: 38 },
    { name: 'Medium', value: 34 },
    { name: 'High',   value: 28 },
  ]
  const donutColors = [TEAL, AMBER, RED]

  const accelData = [
    { id: 'C-1042', name: 'Priya Sharma',   intent: 'Refund',       tickets: 24, tier: 'Enterprise', value: '₹4.2L', score: 82 },
    { id: 'C-4455', name: 'Vikram Patel',   intent: 'Service Down', tickets: 19, tier: 'SMB',        value: '₹0.9L', score: 76 },
    { id: 'C-7743', name: 'Sneha Kulkarni', intent: 'Refund',       tickets: 16, tier: 'SMB',        value: '₹0.7L', score: 71 },
  ]

  return (
    <DetailShell title="Customer Contact Velocity" onBack={onBack}>
      <div className="a-2col">
        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Velocity Band Distribution</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={donutData}
                cx="50%" cy="50%"
                innerRadius={60} outerRadius={90}
                paddingAngle={3}
                dataKey="value"
                label={false}
                labelLine={false}
              >
                {donutData.map((_, i) => <Cell key={i} fill={donutColors[i]} />)}
              </Pie>
              <Tooltip {...tooltipStyle} formatter={v => `${v}%`} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 4 }}>
            {donutData.map((d, i) => (
              <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--cutty-sark)' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: donutColors[i], flexShrink: 0 }} />
                {d.name} {d.value}%
              </div>
            ))}
          </div>
        </div>

        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Top Accelerating Customers</div>
          <div>
            {accelData.map(c => (
              <div
                key={c.id}
                className="cmg2-accel-row"
                style={{ cursor: 'pointer' }}
                onClick={() => onCustomerClick(c)}
              >
                <div className="cmg2-score-circle" style={{ width: 32, height: 32, fontSize: 12 }}>{c.score}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: 'var(--dark-teal)' }}>{c.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--cutty-sark)', opacity: .7 }}>{c.tickets} tickets · {c.intent}</div>
                </div>
                <span className="cmg2-high-badge">High</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DetailShell>
  )
}

/* ══════════════════════════════════════════════════════════════
   RECOVERY RATE
   ══════════════════════════════════════════════════════════════ */
function RecoveryDetail({ onBack }) {
  const trendData = [
    { month: 'Oct', rate: 18 },
    { month: 'Nov', rate: 20 },
    { month: 'Dec', rate: 22 },
    { month: 'Jan', rate: 23 },
    { month: 'Feb', rate: 25 },
    { month: 'Mar', rate: 28 },
  ]

  const segments = [
    { label: 'Recovered',     pct: 28, color: GREEN },
    { label: 'Recovering',    pct: 34, color: AMBER },
    { label: 'Not Recovered', pct: 38, color: RED },
  ]

  return (
    <DetailShell title="Recovery Rate" onBack={onBack}>
      <div className="cmg2-chart-card" style={{ marginBottom: 16 }}>
        <div className="cmg2-chart-title">Recovery Rate Trend — 6 Months</div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={trendData} margin={{ top: 4, right: 12, left: -20, bottom: 4 }}>
            <defs>
              <linearGradient id="recGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={TEAL} stopOpacity={0.3} />
                <stop offset="95%" stopColor={TEAL} stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} />
            <YAxis domain={[10, 35]} tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} unit="%" />
            <Tooltip {...tooltipStyle} formatter={v => `${v}%`} />
            <Area type="monotone" dataKey="rate" name="Recovery Rate" stroke={TEAL} fill="url(#recGrad)" strokeWidth={2.5} dot={{ fill: TEAL, r: 4 }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="a-2col">
        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Recovery Status Breakdown</div>
          {segments.map(s => (
            <div key={s.label} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 'var(--font-sm)', color: 'var(--dark-teal)' }}>{s.label}</span>
                <span style={{ fontSize: 'var(--font-sm)', fontWeight: 600, color: s.color }}>{s.pct}%</span>
              </div>
              <div className="a-bar-track">
                <div className="a-bar-fill" style={{ width: `${s.pct}%`, background: s.color }} />
              </div>
            </div>
          ))}
        </div>

        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Key Insight</div>
          <p className="cmg2-insight-text">
            Recovery is improving — up from <b style={{ color: TEAL }}>18% in October to 28% in March</b>.
            However, <b style={{ color: RED }}>38% remain unrecovered</b>, with the "Recovering" cohort (34%)
            stalling at the same sentiment trough seen in Resolution stage.
            Targeted follow-up within <b>48h post-resolution</b> has shown a 2× recovery lift in pilot cases.
          </p>
        </div>
      </div>
    </DetailShell>
  )
}

/* ══════════════════════════════════════════════════════════════
   ROOT: CMGMetricDetail
   ══════════════════════════════════════════════════════════════ */
export default function CMGMetricDetail({ metric, onBack, onCustomerClick }) {
  switch (metric) {
    case 'churn':      return <ChurnDetail      onBack={onBack} />
    case 'sentiment':  return <SentimentDetail  onBack={onBack} />
    case 'repeat':     return <RepeatDetail     onBack={onBack} />
    case 'resolution': return <ResolutionDetail onBack={onBack} />
    case 'velocity':   return <VelocityDetail   onBack={onBack} onCustomerClick={onCustomerClick} />
    case 'recovery':   return <RecoveryDetail   onBack={onBack} />
    default:           return <div style={{ padding: 24, color: 'var(--cutty-sark)' }}>Unknown metric: {metric}</div>
  }
}
