import axios, { type AxiosInstance, type AxiosResponse, type AxiosError } from 'axios'

// Tạo instance axios với cấu hình cơ bản
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor để thêm token vào header
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// Response interceptor để xử lý lỗi chung
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      // Xử lý khi token hết hạn
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

// Generic API service class
export class ApiService {
  static async get<T>(url: string, params?: any): Promise<T> {
    const response = await apiClient.get<T>(url, { params })
    return response.data
  }

  static async post<T>(url: string, data?: any): Promise<T> {
    const response = await apiClient.post<T>(url, data)
    return response.data
  }

  static async put<T>(url: string, data?: any): Promise<T> {
    const response = await apiClient.put<T>(url, data)
    return response.data
  }

  static async patch<T>(url: string, data?: any): Promise<T> {
    const response = await apiClient.patch<T>(url, data)
    return response.data
  }

  static async delete<T>(url: string): Promise<T> {
    const response = await apiClient.delete<T>(url)
    return response.data
  }
}

export default apiClient
