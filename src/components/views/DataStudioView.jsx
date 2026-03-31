import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { DASHBOARDS_DATA, DV_CONFIGS_BY_ID, DV_ACTIVITY } from '../../data'

const LockIcon = (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
    <rect x="2" y="5.5" width="8" height="5.5" rx="1.2"/>
    <path d="M4 5.5V3.5a2 2 0 0 1 4 0v2"/>
  </svg>
)
const GlobeIcon = (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="4.5"/>
    <path d="M6 1.5C6 1.5 4 3.5 4 6s2 4.5 2 4.5M6 1.5c0 0 2 2 2 4.5S6 10.5 6 10.5M1.5 6h9"/>
  </svg>
)

const THUMB_SVGS = {
  /* d1 — Agent Performance Overview: horizontal bar chart */
  hbar: (
    <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
      <rect x="36" y="4"  width="110" height="7" rx="3.5" fill="#4DB6AC"/>
      <rect x="36" y="15" width="88"  height="7" rx="3.5" fill="#3B82F6" opacity="0.85"/>
      <rect x="36" y="26" width="130" height="7" rx="3.5" fill="#10B981" opacity="0.85"/>
      <rect x="36" y="37" width="74"  height="7" rx="3.5" fill="#F59E0B" opacity="0.85"/>
      <rect x="36" y="48" width="96"  height="7" rx="3.5" fill="#A78BFA" opacity="0.85"/>
      <line x1="36" y1="2" x2="36" y2="58" stroke="#C7D9D6" strokeWidth="1"/>
    </svg>
  ),
  /* d2 — CSAT & Quality Tracker: donut at 73% + small bar column */
  donut73: (
    <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
      <defs>
        <linearGradient id="dg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#4DB6AC"/>
          <stop offset="100%" stopColor="#10B981"/>
        </linearGradient>
      </defs>
      {/* donut — circumference ≈ 150.8, 73% ≈ 110 */}
      <circle cx="38" cy="30" r="24" fill="none" stroke="#ECF4F2" strokeWidth="10"/>
      <circle cx="38" cy="30" r="24" fill="none" stroke="url(#dg2)" strokeWidth="10"
        strokeDasharray="110 40.8" strokeLinecap="round" transform="rotate(-90 38 30)"/>
      <circle cx="38" cy="30" r="14" fill="white"/>
      <text x="38" y="34" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1F4141" fontFamily="Plus Jakarta Sans,sans-serif">73%</text>
      {/* mini bar sparklines on right */}
      <rect x="82"  y="38" width="9" height="18" rx="2" fill="#4DB6AC" opacity="0.6"/>
      <rect x="94"  y="28" width="9" height="28" rx="2" fill="#4DB6AC" opacity="0.8"/>
      <rect x="106" y="20" width="9" height="36" rx="2" fill="#4DB6AC"/>
      <rect x="118" y="24" width="9" height="32" rx="2" fill="#10B981" opacity="0.85"/>
      <rect x="130" y="14" width="9" height="42" rx="2" fill="#10B981"/>
      <rect x="142" y="30" width="9" height="26" rx="2" fill="#3B82F6" opacity="0.75"/>
      <rect x="154" y="10" width="9" height="46" rx="2" fill="#3B82F6"/>
    </svg>
  ),
  /* d3 — Volume & Trend Analysis: dual area chart */
  area: (
    <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ag3a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4DB6AC" stopOpacity="0.35"/>
          <stop offset="100%" stopColor="#4DB6AC" stopOpacity="0.02"/>
        </linearGradient>
        <linearGradient id="ag3b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      <path d="M0 52 C25 50 45 42 65 38 C85 34 110 20 135 14 C155 9 175 5 200 3 L200 60 L0 60 Z" fill="url(#ag3a)"/>
      <path d="M0 52 C25 50 45 42 65 38 C85 34 110 20 135 14 C155 9 175 5 200 3" stroke="#4DB6AC" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M0 56 C30 54 55 50 80 46 C105 42 130 34 160 28 C178 24 190 20 200 18 L200 60 L0 60 Z" fill="url(#ag3b)"/>
      <path d="M0 56 C30 54 55 50 80 46 C105 42 130 34 160 28 C178 24 190 20 200 18" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.7"/>
      <circle cx="200" cy="3" r="3" fill="#4DB6AC"/>
    </svg>
  ),
  /* d4 — AI-Powered Insights: three diverging lines */
  multiline: (
    <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
      {/* AI resolved — rising */}
      <path d="M0 54 C30 50 60 42 90 30 C120 18 155 10 200 5" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Human — declining */}
      <path d="M0 10 C35 14 70 22 100 32 C130 42 160 48 200 52" stroke="#4DB6AC" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Escalated — dotted flat */}
      <path d="M0 36 C50 34 100 32 150 30 C170 29 185 28 200 28" stroke="#A78BFA" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeDasharray="5 3" opacity="0.8"/>
      {/* crossover dot */}
      <circle cx="100" cy="31" r="3.5" fill="white" stroke="#4DB6AC" strokeWidth="1.5"/>
    </svg>
  ),
  /* d5 — Smart Escalation Monitor: scatter plot */
  scatter: (
    <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
      {/* safe cluster — bottom left */}
      <circle cx="22"  cy="48" r="4"   fill="#10B981" opacity="0.8"/>
      <circle cx="38"  cy="44" r="5"   fill="#10B981" opacity="0.7"/>
      <circle cx="52"  cy="50" r="3.5" fill="#4DB6AC" opacity="0.85"/>
      <circle cx="65"  cy="42" r="4.5" fill="#10B981" opacity="0.75"/>
      <circle cx="80"  cy="46" r="3"   fill="#4DB6AC" opacity="0.9"/>
      <circle cx="95"  cy="40" r="5"   fill="#4DB6AC" opacity="0.7"/>
      <circle cx="110" cy="44" r="4"   fill="#10B981" opacity="0.8"/>
      {/* medium risk */}
      <circle cx="125" cy="32" r="5"   fill="#F59E0B" opacity="0.8"/>
      <circle cx="140" cy="28" r="4"   fill="#F59E0B" opacity="0.75"/>
      <circle cx="152" cy="22" r="5.5" fill="#F59E0B" opacity="0.85"/>
      {/* high risk — top right */}
      <circle cx="165" cy="14" r="6"   fill="#F87171" opacity="0.85"/>
      <circle cx="178" cy="10" r="5"   fill="#F87171" opacity="0.9"/>
      <circle cx="188" cy="18" r="4.5" fill="#F87171" opacity="0.8"/>
    </svg>
  ),
  /* d6 — Operations Command Center: grouped vertical bars */
  bar: (
    <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
      <rect x="8"   y="28" width="12" height="28" rx="2" fill="#4DB6AC"/>
      <rect x="22"  y="38" width="12" height="18" rx="2" fill="#4DB6AC" opacity="0.35"/>
      <rect x="42"  y="14" width="12" height="42" rx="2" fill="#4DB6AC"/>
      <rect x="56"  y="22" width="12" height="34" rx="2" fill="#4DB6AC" opacity="0.35"/>
      <rect x="76"  y="20" width="12" height="36" rx="2" fill="#4DB6AC"/>
      <rect x="90"  y="28" width="12" height="28" rx="2" fill="#4DB6AC" opacity="0.35"/>
      <rect x="110" y="8"  width="12" height="48" rx="2" fill="#4DB6AC"/>
      <rect x="124" y="16" width="12" height="40" rx="2" fill="#4DB6AC" opacity="0.35"/>
      <rect x="144" y="24" width="12" height="32" rx="2" fill="#4DB6AC"/>
      <rect x="158" y="32" width="12" height="24" rx="2" fill="#4DB6AC" opacity="0.35"/>
      <rect x="178" y="34" width="12" height="22" rx="2" fill="#4DB6AC"/>
      <line x1="0" y1="57" x2="200" y2="57" stroke="#C7D9D6" strokeWidth="1"/>
    </svg>
  ),
  /* d7 — Compliance & Audit Board: step/staircase chart high near top */
  step: (
    <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
      <defs>
        <linearGradient id="sg7" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.25"/>
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.03"/>
        </linearGradient>
      </defs>
      <path d="M0 14 H40 V10 H70 V14 H95 V8 H120 V12 H145 V6 H170 V10 H200 L200 60 L0 60 Z" fill="url(#sg7)"/>
      <path d="M0 14 H40 V10 H70 V14 H95 V8 H120 V12 H145 V6 H170 V10 H200" stroke="#10B981" strokeWidth="2" fill="none" strokeLinecap="square"/>
      {/* violation dots */}
      <circle cx="60"  cy="26" r="3" fill="#F87171" opacity="0.9"/>
      <circle cx="108" cy="22" r="3" fill="#F87171" opacity="0.85"/>
      <circle cx="162" cy="18" r="2.5" fill="#F87171" opacity="0.8"/>
    </svg>
  ),
  /* d8 — Team Productivity Mix: stacked area bands */
  area2: (
    <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ag8a" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4DB6AC" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#4DB6AC" stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id="ag8b" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6"/>
        </linearGradient>
        <linearGradient id="ag8c" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10B981" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.5"/>
        </linearGradient>
      </defs>
      {/* bottom band — teal */}
      <path d="M0 44 C50 42 100 40 150 38 C175 37 190 36 200 36 L200 60 L0 60 Z" fill="url(#ag8a)"/>
      {/* middle band — blue */}
      <path d="M0 30 C50 28 100 26 150 24 C175 23 190 22 200 22 L200 36 C190 36 175 37 150 38 C100 40 50 42 0 44 Z" fill="url(#ag8b)"/>
      {/* top band — green */}
      <path d="M0 18 C50 16 100 13 150 11 C175 10 190 9 200 9 L200 22 C190 22 175 23 150 24 C100 26 50 28 0 30 Z" fill="url(#ag8c)"/>
    </svg>
  ),
}

