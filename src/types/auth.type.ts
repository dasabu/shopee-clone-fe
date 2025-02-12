import { User } from './user.type'
import { ApiResponse } from './utils.type'

export type AuthCredentials = {
  email: string
  password: string
}

export type AuthResponse = ApiResponse<{
  access_token: string
  expires: string
  user: User
}>
