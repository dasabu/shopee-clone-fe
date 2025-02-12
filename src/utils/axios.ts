import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'

class AxiosService {
  instance: AxiosInstance

  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/',
      timeout: 10000, // 10s
      headers: {
        'Content-Type': 'application/json'
      }
    })
    // Response interceptor
    this.instance.interceptors.response.use(
      function (response) {
        return response
      },
      function (error: AxiosError) {
        if (error.response?.status !== 422) {
          console.log('hehe')
          const errorResponseData: any = error.response?.data
          const errorMessage = errorResponseData?.message || error.message
          toast.error(errorMessage)
        }
        return Promise.reject(error)
      }
    )
  }
}

const axiosInstance = new AxiosService().instance

export default axiosInstance
