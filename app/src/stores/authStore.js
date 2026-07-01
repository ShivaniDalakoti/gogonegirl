import { create } from 'zustand';
import client from '../api/client';

export const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await client.post('/api/auth/login', { email, password });

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token, loading: false });
        return true;
      }
      set({ error: data.error, loading: false });
      return false;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Login failed';
      set({ error: errorMsg, loading: false });
      return false;
    }
  },

  register: async (userData) => {
    set({ loading: true, error: null });
    try {
      const { data } = await client.post('/api/auth/register', userData);

      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        set({ user: data.user, token: data.token, loading: false });
        return true;
      }
      set({ error: data.error, loading: false });
      return false;
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Registration failed';
      set({ error: errorMsg, loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  clearError: () => set({ error: null }),
}));
