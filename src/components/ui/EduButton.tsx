import * as React from 'react';
import { cn } from '../../lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { usePermissions } from '../../hooks/usePermissions';
import { Permission, UserRole } from '../../types';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-[1.75rem] font-black transition-all duration-500 focus-visible:outline-none focus-visible:ring-8 focus-visible:ring-indigo-500/10 disabled:opacity-50 disabled:pointer-events-none active:scale-90 shadow-sm ring-offset-background uppercase tracking-[0.2em] relative overflow-hidden group',
  {
    variants: {
      variant: {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xl shadow-indigo-200/50 hover:shadow-indigo-300 active:shadow-inner',
        secondary: 'bg-slate-50 text-slate-900 border-2 border-slate-100 hover:bg-white hover:border-indigo-100 shadow-sm hover:shadow-xl hover:shadow-slate-100',
        outline: 'border-[3px] border-slate-100 bg-transparent hover:bg-slate-50 hover:border-indigo-600 text-slate-500 hover:text-indigo-600',
        ghost: 'bg-transparent hover:bg-indigo-50/50 text-slate-400 hover:text-indigo-600 shadow-none hover:shadow-none',
        danger: 'bg-rose-500 text-white hover:bg-rose-600 shadow-2xl shadow-rose-200/50 hover:shadow-rose-300',
        success: 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-2xl shadow-emerald-200/50 hover:shadow-emerald-300',
        gradient: 'bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-700 text-white hover:from-indigo-700 hover:to-violet-800 shadow-2xl shadow-indigo-300/40 hover:shadow-indigo-400/50 active:shadow-inner',
        glass: 'bg-white/10 backdrop-blur-2xl border-2 border-white/20 text-white hover:bg-white/20 hover:border-white/40 shadow-none',
        white: 'bg-white text-indigo-700 hover:bg-slate-50 shadow-2xl shadow-slate-200/50 border-none hover:scale-105',
        default: 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xl shadow-indigo-200/50',
        link: 'text-indigo-600 underline-offset-8 hover:underline shadow-none bg-transparent hover:bg-transparent',
      },
      size: {
        sm: 'h-12 px-6 text-[10px]',
        md: 'h-16 px-10 text-[11px]',
        lg: 'h-20 px-14 text-sm',
        icon: 'h-16 w-16 p-4 rounded-[1.5rem]',
        default: 'h-16 px-10 text-[11px]',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface EduButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'role'>, VariantProps<typeof buttonVariants> {
  loading?: boolean;
  permission?: Permission | Permission[];
  requiredRole?: UserRole | UserRole[];
  hideIfNoPermission?: boolean;
}

export const EduButton = React.forwardRef<HTMLButtonElement, EduButtonProps>(
  ({ className, variant, size, loading, permission, requiredRole, hideIfNoPermission = false, ...props }, ref) => {
    const { hasPermission, hasRole } = usePermissions();

    const allowedByPermission = permission ? hasPermission(permission) : true;
    const allowedByRole = requiredRole ? hasRole(requiredRole) : true;
    const isAllowed = allowedByPermission && allowedByRole;

    if (!isAllowed && hideIfNoPermission) {
      return null;
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={loading || props.disabled || !isAllowed}
        {...props}
      >
        {loading ? (
          <div className="mr-4 h-5 w-5 animate-spin rounded-full border-[3px] border-current border-t-transparent opacity-80" />
        ) : null}
        <span className="relative z-10 flex items-center gap-2">
          {props.children}
        </span>
        {variant === 'gradient' && (
           <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        )}
      </button>
    );
  }
);
EduButton.displayName = 'EduButton';