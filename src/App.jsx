import { AppProvider, useApp } from './context/AppContext'
import AppLayout from './components/layout/AppLayout'
import KapAIView from './components/views/KapAIView'
import DataStudioView from './components/views/DataStudioView'
import CIView from './components/views/analytics/CIView'
import RPAView from './components/views/analytics/RPAView'
import VBView from './components/views/analytics/VBView'
import CMGView from './components/views/analytics/CMGView'
import CreateDashboardModal from './components/modals/CreateDashboardModal'
import SendDashboardModal from './components/modals/SendDashboardModal'
import AccessModal from './components/modals/AccessModal'

function ViewRouter() {
  const { state } = useApp()
  const { currentView } = state

  switch (currentView) {
    case 'kap-ai':
      return <KapAIView />
    case 'data-studio':
      return <DataStudioView />
    case 'analytics-ci':
      return <CIView />
    case 'analytics-rpa':
      return <RPAView />
    case 'analytics-vb':
      return <VBView />
    case 'analytics-cmg':
      return <CMGView />
    case 'intelligence':
      return <PlaceholderView title="Intelligence" />
    case 'configuration':
      return <PlaceholderView title="Configuration" />
    default:
      return <KapAIView />
  }
}

function PlaceholderView({ title }) {
  return (
    <div className="content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
        <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🚧</div>
        <div style={{ fontSize: '1rem', fontWeight: 600 }}>{title}</div>
        <div style={{ fontSize: '0.875rem', marginTop: '4px' }}>Coming soon</div>
      </div>
    </div>
  )
}

function Modals() {
  const { state, closeModal } = useApp()
  const { modal } = state

  return (
    <>
      <CreateDashboardModal open={modal === 'create-dashboard'} onClose={closeModal} />
      <SendDashboardModal open={modal === 'send-dashboard'} onClose={closeModal} />
      <AccessModal open={modal === 'access'} onClose={closeModal} />
    </>
  )
}

export default function App() {
  return (
    <AppProvider>
      <AppLayout>
        <ViewRouter />
      </AppLayout>
      <Modals />
    </AppProvider>
  )
}
