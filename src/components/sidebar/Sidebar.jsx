import { useApp } from '../../context/AppContext'
import NavItem from './NavItem'
import UserMenu from './UserMenu'

const KapAIIcon = (
  <svg width="24" height="24" viewBox="0 -3 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 5V1H7M1 11H3M19 11H21M14 10V12M8 10V12M5 5H17C18.1046 5 19 5.89543 19 7V15C19 16.1046 18.1046 17 17 17H5C3.89543 17 3 16.1046 3 15V7C3 5.89543 3.89543 5 5 5Z"/>
  </svg>
)
const DataStudioIcon = (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
    <rect x="0.5" y="0.5" width="7" height="9" rx="1"/>
    <rect x="10.5" y="0.5" width="7" height="5" rx="1"/>
    <rect x="0.5" y="12.5" width="7" height="5" rx="1"/>
    <rect x="10.5" y="8.5" width="7" height="9" rx="1"/>
  </svg>
)
const AnalyticsIcon = (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" strokeLinejoin="round">
    <rect x="1.5" y="9.5" width="3" height="5" rx="0.75"/>
    <rect x="6.5" y="5.5" width="3" height="9" rx="0.75"/>
    <rect x="11.5" y="2.5" width="3" height="12" rx="0.75"/>
  </svg>
)
const IntelligenceIcon = (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7.5 3L9.5 8L14.5 10L9.5 12L7.5 17L5.5 12L0.5 10L5.5 8L7.5 3Z"/>
    <path d="M16.5 7L15.5 5L13.5 4L15.5 3L16.5 1L17.5 3L19.5 4L17.5 5L16.5 7Z"/>
    <path d="M16.5 19L15.5 17L13.5 16L15.5 15L16.5 13L17.5 15L19.5 16L17.5 17L16.5 19Z"/>
  </svg>
)
const ConfigIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
)
const HelpIcon = (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 4.5"/>
    <circle cx="12" cy="17.5" r="0.5" fill="currentColor" stroke="none"/>
  </svg>
)
const CollapseIcon = (
  <svg className="icon-sb-collapse" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="3"/>
    <path d="M9 3v18"/>
    <path d="M15 10l-3 2.5 3 2.5"/>
  </svg>
)
const ExpandIcon = (
  <svg className="icon-sb-expand" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
              onToggle={() => { toggleNav('ds'); goToDs('home') }}
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
              onToggle={() => { toggleNav('analytics'); navigate('analytics-ci') }}
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
            <svg className="nav-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 4l4 4-4 4"/></svg>
          </button>

          {/* Configuration */}
          <button className="nav-item" data-tooltip="Configuration">
            <span className="nav-icon">{ConfigIcon}</span>
            <span className="nav-label">Configuration</span>
            <svg className="nav-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 4l4 4-4 4"/></svg>
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
