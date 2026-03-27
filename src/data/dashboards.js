/* ── Dashboard list data ─────────────────────────────────────── */
export const DASHBOARDS_DATA = [
  { id:'d1', name:'Agent Performance Overview',   desc:'Call volume, handle time, and resolution metrics',          tiles:4, updated:'2h ago',   mode:'manual', thumb:'hbar',     visibility:'private' },
  { id:'d2', name:'CSAT & Quality Tracker',       desc:'Customer satisfaction scores and quality audit results',    tiles:3, updated:'yesterday', mode:'manual', thumb:'donut73',  visibility:'public'  },
  { id:'d3', name:'Volume & Trend Analysis',      desc:'Call volume patterns over time by channel',                tiles:3, updated:'6h ago',   mode:'manual', thumb:'area',     visibility:'public'  },
  { id:'d4', name:'AI-Powered Insights',          desc:'AI-generated trend analysis and predictions',              tiles:5, updated:'3d ago',   mode:'ai',     thumb:'multiline', visibility:'private' },
  { id:'d5', name:'Smart Escalation Monitor',     desc:'AI-detected escalation patterns and risk scores',          tiles:3, updated:'1w ago',   mode:'ai',     thumb:'scatter',   visibility:'private' },
  { id:'d6', name:'Operations Command Center',    desc:'Real-time hybrid view of operations and AI signals',       tiles:6, updated:'5h ago',   mode:'hybrid', thumb:'bar',       visibility:'public'  },
  { id:'d7', name:'Compliance & Audit Board',     desc:'Regulation adherence with AI flagging assistance',         tiles:4, updated:'2d ago',   mode:'hybrid', thumb:'step',      visibility:'private' },
  { id:'d8', name:'Team Productivity Mix',        desc:'Manual KPIs combined with AI workload predictions',        tiles:5, updated:'4d ago',   mode:'hybrid', thumb:'area2',     visibility:'public'  },
];