const COLUMNS_BY_AREA = {
  tickets: [
    { key:'ticket_id',    label:'Ticket ID',    type:'varchar',  pre:true  },
    { key:'ticket_title', label:'Title',        type:'varchar',  pre:true  },
    { key:'status',       label:'Status',       type:'varchar',  pre:true  },
    { key:'assigned_to',  label:'Assigned To',  type:'string',   pre:true  },
    { key:'create_date',  label:'Created At',   type:'datetime', pre:true  },
    { key:'priority',     label:'Priority',     type:'varchar',  pre:false },
    { key:'queue',        label:'Queue',        type:'varchar',  pre:false },
    { key:'resolved_at',  label:'Resolved At',  type:'datetime', pre:false },
    { key:'handle_time',  label:'Handle Time',  type:'number',   pre:false },
    { key:'ticket_type',  label:'Type',         type:'varchar',  pre:false },
    { key:'sub_status',   label:'Sub-status',   type:'varchar',  pre:false },
    { key:'folder_name',  label:'Folder',       type:'varchar',  pre:false },
  ],
  agents: [
    { key:'agent_id',     label:'Agent ID',     type:'bigint',   pre:true  },
    { key:'agent_name',   label:'Name',         type:'string',   pre:true  },
    { key:'team',         label:'Team',         type:'varchar',  pre:true  },
    { key:'tickets_count',label:'Tickets',      type:'number',   pre:true  },
    { key:'resolve_rate', label:'Resolve Rate', type:'percent',  pre:true  },
    { key:'avg_handle',   label:'Avg Handle Time',type:'number', pre:false },
    { key:'csat_score',   label:'CSAT Score',   type:'number',   pre:false },
    { key:'status',       label:'Status',       type:'varchar',  pre:false },
    { key:'last_active',  label:'Last Active',  type:'datetime', pre:false },
  ],
  queues: [
    { key:'queue_id',     label:'Queue ID',     type:'bigint',   pre:true  },
    { key:'queue_name',   label:'Queue Name',   type:'varchar',  pre:true  },
    { key:'depth',        label:'Depth',        type:'number',   pre:true  },
    { key:'avg_wait',     label:'Avg Wait',     type:'number',   pre:true  },
    { key:'tickets_in',   label:'Tickets In',   type:'number',   pre:false },
    { key:'tickets_out',  label:'Tickets Out',  type:'number',   pre:false },
    { key:'sla_rate',     label:'SLA Rate',     type:'percent',  pre:false },
  ],
  sla: [
    { key:'ticket_id',    label:'Ticket ID',    type:'varchar',  pre:true  },
    { key:'sla_policy',   label:'SLA Policy',   type:'varchar',  pre:true  },
    { key:'due_at',       label:'Due At',       type:'datetime', pre:true  },
    { key:'status',       label:'SLA Status',   type:'varchar',  pre:true  },
    { key:'breach_time',  label:'Breach Time',  type:'number',   pre:false },
    { key:'agent_name',   label:'Agent',        type:'string',   pre:false },
    { key:'queue',        label:'Queue',        type:'varchar',  pre:false },
  ],
  customers: [
    { key:'customer_id',  label:'Customer ID',  type:'bigint',   pre:true  },
    { key:'name',         label:'Name',         type:'string',   pre:true  },
    { key:'email',        label:'Email',        type:'varchar',  pre:true  },
    { key:'open_tickets', label:'Open Tickets', type:'number',   pre:true  },
    { key:'total_tickets',label:'Total Tickets',type:'number',   pre:false },
    { key:'last_contact', label:'Last Contact', type:'datetime', pre:false },
    { key:'segment',      label:'Segment',      type:'varchar',  pre:false },
  ],
  csat: [
    { key:'ticket_id',    label:'Ticket ID',    type:'varchar',  pre:true  },
    { key:'score',        label:'CSAT Score',   type:'number',   pre:true  },
    { key:'feedback',     label:'Feedback',     type:'text',     pre:true  },
    { key:'agent_name',   label:'Agent',        type:'string',   pre:true  },
    { key:'submitted_at', label:'Submitted At', type:'datetime', pre:true  },
    { key:'sentiment',    label:'Sentiment',    type:'varchar',  pre:false },
    { key:'queue',        label:'Queue',        type:'varchar',  pre:false },
  ],
}

const AREA_LABELS = {
  tickets:'Tickets', agents:'Agents', queues:'Queues', sla:'SLA', customers:'Customers', csat:'CSAT'
}
const TIME_PRESET_LABELS = {
  today:'Today', '7d':'Last 7 days', '30d':'Last 30 days',
  '90d':'Last 90 days', mtd:'This month', ytd:'This year'
}
const AREA_SUMMARY = {
  tickets: '6 tickets were created in the selected period. 2 are resolved, 2 open, 1 pending, and 1 escalated. Gurram Triveni and Ravi Shankar currently hold the open tickets.',
  agents: 'Gurram Triveni leads with a 96.2% resolve rate across 94 tickets. Average handle time ranges from 3m 42s to 6m 44s. Patangey V. Kumar and Ravi Shankar have the lowest resolve rates and may benefit from additional support.',
  queues: 'Returns queue is the healthiest with a 98.4% SLA rate and 1m 22s average wait. Technical queue has the highest depth (23) and longest average wait at 3m 55s, presenting the most risk.',
  sla: '3 of 4 tickets met their SLA targets. Ticket #677220 breached its 2-hour response SLA — review assignment routing for this policy.',
  customers: 'Sanjay Kumar has the highest open ticket volume (5 of 31 total). Ritu Patel has 0 open tickets across 22 total — the best-served account in the set.',
  csat: 'Average CSAT score is 4.38. Gurram Triveni leads at 4.8 (Positive). Swetha Neerudu has the lowest score at 3.9 (Neutral) — consider targeted coaching.',
}

const SAMPLE_ROWS = {
  tickets: {
    cols:['ticket_id','title','status','assigned_to','created_at'],
    rows:[
      ['#677218','Chat Ticket: 6772...','Open','Gurram Triveni','2026-02-27 16:02'],
      ['#677219','Billing enquiry re...','Resolved','Kattoju U. Rani','2026-02-27 16:04'],
      ['#677220','Account reset req...','Pending','Swetha Neerudu','2026-02-27 16:08'],
      ['#677221','Technical issue wi...','Escalated','Laxmi Singh','2026-02-27 16:09'],
      ['#677222','Delivery complaint','Resolved','Patangey V. Kumar','2026-02-27 16:15'],
      ['#677223','Refund request','Open','Ravi Shankar','2026-02-27 16:18'],
    ]
  },
  agents: {
    cols:['agent_name','team','tickets','resolve_rate','avg_handle'],
    rows:[
      ['Gurram Triveni','Support L1','94','96.2%','3m 42s'],
      ['Kattoju U. Rani','Support L1','76','93.4%','4m 10s'],
      ['Swetha Neerudu','Support L2','68','91.1%','4m 38s'],
      ['Laxmi Singh','Billing','72','89.0%','5m 02s'],
      ['Patangey V. Kumar','Technical','54','83.3%','6m 15s'],
      ['Ravi Shankar','Support L2','48','79.1%','6m 44s'],
    ]
  },
  queues: {
    cols:['queue_name','depth','avg_wait','sla_rate'],
    rows:[
      ['Support L1','18','1m 42s','97.2%'],
      ['Billing','11','2m 08s','95.8%'],
      ['Technical','23','3m 55s','91.3%'],
      ['Returns','7','1m 22s','98.4%'],
    ]
  },
  sla: {
    cols:['ticket_id','sla_policy','due_at','status'],
    rows:[
      ['#677218','4-hour response','16:02','Met'],
      ['#677219','Same-day resolve','17:00','Met'],
      ['#677220','2-hour response','15:30','Breached'],
      ['#677221','4-hour response','18:09','Met'],
    ]
  },
  customers: {
    cols:['name','email','open_tickets','total_tickets'],
    rows:[
      ['Arjun Mehta','arjun@example.com','3','14'],
      ['Priya Sharma','priya@example.com','1','8'],
      ['Ritu Patel','ritu@example.com','0','22'],
      ['Sanjay Kumar','sanjay@example.com','5','31'],
    ]
  },
  csat: {
    cols:['agent_name','score','sentiment','submitted_at'],
    rows:[
      ['Gurram Triveni','4.8','Positive','2026-02-27 14:22'],
      ['Kattoju U. Rani','4.2','Neutral','2026-02-27 13:05'],
      ['Swetha Neerudu','3.9','Neutral','2026-02-27 11:44'],
      ['Laxmi Singh','4.6','Positive','2026-02-27 10:18'],
    ]
  },
}

