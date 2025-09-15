import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ApiService } from '@/services/api'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')

  // Actions
  const login = async (credentials: LoginCredentials) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await ApiService.post<{ user: User; token: string }>(
        '/auth/login',
        credentials,
      )

      user.value = response.user
      token.value = response.token
      localStorage.setItem('auth_token', response.token)

      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Đăng nhập thất bại'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const register = async (data: RegisterData) => {
    try {
      isLoading.value = true
      error.value = null

      const response = await ApiService.post<{ user: User; token: string }>('/auth/register', data)

      user.value = response.user
      token.value = response.token
      localStorage.setItem('auth_token', response.token)

      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Đăng ký thất bại'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const logout = () => {
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
  }

  const fetchUser = async () => {
    if (!token.value) return

    try {
      isLoading.value = true
      const userData = await ApiService.get<User>('/auth/me')
      user.value = userData
    } catch (err) {
      logout()
    } finally {
      isLoading.value = false
    }
  }

  const updateProfile = async (profileData: Partial<User>) => {
    try {
      isLoading.value = true
      error.value = null

      const updatedUser = await ApiService.put<User>('/auth/profile', profileData)
      user.value = updatedUser

      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Cập nhật thông tin thất bại'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  const changePassword = async (oldPassword: string, newPassword: string) => {
    try {
      isLoading.value = true
      error.value = null

      await ApiService.post('/auth/change-password', {
        oldPassword,
        newPassword,
      })

      return { success: true }
    } catch (err: any) {
      error.value = err.response?.data?.message || 'Đổi mật khẩu thất bại'
      return { success: false, error: error.value }
    } finally {
      isLoading.value = false
    }
  }

  return {
    // State
    user,
    token,
    isLoading,
    error,
    // Getters
    isAuthenticated,
    isAdmin,
    // Actions
    login,
    register,
    logout,
    fetchUser,
    updateProfile,
    changePassword,
  }
})
