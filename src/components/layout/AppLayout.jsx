import { useApp } from '../../context/AppContext'
import Background from './Background'
import Sidebar from '../sidebar/Sidebar'
import Toast from '../ui/Toast'

export default function AppLayout({ children }) {
  const { state } = useApp()
  return (
    <>
      <Background />
      <Sidebar />
      <main className="main">
        {children}
      </main>
      <Toast message={state.toast?.message} show={!!state.toast} />
    </>
  )
}