/* ── Dashboard tile configs by dashboard ID ───────────────────── */
export const DV_CONFIGS_BY_ID = {
  /* ── d1: Agent Performance Overview ─────────────────────────── */
  d1: {
    layout:'standard', areaVariant:'standard',
    kpis:[
      { icon:'ticket', label:'Resolved Tickets',  val:'2,847', delta:'+12%',   up:true,  compare:'vs prev period', sparkData:[60,70,65,82,78,90,95] },
      { icon:'clock',  label:'Avg Handle Time',   val:'4m 32s',delta:'−8s',    up:true,  compare:'vs prev period', sparkData:[90,85,88,82,79,76,74] },
      { icon:'star',   label:'First Call Res.',    val:'78.4%', delta:'+2.1%',  up:true,  compare:'vs prev period', sparkData:[72,73,74,75,76,77,78] },
      { icon:'alert',  label:'Agent Utilization', val:'86%',   delta:'+4%',    up:true,  compare:'vs prev period', sparkData:[76,78,80,81,83,85,86] },
    ],
    areaTitle:'Daily Ticket Volume', areaSub:'Resolved vs incoming · last 7 days',
    donutTitle:'Ticket Type Mix', donutSub:'Breakdown by issue category',
    donutData:[
      { label:'Technical', val:'34%', color:'#4DB6AC' },
      { label:'Billing',   val:'27%', color:'#3B82F6' },
      { label:'Account',   val:'21%', color:'#10B981' },
      { label:'Other',     val:'18%', color:'#F59E0B' },
    ],
    donutCenter:'2,847', donutCenterSub:'total',
    barTitle:'Agent Performance Score', barSub:'Composite quality · last 7 days',
    barData:[
      { name:'Gurram Triveni',    val:94, color:'#4DB6AC' },
      { name:'Kattoju U. Rani',   val:88, color:'#3B82F6' },
      { name:'Swetha Neerudu',    val:85, color:'#10B981' },
      { name:'Laxmi Singh',       val:82, color:'#F59E0B' },
      { name:'Patangey V. Kumar', val:78, color:'#A78BFA' },
      { name:'Ravi Shankar',      val:73, color:'#F87171' },
    ],
    tableTitle:'Recent Ticket Activity', tableSub:'Latest updates across all queues',
  },

  /* ── d2: CSAT & Quality Tracker ─────────────────────────────── */
  d2: {
    layout:'quality',
    kpis:[
      { icon:'star',   label:'CSAT Score',      val:'87.3%', delta:'+3.1%',  up:true, compare:'vs prev period', sparkData:[78,80,82,82,84,85,87] },
      { icon:'ticket', label:'NPS Score',        val:'+42',   delta:'+8 pts', up:true, compare:'vs prev period', sparkData:[28,31,34,36,38,40,42] },
      { icon:'star',   label:'QA Audit Score',   val:'91%',   delta:'+1.5%',  up:true, compare:'vs prev period', sparkData:[86,87,88,89,90,90,91] },
      { icon:'alert',  label:'Sentiment Index',  val:'0.74',  delta:'+0.06',  up:true, compare:'vs prev period', sparkData:[60,63,66,68,70,72,74] },
    ],
    lineTitle:'CSAT Trend by Team', lineSub:'Weekly satisfaction score · 4 teams',
    lineData:[
      { color:'#4DB6AC', label:'Team Alpha', data:[82,84,85,87,86,88,87] },
      { color:'#3B82F6', label:'Team Beta',  data:[76,78,79,81,82,83,84] },
      { color:'#10B981', label:'Team Gamma', data:[70,71,73,75,76,77,79] },
      { color:'#F59E0B', label:'Team Delta', data:[64,65,67,68,70,71,73], dashed:true },
    ],
    barTitle:'QA Score by Agent', barSub:'Quality audit results · last 30 days',
    barData:[
      { name:'Gurram Triveni',    val:96, color:'#4DB6AC' },
      { name:'Kattoju U. Rani',   val:93, color:'#3B82F6' },
      { name:'Swetha Neerudu',    val:91, color:'#10B981' },
      { name:'Laxmi Singh',       val:89, color:'#F59E0B' },
      { name:'Patangey V. Kumar', val:85, color:'#A78BFA' },
      { name:'Ravi Shankar',      val:81, color:'#F87171' },
    ],
    donutTitle:'Sentiment Breakdown', donutSub:'Customer sentiment distribution',
    donutData:[
      { label:'Positive', val:'58%', color:'#10B981' },
      { label:'Neutral',  val:'26%', color:'#F59E0B' },
      { label:'Negative', val:'16%', color:'#F87171' },
    ],
    donutCenter:'0.74', donutCenterSub:'index',
  },

  /* ── d3: Volume & Trend Analysis ────────────────────────────── */
  d3: {
    layout:'trend',
    kpis:[
      { icon:'ticket', label:'Inbound Tickets',  val:'3,241', delta:'+9%',    up:true,  compare:'vs prev period', sparkData:[55,65,70,75,80,88,95] },
      { icon:'star',   label:'Resolved Today',   val:'2,847', delta:'+12%',   up:true,  compare:'vs prev period', sparkData:[60,70,65,82,78,90,95] },
      { icon:'alert',  label:'Backlog',           val:'394',   delta:'+18',    up:false, compare:'vs prev period', sparkData:[32,33,34,36,37,38,39] },
      { icon:'clock',  label:'SLA Compliance',   val:'95.8%', delta:'+0.4%',  up:true,  compare:'vs prev period', sparkData:[93,94,94,95,95,95,96] },
    ],
    areaTitle:'Volume by Channel', areaSub:'Stacked inbound tickets by source · last 7 days',
    barTitle:'Channel Volume', barSub:'Total tickets per source channel · this week',
    barData:[
      { name:'Chat',     val:1362, color:'#4DB6AC' },
      { name:'Email',    val:908,  color:'#3B82F6' },
      { name:'Voice',    val:583,  color:'#10B981' },
      { name:'Social',   val:245,  color:'#A78BFA' },
      { name:'WhatsApp', val:143,  color:'#F59E0B' },
    ],
    funnelTitle:'Ticket Resolution Flow', funnelSub:'Stage conversion · this week',
    funnelData:[
      { label:'Inbound',     val:'3,241', pct:100,  color:'#4DB6AC' },
      { label:'Queued',      val:'3,104', pct:95.8, color:'#3B82F6' },
      { label:'In Progress', val:'2,963', pct:91.4, color:'#10B981' },
      { label:'Resolved',    val:'2,847', pct:87.8, color:'#F59E0B' },
      { label:'Escalated',   val:'124',   pct:3.8,  color:'#F87171' },
    ],
  },

  /* ── d4: AI-Powered Insights ─────────────────────────────────── */
  d4: {
    layout:'ai-insights',
    kpis:[
      { icon:'ticket', label:'AI Resolved',      val:'1,203', delta:'+34%',   up:true, compare:'vs prev period', sparkData:[50,62,70,82,90,110,120] },
      { icon:'star',   label:'Prediction Acc.',  val:'94.1%', delta:'+2.3%',  up:true, compare:'vs prev period', sparkData:[88,89,90,91,92,93,94] },
      { icon:'clock',  label:'Avg AI Response',  val:'6m 10s',delta:'−42s',   up:true, compare:'vs prev period', sparkData:[9,8.8,8.5,8,7.5,7,6.2] },
      { icon:'alert',  label:'Escalation Risk',  val:'2.8%',  delta:'−0.5%',  up:true, compare:'vs prev period', sparkData:[45,42,40,38,35,31,28] },
    ],
    lineTitle:'AI vs Human Resolution Trend', lineSub:'Ticket handling method · last 7 days',
    lineData:[
      { color:'#10B981', label:'AI Resolved',    data:[25,30,35,42,50,56,62] },
      { color:'#4DB6AC', label:'Human Resolved', data:[75,70,65,58,50,44,38] },
      { color:'#A78BFA', label:'Escalated',      data:[50,45,40,38,35,32,30], dashed:true },
    ],
    gaugeTitle:'AI Confidence by Category', gaugeSub:'Classification certainty scores',
    gauges:[
      { label:'Billing',   pct:91, color:'#4DB6AC', val:'91%' },
      { label:'Technical', pct:87, color:'#3B82F6', val:'87%' },
      { label:'Returns',   pct:96, color:'#10B981', val:'96%' },
    ],
    barTitle:'Confidence by Category', barSub:'Score per issue class · last 7 days',
    barData:[
      { name:'Returns',   val:96, color:'#10B981' },
      { name:'Billing',   val:91, color:'#4DB6AC' },
      { name:'Technical', val:87, color:'#3B82F6' },
      { name:'Account',   val:82, color:'#F59E0B' },
      { name:'General',   val:74, color:'#A78BFA' },
      { name:'Other',     val:68, color:'#F87171' },
    ],
    tableTitle:'AI Activity Log', tableSub:'Recent automated resolutions',
    tableRows:[
      { id:'#A-2931', agent:'AI Bot v2.1', queue:'Billing',   status:'resolved',  time:'1m ago'  },
      { id:'#A-2930', agent:'AI Bot v2.1', queue:'Account',   status:'resolved',  time:'3m ago'  },
      { id:'#A-2929', agent:'AI Bot v1.8', queue:'Returns',   status:'pending',   time:'6m ago'  },
      { id:'#A-2928', agent:'AI Bot v2.1', queue:'Technical', status:'escalated', time:'9m ago'  },
      { id:'#A-2927', agent:'AI Bot v2.1', queue:'General',   status:'resolved',  time:'11m ago' },
      { id:'#A-2926', agent:'AI Bot v1.8', queue:'Billing',   status:'resolved',  time:'14m ago' },
    ],
  },

  /* ── d5: Smart Escalation Monitor ───────────────────────────── */
  d5: {
    layout:'standard', areaVariant:'escalating',
    kpis:[
      { icon:'alert',  label:'Total Escalations', val:'124',   delta:'+6',     up:false, compare:'vs prev period', sparkData:[90,95,100,105,112,118,124] },
      { icon:'clock',  label:'Escalation Rate',   val:'4.4%',  delta:'+0.3%',  up:false, compare:'vs prev period', sparkData:[38,39,40,41,42,43,44] },
      { icon:'clock',  label:'Avg Time to Esc.',  val:'18m',   delta:'+2m',    up:false, compare:'vs prev period', sparkData:[14,15,15,16,17,17,18] },
      { icon:'star',   label:'AI Flagged',         val:'89',    delta:'+11',    up:false, compare:'vs prev period', sparkData:[60,65,70,74,80,84,89] },
    ],
    areaTitle:'Escalation Volume Trend', areaSub:'Daily escalations · last 7 days',
    donutTitle:'Escalation Reasons', donutSub:'Primary cause breakdown',
    donutData:[
      { label:'Technical', val:'32%', color:'#4DB6AC' },
      { label:'Billing',   val:'28%', color:'#F87171' },
      { label:'Delivery',  val:'19%', color:'#F59E0B' },
      { label:'Policy',    val:'14%', color:'#A78BFA' },
      { label:'Other',     val:'7%',  color:'#3B82F6' },
    ],
    donutCenter:'4.4%', donutCenterSub:'esc. rate',
    barTitle:'Agent Escalation Risk', barSub:'Risk index · lower is better',
    barData:[
      { name:'Ravi Shankar',      val:72, color:'#F87171' },
      { name:'Patangey V. Kumar', val:58, color:'#F59E0B' },
      { name:'Laxmi Singh',       val:49, color:'#F59E0B' },
      { name:'Swetha Neerudu',    val:31, color:'#10B981' },
      { name:'Kattoju U. Rani',   val:24, color:'#10B981' },
      { name:'Gurram Triveni',    val:18, color:'#4DB6AC' },
    ],
    tableTitle:'Recent Escalations', tableSub:'Flagged tickets in last 24h',
    tableRows:[
      { id:'#677218', agent:'Ravi Shankar',      queue:'Technical', status:'escalated', time:'12m ago'  },
      { id:'#677215', agent:'Patangey V. Kumar', queue:'Billing',   status:'escalated', time:'24m ago'  },
      { id:'#677212', agent:'Laxmi Singh',       queue:'Delivery',  status:'escalated', time:'38m ago'  },
      { id:'#677209', agent:'Swetha Neerudu',    queue:'Policy',    status:'pending',   time:'1h ago'   },
      { id:'#677204', agent:'Kattoju U. Rani',   queue:'Technical', status:'escalated', time:'1h 20m'   },
      { id:'#677198', agent:'Ravi Shankar',      queue:'Billing',   status:'escalated', time:'2h ago'   },
    ],
  },

  /* ── d6: Operations Command Center ──────────────────────────── */
  d6: {
    layout:'ops-command',
    kpis:[
      { icon:'ticket', label:'Total Tickets',  val:'3,412', delta:'+9%',    up:true, compare:'vs prev period', sparkData:[50,60,72,68,85,90,100] },
      { icon:'star',   label:'SLA Rate',        val:'97.1%', delta:'+1.2%',  up:true, compare:'vs prev period', sparkData:[94,95,95,96,96,97,97] },
      { icon:'clock',  label:'Avg Wait Time',   val:'2m 14s',delta:'−18s',   up:true, compare:'vs prev period', sparkData:[35,32,30,28,26,25,22] },
      { icon:'alert',  label:'Queue Depth',     val:'18',    delta:'−4',     up:true, compare:'vs current',     sparkData:[28,26,24,22,21,20,18] },
      { icon:'ticket', label:'Active Agents',   val:'42',    delta:'+3',     up:true, compare:'vs yesterday',   sparkData:[35,36,38,39,40,41,42] },
      { icon:'star',   label:'Automation Rate', val:'63%',   delta:'+8%',    up:true, compare:'vs prev period', sparkData:[50,53,56,58,60,62,63] },
    ],
    areaTitle:'Live Ticket Flow', areaSub:'Ops volume · last 7 days',
    donutTitle:'Handling Mode', donutSub:'Manual vs AI vs hybrid split',
    donutData:[
      { label:'Manual',  val:'37%', color:'#4DB6AC' },
      { label:'AI Auto', val:'36%', color:'#A78BFA' },
      { label:'Hybrid',  val:'20%', color:'#3B82F6' },
      { label:'Pending', val:'7%',  color:'#F59E0B' },
    ],
    donutCenter:'63%', donutCenterSub:'automated',
    vbarTitle:'Hourly Volume', vbarSub:'Ticket intake by time band',
    vbarData:[
      { label:'08–10', bars:[{ val:142, color:'#4DB6AC' }, { val:118, color:'rgba(77,182,172,0.3)' }] },
      { label:'10–12', bars:[{ val:198, color:'#4DB6AC' }, { val:163, color:'rgba(77,182,172,0.3)' }] },
      { label:'12–14', bars:[{ val:156, color:'#4DB6AC' }, { val:141, color:'rgba(77,182,172,0.3)' }] },
      { label:'14–16', bars:[{ val:234, color:'#4DB6AC' }, { val:198, color:'rgba(77,182,172,0.3)' }] },
      { label:'16–18', bars:[{ val:187, color:'#4DB6AC' }, { val:165, color:'rgba(77,182,172,0.3)' }] },
      { label:'18–20', bars:[{ val:98,  color:'#4DB6AC' }, { val:76,  color:'rgba(77,182,172,0.3)' }] },
    ],
    tableTitle:'Live Operations Feed', tableSub:'All channels · real-time',
  },

  /* ── d7: Compliance & Audit Board ───────────────────────────── */
  d7: {
    layout:'standard', areaVariant:'stable',
    kpis:[
      { icon:'star',   label:'Compliance Score', val:'96.2%', delta:'+0.8%',  up:true, compare:'vs prev month', sparkData:[93,94,94,95,95,96,96] },
      { icon:'alert',  label:'Violations',        val:'12',    delta:'−5',     up:true, compare:'vs prev month', sparkData:[22,20,19,18,16,14,12] },
      { icon:'ticket', label:'Audited',            val:'487',   delta:'+42',    up:true, compare:'vs prev month', sparkData:[40,41,42,44,45,47,48] },
      { icon:'alert',  label:'AI Flagged',         val:'24',    delta:'−8',     up:true, compare:'vs prev month', sparkData:[38,36,34,32,30,27,24] },
    ],
    areaTitle:'Compliance Score Over Time', areaSub:'7-day rolling compliance rate',
    donutTitle:'Violation Categories', donutSub:'Breakdown of non-compliant interactions',
    donutData:[
      { label:'Script Dev.',  val:'34%', color:'#F87171' },
      { label:'Data Handling',val:'26%', color:'#F59E0B' },
      { label:'Escalation',   val:'21%', color:'#A78BFA' },
      { label:'Disclosure',   val:'19%', color:'#3B82F6' },
    ],
    donutCenter:'96.2%', donutCenterSub:'compliant',
    barTitle:'Compliance by Category', barSub:'Pass rate per policy area',
    barData:[
      { name:'Data Privacy',     val:99, color:'#10B981' },
      { name:'Disclosure',       val:97, color:'#3B82F6' },
      { name:'Script Adherence', val:94, color:'#4DB6AC' },
      { name:'Billing Rules',    val:98, color:'#A78BFA' },
      { name:'Escalation SOP',   val:91, color:'#F59E0B' },
      { name:'AI Ethics',        val:96, color:'#F87171' },
    ],
    tableTitle:'Recent Audit Log', tableSub:'Flagged & reviewed interactions · 24h',
    tableRows:[
      { id:'#AUD-441', agent:'Gurram Triveni',    queue:'Script',    status:'resolved',  time:'14:22' },
      { id:'#AUD-440', agent:'Ravi Shankar',      queue:'Data',      status:'pending',   time:'13:05' },
      { id:'#AUD-439', agent:'Patangey V. Kumar', queue:'Billing',   status:'escalated', time:'11:44' },
      { id:'#AUD-438', agent:'Laxmi Singh',       queue:'Disclosure',status:'resolved',  time:'10:18' },
      { id:'#AUD-437', agent:'Swetha Neerudu',    queue:'Script',    status:'resolved',  time:'09:32' },
      { id:'#AUD-436', agent:'Kattoju U. Rani',   queue:'Data',      status:'pending',   time:'Yesterday' },
    ],
  },

  /* ── d8: Team Productivity Mix ───────────────────────────────── */
  d8: {
    layout:'productivity',
    kpis:[
      { icon:'star',   label:'Productivity Index', val:'88%',  delta:'+4%',   up:true, compare:'vs prev period', sparkData:[78,80,82,83,85,87,88] },
      { icon:'star',   label:'Goals Met',           val:'94%',  delta:'+2%',   up:true, compare:'vs prev period', sparkData:[88,89,90,91,92,93,94] },
      { icon:'clock',  label:'Avg Idle Time',       val:'6m',   delta:'−1m',   up:true, compare:'vs prev period', sparkData:[9,8.5,8,7.5,7,6.5,6] },
      { icon:'alert',  label:'Team Workload',       val:'72%',  delta:'+5%',   up:true, compare:'vs prev period', sparkData:[62,64,66,68,69,71,72] },
    ],
    vbarTitle:'Team Performance', vbarSub:'Actual vs target tickets · this week',
    vbarData:[
      { label:'Support L1', bars:[{ val:198, color:'#4DB6AC' }, { val:180, color:'rgba(77,182,172,0.3)' }] },
      { label:'Support L2', bars:[{ val:134, color:'#3B82F6' }, { val:150, color:'rgba(59,130,246,0.3)' }] },
      { label:'Billing',    bars:[{ val:115, color:'#10B981' }, { val:120, color:'rgba(16,185,129,0.3)' }] },
      { label:'Technical',  bars:[{ val:99,  color:'#F59E0B' }, { val:110, color:'rgba(245,158,11,0.3)'  }] },
    ],
    gaugeTitle:'Goal Completion', gaugeSub:'Key targets · current period',
    gauges:[
      { label:'Tickets Resolved', pct:94, color:'#4DB6AC', val:'94%' },
      { label:'Quality Target',   pct:91, color:'#10B981', val:'91%' },
      { label:'Speed Target',     pct:87, color:'#3B82F6', val:'87%' },
    ],
    funnelTitle:'Resolution Flow', funnelSub:'Ticket lifecycle conversion',
    funnelData:[
      { label:'Assigned',    val:'1,284', pct:100,  color:'#4DB6AC' },
      { label:'In Progress', val:'1,198', pct:93.3, color:'#3B82F6' },
      { label:'Reviewed',    val:'1,042', pct:81.2, color:'#10B981' },
      { label:'Resolved',    val:'968',   pct:75.4, color:'#F59E0B' },
      { label:'Closed',      val:'921',   pct:71.7, color:'#A78BFA' },
    ],
    tableTitle:'Team Performance Log', tableSub:'Agent activity · last 7 days',
    tableRows:[
      { id:'Gurram T.',   agent:'Support L1', queue:'94%',  status:'resolved', time:'88 tkts' },
      { id:'Kattoju U.',  agent:'Support L1', queue:'91%',  status:'resolved', time:'76 tkts' },
      { id:'Swetha N.',   agent:'Support L2', queue:'89%',  status:'resolved', time:'68 tkts' },
      { id:'Laxmi S.',    agent:'Billing',    queue:'96%',  status:'resolved', time:'72 tkts' },
      { id:'Patangey V.', agent:'Technical',  queue:'83%',  status:'pending',  time:'54 tkts' },
      { id:'Ravi S.',     agent:'Support L2', queue:'79%',  status:'pending',  time:'48 tkts' },
    ],
  },
};

/* ── Dashboard activity feed ─────────────────────────────────── */
export const DV_ACTIVITY = [
  { id:'#677218', agent:'Gurram Triveni',    queue:'Support',   status:'open',      time:'2m ago'  },
  { id:'#677219', agent:'Kattoju U. Rani',   queue:'Billing',   status:'resolved',  time:'5m ago'  },
  { id:'#677220', agent:'Swetha Neerudu',    queue:'Support',   status:'pending',   time:'8m ago'  },
  { id:'#677221', agent:'Laxmi Singh',       queue:'Technical', status:'escalated', time:'12m ago' },
  { id:'#677222', agent:'Patangey V. Kumar', queue:'Support',   status:'resolved',  time:'15m ago' },
  { id:'#677223', agent:'Ravi Shankar',      queue:'General',   status:'open',      time:'18m ago' },
];

export const CHART_PALETTE = ['#4DB6AC','#3B82F6','#10B981','#F59E0B','#A78BFA','#F87171'];
