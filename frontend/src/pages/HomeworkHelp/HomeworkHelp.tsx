import React, { useState } from 'react';
import { Send, Image as ImageIcon, Info, AlertCircle } from 'lucide-react';

const HomeworkHelp = () => {
  const [input, setInput] = useState('');

  return (
    <div className="flex h-[calc(100vh-64px)] bg-white overflow-hidden">
      {/* Left Column: Input & Chat */}
      <div className="flex-1 flex flex-col border-r border-slate-100">
        <div className="p-6 bg-indigo-50/50 border-b border-indigo-100/50 flex items-start gap-4">
          <div className="bg-white p-2.5 rounded-2xl text-indigo-600 shadow-sm border border-indigo-100">
            <AlertCircle size={24} />
          </div>
          <div>
            <h2 className="font-bold text-indigo-900 leading-tight">Socratic Tutor Disclaimer</h2>
            <p className="text-sm text-indigo-600 font-medium">I will guide you through the reasoning, but I will never give you the final answer. Ready to learn?</p>
          </div>
        </div>

        <div className="flex-1 p-8 overflow-y-auto space-y-6">
          <div className="bg-slate-50 p-6 rounded-[2rem] max-w-[80%] border border-slate-100">
            <p className="text-slate-600 leading-relaxed font-medium">Hello! Upload a photo of your homework or type your problem below. We'll solve it together, step-by-step.</p>
          </div>
        </div>

        <div className="p-8 border-t border-slate-100 bg-white">
          <div className="max-w-4xl mx-auto flex items-center gap-4 bg-slate-50 p-3 rounded-[2rem] border border-slate-100 shadow-sm focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <button className="p-3 text-slate-400 hover:text-indigo-600 transition-colors">
              <ImageIcon size={24} />
            </button>
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Explain what you're stuck on..."
              className="flex-1 bg-transparent border-none outline-none font-medium text-slate-700 px-2"
            />
            <button className="bg-indigo-600 text-white p-4 rounded-full shadow-lg shadow-indigo-100 hover:scale-105 active:scale-95 transition-all">
              <Send size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Right Column: Tips & Standards */}
      <div className="w-80 p-8 hidden xl:block bg-slate-50/30 overflow-y-auto">
        <h3 className="font-black uppercase tracking-widest text-[10px] text-slate-400 mb-6">How it works</h3>
        <div className="space-y-6">
          <TipCard 
            title="Break it down"
            desc="If the problem feels huge, ask me to help you find the first step."
          />
          <TipCard 
            title="Reasoning over Rules"
            desc="Instead of formulas, let's talk about the 'why' behind the math."
          />
        </div>
      </div>
    </div>
  );
};

const TipCard = ({ title, desc }: any) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
    <h4 className="font-bold text-slate-900 mb-2">{title}</h4>
    <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
  </div>
);

export default HomeworkHelp;
