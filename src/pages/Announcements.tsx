import React, { useState } from 'react';
import { Plus, Bell, Megaphone, Trash2, Calendar, Target, User, Edit3 } from 'lucide-react';
import * as z from 'zod';
import { useSupabaseCRUD } from '../hooks/useSupabaseCRUD';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { EduCard } from '../components/ui/EduCard';
import { EduButton } from '../components/ui/EduButton';
import { EduBadge } from '../components/ui/EduBadge';
import { FormDialog } from '../components/modules/FormDialog';
import { PermissionGate } from '../components/auth/PermissionGate';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

const announcementSchema = z.object({
  title: z.string().min(5, "Broadcast header must be at least 5 characters."),
  content: z.string().min(10, "Message body required."),
  target: z.string().default('ALL'),
  date: z.string().optional(),
  author: z.string().min(1, "Author identity required.")
});

type AnnouncementFormValues = z.infer<typeof announcementSchema>;

export const Announcements: React.FC = () => {
  const { data: announcements, loading, fetchData, create, update, remove } = useSupabaseCRUD<any>({ 
    table: 'announcements',
    enableRealtime: true
  });
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'ALL' | 'STUDENT' | 'TEACHER'>('ALL');

  const handleOpenForm = (announcement?: any) => {
    if (announcement) {
      setEditingAnnouncement(announcement);
    } else {
      setEditingAnnouncement(null);
    }
    setIsDialogOpen(true);
  };

  const handleCreate = async (values: AnnouncementFormValues) => {
    const payload = {
      ...values,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    await create(payload);
    setIsDialogOpen(false);
  };

  const handleUpdate = async (values: AnnouncementFormValues) => {
    if (editingAnnouncement) {
      await update(editingAnnouncement.id, values);
      setEditingAnnouncement(null);
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (ann: any) => {
    if (window.confirm(`Permanently decommission announcement: "${ann.title}"?`)) {
      await remove(ann.id);
    }
  };

  const filteredData = announcements.filter(a => 
    activeTab === 'ALL' || (a.target === activeTab) || a.target === 'ALL'
  );

  if (loading && announcements.length === 0) return <LoadingSpinner label="Broadcasting Communication Hub..." className="min-h-[400px]" />;

  return (
    <div className="space-y-12 animate-in slide-in-from-bottom-8 duration-1000 p-8">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter italic">Communication Hub</h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px]">Institutional Broadcast Management</p>
        </div>
        <div className="flex gap-4">
          <PermissionGate permission="announcements:manage">
            <EduButton 
              variant="primary" 
              className="rounded-2xl shadow-xl shadow-indigo-100 font-black h-14 px-8"
              onClick={() => handleOpenForm()}
            >
              <Plus className="w-5 h-5 mr-2" />
              <span>NEW BROADCAST</span>
            </EduButton>
          </PermissionGate>
        </div>
      </div>

      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-[2rem] w-fit">
        {(['ALL', 'STUDENT', 'TEACHER'] as const).map(tab => (
           <button
             key={tab}
             onClick={() => setActiveTab(tab)}
             className={cn(
               "px-8 h-12 rounded-full font-black text-[10px] uppercase tracking-[0.2em] transition-all",
               activeTab === tab 
               ? 'bg-white text-indigo-600 shadow-sm scale-105' 
               : 'text-slate-500 hover:text-slate-700'
             )}
           >
             {tab === 'ALL' ? 'Global' : tab}
           </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredData.length > 0 ? filteredData.map((ann, i) => (
            <motion.div
              key={ann.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <EduCard className="p-10 border-none shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl hover:shadow-indigo-500/5 transition-all group overflow-hidden relative bg-white">
                <div className="flex flex-col md:flex-row gap-10 items-start">
                  <div className="w-20 h-20 rounded-[2.5rem] bg-indigo-50 flex items-center justify-center text-indigo-600 border-4 border-white shadow-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-500">
                     <Megaphone size={32} />
                  </div>
                  <div className="flex-1 space-y-6">
                     <div className="flex flex-wrap items-center gap-4">
                        <EduBadge variant="indigo" className="font-black text-[9px] tracking-widest uppercase px-4 h-7 rounded-xl">
                           {ann.target}
                        </EduBadge>
                        <div className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                           <Calendar size={14} />
                           <span>{ann.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-400 font-black uppercase text-[10px] tracking-widest">
                           <User size={14} />
                           <span>{ann.author}</span>
                        </div>
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none italic group-hover:text-indigo-600 transition-colors">
                           {ann.title}
                        </h3>
                        <p className="text-slate-600 font-medium leading-relaxed text-lg italic opacity-90">
                           {ann.content}
                        </p>
                     </div>
                  </div>
                  
                  <div className="flex gap-2 shrink-0">
                    <PermissionGate permission="announcements:manage">
                      <EduButton 
                        variant="ghost" 
                        size="icon" 
                        className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50"
                        onClick={() => handleOpenForm(ann)}
                      >
                        <Edit3 size={18} />
                      </EduButton>
                      <EduButton 
                        variant="ghost" 
                        size="icon" 
                        className="h-12 w-12 rounded-2xl bg-slate-50 text-slate-300 hover:text-rose-600 hover:bg-rose-50"
                        onClick={() => handleDelete(ann)}
                      >
                        <Trash2 size={18} />
                      </EduButton>
                    </PermissionGate>
                  </div>
                </div>
              </EduCard>
            </motion.div>
          )) : (
            <div className="text-center py-32 bg-slate-50 rounded-[4rem] border-4 border-dashed border-slate-100">
              <Bell size={64} className="mx-auto text-slate-200 mb-6" />
              <h3 className="text-2xl font-black text-slate-300 tracking-tighter uppercase italic">No Active Broadcasts</h3>
              <p className="text-sm font-bold text-slate-400 mt-2">Communication node is currently in idle standby mode.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <FormDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title={editingAnnouncement ? "MODIFY BROADCAST" : "CREATE NEW BROADCAST"}
        description={editingAnnouncement ? `Update properties for the selected announcement node.` : "Initialize a new institutional message for the network."}
        schema={announcementSchema}
        initialData={editingAnnouncement}
        onSubmit={editingAnnouncement ? handleUpdate : handleCreate}
        submitLabel={editingAnnouncement ? "SYNCHRONIZE RECORD" : "DEPLOY MESSAGE"}
        fields={[
          { name: 'title', label: 'Broadcast Header', placeholder: 'e.g. Annual Academic Symposium 2024' },
          { name: 'content', label: 'Message Payload', placeholder: 'Enter the message content...' },
          { name: 'author', label: 'Identity Marker (Author)', placeholder: 'e.g. Office of the Principal' },
          { name: 'target', label: 'Network Recipients', type: 'select', options: [
            { label: 'Global (All)', value: 'ALL' },
            { label: 'Faculty Only', value: 'TEACHER' },
            { label: 'Students Only', value: 'STUDENT' },
          ]}
        ]}
      />
    </div>
  );
};