import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { authService } from '../../services/authService'
import { useAuthStore } from '../../store/authStore'
import type { LoginRequest, RegisterRequest, User } from '../types'

export function useAuth() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, token, setUser, logout: storeLogout } = useAuthStore()

  // Check if user is authenticated
  const { data: currentUser, isLoading, error: authError } = useQuery<User>({
    queryKey: ['auth', 'me'],
    queryFn: authService.getCurrentUser,
    enabled: !!token,
    retry: false,
  })

  useEffect(() => {
    if (authError) {
      storeLogout()
      navigate('/login')
    }
  }, [authError, navigate, storeLogout])

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      setUser(response.user, response.token)
      queryClient.setQueryData(['auth', 'me'], response.user)
      navigate('/')
    },
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      setUser(response.user, response.token)
      queryClient.setQueryData(['auth', 'me'], response.user)
      navigate('/')
    },
  })

  // Logout function
  const logout = () => {
    storeLogout()
    queryClient.clear()
    navigate('/login')
  }

  return {
    user: currentUser || user,
    isLoading,
    isAuthenticated: !!currentUser || !!user,
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout,
    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
    loginError: loginMutation.error,
    registerError: registerMutation.error,
  }
}