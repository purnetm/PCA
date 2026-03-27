import { useApp } from '../../context/AppContext'
import NavItem from './NavItem'
import UserMenu from './UserMenu'

const KapAIIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/>
    <polyline points="8 21 12 18 16 21"/>
    <path d="M7 9l3 3-3 3"/>
    <line x1="13" y1="15" x2="17" y2="15"/>
  </svg>
)
const DataStudioIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="1" width="6" height="6" rx="1"/>
    <rect x="9" y="1" width="6" height="6" rx="1"/>
    <rect x="1" y="9" width="6" height="6" rx="1"/>
    <rect x="9" y="9" width="6" height="6" rx="1"/>
  </svg>
)
const AnalyticsIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
    <rect x="1" y="9" width="4" height="6" rx="1"/>
    <rect x="6" y="5" width="4" height="10" rx="1"/>
    <rect x="11" y="2" width="4" height="13" rx="1"/>
  </svg>
)
const IntelligenceIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z"/>
    <path d="M4.5 2l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8z"/>
    <path d="M20 14l.8 2.4 2.4.8-2.4.8-.8 2.4-.8-2.4-2.4-.8 2.4-.8z"/>
  </svg>
)
const ConfigIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="2.5"/>
    <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.41 1.41M11.54 11.54l1.41 1.41M3.05 12.95l1.41-1.41M11.54 4.46l1.41-1.41"/>
  </svg>
)
const HelpIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="8" cy="8" r="6.5"/>
    <path d="M6 6.5a2 2 0 0 1 4 0c0 1.5-2 1.5-2 3"/>
    <circle cx="8" cy="12" r="0.75" fill="currentColor" stroke="none"/>
  </svg>
)
const CollapseIcon = (
  <svg className="icon-sb-collapse" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <path d="M9 3v18"/>
    <path d="M15 10l-3 2.5 3 2.5"/>
  </svg>
)
const ExpandIcon = (
  <svg className="icon-sb-expand" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <path d="M9 3v18"/>
    <path d="M13 10l3 2.5-3 2.5"/>
  </svg>
)

export default function Sidebar() {
  const { state, dispatch, navigate } = useApp()
  const { currentView, dsSection, expandedNav, sidebarCollapsed, userMenuOpen } = state

  function toggleNav(id) {
    dispatch({ type: 'TOGGLE_NAV', id })
  }

  function goToDs(section) {
    dispatch({ type: 'SET_DS_SECTION', section })
    navigate('data-studio')
  }

  return (
    <>
      <div
        className="sidebar-overlay"
        id="sidebar-overlay"
        onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR_COLLAPSE' })}
      />
      <aside className={`sidebar${sidebarCollapsed ? ' collapsed' : ''}`} id="sidebar">
        {/* Header */}
        <div className="sidebar-header">
          <div className="sidebar-title">Post Call Analysis</div>
          <button
            className="sidebar-collapse-btn"
            onClick={() => dispatch({ type: 'TOGGLE_SIDEBAR_COLLAPSE' })}
            title="Toggle sidebar"
          >
            {CollapseIcon}
            {ExpandIcon}
          </button>
        </div>

        {/* Nav */}
        <nav className="sidebar-nav">
          {/* Kap AI */}
          <button
            className={`nav-item${currentView === 'kap-ai' ? ' active' : ''}`}
            data-nav="kap-ai"
            data-tooltip="Kap AI"
            onClick={() => navigate('kap-ai')}
          >
            <span className="nav-icon">{KapAIIcon}</span>
            <span className="nav-label">Kap AI</span>
          </button>

          {/* Data Studio */}
          <div className="nav-ds-group">
            <NavItem
              id="ds"
              label="Data Studio"
              icon={DataStudioIcon}
              active={currentView === 'data-studio'}
              expanded={expandedNav.has('ds')}
              onToggle={() => toggleNav('ds')}
            >
              <button
                className={`nav-subitem${currentView === 'data-studio' && dsSection === 'home' ? ' active' : ''}`}
                id="subnav-home"
                onClick={() => goToDs('home')}
              >
                <span className="nav-subitem-dot" />
                My Dashboards
              </button>
              <button
                className={`nav-subitem${currentView === 'data-studio' && dsSection === 'new-question' ? ' active' : ''}`}
                id="subnav-new-question"
                onClick={() => goToDs('new-question')}
              >
                <span className="nav-subitem-dot" />
                New Query
              </button>
            </NavItem>
          </div>

          {/* Analytics */}
          <div className="nav-analytics-group">
            <NavItem
              id="analytics"
              label="Analytics"
              icon={AnalyticsIcon}
              active={currentView.startsWith('analytics-')}
              expanded={expandedNav.has('analytics')}
              onToggle={() => toggleNav('analytics')}
            >
              <button className={`nav-subitem${currentView === 'analytics-ci' ? ' active' : ''}`} id="subnav-analytics-ci" onClick={() => navigate('analytics-ci')}>
                <span className="nav-subitem-dot" /> Conversational Intelligence
              </button>
              <button className={`nav-subitem${currentView === 'analytics-rpa' ? ' active' : ''}`} id="subnav-analytics-rpa" onClick={() => navigate('analytics-rpa')}>
                <span className="nav-subitem-dot" /> Resolution Path Analytics
              </button>
              <button className={`nav-subitem${currentView === 'analytics-vb' ? ' active' : ''}`} id="subnav-analytics-vb" onClick={() => navigate('analytics-vb')}>
                <span className="nav-subitem-dot" /> Voicebot Dashboard
              </button>
              <button className={`nav-subitem${currentView === 'analytics-cmg' ? ' active' : ''}`} id="subnav-analytics-cmg" onClick={() => navigate('analytics-cmg')}>
                <span className="nav-subitem-dot" /> Customer Memory Graph
              </button>
            </NavItem>
          </div>

          {/* Intelligence */}
          <button className="nav-item" data-tooltip="Intelligence">
            <span className="nav-icon">{IntelligenceIcon}</span>
            <span className="nav-label">Intelligence</span>
            <svg className="nav-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6l4 4 4-4"/></svg>
          </button>

          {/* Configuration */}
          <button className="nav-item" data-tooltip="Configuration">
            <span className="nav-icon">{ConfigIcon}</span>
            <span className="nav-label">Configuration</span>
            <svg className="nav-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 6l4 4 4-4"/></svg>
          </button>

          {/* Help Center */}
          <button className="nav-item" data-tooltip="Help Center">
            <span className="nav-icon">{HelpIcon}</span>
            <span className="nav-label">Help Center</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <UserMenu
            open={userMenuOpen}
            onToggle={() => dispatch({ type: 'TOGGLE_USER_MENU' })}
            onDarkMode={() => dispatch({ type: 'TOGGLE_DARK_MODE' })}
            onSignOut={() => {}}
          />
        </div>
      </aside>
    </>
  )
}
