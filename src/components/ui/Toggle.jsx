// Props: checked (bool), onChange (fn), id (string)
export default function Toggle({ checked, onChange, id }) {
  return (
    <button
      className={`sq-toggle${checked ? ' active' : ''}`}
      onClick={() => onChange(!checked)}
      role="switch"
      aria-checked={checked}
      id={id}
    >
      <span className="sq-toggle-knob" />
    </button>
  )
}
