import { AuthResponse } from '@/types/auth.type'
import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import {
  clearAccessTokenFromLS,
  getAccessTokenFromLS,
  saveAccessTokenToLS
} from './auth'

class AxiosClient {
  instance: AxiosInstance
  private accessToken: string

  constructor() {
    this.accessToken = getAccessTokenFromLS()
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      timeout: 10000, // 10s
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        // Đính kèm access_token vào headers.authorization trước khi gửi request
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken // Token đã có 'Bearer '
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        // Đăng nhập/đăng ký: lưu access_token trả về trong response vào local storage
        if (url === '/login' || url === '/register') {
          this.accessToken = (response.data as AuthResponse).data.access_token
          saveAccessTokenToLS(this.accessToken)
        }
        // Đăng xuất: xoá access_token khỏi local storage
        else if (url === '/logout') {
          this.accessToken = ''
          clearAccessTokenFromLS()
        }
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== 422) {
          const errorResponseData: any = error.response?.data
          const errorMessage = errorResponseData?.message || error.message
          toast.error(errorMessage)
        }
        return Promise.reject(error)
      }
    )
  }
}

const axiosInstance = new AxiosClient().instance

export default axiosInstance
