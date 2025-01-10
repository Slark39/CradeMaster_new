// authStore.ts
import {create} from 'zustand';

// Store for authentication
export type AuthState = {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  isAuthenticated: false,
  login: (token) => {
    set({ token, isAuthenticated: true });
    localStorage.setItem('authToken', token); // Save token to localStorage
  },
  logout: () => {
    set({ token: null, isAuthenticated: false });
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('authToken'); // Remove token from localStorage
  },
}));
