export const NQB_COLS = {
  tickets: [
    { key: 'ticket_id',      label: 'Ticket ID' },
    { key: 'created_at',     label: 'Created At' },
    { key: 'resolved_at',    label: 'Resolved At' },
    { key: 'status',         label: 'Status' },
    { key: 'priority',       label: 'Priority' },
    { key: 'category',       label: 'Category' },
    { key: 'agent_name',     label: 'Agent Name' },
    { key: 'queue_name',     label: 'Queue Name' },
    { key: 'customer_name',  label: 'Customer Name' },
    { key: 'resolution_time',label: 'Resolution Time' },
    { key: 'csat',           label: 'CSAT Score' },
    { key: 'escalated',      label: 'Escalated' },
  ],
}

export const NQB_DEFAULT_COLS = ['ticket_id', 'created_at', 'status', 'priority', 'agent_name', 'resolution_time', 'csat']

export const NQB_MOCK_ROWS = [
  { ticket_id: 'TK-1001', created_at: '2026-03-01', status: 'Resolved', priority: 'High',   agent_name: 'Priya S.',  resolution_time: '45m',    csat: '4.5' },
  { ticket_id: 'TK-1002', created_at: '2026-03-01', status: 'Open',     priority: 'Medium', agent_name: 'Ravi K.',   resolution_time: '—',       csat: '—'   },
  { ticket_id: 'TK-1003', created_at: '2026-03-02', status: 'Resolved', priority: 'Low',    agent_name: 'Meena R.',  resolution_time: '1h 2m',  csat: '5.0' },
  { ticket_id: 'TK-1004', created_at: '2026-03-02', status: 'Escalated',priority: 'High',   agent_name: 'Arjun T.',  resolution_time: '2h 15m', csat: '3.2' },
  { ticket_id: 'TK-1005', created_at: '2026-03-03', status: 'Resolved', priority: 'Medium', agent_name: 'Priya S.',  resolution_time: '38m',    csat: '4.8' },
  { ticket_id: 'TK-1006', created_at: '2026-03-03', status: 'Resolved', priority: 'Low',    agent_name: 'Sita L.',   resolution_time: '52m',    csat: '4.2' },
  { ticket_id: 'TK-1007', created_at: '2026-03-04', status: 'Open',     priority: 'High',   agent_name: 'Dev M.',    resolution_time: '—',       csat: '—'   },
  { ticket_id: 'TK-1008', created_at: '2026-03-04', status: 'Resolved', priority: 'Medium', agent_name: 'Priya S.',  resolution_time: '1h 10m', csat: '4.7' },
]
