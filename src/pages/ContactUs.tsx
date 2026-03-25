import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, Mail, Phone, MapPin, Globe, Sparkles, Send } from 'lucide-react';
import { EduButton } from '../components/ui/EduButton';

export const ContactUs: React.FC = () => {
  const contactImage = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/456b3bff-d648-4eab-a197-dbfbb40c67a8/contact-support-9cd9ee3a-1773668116335.webp";

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-white/70 backdrop-blur-2xl border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="font-black text-xl tracking-tighter text-slate-900 italic">EduSmart</span>
          </Link>
          <Link to="/">
            <EduButton variant="ghost" className="font-black uppercase tracking-widest text-xs">
              <ArrowLeft size={16} className="mr-2" /> Back Home
            </EduButton>
          </Link>
        </div>
      </nav>

      <section className="pt-48 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 italic">
                Connect With <br/>
                <span className="text-indigo-600">Support.</span>
              </h1>
              <p className="text-xl text-slate-500 font-bold leading-relaxed mb-12 opacity-80">
                Need assistance with the portal? Our global support team is available 24/7 to ensure your institution remains operational and optimized.
              </p>
              
              <div className="space-y-10">
                {[
                  { icon: Mail, label: "Institutional Inquiries", value: "support@edusmart.global" },
                  { icon: Phone, label: "Global Support Line", value: "+1 (800) EDU-SMART" },
                  { icon: MapPin, label: "Innovation Hub", value: "Silicon Valley, CA, USA" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 group">
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.label}</p>
                      <p className="text-xl font-black text-slate-900 tracking-tight">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-slate-50 p-12 rounded-[3rem] border border-slate-100 shadow-xl"
            >
              <form className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                  <input type="text" className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-600/20 font-bold" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                  <input type="email" className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-600/20 font-bold" placeholder="john@institution.edu" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Message</label>
                  <textarea className="w-full bg-white border border-slate-100 rounded-2xl px-6 py-4 outline-none focus:ring-2 focus:ring-indigo-600/20 font-bold h-32" placeholder="How can we help?" />
                </div>
                <EduButton className="w-full h-16 rounded-2xl font-black text-lg">
                  Send Broadcast <Send size={20} className="ml-3" />
                </EduButton>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};