import React from 'react';
import { useStore } from '../../store/useStore';
import { UserRole } from '../../types';
import { ROLE_PERMISSIONS } from '../../lib/permissions';

export const Login = () => {
  const { login } = useStore();

  const handleLogin = (role: UserRole) => {
    login(role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="p-8 bg-white rounded-3xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-black text-center mb-8">EDUSMART PORTAL</h1>
        <div className="grid gap-4">
          {(['ADMIN', 'PRINCIPAL', 'TEACHER', 'STUDENT'] as UserRole[]).map((role) => (
            <button
              key={role}
              onClick={() => handleLogin(role)}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all"
            >
              Sign in as {role}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};