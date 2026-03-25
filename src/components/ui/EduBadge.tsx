import * as React from 'react';
import { cn } from '../../lib/utils';
import { motion, HTMLMotionProps } from 'framer-motion';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'outline' | 'indigo' | 'violet' | 'amber' | 'secondary' | 'emerald' | 'slate' | 'primary';
  animate?: boolean;
}

function Badge({ className, variant = 'default', animate = true, ...props }: BadgeProps) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 border-slate-200 shadow-sm',
    success: 'bg-emerald-500 text-white border-transparent shadow-lg shadow-emerald-200/50',
    warning: 'bg-amber-500 text-white border-transparent shadow-lg shadow-amber-200/50',
    error: 'bg-rose-500 text-white border-transparent shadow-lg shadow-rose-200/50',
    outline: 'border-[3px] border-slate-100 text-slate-400 bg-transparent hover:border-indigo-600 hover:text-indigo-600 transition-all',
    indigo: 'bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-200/50',
    primary: 'bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-200/50',
    violet: 'bg-violet-600 text-white border-transparent shadow-lg shadow-violet-200/50',
    amber: 'bg-amber-600 text-white border-transparent shadow-lg shadow-amber-200/50',
    secondary: 'bg-slate-800 text-white border-transparent',
    emerald: 'bg-emerald-600 text-white border-transparent shadow-lg shadow-emerald-200/50',
    slate: 'bg-slate-500 text-white border-transparent shadow-sm',
  };

  const motionProps: HTMLMotionProps<"div"> = animate ? {
    whileHover: { scale: 1.05 },
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 }
  } : {};

  return (
    <motion.div
      className={cn(
        'inline-flex items-center rounded-[1rem] border px-4 py-1.5 text-[10px] font-black transition-all uppercase tracking-[0.2em] relative overflow-hidden group/badge italic shadow-sm shrink-0',
        variants[variant],
        className
      )}
      {...motionProps}
      {...(props as any)}
    />
  );
}

export { Badge as EduBadge };