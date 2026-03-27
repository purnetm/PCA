import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { DASHBOARDS_DATA } from '../../data'

const LockIcon = (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round">
    <rect x="2" y="5.5" width="8" height="5.5" rx="1.2"/>
    <path d="M4 5.5V3.5a2 2 0 0 1 4 0v2"/>
  </svg>
)
const GlobeIcon = (
  <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="6" r="4.5"/>
    <path d="M6 1.5C6 1.5 4 3.5 4 6s2 4.5 2 4.5M6 1.5c0 0 2 2 2 4.5S6 10.5 6 10.5M1.5 6h9"/>
  </svg>
)

const THUMB_SVGS = {
  bar: (
    <svg width="100%" height="60" viewBox="0 0 180 60" preserveAspectRatio="none">
      <rect x="5"   y="36" width="20" height="24" rx="3" fill="#3B82F6" opacity="0.75"/>
      <rect x="33"  y="24" width="20" height="36" rx="3" fill="#10B981" opacity="0.80"/>
      <rect x="61"  y="8"  width="20" height="52" rx="3" fill="#4DB6AC"/>
      <rect x="89"  y="16" width="20" height="44" rx="3" fill="#F59E0B" opacity="0.85"/>
      <rect x="117" y="2"  width="20" height="58" rx="3" fill="#A78BFA"/>
      <rect x="145" y="20" width="20" height="40" rx="3" fill="#F87171" opacity="0.80"/>
    </svg>
  ),
  area: (
    <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
      <defs>
        <linearGradient id="ag1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4DB6AC" stopOpacity="0.28"/>
          <stop offset="100%" stopColor="#4DB6AC" stopOpacity="0.02"/>
        </linearGradient>
      </defs>
      <path d="M0 50 C30 44 50 30 70 34 C90 38 120 14 155 8 L200 2 L200 60 L0 60 Z" fill="url(#ag1)"/>
      <path d="M0 50 C30 44 50 30 70 34 C90 38 120 14 155 8 L200 2" stroke="#4DB6AC" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle cx="200" cy="2" r="3.5" fill="#4DB6AC"/>
    </svg>
  ),
  donut: (
    <svg width="100%" height="60" viewBox="0 0 180 60" preserveAspectRatio="none">
      <circle cx="90" cy="30" r="24" fill="none" stroke="#4DB6AC" strokeWidth="10" strokeDasharray="75 75" strokeLinecap="round" transform="rotate(-90 90 30)"/>
      <circle cx="90" cy="30" r="24" fill="none" stroke="#3B82F6" strokeWidth="10" strokeDasharray="38 113" strokeDashoffset="-75" strokeLinecap="round" transform="rotate(-90 90 30)"/>
      <circle cx="90" cy="30" r="14" fill="white"/>
    </svg>
  ),
  line: (
    <svg width="100%" height="60" viewBox="0 0 200 60" preserveAspectRatio="none">
      <path d="M0 48 C40 44 70 20 100 28 C130 36 160 10 200 6" stroke="#F59E0B" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M0 52 C40 48 70 36 100 40 C130 44 160 24 200 18" stroke="#4DB6AC" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.6"/>
    </svg>
  ),
}

function DashboardCard({ dash, onOpen, onAccess }) {
  const thumb = THUMB_SVGS[dash.thumb] || THUMB_SVGS.bar
  const modeLabel = { manual: 'Manual', ai: 'AI', hybrid: 'Hybrid' }
  return (
    <div className="dash-card" onClick={() => onOpen(dash.id)}>
      <div className="dash-card-actions">
        <button className="dash-card-edit-btn" onClick={e => e.stopPropagation()} title="Edit">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M9.5 2L11 3.5L4.5 10L2.5 10.5L3 8.5L9.5 2Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button className="dash-card-del-btn" onClick={e => e.stopPropagation()} title="Delete">
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2 3.5h9M5 3.5V2h3v1.5M5.5 6v4M7.5 6v4M2.5 3.5l.5 7.5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1l.5-7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="dash-card-thumb">{thumb}</div>
      <div className="dash-card-title">{dash.name}</div>
      <div className="dash-card-desc">{dash.desc}</div>
      <div className="dash-card-meta">
        <span className={`home-mode-badge ${dash.mode}`}>{modeLabel[dash.mode] || dash.mode}</span>
        <button
          className={`dv-visibility-badge dv-visibility-badge--${dash.visibility || 'private'}`}
          onClick={e => { e.stopPropagation(); onAccess(dash) }}
        >
          {(dash.visibility || 'private') === 'private' ? <>{LockIcon} Private</> : <>{GlobeIcon} Public</>}
        </button>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ marginLeft: 'auto', flexShrink: 0 }}>
          <path d="M2 4.5h8M4 2v2.5M8 2v2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <rect x="1" y="3.5" width="10" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
        {dash.updated}
      </div>
    </div>
  )
}

