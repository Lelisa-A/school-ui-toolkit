import * as React from 'react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  animate?: boolean;
  hoverEffect?: boolean;
  glass?: boolean;
  variant?: 'default' | 'glass' | 'gradient' | 'outline' | 'indigo' | 'slate' | 'soft' | 'white';
  hoverGlow?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, animate = true, hoverEffect = true, glass = true, variant = 'default', hoverGlow = false, ...props }, ref) => {
    const Component = animate ? motion.div : 'div';
    const motionProps = animate ? {
      initial: { opacity: 0, y: 30, scale: 0.98 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      viewport: { once: true, margin: "-100px" },
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] }
    } : {};

    const variantStyles = {
      default: 'bg-white border-slate-200/60 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.02)]',
      glass: 'bg-white/70 backdrop-blur-3xl border-white/50 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.05)]',
      gradient: 'bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-700 text-white border-none shadow-2xl shadow-indigo-200/50',
      outline: 'bg-transparent border-[3px] border-slate-100 shadow-none hover:border-indigo-100',
      indigo: 'bg-indigo-50 border-indigo-100/50 shadow-none',
      slate: 'bg-slate-950 border-slate-800 text-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)]',
      soft: 'bg-slate-50 border-slate-100 shadow-none',
      white: 'bg-white border-none shadow-[0_40px_100px_-20px_rgba(0,0,0,0.06)]',
    };

    return (
      <Component
        ref={ref}
        className={cn(
          'rounded-[3.5rem] border transition-all duration-700 overflow-hidden relative group/card',
          variantStyles[variant],
          hoverEffect && variant !== 'outline' && 'hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.1)] hover:-translate-y-3',
          hoverGlow && 'before:absolute before:inset-0 before:bg-gradient-to-tr before:from-indigo-500/0 before:to-indigo-500/10 before:opacity-0 hover:before:opacity-100 before:transition-opacity duration-1000 before:pointer-events-none',
          className
        )}
        {...(motionProps as any)}
        {...props}
      />
    );
  }
);
Card.displayName = 'EduCard';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-3 p-10 lg:p-14', className)} {...props} />
  )
);
CardHeader.displayName = 'EduCardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('text-3xl font-black leading-none tracking-tighter text-slate-900 italic', className)} {...props} />
  )
);
CardTitle.displayName = 'EduCardTitle';

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-[11px] font-black text-slate-400 leading-relaxed uppercase tracking-[0.3em] opacity-80', className)} {...props} />
  )
);
CardDescription.displayName = 'EduCardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-10 lg:p-14 pt-0', className)} {...props} />
  )
);
CardContent.displayName = 'EduCardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-10 lg:p-14 pt-0 border-t border-slate-50 mt-6', className)} {...props} />
  )
);
CardFooter.displayName = 'EduCardFooter';

export { Card as EduCard, CardHeader as EduCardHeader, CardTitle as EduCardTitle, CardDescription as EduCardDescription, CardContent as EduCardContent, CardFooter as EduCardFooter };