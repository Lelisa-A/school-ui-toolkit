import { UserRole, Permission } from '../types';

export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  ADMIN: [
    'dashboard:view',
    'students:view', 'students:manage',
    'teachers:view', 'teachers:manage',
    'library:view', 'library:manage',
    'assets:view', 'assets:manage',
    'announcements:view', 'announcements:manage',
    'attendance:view', 'attendance:manage',
    'grades:view', 'grades:manage',
    'assignments:view', 'assignments:manage',
    'profile:view', 'profile:manage',
    'settings:view', 'settings:manage',
  ],
  PRINCIPAL: [
    'dashboard:view',
    'students:view', 'students:manage',
    'teachers:view', 'teachers:manage',
    'library:view', 'library:manage',
    'assets:view', 'assets:manage',
    'announcements:view', 'announcements:manage',
    'attendance:view', 'attendance:manage',
    'grades:view', 'grades:manage',
    'assignments:view', 'assignments:manage',
    'profile:view', 'profile:manage',
    'settings:view',
  ],
  TEACHER: [
    'dashboard:view',
    'students:view',
    'teachers:view',
    'library:view',
    'announcements:view', 'announcements:manage',
    'attendance:view', 'attendance:manage',
    'grades:view', 'grades:manage',
    'assignments:view', 'assignments:manage',
    'profile:view', 'profile:manage',
  ],
  STUDENT: [
    'dashboard:view',
    'library:view',
    'announcements:view',
    'attendance:view',
    'grades:view',
    'assignments:view',
    'profile:view', 'profile:manage',
  ],
  LIBRARIAN: [
    'dashboard:view',
    'library:view', 'library:manage',
    'announcements:view',
    'profile:view', 'profile:manage',
  ],
  ASSET_MANAGER: [
    'dashboard:view',
    'assets:view', 'assets:manage',
    'announcements:view',
    'profile:view', 'profile:manage',
  ],
  PARENT: [
    'dashboard:view',
    'announcements:view',
    'attendance:view',
    'grades:view',
    'profile:view', 'profile:manage',
  ],
};

export const hasPermission = (userPermissions: Permission[], requiredPermission: Permission | Permission[]): boolean => {
  if (Array.isArray(requiredPermission)) {
    return requiredPermission.some(p => userPermissions.includes(p));
  }
  return userPermissions.includes(requiredPermission);
};