export default function DataStudioView() {
  const { state, dispatch, openModal } = useApp()
  const { dsSection } = state
  const [activeTab, setActiveTab] = useState('all')
  const [composerTitle, setComposerTitle] = useState('Untitled Dashboard')
  const [queryTitle, setQueryTitle] = useState('Untitled Query')
  const [nqStep, setNqStep] = useState(1)
  const [sqlOpen, setSqlOpen] = useState(false)

  function goToStep(n) { setNqStep(Math.max(1, Math.min(4, n))) }

  const filtered = activeTab === 'all'
    ? DASHBOARDS_DATA
    : DASHBOARDS_DATA.filter(d => d.mode === activeTab)

  const isComposer = dsSection === 'composer'
  const isNewQuestion = dsSection === 'new-question'
  const isDashboardView = dsSection === 'dashboard-view'
  const showBack = isComposer || isNewQuestion || isDashboardView
  const showPageName = !isComposer && !isNewQuestion && !isDashboardView
  const showDsBreadcrumb = isComposer
  const showNqBreadcrumb = isNewQuestion

  return (
    <div id="view-data-studio" className="view active ds-view">

      {/* Topbar */}
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
          <button
            className="topbar-back-btn"
            id="ds-back-btn"
            onClick={() => dispatch({ type: 'SET_DS_SECTION', section: 'home' })}
            style={{ display: showBack ? '' : 'none' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M8.5 10.5L4.5 6.5l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <span
            className="topbar-page-name"
            id="topbar-ds-name"
            style={{ display: showPageName ? '' : 'none' }}
          >
            Dashboard Builder
          </span>
          <nav
            className="topbar-breadcrumb"
            id="topbar-ds-breadcrumb"
            style={{ display: showDsBreadcrumb ? '' : 'none' }}
          >
            <button
              className="bc-home"
              onClick={() => dispatch({ type: 'SET_DS_SECTION', section: 'home' })}
            >
              My Dashboards
            </button>
            <span className="bc-sep">›</span>
            <input
              className="bc-title"
              id="dash-composer-title"
              value={composerTitle}
              onChange={e => setComposerTitle(e.target.value)}
            />
          </nav>
          <nav
            className="topbar-breadcrumb"
            id="topbar-nq-breadcrumb"
            style={{ display: showNqBreadcrumb ? '' : 'none' }}
          >
            <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--cutty-sark)', opacity: 0.7 }}>New Query</span>
            <span className="bc-sep">›</span>
            <input
              className="bc-title"
              id="qb-title"
              value={queryTitle}
              onChange={e => setQueryTitle(e.target.value)}
            />
          </nav>
        </div>
        <div className="topbar-right">
          <button
            className="qb-reset-btn"
            id="ib-reset-btn"
            title="Start over"
            style={{ display: isNewQuestion ? '' : 'none' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M2 6.5A4.5 4.5 0 1 1 4.5 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M2 3v3.5h3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            className={`nqb-sql-btn${sqlOpen ? ' active' : ''}`}
            id="ib-sql-btn"
            onClick={() => setSqlOpen(o => !o)}
            style={{ display: isNewQuestion ? '' : 'none' }}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M3.5 4L1.5 6l2 2M8.5 4l2 2-2 2M5.5 9l1-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            SQL
          </button>
          <button
            className="qb-save-btn"
            id="ib-save-btn"
            onClick={() => openModal('save-query')}
            style={{ display: isNewQuestion ? '' : 'none' }}
          >
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M4 1.5v3h5V1.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              <path d="M2.5 8.5h8v3H2.5z" fill="currentColor" opacity=".2"/>
            </svg>
            Save Query
          </button>
          <button
            className="nq-ai-toggle-btn"
            id="dash-ai-toggle-btn"
            title="Toggle AI Assistant"
            style={{ display: isComposer ? '' : 'none' }}
          >
            <svg width="11" height="11" viewBox="0 0 13 13" fill="currentColor">
              <path d="M6.5 0.5L7.6 4.1L11.5 6.5L7.6 8.9L6.5 12.5L5.4 8.9L1.5 6.5L5.4 4.1L6.5 0.5Z"/>
            </svg>
            AI
          </button>
          <button
            className="nq-ai-toggle-btn"
            id="nq-ai-toggle-btn"
            title="Toggle AI Assistant"
            style={{ display: isNewQuestion ? '' : 'none' }}
          >
            <svg width="11" height="11" viewBox="0 0 13 13" fill="currentColor">
              <path d="M6.5 0.5L7.6 4.1L11.5 6.5L7.6 8.9L6.5 12.5L5.4 8.9L1.5 6.5L5.4 4.1L6.5 0.5Z"/>
            </svg>
            AI
            <span className="ai-dot"></span>
          </button>
        </div>
      </div>

      {/* ── Home: Dashboard Gallery ── */}
      <div
        id="ds-home"
        style={{ display: dsSection === 'home' ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}
      >
        {/* Topbar: title + action buttons */}
        <div className="qs-page-topbar" id="home-topbar">
          <div>
            <div className="qs-page-title">My Dashboards</div>
            <div className="qs-page-sub" id="home-dash-count">{filtered.length} dashboards</div>
          </div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }} id="create-dash-btn-wrap">
            <button className="qs-primary-btn" onClick={() => openModal('create-dashboard')}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="1" width="4" height="4" rx="1" fill="white" opacity=".9"/>
                <rect x="7" y="1" width="4" height="4" rx="1" fill="white" opacity=".9"/>
                <rect x="1" y="7" width="4" height="4" rx="1" fill="white" opacity=".9"/>
                <rect x="7" y="7" width="4" height="4" rx="1" fill="white" opacity=".9"/>
              </svg>
              Create New Dashboard
            </button>
          </div>
        </div>

        {/* Mode filter tabs */}
        <div className="home-mode-tabs" id="home-mode-tabs">
          <button className={`home-tab${activeTab === 'all' ? ' active' : ''}`} id="htab-all" onClick={() => setActiveTab('all')}>All</button>
          <button className={`home-tab${activeTab === 'manual' ? ' active' : ''}`} id="htab-manual" onClick={() => setActiveTab('manual')}>Manual</button>
          <button className={`home-tab${activeTab === 'ai' ? ' active' : ''}`} id="htab-ai" onClick={() => setActiveTab('ai')}>AI</button>
          <button className={`home-tab${activeTab === 'hybrid' ? ' active' : ''}`} id="htab-hybrid" onClick={() => setActiveTab('hybrid')}>Hybrid</button>
        </div>

        {/* Gallery grid */}
        <div id="home-gallery" style={{ display: 'flex', flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}>
          <div className="dash-grid-wrap">
            <div className="dash-grid" id="home-dash-grid">
              {filtered.map(d => (
                <DashboardCard
                  key={d.id}
                  dash={d}
                  onOpen={() => dispatch({ type: 'SET_DS_SECTION', section: 'dashboard-view' })}
                  onAccess={dash => openModal('access', { dashName: dash.name })}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Composer section ── */}
      <div
        id="dash-composer-view"
        style={{ display: isComposer ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}
      >
        <div className="nq-body">
          {/* Main area: two left panels */}
          <div className="nq-main-area">
            <div className="nq-panels">
              {/* Col 1: Saved Questions */}
              <div className="nq-col-qb" style={{ flex: '0 0 240px' }}>
                <div className="nq-col-hd" style={{ justifyContent: 'space-between' }}>
                  <span>Saved Questions</span>
                  <button className="qb-select-all-btn" style={{ fontSize: '11px' }}>Add all</button>
                </div>
                <div id="dash-picker-list" style={{ overflowY: 'auto', flex: 1 }}></div>
              </div>

              {/* Col 2: Selected queries canvas */}
              <div className="nq-col-vb">
                <div className="nq-col-hd">Selected Queries</div>
                <div className="dash-canvas" id="dash-canvas">
                  <div className="dash-canvas-empty" id="dash-canvas-empty">
                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                      <rect x="2" y="2" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" opacity=".25"/>
                      <rect x="28" y="2" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" opacity=".25"/>
                      <rect x="2" y="28" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" opacity=".25"/>
                      <rect x="28" y="28" width="22" height="22" rx="4" stroke="currentColor" strokeWidth="1.5" opacity=".25"/>
                    </svg>
                    <p>Select questions on the left to add them to your dashboard</p>
                  </div>
                  <div className="dash-tiles" id="dash-tiles" style={{ display: 'none' }}></div>
                </div>
                <div id="dash-save-bar" style={{ display: 'none', padding: '12px 16px', borderTop: '1px solid var(--nebula)', flexShrink: 0 }}>
                  <button className="dash-save-final-btn">
                    <svg width="14" height="14" viewBox="0 0 13 13" fill="none">
                      <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                      <path d="M4 1.5v3h5V1.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                    </svg>
                    Save Dashboard
                  </button>
                </div>
              </div>
            </div>{/* /nq-panels */}
          </div>{/* /nq-main-area */}

          {/* Col 3: AI Assistant (toggleable) */}
          <div className="nq-col-ai" id="dash-col-ai">
            <div className="nq-col-hd">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor" style={{ color: 'var(--teal)', flexShrink: 0 }}>
                <path d="M6.5 0.5L7.6 4.1L11.5 6.5L7.6 8.9L6.5 12.5L5.4 8.9L1.5 6.5L5.4 4.1L6.5 0.5Z"/>
              </svg>
              AI Assistant
            </div>
            <div className="nq-col-ai-body">
              <div className="nq-ai-conv" id="dash-ai-conv"></div>
              <div className="nq-ai-sep" id="dash-ai-sep" style={{ display: 'none' }}>· · ·</div>
              <div className="nq-ai-sub">Any last-minute changes?</div>
              <textarea
                className="nq-ai-textarea"
                id="dash-ai-textarea"
                placeholder="e.g. rename this dashboard, suggest a layout, add a filter..."
              ></textarea>
              <button className="nq-generate-btn">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M6 0L7 3.5L11 6L7 8.5L6 12L5 8.5L1 6L5 3.5L6 0Z"/>
                </svg>
                Ask Kap AI
              </button>
            </div>
          </div>{/* /dash-col-ai */}
        </div>{/* /nq-body */}
      </div>

      {/* ── New Query page ── */}
      <div
        id="ds-new-question"
        style={{ display: isNewQuestion ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}
      >
        <div className="nqb-page">
          <div className="nqb-body">

            {/* LEFT: Steps panel */}
            <div className="nqb-left">

              {/* Step indicator */}
              <div className="nqb-steps-row">
                {[
                  { n: 1, label: 'Query' },
                  { n: 2, label: 'Data' },
                  { n: 3, label: 'Columns' },
                  { n: 4, label: 'Filters' },
                ].map((s, i) => (
                  <React.Fragment key={s.n}>
                    <div
                      className={`nqb-step-item${nqStep === s.n ? ' active' : nqStep > s.n ? ' done-step' : ''}`}
                      id={`nqb-step-item-${s.n}`}
                      onClick={() => nqStep > s.n && goToStep(s.n)}
                      style={{ cursor: nqStep > s.n ? 'pointer' : 'default' }}
                    >
                      <div className={`nqb-step-dot${nqStep === s.n ? ' active' : nqStep > s.n ? ' done' : ''}`} id={`nqb-dot-${s.n}`}>
                        {nqStep > s.n ? (
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        ) : s.n}
                      </div>
                      <span className="nqb-step-label">{s.label}</span>
                    </div>
                    {i < 3 && (
                      <div className={`nqb-step-connector${nqStep > s.n ? ' done' : ''}`} id={`nqb-conn-${s.n}`}></div>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Step 1: Query */}
              <div className="nqb-step-content" id="nqb-panel-1" style={{ display: nqStep === 1 ? 'flex' : 'none' }}>
                <div>
                  <div className="nqb-step-title">What do you want to know?</div>
                  <div className="nqb-step-sub">Describe your query in plain language — no SQL needed.</div>
                </div>
                <textarea
                  className="nqb-textarea"
                  id="nqb-question"
                  aria-label="Describe your query in plain language"
                  placeholder="e.g. How many tickets were resolved last month by each agent?"
                ></textarea>
                <div>
                  <div style={{ fontSize: '11px', fontWeight: 'var(--weight-semibold)', color: 'var(--cutty-sark)', opacity: 0.75, letterSpacing: '0.05em', marginBottom: 'var(--space-2)', textTransform: 'uppercase' }}>Try an example</div>
                  <div className="nqb-example-chips">
                    <button className="nqb-example-chip">Ticket volume by agent last 30 days</button>
                    <button className="nqb-example-chip">Average resolution time by queue</button>
                    <button className="nqb-example-chip">SLA compliance rate this month</button>
                    <button className="nqb-example-chip">Top 10 customers by open tickets</button>
                    <button className="nqb-example-chip">Agent performance scorecard</button>
                  </div>
                </div>
              </div>

              {/* Step 2: Data area */}
              <div className="nqb-step-content" id="nqb-panel-2" style={{ display: nqStep === 2 ? 'flex' : 'none' }}>
                <div>
                  <div className="nqb-step-title">What data are you looking at?</div>
                  <div className="nqb-step-sub">Pick the area that best matches your question.</div>
                </div>
                <div className="nqb-data-grid" id="nqb-data-grid">
                  <button type="button" className="nqb-data-btn" data-area="tickets">
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8.5 8.5h7M8.5 12h7M8.5 15.5h4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span className="nqb-data-btn-label">Tickets</span>
                    <span className="nqb-data-btn-sub">Support &amp; service requests</span>
                  </button>
                  <button type="button" className="nqb-data-btn" data-area="agents">
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="8.5" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M4.5 20.5c0-4.142 3.358-7.5 7.5-7.5s7.5 3.358 7.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span className="nqb-data-btn-label">Agents</span>
                    <span className="nqb-data-btn-sub">Team &amp; individual performance</span>
                  </button>
                  <button type="button" className="nqb-data-btn" data-area="queues">
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M8 9h8M8 12h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span className="nqb-data-btn-label">Queues</span>
                    <span className="nqb-data-btn-sub">Queue load &amp; wait times</span>
                  </button>
                  <button type="button" className="nqb-data-btn" data-area="sla">
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="13" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M12 9.5V13l2.5 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    <span className="nqb-data-btn-label">SLA</span>
                    <span className="nqb-data-btn-sub">SLA compliance &amp; breaches</span>
                  </button>
                  <button type="button" className="nqb-data-btn" data-area="customers">
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="9" width="18" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.5"/><path d="M8 9V6.5A4 4 0 0 1 16 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><rect x="10" y="15" width="4" height="6" rx="1" stroke="currentColor" strokeWidth="1.3"/></svg>
                    <span className="nqb-data-btn-label">Customers</span>
                    <span className="nqb-data-btn-sub">Accounts &amp; contacts</span>
                  </button>
                  <button type="button" className="nqb-data-btn" data-area="csat">
                    <svg className="nqb-data-btn-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l2.5 5.1 5.6.81-4.05 3.95.96 5.59L12 15.9l-4.97 2.55.96-5.59L4 8.91l5.6-.81L12 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                    <span className="nqb-data-btn-label">CSAT</span>
                    <span className="nqb-data-btn-sub">Satisfaction scores &amp; feedback</span>
                  </button>
                </div>
                {/* Inline Kap AI nudge: step 1 */}
                <div className="nqb-inline-nudge" id="nqb-nudge-2" style={{ display: 'none' }}>
                  <span className="nqb-inline-nudge-icon" aria-hidden="true">✦</span>
                  <div className="nqb-inline-nudge-body">
                    <span className="nqb-inline-nudge-text" id="nqb-nudge-2-text">Data detected. Want me to suggest the most useful columns &amp; filters for your question?</span>
                    <div className="nqb-inline-nudge-actions">
                      <button className="nqb-nudge-action-btn">Yes, suggest columns</button>
                      <button className="nqb-nudge-dismiss">Dismiss</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Columns */}
              <div className="nqb-step-content" id="nqb-panel-3" style={{ display: nqStep === 3 ? 'flex' : 'none' }}>
                <div>
                  <div className="nqb-step-title">Which columns do you need?</div>
                  <div className="nqb-step-sub">We've pre-selected the most useful ones — tweak as needed.</div>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                  <button style={{ fontSize: 'var(--font-sm)', color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", padding: 0 }}>Select all</button>
                  <span style={{ color: 'var(--nebula)', userSelect: 'none' }}>&middot;</span>
                  <button style={{ fontSize: 'var(--font-sm)', color: 'var(--cutty-sark)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Plus Jakarta Sans',sans-serif", padding: 0 }}>Clear all</button>
                </div>
                <div className="nqb-col-grid" id="nqb-col-grid"></div>
                {/* Inline Kap AI nudge: step 2 */}
                <div className="nqb-inline-nudge" id="nqb-nudge-3" style={{ display: 'none' }}>
                  <span className="nqb-inline-nudge-icon" aria-hidden="true">✦</span>
                  <div className="nqb-inline-nudge-body">
                    <span className="nqb-inline-nudge-text">I can predict the remaining columns you'll need based on your question. Complete the selection for you?</span>
                    <div className="nqb-inline-nudge-actions">
                      <button className="nqb-nudge-action-btn">Complete selection</button>
                      <button className="nqb-nudge-dismiss">Dismiss</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Filters */}
              <div className="nqb-step-content" id="nqb-panel-4" style={{ display: nqStep === 4 ? 'flex' : 'none' }}>
                <div>
                  <div className="nqb-step-title">Any filters?</div>
                  <div className="nqb-step-sub">Narrow your data down. All filters are optional.</div>
                </div>
                {/* Inline Kap AI nudge: step 3 */}
                <div className="nqb-inline-nudge" id="nqb-nudge-4">
                  <span className="nqb-inline-nudge-icon" aria-hidden="true">✦</span>
                  <div className="nqb-inline-nudge-body">
                    <span className="nqb-inline-nudge-text">Describe what you want to see — I'll set the grouping &amp; filters. <em>e.g. "by agent, last 7 days"</em></span>
                    <div className="nqb-inline-nudge-actions" style={{ marginTop: 'var(--space-2)' }}>
                      <button className="nqb-nudge-action-btn">Describe it</button>
                      <button className="nqb-nudge-dismiss">Set manually</button>
                    </div>
                  </div>
                </div>
                {/* Describe-it pill bar */}
                <div className="nqb-describe-bar" id="nqb-describe-bar" style={{ display: 'none' }}>
                  <div className="nqb-describe-bar-inner">
                    <span className="nqb-describe-bar-icon" aria-hidden="true">✦</span>
                    <input
                      id="nqb-describe-input"
                      className="nqb-describe-input"
                      type="text"
                      placeholder='e.g. "by agent, last 7 days, status open"'
                    />
                    <button className="nqb-nudge-action-btn" style={{ borderRadius: '20px', flexShrink: 0 }}>Apply</button>
                    <button className="nqb-nudge-dismiss">Cancel</button>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--dark-teal)', marginBottom: 'var(--space-3)' }}>Time range</div>
                  <div className="nqb-time-row" id="nqb-time-row">
                    <button className="nqb-time-btn" data-preset="today">Today</button>
                    <button className="nqb-time-btn" data-preset="7d">Last 7 days</button>
                    <button className="nqb-time-btn selected" data-preset="30d">Last 30 days</button>
                    <button className="nqb-time-btn" data-preset="90d">Last 90 days</button>
                    <button className="nqb-time-btn" data-preset="mtd">This month</button>
                    <button className="nqb-time-btn" data-preset="ytd">This year</button>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 'var(--font-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--dark-teal)', marginBottom: 'var(--space-3)' }}>Additional filters</div>
                  <div className="nqb-filter-list" id="nqb-filter-list"></div>
                  {/* Inline add-filter form */}
                  <div className="nqb-filter-form" id="nqb-filter-form" style={{ display: 'none' }}>
                    <div className="nqb-filter-form-row">
                      <select id="nqb-filter-field-sel" className="nqb-filter-sel">
                        <option value="">Field…</option>
                        <option>Status</option>
                        <option>Priority</option>
                        <option>Agent</option>
                        <option>Queue</option>
                        <option>Created At</option>
                        <option>Resolved At</option>
                      </select>
                      <select id="nqb-filter-op-sel" className="nqb-filter-sel">
                        <option value="equals">equals</option>
                        <option value="is not">is not</option>
                        <option value="contains">contains</option>
                        <option value="greater than">greater than</option>
                        <option value="less than">less than</option>
                      </select>
                      <input id="nqb-filter-val-inp" className="nqb-filter-val-input" type="text" placeholder="Value…" />
                    </div>
                    <div className="nqb-filter-form-actions">
                      <button className="nqb-nudge-action-btn">Add filter</button>
                      <button className="nqb-nudge-dismiss">Cancel</button>
                    </div>
                  </div>
                  <button className="nqb-add-filter-btn" id="nqb-add-filter-btn">
                    <span>+</span> Add a filter
                  </button>
                </div>
              </div>

              {/* Results view */}
              <div className="nqb-results" id="nqb-results" style={{ display: 'none' }}>
                <div className="nqb-results-hd">
                  <div>
                    <div className="nqb-results-title" id="nqb-results-title">Query Results</div>
                    <div className="nqb-results-meta" id="nqb-results-meta"></div>
                  </div>
                  <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <button className="nqb-results-back">
                      <svg width="11" height="11" viewBox="0 0 13 13" fill="none"><path d="M8.5 10.5L4.5 6.5l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Edit query
                    </button>
                  </div>
                </div>
                <div className="nqb-results-body">
                  <table className="nqb-results-table" id="nqb-results-table"></table>
                </div>
                <div className="nqb-results-count" id="nqb-results-count"></div>
                {/* Kap AI nudge: step 4 */}
                <div className="nqb-results-nudge" id="nqb-results-nudge">
                  <span className="nqb-inline-nudge-icon" aria-hidden="true">✦</span>
                  <span className="nqb-results-nudge-text">Want a plain-English summary of this data, or need to refine the query?</span>
                  <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    <button className="nqb-nudge-action-btn">Summarise</button>
                    <button className="nqb-nudge-action-btn">Refine</button>
                    <button className="nqb-nudge-dismiss">Dismiss</button>
                  </div>
                </div>
                {/* Summary card */}
                <div className="nqb-summary-card" id="nqb-summary-card" style={{ display: 'none' }}>
                  <span className="nqb-inline-nudge-icon" aria-hidden="true">✦</span>
                  <div className="nqb-summary-card-body">
                    <div className="nqb-summary-card-label">Kap AI Summary</div>
                    <div className="nqb-summary-card-text" id="nqb-summary-card-text"></div>
                  </div>
                  <button className="nqb-nudge-dismiss" title="Dismiss">
                    <svg width="12" height="12" viewBox="0 0 15 15" fill="none"><path d="M13.5 1.5L1.5 13.5M1.5 1.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
              </div>

              {/* Ask Kap AI: always-visible inline chat bar */}
              <div className="nqb-ai-thread" id="nqb-ai-thread" style={{ display: 'none' }}></div>

              {/* SQL Console */}
              <div className={`nqb-sql-pane${sqlOpen ? ' open' : ''}`} id="nqb-sql-pane">
                <div className="nqb-sql-pane-hd">
                  <span className="nqb-sql-pane-title">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M3.5 4L1.5 6l2 2M8.5 4l2 2-2 2M5.5 9l1-6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    SQL Console
                  </span>
                  <button className="nqb-sql-pane-close" aria-label="Close SQL console" onClick={() => setSqlOpen(false)}>
                    <svg width="8" height="8" viewBox="0 0 15 15" fill="none"><path d="M13.5 1.5L1.5 13.5M1.5 1.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </button>
                </div>
                <textarea
                  className="nqb-sql-editor"
                  id="nqb-sql-editor"
                  spellCheck="false"
                  placeholder="-- SQL will generate from your selections above"
                ></textarea>
                <div className="nqb-sql-ai-nudge" id="nqb-sql-nudge" style={{ display: 'none' }}>
                  <span className="nqb-sql-nudge-text"><b><span aria-hidden="true">✦ </span>Kap AI:</b> Prefer to describe the change? I'll write the SQL for you.</span>
                  <button className="nqb-sql-nudge-btn">Describe change</button>
                  <button className="nqb-sql-nudge-dismiss">Dismiss</button>
                </div>
              </div>

              {/* Floating bottom card: summary chips + nav buttons */}
              <div className="nqb-actions is-empty" id="nqb-actions-bar">
                <div className="nqb-summary" id="nqb-summary">
                  <span className="nqb-summary-empty" id="nqb-summary-empty">Your query will appear here as you build it.</span>
                </div>
                <div className="nqb-actions-nav">
                  <button
                    className="nqb-back-btn"
                    id="nqb-back-btn"
                    style={{ visibility: nqStep > 1 ? 'visible' : 'hidden' }}
                    onClick={() => goToStep(nqStep - 1)}
                  >&larr; Back</button>
                  <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                    {nqStep < 4 && (
                      <button className="nqb-continue-btn" id="nqb-continue-btn" onClick={() => goToStep(nqStep + 1)}>Continue &rarr;</button>
                    )}
                    {nqStep === 4 && (
                      <button className="nqb-run-btn" id="nqb-run-btn">&#9654; Run Query</button>
                    )}
                  </div>
                </div>
              </div>

            </div>{/* /nqb-left */}
          </div>{/* /nqb-body */}
        </div>{/* /nqb-page */}
      </div>{/* /ds-new-question */}

      {/* ── Dashboard View (opened dashboard) ── */}
      <div
        id="dashboard-view"
        style={{ display: isDashboardView ? 'flex' : 'none', flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden' }}
      >
        <div className="dv-controls">
          <button className="dv-ctl-btn">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <rect x="0.5" y="1.5" width="11" height="10" rx="2" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4 0.5v2M8 0.5v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M3.5 6.5h5M3.5 8.5h3" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity=".6"/>
            </svg>
            Last 7 Days
            <svg className="dv-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2.5 3.5L5 6.5L7.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="dv-ctl-btn">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 2.5h10M3 6h6M5 9.5h2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            Filters
            <span className="dv-filter-badge">3</span>
            <svg className="dv-chevron" width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2.5 3.5L5 6.5L7.5 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <div style={{ flex: 1 }}></div>
          <div className="dv-search">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="5.5" cy="5.5" r="3.5" stroke="currentColor" strokeWidth="1.3"/>
              <path d="M8.5 8.5L11 11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input placeholder="Search metrics…" />
          </div>
          <div className="dv-divider"></div>
          <button className="dv-ctl-btn">
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1.5 6.5A5 5 0 0 1 10 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M11.5 6.5A5 5 0 0 1 3 10.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M9 0.5v2H11" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M4 10.5v2H2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
          <button className="dv-ctl-btn">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="9.5" cy="2.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="9.5" cy="9.5" r="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <circle cx="2.5" cy="6"   r="1.5" stroke="currentColor" strokeWidth="1.2"/>
              <path d="M4 5.2L8.1 3.3M4 6.8l4.1 1.9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Share
          </button>
          <button className="dv-ctl-btn">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M6 1v7M3.5 5.5L6 8l2.5-2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M1 9v1.5A1.5 1.5 0 0 0 2.5 12h7A1.5 1.5 0 0 0 11 10.5V9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
            Export
          </button>
          <button className="dv-btn-primary">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8.5 1.5L10.5 3.5L4 10H2v-2L8.5 1.5Z" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Edit
          </button>
        </div>
        <div className="dv-body" id="dv-body" style={{ flex: 1, overflow: 'auto', padding: 'var(--space-8) var(--space-10)' }}>
          <div className="dash-tiles">
            {[
              { title: 'Avg Handle Time', value: '4.2m', sub: '+0.3m vs last week' },
              { title: 'First Response Rate', value: '87%', sub: '−3% vs target' },
              { title: 'Tickets Resolved', value: '1,204', sub: 'Today' },
              { title: 'CSAT Score', value: '4.6/5', sub: '+0.2 vs last month' },
            ].map((tile, i) => (
              <div key={i} className="dash-tile">
                <div className="dash-tile-hd">
                  <span className="dash-tile-title">{tile.title}</span>
                  <button className="dash-tile-remove">×</button>
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 700, color: 'var(--dark-teal)' }}>{tile.value}</div>
                <div style={{ fontSize: 'var(--font-xs)', color: 'var(--cutty-sark)' }}>{tile.sub}</div>
                <div className="dash-tile-viz"></div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
