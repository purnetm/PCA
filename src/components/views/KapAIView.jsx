import { useState, useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'

// Pool of insight texts to cycle through
const ALL_INSIGHTS = [
  '15 customers waiting for first response over 30 min',
  'Agent response time exceeded SLA on 8 open tickets',
  'Customer sentiment score dropped 12 points this morning',
  'Ticket backlog up 23% in the last 2 hours',
  'FCR rate at 68% — below the 75% weekly target',
  'Queue Tier 2 at 94% capacity — approaching limit',
  'CSAT avg 3.8 over last 50 responses, trending down',
  'High-priority tickets unassigned for over 45 min',
]

// Static notification items
const NOTIFS = [
  { id: 1, type: 'error', title: 'SLA Breach Alert', desc: '8 tickets exceeded response SLA in Tier 1 queue', time: '2m ago' },
  { id: 2, type: 'warn',  title: 'High Wait Time',   desc: '15 customers waiting over 30 min for first response', time: '5m ago' },
  { id: 3, type: 'info',  title: 'Daily Report Ready', desc: 'Agent performance report for Mar 27 is now available', time: '1h ago' },
]

export default function KapAIView() {
  const { dispatch, openModal } = useApp()
  const [notifOpen, setNotifOpen] = useState(false)

  // Insight board state: 3 displayed texts (position = level-1, level-2, level-3)
  const [rows, setRows] = useState(ALL_INSIGHTS.slice(0, 3))
  const nextIdxRef = useRef(3)
  const [exiting, setExiting] = useState(false)
  const [entering, setEntering] = useState(false)
  const [showNew, setShowNew] = useState(true)
  const intervalRef = useRef(null)
  const t1Ref = useRef(null)
  const t2Ref = useRef(null)

  // Ticker: top row exits, rows shift up (levels re-applied by position), new row enters at bottom
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setExiting(true)
      setShowNew(false)

      t1Ref.current = setTimeout(() => {
        const next = nextIdxRef.current % ALL_INSIGHTS.length
        setRows(prev => [...prev.slice(1), ALL_INSIGHTS[next]])
        nextIdxRef.current++
        setExiting(false)
        setEntering(true)

        t2Ref.current = setTimeout(() => {
          setEntering(false)
          setShowNew(true)
        }, 210)
      }, 160)
    }, 4000)

    return () => {
      clearInterval(intervalRef.current)
      clearTimeout(t1Ref.current)
      clearTimeout(t2Ref.current)
    }
  }, [])

  // Close notif panel on outside click
  useEffect(() => {
    if (!notifOpen) return
    function handleClick(e) {
      const wrapper = document.getElementById('notif-wrapper')
      if (wrapper && !wrapper.contains(e.target)) setNotifOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [notifOpen])

  return (
    <div id="view-kap-ai" className="view active">
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
          <span className="topbar-page-name">Kap AI</span>
        </div>
        <div className="topbar-right">
          <div className="notif-wrapper" id="notif-wrapper">
            <button
              className="notif-btn"
              id="notif-btn"
              onClick={() => setNotifOpen(o => !o)}
              aria-label="Notifications"
              aria-expanded={notifOpen}
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 1a5 5 0 0 1 5 5v2.5l1 2H2l1-2V6a5 5 0 0 1 5-5Z"/>
                <path d="M6.5 13a1.5 1.5 0 0 0 3 0"/>
              </svg>
              <span className="notif-btn-label">Notifications</span>
              <span className="notif-badge" id="notif-badge">3</span>
            </button>

            <div className={notifOpen ? 'notif-panel open' : 'notif-panel'} id="notif-panel" role="dialog" aria-label="Notifications">
              <div className="notif-panel-header">
                <span className="notif-panel-title">Notifications</span>
                <button className="notif-mark-read" onClick={() => setNotifOpen(false)}>Mark all read</button>
              </div>
              <ul className="notif-list">
                {NOTIFS.map(n => (
                  <li key={n.id} className="notif-item">
                    <span className={`notif-dot ${n.type}`} />
                    <div className="notif-item-body">
                      <div className="notif-item-title">{n.title}</div>
                      <div className="notif-item-desc">{n.desc}</div>
                      <div className="notif-item-time">{n.time}</div>
                    </div>
                    <button className="notif-dismiss" aria-label="Dismiss">×</button>
                  </li>
                ))}
              </ul>
              <div className="notif-panel-footer">
                <button className="notif-view-all">View all notifications</button>
              </div>
            </div>
          </div>
          <button className="topbar-btn" aria-label="History">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1.75 7C1.75 8.03835 2.05791 9.05339 2.63478 9.91674C3.21166 10.7801 4.0316 11.453 4.99091 11.8504C5.95022 12.2477 7.00582 12.3517 8.02422 12.1491C9.04262 11.9466 9.97808 11.4465 10.7123 10.7123C11.4465 9.97808 11.9466 9.04262 12.1491 8.02422C12.3517 7.00582 12.2477 5.95022 11.8504 4.99091C11.453 4.0316 10.7801 3.21166 9.91674 2.63478C9.05339 2.05791 8.03835 1.75 7 1.75C5.53231 1.75552 4.12357 2.32821 3.06833 3.34833L1.75 4.66667"/>
              <path d="M1.75 1.75V4.66667H4.66667"/>
              <path d="M7 4.08333V7L9.33333 8.16667"/>
            </svg>
          </button>
        </div>
      </div>

      <div className="content">
        <div className="content-inner">
          <div className="hero-text">
            <h1 className="hero-heading">How can I help you today?</h1>
            <p className="hero-sub">Ask questions, analyze data, or generate insights instantly</p>
          </div>

          <div className="input-card-border">
            <div className="input-card">
              <div className="input-placeholder">
                <span>Ask anything about your organization…</span>
              </div>
              <div className="input-bottom">
                <svg className="attach-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--cutty-sark)' }}>
                  <path d="M12 4.5L5.6895 10.9395C5.40814 11.2209 5.25007 11.6025 5.25007 12.0004C5.25007 12.3983 5.40814 12.7799 5.6895 13.0613C5.97086 13.3426 6.35247 13.5007 6.75037 13.5007C7.14828 13.5007 7.52989 13.3426 7.81125 13.0613L14.1218 6.62175C14.6844 6.05913 15.0005 5.29605 15.0005 4.50038C15.0005 3.70471 14.6844 2.94162 14.1218 2.379C13.5591 1.81638 12.796 1.5003 12.0004 1.5003C11.2047 1.5003 10.4416 1.81638 9.879 2.379L3.59475 8.79225C3.1713 9.20886 2.83452 9.70519 2.60385 10.2526C2.37318 10.8 2.25317 11.3877 2.25075 11.9817C2.24833 12.5757 2.36355 13.1644 2.58976 13.7136C2.81597 14.2629 3.14869 14.762 3.56873 15.182C3.98878 15.6021 4.48783 15.9348 5.0371 16.161C5.58638 16.3872 6.17501 16.5024 6.76903 16.5C7.36306 16.4976 7.95073 16.3776 8.49815 16.1469C9.04556 15.9162 9.54189 15.5795 9.9585 15.156L16.2427 8.74275"/>
                </svg>
                <button className="send-btn" aria-label="Send">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.902 16.2645C10.9305 16.3355 10.98 16.3961 11.044 16.4382C11.1079 16.4802 11.1831 16.5017 11.2596 16.4997C11.3361 16.4978 11.4102 16.4725 11.4719 16.4272C11.5336 16.3819 11.5799 16.3189 11.6047 16.2465L16.4797 1.9965C16.5038 1.93005 16.5083 1.85813 16.493 1.78917C16.4776 1.7202 16.4429 1.65705 16.3929 1.60708C16.343 1.55712 16.2798 1.52242 16.2108 1.50704C16.1419 1.49167 16.07 1.49625 16.0035 1.52025L1.7535 6.39525C1.68112 6.42007 1.61807 6.46644 1.5728 6.52813C1.52754 6.58982 1.50223 6.66388 1.50027 6.74037C1.49831 6.81686 1.5198 6.89212 1.56184 6.95605C1.60389 7.01997 1.66449 7.06951 1.7355 7.098L7.683 9.483C7.87102 9.55828 8.04184 9.67085 8.18517 9.81392C8.32851 9.957 8.44139 10.1276 8.517 10.3155L10.902 16.2645Z"/>
                    <path d="M16.3905 1.61025L8.1855 9.8145"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="quick-actions-wrapper">
            <div className="quick-actions">
              <button className="pill-btn" onClick={() => openModal('create-dashboard')}>
                <svg className="pill-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="1" y="1" width="6" height="6" rx="1" fill="currentColor"/>
                  <rect x="9" y="1" width="6" height="6" rx="1" fill="currentColor"/>
                  <rect x="1" y="9" width="6" height="6" rx="1" fill="currentColor"/>
                  <rect x="9" y="9" width="6" height="6" rx="1" fill="currentColor"/>
                </svg>
                Build a custom dashboard
              </button>
              <button className="pill-btn">
                <svg className="pill-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <rect x="2" y="11" width="3" height="3" fill="currentColor"/>
                  <rect x="6.5" y="8" width="3" height="6" fill="currentColor"/>
                  <rect x="11" y="5" width="3" height="9" fill="currentColor"/>
                </svg>
                Analyze my tickets
              </button>
              <button className="pill-btn">
                <svg className="pill-icon" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 2h12c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1H2c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1zm0 2v8h12V4H2z"/>
                  <path d="M4 7h8v1H4zM4 9h8v1H4z"/>
                </svg>
                Generate weekly reports
              </button>
            </div>
            <p className="kb-hint">
              Press <strong>Enter</strong> to send · <strong>Shift + Enter</strong> for new line
            </p>
          </div>

          <div className="insights">
            <div className="insights-live-badge"><div className="insights-live-dot"></div>Live</div>
            {rows.map((text, i) => (
              <div key={i} className="insight-clip">
                <div className={[
                  `insight-row level-${i + 1}`,
                  i === rows.length - 1 && showNew ? 'is-new' : '',
                  i === 0 && exiting ? 'is-flipping-out' : '',
                  i === rows.length - 1 && entering ? 'is-flipping-in' : '',
                ].filter(Boolean).join(' ')}>
                  <span className="insight-text">{text}</span>
                  <span className="insight-new-tag">NEW</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
