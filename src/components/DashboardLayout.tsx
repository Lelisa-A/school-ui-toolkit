import React from 'react';
import { Shell } from './layout/Shell';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <Shell>{children}</Shell>;
}