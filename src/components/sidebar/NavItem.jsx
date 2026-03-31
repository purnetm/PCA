export default function NavItem({ id, label, icon, active, expanded, onToggle, children }) {
  return (
    <div>
      <button
        className={`nav-item${active ? ' active' : ''}${expanded ? ' expanded' : ''}`}
        data-nav={id}
        data-tooltip={label}
        onClick={onToggle}
      >
        <span className="nav-icon">{icon}</span>
        <span className="nav-label">{label}</span>
        {children && (
          <svg className="nav-chevron" width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 4l4 4-4 4"/>
          </svg>
        )}
      </button>
      {children && (
        <div className={`nav-subnav${expanded ? ' open' : ''}`}>
          {children}
        </div>
      )}
    </div>
  )
}
