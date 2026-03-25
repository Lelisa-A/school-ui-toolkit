import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { 
  Send, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Users, 
  Bell,
  Target,
  Globe,
  AlertCircle
} from 'lucide-react';
import { EduCard, EduCardHeader, EduCardTitle, EduCardContent, EduCardDescription } from '../ui/EduCard';
import { EduButton } from '../ui/EduButton';
import { EduBadge } from '../ui/EduBadge';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { usePermissions } from '../../hooks/usePermissions';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

const announcementSchema = z.object({
  title: z.string().min(5, "Global Header must be at least 5 characters."),
  content: z.string().min(20, "Message Payload must be substantial (min 20 chars)."),
  category: z.enum(['Event', 'Policy', 'Academic', 'Urgent']).default('Academic'),
  target: z.string().default('ALL'),
  pinned: z.boolean().default(false)
});

export const AnnouncementCreator: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const { hasPermission } = usePermissions();
  const canManage = hasPermission('announcements:manage');
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<any>({
    resolver: zodResolver(announcementSchema),
    defaultValues: {
      title: '',
      content: '',
      category: 'Academic',
      target: 'ALL',
      pinned: false
    }
  });

  const handleDeploy = async (values: any) => {
    setIsSubmitting(true);
    try {
      console.log(values);
      form.reset();
      onSuccess?.();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!canManage) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in duration-1000">
        <div className="w-32 h-32 bg-slate-50 rounded-[3rem] flex items-center justify-center text-slate-200 border border-slate-100 shadow-inner">
           <AlertCircle size={64} />
        </div>
        <div className="text-center space-y-3">
           <h2 className="text-4xl font-black text-slate-900 italic tracking-tighter">Access Restricted</h2>
           <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-[10px]">Insufficient Privileges for Communication Node Management</p>
        </div>
        <p className="max-w-md text-center text-slate-400 font-medium italic">
          Your security clearance level does not permit the creation of institutional broadcasts. Please contact the network administrator.
        </p>
        <EduButton variant="secondary" onClick={() => window.history.back()} className="rounded-2xl h-14 px-10 font-black italic">RETURN TO HUB</EduButton>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-32 animate-in slide-in-from-bottom-12 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-8 space-y-12">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
               <EduBadge variant="indigo" className="px-6 py-2 rounded-2xl text-[11px] tracking-[0.3em] font-black uppercase shadow-xl shadow-indigo-100/50">BROADCAST HUB</EduBadge>
               <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_#10b981]" />
                  <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] opacity-80">Network Synchronization Active</span>
               </div>
            </div>
            <div className="space-y-4">
               <h1 className="text-7xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.85] italic">Broadcast <br/> <span className="text-indigo-600">Intelligence.</span></h1>
               <p className="text-slate-500 font-bold text-2xl opacity-70 tracking-tight leading-relaxed max-w-3xl">
                 Orchestrate high-impact messaging across the entire institutional grid with precision targeting.
               </p>
            </div>
          </div>

          <EduCard variant="white" className="border-none shadow-[0_60px_120px_-30px_rgba(0,0,0,0.06)] p-12 md:p-20 relative overflow-hidden group" hoverGlow animate>
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/30 rounded-full blur-[120px] pointer-events-none -mr-40 -mt-40 group-hover:scale-110 transition-transform duration-[3s]" />
             
             <Form {...form}>
               <form onSubmit={form.handleSubmit(handleDeploy)} className="space-y-12 relative z-10">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem className="space-y-6">
                         <FormLabel className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] block ml-2">Global Header</FormLabel>
                         <FormControl>
                            <input 
                              {...field}
                              placeholder="Enter broadcast node title..." 
                              className="w-full text-5xl font-black text-slate-900 placeholder:text-slate-200 border-none outline-none bg-transparent focus:ring-0 italic"
                            />
                         </FormControl>
                         <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="space-y-6">
                         <FormLabel className="text-[12px] font-black text-slate-400 uppercase tracking-[0.4em] block ml-2">Message Payload</FormLabel>
                         <FormControl>
                            <textarea 
                              {...field}
                              rows={8}
                              placeholder="Craft your institutional payload..." 
                              className="w-full text-2xl font-bold text-slate-600 placeholder:text-slate-200 border-none outline-none bg-transparent focus:ring-0 resize-none leading-relaxed italic"
                            />
                         </FormControl>
                         <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-10 pt-12 border-t border-slate-50">
                     <div className="flex items-center gap-5">
                        <EduButton type="button" variant="secondary" size="icon" className="h-20 w-20 rounded-[1.75rem] bg-slate-50">
                           <ImageIcon size={32} className="text-slate-400" />
                        </EduButton>
                        <EduButton type="button" variant="secondary" size="icon" className="h-20 w-20 rounded-[1.75rem] bg-slate-50">
                           <LinkIcon size={32} className="text-slate-400" />
                        </EduButton>
                     </div>
                     
                     <div className="flex items-center gap-6">
                        <EduButton type="submit" disabled={isSubmitting} variant="gradient" size="lg" className="h-20 px-16 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)] group">
                           {isSubmitting ? <LoadingSpinner size={20} label="" className="p-0" /> : (
                             <span className="flex items-center gap-4 italic font-black">
                               Deploy Hub Message
                             </span>
                           )}
                        </EduButton>
                     </div>
                  </div>
               </form>
             </Form>
          </EduCard>
        </div>

        <div className="lg:col-span-4 space-y-12">
           <EduCard variant="slate" className="relative group p-12 overflow-hidden" hoverGlow animate>
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px] group-hover:scale-150 transition-transform duration-1000" />
              <div className="absolute top-10 right-10 text-white/5 rotate-12 group-hover:rotate-45 transition-transform duration-[3s]">
                 <Target size={180} />
              </div>
              <EduCardHeader className="p-0 mb-12 relative z-10">
                 <div className="w-18 h-18 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] flex items-center justify-center text-indigo-400 mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-transform">
                    <Users size={36} />
                 </div>
                 <EduCardTitle className="text-white text-4xl italic">Target Personas</EduCardTitle>
                 <EduCardDescription className="text-slate-400 font-black uppercase tracking-[0.3em] mt-3">Select Network Recipients</EduCardDescription>
              </EduCardHeader>
              <EduCardContent className="p-0 space-y-5 relative z-10">
                 {[
                   { label: 'All Students', count: '1,248', icon: Users, color: 'text-indigo-400', active: true },
                   { label: 'Faculty Staff', count: '86', icon: Bell, color: 'text-amber-400' },
                   { label: 'Parents Hub', count: '2,100+', icon: Bell, color: 'text-rose-400' },
                   { label: 'External Nodes', count: '12', icon: Globe, color: 'text-emerald-400' },
                 ].map((item, i) => (
                   <motion.div 
                     key={i} 
                     whileHover={{ x: 10 }}
                     className={cn(
                       "flex items-center justify-between p-6 rounded-[2.25rem] border-2 transition-all duration-700 cursor-pointer group/item",
                       item.active ? "bg-white/10 border-indigo-500/50 shadow-2xl" : "bg-transparent border-slate-800 hover:border-slate-700"
                     )}
                   >
                      <div className="flex items-center gap-6">
                         <div className={cn("w-12 h-12 rounded-[1.25rem] bg-slate-900 flex items-center justify-center border border-white/5 shadow-2xl", item.color)}>
                            <item.icon size={22} />
                         </div>
                         <div className="space-y-1">
                            <p className="text-lg font-black text-white italic leading-none">{item.label}</p>
                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{item.count} Active Entities</p>
                         </div>
                      </div>
                   </motion.div>
                 ))}
              </EduCardContent>
           </EduCard>
        </div>
      </div>
    </div>
  );
};