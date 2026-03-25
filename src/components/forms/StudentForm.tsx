import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { EduButton } from '../ui/EduButton';
import { EduCard } from '../ui/EduCard';
import { X } from 'lucide-react';

const studentSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  grade: z.string().min(1, 'Grade is required'),
  section: z.string().optional(),
});

type StudentFormValues = z.infer<typeof studentSchema>;

interface StudentFormProps {
  initialData?: any;
  onSubmit: (data: StudentFormValues) => void;
  onClose: () => void;
  loading?: boolean;
}

export const StudentForm: React.FC<StudentFormProps> = ({ 
  initialData, 
  onSubmit, 
  onClose,
  loading 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: initialData || {
      name: '',
      email: '',
      grade: '',
      section: '',
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <EduCard className="w-full max-w-lg p-0 overflow-hidden border-none shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {initialData ? 'Edit Student' : 'Add New Student'}
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Student Information Record
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
              <input
                {...register('name')}
                placeholder="John Doe"
                className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              {errors.name && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.name.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Email Address</label>
              <input
                {...register('email')}
                placeholder="john@example.com"
                className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all"
              />
              {errors.email && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.email.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Grade</label>
                <select
                  {...register('grade')}
                  className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none"
                >
                  <option value="">Select Grade</option>
                  <option value="9">9th Grade</option>
                  <option value="10">10th Grade</option>
                  <option value="11">11th Grade</option>
                  <option value="12">12th Grade</option>
                </select>
                {errors.grade && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.grade.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Section</label>
                <input
                  {...register('section')}
                  placeholder="A, B, C..."
                  className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                />
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
              {loading ? 'Processing...' : initialData ? 'Update Student' : 'Save Student'}
            </EduButton>
          </div>
        </form>
      </EduCard>
    </div>
  );
};