import { AuthCredentials, AuthResponse } from '../types/auth.type'
import axiosInstance from '../utils/axios'

export const registerApi = (body: AuthCredentials) =>
  axiosInstance.post<AuthResponse>('/register', body)

export const loginApi = (body: AuthCredentials) =>
  axiosInstance.post<AuthResponse>('/login', body)

export const logoutApi = () => axiosInstance.post('/logout')
