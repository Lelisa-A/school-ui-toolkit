import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GraduationCap, ArrowLeft, BrainCircuit, Globe, Sparkles, Users, Target, Zap } from 'lucide-react';
import { EduButton } from '../components/ui/EduButton';

export const AboutUs: React.FC = () => {
  const aboutImage = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/456b3bff-d648-4eab-a197-dbfbb40c67a8/about-us-tech-519f53a2-1773668121272.webp";

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
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-6xl md:text-7xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 italic">
                Our Mission & <br/>
                <span className="text-indigo-600">Vision.</span>
              </h1>
              <p className="text-xl text-slate-500 font-bold leading-relaxed mb-10 opacity-80">
                We are redefining how institutions manage knowledge. By bridging the gap between traditional excellence and modern intelligence, we empower the academic community to focus on what matters most: learning.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-8">
                {[
                  { icon: Target, title: "Precision", desc: "Data-driven decisions for every user." },
                  { icon: Zap, title: "Velocity", desc: "Accelerate administrative workflows." },
                  { icon: Users, title: "Inclusion", desc: "A unified hub for everyone." },
                  { icon: BrainCircuit, title: "Intelligence", desc: "AI-powered academic insights." }
                ].map((item, i) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-slate-50 border border-slate-100">
                    <item.icon className="text-indigo-600 mb-4" size={24} />
                    <h4 className="font-black text-slate-900 mb-2 italic">{item.title}</h4>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <img 
                src={aboutImage} 
                alt="Our Technology" 
                className="w-full aspect-square object-cover rounded-[3rem] shadow-2xl"
              />
              <div className="absolute inset-0 bg-indigo-600/10 rounded-[3rem] mix-blend-overlay" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};