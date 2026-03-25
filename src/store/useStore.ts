import { create } from 'zustand';
import { User, UserRole, Permission } from '../types';
import { ROLE_PERMISSIONS } from '../lib/permissions';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (role: UserRole) => void;
  logout: () => void;
  setPermissions: (permissions: Permission[]) => void;
  setUser: (user: User | null) => void;
  initializeAuth: () => Promise<void>;
  updateUserRole: (role: UserRole) => void;
}

const MOCK_USERS: Record<UserRole, User> = {
  ADMIN: { id: '1', name: 'Admin User', email: 'admin@school.com', role: 'ADMIN', permissions: ROLE_PERMISSIONS['ADMIN'], avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop' },
  PRINCIPAL: { id: '2', name: 'Dr. Principal', email: 'principal@school.com', role: 'PRINCIPAL', permissions: ROLE_PERMISSIONS['PRINCIPAL'] },
  TEACHER: { id: '3', name: 'Prof. Sarah Teach', email: 'teacher@school.com', role: 'TEACHER', permissions: ROLE_PERMISSIONS['TEACHER'] },
  STUDENT: { id: '4', name: 'Ethan Hunt', email: 'student@school.com', role: 'STUDENT', permissions: ROLE_PERMISSIONS['STUDENT'] },
  LIBRARIAN: { id: '5', name: 'Ms. Library', email: 'librarian@school.com', role: 'LIBRARIAN', permissions: ROLE_PERMISSIONS['LIBRARIAN'] },
  ASSET_MANAGER: { id: '6', name: 'Mr. Assets', email: 'assets@school.com', role: 'ASSET_MANAGER', permissions: ROLE_PERMISSIONS['ASSET_MANAGER'] },
  PARENT: { id: '7', name: 'Parent One', email: 'parent@school.com', role: 'PARENT', permissions: ROLE_PERMISSIONS['PARENT'] },
};

export const useStore = create<AuthState>((set, get) => ({
  user: null, 
  isAuthenticated: false,
  isLoading: false,
  
  login: (role: UserRole) => {
    const user = MOCK_USERS[role];
    set({ user, isAuthenticated: true });
    localStorage.setItem('edu_user_role', role);
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem('edu_user_role');
  },
  
  setPermissions: (permissions: Permission[]) => {
    const { user } = get();
    if (user) {
      set({ user: { ...user, permissions } });
    }
  },
  
  setUser: (user: User | null) => {
    set({ user, isAuthenticated: !!user });
  },

  updateUserRole: (role: UserRole) => {
    const { user } = get();
    if (user) {
      set({ 
        user: { 
          ...user, 
          role, 
          permissions: ROLE_PERMISSIONS[role] 
        } 
      });
      localStorage.setItem('edu_user_role', role);
    }
  },

  initializeAuth: async () => {
    set({ isLoading: true });
    
    try {
      // Check database connection before initializing
      const { error: connectionError } = await supabase.from('profiles').select('id').limit(1).maybeSingle();
      
      if (connectionError && connectionError.message.includes('fetch')) {
        toast.error('Database Connectivity Issues Detected', {
           description: 'A synchronization error occurred with the database node. Attempting background recovery.',
           duration: 10000
        });
      }

      const savedRole = localStorage.getItem('edu_user_role') as UserRole;
      if (savedRole && MOCK_USERS[savedRole]) {
        set({ user: MOCK_USERS[savedRole], isAuthenticated: true });
      }

      const { user } = get();
      if (user) {
        supabase
          .channel('public:profiles')
          .on('postgres_changes', { 
            event: 'UPDATE', 
            schema: 'public', 
            table: 'profiles', 
            filter: `id=eq.${user.id}` 
          }, (payload) => {
            if (payload.new.role) {
              const newRole = payload.new.role as UserRole;
              set({ 
                user: { 
                  ...user, 
                  role: newRole, 
                  permissions: ROLE_PERMISSIONS[newRole] 
                } 
              });
            }
          })
          .subscribe((status) => {
            if (status === 'CHANNEL_ERROR') {
               console.error('[REALTIME_ERROR] Synchronization failure with the data node.');
               toast.error('Real-time sync interrupted', {
                  description: 'The real-time communication node is experiencing synchronization issues.'
               });
            }
          });
      }
    } catch (err) {
      console.error('Auth initialization error:', err);
      toast.error('A synchronization error occurred with the database node.', {
        description: 'Critical failure during institutional data synchronization. Please refresh the portal.'
      });
    } finally {
      await new Promise(resolve => setTimeout(resolve, 800));
      set({ isLoading: false });
    }
  },
}));