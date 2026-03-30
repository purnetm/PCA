import { createContext, useContext, useReducer, useEffect } from 'react'

const initialState = {
  currentView: 'kap-ai',
  dsSection: 'home',
  expandedNav: new Set(),
  darkMode: false,
  sidebarCollapsed: false,
  userMenuOpen: false,
  notifPanelOpen: false,
  toast: null,
  modal: null,
  modalData: {},
}

function reducer(state, action) {
  switch (action.type) {
    case 'NAVIGATE':
      return { ...state, currentView: action.view }

    case 'SET_DS_SECTION':
      return { ...state, dsSection: action.section }

    case 'TOGGLE_NAV': {
      const next = new Set()
      if (!state.expandedNav.has(action.id)) next.add(action.id)
      return { ...state, expandedNav: next }
    }

    case 'TOGGLE_DARK_MODE': {
      const nextDark = !state.darkMode
      document.documentElement.classList.toggle('dark', nextDark)
      return { ...state, darkMode: nextDark }
    }

    case 'TOGGLE_SIDEBAR_COLLAPSE':
      return { ...state, sidebarCollapsed: !state.sidebarCollapsed }

    case 'TOGGLE_USER_MENU':
      return { ...state, userMenuOpen: !state.userMenuOpen }

    case 'CLOSE_USER_MENU':
      return { ...state, userMenuOpen: false }

    case 'TOGGLE_NOTIF':
      return { ...state, notifPanelOpen: !state.notifPanelOpen }

    case 'CLOSE_NOTIF':
      return { ...state, notifPanelOpen: false }

    case 'SHOW_TOAST':
      return { ...state, toast: { message: action.message } }

    case 'HIDE_TOAST':
      return { ...state, toast: null }

    case 'OPEN_MODAL':
      return { ...state, modal: action.modal, modalData: action.data ?? {} }

    case 'CLOSE_MODAL':
      return { ...state, modal: null, modalData: {} }

    default:
      return state
  }
}

export const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    if (!state.toast) return
    const timer = setTimeout(() => dispatch({ type: 'HIDE_TOAST' }), 3200)
    return () => clearTimeout(timer)
  }, [state.toast])

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')

  const { state, dispatch } = ctx

  function navigate(view) {
    dispatch({ type: 'NAVIGATE', view })
  }

  function showToast(message) {
    dispatch({ type: 'SHOW_TOAST', message })
  }

  function openModal(modal, data) {
    dispatch({ type: 'OPEN_MODAL', modal, data })
  }

  function closeModal() {
    dispatch({ type: 'CLOSE_MODAL' })
  }

  return { state, dispatch, navigate, showToast, openModal, closeModal }
}
