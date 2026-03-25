import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, ArrowRight, ShieldCheck, Globe, Sparkles, BrainCircuit, Users, BookOpen, Clock, LayoutDashboard, UserCircle, LogOut } from 'lucide-react';
import { useStore } from '../store/useStore';
import { EduButton } from '../components/ui/EduButton';
import { cn } from '../lib/utils';
import { toast } from 'sonner';

export const LandingPage: React.FC = () => {
  const { isAuthenticated, user, logout } = useStore();
  const navigate = useNavigate();

  const campusHero = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/456b3bff-d648-4eab-a197-dbfbb40c67a8/campus-hero-0481b3b7-1773668115599.webp";

  const teacherAvatar = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/456b3bff-d648-4eab-a197-dbfbb40c67a8/teacher-avatar-1-6a727171-1773641878681.webp";
  const studentAvatar = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/456b3bff-d648-4eab-a197-dbfbb40c67a8/student-avatar-1-6b60fd30-1773641873198.webp";
  
  const displayAvatar = user?.role === 'STUDENT' ? studentAvatar : (user?.role === 'TEACHER' || user?.role === 'ADMIN' ? teacherAvatar : user?.avatar || `https://i.pravatar.cc/150?u=${user?.name}`);

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out.", {
      description: "Redirecting to public view...",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900 overflow-x-hidden">
      {/* Public Navbar - Minimalist and Clean */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-2xl border-b border-slate-100 h-24">
        <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-indigo-600 rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-transform">
              <GraduationCap className="text-white w-7 h-7" />
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tighter text-slate-900 leading-none italic">EduSmart</span>
              <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mt-2">Global Hub</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-12">
            <Link to="/" className="text-[11px] font-black text-slate-900 hover:text-indigo-600 uppercase tracking-widest transition-colors">Home</Link>
            <Link to="/about" className="text-[11px] font-black text-slate-500 hover:text-indigo-600 uppercase tracking-widest transition-colors">About Us</Link>
            <Link to="/contact" className="text-[11px] font-black text-slate-500 hover:text-indigo-600 uppercase tracking-widest transition-colors">Contact Us</Link>
            
            {isAuthenticated ? (
               <div className="flex items-center gap-6 pl-6 border-l border-slate-100">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-black text-slate-900 italic tracking-tight">{user?.name}</span>
                    <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest">{user?.role.replace('_', ' ')}</span>
                  </div>
                  <div className="relative group/avatar">
                    <img 
                      src={displayAvatar} 
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-indigo-50 shadow-sm transition-all group-hover:scale-110 cursor-pointer"
                      alt="User"
                    />
                    <div className="absolute top-full right-0 mt-4 opacity-0 group-hover/avatar:opacity-100 transition-all pointer-events-none group-hover/avatar:pointer-events-auto">
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 min-w-[180px]">
                           <button onClick={() => navigate('/dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-slate-600 hover:bg-slate-50 hover:text-indigo-600 rounded-xl transition-all">
                              <LayoutDashboard size={14} /> My Portal
                           </button>
                           <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                              <LogOut size={14} /> Log Out
                           </button>
                        </div>
                    </div>
                  </div>
               </div>
            ) : (
              <Link to="/login">
                <EduButton variant="primary" className="rounded-[1.5rem] px-10 h-12 text-[11px] font-black uppercase tracking-widest shadow-xl shadow-indigo-100">
                  Login <ShieldCheck size={18} className="ml-3" />
                </EduButton>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-56 pb-32 px-6 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-500/5 blur-[180px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-indigo-50 border border-indigo-100 rounded-full mb-10">
                <Sparkles className="text-indigo-600" size={16} />
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em]">Institutional Hub Evolution</span>
              </div>
              <h1 className="text-7xl md:text-9xl font-black text-slate-900 tracking-tighter leading-[0.8] mb-12 italic">
                Academic <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 italic">Excellence.</span>
              </h1>
              <p className="text-2xl text-slate-500 font-bold leading-relaxed max-w-lg mb-16 opacity-80 tracking-tight">
                Welcome to the global gateway. Experience intelligence-driven institutional management at your fingertips.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center gap-8">
                {isAuthenticated ? (
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="w-full sm:w-auto"
                  >
                    <Link to="/dashboard" className="w-full block">
                      <EduButton size="lg" className="w-full h-24 px-14 text-2xl font-black rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)] hover:shadow-[0_40px_80px_-15px_rgba(79,70,229,0.4)]">
                        Enter My Portal <ArrowRight size={28} className="ml-6 transition-transform group-hover:translate-x-3" />
                      </EduButton>
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="w-full sm:w-auto"
                  >
                    <Link to="/login" className="w-full block">
                      <EduButton size="lg" className="w-full h-24 px-14 text-2xl font-black rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)]">
                        Initialize Session <ArrowRight size={28} className="ml-6" />
                      </EduButton>
                    </Link>
                  </motion.div>
                )}
                <Link to="/about" className="w-full sm:w-auto">
                  <EduButton variant="ghost" size="lg" className="w-full h-24 px-14 text-2xl font-black rounded-[3rem] text-slate-400 hover:text-indigo-600 hover:bg-slate-50 transition-all">
                    Explore Ecosystem
                  </EduButton>
                </Link>
              </div>

              {isAuthenticated && (
                <motion.div 
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ delay: 0.5 }}
                   className="mt-16 flex items-center gap-6 p-8 bg-slate-50 border border-slate-100 rounded-[3rem] max-w-md shadow-sm"
                >
                   <div className="w-16 h-16 rounded-2xl bg-indigo-600/10 flex items-center justify-center text-indigo-600 shrink-0">
                      <UserCircle size={32} />
                   </div>
                   <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Authenticated Session</p>
                      <p className="text-xl font-black text-slate-900 tracking-tight leading-tight italic">Logged in as {user?.role.toLowerCase()}. Ready to sync.</p>
                   </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
              className="relative"
            >
              <div className="absolute -inset-10 bg-gradient-to-tr from-indigo-600/20 to-violet-600/20 blur-3xl rounded-full animate-pulse pointer-events-none" />
              <div className="relative z-10 p-4 bg-white rounded-[5rem] shadow-[0_80px_160px_rgba(0,0,0,0.08)] border border-slate-100 overflow-hidden group">
                 <img 
                    src={campusHero} 
                    alt="Modern Campus" 
                    className="w-full aspect-[4/5] object-cover rounded-[4rem] transition-transform duration-1000 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                 
                 <div className="absolute bottom-16 left-16 right-16 z-20 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                    <div className="bg-white/10 backdrop-blur-3xl border border-white/20 p-10 rounded-[3rem] text-white">
                       <h3 className="text-3xl font-black tracking-tighter italic mb-4">The Future is Here.</h3>
                       <p className="text-white/70 font-bold leading-relaxed tracking-tight">Accessing real-time institutional analytics with integrated AI capabilities.</p>
                    </div>
                 </div>
              </div>
              
              <div className="absolute -bottom-12 -left-12 z-20 bg-white p-10 rounded-[3.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.1)] border border-slate-100 max-w-[320px] transition-transform hover:scale-105 duration-500">
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-16 h-16 bg-indigo-600 rounded-[1.75rem] flex items-center justify-center text-white shadow-xl shadow-indigo-100 transition-transform group-hover:rotate-12">
                    <Users size={32} />
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Active Nodes</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">2.4M+</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-white overflow-hidden -ml-4 first:ml-0 bg-slate-100">
                         <img src={`https://i.pravatar.cc/150?u=${i}`} alt="" />
                      </div>
                   ))}
                   <div className="w-10 h-10 rounded-full border-4 border-white bg-indigo-50 flex items-center justify-center text-[10px] font-black text-indigo-600 -ml-4">
                      +12k
                   </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-50 py-48 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            {[
              { label: "Active Students", value: "850k+", icon: Users },
              { label: "Partner Institutions", value: "4,200+", icon: GraduationCap },
              { label: "Library Resources", value: "12M+", icon: BookOpen },
              { label: "System Uptime", value: "99.9%", icon: Clock }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center space-y-8"
              >
                <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-indigo-600 shadow-xl shadow-slate-200 border border-slate-50 transition-transform hover:rotate-12 cursor-default">
                  <stat.icon size={36} />
                </div>
                <div className="space-y-2">
                   <h3 className="text-5xl font-black text-slate-900 tracking-tighter italic">{stat.value}</h3>
                   <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em] opacity-70">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="flex flex-col md:flex-row items-center justify-between gap-16 pb-16 border-b border-slate-100">
              <div className="flex items-center gap-6 group">
                <div className="w-16 h-16 bg-slate-950 rounded-[1.75rem] flex items-center justify-center transition-transform group-hover:rotate-12">
                  <GraduationCap className="text-white w-9 h-9" />
                </div>
                <div className="flex flex-col">
                  <span className="font-black text-3xl tracking-tighter text-slate-900 italic">EduSmart</span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mt-2 ml-1">The Global Standard</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-12">
                 <Link to="/" className="text-[11px] font-black text-slate-900 uppercase tracking-widest hover:text-indigo-600 transition-colors">Home</Link>
                 <Link to="/about" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">About Ecosystem</Link>
                 <Link to="/contact" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">Support Center</Link>
                 <Link to="/login" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">Security Audit</Link>
              </div>
           </div>
           
           <div className="pt-16 flex flex-col md:flex-row items-center justify-between gap-10">
              <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.4em]">\\\\\\\\u00a9 2024 EduSmart Global \\\\\\\\u2022 v4.2.0-STABLE \\\\\\\\u2022 All Nodes Encrypted</p>
              <div className="flex items-center gap-12">
                <div className="flex items-center gap-4 text-slate-300 hover:text-indigo-600 transition-colors cursor-help group">
                   <ShieldCheck size={22} className="group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] font-black tracking-widest uppercase">E2E Protection</span>
                </div>
                <div className="flex items-center gap-4 text-slate-300 hover:text-indigo-600 transition-colors cursor-help group">
                   <Globe size={22} className="group-hover:scale-110 transition-transform" />
                   <span className="text-[10px] font-black tracking-widest uppercase">128 Sync Nodes</span>
                </div>
              </div>
           </div>
        </div>
      </footer>
    </div>
  );
};