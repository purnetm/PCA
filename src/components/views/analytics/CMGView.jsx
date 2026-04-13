import { useState } from 'react'
import CMGDashboard from './CMGDashboard'
import CMGMetricDetail from './CMGMetricDetail'
import CMGCustomerList from './CMGCustomerList'
import CMGCustomerProfile from './CMGCustomerProfile'

export default function CMGView() {
  const [tab, setTab] = useState('org')
  const [view, setView] = useState('dashboard')
  const [activeMetric, setActiveMetric] = useState(null)
  const [activeCustomer, setActiveCustomer] = useState(null)

  function handleMetricClick(metricId) {
    setActiveMetric(metricId)
    setView('metric')
  }

  function handleCustomerClick(customer) {
    setActiveCustomer(customer)
    setView('customer')
  }

  function handleTabSwitch(newTab) {
    setTab(newTab)
    setView(newTab === 'org' ? 'dashboard' : 'list')
    setActiveMetric(null)
    setActiveCustomer(null)
  }

  function handleBackFromMetric() {
    setView('dashboard')
    setActiveMetric(null)
  }

  function handleBackFromCustomer() {
    setView(tab === 'org' ? 'dashboard' : 'list')
    setActiveCustomer(null)
  }

  const backLabel = tab === 'org' ? 'Dashboard' : 'Customers'

  return (
    <div className="view active" id="view-analytics" style={{ flexDirection: 'column' }}>
      <div style={{ flex: 1, flexDirection: 'column', minHeight: 0, overflow: 'hidden', display: 'flex' }}>

        {/* Topbar */}
        <div className="analytics-topbar">
          <div>
            <div className="analytics-page-title">Customer Memory Graph</div>
            <div className="analytics-page-sub">Support Head Dashboard · 6 Core Metrics · March 2026</div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <div className="cmg2-toggle-pill">
              <button
                className={`cmg2-toggle-btn${tab === 'org' ? ' active' : ''}`}
                onClick={() => handleTabSwitch('org')}
              >Org View</button>
              <button
                className={`cmg2-toggle-btn${tab === 'customers' ? ' active' : ''}`}
                onClick={() => handleTabSwitch('customers')}
              >Customers</button>
            </div>
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px 48px', scrollbarGutter: 'stable' }}>

          {tab === 'org' && view === 'dashboard' && (
            <CMGDashboard
              onMetricClick={handleMetricClick}
              onCustomerClick={handleCustomerClick}
            />
          )}

          {tab === 'org' && view === 'metric' && (
            <CMGMetricDetail
              metric={activeMetric}
              onBack={handleBackFromMetric}
              onCustomerClick={handleCustomerClick}
            />
          )}

          {view === 'customer' && (
            <CMGCustomerProfile
              customer={activeCustomer}
              backLabel={backLabel}
              onBack={handleBackFromCustomer}
            />
          )}

          {tab === 'customers' && view === 'list' && (
            <CMGCustomerList onCustomerClick={handleCustomerClick} />
          )}

        </div>
      </div>
    </div>
  )
}
