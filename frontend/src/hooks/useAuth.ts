import { useEffect } from 'react';
import { useAuthStore } from '../stores/authStore';

export const useAuth = () => {
  const { token, login } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken && !token) {
      // In a real app, you might want to validate the token with the server
      // For now, assume it's valid and set a dummy user
      // You could decode JWT to get user info
      login(storedToken, { id: '1', email: 'user@example.com' }); // Placeholder
    }
  }, [token, login]);

  return { token };
};