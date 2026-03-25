import React, { useState } from 'react';
import { Sidebar } from '../layout/Sidebar';
import { Navbar } from '../layout/Navbar';
import { PageWrapper } from '../layout/PageWrapper';

export const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <Navbar onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
        <main className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
          <PageWrapper>
            {children}
          </PageWrapper>
        </main>
      </div>
    </div>
  );
};