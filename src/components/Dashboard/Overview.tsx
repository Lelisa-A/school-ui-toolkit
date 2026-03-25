import React from 'react';
import { useStore } from '../../store/useStore';
import { DashboardOverview } from '../dashboard/DashboardOverview';

export function Dashboard() {
  const { user } = useStore();

  if (!user) return null;

  return <DashboardOverview role={user.role} />;
}