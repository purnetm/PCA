// Props: message (string|null), show (bool)
export default function Toast({ message, show }) {
  return (
    <div className={`toast${show ? ' show' : ''}`}>
      <svg
        viewBox="0 0 20 20"
        width="20"
        height="20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="10" cy="10" r="10" fill="#4DB6AC" />
        <path
          d="M5.5 10.5L8.5 13.5L14.5 7.5"
          stroke="white"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span>{message}</span>
    </div>
  )
}
