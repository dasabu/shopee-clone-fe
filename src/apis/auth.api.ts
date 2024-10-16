import { AuthCredentials, AuthResponse } from '../types/auth.type'
import axiosInstance from '../utils/axios'

export const registerAccountApi = (body: AuthCredentials) => axiosInstance.post<AuthResponse>('/register', body)
