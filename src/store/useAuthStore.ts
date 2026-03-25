import { create } from 'zustand';
import { UserRole } from '../types';

interface AuthState {
  user: { name: string; role: UserRole; avatar: string } | null;
  role: UserRole;
  setRole: (role: UserRole) => void;
  login: (role: UserRole) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: { name: 'Admin User', role: 'ADMIN', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
  role: 'ADMIN',
  setRole: (role) => set({ role }),
  login: (role) => set({ role, user: { name: `${role} User`, role, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' } }),
  logout: () => set({ user: null, role: 'STUDENT' }),
}));