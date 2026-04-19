// Props: label (string), onRemove (fn)
export default function Chip({ label, onRemove }) {
  return (
    <span className="send-chip">
      {label}
      <button
        className="send-chip-remove"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
      >
        &times;
      </button>
    </span>
  )
}
