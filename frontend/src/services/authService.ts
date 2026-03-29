import { api } from '../services/api'
import type { LoginRequest, RegisterRequest, AuthResponse } from '../shared/types'

export const authService = {
  async login(data: LoginRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/login', data)
    return response.data
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post('/auth/register', data)
    return response.data
  },

  async getCurrentUser(): Promise<any> {
    const response = await api.get('/auth/me')
    return response.data
  },

  async refreshToken(): Promise<{ token: string }> {
    const response = await api.post('/auth/refresh')
    return response.data
  },
}