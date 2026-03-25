import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowUpRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'indigo' | 'rose' | 'amber' | 'slate' | 'emerald';
  description?: string;
  chart?: boolean;
}

export const StatCard = ({ title, value, icon, trend, color = 'indigo', description, chart = true }: StatCardProps) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600 border-blue-100 ring-blue-100/50',
    green: 'bg-emerald-50 text-emerald-600 border-emerald-100 ring-emerald-100/50',
    purple: 'bg-violet-50 text-violet-600 border-violet-100 ring-violet-100/50',
    orange: 'bg-orange-50 text-orange-600 border-orange-100 ring-orange-100/50',
    red: 'bg-rose-50 text-rose-600 border-rose-100 ring-rose-100/50',
    indigo: 'bg-indigo-50 text-indigo-600 border-indigo-100 ring-indigo-100/50',
    rose: 'bg-rose-50 text-rose-600 border-rose-100 ring-rose-100/50',
    amber: 'bg-amber-50 text-amber-600 border-amber-100 ring-amber-100/50',
    slate: 'bg-slate-50 text-slate-600 border-slate-100 ring-slate-100/50',
    emerald: 'bg-emerald-50 text-emerald-600 border-emerald-100 ring-emerald-100/50',
  };

  const gradientColors = {
    blue: 'from-blue-600 to-blue-400 shadow-blue-200/50',
    green: 'from-emerald-600 to-emerald-400 shadow-emerald-200/50',
    purple: 'from-violet-600 to-violet-400 shadow-violet-200/50',
    orange: 'from-orange-600 to-orange-400 shadow-orange-200/50',
    red: 'from-rose-600 to-rose-400 shadow-rose-200/50',
    indigo: 'from-indigo-600 to-indigo-400 shadow-indigo-200/50',
    rose: 'from-rose-600 to-rose-400 shadow-rose-200/50',
    amber: 'from-amber-600 to-amber-400 shadow-amber-200/50',
    slate: 'from-slate-600 to-slate-400 shadow-slate-200/50',
    emerald: 'from-emerald-600 to-emerald-400 shadow-emerald-200/50',
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10, transition: { duration: 0.4, ease: [0.23, 1, 0.32, 1] } }}
      className="relative group overflow-hidden bg-white p-8 md:p-10 rounded-[3rem] border border-slate-200/60 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.03)] flex flex-col gap-10 transition-shadow hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)]"
    >
      {/* Dynamic Background Glow */}
      <div className={cn(
        "absolute -right-16 -top-16 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity duration-1000",
        gradientColors[color].split(' ')[0].replace('from-', 'bg-')
      )} />

      <div className="flex items-start justify-between relative z-10">
        <div className={cn(
          "w-16 h-16 rounded-[1.75rem] flex items-center justify-center shadow-lg transition-all group-hover:scale-110 group-hover:rotate-6 duration-500 ring-8", 
          colorMap[color]
        )}>
          {icon}
        </div>
        {trend && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "flex items-center gap-1.5 text-[10px] font-black px-4 py-2 rounded-2xl shadow-sm border backdrop-blur-md",
              trend.isPositive ? "bg-emerald-50/80 text-emerald-600 border-emerald-100" : "bg-rose-50/80 text-rose-600 border-rose-100"
            )}
          >
            {trend.isPositive ? <TrendingUp size={14} strokeWidth={3} /> : <TrendingDown size={14} strokeWidth={3} />}
            <span className="tracking-widest uppercase">{Math.abs(trend.value)}%</span>
          </motion.div>
        )}
      </div>

      <div className="space-y-2 relative z-10 flex-1">
        <p className="text-slate-400 text-[10px] font-black tracking-[0.3em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">{title}</p>
        <div className="flex items-baseline gap-3">
          <h3 className="text-5xl font-black text-slate-900 tracking-tighter tabular-nums leading-none">{value}</h3>
          {description && <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-1 rounded-lg">/ {description}</span>}
        </div>
      </div>

      {chart && (
        <div className="relative h-2 w-full bg-slate-50 rounded-full overflow-hidden z-10 shadow-inner">
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '85%' }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: [0.23, 1, 0.32, 1], delay: 0.5 }}
            className={cn("absolute inset-y-0 left-0 bg-gradient-to-r rounded-full shadow-lg", gradientColors[color])}
          />
        </div>
      )}

      <button className="absolute bottom-10 right-10 p-4 rounded-2xl bg-slate-50 text-slate-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-10 transition-all duration-500 hover:text-indigo-600 hover:bg-white hover:shadow-xl hover:shadow-indigo-100 border border-transparent hover:border-indigo-100">
        <ArrowUpRight size={20} />
      </button>
    </motion.div>
  );
};