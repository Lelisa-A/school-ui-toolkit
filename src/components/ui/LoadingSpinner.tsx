import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  className?: string;
  size?: number;
  label?: string;
}

export const LoadingSpinner = ({ className, size = 24, label }: LoadingSpinnerProps) => {
  return (
    <div className={cn("flex flex-col items-center justify-center gap-3 p-8", className)}>
      <Loader2 
        className="text-indigo-600 animate-spin" 
        size={size} 
      />
      {label && (
        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] animate-pulse">
          {label}
        </p>
      )}
    </div>
  );
};