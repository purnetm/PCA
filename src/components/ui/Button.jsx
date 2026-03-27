// Props: variant ('primary'|'secondary'|'warning'), size ('sm'|'md'),
//        icon, iconPosition ('left'|'right'|'only'), disabled, onClick, children, className
export default function Button({
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition,
  disabled,
  onClick,
  children,
  className = '',
}) {
  const cls = `btn btn-${variant}-default${className ? ' ' + className : ''}`

  return (
    <button className={cls} disabled={disabled} onClick={onClick}>
      {icon && (iconPosition === 'left' || iconPosition === 'only') && icon}
      {iconPosition !== 'only' && children}
      {icon && iconPosition === 'right' && icon}
    </button>
  )
}
