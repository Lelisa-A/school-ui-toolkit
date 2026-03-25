import React from 'react';
import { useStore } from '../store/useStore';
import { EduCard } from '../components/ui/EduCard';
import { EduButton } from '../components/ui/EduButton';
import { EduBadge } from '../components/ui/EduBadge';
import { 
  User, Mail, Shield, Settings, Bell, Lock, Globe, 
  TrendingUp, Award, Clock, MapPin, Camera 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Profile: React.FC = () => {
  const { user } = useStore();

  if (!user) return null;

  return (
    <div className="max-w-[1200px] mx-auto p-4 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar Profile Card */}
        <div className="w-full md:w-80 space-y-6">
          <EduCard className="p-8 border-none shadow-xl shadow-slate-200/50 text-center relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-24 bg-indigo-600" />
             <div className="relative mt-4">
                <div className="relative inline-block">
                   <img 
                     src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff`} 
                     alt={user.name}
                     className="w-32 h-32 rounded-[2.5rem] border-4 border-white shadow-2xl relative z-10"
                   />
                   <button className="absolute bottom-0 right-0 z-20 p-2.5 bg-white rounded-2xl shadow-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all border-2 border-slate-50">
                      <Camera size={18} />
                   </button>
                </div>
                <div className="mt-6 space-y-1">
                   <h2 className="text-2xl font-black text-slate-900 tracking-tighter">{user.name}</h2>
                   <EduBadge variant="primary" className="font-black text-[10px] tracking-widest uppercase px-4 py-1.5 rounded-full">
                      {user.role}
                   </EduBadge>
                </div>
                <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-100 pt-8">
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                      <p className="text-sm font-black text-emerald-600">Active</p>
                   </div>
                   <div className="border-l border-slate-100 pl-4">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Joined</p>
                      <p className="text-sm font-black text-slate-700">Sep 2023</p>
                   </div>
                </div>
             </div>
          </EduCard>

          <EduCard className="p-6 border-none shadow-sm space-y-4">
             <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] px-2">Account Limits</h3>
             <div className="space-y-3">
                {[
                   { label: 'Storage', value: '85%', color: 'indigo' },
                   { label: 'Bandwidth', value: '42%', color: 'emerald' },
                ].map(limit => (
                   <div key={limit.label} className="space-y-1.5">
                      <div className="flex justify-between px-2">
                         <span className="text-[10px] font-black text-slate-600 uppercase">{limit.label}</span>
                         <span className="text-[10px] font-black text-slate-600 uppercase">{limit.value}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                         <div className={`h-full bg-${limit.color}-500 rounded-full`} style={{ width: limit.value }} />
                      </div>
                   </div>
                ))}
             </div>
          </EduCard>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 space-y-8">
           <EduCard className="p-0 border-none shadow-xl shadow-slate-200/50 overflow-hidden">
              <div className="flex border-b border-slate-100 overflow-x-auto no-scrollbar">
                 {['General', 'Security', 'Notifications', 'Preferences'].map((tab, i) => (
                    <button 
                      key={tab}
                      className={`px-8 h-16 text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all relative ${
                        i === 0 ? 'text-indigo-600' : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                       {tab}
                       {i === 0 && <div className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600" />}
                    </button>
                 ))}
              </div>
              
              <div className="p-10 space-y-10">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                          <User size={12} /> Full Name
                       </label>
                       <input 
                         defaultValue={user.name}
                         className="w-full h-14 rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-6 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                          <Mail size={12} /> Email Address
                       </label>
                       <input 
                         defaultValue={user.email}
                         className="w-full h-14 rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-6 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                          <Shield size={12} /> Institutional Role
                       </label>
                       <input 
                         value={user.role}
                         disabled
                         className="w-full h-14 rounded-2xl border-2 border-slate-100 bg-slate-100/50 px-6 text-sm font-black text-slate-500 uppercase tracking-widest outline-none cursor-not-allowed" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1 flex items-center gap-2">
                          <MapPin size={12} /> Location
                       </label>
                       <input 
                         defaultValue="New York, USA"
                         className="w-full h-14 rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-6 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all" 
                       />
                    </div>
                 </div>

                 <div className="pt-6 border-t border-slate-100 flex justify-end gap-3">
                    <EduButton variant="secondary" className="rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[11px]">Discard Changes</EduButton>
                    <EduButton variant="primary" className="rounded-2xl h-14 px-10 font-black uppercase tracking-widest text-[11px] shadow-lg shadow-indigo-500/20">Save Profile</EduButton>
                 </div>
              </div>
           </EduCard>

           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <EduCard className="p-8 border-none shadow-sm">
                 <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Security Overview</h3>
                 <div className="space-y-4">
                    {[
                       { label: 'Two-Factor Auth', status: 'Enabled', icon: Shield, color: 'emerald' },
                       { label: 'Session Timeout', status: '30 Minutes', icon: Clock, color: 'indigo' },
                       { label: 'Last Password Reset', status: '12 Days Ago', icon: Lock, color: 'amber' },
                    ].map(item => (
                       <div key={item.label} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-md transition-all group">
                          <div className="flex items-center gap-4">
                             <div className={`p-2.5 rounded-xl bg-${item.color}-50 text-${item.color}-600 group-hover:bg-${item.color}-600 group-hover:text-white transition-colors`}>
                                <item.icon size={18} />
                             </div>
                             <span className="text-xs font-black text-slate-600 uppercase tracking-tight">{item.label}</span>
                          </div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.status}</span>
                       </div>
                    ))}
                 </div>
              </EduCard>

              <EduCard className="p-8 border-none shadow-sm">
                 <h3 className="text-lg font-black text-slate-900 tracking-tight mb-6">Activity Log</h3>
                 <div className="space-y-6">
                    {[
                       { event: 'Grade updated for G10-Math', time: '2 hours ago', icon: Award },
                       { event: 'Library book "Atomic Habits" checked out', time: '5 hours ago', icon: Globe },
                       { event: 'System settings modified', time: 'Yesterday', icon: Settings },
                    ].map((item, i) => (
                       <div key={i} className="flex gap-4 items-start">
                          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 flex-shrink-0">
                             <item.icon size={14} />
                          </div>
                          <div>
                             <p className="text-xs font-bold text-slate-700 leading-tight">{item.event}</p>
                             <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.time}</p>
                          </div>
                       </div>
                    ))}
                 </div>
              </EduCard>
           </div>
        </div>
      </div>
    </div>
  );
};