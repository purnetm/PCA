export const INTENT_DATA = [
  { id: 'cs',           label: 'Customer Support & General', count: 7420, pct: 40.2, pos: 62, neutral: 28, neg: 10 },
  { id: 'orders',       label: 'Orders & Tracking',          count: 4830, pct: 26.2, pos: 58, neutral: 25, neg: 17 },
  { id: 'delivery',     label: 'Delivery Issues',            count: 2910, pct: 15.8, pos: 44, neutral: 30, neg: 26 },
  { id: 'prescription', label: 'Prescription & Medical',     count: 1840, pct: 9.97, pos: 70, neutral: 22, neg: 8  },
  { id: 'others',       label: 'Others',                     count: 1462, pct: 7.93, pos: 55, neutral: 31, neg: 14 },
]

export const INTENT_SEGS = {
  cs:           { color: '#4DB6AC', label: 'Customer Support' },
  orders:       { color: '#3B82F6', label: 'Orders & Tracking' },
  delivery:     { color: '#F59E0B', label: 'Delivery Issues' },
  prescription: { color: '#A78BFA', label: 'Prescription' },
  others:       { color: '#94A3B8', label: 'Others' },
}
