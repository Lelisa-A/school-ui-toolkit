import React from 'react';
import { 
  Package, 
  Wrench, 
  MapPin, 
  AlertTriangle, 
  Plus, 
  Search, 
  ArrowRight,
  ClipboardCheck,
  Zap,
  Activity,
  Cpu,
  RefreshCw,
  Box,
  Truck,
  ArrowUpRight,
  ShieldCheck,
  History
} from 'lucide-react';
import { cn } from '../lib/utils';
import { EduCard, EduCardContent, EduCardHeader, EduCardTitle, EduCardDescription } from './ui/EduCard';
import { EduButton } from './ui/EduButton';
import { EduBadge } from './ui/EduBadge';
import { StatCard } from './ui/StatCard';
import { motion } from 'framer-motion';
import { useSearchStore } from '../store/useSearchStore';
import { toast } from 'sonner';

const ASSETS_DATA = [
  { name: 'MacBook Pro 14"', category: 'IT Hardware', user: 'Mr. David (IT Dept)', status: 'ACTIVE', date: '2h ago', id: 'ASSET-2023-01' },
  { name: 'Physics Lab Beaker Set', category: 'Lab Equipt', user: 'Ms. Sarah (Science)', status: 'ACTIVE', date: '4h ago', id: 'ASSET-2023-02' },
  { name: 'Office Chair - Ergonomic', category: 'Furniture', user: 'Admin Office', status: 'MAINTENANCE', date: 'Yesterday', id: 'ASSET-2023-03' },
  { name: 'Epson Projector 4K', category: 'AV Gear', user: 'Hall B', status: 'ACTIVE', date: '2 days ago', id: 'ASSET-2023-04' },
  { name: 'Dell Monitor 27"', category: 'IT Hardware', user: 'Library Node', status: 'ACTIVE', date: '5h ago', id: 'ASSET-2023-05' },
  { name: 'Chemical Balance', category: 'Lab Equipt', user: 'Science Block', status: 'MAINTENANCE', date: '3 days ago', id: 'ASSET-2023-06' },
];

