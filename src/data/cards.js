/* ── Card template data ─────────────────────────────────────── */
export const CARDS = [
  { id: 'open-tickets',   name: 'Open Tickets',           desc: 'Real-time count of all open tickets across channels',       category: 'Volume',      preview: 'kpi',   kpiVal: '2,847', kpiTrend: '+12%',   kpiUp: true  },
  { id: 'avg-response',   name: 'Avg Response Time',       desc: 'Mean first response time across all agents and queues',     category: 'Performance', preview: 'bar'  },
  { id: 'sentiment',      name: 'Customer Sentiment',      desc: 'CSAT & NPS rolling 30-day score trend',                    category: 'Experience',  preview: 'area' },
  { id: 'sla-breach',     name: 'SLA Breach Rate',         desc: 'Percentage of tickets that breached their SLA target',     category: 'Compliance',  preview: 'kpi',   kpiVal: '4.2%',  kpiTrend: '+0.8%',  kpiUp: false },
  { id: 'agent-perf',     name: 'Agent Performance',       desc: 'Tickets resolved per agent per day across all teams',      category: 'Performance', preview: 'hbar'     },
  { id: 'fcr',            name: 'First Call Resolution',   desc: 'Issues fully resolved on the first customer contact',      category: 'Quality',     preview: 'donut73'  },
  { id: 'csat',           name: 'CSAT Score',              desc: 'Overall customer satisfaction rating this month',          category: 'Experience',  preview: 'kpi',   kpiVal: '87',    kpiTrend: '+3 pts', kpiUp: true  },
  { id: 'volume-trend',   name: 'Volume Trends',           desc: 'Ticket intake over time broken down by channel',           category: 'Volume',      preview: 'multiline'},
  { id: 'queue',          name: 'Queue Analytics',         desc: 'Queue depth, wait times and throughput by queue',          category: 'Operations',  preview: 'scatter'  },
  { id: 'resolution',     name: 'Resolution Time',         desc: 'End-to-end time from ticket open to final close',         category: 'Performance', preview: 'step'     },
  { id: 'escalations',    name: 'Escalation Rate',         desc: 'Tickets escalated to a higher support tier',              category: 'Quality',     preview: 'kpi',   kpiVal: '8.1%',  kpiTrend: '+1.2%',  kpiUp: false },
  { id: 'agent-util',     name: 'Agent Utilization',       desc: 'Workload balance, capacity and availability by team',      category: 'Operations',  preview: 'donut68'},
];

export const CATEGORIES = ['All', 'Volume', 'Performance', 'Experience', 'Compliance', 'Quality', 'Operations'];
