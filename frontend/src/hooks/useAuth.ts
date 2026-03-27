import { useState, useEffect, useCallback } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';
import { STORAGE_KEYS } from '../utils/constants';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (!token) {
      setIsLoading(false);
      return;
    }

    authService.me()
      .then((data) => {
        setUser(data.user);
        setIsAuthenticated(true);
      })
      .catch(() => {
        authService.logout();
        setUser(null);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login({ email, password });
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.register({ name, email, password });
      setUser(response.user);
      setIsAuthenticated(true);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateProfile = useCallback(async (data: { name?: string; email?: string; password?: string }) => {
    setIsLoading(true);
    try {
      const response = await authService.updateProfile(data);
      setUser(response.user);
      return response;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    register,
    updateProfile,
    logout,
  };
};
