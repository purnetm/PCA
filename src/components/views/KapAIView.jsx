import { useState, useEffect, useRef } from 'react'
import { useApp } from '../../context/AppContext'

const LIVE_INSIGHTS = [
  { level: 1, text: '15 customers waiting over 2 hours for first response', isNew: true },
  { level: 2, text: 'Agent response time exceeded SLA in Tier 2 queue — 8 tickets affected' },
  { level: 3, text: 'Customer sentiment score dropped 8 points since last Monday' },
]

const AttachIcon = (
  <svg className="attach-icon" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M16 8.5L8.5 16A5 5 0 0 1 1.5 9L9.5 1A3.5 3.5 0 0 1 15 6.5L7 14.5A2 2 0 0 1 4 11.5L11 4.5"/>
  </svg>
)
const SendIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M14 2L1 7.5L6.5 9M14 2L9 15L6.5 9M14 2L6.5 9"/>
  </svg>
)
const StarIcon = (
  <svg className="pill-icon" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M7 0.5L8.3 4.8L12.5 7L8.3 9.2L7 13.5L5.7 9.2L1.5 7L5.7 4.8L7 0.5Z"/>
  </svg>
)
const GridIcon = (
  <svg className="pill-icon" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <rect x="1" y="1" width="5" height="5" rx="1"/>
    <rect x="8" y="1" width="5" height="5" rx="1"/>
    <rect x="1" y="8" width="5" height="5" rx="1"/>
    <rect x="8" y="8" width="5" height="5" rx="1"/>
  </svg>
)
const BarIcon = (
  <svg className="pill-icon" width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <rect x="1" y="8" width="3" height="5" rx="0.5"/>
    <rect x="5.5" y="5" width="3" height="8" rx="0.5"/>
    <rect x="10" y="2" width="3" height="11" rx="0.5"/>
  </svg>
)
const DocIcon = (
  <svg className="pill-icon" width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="1" width="10" height="12" rx="1.5"/>
    <path d="M4.5 5h5M4.5 7.5h5M4.5 10h3"/>
  </svg>
)

export default function KapAIView() {
  const { dispatch, navigate } = useApp()
  const [inputVal, setInputVal] = useState('')
  const [insights, setInsights] = useState(LIVE_INSIGHTS)
  const intervalRef = useRef(null)

  // Live insight board rotation
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setInsights(prev => {
        const next = [...prev]
        next.push({ ...next.shift(), isNew: true })
        return next.map((ins, i) => ({ ...ins, isNew: i === next.length - 1 }))
      })
    }, 4000)
    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <div className="view active" id="view-kap-ai" style={{ flexDirection: 'column' }}>
      <div className="topbar" style={{ background: 'rgba(255,255,255,0.20)', backdropFilter: 'blur(4px)' }}>
        <div className="topbar-left">
          <span className="topbar-page-name">Kap AI</span>
        </div>
      </div>
      <div className="content">
        <div className="content-inner">
          {/* Hero */}
          <div className="hero-text">
            <h1 className="hero-heading">How can I help you today?</h1>
            <p className="hero-sub">Ask questions, analyze data, or build a dashboard — just describe what you need.</p>
          </div>

          {/* Input card */}
          <div className="input-card-border">
            <div className="input-card">
              <div
                className="input-placeholder"
                contentEditable
                suppressContentEditableWarning
                onInput={e => setInputVal(e.currentTarget.textContent)}
                data-placeholder="Ask anything about your organization…"
                style={{ outline: 'none' }}
              />
              <div className="input-bottom">
                {AttachIcon}
                <button className="send-btn" disabled={!inputVal.trim()}>
                  {SendIcon}
                </button>
              </div>
            </div>
          </div>

          {/* Quick actions */}
          <div className="quick-actions-wrapper">
            <div className="quick-actions">
              <button className="pill-btn" onClick={() => { navigate('data-studio'); dispatch({ type: 'SET_DS_SECTION', section: 'home' }) }}>
                {GridIcon} Build a custom dashboard
              </button>
              <button className="pill-btn">
                {BarIcon} Analyze my tickets
              </button>
              <button className="pill-btn">
                {DocIcon} Generate weekly reports
              </button>
            </div>
            <p className="kb-hint" style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: 0.55, textAlign: 'center' }}>
              Press <kbd style={{ background: 'var(--aqua-haze)', borderRadius: 4, padding: '1px 5px', fontSize: 10 }}>↵ Enter</kbd> to send
            </p>
          </div>

          {/* Live insight board */}
          <div className="insights">
            <div className="insights-live-badge">
              <span className="insights-live-dot" />
              Live
            </div>
            {insights.map((ins, i) => (
              <div key={i} className={`insight-clip`}>
                <div className={`insight-row level-${ins.level}${ins.isNew ? ' is-new' : ''}`}>
                  <span className="insight-dot" />
                  <span className="insight-text">{ins.text}</span>
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
