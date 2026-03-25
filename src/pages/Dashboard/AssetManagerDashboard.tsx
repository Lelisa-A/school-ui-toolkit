import React, { useMemo } from 'react';
import { 
  Package, 
  MapPin, 
  Plus, 
  Target, 
  Zap, 
  ShieldCheck, 
  QrCode, 
  ArrowUpRight, 
  Monitor, 
  Cpu, 
  Smartphone, 
  Server,
  Search,
  ShieldAlert
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { EduCard, EduCardContent, EduCardHeader, EduCardTitle, EduCardDescription } from '../../components/ui/EduCard';
import { EduButton } from '../../components/ui/EduButton';
import { EduBadge } from '../../components/ui/EduBadge';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { useSearchStore } from '../../store/useSearchStore';
import { toast } from 'sonner';

const MOCK_ASSETS = [
  { id: '1', name: 'MacBook Air M2', type: 'Laptop', tag: 'EDU-LP-001', status: 'IN_USE', user: 'Prof. Miller', health: 98, icon: Cpu },
  { id: '2', name: 'Smart Board 65"', type: 'AV Equipment', tag: 'EDU-SB-012', status: 'MAINTENANCE', user: 'None', health: 45, icon: Monitor },
  { id: '3', name: 'Core Server Hub', type: 'Infrastructure', tag: 'EDU-SR-005', status: 'AVAILABLE', user: 'None', health: 100, icon: Server },
  { id: '4', name: 'Field Tablet Pro', type: 'Handheld', tag: 'EDU-PR-024', status: 'IN_USE', user: 'Mrs. Davis', health: 82, icon: Smartphone },
];

export const AssetManagerDashboard = () => {
  const { query: globalQuery } = useSearchStore();

  const filteredAssets = useMemo(() => {
    return MOCK_ASSETS.filter(asset => 
      asset.name.toLowerCase().includes(globalQuery.toLowerCase()) ||
      asset.tag.toLowerCase().includes(globalQuery.toLowerCase()) ||
      asset.user.toLowerCase().includes(globalQuery.toLowerCase()) ||
      asset.type.toLowerCase().includes(globalQuery.toLowerCase())
    );
  }, [globalQuery]);

  const handleAction = (action: string) => {
    toast.success(`Infrastructure ${action} Initiated`, {
      description: "The asset registry node is updating with priority level 4.",
      icon: <Target className="text-indigo-500" />
    });
  };

  return (
    <div className="space-y-12 p-2 lg:p-4 pb-32 animate-in fade-in duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter italic leading-none">Resource <br/><span className="text-indigo-600">Architect.</span></h1>
          <p className="text-slate-400 font-bold mt-4 uppercase tracking-[0.4em] text-[10px]">Infrastructure & Hardware Operations Node</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <EduButton 
            permission="assets:manage"
            variant="secondary" 
            className="rounded-2xl h-16 px-10 border-slate-200 font-black italic shadow-lg"
            onClick={() => handleAction('Registry Scan')}
          >
            <QrCode size={20} className="mr-3 text-indigo-600" /> SCAN GRID
          </EduButton>
          <EduButton 
            permission="assets:manage"
            variant="primary" 
            className="rounded-2xl h-16 px-10 shadow-2xl font-black italic"
            onClick={() => handleAction('Provisioning')}
          >
            <Plus size={20} className="mr-3" /> PROVISION NODE
          </EduButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Total Registry" value="2,480" icon={<Package size={24} />} color="indigo" trend={{ value: 5, isPositive: true }} />
        <StatCard title="Active Maintenance" value="45" icon={<Zap size={24} />} color="rose" trend={{ value: 12, isPositive: false }} />
        <StatCard title="Allocation Rate" value="92%" icon={<MapPin size={24} />} color="blue" trend={{ value: 0.8, isPositive: true }} />
        <StatCard title="Node Integrity" value="98%" icon={<ShieldCheck size={24} />} color="green" trend={{ value: 0.2, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <EduCard className="lg:col-span-8 border-none ring-1 ring-slate-100 shadow-3xl shadow-slate-200/50 rounded-[3rem] overflow-hidden" animate hoverGlow>
          <EduCardHeader className="border-b border-slate-50 bg-slate-50/20 p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <EduCardTitle className="text-3xl font-black italic tracking-tighter">Allocation Matrix</EduCardTitle>
              <EduCardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Real-time hardware distribution node</EduCardDescription>
            </div>
            <div className="flex items-center gap-3 bg-indigo-50 px-5 py-2.5 rounded-2xl">
               <div className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
               <span className="text-[10px] font-black text-indigo-700 uppercase tracking-[0.2em]">GRID SYNC ACTIVE</span>
            </div>
          </EduCardHeader>
          <EduCardContent className="p-0">
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50/30 border-b border-slate-50">
                         <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Asset Node</th>
                         <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">System Integrity</th>
                         <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em]">Deployment</th>
                         <th className="px-10 py-8 text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] text-right">Actions</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50">
                      <AnimatePresence mode="popLayout">
                        {filteredAssets.length > 0 ? filteredAssets.map((asset, i) => (
                          <motion.tr 
                            layout
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            key={asset.id} 
                            className="hover:bg-slate-50/50 transition-all group"
                          >
                             <td className="px-10 py-8">
                                <div className="flex items-center gap-6">
                                   <div className="w-16 h-16 bg-slate-100 rounded-[1.25rem] border-2 border-slate-200 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:rotate-6 group-hover:text-indigo-500 transition-all duration-700 shadow-inner">
                                      <asset.icon size={32} />
                                   </div>
                                   <div>
                                      <p className="text-lg font-black text-slate-900 italic leading-none group-hover:text-indigo-600 transition-colors">{asset.name}</p>
                                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{asset.tag} \u2022 {asset.type}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="px-10 py-8">
                                <div className="flex items-center gap-4">
                                   <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                      <div className={cn("h-full rounded-full", asset.health > 80 ? 'bg-emerald-500' : asset.health > 50 ? 'bg-amber-500' : 'bg-rose-500')} style={{ width: `${asset.health}%` }} />
                                   </div>
                                   <span className="text-sm font-black text-slate-700 italic">{asset.health}%</span>
                                </div>
                             </td>
                             <td className="px-10 py-8">
                                <EduBadge variant={asset.status === 'AVAILABLE' ? 'success' : asset.status === 'IN_USE' ? 'indigo' : 'error'} className="px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest">
                                   {asset.status}
                                </EduBadge>
                                <p className="text-[9px] font-black text-slate-400 mt-2 uppercase tracking-tighter">{asset.user}</p>
                             </td>
                             <td className="px-10 py-8 text-right">
                                <EduButton variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-slate-300 hover:text-indigo-600 hover:bg-indigo-50">
                                   <ArrowUpRight size={20} />
                                </EduButton>
                             </td>
                          </motion.tr>
                        )) : (
                          <tr>
                            <td colSpan={4} className="px-10 py-20 text-center">
                              <div className="flex flex-col items-center gap-4">
                                <Search size={48} className="text-slate-100" />
                                <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No inventory nodes matched the query signature</p>
                              </div>
                            </td>
                          </tr>
                        )}
                      </AnimatePresence>
                   </tbody>
                </table>
             </div>
          </EduCardContent>
        </EduCard>

        <div className="lg:col-span-4 space-y-10">
           <EduCard className="bg-amber-600 text-white rounded-[3rem] border-none shadow-3xl p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 space-y-8">
                 <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-md">
                    <ShieldAlert size={32} className="text-amber-100" />
                 </div>
                 <div>
                    <h4 className="text-2xl font-black italic tracking-tighter">Maintenance Alerts</h4>
                    <p className="text-amber-100/70 text-sm mt-3 font-medium">12 nodes require immediate diagnostic protocols or hardware replacement.</p>
                 </div>
                 <EduButton variant="glass" className="w-full h-16 rounded-2xl text-[10px] font-black tracking-widest uppercase bg-white/10 hover:bg-white/20 text-white border-white/20">INITIATE REPAIR LOGS</EduButton>
              </div>
           </EduCard>

           <EduCard className="border-none ring-1 ring-slate-100 shadow-3xl shadow-slate-200/50 rounded-[3rem]" animate>
             <EduCardHeader className="border-b border-slate-50 p-10">
               <EduCardTitle className="text-2xl font-black italic tracking-tighter">Grid Health Feed</EduCardTitle>
               <EduCardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Real-time node telemetry</EduCardDescription>
             </EduCardHeader>
             <EduCardContent className="p-10 space-y-8">
               {[
                 { title: 'Server Node Stable', user: 'Primary Hub', time: '1m ago', type: 'SUCCESS' },
                 { title: 'Battery Degradation', user: 'EDU-LP-12', time: '14m ago', type: 'WARNING' },
                 { title: 'New Node Provisioned', user: 'Lab 2A', time: '1h ago', type: 'INFO' },
                 { title: 'Offline Trigger', user: 'Hall B Projector', time: '3h ago', type: 'ERROR' }
               ].map((item, i) => (
                 <div key={i} className="flex items-center gap-6 group cursor-pointer">
                   <div className={cn(
                     "w-4 h-4 rounded-full ring-[6px] shadow-lg transition-all",
                     item.type === 'SUCCESS' ? "bg-emerald-50 ring-emerald-50" : 
                     item.type === 'WARNING' ? "bg-amber-50 ring-amber-50" : 
                     item.type === 'ERROR' ? "bg-rose-50 ring-rose-50 animate-pulse" : "bg-indigo-500 ring-indigo-50"
                   )} />
                   <div className="flex-1">
                     <p className="text-base font-black text-slate-900 group-hover:text-indigo-600 transition-colors leading-tight italic">{item.title}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{item.user}</p>
                   </div>
                   <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">{item.time}</span>
                 </div>
               ))}
             </EduCardContent>
           </EduCard>
        </div>
      </div>
    </div>
  );
};