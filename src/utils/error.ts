import axios, { AxiosError } from 'axios'

// if these 'isAxios...error' functions return true -> typeof error = AxiosError
// else -> typeof error = never
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxios422Error<T>(error: unknown): error is AxiosError<T> {
  return isAxiosError(error) && error.response?.status === 422
}
