import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timeout?: number
}

export const useAppStore = defineStore('app', () => {
  // State
  const isDarkMode = ref(false)
  const isLoading = ref(false)
  const notifications = ref<Notification[]>([])
  const sidebarOpen = ref(true)
  const pageTitle = ref('Study Mate')

  // Getters
  const theme = computed(() => (isDarkMode.value ? 'dark' : 'light'))
  const hasNotifications = computed(() => notifications.value.length > 0)

  // Actions
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value
    localStorage.setItem('darkMode', isDarkMode.value.toString())
  }

  const setDarkMode = (value: boolean) => {
    isDarkMode.value = value
    localStorage.setItem('darkMode', value.toString())
  }

  const initializeTheme = () => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme !== null) {
      isDarkMode.value = savedTheme === 'true'
    } else {
      // Detect system preference
      isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
  }

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
  }

  const toggleSidebar = () => {
    sidebarOpen.value = !sidebarOpen.value
  }

  const setSidebarOpen = (open: boolean) => {
    sidebarOpen.value = open
  }

  const setPageTitle = (title: string) => {
    pageTitle.value = title
    document.title = `${title} - Study Mate`
  }

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    const newNotification: Notification = {
      id,
      timeout: 5000,
      ...notification,
    }

    notifications.value.push(newNotification)

    // Auto remove notification after timeout
    if (newNotification.timeout && newNotification.timeout > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, newNotification.timeout)
    }

    return id
  }

  const removeNotification = (id: string) => {
    const index = notifications.value.findIndex((n) => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  const clearNotifications = () => {
    notifications.value = []
  }

  // Convenience methods for different notification types
  const showSuccess = (title: string, message: string, timeout?: number) => {
    return addNotification({ type: 'success', title, message, timeout })
  }

  const showError = (title: string, message: string, timeout?: number) => {
    return addNotification({ type: 'error', title, message, timeout })
  }

  const showWarning = (title: string, message: string, timeout?: number) => {
    return addNotification({ type: 'warning', title, message, timeout })
  }

  const showInfo = (title: string, message: string, timeout?: number) => {
    return addNotification({ type: 'info', title, message, timeout })
  }

  return {
    // State
    isDarkMode,
    isLoading,
    notifications,
    sidebarOpen,
    pageTitle,
    // Getters
    theme,
    hasNotifications,
    // Actions
    toggleDarkMode,
    setDarkMode,
    initializeTheme,
    setLoading,
    toggleSidebar,
    setSidebarOpen,
    setPageTitle,
    addNotification,
    removeNotification,
    clearNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }
})
