import React from 'react';
import { 
  GraduationCap, 
  ArrowRight, 
  Heart, 
  Globe, 
  BookOpen, 
  Users, 
  Sparkles,
  ShieldCheck,
  CheckCircle,
  PlayCircle,
  Star,
  Lock,
  MessageSquareQuote,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Top Banner: Mission-first */}
      <div className="bg-primary-blue text-white py-2.5 px-4 text-center text-sm font-bold tracking-wide">
        AI IS THE FUTURE. WE HELP STUDENTS USE IT RESPONSIBLY.
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="text-primary-blue bg-blue-50 p-2 rounded-xl group-hover:scale-110 transition-transform">
              <GraduationCap size={32} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">EduAgent</span>
          </div>
          
          <div className="hidden md:flex items-center gap-10 text-sm font-bold text-slate-500">
            <a href="#mission" className="hover:text-primary-blue transition-colors relative group">
              Our Philosophy
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
            </a>
            <a href="#guardrails" className="hover:text-primary-blue transition-colors relative group">
              AI Guardrails
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
            </a>
            <a href="#teachers" className="hover:text-primary-blue transition-colors relative group">
              For Schools
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-blue transition-all group-hover:w-full"></span>
            </a>
          </div>

          <div className="flex items-center gap-4">
            <Link 
              to="/dashboard" 
              className="bg-primary-blue text-white px-6 py-3 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
            >
              Start Learning
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section: Responsible AI Focus */}
      <header className="px-6 pt-16 pb-28 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 relative">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-100 rounded-full blur-3xl opacity-60 -z-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-60 -z-10"></div>

        <motion.div 
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-primary-blue text-xs font-black mb-8 border border-blue-100 uppercase tracking-widest">
            <ShieldCheck size={14} className="fill-blue-50" /> Guided AI for Education
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.05] text-slate-900">
            AI is a tool. <br />
            <span className="text-primary-blue italic font-serif relative">
              Mastery is the goal.
              <svg className="absolute -bottom-4 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="#fbbf24" strokeWidth="4" />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-xl mb-12 leading-relaxed font-medium">
            AI isn't going away, but it shouldn't be a shortcut. EduAgent provides the **guardrails** students need to use AI responsibly—turning it into a personal tutor that teaches, not just answers.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
            <Link 
              to="/dashboard" 
              className="w-full sm:w-auto bg-primary-blue text-white px-10 py-5 rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 active:scale-95"
            >
              Start Guided Learning <ArrowRight size={24} />
            </Link>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex-1 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border-[12px] border-white ring-1 ring-slate-100">
            <img 
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800" 
              alt="Student using technology safely" 
              className="w-full h-auto object-cover aspect-[4/3]"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/10 to-transparent"></div>
          </div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -right-6 bg-white p-6 rounded-[2.5rem] shadow-2xl z-20 max-w-[240px] border border-slate-100"
          >
            <div className="flex items-center gap-2 text-emerald-600 font-black mb-2">
              <Lock size={18} />
              <span>Safe Exploration</span>
            </div>
            <p className="text-xs text-slate-500 font-bold leading-tight uppercase tracking-wider">AI interactions are moderated and pedagogical.</p>
          </motion.div>
        </motion.div>
      </header>

      {/* Philosophy Section */}
      <section id="mission" className="bg-slate-50 py-32 border-y border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-slate-900 leading-tight">Mastering AI is a <br />critical skill.</h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed font-medium">
                We believe that banning AI in education is a missed opportunity. Instead, we teach students how to **prompt critically**, **evaluate outputs**, and **use AI to deepen their understanding** of core subjects.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-3xl border border-slate-100">
                  <h4 className="font-black text-primary-blue mb-2">Not an Answer Machine</h4>
                  <p className="text-sm text-slate-500 font-medium">Our AI is hard-wired to guide, not to give away final answers.</p>
                </div>
                <div className="bg-white p-6 rounded-3xl border border-slate-100">
                  <h4 className="font-black text-secondary-emerald mb-2">Pedagogically Aligned</h4>
                  <p className="text-sm text-slate-500 font-medium">Every interaction is tied to Common Core standards and Khan Academy content.</p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="bg-blue-600 h-64 rounded-[3rem] p-8 text-white flex flex-col justify-end shadow-xl shadow-blue-100">
                  <MessageSquareQuote size={32} className="mb-4 opacity-50" />
                  <p className="font-black text-lg italic">"Teach me how, don't just tell me."</p>
                </div>
                <div className="bg-accent-amber h-48 rounded-[3rem] p-8 text-white flex items-center justify-center">
                   <Zap size={64} strokeWidth={3} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="bg-emerald-500 h-48 rounded-[3rem] flex items-center justify-center text-white">
                  <Users size={64} strokeWidth={3} />
                </div>
                <div className="bg-indigo-600 h-64 rounded-[3rem] p-8 text-white flex flex-col justify-end shadow-xl shadow-indigo-100">
                  <p className="font-black text-lg">Built for responsibility.</p>
                  <p className="text-xs text-indigo-100 font-bold uppercase tracking-widest mt-2">Guardrail v2.0</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guardrails Detailed Section */}
      <section id="guardrails" className="py-32 max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black mb-6">Our Responsible AI Guardrails</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-xl font-medium">How we ensure AI remains a positive force in the learning process.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-blue-50 text-primary-blue rounded-2xl flex items-center justify-center mb-8">
              <Lock size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4">Strict Moderation</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Every message is filtered through safety layers to prevent off-topic discussions, harmful content, or academic dishonesty.
            </p>
          </div>
          <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-8">
              <Sparkles size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4">The Socratic Filter</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Our AI is programmed to ask guiding questions. If a student asks for the answer, the AI redirects them to the underlying concept.
            </p>
          </div>
          <div className="p-10 bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all">
            <div className="w-16 h-16 bg-amber-50 text-accent-amber rounded-2xl flex items-center justify-center mb-8">
              <Users size={32} />
            </div>
            <h3 className="text-2xl font-black mb-4">Teacher Oversight</h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Educators have full visibility into how their students are interacting with the AI, identifying where students are truly struggling.
            </p>
          </div>
        </div>
      </section>

      {/* Socratic Demo Integration */}
      <section className="py-32 bg-slate-900 text-white rounded-[4rem] mx-6 mb-32 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-0"></div>
        <div className="max-w-7xl mx-auto px-10 relative z-10 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">Watch the guardrails in action.</h2>
            <p className="text-xl text-slate-400 mb-10 leading-relaxed">
              EduAgent doesn't just do the homework. It identifies the gap in understanding and builds a bridge to the solution.
            </p>
            <div className="inline-flex items-center gap-4 bg-white/10 p-6 rounded-3xl border border-white/10 text-left">
               <div className="p-3 bg-emerald-500 rounded-2xl text-white">
                 <CheckCircle size={28} />
               </div>
               <div>
                 <p className="font-black">Pedagogically Sound</p>
                 <p className="text-sm text-slate-400">Aligned with global curriculum standards.</p>
               </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg">
             <div className="bg-white p-8 rounded-[2.5rem] shadow-2xl text-slate-900">
                <div className="flex items-center justify-between mb-8 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary-blue rounded-xl flex items-center justify-center text-white font-black">EA</div>
                    <span className="font-black text-sm uppercase tracking-widest">EduAgent Guide</span>
                  </div>
                  <div className="px-3 py-1 bg-blue-50 text-primary-blue rounded-full text-[10px] font-black uppercase tracking-widest">Active Guardrails</div>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-50 p-6 rounded-3xl rounded-tl-none">
                    <p className="text-slate-600 font-medium italic">Student: "What is the answer to question 4? Is it 42?"</p>
                  </div>
                  <div className="p-6 bg-blue-50 text-primary-blue rounded-3xl rounded-tr-none border border-blue-100">
                    <p className="font-bold">
                      "I can't give you the answer directly, but I can help you find it! Question 4 is about volume. What's the formula we use for a rectangular prism?"
                    </p>
                  </div>
                  <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100 flex items-start gap-4">
                    <Sparkles className="text-emerald-500 shrink-0" size={20} />
                    <p className="text-emerald-800 font-black text-sm italic">
                      Notice: AI identified the "ask for answer" pattern and applied the Socratic redirect.
                    </p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Mission Footer */}
      <footer className="bg-white border-t border-slate-100 py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="text-primary-blue bg-blue-50 p-2 rounded-xl">
                <GraduationCap size={28} strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-black tracking-tight">EduAgent</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed font-medium text-lg">
              Empowering students to navigate the AI-driven future with responsibility, critical thinking, and mastery.
            </p>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase text-xs tracking-[0.2em] text-slate-400">Resources</h4>
            <ul className="space-y-4 font-bold text-slate-600">
              <li><a href="#" className="hover:text-primary-blue">Responsible AI Guide</a></li>
              <li><a href="#" className="hover:text-primary-blue">Pedagogy Whitepaper</a></li>
              <li><a href="#" className="hover:text-primary-blue">Safety & Security</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black mb-8 uppercase text-xs tracking-[0.2em] text-slate-400">Get Involved</h4>
            <ul className="space-y-4 font-bold text-slate-600">
              <li><a href="#" className="hover:text-primary-blue">For Schools</a></li>
              <li><a href="#" className="hover:text-primary-blue">For Parents</a></li>
              <li><a href="#" className="hover:text-primary-blue">Volunteer</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-sm font-bold text-slate-400">
          <p>© 2026 EduAgent. Mastery through responsible AI.</p>
          <div className="flex gap-10">
            <a href="#">Privacy Policy</a>
            <a href="#">Responsible Use Policy</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
