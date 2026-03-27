import { useEffect } from 'react'

export default function UserMenu({ open, onToggle, onDarkMode, onSignOut }) {
  useEffect(() => {
    if (!open) return
    function handleClick(e) {
      const popup = document.getElementById('user-popup')
      const btn = document.getElementById('user-menu-btn')
      if (popup && !popup.contains(e.target) && btn && !btn.contains(e.target)) {
        onToggle()
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open, onToggle])

  const MoonIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M13.5 9.5A6 6 0 0 1 6.5 2.5a6 6 0 1 0 7 7z"/>
    </svg>
  )
  const SignOutIcon = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M10.5 10.5L13 8m0 0l-2.5-2.5M13 8H6"/>
      <path d="M6 3H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h3"/>
    </svg>
  )
  const ChevronIcon = (
    <svg id="user-menu-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5"
      style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', transition: 'transform 0.2s' }}>
      <path d="M2 8l4-4 4 4"/>
    </svg>
  )
  return (
    <>
      <div className={open ? 'user-popup open' : 'user-popup'} id="user-popup">
        <div className="user-popup-header">
          <div className="user-avatar" style={{ width: 40, height: 40, fontSize: 16, flexShrink: 0 }}>W</div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 600, fontSize: 13, color: 'var(--dark-teal)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Wellness Forever</div>
            <div style={{ fontSize: 11, color: 'var(--cutty-sark)', opacity: 0.65, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>rajeshwari.nb@kapturecrm.com</div>
          </div>
        </div>
        <button className="user-popup-item" onClick={onDarkMode}>
          {MoonIcon} Dark Mode
        </button>
        <button className="user-popup-item danger" onClick={onSignOut}>
          {SignOutIcon} Sign out
        </button>
      </div>
      <button className={`user-menu-btn${open ? ' open' : ''}`} id="user-menu-btn" data-tooltip="Wellness Forever" onClick={onToggle}>
        <div className="user-avatar">W</div>
        <div className="user-info">
          <span className="user-name">Wellness Forever</span>
          <span className="user-email">rajeshwari.nb@kapture…</span>
        </div>
        {ChevronIcon}
      </button>
    </>
  )
}
