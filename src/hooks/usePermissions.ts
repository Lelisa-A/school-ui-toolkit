import { useStore } from '../store/useStore';
import { Permission, UserRole } from '../types';
import { hasPermission as checkPermission } from '../lib/permissions';

export const usePermissions = () => {
  const { user } = useStore();

  const hasPermission = (permission: Permission | Permission[]) => {
    if (!user) return false;
    return checkPermission(user.permissions, permission);
  };

  const hasRole = (role: UserRole | UserRole[]) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  return { hasPermission, hasRole, user };
};