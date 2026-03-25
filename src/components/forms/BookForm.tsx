import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { EduButton } from '../ui/EduButton';
import { EduCard } from '../ui/EduCard';
import { X, Book, User, Hash } from 'lucide-react';

const bookSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  author: z.string().min(2, 'Author is required'),
  isbn: z.string().optional(),
  status: z.enum(['AVAILABLE', 'BORROWED', 'RESERVED']),
  dueDate: z.string().optional(),
});

type BookFormValues = z.infer<typeof bookSchema>;

interface BookFormProps {
  initialData?: any;
  onSubmit: (data: BookFormValues) => void;
  onClose: () => void;
  loading?: boolean;
}

export const BookForm: React.FC<BookFormProps> = ({ 
  initialData, 
  onSubmit, 
  onClose,
  loading 
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),
    defaultValues: initialData || {
      title: '',
      author: '',
      isbn: '',
      status: 'AVAILABLE',
      dueDate: '',
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <EduCard className="w-full max-w-lg p-0 overflow-hidden border-none shadow-2xl animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <div>
            <h3 className="text-xl font-black text-slate-900 tracking-tight">
              {initialData ? 'Edit Catalog Entry' : 'Add New Book'}
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Library Resource Management
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
            <div className="space-y-1 relative">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Title</label>
              <div className="relative">
                 <Book className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input
                   {...register('title')}
                   placeholder="The Great Gatsby"
                   className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                 />
              </div>
              {errors.title && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.title.message}</p>}
            </div>

            <div className="space-y-1 relative">
              <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Author</label>
              <div className="relative">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                 <input
                   {...register('author')}
                   placeholder="F. Scott Fitzgerald"
                   className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                 />
              </div>
              {errors.author && <p className="text-[10px] font-bold text-rose-500 uppercase tracking-tight ml-1">{errors.author.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1 relative">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">ISBN</label>
                <div className="relative">
                   <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                   <input
                     {...register('isbn')}
                     placeholder="978-3-16..."
                     className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 pl-12 pr-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all"
                   />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-black text-slate-500 uppercase tracking-widest pl-1">Status</label>
                <select
                  {...register('status')}
                  className="w-full h-12 rounded-2xl border-2 border-slate-100 bg-slate-50/50 px-4 text-sm font-semibold outline-none focus:border-indigo-500 focus:bg-white transition-all appearance-none"
                >
                  <option value="AVAILABLE">Available</option>
                  <option value="BORROWED">Borrowed</option>
                  <option value="RESERVED">Reserved</option>
                </select>
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
              {loading ? 'Processing...' : initialData ? 'Update Book' : 'Add to Catalog'}
            </EduButton>
          </div>
        </form>
      </EduCard>
    </div>
  );
};