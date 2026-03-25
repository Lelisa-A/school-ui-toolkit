import React from 'react';
import { useStore } from '../store/useStore';
import { AdminDashboard } from './Dashboard/AdminDashboard';
import { StudentDashboard } from './Dashboard/StudentDashboard';
import { TeacherDashboard } from './Dashboard/TeacherDashboard';
import { LibrarianDashboard } from './Dashboard/LibrarianDashboard';
import { AssetManagerDashboard } from './Dashboard/AssetManagerDashboard';
import { ParentDashboard } from './Dashboard/ParentDashboard';
import { motion, AnimatePresence } from 'framer-motion';

export const Dashboard: React.FC = () => {
  const { user } = useStore();

  if (!user) return null;

  const renderDashboard = () => {
    switch (user.role) {
      case 'ADMIN':
      case 'PRINCIPAL':
        return <AdminDashboard />;
      case 'TEACHER':
        return <TeacherDashboard />;
      case 'STUDENT':
        return <StudentDashboard />;
      case 'LIBRARIAN':
        return <LibrarianDashboard />;
      case 'ASSET_MANAGER':
        return <AssetManagerDashboard />;
      case 'PARENT':
        return <ParentDashboard />;
      default:
        return (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter">Access restricted.</h2>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px]">Your institutional role is not provisioned for this dashboard node.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div 
        key={user.role}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {renderDashboard()}
      </motion.div>
    </AnimatePresence>
  );
};