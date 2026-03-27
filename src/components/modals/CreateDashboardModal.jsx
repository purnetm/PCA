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

  function proceed() {
    if (selected.size === 0 || !dashName.trim()) return
    closeModal()
    dispatch({ type: 'SET_DS_SECTION', section: 'composer' })
    dispatch({ type: 'NAVIGATE', view: 'data-studio' })
  }

  return (
    <div className="sq-overlay" style={{ display: 'flex' }} onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="sq-modal" style={{ width: 640, maxHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
        <div className="sq-modal-hd">
          <div className="sq-modal-hd-icon">⊞</div>
          <div>
            <div className="sq-modal-title">Create New Dashboard</div>
            <div style={{ fontSize: 12, color: 'var(--cutty-sark)' }}>Select queries to include</div>
          </div>
          <button className="sq-close-btn" onClick={closeModal}>✕</button>
        </div>
        <div className="sq-modal-body" style={{ display: 'flex', gap: 20, flex: 1, overflow: 'hidden' }}>
          {/* Query list */}
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-teal)' }}>Select Queries</span>
              <button onClick={() => setSelected(new Set(QUERIES.map(q => q.id)))}
                style={{ fontSize: 11, color: 'var(--teal)', background: 'none', border: 'none', cursor: 'pointer' }}>Select all</button>
            </div>
            {QUERIES.map(q => (
              <div key={q.id} onClick={() => toggle(q.id)}
                style={{ padding: '10px 12px', border: `1px solid ${selected.has(q.id) ? 'var(--teal)' : 'var(--nebula)'}`, borderRadius: 8, marginBottom: 8, cursor: 'pointer', background: selected.has(q.id) ? 'var(--teal-10)' : '#fff', display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 16, height: 16, border: `2px solid ${selected.has(q.id) ? 'var(--teal)' : 'var(--nebula)'}`, borderRadius: 4, background: selected.has(q.id) ? 'var(--teal)' : 'transparent', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {selected.has(q.id) && <span style={{ color: '#fff', fontSize: 10 }}>✓</span>}
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-teal)' }}>{q.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: 0.7 }}>{q.desc}</div>
                </div>
              </div>
            ))}
          </div>
          {/* Right panel */}
          <div style={{ width: 180, flexShrink: 0 }}>
            <div style={{ padding: '14px', border: '1px solid var(--nebula)', borderRadius: 10, background: 'var(--surface)', marginBottom: 12 }}>
              <div style={{ fontSize: 24, fontWeight: 700, color: 'var(--dark-teal)', fontFamily: 'var(--font-display)' }}>{selected.size}</div>
              <div style={{ fontSize: 11, color: 'var(--cutty-sark)' }}>Queries selected</div>
            </div>
            <div className="sq-field">
              <label className="sq-label">Dashboard Name</label>
              <input className="sq-input" value={dashName} onChange={e => setDashName(e.target.value)} placeholder="My Dashboard" />
            </div>
          </div>
        </div>
        <div className="sq-modal-ft">
          <button className="sq-cancel-btn" onClick={closeModal}>Cancel</button>
          <button className="sq-save-btn" onClick={proceed} disabled={selected.size === 0 || !dashName.trim()}
            style={{ opacity: (selected.size === 0 || !dashName.trim()) ? 0.5 : 1 }}>Next →</button>
        </div>
      </div>
    </div>
  )
}
