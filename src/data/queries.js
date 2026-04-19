export const QUERIES = [
  { id: 'q1', name: 'Ticket Volume by Agent', desc: 'Daily ticket counts grouped by agent', category: 'Volume', viz: 'bar', updated: '2h ago' },
  { id: 'q2', name: 'Avg Resolution Time', desc: 'Mean time to resolve across queues', category: 'Performance', viz: 'line', updated: '4h ago' },
  { id: 'q3', name: 'SLA Compliance Rate', desc: 'Percentage of tickets resolved within SLA', category: 'SLA', viz: 'gauge', updated: '1d ago' },
  { id: 'q4', name: 'Top 10 Customers by Open Tickets', desc: 'Ranked by open ticket count', category: 'Customers', viz: 'table', updated: '3h ago' },
  { id: 'q5', name: 'Agent Performance Scorecard', desc: 'CSAT, resolution time, escalation rate', category: 'Performance', viz: 'table', updated: '6h ago' },
  { id: 'q6', name: 'Ticket Type Distribution', desc: 'Breakdown by ticket category', category: 'Volume', viz: 'donut', updated: '2d ago' },
  { id: 'q7', name: 'First Response Time Trend', desc: 'FRT over last 30 days by channel', category: 'Performance', viz: 'line', updated: '5h ago' },
  { id: 'q8', name: 'Escalation Rate by Queue', desc: 'Percentage of tickets escalated per queue', category: 'Escalation', viz: 'bar', updated: '3h ago' },
  { id: 'q9', name: 'Customer Satisfaction Score', desc: 'CSAT scores over time with trend line', category: 'CSAT', viz: 'line', updated: '1h ago' },
  { id: 'q10', name: 'Open Tickets by Priority', desc: 'Current open ticket distribution by priority', category: 'Volume', viz: 'donut', updated: '30m ago' },
  { id: 'q11', name: 'Agent Utilization Rate', desc: 'Active vs idle time per agent', category: 'Performance', viz: 'bar', updated: '2h ago' },
  { id: 'q12', name: 'Repeat Contact Rate', desc: 'Customers contacting support more than once', category: 'Quality', viz: 'metric', updated: '12h ago' },
  { id: 'q13', name: 'Knowledge Base Deflection', desc: 'Tickets resolved via KB without agent assist', category: 'Deflection', viz: 'gauge', updated: '1d ago' },
  { id: 'q14', name: 'Backlog Trend', desc: 'Daily unresolved ticket count over 30 days', category: 'Volume', viz: 'area', updated: '4h ago' },
  { id: 'q15', name: 'Queue Wait Time Distribution', desc: 'Time in queue before first agent response', category: 'SLA', viz: 'bar', updated: '6h ago' },
]

export const QB_DATA = {
  tables: ['tickets', 'agents', 'queues', 'customers', 'sla_policies'],
  fields: {
    tickets: ['id', 'created_at', 'resolved_at', 'status', 'priority', 'agent_id', 'queue_id', 'customer_id', 'category'],
    agents: ['id', 'name', 'email', 'team', 'shift'],
    queues: ['id', 'name', 'type', 'sla_policy_id'],
    customers: ['id', 'name', 'email', 'segment'],
    sla_policies: ['id', 'name', 'response_time', 'resolution_time'],
  }
}

export const QB_MOCK_ROWS = [
  { id: 'TK-1001', created_at: '2026-03-01', status: 'Resolved', priority: 'High', agent: 'Priya S.', queue: 'Tier 1', resolution_time: '45m', csat: 4.5 },
  { id: 'TK-1002', created_at: '2026-03-01', status: 'Open',     priority: 'Medium', agent: 'Ravi K.',  queue: 'Tier 2', resolution_time: '—',   csat: null },
  { id: 'TK-1003', created_at: '2026-03-02', status: 'Resolved', priority: 'Low',    agent: 'Meena R.', queue: 'Tier 1', resolution_time: '1h 2m', csat: 5.0 },
  { id: 'TK-1004', created_at: '2026-03-02', status: 'Escalated',priority: 'High',   agent: 'Arjun T.', queue: 'Tier 3', resolution_time: '2h 15m', csat: 3.2 },
  { id: 'TK-1005', created_at: '2026-03-03', status: 'Resolved', priority: 'Medium', agent: 'Priya S.', queue: 'Tier 1', resolution_time: '38m', csat: 4.8 },
]
