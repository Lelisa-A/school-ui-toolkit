import React, { useState } from 'react';
import { GraduationCap, Mail, Lock, ArrowRight, ShieldCheck, Globe, Sparkles, BrainCircuit, LayoutDashboard, Command, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';
import { EduButton } from '../components/ui/EduButton';
import { UserRole } from '../types';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { cn } from '../lib/utils';

export const Login: React.FC = () => {
  const { login } = useStore();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole>('ADMIN');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Pre-fill based on selected role for demo purposes
  React.useEffect(() => {
    setEmail(`${selectedRole.toLowerCase()}@school.com`);
    setPassword('password123');
  }, [selectedRole]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate auth logic
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Log in with the selected role
    login(selectedRole);
    
    toast.success(`Welcome back! Logged in as ${selectedRole.toLowerCase()}`, {
      description: `Access granted to ${selectedRole.replace('_', ' ')} dashboard.`,
      icon: <Sparkles className="text-indigo-500" />,
    });
    
    // Redirecting to dashboard - shell and dashboard component handle role-specific rendering
    navigate('/dashboard');
    setIsLoading(false);
  };

  const features = [
    { icon: Command, text: "Multi-role collaboration", color: "text-indigo-400" },
    { icon: BrainCircuit, text: "AI-Powered Insights", color: "text-violet-400" },
    { icon: LayoutDashboard, text: "Unified Hub", color: "text-emerald-400" },
    { icon: ShieldCheck, text: "Security Layer", color: "text-amber-400" }
  ];

  const loginBg = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/456b3bff-d648-4eab-a197-dbfbb40c67a8/ui-background-1-989d453d-1773642244152.webp";

  return (
    <div className="min-h-screen bg-white flex items-stretch overflow-hidden font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <motion.div 
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
        className="w-full lg:w-[650px] xl:w-[800px] p-8 md:p-16 lg:p-28 flex flex-col justify-center relative bg-white z-10 shadow-[80px_0_160px_rgba(0,0,0,0.06)]"
      >
         <div className="mb-24 flex items-center gap-6">
            <motion.div 
               whileHover={{ rotate: 12, scale: 1.1 }}
               className="w-20 h-20 bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.25rem] flex items-center justify-center shadow-2xl shadow-indigo-200 ring-[12px] ring-indigo-50"
            >
              <GraduationCap className="text-white w-10 h-10" />
            </motion.div>
            <div className="flex flex-col">
               <span className="font-black text-5xl tracking-tighter text-slate-900 leading-none italic">EduSmart</span>
               <span className="text-[12px] font-black text-indigo-500 uppercase tracking-[0.5em] mt-3 ml-1">Global Enterprise Hub</span>
            </div>
         </div>

         <div className="space-y-8 mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.8]"
            >
              Academic <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 italic">Evolution.</span>
            </motion.h1>
            <p className="text-slate-500 font-bold text-2xl leading-relaxed max-w-lg opacity-80 tracking-tight">
               Experience the next generation of institutional management with modern intelligence and elegant design.
            </p>
         </div>

         <form onSubmit={handleSignIn} className="space-y-10">
            <div className="space-y-6">
               <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] block ml-2">Authentication Identity</label>
               <div className="space-y-6">
                  <div className="relative group">
                     <Mail className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-all duration-500 group-focus-within:scale-110" size={24} />
                     <input 
                       type="email" 
                       required
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}
                       placeholder="Institutional Email"
                       className="w-full pl-20 pr-10 py-7 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:ring-[15px] focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all duration-500 outline-none font-black text-slate-800 text-lg placeholder:text-slate-300 shadow-sm"
                     />
                  </div>
                  <div className="relative group">
                     <Lock className="absolute left-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-all duration-500 group-focus-within:scale-110" size={24} />
                     <input 
                       type="password" 
                       required
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="Access Credentials"
                       className="w-full pl-20 pr-10 py-7 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:ring-[15px] focus:ring-indigo-500/5 focus:border-indigo-500 focus:bg-white transition-all duration-500 outline-none font-black text-slate-800 text-lg placeholder:text-slate-300 shadow-sm"
                     />
                  </div>
               </div>
            </div>

            <div className="space-y-6">
               <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] block ml-2">Portal Gateway Selection</label>
               <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {(['ADMIN', 'TEACHER', 'STUDENT', 'PRINCIPAL', 'LIBRARIAN', 'PARENT', 'ASSET_MANAGER'] as UserRole[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setSelectedRole(role)}
                      className={cn(
                        "py-5 px-4 rounded-[1.75rem] border-2 transition-all duration-500 text-[11px] font-black uppercase tracking-widest relative overflow-hidden group/btn",
                        selectedRole === role 
                          ? "bg-indigo-600 border-indigo-600 text-white shadow-2xl shadow-indigo-200 scale-105" 
                          : "bg-white border-slate-100 text-slate-400 hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/30"
                      )}
                    >
                      {role.replace('_', ' ')}
                      {selectedRole === role && (
                         <motion.div layoutId="role-check" className="absolute top-2 right-2">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                         </motion.div>
                      )}
                    </button>
                  ))}
               </div>
            </div>

            <div className="pt-10">
               <EduButton 
                 type="submit"
                 className="w-full h-24 text-2xl font-black rounded-[3rem] group overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)] hover:shadow-[0_40px_80px_-15px_rgba(79,70,229,0.4)] transition-all duration-500 hover:-translate-y-1"
                 variant="gradient"
                 loading={isLoading}
               >
                 <span className="relative z-10 flex items-center justify-center tracking-tighter">
                    Initialize Secure Session <ArrowRight size={32} className="ml-6 transition-transform group-hover:translate-x-3" />
                 </span>
               </EduButton>
               <p className="text-center mt-8 text-slate-400 text-sm font-bold">
                  Trouble accessing? <button type="button" className="text-indigo-600 hover:underline transition-all">Contact Support Hub</button>
               </p>
            </div>
         </form>

         <div className="mt-auto pt-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.3em]">\u00a9 2024 EduSmart Global \u2022 v4.2.0-STABLE</p>
            <div className="flex items-center gap-10">
                <div className="flex items-center gap-3 text-slate-400 hover:text-indigo-600 transition-colors cursor-help group">
                   <ShieldCheck size={22} className="group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] font-black tracking-widest uppercase">Military Grade</span>
                </div>
                <div className="flex items-center gap-3 text-slate-400 hover:text-indigo-600 transition-colors cursor-help group">
                   <Globe size={22} className="group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] font-black tracking-widest uppercase">128 Global Nodes</span>
                </div>
            </div>
         </div>
      </motion.div>

      <div className="hidden lg:flex flex-1 relative overflow-hidden bg-slate-950">
         <motion.img 
           initial={{ scale: 1.2, opacity: 0 }}
           animate={{ scale: 1.05, opacity: 1 }}
           transition={{ duration: 2.5, ease: "circOut" }}
           src={loginBg} 
           className="w-full h-full object-cover opacity-40 mix-blend-overlay scale-110"
           alt="Dashboard Background"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent z-10" />
         <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 to-transparent z-10" />
         
         <div className="absolute inset-0 flex flex-col justify-end p-28 z-20">
            <div className="max-w-2xl space-y-16">
               <div className="space-y-8">
                  <motion.div 
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-500/20 border border-indigo-500/30 rounded-full backdrop-blur-xl"
                  >
                     <Sparkles className="text-indigo-400" size={18} />
                     <span className="text-[11px] font-black text-indigo-100 uppercase tracking-widest">AI-Driven Education</span>
                  </motion.div>
                  <h2 className="text-7xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter italic">
                     Architecting the <br/>
                     <span className="text-indigo-400">Next Era.</span>
                  </h2>
                  <p className="text-slate-300 font-bold text-2xl leading-relaxed opacity-70 tracking-tight">
                     Bridging the gap between traditional excellence and digital innovation. Empowering the global academic community with actionable intelligence.
                  </p>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  {features.map((item, i) => (
                    <motion.div 
                       key={i} 
                       initial={{ opacity: 0, y: 20 }}
                       whileInView={{ opacity: 1, y: 0 }}
                       transition={{ delay: i * 0.1 }}
                       className="bg-white/5 backdrop-blur-3xl border border-white/10 p-8 rounded-[3rem] flex items-center gap-6 hover:bg-white/10 transition-all duration-500 cursor-default group"
                    >
                       <div className="p-5 bg-slate-950/80 rounded-2xl shadow-2xl group-hover:scale-110 transition-transform">
                          <item.icon className={cn("w-8 h-8", item.color)} />
                       </div>
                       <span className="text-white font-black text-lg tracking-tight">{item.text}</span>
                    </motion.div>
                  ))}
               </div>

               <div className="flex items-center gap-10 mt-10">
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Satisfied Users</span>
                     <span className="text-3xl font-black text-white">2.4M+</span>
                  </div>
                  <div className="w-[2px] h-10 bg-white/10"></div>
                  <div className="flex flex-col">
                     <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-1">Success Rate</span>
                     <span className="text-3xl font-black text-white">99.9%</span>
                  </div>
                  <div className="ml-auto">
                     <EduButton variant="glass" size="icon" className="w-16 h-16 rounded-2xl">
                        <ChevronRight size={24} />
                     </EduButton>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};