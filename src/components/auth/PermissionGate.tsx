import React from 'react';
import { usePermissions } from '../../hooks/usePermissions';
import { Permission, UserRole } from '../../types';

interface PermissionGateProps {
  children: React.ReactNode;
  permission?: Permission | Permission[];
  role?: UserRole | UserRole[];
  fallback?: React.ReactNode;
}

export const PermissionGate: React.FC<PermissionGateProps> = ({ 
  children, 
  permission, 
  role, 
  fallback = null 
}) => {
  const { hasPermission, hasRole } = usePermissions();

  const canShow = (permission ? hasPermission(permission) : true) && 
                  (role ? hasRole(role) : true);

  if (!canShow) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};