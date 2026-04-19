import { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function SendDashboardModal() {
  const { state, closeModal, showToast } = useApp()
  const [emails, setEmails] = useState([])
  const [inputVal, setInputVal] = useState('')
  const [message, setMessage] = useState('')
  const [attach, setAttach] = useState(true)
  if (state.modal !== 'send-dashboard') return null

  function addEmail(val) {
    const trimmed = val.trim()
    if (trimmed && trimmed.includes('@') && !emails.includes(trimmed)) {
      setEmails(prev => [...prev, trimmed])
    }
    setInputVal('')
  }

  function handleKey(e) {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); addEmail(inputVal) }
    if (e.key === 'Backspace' && !inputVal && emails.length) setEmails(prev => prev.slice(0, -1))
  }

  function submit() {
    closeModal()
    showToast('Dashboard sent successfully!')
  }

  return (
    <div className="sq-overlay send-modal-overlay" style={{ display: 'flex' }} onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="send-modal-panel" style={{ width: 480, background: '#fff', borderRadius: 14, display: 'flex', flexDirection: 'column', maxHeight: '80vh' }}>
        <div className="send-modal-header">
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--dark-teal)' }}>Send Dashboard</span>
          <button className="sq-close-btn" onClick={closeModal}>✕</button>
        </div>
        <div className="send-modal-body" style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span className="send-dash-name-badge">{state.modalData?.dashName || 'Dashboard'}</span>
          <div>
            <div className="send-field-label">To</div>
            <div className="send-chip-wrap" onClick={() => document.getElementById('send-email-input')?.focus()}>
              {emails.map((e, i) => (
                <span key={i} className="send-chip">{e}<button className="send-chip-remove" onClick={() => setEmails(prev => prev.filter((_, j) => j !== i))}>×</button></span>
              ))}
              <input id="send-email-input" className="send-chip-input-el" value={inputVal} onChange={e => setInputVal(e.target.value)}
                onKeyDown={handleKey} onBlur={() => addEmail(inputVal)} placeholder={emails.length ? '' : 'Add email addresses…'} />
            </div>
          </div>
          <div>
            <div className="send-field-label">Message (optional)</div>
            <textarea className="send-msg-textarea" value={message} onChange={e => setMessage(e.target.value)}
              placeholder="Add a note…" style={{ width: '100%', resize: 'none', minHeight: 80 }} />
          </div>
          <label className="send-attach-row" style={{ display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer', fontSize: 12 }}>
            <input type="checkbox" checked={attach} onChange={e => setAttach(e.target.checked)} />
            Attach dashboard as PDF
          </label>
        </div>
        <div className="send-modal-footer" style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', padding: '16px 20px', borderTop: '1px solid var(--nebula)' }}>
          <button className="send-btn-cancel" onClick={closeModal}>Cancel</button>
          <button className="send-btn-send" onClick={submit} disabled={emails.length === 0} style={{ opacity: emails.length === 0 ? 0.5 : 1 }}>Send</button>
        </div>
      </div>
    </div>
  )
}
