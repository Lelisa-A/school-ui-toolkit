import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { EduButton } from '../ui/EduButton';
import { EduCard } from '../ui/EduCard';
import { X, User, Mail, GraduationCap } from 'lucide-react';

const teacherSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  subject: z.string().min(2, 'Subject is required'),
  classes: z.string().min(1, 'Assign at least one class'),
});

type TeacherFormValues = z.infer<typeof teacherSchema>;

interface TeacherFormProps {
  initialData?: any;
  onSubmit: (data: TeacherFormValues) => void;
  onClose: () => void;
  loading?: boolean;
}

export const TeacherForm: React.FC<TeacherFormProps> = ({ 
  initialData, 
  onSubmit, 
  onClose,
  loading 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TeacherFormValues>({
    resolver: zodResolver(teacherSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      subject: '',
      classes: '',
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <EduCard className="w-full max-w-lg p-0 overflow-hidden border-none shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {initialData ? 'Edit Faculty Record' : 'Register New Faculty'}
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Teacher & Staff Information
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Full Name</label>
              <div className="relative">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input
                   {...register('name')}
                   placeholder="Dr. Emily Smith"
                   className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                 />
              </div>
              {errors.name && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input
                   {...register('email')}
                   placeholder="emily@school.edu"
                   className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                 />
              </div>
              {errors.email && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Department/Subject</label>
                <input
                  {...register('subject')}
                  placeholder="Mathematics"
                  className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
                {errors.subject && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.subject.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Assigned Classes</label>
                <div className="relative">
                   <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input
                     {...register('classes')}
                     placeholder="10A, 11B, 12C"
                     className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                   />
                </div>
                {errors.classes && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.classes.message}</p>}
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <EduButton 
              type="button" 
              variant="secondary" 
              className="flex-1 rounded-2xl h-12 font-black uppercase tracking-widest text-[11px]"
              onClick={onClose}
            >
              Cancel
            </EduButton>
            <EduButton 
              type="submit" 
              variant="primary" 
              className="flex-1 rounded-2xl h-12 font-black uppercase tracking-widest text-[11px]"
              disabled={loading}
            >
              {loading ? 'Processing...' : initialData ? 'Update Faculty' : 'Register Faculty'}
            </EduButton>
          </div>
        </form>
      </EduCard>
    </div>
  );
};