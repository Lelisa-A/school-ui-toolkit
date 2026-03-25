import React from 'react';
import { Search, Bell, User } from 'lucide-react';
import { useStore } from '../store/useStore';

export function Header() {
  const { user } = useStore();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search everything..."
            className="h-10 w-full rounded-lg bg-slate-100 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-500 hover:text-slate-900">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white">3</span>
        </button>

        <div className="flex items-center gap-3 border-l pl-6">
          <div className="text-right">
            <p className="text-sm font-semibold">{user?.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role.toLowerCase()}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-slate-200 flex items-center justify-center">
            <User className="h-6 w-6 text-slate-500" />
          </div>
        </div>
      </div>
    </header>
  );
}