export function AssetDashboard() {
  const { query } = useSearchStore();

  const filteredAssets = ASSETS_DATA.filter(asset => 
    asset.name.toLowerCase().includes(query.toLowerCase()) ||
    asset.category.toLowerCase().includes(query.toLowerCase()) ||
    asset.user.toLowerCase().includes(query.toLowerCase()) ||
    asset.id.toLowerCase().includes(query.toLowerCase())
  );

  const handleAction = (action: string) => {
    toast.success(`Asset ${action} Initiated`, {
      description: "Inventory record updated in the global ledger.",
      icon: <Package className="text-slate-900" />
    });
  };

  return (
    <div className="space-y-12 p-2 lg:p-4 pb-32 animate-in fade-in duration-1000">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tighter italic leading-none">Inventory <br/><span className="text-slate-600">Controller.</span></h1>
          <p className="text-slate-400 font-bold mt-4 uppercase tracking-[0.4em] text-[10px]">Institutional Assets & Infrastructure Node</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <EduButton 
            variant="secondary" 
            className="rounded-2xl h-16 px-10 border-slate-200 font-black italic shadow-lg hover:shadow-2xl transition-all"
            onClick={() => handleAction('Audit')}
          >
            <RefreshCw size={20} className="mr-3 text-slate-600" /> FULL AUDIT
          </EduButton>
          <EduButton 
            variant="primary" 
            className="rounded-2xl h-16 px-10 shadow-[0_20px_40px_-10px_rgba(15,23,42,0.3)] font-black italic bg-slate-900 hover:bg-slate-800"
            onClick={() => handleAction('New Registration')}
          >
            <Plus size={20} className="mr-3" /> REGISTER ASSET
          </EduButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Global Inventory" value="2,480" icon={<Package size={24} />} color="slate" trend={{ value: 2.5, isPositive: true }} />
        <StatCard title="Maintenance Queue" value="45" icon={<Wrench size={24} />} color="amber" trend={{ value: 12, isPositive: false }} />
        <StatCard title="Allocation Rate" value="92%" icon={<Truck size={24} />} color="blue" trend={{ value: 4, isPositive: true }} />
        <StatCard title="Integrity Score" value="98%" icon={<ShieldCheck size={24} />} color="emerald" trend={{ value: 0.8, isPositive: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <EduCard className="lg:col-span-8 border-none ring-1 ring-slate-100 shadow-3xl shadow-slate-200/50 rounded-[3rem] overflow-hidden" animate>
          <EduCardHeader className="border-b border-slate-50 bg-slate-50/20 p-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <EduCardTitle className="text-3xl font-black italic tracking-tighter">Real-time Allocation Grid</EduCardTitle>
                <EduCardDescription className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Tracking hardware and facility resources</EduCardDescription>
              </div>
              <div className="flex bg-slate-100 p-2 rounded-[1.5rem] border border-slate-200">
                 <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest bg-white text-slate-900 rounded-xl shadow-sm">All Nodes</button>
                 <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">Active</button>
                 <button className="px-6 py-2.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">Maintenance</button>
              </div>
            </div>
          </EduCardHeader>
          <EduCardContent className="p-0">
             <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="bg-slate-50/50">
                         <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Asset Node</th>
                         <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Classification</th>
                         <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Operator / Node</th>
                         <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Protocol Status</th>
                         <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Ledger</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-100">
                      {filteredAssets.map((asset, i) => (
                         <motion.tr 
                           key={asset.id}
                           initial={{ opacity: 0, x: -10 }}
                           animate={{ opacity: 1, x: 0 }}
                           transition={{ delay: i * 0.05 }}
                           className="hover:bg-slate-50/80 transition-all group"
                         >
                            <td className="px-10 py-8">
                               <div className="flex items-center gap-6">
                                  <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                                     <Box size={24} className="text-slate-400" />
                                  </div>
                                  <div>
                                     <p className="text-base font-black text-slate-900 italic leading-tight">{asset.name}</p>
                                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1.5">{asset.id}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-10 py-8">
                               <EduBadge variant="indigo" className="bg-slate-100 text-slate-600 rounded-xl h-8 px-4 font-black uppercase tracking-widest text-[9px]">{asset.category}</EduBadge>
                            </td>
                            <td className="px-10 py-8">
                               <p className="text-sm font-black text-slate-900">{asset.user}</p>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Uplink: Active</p>
                            </td>
                            <td className="px-10 py-8">
                               <div className="flex items-center gap-3">
                                  <div className={cn("w-2 h-2 rounded-full", asset.status === 'ACTIVE' ? "bg-emerald-500" : "bg-amber-500 animate-pulse")} />
                                  <span className={cn("text-[10px] font-black uppercase tracking-widest", asset.status === 'ACTIVE' ? "text-emerald-600" : "text-amber-600")}>{asset.status}</span>
                               </div>
                            </td>
                            <td className="px-10 py-8 text-right">
                               <EduButton variant="ghost" size="icon" className="h-12 w-12 rounded-xl text-slate-300 hover:text-slate-900 hover:bg-slate-100 transition-all">
                                  <ArrowRight size={18} />
                               </EduButton>
                            </td>
                         </motion.tr>
                      ))}
                      {filteredAssets.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-10 py-20 text-center">
                            <div className="flex flex-col items-center gap-4 opacity-30">
                               <Search size={64} className="text-slate-400" />
                               <p className="text-xl font-black italic text-slate-500 tracking-tighter">No assets matching the query</p>
                            </div>
                          </td>
                        </tr>
                      )}
                   </tbody>
                </table>
             </div>
          </EduCardContent>
        </EduCard>

        <div className="lg:col-span-4 space-y-10">
           <EduCard className="bg-amber-50 border-none ring-1 ring-amber-100 shadow-3xl shadow-amber-200/20 rounded-[3rem] overflow-hidden" animate>
             <EduCardHeader className="border-b border-amber-200 p-10 bg-amber-100/30">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm border border-amber-200">
                    <AlertTriangle size={24} />
                 </div>
                 <div>
                    <EduCardTitle className="text-amber-900 italic font-black text-2xl tracking-tighter">Maintenance Protocol</EduCardTitle>
                    <EduCardDescription className="text-amber-700/60 font-black text-[10px] uppercase tracking-widest">Active repair & audit tickets</EduCardDescription>
                 </div>
               </div>
             </EduCardHeader>
             <EduCardContent className="p-10 space-y-6">
                {[
                  { title: 'HVAC Unit Hall C', desc: 'Overdue annual inspection', priority: 'HIGH' },
                  { title: 'School Bus #04', desc: 'Engine light reported', priority: 'MEDIUM' },
                  { title: 'Library PCs (Row 3)', desc: 'OS update required', priority: 'LOW' },
                ].map((alert, i) => (
                  <div key={i} className="p-6 bg-white/60 rounded-[2rem] border border-amber-200 hover:bg-white hover:shadow-xl transition-all duration-500 group relative">
                    <div className="flex items-center justify-between mb-3">
                       <h4 className="font-black text-amber-900 text-sm italic">{alert.title}</h4>
                       <span className={cn(
                         "text-[8px] font-black uppercase px-2 py-1 rounded-lg tracking-widest shadow-sm",
                         alert.priority === 'HIGH' ? "bg-rose-500 text-white" : "bg-amber-500 text-white"
                       )}>{alert.priority}</span>
                    </div>
                    <p className="text-xs font-medium text-amber-700 leading-relaxed mb-6 italic">{alert.desc}</p>
                    <EduButton variant="secondary" className="w-full h-12 rounded-xl text-[9px] font-black tracking-widest uppercase border-amber-200 bg-transparent hover:bg-amber-50 text-amber-600">
                       <Wrench size={14} className="mr-2" /> SCHEDULE REPAIR
                    </EduButton>
                  </div>
                ))}
             </EduCardContent>
           </EduCard>

           <EduCard className="bg-slate-950 text-white rounded-[3rem] border-none shadow-3xl p-10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10 space-y-8">
                 <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10 backdrop-blur-md">
                    <Cpu size={32} className="text-indigo-400" />
                 </div>
                 <div>
                    <h4 className="text-2xl font-black italic tracking-tighter leading-none">Global Ledger</h4>
                    <p className="text-slate-400 text-sm mt-4 font-medium leading-relaxed">System-wide synchronization of physical and digital assets with blockchain verification.</p>
                 </div>
                 <div className="pt-4">
                    <div className="flex items-center gap-3 mb-6">
                       <Activity size={16} className="text-emerald-500" />
                       <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Node Online \\u2022 Secure Sync</span>
                    </div>
                    <EduButton variant="glass" className="w-full h-14 rounded-2xl text-[10px] font-black tracking-widest uppercase bg-white/5 border-white/5 hover:bg-white/10">VIEW INTEGRITY REPORT</EduButton>
                 </div>
              </div>
           </EduCard>
        </div>
      </div>
    </div>
  );
}