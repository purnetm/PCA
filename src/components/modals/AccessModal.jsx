import { useState } from 'react'
import { useApp } from '../../context/AppContext'

const OPTIONS = [
  {
    value: 'public',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8"/>
        <path d="M10 2c0 0-3.5 3.5-3.5 8s3.5 8 3.5 8M10 2c0 0 3.5 3.5 3.5 8S10 18 10 18M2 10h16"/>
      </svg>
    ),
    title: 'Public',
    desc: 'Visible to everyone in the organisation',
    color: 'var(--teal)',
    bg: 'var(--teal-10)',
  },
  {
    value: 'private',
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="4" y="9" width="12" height="9" rx="2"/>
        <path d="M7 9V6.5a3 3 0 0 1 6 0V9"/>
      </svg>
    ),
    title: 'Private',
    desc: 'Only visible to you and selected people',
    color: '#DC2626',
    bg: 'rgba(220,38,38,0.07)',
  },
]

export default function AccessModal() {
  const { state, closeModal, showToast } = useApp()
  const [access, setAccess] = useState('private')
  if (state.modal !== 'access') return null
  function save() { closeModal(); showToast('Access settings saved.') }

  return (
    <div className="sq-overlay" style={{ display: 'flex' }} onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="sq-modal" style={{ width: 440, maxWidth: '94vw' }}>
        <div className="sq-modal-hd">
          <div className="sq-modal-hd-left">
            <div className="sq-modal-hd-icon">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                <rect x="4" y="9" width="12" height="9" rx="2"/>
                <path d="M7 9V6.5a3 3 0 0 1 6 0V9"/>
              </svg>
            </div>
            <div>
              <div className="sq-modal-hd-title">Dashboard Access</div>
              <div className="sq-modal-hd-sub">{state.modalData?.dashName || 'Set visibility'}</div>
            </div>
          </div>
          <button className="sq-close-btn" onClick={closeModal} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 15 15" fill="none">
              <path d="M13.5 1.5L1.5 13.5M1.5 1.5L13.5 13.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        <div className="sq-modal-body" style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 10 }}>
          {OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => setAccess(opt.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px',
                border: `1.5px solid ${access === opt.value ? opt.color : 'var(--nebula)'}`,
                borderRadius: 12, cursor: 'pointer', textAlign: 'left', width: '100%',
                background: access === opt.value ? opt.bg : '#fff',
                transition: 'border-color 0.15s, background 0.15s',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: access === opt.value ? opt.bg : 'var(--aqua-haze)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                color: access === opt.value ? opt.color : 'var(--cutty-sark)',
                transition: 'all 0.15s',
              }}>
                {opt.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--dark-teal)' }}>{opt.title}</div>
                <div style={{ fontSize: 11, color: 'var(--cutty-sark)', marginTop: 2 }}>{opt.desc}</div>
              </div>
              <div style={{
                width: 18, height: 18, borderRadius: '50%',
                border: `2px solid ${access === opt.value ? opt.color : 'var(--nebula)'}`,
                background: access === opt.value ? opt.color : '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                transition: 'all 0.15s',
              }}>
                {access === opt.value && (
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <path d="M2 5l2.5 2.5 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', padding: '16px 24px', borderTop: '1px solid var(--nebula)' }}>
          <button className="sq-cancel-btn" onClick={closeModal}>Cancel</button>
          <button className="sq-save-btn" onClick={save}>Save changes</button>
        </div>
      </div>
    </div>
  )
}
