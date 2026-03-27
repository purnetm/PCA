import { useState } from 'react'
import { useApp } from '../../context/AppContext'

export default function AccessModal() {
  const { state, closeModal, showToast } = useApp()
  const [access, setAccess] = useState('public')
  if (state.modal !== 'access') return null
  function save() { closeModal(); showToast('Access settings saved.') }
  return (
    <div className="sq-overlay send-modal-overlay" style={{ display: 'flex' }} onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="send-modal-panel" style={{ width: 440, background: '#fff', borderRadius: 14, display: 'flex', flexDirection: 'column' }}>
        <div className="send-modal-header">
          <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--dark-teal)' }}>Dashboard Access</span>
          <button className="sq-close-btn" onClick={closeModal}>✕</button>
        </div>
        <div className="send-modal-body" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <span className="send-dash-name-badge">{state.modalData?.dashName || 'Dashboard'}</span>
          <div className="access-radio-group">
            {[
              { value: 'public', icon: '🌐', title: 'Public', desc: 'Visible to everyone in the organisation' },
              { value: 'private', icon: '🔒', title: 'Private', desc: 'Only visible to you and selected people' },
            ].map(opt => (
              <label key={opt.value} className={`access-radio-opt${access === opt.value ? ' checked' : ''}`}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', border: `1px solid ${access === opt.value ? 'var(--teal)' : 'var(--nebula)'}`, borderRadius: 10, cursor: 'pointer', background: access === opt.value ? 'var(--teal-10)' : '#fff' }}>
                <input type="radio" name="access" value={opt.value} checked={access === opt.value} onChange={() => setAccess(opt.value)} style={{ accentColor: 'var(--teal)' }} />
                <span style={{ fontSize: 18 }}>{opt.icon}</span>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--dark-teal)' }}>{opt.title}</div>
                  <div style={{ fontSize: 11, color: 'var(--cutty-sark)' }}>{opt.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', padding: '16px 20px', borderTop: '1px solid var(--nebula)' }}>
          <button className="sq-cancel-btn" onClick={closeModal}>Cancel</button>
          <button className="sq-save-btn" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}
