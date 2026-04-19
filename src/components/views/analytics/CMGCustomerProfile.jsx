import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts'

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
}

/* Profile data keyed by customer ID for rich mock data */
const PROFILE_DATA = {
  'C-1042': {
    tiles: [
      { label: 'Sentiment Drift',    value: '−0.34', type: 'neg' },
      { label: 'Repeat Issue Rate',  value: '38%',   type: 'warn' },
      { label: 'Resolution Gap',     value: '62%',   type: 'warn' },
      { label: 'Contact Velocity',   value: 'High',  type: 'neg' },
      { label: 'Total Tickets',      value: '24',    type: 'ok' },
      { label: 'Recovery Status',    value: 'At Risk', type: 'neg' },
    ],
    radar: [
      { axis: 'Churn Risk',   value: 82 },
      { axis: 'Repeat Rate',  value: 76 },
      { axis: 'Velocity',     value: 88 },
      { axis: 'Res. Gap',     value: 62 },
      { axis: 'Sentiment',    value: 68 },
    ],
    velocity: [
      { week: 'W1', contacts: 2 },
      { week: 'W2', contacts: 3 },
      { week: 'W3', contacts: 3 },
      { week: 'W4', contacts: 5 },
      { week: 'W5', contacts: 5 },
      { week: 'W6', contacts: 7 },
      { week: 'W7', contacts: 9 },
    ],
    narrative: 'Priya has opened 24 tickets over 7 weeks, with an accelerating contact pattern that doubled in frequency in the last 14 days. Her primary pain point is a repeated Refund intent — the same issue has been raised 4 times, each time escalating. Sentiment collapsed at the Resolution stage (−0.34) after two consecutive failed refund attempts. Recommended action: assign a dedicated account manager and initiate a proactive full-refund with an apology credit within 24 hours.',
  },
  'C-4455': {
    tiles: [
      { label: 'Sentiment Drift',    value: '−0.48', type: 'neg' },
      { label: 'Repeat Issue Rate',  value: '45%',   type: 'warn' },
      { label: 'Resolution Gap',     value: '71%',   type: 'warn' },
      { label: 'Contact Velocity',   value: 'High',  type: 'neg' },
      { label: 'Total Tickets',      value: '19',    type: 'ok' },
      { label: 'Recovery Status',    value: 'At Risk', type: 'neg' },
    ],
    radar: [
      { axis: 'Churn Risk',  value: 76 },
      { axis: 'Repeat Rate', value: 82 },
      { axis: 'Velocity',    value: 71 },
      { axis: 'Res. Gap',    value: 71 },
      { axis: 'Sentiment',   value: 78 },
    ],
    velocity: [
      { week: 'W1', contacts: 1 },
      { week: 'W2', contacts: 2 },
      { week: 'W3', contacts: 3 },
      { week: 'W4', contacts: 4 },
      { week: 'W5', contacts: 5 },
      { week: 'W6', contacts: 7 },
      { week: 'W7', contacts: 8 },
    ],
    narrative: 'Vikram is an SMB customer with a recurring Service Down issue that has not been permanently resolved. Each recurrence deepens the trust deficit — sentiment has dropped to −0.48, the most negative in the high-risk cohort. The 71% resolution gap suggests that past fixes have been temporary band-aids. A root-cause engineering investigation is needed alongside a direct call from the support head.',
  },
  'C-7743': {
    tiles: [
      { label: 'Sentiment Drift',    value: '−0.29', type: 'neg' },
      { label: 'Repeat Issue Rate',  value: '41%',   type: 'warn' },
      { label: 'Resolution Gap',     value: '55%',   type: 'warn' },
      { label: 'Contact Velocity',   value: 'High',  type: 'neg' },
      { label: 'Total Tickets',      value: '16',    type: 'ok' },
      { label: 'Recovery Status',    value: 'Recovering', type: 'warn' },
    ],
    radar: [
      { axis: 'Churn Risk',  value: 71 },
      { axis: 'Repeat Rate', value: 74 },
      { axis: 'Velocity',    value: 68 },
      { axis: 'Res. Gap',    value: 55 },
      { axis: 'Sentiment',   value: 58 },
    ],
    velocity: [
      { week: 'W1', contacts: 1 },
      { week: 'W2', contacts: 2 },
      { week: 'W3', contacts: 2 },
      { week: 'W4', contacts: 3 },
      { week: 'W5', contacts: 4 },
      { week: 'W6', contacts: 5 },
      { week: 'W7', contacts: 7 },
    ],
    narrative: 'Sneha shows signs of early recovery — sentiment, while negative (−0.29), has stopped deteriorating over the last week. However, the 41% repeat rate on Refund intent indicates the root cause remains unresolved. She is categorised as "Recovering" and may stabilise if the current refund case is closed successfully. Priority: close open ticket C-7743-R4 within 48 hours.',
  },
  'C-9534': {
    tiles: [
      { label: 'Sentiment Drift',    value: '−0.52', type: 'neg' },
      { label: 'Repeat Issue Rate',  value: '50%',   type: 'warn' },
      { label: 'Resolution Gap',     value: '78%',   type: 'warn' },
      { label: 'Contact Velocity',   value: 'High',  type: 'neg' },
      { label: 'Total Tickets',      value: '22',    type: 'ok' },
      { label: 'Recovery Status',    value: 'At Risk', type: 'neg' },
    ],
    radar: [
      { axis: 'Churn Risk',  value: 88 },
      { axis: 'Repeat Rate', value: 88 },
      { axis: 'Velocity',    value: 82 },
      { axis: 'Res. Gap',    value: 78 },
      { axis: 'Sentiment',   value: 84 },
    ],
    velocity: [
      { week: 'W1', contacts: 2 },
      { week: 'W2', contacts: 3 },
      { week: 'W3', contacts: 5 },
      { week: 'W4', contacts: 6 },
      { week: 'W5', contacts: 7 },
      { week: 'W6', contacts: 9 },
      { week: 'W7', contacts: 11 },
    ],
    narrative: 'Amit has the highest risk score (88) in the entire customer base. The Service Down issue has been raised on 11 separate occasions — the highest repeat rate (50%) across all customers. His sentiment trajectory is the steepest negative gradient observed, and the 78% resolution gap confirms that proposed fixes have consistently failed to meet expectations. Immediate escalation to engineering leadership is required; this customer is days away from churn.',
  },
}