/* ── Dashboard view helpers ───────────────────────────────── */
const DV_KPI_ICONS = {
  ticket: (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><rect x="2" y="1.5" width="8" height="9" rx="1.2"/><path d="M4 4.5h4M4 6.5h4M4 8.5h2.5"/></svg>),
  clock:  (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><circle cx="6" cy="6.5" r="4.5"/><path d="M6 4v2.5l1.5 1" strokeLinejoin="round"/></svg>),
  star:   (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"><path d="M6 1.5l1.2 3.5H11l-2.9 2.1 1.1 3.4L6 8.5l-3.2 2 1.1-3.4L1 5h3.8L6 1.5Z"/></svg>),
  alert:  (<svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"><path d="M6 1L11 10.5H1L6 1Z" strokeLinejoin="round"/><path d="M6 5v2M6 9h.01"/></svg>),
}

function Sparkline({ data }) {
  const max = Math.max(...data), min = Math.min(...data), range = max - min || 1
  const W = 88, H = 28
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * W},${H - ((v - min) / range) * (H - 6) - 3}`)
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <polyline points={pts.join(' ')} stroke="#4DB6AC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function KpiCard({ kpi, idx }) {
  return (
    <div className="dv-kpi-card" style={{ animationDelay: `${idx * 0.06}s` }}>
      <div className="dv-kpi-top">
        <div className="dv-kpi-label">{DV_KPI_ICONS[kpi.icon]} {kpi.label}</div>
        <div className={`dv-kpi-delta ${kpi.up ? 'up' : 'down'}`}>{kpi.up ? '↑' : '↓'} {kpi.delta}</div>
      </div>
      <div className="dv-kpi-val">{kpi.val}</div>
      <div className="dv-kpi-footer">
        <div className="dv-kpi-compare">{kpi.compare}</div>
        <div className="dv-kpi-spark-wrap"><Sparkline data={kpi.sparkData}/></div>
      </div>
    </div>
  )
}

function AreaSVG({ sparkData, h = 90 }) {
  const max = Math.max(...sparkData), min = Math.min(...sparkData), range = max - min || 1
  const W = 300, color = '#4DB6AC'
  const pts = sparkData.map((v, i) => ({ x: (i / (sparkData.length - 1)) * W, y: h - ((v - min) / range) * (h * 0.72) - 8 }))
  const linePath = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaPath = `${linePath} L ${W} ${h} L 0 ${h} Z`
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="dv_ag" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
          <stop offset="100%" stopColor={color} stopOpacity="0.01"/>
        </linearGradient>
      </defs>
      <path d={areaPath} fill="url(#dv_ag)"/>
      <path d={linePath} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r="3" fill={color}/>
    </svg>
  )
}

function MultiLineSVG({ data, h = 110 }) {
  const all = data.flatMap(s => s.data)
  const max = Math.max(...all), min = Math.min(...all), range = max - min || 1
  const W = 300
  function toD(vals) {
    return vals.map((v, i) => `${i === 0 ? 'M' : 'L'} ${(i / (vals.length - 1)) * W} ${h - ((v - min) / range) * (h * 0.75) - 8}`).join(' ')
  }
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="none">
      {data.map((s, i) => (
        <path key={i} d={toD(s.data)} stroke={s.color} strokeWidth="2" fill="none"
          strokeDasharray={s.dashed ? '6 3' : undefined} strokeLinecap="round" strokeLinejoin="round" opacity={s.dashed ? 0.7 : 1}/>
      ))}
    </svg>
  )
}

function DonutSVG({ data, center, centerSub, size = 100 }) {
  const cx = size / 2, cy = size / 2, r = size * 0.37, sw = size * 0.16
  let angle = -90
  const arcs = data.map(d => {
    const pct = parseFloat(d.val)
    const s = angle, e = angle + pct * 3.6 - 1
    angle += pct * 3.6
    return { color: d.color, s, e }
  })
  function arc({ s, e }) {
    const toRad = a => (a * Math.PI) / 180
    const x1 = cx + r * Math.cos(toRad(s)), y1 = cy + r * Math.sin(toRad(s))
    const x2 = cx + r * Math.cos(toRad(e)), y2 = cy + r * Math.sin(toRad(e))
    const large = e - s > 180 ? 1 : 0
    return `M${x1} ${y1} A${r} ${r} 0 ${large} 1 ${x2} ${y2}`
  }
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--teal-10)" strokeWidth={sw}/>
      {arcs.map((seg, i) => <path key={i} d={arc(seg)} fill="none" stroke={seg.color} strokeWidth={sw} strokeLinecap="round"/>)}
      <text x={cx} y={cy - 3} textAnchor="middle" fontSize="13" fontWeight="700" fill="#1F4141" fontFamily="Plus Jakarta Sans,sans-serif">{center}</text>
      <text x={cx} y={cy + 11} textAnchor="middle" fontSize="9" fill="#4C6A69" opacity="0.75" fontFamily="Plus Jakarta Sans,sans-serif">{centerSub}</text>
    </svg>
  )
}

function HBarList({ data }) {
  const maxVal = Math.max(...data.map(d => d.val))
  return (
    <div className="dv-hbar-chart">
      {data.map((row, i) => (
        <div key={i} className="dv-hbar-row">
          <div className="dv-hbar-name" title={row.name}>{row.name}</div>
          <div className="dv-hbar-track">
            <div className="dv-hbar-fill" style={{ width: `${(row.val / maxVal) * 100}%`, background: row.color }}/>
          </div>
          <div className="dv-hbar-val">{row.val}</div>
        </div>
      ))}
    </div>
  )
}

function VBarChart({ data }) {
  const maxVal = Math.max(...data.flatMap(g => g.bars.map(b => b.val)))
  return (
    <div className="dv-vbar-wrap">
      {data.map((group, i) => (
        <div key={i} className="dv-vbar-group">
          <div className="dv-vbar-cols">
            {group.bars.map((bar, j) => (
              <div key={j} className="dv-vbar-col" style={{ height: `${Math.round((bar.val / maxVal) * 84)}px`, background: bar.color }}/>
            ))}
          </div>
          <div className="dv-vbar-group-label">{group.label}</div>
        </div>
      ))}
    </div>
  )
}

function FunnelChart({ data }) {
  return (
    <div className="dv-funnel">
      {data.map((stage, i) => (
        <div key={i} className="dv-funnel-stage">
          <div className="dv-funnel-label">{stage.label}</div>
          <div className="dv-funnel-bar-wrap">
            <div className="dv-funnel-bar" style={{ width: `${stage.pct}%`, background: stage.color }}>
              {stage.pct > 18 ? stage.val : ''}
            </div>
          </div>
          {stage.pct <= 18 && <div className="dv-funnel-val">{stage.val}</div>}
        </div>
      ))}
    </div>
  )
}

function GaugeRow({ gauges }) {
  const circ = Math.PI * 30
  return (
    <div className="dv-gauge-row">
      {gauges.map((g, i) => (
        <div key={i} className="dv-gauge-item">
          <svg width="72" height="42" viewBox="0 0 72 42" fill="none">
            <path d="M 6 38 A 30 30 0 0 1 66 38" stroke="var(--teal-10)" strokeWidth="8" strokeLinecap="round"/>
            <path d="M 6 38 A 30 30 0 0 1 66 38" stroke={g.color} strokeWidth="8" strokeLinecap="round"
              strokeDasharray={`${(g.pct / 100) * circ} ${circ}`}/>
            <text x="36" y="37" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1F4141" fontFamily="Plus Jakarta Sans,sans-serif">{g.val}</text>
          </svg>
          <div className="dv-gauge-label">{g.label}</div>
        </div>
      ))}
    </div>
  )
}

function DvTable({ rows }) {
  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="dv-table">
        <thead><tr>
          <th>ID</th><th>Agent</th><th>Category</th><th>Status</th><th>Time</th>
        </tr></thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td style={{ color: 'var(--teal)', fontWeight: 500 }}>{r.id}</td>
              <td>{r.agent}</td>
              <td style={{ color: 'var(--cutty-sark)' }}>{r.queue}</td>
              <td><span className={`dv-status-badge ${r.status}`}>{r.status}</span></td>
              <td style={{ opacity: 0.6, fontSize: '11px' }}>{r.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const WEEK_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function ChartCard({ title, sub, children, delay = '0s', style }) {
  return (
    <div className="dv-chart-card" style={{ animationDelay: delay, ...style }}>
      <div className="dv-chart-hd">
        <div>
          <div className="dv-chart-title">{title}</div>
          {sub && <div className="dv-chart-sub">{sub}</div>}
        </div>
        <div className="dv-chart-actions">
          <button className="dv-chart-btn" title="Download">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><path d="M6 1v7M3.5 5.5L6 8l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1.5 10.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
          </button>
          <button className="dv-chart-btn" title="Options">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="2" r="1" fill="currentColor"/><circle cx="6" cy="6" r="1" fill="currentColor"/><circle cx="6" cy="10" r="1" fill="currentColor"/></svg>
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}

function DonutBlock({ title, sub, data, center, centerSub, delay }) {
  return (
    <ChartCard title={title} sub={sub} delay={delay}>
      <div className="dv-donut-wrap">
        <DonutSVG data={data} center={center} centerSub={centerSub}/>
        <div className="dv-donut-legend">
          {data.map((d, i) => (
            <div key={i} className="dv-donut-leg-item">
              <div className="dv-donut-leg-dot" style={{ background: d.color }}/>
              <div className="dv-donut-leg-val">{d.val}</div>
              <div className="dv-donut-leg-lbl">{d.label}</div>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}

function LineBlock({ title, sub, data, delay }) {
  return (
    <ChartCard title={title} sub={sub} delay={delay}>
      <MultiLineSVG data={data} h={110}/>
      <div className="dv-chart-xaxis">{WEEK_LABELS.map(l => <span key={l}>{l}</span>)}</div>
      <div className="dv-legend">
        {data.map((s, i) => (
          <div key={i} className="dv-legend-item">
            {s.dashed
              ? <div className="dv-legend-dashed" style={{ borderTopColor: s.color }}/>
              : <div className="dv-legend-line" style={{ background: s.color }}/>}
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

function DashboardBody({ cfg }) {
  if (!cfg) return null
  const { layout, kpis, areaTitle, areaSub, donutTitle, donutSub, donutData, donutCenter, donutCenterSub,
    barTitle, barSub, barData, lineTitle, lineSub, lineData, vbarTitle, vbarSub, vbarData,
    gaugeTitle, gaugeSub, gauges, funnelTitle, funnelSub, funnelData, tableTitle, tableSub, tableRows } = cfg
  const rows = tableRows || DV_ACTIVITY

  if (layout === 'standard') {
    return (
      <>
        <div className="dv-kpi-row">
          {kpis.map((k, i) => <KpiCard key={i} kpi={k} idx={i}/>)}
        </div>
        <div className="dv-charts-row two-one">
          <ChartCard title={areaTitle} sub={areaSub} delay="0.1s">
            <AreaSVG sparkData={kpis[0].sparkData} h={90}/>
            <div className="dv-chart-xaxis">{WEEK_LABELS.map(l => <span key={l}>{l}</span>)}</div>
          </ChartCard>
          <DonutBlock title={donutTitle} sub={donutSub} data={donutData} center={donutCenter} centerSub={donutCenterSub} delay="0.15s"/>
        </div>
        <div className="dv-charts-row two-one">
          <ChartCard title={barTitle} sub={barSub} delay="0.2s">
            <HBarList data={barData}/>
          </ChartCard>
          <ChartCard title={tableTitle} sub={tableSub} delay="0.25s">
            <DvTable rows={rows}/>
          </ChartCard>
        </div>
      </>
    )
  }

  if (layout === 'quality') {
    return (
      <>
        <div className="dv-kpi-row">
          {kpis.map((k, i) => <KpiCard key={i} kpi={k} idx={i}/>)}
        </div>
        <div className="dv-charts-row half">
          <LineBlock title={lineTitle} sub={lineSub} data={lineData} delay="0.1s"/>
          <ChartCard title={barTitle} sub={barSub} delay="0.15s">
            <HBarList data={barData}/>
          </ChartCard>
        </div>
        <div className="dv-charts-row half">
          <DonutBlock title={donutTitle} sub={donutSub} data={donutData} center={donutCenter} centerSub={donutCenterSub} delay="0.2s"/>
          <ChartCard title="Score Distribution" sub="QA scores by band · last 30 days" delay="0.25s">
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 100, padding: '8px 4px 0' }}>
              {[{ l: '80–84', v: 12 }, { l: '85–89', v: 22 }, { l: '90–94', v: 38 }, { l: '95–99', v: 28 }].map((b, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: '100%', background: '#4DB6AC', borderRadius: '4px 4px 0 0', height: `${b.v * 2}px`, opacity: 0.6 + i * 0.1 }}/>
                  <span style={{ fontSize: 10, color: 'var(--cutty-sark)', opacity: 0.65 }}>{b.l}</span>
                </div>
              ))}
            </div>
          </ChartCard>
        </div>
      </>
    )
  }

  if (layout === 'trend') {
    return (
      <>
        <div className="dv-kpi-row">
          {kpis.map((k, i) => <KpiCard key={i} kpi={k} idx={i}/>)}
        </div>
        <div className="dv-charts-row full">
          <ChartCard title={areaTitle} sub={areaSub} delay="0.1s">
            <AreaSVG sparkData={kpis[0].sparkData} h={110}/>
            <div className="dv-chart-xaxis">{WEEK_LABELS.map(l => <span key={l}>{l}</span>)}</div>
          </ChartCard>
        </div>
        <div className="dv-charts-row half">
          <ChartCard title={barTitle} sub={barSub} delay="0.15s">
            <HBarList data={barData}/>
          </ChartCard>
          <ChartCard title={funnelTitle} sub={funnelSub} delay="0.2s">
            <FunnelChart data={funnelData}/>
          </ChartCard>
        </div>
      </>
    )
  }

  if (layout === 'ai-insights') {
    return (
      <>
        <div className="dv-kpi-row">
          {kpis.map((k, i) => <KpiCard key={i} kpi={k} idx={i}/>)}
        </div>
        <div className="dv-charts-row half">
          <LineBlock title={lineTitle} sub={lineSub} data={lineData} delay="0.1s"/>
          <ChartCard title={gaugeTitle} sub={gaugeSub} delay="0.15s">
            <GaugeRow gauges={gauges}/>
          </ChartCard>
        </div>
        <div className="dv-charts-row half">
          <ChartCard title={barTitle} sub={barSub} delay="0.2s">
            <HBarList data={barData}/>
          </ChartCard>
          <ChartCard title={tableTitle} sub={tableSub} delay="0.25s">
            <DvTable rows={rows}/>
          </ChartCard>
        </div>
      </>
    )
  }

  if (layout === 'ops-command') {
    return (
      <>
        <div className="dv-kpi-row six">
          {kpis.map((k, i) => <KpiCard key={i} kpi={k} idx={i}/>)}
        </div>
        <div className="dv-charts-row three">
          <ChartCard title={areaTitle} sub={areaSub} delay="0.1s">
            <AreaSVG sparkData={kpis[0].sparkData} h={90}/>
            <div className="dv-chart-xaxis">{WEEK_LABELS.map(l => <span key={l}>{l}</span>)}</div>
          </ChartCard>
          <DonutBlock title={donutTitle} sub={donutSub} data={donutData} center={donutCenter} centerSub={donutCenterSub} delay="0.15s"/>
          <ChartCard title={vbarTitle} sub={vbarSub} delay="0.2s">
            <VBarChart data={vbarData}/>
          </ChartCard>
        </div>
        <div className="dv-charts-row full">
          <ChartCard title={tableTitle} sub={tableSub} delay="0.25s">
            <DvTable rows={DV_ACTIVITY}/>
          </ChartCard>
        </div>
      </>
    )
  }

  if (layout === 'productivity') {
    return (
      <>
        <div className="dv-kpi-row">
          {kpis.map((k, i) => <KpiCard key={i} kpi={k} idx={i}/>)}
        </div>
        <div className="dv-charts-row half">
          <ChartCard title={vbarTitle} sub={vbarSub} delay="0.1s">
            <VBarChart data={vbarData}/>
            <div className="dv-legend" style={{ marginTop: 'var(--space-3)' }}>
              <div className="dv-legend-item"><div className="dv-legend-line" style={{ background: '#4DB6AC' }}/><span>Actual</span></div>
              <div className="dv-legend-item"><div className="dv-legend-line" style={{ background: 'rgba(77,182,172,0.35)' }}/><span>Target</span></div>
            </div>
          </ChartCard>
          <ChartCard title={gaugeTitle} sub={gaugeSub} delay="0.15s">
            <GaugeRow gauges={gauges}/>
          </ChartCard>
        </div>
        <div className="dv-charts-row half">
          <ChartCard title={funnelTitle} sub={funnelSub} delay="0.2s">
            <FunnelChart data={funnelData}/>
          </ChartCard>
          <ChartCard title={tableTitle} sub={tableSub} delay="0.25s">
            <DvTable rows={rows}/>
          </ChartCard>
        </div>
      </>
    )
  }

  return null
}

function DashboardCard({ dash, onOpen, onAccess }) {
  const thumb = THUMB_SVGS[dash.thumb] || THUMB_SVGS.bar
  const modeLabel = { manual: 'Manual', ai: 'AI', hybrid: 'Hybrid' }
  return (
    <div className="dash-card" data-mode={dash.mode} onClick={() => onOpen(dash.id)}>
      <div className="dash-card-actions">
        <button className="dash-card-edit-btn" onClick={e => e.stopPropagation()} title="Edit">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M9.5 2L11 3.5L4.5 10L2.5 10.5L3 8.5L9.5 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="dash-card-del-btn" onClick={e => e.stopPropagation()} title="Delete">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 3.5h9M5 3.5V2h3v1.5M5.5 6v4M7.5 6v4M2.5 3.5l.5 7.5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1l.5-7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="dash-card-thumb">{thumb}</div>
      <div className="dash-card-body">
        <div className="dash-card-title">{dash.name}</div>
        <div className="dash-card-desc">{dash.desc}</div>
        <div className="dash-card-meta">
          <span className={`home-mode-badge ${dash.mode}`}>
            <span className="mode-dot"/>
            {modeLabel[dash.mode] || dash.mode}
          </span>
          <button
            className={`dv-visibility-badge dv-visibility-badge--${dash.visibility || 'private'}`}
            onClick={e => { e.stopPropagation(); onAccess(dash) }}
          >
            {(dash.visibility || 'private') === 'private' ? <>{LockIcon} Private</> : <>{GlobeIcon} Public</>}
          </button>
          <span className="dash-card-tiles-count">
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <rect x="0.5" y="0.5" width="3.5" height="3.5" rx="0.75" stroke="currentColor" strokeWidth="1"/>
              <rect x="5.5" y="0.5" width="3.5" height="3.5" rx="0.75" stroke="currentColor" strokeWidth="1"/>
              <rect x="0.5" y="5.5" width="3.5" height="3.5" rx="0.75" stroke="currentColor" strokeWidth="1"/>
              <rect x="5.5" y="5.5" width="3.5" height="3.5" rx="0.75" stroke="currentColor" strokeWidth="1"/>
            </svg>
            {dash.tiles}
          </span>
          <span className="dash-card-updated">
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M2 4.5h8M4 2v2.5M8 2v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <rect x="1" y="3.5" width="10" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            {dash.updated}
          </span>
        </div>
      </div>
    </div>
  )
}

export default function DataStudioView() {
  const { state, dispatch, openModal } = useApp()
  const { dsSection } = state
  const [activeTab, setActiveTab] = useState('all')
  const [composerTitle, setComposerTitle] = useState('Untitled Dashboard')
  const [queryTitle, setQueryTitle] = useState('Untitled Query')
  const [nqStep, setNqStep] = useState(1)
  const [sqlOpen, setSqlOpen] = useState(false)
  const [selectedArea, setSelectedArea] = useState(null)
  const [selectedCols, setSelectedCols] = useState([])
  const [queryRan, setQueryRan] = useState(false)
  const [summaryOpen, setSummaryOpen] = useState(false)
  const [aiDescribeOpen, setAiDescribeOpen] = useState(false)
  const [aiDescribeText, setAiDescribeText] = useState('')
  const [selectedTimePreset, setSelectedTimePreset] = useState('30d')
  const [exampleText, setExampleText] = useState('')
  const [activeDashId, setActiveDashId] = useState(null)
  const [activeBtn, setActiveBtn] = useState(null)
  const [stepKey, setStepKey] = useState(0)
  const [transitionDir, setTransitionDir] = useState('forward')

  function navigateStep(n, btnId, preFn, dir = 'forward') {
    if (activeBtn) return
    if (preFn) preFn()
    setTransitionDir(dir)
    setActiveBtn(btnId)
    setTimeout(() => {
      setNqStep(Math.max(1, Math.min(4, n)))
      setStepKey(k => k + 1)
      setActiveBtn(null)
    }, 900)
  }
  function runQueryDelayed() {
    if (activeBtn) return
    setTransitionDir('forward')
    setActiveBtn('run')
    setTimeout(() => { setQueryRan(true); setStepKey(k => k + 1); setActiveBtn(null) }, 900)
  }
  function backFromResults(btnId) {
    if (activeBtn) return
    setTransitionDir('back')
    setActiveBtn(btnId)
    setTimeout(() => { setQueryRan(false); setStepKey(k => k + 1); setActiveBtn(null) }, 650)
  }
  function resetQuery() {
    setNqStep(1); setSelectedArea(null); setSelectedCols([]); setQueryRan(false); setSummaryOpen(false)
    setAiDescribeOpen(false); setAiDescribeText(''); setSelectedTimePreset('30d'); setExampleText('')
    setActiveBtn(null)
  }

  const filtered = activeTab === 'all'
    ? DASHBOARDS_DATA
    : DASHBOARDS_DATA.filter(d => d.mode === activeTab)

  const isComposer = dsSection === 'composer'
  const isNewQuestion = dsSection === 'new-question'
  const isDashboardView = dsSection === 'dashboard-view'
  const showBack = isComposer || isNewQuestion || isDashboardView
  const showPageName = !isComposer && !isNewQuestion && !isDashboardView
  const showDsBreadcrumb = isComposer
  const showNqBreadcrumb = isNewQuestion

  return (
    <div id="view-data-studio" className="view active ds-view">

      {/* Topbar */}
      <div className="topbar">
        <div className="topbar-left">
          <button
            className="hamburger"
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR_COLLAPSE' })}
            aria-label="Menu"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          </button>
          <button
            className="topbar-back-btn"
            id="ds-back-btn"
            onClick={() => dispatch({ type: 'SET_DS_SECTION', section: 'home' })}
            style={{ display: showBack ? '' : 'none' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M8.5 10.5L4.5 6.5l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span
            className="topbar-page-name"
            id="topbar-ds-name"
            style={{ display: showPageName ? '' : 'none' }}
          >
            Dashboard Builder
          </span>
          <nav
            className="topbar-breadcrumb"
            id="topbar-ds-breadcrumb"
            style={{ display: showDsBreadcrumb ? '' : 'none' }}
          >
            <button
              className="bc-home"
              onClick={() => dispatch({ type: 'SET_DS_SECTION', section: 'home' })}
            >
              My Dashboards
            </button>
            <span className="bc-sep">›</span>
            <input
              className="bc-title"
              id="dash-composer-title"
              value={composerTitle}
              onChange={e => setComposerTitle(e.target.value)}
            />
          </nav>
          <nav
            className="topbar-breadcrumb"
            id="topbar-nq-breadcrumb"
            style={{ display: showNqBreadcrumb ? '' : 'none' }}
          >
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--cutty-sark)', opacity: 0.7 }}>New Query</span>
            <span className="bc-sep">›</span>
            <input
              className="bc-title"
              id="qb-title"
              value={queryTitle}
              onChange={e => setQueryTitle(e.target.value)}
            />
          </nav>
          <nav
            className="topbar-breadcrumb"
            id="topbar-dv-breadcrumb"
            style={{ display: isDashboardView ? '' : 'none' }}
          >
            <button className="bc-home" onClick={() => dispatch({ type: 'SET_DS_SECTION', section: 'home' })}>My Dashboards</button>
            <span className="bc-sep">›</span>
            <span className="bc-title" style={{ pointerEvents: 'none', border: 'none', background: 'transparent', cursor: 'default' }}>
              {activeDashId ? (DASHBOARDS_DATA.find(d => d.id === activeDashId)?.name || '') : ''}
            </span>
          </nav>
        </div>
        <div className="topbar-right">
          <button
            className="qb-reset-btn"
            id="ib-reset-btn"
            title="Start over"
            style={{ display: isNewQuestion ? '' : 'none' }}
            onClick={() => resetQuery()}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5A4.5 4.5 0 1 1 4.5 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M2 3v3.5h3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={`nqb-sql-btn${sqlOpen ? ' active' : ''}`}
            id="ib-sql-btn"
            onClick={() => setSqlOpen(o => !o)}
            style={{ display: isNewQuestion ? '' : 'none' }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M3.5 4L1.5 6l2 2M8.5 4l2 2-2 2M5.5 9l1-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            SQL
          </button>
          <button
            className="qb-save-btn"
            id="ib-save-btn"
            onClick={() => openModal('save-query')}
            style={{ display: isNewQuestion ? '' : 'none' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4 1.5v3h5V1.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              <path d="M2.5 8.5h8v3H2.5z" fill="currentColor" opacity=".2"/>
            </svg>
            Save Query
          </button>
          <button
            className="nq-ai-toggle-btn"
            id="dash-ai-toggle-btn"
            title="Toggle AI Assistant"
            style={{ display: isComposer ? '' : 'none' }}
          >
            <svg width="11" height="11" viewBox="0 0 13 13" fill="currentColor">
              <path d="M6.5 0.5L7.6 4.1L11.5 6.5L7.6 8.9L6.5 12.5L5.4 8.9L1.5 6.5L5.4 4.1L6.5 0.5Z"/>
            </svg>
            AI
          </button>
        </div>
      </div>

      {/* ── Home: Dashboard Gallery ── */}
      <div
        id="ds-home"
        style={{ display: dsSection === 'home' ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}
      >
        {/* Topbar: title + stats + action */}
        <div className="qs-page-topbar" id="home-topbar">
          <div>
            <div className="qs-page-title">My Dashboards</div>
            <div className="qs-page-stats">
              <div className="qs-page-stat">
                <span className="qs-page-stat-num">{DASHBOARDS_DATA.length}</span>
                <span className="qs-page-stat-label">Total</span>
              </div>
              <div className="qs-page-stat-sep"/>
              <div className="qs-page-stat">
                <span className="qs-page-stat-num">{DASHBOARDS_DATA.filter(d => d.mode === 'ai').length}</span>
                <span className="qs-page-stat-label">AI</span>
              </div>
              <div className="qs-page-stat-sep"/>
              <div className="qs-page-stat">
                <span className="qs-page-stat-num">{DASHBOARDS_DATA.filter(d => d.mode === 'hybrid').length}</span>
                <span className="qs-page-stat-label">Hybrid</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} id="create-dash-btn-wrap">
            <button className="qs-primary-btn" onClick={() => openModal('create-dashboard')}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="1" width="4" height="4" rx="1" fill="white" opacity=".9"/>
                <rect x="7" y="1" width="4" height="4" rx="1" fill="white" opacity=".9"/>
                <rect x="1" y="7" width="4" height="4" rx="1" fill="white" opacity=".9"/>
                <rect x="7" y="7" width="4" height="4" rx="1" fill="white" opacity=".9"/>
              </svg>
              Create New Dashboard
            </button>
          </div>
        </div>

        {/* Mode filter tabs */}
        <div className="home-mode-tabs" id="home-mode-tabs">
          <button className={`home-tab${activeTab === 'all' ? ' active' : ''}`} id="htab-all" onClick={() => setActiveTab('all')}>All</button>
          <button className={`home-tab${activeTab === 'manual' ? ' active' : ''}`} id="htab-manual" onClick={() => setActiveTab('manual')}>Manual</button>
          <button className={`home-tab${activeTab === 'ai' ? ' active' : ''}`} id="htab-ai" onClick={() => setActiveTab('ai')}>AI</button>
          <button className={`home-tab${activeTab === 'hybrid' ? ' active' : ''}`} id="htab-hybrid" onClick={() => setActiveTab('hybrid')}>Hybrid</button>
        </div>

        {/* Gallery grid */}
        <div id="home-gallery" style={{ display: 'flex', flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <div className="dash-grid-wrap">
            <div className="dash-grid" id="home-dash-grid">
              {filtered.map(d => (
                <DashboardCard
                  key={d.id}
                  dash={d}
                  onOpen={dashId => { setActiveDashId(dashId); dispatch({ type: 'SET_DS_SECTION', section: 'dashboard-view' }) }}
                  onAccess={dash => openModal('access', { dashName: dash.name })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Composer section ── */}
      <div
        id="dash-composer-view"
        style={{ display: isComposer ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}
      >
        <div className="nq-body">
          {/* Main area: two left panels */}
          <div className="nq-main-area">
            <div className="nq-panels">
              {/* Col 1: Saved Questions */}
              <div className="nq-col-qb" style={{ flex: '0 0 240px' }}>
                <div className="nq-col-hd" style={{ justifyContent: 'space-between' }}>
                  <span>Saved Questions</span>
                  <button className="qb-select-all-btn" style={{ fontSize: '11px' }}>Add all</button>
                </div>
                <div id="dash-picker-list" style={{ overflowY: 'auto', flex: 1 }}></div>
              </div>

              {/* Col 2: Selected queries canvas */}
              <div className="nq-col-vb">
                <div className="nq-col-hd">Selected Queries</div>
                <div className="dash-canvas" id="dash-canvas">
                  <div className="dash-canvas-empty" id="dash-canvas-empty">
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                      <rect x="2" y="2" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" opacity=".25"/>
                      <rect x="28" y="2" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" opacity=".25"/>
                      <rect x="2" y="28" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" opacity=".25"/>
                      <rect x="28" y="28" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" opacity=".25"/>
                    </svg>
                    <p>Select questions on the left to add them to your dashboard</p>
                  </div>
                  <div className="dash-tiles" id="dash-tiles" style={{ display: 'none' }}></div>
                </div>
                <div id="dash-save-bar" style={{ display: 'none', padding: '12px 16px', borderTop: '1px solid var(--nebula)', flexShrink: 0 }}>
                  <button className="dash-save-final-btn">
                    <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
                      <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M4 1.5v3h5V1.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                    </svg>
                    Save Dashboard
                  </button>
                </div>
              </div>
            </div>{/* /nq-panels */}
          </div>{/* /nq-main-area */}

          {/* Col 3: AI Assistant (toggleable) */}
          <div className="nq-col-ai" id="dash-col-ai">
            <div className="nq-col-hd">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" style={{ color: 'var(--teal)', flexShrink: 0 }}>
                <path d="M6.5 0.5L7.6 4.1L11.5 6.5L7.6 8.9L6.5 12.5L5.4 8.9L1.5 6.5L5.4 4.1L6.5 0.5Z"/>
              </svg>
              AI Assistant
            </div>
            <div className="nq-col-ai-body">
              <div className="nq-ai-conv" id="dash-ai-conv"></div>
              <div className="nq-ai-sep" id="dash-ai-sep" style={{ display: 'none' }}>· · ·</div>
              <div className="nq-ai-sub">Any last-minute changes?</div>
              <textarea
                className="nq-ai-textarea"
                id="dash-ai-textarea"
                placeholder="e.g. rename this dashboard, suggest a layout, add a filter..."
              ></textarea>
              <button className="nq-generate-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 0L7 3.5L11 6L7 8.5L6 12L5 8.5L1 6L5 3.5L6 0Z"/>
                </svg>
                Ask Kap AI
              </button>
            </div>
          </div>{/* /dash-col-ai */}
        </div>{/* /nq-body */}
      </div>

      {/* ── New Query page ── */}
      <div
        id="ds-new-question"
        style={{ display: isNewQuestion ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}
      >
        <div className="nqb-page">
          <div className="nqb-body">

            {/* LEFT: Steps panel */}
            <div className="nqb-left">

              {/* Step indicator */}
              <div className="nqb-steps-row">
                {[
                  { n: 1, label: 'Query' },
                  { n: 2, label: 'Data' },
                  { n: 3, label: 'Columns' },
                  { n: 4, label: 'Filters' },
                ].map((s, i) => (
                  <React.Fragment key={s.n}>
                    <div
                      className={`nqb-step-item${nqStep === s.n ? ' active' : nqStep > s.n ? ' done-step' : ''}`}
                      id={`nqb-step-item-${s.n}`}
                      onClick={() => nqStep > s.n && navigateStep(s.n, `dot-${s.n}`, null, 'back')}
                      style={{ cursor: nqStep > s.n ? 'pointer' : 'default' }}
                    >
                      <div className={`nqb-step-dot${nqStep === s.n ? ' active' : nqStep > s.n ? ' done' : ''}`} id={`nqb-dot-${s.n}`}>
                        {nqStep > s.n ? (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : s.n}
                      </div>
                      <span className="nqb-step-label">{s.label}</span>
                    </div>
                    {i < 3 && (
                      <div className={`nqb-step-connector${nqStep > s.n ? ' done' : ''}`} id={`nqb-conn-${s.n}`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Step 1: Query */}
              <div key={nqStep === 1 ? `p1-${stepKey}` : 'p1-off'} className={`nqb-step-content${nqStep === 1 && stepKey > 0 ? ` nqb-step-${transitionDir}` : ''}`} id="nqb-panel-1" style={{ display: nqStep === 1 ? 'flex' : 'none' }}>
                <div>
                  <div className="nqb-step-title">What do you want to know?</div>
                  <div className="nqb-step-sub">Describe your query in plain language — no SQL needed.</div>
                </div>
                <textarea
                  className="nqb-textarea"
                  id="nqb-question"
                  aria-label="Describe your query in plain language"
                  placeholder="e.g. How many tickets were resolved last month by each agent?"
                  value={exampleText}
                  onChange={e => setExampleText(e.target.value)}
                />
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 'var(--weight-semibold)', color: 'var(--cutty-sark)', opacity: 0.75, letterSpacing: '0.05em', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>Try an example</div>
                  <div className="nqb-example-chips">
                    <button className="nqb-example-chip" onClick={() => { setExampleText('Ticket volume by agent last 30 days'); goToStep(2) }}>Ticket volume by agent last 30 days</button>
                    <button className="nqb-example-chip" onClick={() => { setExampleText('Average resolution time by queue'); goToStep(2) }}>Average resolution time by queue</button>
                    <button className="nqb-example-chip" onClick={() => { setExampleText('SLA compliance rate this month'); goToStep(2) }}>SLA compliance rate this month</button>
                    <button className="nqb-example-chip" onClick={() => { setExampleText('Top 10 customers by open tickets'); goToStep(2) }}>Top 10 customers by open tickets</button>
                    <button className="nqb-example-chip" onClick={() => { setExampleText('Agent performance scorecard'); goToStep(2) }}>Agent performance scorecard</button>
                  </div>
                </div>
              </div>

              {/* Step 2: Data area */}
              <div key={nqStep === 2 ? `p2-${stepKey}` : 'p2-off'} className={`nqb-step-content${nqStep === 2 && stepKey > 0 ? ` nqb-step-${transitionDir}` : ''}`} id="nqb-panel-2" style={{ display: nqStep === 2 ? 'flex' : 'none' }}>
                <div>
                  <div className="nqb-step-title">What data are you looking at?</div>
                  <div className="nqb-step-sub">Pick the area that best matches your question.</div>
                </div>
                <div className="nqb-data-grid" id="nqb-data-grid">
                  <button type="button" className={`nqb-data-btn${selectedArea === 'tickets' ? ' selected' : ''}`} data-area="tickets" onClick={() => navigateStep(3, 'area-tickets', () => { setSelectedArea('tickets'); setSelectedCols(COLUMNS_BY_AREA.tickets.filter(c=>c.pre).map(c=>c.key)) })}>
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span className="nqb-data-btn-label">Tickets</span>
                    <span className="nqb-data-btn-sub">Support &amp; service requests</span>
                  </button>
                  <button type="button" className={`nqb-data-btn${selectedArea === 'agents' ? ' selected' : ''}`} data-area="agents" onClick={() => navigateStep(3, 'area-agents', () => { setSelectedArea('agents'); setSelectedCols(COLUMNS_BY_AREA.agents.filter(c=>c.pre).map(c=>c.key)) })}>
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M4.5 20.5c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span className="nqb-data-btn-label">Agents</span>
                    <span className="nqb-data-btn-sub">Team &amp; individual performance</span>
                  </button>
                  <button type="button" className={`nqb-data-btn${selectedArea === 'queues' ? ' selected' : ''}`} data-area="queues" onClick={() => navigateStep(3, 'area-queues', () => { setSelectedArea('queues'); setSelectedCols(COLUMNS_BY_AREA.queues.filter(c=>c.pre).map(c=>c.key)) })}>
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span className="nqb-data-btn-label">Queues</span>
                    <span className="nqb-data-btn-sub">Queue load &amp; wait times</span>
                  </button>
                  <button type="button" className={`nqb-data-btn${selectedArea === 'sla' ? ' selected' : ''}`} data-area="sla" onClick={() => navigateStep(3, 'area-sla', () => { setSelectedArea('sla'); setSelectedCols(COLUMNS_BY_AREA.sla.filter(c=>c.pre).map(c=>c.key)) })}>
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M12 9.5V13l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span className="nqb-data-btn-label">SLA</span>
                    <span className="nqb-data-btn-sub">SLA compliance &amp; breaches</span>
                  </button>
                  <button type="button" className={`nqb-data-btn${selectedArea === 'customers' ? ' selected' : ''}`} data-area="customers" onClick={() => navigateStep(3, 'area-customers', () => { setSelectedArea('customers'); setSelectedCols(COLUMNS_BY_AREA.customers.filter(c=>c.pre).map(c=>c.key)) })}>
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="9" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 9V6.5A4 4 0 0 1 16 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><rect x="10" y="15" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/></svg>
                    <span className="nqb-data-btn-label">Customers</span>
                    <span className="nqb-data-btn-sub">Accounts &amp; contacts</span>
                  </button>
                  <button type="button" className={`nqb-data-btn${selectedArea === 'csat' ? ' selected' : ''}`} data-area="csat" onClick={() => navigateStep(3, 'area-csat', () => { setSelectedArea('csat'); setSelectedCols(COLUMNS_BY_AREA.csat.filter(c=>c.pre).map(c=>c.key)) })}>
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l2.5 5.1 5.6.81-4.05 3.95.96 5.59L12 15.9l-4.97 2.55.96-5.59L4 8.91l5.6-.81L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                    <span className="nqb-data-btn-label">CSAT</span>
                    <span className="nqb-data-btn-sub">Satisfaction scores &amp; feedback</span>
                  </button>
                </div>
                {/* Inline Kap AI nudge: step 1 */}
                <div className="nqb-inline-nudge" id="nqb-nudge-2" style={{ display: selectedArea ? 'flex' : 'none' }}>
                  <span className="nqb-inline-nudge-icon" aria-hidden="true">✦</span>
                  <div className="nqb-inline-nudge-body">
                    <span className="nqb-inline-nudge-text" id="nqb-nudge-2-text">Data detected. Want me to suggest the most useful columns &amp; filters for your question?</span>
                    <div className="nqb-inline-nudge-actions">
                      <button className={`nqb-nudge-action-btn${activeBtn === 'suggest-cols' ? ' nqb-btn-loading' : ''}`} onClick={() => navigateStep(3, 'suggest-cols', () => setSelectedCols(COLUMNS_BY_AREA[selectedArea].filter(c=>c.pre).map(c=>c.key)))}>Yes, suggest columns</button>
                      <button className="nqb-nudge-dismiss">Dismiss</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Columns */}
              <div key={nqStep === 3 ? `p3-${stepKey}` : 'p3-off'} className={`nqb-step-content${nqStep === 3 && stepKey > 0 ? ` nqb-step-${transitionDir}` : ''}`} id="nqb-panel-3" style={{ display: nqStep === 3 ? 'flex' : 'none' }}>
                <div>
                  <div className="nqb-step-title">Which columns do you need?</div>
                  <div className="nqb-step-sub">We've pre-selected the most useful ones — tweak as needed.</div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <button style={{ fontSize: 'var(--font-sm)', color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", padding: 0 }} onClick={() => setSelectedCols((COLUMNS_BY_AREA[selectedArea]||[]).map(c=>c.key))}>Select all</button>
                  <span style={{ color: 'var(--nebula)', userSelect: 'none' }}>&middot;</span>
                  <button style={{ fontSize: 'var(--font-sm)', color: 'var(--cutty-sark)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", padding: 0 }} onClick={() => setSelectedCols([])}>Clear all</button>
                </div>
                <div className="nqb-col-grid" id="nqb-col-grid">
                  {(COLUMNS_BY_AREA[selectedArea] || []).map(col => (
                    <label key={col.key} className={`nqb-col-item${selectedCols.includes(col.key) ? ' selected' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedCols.includes(col.key)}
                        onChange={() => setSelectedCols(prev =>
                          prev.includes(col.key) ? prev.filter(k => k !== col.key) : [...prev, col.key]
                        )}
                      />
                      <span className="nqb-col-name">{col.label}</span>
                      <span className="nqb-col-type">{col.type}</span>
                    </label>
                  ))}
                </div>
                {/* Inline Kap AI nudge: step 2 */}
                <div className="nqb-inline-nudge" id="nqb-nudge-3" style={{ display: selectedCols.length >= 3 ? 'flex' : 'none' }}>
                  <span className="nqb-inline-nudge-icon" aria-hidden="true">✦</span>
                  <div className="nqb-inline-nudge-body">
                    <span className="nqb-inline-nudge-text">I can predict the remaining columns you'll need based on your question. Complete the selection for you?</span>
                    <div className="nqb-inline-nudge-actions">
                      <button className={`nqb-nudge-action-btn${activeBtn === 'complete' ? ' nqb-btn-loading' : ''}`} onClick={() => { if (activeBtn) return; setActiveBtn('complete'); setSelectedCols((COLUMNS_BY_AREA[selectedArea]||[]).map(c=>c.key)); setTimeout(() => setActiveBtn(null), 400) }}>Complete selection</button>
                      <button className="nqb-nudge-dismiss">Dismiss</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Filters */}
              <div key={nqStep === 4 && !queryRan ? `p4-${stepKey}` : 'p4-off'} className={`nqb-step-content${nqStep === 4 && !queryRan && stepKey > 0 ? ` nqb-step-${transitionDir}` : ''}`} id="nqb-panel-4" style={{ display: nqStep === 4 && !queryRan ? 'flex' : 'none' }}>
                <div>
                  <div className="nqb-step-title">Any filters?</div>
                  <div className="nqb-step-sub">Narrow your data down. All filters are optional.</div>
                </div>
                {/* Inline Kap AI nudge: step 3 — toggles into describe bar */}
                {!aiDescribeOpen ? (
                  <div className="nqb-inline-nudge" id="nqb-nudge-4">
                    <span className="nqb-inline-nudge-icon" aria-hidden="true">✦</span>
                    <div className="nqb-inline-nudge-body">
                      <span className="nqb-inline-nudge-text">Describe what you want to see — I'll set the grouping &amp; filters. <em>e.g. "by agent, last 7 days"</em></span>
                      <div className="nqb-inline-nudge-actions" style={{ marginTop: 'var(--space-2)' }}>
                        <button className="nqb-nudge-action-btn" onClick={() => setAiDescribeOpen(true)}>Describe it</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="nqb-describe-bar" id="nqb-describe-bar">
                    <div className="nqb-describe-bar-inner">
                      <span className="nqb-describe-bar-icon" aria-hidden="true">✦</span>
                      <input
                        id="nqb-describe-input"
                        className="nqb-describe-input"
                        type="text"
                        placeholder='e.g. "by agent, last 7 days, status open"'
                        value={aiDescribeText}
                        onChange={e => setAiDescribeText(e.target.value)}
                        autoFocus
                      />
                      <button className="nqb-nudge-action-btn" style={{ borderRadius: '20px', flexShrink: 0 }} onClick={() => setAiDescribeOpen(false)}>Apply</button>
                      <button className="nqb-nudge-dismiss" onClick={() => setAiDescribeOpen(false)}>Cancel</button>
                    </div>
                  </div>
                )}
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--dark-teal)', marginBottom: 'var(--space-3)' }}>Time range</div>
                  <div className="nqb-time-row" id="nqb-time-row">
                    <button className={`nqb-time-btn${selectedTimePreset === 'today' ? ' selected' : ''}`} data-preset="today" onClick={() => setSelectedTimePreset('today')}>Today</button>
                    <button className={`nqb-time-btn${selectedTimePreset === '7d' ? ' selected' : ''}`} data-preset="7d" onClick={() => setSelectedTimePreset('7d')}>Last 7 days</button>
                    <button className={`nqb-time-btn${selectedTimePreset === '30d' ? ' selected' : ''}`} data-preset="30d" onClick={() => setSelectedTimePreset('30d')}>Last 30 days</button>
                    <button className={`nqb-time-btn${selectedTimePreset === '90d' ? ' selected' : ''}`} data-preset="90d" onClick={() => setSelectedTimePreset('90d')}>Last 90 days</button>
                    <button className={`nqb-time-btn${selectedTimePreset === 'mtd' ? ' selected' : ''}`} data-preset="mtd" onClick={() => setSelectedTimePreset('mtd')}>This month</button>
                    <button className={`nqb-time-btn${selectedTimePreset === 'ytd' ? ' selected' : ''}`} data-preset="ytd" onClick={() => setSelectedTimePreset('ytd')}>This year</button>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--dark-teal)', marginBottom: 'var(--space-3)' }}>Additional filters</div>
                  <div className="nqb-filter-list" id="nqb-filter-list"></div>
                  {/* Inline add-filter form */}
                  <div className="nqb-filter-form" id="nqb-filter-form" style={{ display: 'none' }}>
                    <div className="nqb-filter-form-row">
                      <select id="nqb-filter-field-sel" className="nqb-filter-sel">
                        <option value="">Field…</option>
                        <option>Status</option>
                        <option>Priority</option>
                        <option>Agent</option>
                        <option>Queue</option>
                        <option>Created At</option>
                        <option>Resolved At</option>
                      </select>
                      <select id="nqb-filter-op-sel" className="nqb-filter-sel">
                        <option value="equals">equals</option>
                        <option value="is not">is not</option>
                        <option value="contains">contains</option>
                        <option value="greater than">greater than</option>
                        <option value="less than">less than</option>
                      </select>
                      <input id="nqb-filter-val-inp" className="nqb-filter-val-input" type="text" placeholder="Value…" />
                    </div>
                    <div className="nqb-filter-form-actions">
                      <button className="nqb-nudge-action-btn">Add filter</button>
                      <button className="nqb-nudge-dismiss">Cancel</button>
                    </div>
                  </div>
                  <button className="nqb-add-filter-btn" id="nqb-add-filter-btn">
                    <span>+</span> Add a filter
                  </button>
                </div>
              </div>

              {/* Results view */}
              <div key={queryRan ? `res-${stepKey}` : 'res-off'} className={`nqb-results${queryRan && stepKey > 0 ? ' nqb-step-forward' : ''}`} id="nqb-results" style={{ display: queryRan ? 'flex' : 'none' }}>
                <div className="nqb-results-hd">
                  <div>
                    <div className="nqb-results-title" id="nqb-results-title">Query Results</div>
                    <div className="nqb-results-meta" id="nqb-results-meta">
                      {SAMPLE_ROWS[selectedArea]?.rows.length} rows · {selectedArea && AREA_LABELS[selectedArea]}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <button className={`nqb-results-back${activeBtn === 'edit-query' ? ' nqb-btn-loading' : ''}`} onClick={() => backFromResults('edit-query')}>
                      <svg width="11" height="11" viewBox="0 0 13 13" fill="none"><path d="M8.5 10.5L4.5 6.5l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Edit query
                    </button>
                  </div>
                </div>
                <div className="nqb-results-body">
                  <table className="nqb-results-table" id="nqb-results-table">
                    {SAMPLE_ROWS[selectedArea] && (
                      <>
                        <thead>
                          <tr>{SAMPLE_ROWS[selectedArea].cols.map(c => <th key={c}>{c}</th>)}</tr>
                        </thead>
                        <tbody>
                          {SAMPLE_ROWS[selectedArea].rows.map((row, ri) => (
                            <tr key={ri}>
                              {row.map((cell, ci) => {
                                const col = SAMPLE_ROWS[selectedArea].cols[ci]
                                const isStatus = col === 'status' || col === 'status'
                                const statusStyles = isStatus ? (
                                  cell === 'Resolved' || cell === 'Met'
                                    ? { bg: '#e8f5f0', color: '#1e6e4f', border: '#b3dece' }
                                  : cell === 'Open'
                                    ? { bg: '#e6f2fb', color: '#1356a3', border: '#a8ccee' }
                                  : cell === 'Escalated'
                                    ? { bg: '#fff3e0', color: '#a04000', border: '#f7c87a' }
                                  : cell === 'Pending'
                                    ? { bg: '#fdf4e0', color: '#8a6200', border: '#f0d88a' }
                                  : cell === 'Breached'
                                    ? { bg: '#fde8e8', color: '#9b1c1c', border: '#f5a8a8' }
                                  : null
                                ) : null
                                return (
                                  <td key={ci}>
                                    {statusStyles ? (
                                      <span style={{
                                        display: 'inline-flex', alignItems: 'center',
                                        padding: '2px 8px', borderRadius: '12px',
                                        fontSize: '11px', fontWeight: 600, letterSpacing: '0.01em',
                                        background: statusStyles.bg, color: statusStyles.color,
                                        border: `1px solid ${statusStyles.border}`
                                      }}>{cell}</span>
                                    ) : cell}
                                  </td>
                                )
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </>
                    )}
                  </table>
                </div>
                <div className="nqb-results-count" id="nqb-results-count"></div>
                {/* Kap AI nudge: step 4 */}
                {!summaryOpen && (
                  <div className="nqb-results-nudge" id="nqb-results-nudge">
                    <span className="nqb-inline-nudge-icon" aria-hidden="true">✦</span>
                    <span className="nqb-results-nudge-text">Want a plain-English summary of this data, or need to refine the query?</span>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button className="nqb-nudge-action-btn" onClick={() => setSummaryOpen(true)}>Summarise</button>
                      <button className={`nqb-nudge-action-btn${activeBtn === 'refine' ? ' nqb-btn-loading' : ''}`} onClick={() => backFromResults('refine')}>Refine</button>
                    </div>
                  </div>
                )}
                {/* Summary card */}
                {summaryOpen && (
                  <div className="nqb-summary-card" id="nqb-summary-card">
                    <span className="nqb-inline-nudge-icon" aria-hidden="true">✦</span>
                    <div className="nqb-summary-card-body">
                      <div className="nqb-summary-card-label">Kap AI Summary</div>
                      <div className="nqb-summary-card-text">{AREA_SUMMARY[selectedArea] || 'No summary available for this data set.'}</div>
                    </div>
                    <button className="nqb-nudge-dismiss" title="Dismiss" onClick={() => setSummaryOpen(false)}>
                      <svg width="12" height="12" viewBox="0 0 15 15" fill="none"><path d="M13.5 1.5L1.5 13.5M1.5 1.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Ask Kap AI: always-visible inline chat bar */}
              <div className="nqb-ai-thread" id="nqb-ai-thread" style={{ display: 'none' }}></div>

              {/* SQL Console */}
              <div className={`nqb-sql-pane${sqlOpen ? ' open' : ''}`} id="nqb-sql-pane">
                <div className="nqb-sql-pane-hd">
                  <span className="nqb-sql-pane-title">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3.5 4L1.5 6l2 2M8.5 4l2 2-2 2M5.5 9l1-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    SQL Console
                  </span>
                  <button className="nqb-sql-pane-close" aria-label="Close SQL console" onClick={() => setSqlOpen(false)}>
                    <svg width="8" height="8" viewBox="0 0 15 15" fill="none"><path d="M13.5 1.5L1.5 13.5M1.5 1.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <textarea
                  className="nqb-sql-editor"
                  id="nqb-sql-editor"
                  spellCheck="false"
                  placeholder="-- SQL will generate from your selections above"
                ></textarea>
                <div className="nqb-sql-ai-nudge" id="nqb-sql-nudge" style={{ display: 'none' }}>
                  <span className="nqb-sql-nudge-text"><b><span aria-hidden="true">✦ </span>Kap AI:</b> Prefer to describe the change? I'll write the SQL for you.</span>
                  <button className="nqb-sql-nudge-btn">Describe change</button>
                  <button className="nqb-sql-nudge-dismiss">Dismiss</button>
                </div>
              </div>

              {/* Floating bottom card: summary chips + nav buttons */}
              <div className={`nqb-actions${(!selectedArea && selectedCols.length === 0) ? ' is-empty' : ''}`} id="nqb-actions-bar">
                <div className="nqb-summary" id="nqb-summary">
                  {(!selectedArea && selectedCols.length === 0) ? (
                    <span className="nqb-summary-empty" id="nqb-summary-empty">Your query will appear here as you build it.</span>
                  ) : (
                    <>
                      {selectedArea && <span className="nqb-summary-chip">{AREA_LABELS[selectedArea]}</span>}
                      {selectedCols.length > 0 && <span className="nqb-summary-chip">{selectedCols.length} columns</span>}
                      {selectedTimePreset && <span className="nqb-summary-chip">{TIME_PRESET_LABELS[selectedTimePreset]}</span>}
                    </>
                  )}
                </div>
                <div className="nqb-actions-nav">
                  <button
                    className={`nqb-back-btn${activeBtn === 'back' ? ' nqb-btn-loading' : ''}`}
                    id="nqb-back-btn"
                    style={{ visibility: nqStep > 1 ? 'visible' : 'hidden' }}
                    disabled={!!activeBtn}
                    onClick={() => navigateStep(nqStep - 1, 'back', null, 'back')}
                  >&larr; Back</button>
                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    {nqStep < 4 && (
                      <button className={`nqb-continue-btn${activeBtn === 'continue' ? ' nqb-btn-loading' : ''}`} id="nqb-continue-btn" disabled={!!activeBtn} onClick={() => navigateStep(nqStep + 1, 'continue')}>Continue &rarr;</button>
                    )}
                    {nqStep === 4 && (
                      <button className={`nqb-run-btn${activeBtn === 'run' ? ' nqb-btn-loading' : ''}`} id="nqb-run-btn" disabled={!!activeBtn} onClick={runQueryDelayed}>&#9654; Run Query</button>
                    )}
                  </div>
                </div>
              </div>

            </div>{/* /nqb-left */}
          </div>{/* /nqb-body */}
        </div>{/* /nqb-page */}
      </div>{/* /ds-new-question */}

      {/* ── Dashboard View (opened dashboard) ── */}
      <div
        id="dashboard-view"
        style={{ display: isDashboardView ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}
      >
        <div className="dv-controls">
          <button className="dv-ctl-btn">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="0.5" y="1.5" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4 0.5v2M8 0.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M3.5 6.5h5M3.5 8.5h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".6"/>
            </svg>
            Last 7 Days
            <svg className="dv-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2.5 3.5L5 6.5L7.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="dv-ctl-btn">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 2.5h10M3 6h6M5 9.5h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Filters
            <span className="dv-filter-badge">3</span>
            <svg className="dv-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2.5 3.5L5 6.5L7.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={{ flex: 1 }}></div>
          <div className="dv-search">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="5.5" cy="5.5" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M8.5 8.5L11 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input placeholder="Search metrics…" />
          </div>
          <div className="dv-divider"></div>
          <button className="dv-ctl-btn">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 6.5A5 5 0 0 1 10 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M11.5 6.5A5 5 0 0 1 3 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M9 0.5v2H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 10.5v2H2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
          <button className="dv-ctl-btn">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="9.5" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="9.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="2.5" cy="6"   r="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4 5.2L8.1 3.3M4 6.8l4.1 1.9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Share
          </button>
          <button className="dv-ctl-btn">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7M3.5 5.5L6 8l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 9v1.5A1.5 1.5 0 0 0 2.5 12h7A1.5 1.5 0 0 0 11 10.5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Export
          </button>
          <button className="dv-btn-primary">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8.5 1.5L10.5 3.5L4 10H2v-2L8.5 1.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Edit
          </button>
        </div>
        <div className="dv-body" id="dv-body">
          <DashboardBody cfg={activeDashId ? DV_CONFIGS_BY_ID[activeDashId] : null}/>
        </div>
      </div>

    </div>
  )
}
