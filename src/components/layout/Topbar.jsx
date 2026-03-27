import { useApp } from '../../context/AppContext'

const HamburgerIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 4.5h14M2 9h14M2 13.5h14" strokeLinecap="round"/>
  </svg>
)
const BellIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M9 2a5 5 0 0 1 5 5v3l1.5 2.5H2.5L4 10V7a5 5 0 0 1 5-5z"/>
    <path d="M7.5 15a1.5 1.5 0 0 0 3 0"/>
  </svg>
)
const BackIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M10 12L6 8l4-4"/>
  </svg>
)
const StarIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
    <path d="M7 0.5L8.3 4.8L12.5 7L8.3 9.2L7 13.5L5.7 9.2L1.5 7L5.7 4.8L7 0.5Z"/>
  </svg>
)
const SaveIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <rect x="2" y="1" width="10" height="12" rx="1"/>
    <path d="M5 1v4h4V1"/>
    <rect x="3" y="9" width="8" height="3" rx="0.5" fill="currentColor" stroke="none"/>
  </svg>
)
const ResetIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M2 7a5 5 0 1 0 1-3" strokeLinecap="round"/>
    <path d="M2 2v3h3" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)
const CodeIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4L1.5 7L4 10M10 4L12.5 7L10 10M8 2L6 12"/>
  </svg>
)

export default function Topbar() {
  const { state, dispatch } = useApp()
  const { currentView, dsSection, notifPanelOpen } = state

  const isDsNewQuestion = currentView === 'data-studio' && dsSection === 'new-question'
  const isDsComposer = currentView === 'data-studio' && dsSection === 'composer'

  function getTitle() {
    if (currentView === 'kap-ai') return 'Kap AI'
    if (currentView === 'data-studio') {
      if (dsSection === 'new-question') return null // shows breadcrumb
      if (dsSection === 'composer') return null      // shows breadcrumb
      return 'Dashboard Builder'
    }
    if (currentView === 'analytics-ci') return 'Conversational Intelligence'
    if (currentView === 'analytics-rpa') return 'Resolution Path Analytics'
    if (currentView === 'analytics-vb') return 'Voicebot Dashboard'
    if (currentView === 'analytics-cmg') return 'Customer Memory Graph'
    return ''
  }

  return (
    <div className="topbar">
      <div className="topbar-left">
        <button className="hamburger" onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR_COLLAPSE' })}>
          {HamburgerIcon}
        </button>

        {/* DS back button */}
        {(isDsComposer) && (
          <button className="topbar-back-btn" onClick={() => dispatch({ type: 'SET_DS_SECTION', section: 'home' })}>
            {BackIcon}
          </button>
        )}

        {/* Title */}
        {getTitle() && <span className="topbar-page-name">{getTitle()}</span>}

        {/* DS composer breadcrumb */}
        {isDsComposer && (
          <nav className="topbar-breadcrumb">
            <button className="bc-home" onClick={() => dispatch({ type: 'SET_DS_SECTION', section: 'home' })}>My Dashboards</button>
            <span className="bc-sep">›</span>
            <input className="bc-title" defaultValue="Untitled Dashboard" />
          </nav>
        )}

        {/* New Query breadcrumb */}
        {isDsNewQuestion && (
          <nav className="topbar-breadcrumb">
            <span style={{ fontSize: 13, color: 'var(--cutty-sark)' }}>New Query</span>
            <span className="bc-sep">›</span>
            <input className="bc-title" defaultValue="Untitled Query" />
          </nav>
        )}
      </div>

      <div className="topbar-right">
        {/* NQB actions */}
        {isDsNewQuestion && (
          <>
            <button className="qb-reset-btn" title="Reset">
              {ResetIcon}
            </button>
            <button className="nqb-sql-btn" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {CodeIcon} SQL
            </button>
            <button className="qb-save-btn" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {SaveIcon} Save Query
            </button>
          </>
        )}

        {/* AI toggle for composer */}
        {isDsComposer && (
          <button className="nq-ai-toggle-btn" style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {StarIcon} AI
          </button>
        )}

        {/* Notification bell (always) */}
        <div className="notif-wrapper" id="notif-wrapper">
          <button className="notif-btn" id="notif-btn" onClick={() => dispatch({ type: 'TOGGLE_NOTIF' })}>
            {BellIcon}
            <span className="notif-badge" id="notif-badge">3</span>
          </button>
          {notifPanelOpen && (
            <div className="notif-panel" id="notif-panel">
              <div className="notif-panel-header">
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark-teal)' }}>Notifications</span>
                <button style={{ fontSize: 11, color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer' }}
                  onClick={() => dispatch({ type: 'CLOSE_NOTIF' })}>
                  Mark all read
                </button>
              </div>
              <ul className="notif-list" id="notif-list" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
