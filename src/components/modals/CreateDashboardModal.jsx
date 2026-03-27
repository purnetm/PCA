import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { QUERIES } from '../../data'

export default function CreateDashboardModal() {
  const { state, closeModal, dispatch } = useApp()
  const [selected, setSelected] = useState(new Set())
  const [dashName, setDashName] = useState('')
  if (state.modal !== 'create-dashboard') return null

  function toggle(id) {
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  function selectAll() {
    if (selected.size === QUERIES.length) {
      setSelected(new Set())
    } else {
      setSelected(new Set(QUERIES.map(q => q.id)))
    }
  }

  function proceed() {
    if (selected.size === 0 || !dashName.trim()) return
    closeModal()
    dispatch({ type: 'SET_DS_SECTION', section: 'composer' })
    dispatch({ type: 'NAVIGATE', view: 'data-studio' })
  }

  const canProceed = selected.size > 0 && dashName.trim()

  return (
    <div className="sq-overlay" style={{ display: 'flex' }} onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="sq-modal" style={{ width: 720, maxWidth: '94vw', maxHeight: 'calc(100vh - 80px)' }}>
        <div className="sq-modal-hd">
          <div className="sq-modal-hd-left">
            <div className="sq-modal-hd-icon">
              <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
                <rect x="1" y="1" width="6" height="6" rx="1" fill="white"/>
                <rect x="9" y="1" width="6" height="6" rx="1" fill="white"/>
                <rect x="1" y="9" width="6" height="6" rx="1" fill="white"/>
                <rect x="9" y="9" width="6" height="6" rx="1" fill="white"/>
              </svg>
            </div>
            <div>
              <div className="sq-modal-title">Create New Dashboard</div>
              <div className="sq-modal-sub">Select queries and configure your dashboard</div>
            </div>
          </div>
          <button className="sq-close-btn" onClick={closeModal}>
            <svg width="16" height="16" viewBox="0 0 15 15" fill="none">
              <path d="M13.5 1.5L1.5 13.5M1.5 1.5L13.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="cdm-body">
          {/* LEFT: Query list */}
          <div className="cdm-left">
            <div className="cdm-left-hd">
              Select Queries
              <button className="cdm-select-all-btn" onClick={selectAll}>
                {selected.size === QUERIES.length ? 'Deselect all' : 'Select all'}
              </button>
            </div>
            <div className="cdm-query-list">
              {QUERIES.map(q => (
                <div
                  key={q.id}
                  className={`cdm-query-row${selected.has(q.id) ? ' selected' : ''}`}
                  onClick={() => toggle(q.id)}
                >
                  <div className="cdm-check">
                    {selected.has(q.id) && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <span className="cdm-query-name">{q.name}</span>
                  <span className="cdm-query-meta">{q.chartType || q.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Counter + Name */}
          <div className="cdm-right">
            <div className="cdm-counter-card">
              <div className="cdm-counter-num">{selected.size}</div>
              <div className="cdm-counter-text">
                <div className="cdm-counter-label">Queries selected</div>
                <div className="cdm-counter-hint">Pick from the list on the left</div>
              </div>
            </div>
            <div className="sq-field">
              <label className="sq-label">Dashboard Name</label>
              <input
                className="sq-input"
                value={dashName}
                onChange={e => setDashName(e.target.value)}
                placeholder="e.g. Agent Performance Dashboard"
              />
            </div>
          </div>
        </div>

        <div className="sq-modal-ft">
          <button className="sq-cancel-btn" onClick={closeModal}>Cancel</button>
          <button
            className="sq-save-btn"
            onClick={proceed}
            disabled={!canProceed}
            style={{ opacity: canProceed ? 1 : 0.35, cursor: canProceed ? 'pointer' : 'not-allowed' }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}
