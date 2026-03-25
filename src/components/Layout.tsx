import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Package, 
  Bell, 
  Calendar, 
  BarChart3, 
  ClipboardCheck, 
  UserCircle, 
  Settings, 
  LogOut,
  X,
  School,
  FileText
} from 'lucide-react';
import { NavLink, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { cn } from '../lib/utils';
import { UserRole } from '../types';

interface SidebarItem {
  title: string;
  icon: React.ElementType;
  role?: UserRole[];
  path: string;
}

const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { title: 'Students', icon: GraduationCap, role: ['ADMIN', 'PRINCIPAL', 'TEACHER'], path: '/students' },
  { title: 'Teachers', icon: Users, role: ['ADMIN', 'PRINCIPAL'], path: '/teachers' },
  { title: 'Library', icon: BookOpen, role: ['ADMIN', 'LIBRARIAN', 'STUDENT', 'TEACHER'], path: '/library' },
  { title: 'Assets', icon: Package, role: ['ADMIN', 'ASSET_MANAGER'], path: '/assets' },
  { title: 'Attendance', icon: ClipboardCheck, role: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'], path: '/attendance' },
  { title: 'Assignments', icon: FileText, role: ['TEACHER', 'STUDENT'], path: '/assignments' },
  { title: 'Grades', icon: BarChart3, role: ['ADMIN', 'TEACHER', 'STUDENT', 'PARENT'], path: '/grades' },
  { title: 'Announcements', icon: Bell, path: '/announcements' },
  { title: 'Profile', icon: UserCircle, path: '/profile' },
];

export function Sidebar() {
  const { user, login } = useStore();
  const currentRole = user?.role || 'ADMIN';

  const filteredItems = sidebarItems.filter(
    item => !item.role || item.role.includes(currentRole)
  );

  const roles: UserRole[] = ['ADMIN', 'PRINCIPAL', 'TEACHER', 'STUDENT', 'LIBRARIAN', 'ASSET_MANAGER', 'PARENT'];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-slate-900 text-white transition-transform duration-300 lg:static lg:translate-x-0"
      )}
    >
      <div className="flex h-16 items-center justify-between px-6 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2">
          <School className="h-8 w-8 text-blue-400" />
          <span className="text-xl font-bold tracking-tight">Nexus Edu</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto mt-6 space-y-1 px-3 custom-scrollbar">
        {filteredItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all",
              isActive 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" 
                : "text-slate-400 hover:bg-slate-800 hover:text-white"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            {item.title}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800 bg-slate-950/50">
        <div className="flex items-center gap-3 px-2 py-3 rounded-xl bg-slate-800/50">
          <img 
            src={user?.avatar || `https://i.pravatar.cc/150?u=${user?.name}`} 
            alt="Avatar" 
            className="h-10 w-10 rounded-full border border-slate-700 object-cover shadow-sm"
          />
          <div className="flex flex-col min-w-0">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs text-slate-500 capitalize">{user?.role.toLowerCase().replace('_', ' ')}</p>
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          <p className="px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">Demo Role Switcher</p>
          <div className="grid grid-cols-2 gap-1.5">
            {roles.map(role => (
              <button 
                key={role}
                onClick={() => login(role)}
                className={cn(
                  "rounded-md px-2 py-1.5 text-[10px] font-semibold transition-all active:scale-95",
                  currentRole === role 
                    ? "bg-blue-600 text-white shadow-sm ring-1 ring-blue-500" 
                    : "bg-slate-800 text-slate-400 border border-slate-700/50 hover:bg-slate-700"
                )}
              >
                {role.split('_')[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}