const FALLBACK_PROFILE = {
  tiles: [
    { label: 'Sentiment Drift',   value: '−0.18', type: 'neg' },
    { label: 'Repeat Issue Rate', value: '28%',   type: 'warn' },
    { label: 'Resolution Gap',    value: '41%',   type: 'warn' },
    { label: 'Contact Velocity',  value: 'Medium', type: 'ok' },
    { label: 'Total Tickets',     value: '12',     type: 'ok' },
    { label: 'Recovery Status',   value: 'Recovering', type: 'warn' },
  ],
  radar: [
    { axis: 'Churn Risk',  value: 51 },
    { axis: 'Repeat Rate', value: 48 },
    { axis: 'Velocity',    value: 55 },
    { axis: 'Res. Gap',    value: 41 },
    { axis: 'Sentiment',   value: 44 },
  ],
  velocity: [
    { week: 'W1', contacts: 1 },
    { week: 'W2', contacts: 1 },
    { week: 'W3', contacts: 2 },
    { week: 'W4', contacts: 2 },
    { week: 'W5', contacts: 3 },
    { week: 'W6', contacts: 4 },
    { week: 'W7', contacts: 5 },
  ],
  narrative: 'This customer shows medium-risk signals across multiple dimensions. Proactive outreach and a structured follow-up plan are recommended to prevent migration to the high-risk tier.',
}

function tileValClass(type) {
  if (type === 'neg')  return 'cmg2-profile-tile-val neg'
  if (type === 'warn') return 'cmg2-profile-tile-val warn'
  return 'cmg2-profile-tile-val ok'
}

export default function CMGCustomerProfile({ customer, backLabel, onBack }) {
  if (!customer) return null

  const profile = PROFILE_DATA[customer.id] || FALLBACK_PROFILE

  return (
    <>
      <button className="cmg2-back-link" onClick={onBack}>
        ← Back to {backLabel}
      </button>

      {/* Header */}
      <div className="cmg2-profile-name-row">
        <span className="cmg2-profile-name">{customer.name}</span>
        <span className="cmg2-risk-badge">High Risk — Score {customer.score}</span>
      </div>
      <div className="cmg2-profile-sub">
        {customer.id} · {customer.tier} · {customer.value}
      </div>

      {/* 6 mini metric tiles */}
      <div className="cmg2-profile-tiles">
        {profile.tiles.map(t => (
          <div key={t.label} className="cmg2-profile-tile">
            <div className="cmg2-profile-tile-label">{t.label}</div>
            <div className={tileValClass(t.type)}>{t.value}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="a-2col">
        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Risk Profile (Radar)</div>
          <ResponsiveContainer width="100%" height={240}>
            <RadarChart cx="50%" cy="50%" outerRadius={90} data={profile.radar}>
              <PolarGrid stroke="#e5e7eb" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }}
              />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name={customer.name}
                dataKey="value"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.25}
                strokeWidth={2}
              />
              <Tooltip
                {...tooltipStyle}
                formatter={v => `${v} / 100`}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="cmg2-chart-card">
          <div className="cmg2-chart-title">Contact Velocity Trend (7 Weeks)</div>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={profile.velocity} margin={{ top: 4, right: 12, left: -20, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} />
              <YAxis tick={{ fontSize: 11, fill: '#5b7f7f', fontFamily: 'Plus Jakarta Sans' }} allowDecimals={false} />
              <Tooltip {...tooltipStyle} formatter={v => `${v} contacts`} />
              <Line
                type="monotone"
                dataKey="contacts"
                name="Contacts"
                stroke="#ef4444"
                strokeWidth={2.5}
                dot={{ fill: '#ef4444', r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI narrative */}
      <div className="cmg2-narrative">
        <b>AI Insight — </b>
        {profile.narrative}
      </div>
    </>
  )
}
