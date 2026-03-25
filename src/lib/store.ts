import { create } from 'zustand';
import { UserRole } from '../types';

interface UIState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

interface AuthState {
  role: UserRole;
  setRole: (role: UserRole) => void;
  user: { name: string; role: UserRole; avatar: string } | null;
  logout: () => void;
  login: (role: UserRole) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));

export const useAuthStore = create<AuthState>((set) => ({
  role: 'ADMIN',
  setRole: (role) => set({ role }),
  user: { name: 'Admin User', role: 'ADMIN', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
  logout: () => set({ user: null, role: 'STUDENT' }),
  login: (role) => set({ role, user: { name: `${role} User`, role, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' } }),
}));