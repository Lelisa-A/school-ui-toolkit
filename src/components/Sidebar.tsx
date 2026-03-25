import React from 'react';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  LayoutDashboard,
  Calendar,
  Settings,
  LogOut,
  ChevronRight,
  Shield,
  Search,
  Plus,
  ArrowUpRight,
  TrendingUp,
  Activity,
  Award
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { UserRole } from '../types';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { user } = useStore();
  const location = useLocation();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/', roles: ['ADMIN', 'PRINCIPAL', 'TEACHER', 'STUDENT', 'LIBRARIAN', 'ASSET_MANAGER', 'PARENT'] as UserRole[] },
    { icon: Users, label: 'Students', path: '/students', roles: ['ADMIN', 'PRINCIPAL', 'TEACHER'] as UserRole[] },
    { icon: GraduationCap, label: 'Teachers', path: '/teachers', roles: ['ADMIN', 'PRINCIPAL'] as UserRole[] },
    { icon: BookOpen, label: 'Library', path: '/library', roles: ['ADMIN', 'LIBRARIAN', 'STUDENT', 'TEACHER'] as UserRole[] },
    { icon: Calendar, label: 'Attendance', path: '/attendance', roles: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'] as UserRole[] },
    { icon: Settings, label: 'Settings', path: '/settings', roles: ['ADMIN'] as UserRole[] },
  ];

  const filteredItems = menuItems.filter(item => user && item.roles.includes(user.role));

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-slate-200 transition-transform duration-300 lg:translate-x-0",
      !isOpen && "-translate-x-full"
    )}>
      <div className="flex flex-col h-full">
        <div className="h-20 flex items-center px-8 border-b border-slate-50">
          <span className="text-xl font-black text-indigo-600">EDUSMART</span>
        </div>
        <nav className="flex-1 py-8 px-4 space-y-2">
          {filteredItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={cn(
                "flex items-center gap-4 px-4 py-3 rounded-xl transition-all",
                location.pathname === item.path ? "bg-indigo-50 text-indigo-600" : "text-slate-500 hover:bg-slate-50"
              )}
            >
              <item.icon size={20} />
              <span className="font-bold text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
};