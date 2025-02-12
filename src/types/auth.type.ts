import { User } from './user.type'
import { SuccessResponse } from './utils.type'

export type AuthCredentials = {
  email: string
  password: string
}

export type AuthResponse = SuccessResponse<{
  access_token: string
  expires: string
  user: User
}>
