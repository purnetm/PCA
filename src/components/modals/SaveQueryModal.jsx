import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import { DASHBOARDS_DATA } from '../../data'

export default function SaveQueryModal() {
  const { state, closeModal, showToast, dispatch } = useApp()
  const [mode, setMode] = useState('existing') // 'existing' | 'new'
  const [selectedDash, setSelectedDash] = useState(null)
  const [newName, setNewName] = useState('')

  if (state.modal !== 'save-query') return null

  function save() {
    if (mode === 'existing' && !selectedDash) return
    if (mode === 'new' && !newName.trim()) return
    closeModal()
    showToast(mode === 'new' ? `Query saved to "${newName}"` : 'Query added to dashboard')
    if (mode === 'new') {
      dispatch({ type: 'SET_DS_SECTION', section: 'composer' })
      dispatch({ type: 'NAVIGATE', view: 'data-studio' })
    }
  }

  const canSave = mode === 'existing' ? !!selectedDash : !!newName.trim()

  return (
    <div className="sq-overlay" style={{ display: 'flex' }} onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="sq-modal" style={{ width: 480, maxWidth: '94vw' }}>
        <div className="sq-modal-hd">
          <div className="sq-modal-hd-left">
            <div className="sq-modal-hd-icon">
              <svg width="16" height="16" viewBox="0 0 13 13" fill="none">
                <rect x="1.5" y="1.5" width="10" height="10" rx="1.5" stroke="white" strokeWidth="1.3"/>
                <path d="M4 1.5v3h5V1.5" stroke="white" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <div className="sq-modal-hd-title">Save Query</div>
              <div className="sq-modal-hd-sub">Add this query to a dashboard</div>
            </div>
          </div>
          <button className="sq-close-btn" onClick={closeModal} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
              <path d="M13.5 1.5L1.5 13.5M1.5 1.5L13.5 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Mode toggle */}
        <div style={{ display: 'flex', gap: 0, padding: '20px 24px 0', borderBottom: '1px solid var(--nebula)' }}>
          <button
            onClick={() => setMode('existing')}
            style={{
              flex: 1, padding: '10px 0', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 'var(--font-sm)', fontWeight: 'var(--weight-semibold)',
              color: mode === 'existing' ? 'var(--teal)' : 'var(--cutty-sark)',
              borderBottom: mode === 'existing' ? '2px solid var(--teal)' : '2px solid transparent',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: 'color 0.15s, border-color 0.15s',
              marginBottom: -1,
            }}
          >
            Add to existing dashboard
          </button>
          <button
            onClick={() => setMode('new')}
            style={{
              flex: 1, padding: '10px 0', border: 'none', background: 'none', cursor: 'pointer',
              fontSize: 'var(--font-sm)', fontWeight: 'var(--weight-semibold)',
              color: mode === 'new' ? 'var(--teal)' : 'var(--cutty-sark)',
              borderBottom: mode === 'new' ? '2px solid var(--teal)' : '2px solid transparent',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              transition: 'color 0.15s, border-color 0.15s',
              marginBottom: -1,
            }}
          >
            Create new dashboard
          </button>
        </div>

        <div className="sq-modal-body" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {mode === 'existing' ? (
            <>
              <div style={{ fontSize: 'var(--font-sm)', color: 'var(--cutty-sark)', marginBottom: 4 }}>
                Select a dashboard to add this query to
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 280, overflowY: 'auto' }}>
                {DASHBOARDS_DATA.map(dash => (
                  <label
                    key={dash.id}
                    onClick={() => setSelectedDash(dash.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px',
                      border: `1px solid ${selectedDash === dash.id ? 'var(--teal)' : 'var(--nebula)'}`,
                      borderRadius: 10, cursor: 'pointer',
                      background: selectedDash === dash.id ? 'var(--teal-10)' : '#fff',
                      transition: 'border-color 0.15s, background 0.15s',
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%', border: `2px solid ${selectedDash === dash.id ? 'var(--teal)' : 'var(--nebula)'}`,
                      background: selectedDash === dash.id ? 'var(--teal)' : '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s',
                    }}>
                      {selectedDash === dash.id && (
                        <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 'var(--font-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--dark-teal)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{dash.name}</div>
                      <div style={{ fontSize: 'var(--font-xs)', color: 'var(--cutty-sark)', marginTop: 2 }}>{dash.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </>
          ) : (
            <>
              <div style={{ fontSize: 'var(--font-sm)', color: 'var(--cutty-sark)', marginBottom: 4 }}>
                Name your new dashboard
              </div>
              <input
                className="sq-name-input"
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder="e.g. Agent Performance Overview"
                autoFocus
                onKeyDown={e => e.key === 'Enter' && save()}
                style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid var(--nebula)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 'var(--font-sm)', color: 'var(--dark-teal)', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
                onFocus={e => e.target.style.borderColor = 'var(--teal)'}
                onBlur={e => e.target.style.borderColor = 'var(--nebula)'}
              />
            </>
          )}
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', padding: '16px 24px', borderTop: '1px solid var(--nebula)' }}>
          <button className="sq-cancel-btn" onClick={closeModal}>Cancel</button>
          <button className="sq-save-btn" onClick={save} disabled={!canSave} style={{ opacity: canSave ? 1 : 0.5, cursor: canSave ? 'pointer' : 'not-allowed' }}>
            {mode === 'new' ? 'Create & Save' : 'Add to Dashboard'}
          </button>
        </div>
      </div>
    </div>
  )
}
