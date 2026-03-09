import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Send, Award, Sparkles, X, Loader2, ChevronLeft, ChevronDown, ChevronRight, MessageSquareText } from 'lucide-react';

const TextbookView = () => {
  const { bookSlug } = useParams<{ bookSlug: string }>();
  const [toc, setToc] = useState<any[]>([]);
  const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set([0]));
  const [activeModuleId, setActiveModuleId] = useState<string>('');
  const [content, setContent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(true);

  // 0. Robust MathJax Loader
  useEffect(() => {
    if (!(window as any).MathJax) {
      (window as any).MathJax = {
        tex: { inlineMath: [['$', '$'], ['\\(', '\\)']], displayMath: [['$$', '$$'], ['\\[', '\\]']] },
        options: { enableMenu: false }
      };
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/3.2.2/es5/tex-mml-chtml.js';
      script.async = true;
      document.head.appendChild(script);
    }
  }, []);

  // 1. Fetch TOC based on URL slug
  useEffect(() => {
    if (!bookSlug) return;
    const fetchTOC = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/textbook/toc/${bookSlug}`);
        const data = await res.json();
        setToc(data);
        
        if (data.length > 0) {
          const saved = localStorage.getItem('eduagent_last_lesson');
          const lastData = saved ? JSON.parse(saved) : null;
          
          if (lastData && lastData.bookSlug === bookSlug) {
            setActiveModuleId(lastData.moduleId);
            const chapterIdx = data.findIndex((item: any) => 
              item.type === 'chapter' && item.modules.some((m: any) => m.id === lastData.moduleId)
            );
            if (chapterIdx !== -1) {
              setExpandedChapters(new Set([chapterIdx]));
            }
          } else {
            const first = data[0];
            if (first.type === 'module') setActiveModuleId(first.id);
            else if (first.type === 'chapter' && first.modules?.[0]) setActiveModuleId(first.modules[0].id);
          }
        }
      } catch (err) {
        console.error('Failed to load TOC', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTOC();
  }, [bookSlug]);

  // 2. Fetch Content when module changes
  useEffect(() => {
    if (!activeModuleId) return;
    if (bookSlug) {
      localStorage.setItem('eduagent_last_lesson', JSON.stringify({
        bookSlug,
        moduleId: activeModuleId
      }));
    }

    const fetchModule = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:4000/api/textbook/module/${activeModuleId}`);
        const data = await res.json();
        setContent(data);
      } catch (err) {
        console.error('Failed to load module content', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchModule();
  }, [activeModuleId, bookSlug]);

  // 3. Trigger MathJax Typesetting - Also triggered by isChatOpen to prevent layout shift breakages
  useEffect(() => {
    if (content && (window as any).MathJax?.typesetPromise) {
      const timer = setTimeout(() => {
        (window as any).MathJax.typesetPromise().catch((e: any) => console.warn('MathJax Error:', e));
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [content, isChatOpen]);

  const toggleChapter = (idx: number) => {
    const newSet = new Set(expandedChapters);
    if (newSet.has(idx)) newSet.delete(idx);
    else newSet.add(idx);
    setExpandedChapters(newSet);
  };

  if (isLoading && toc.length === 0) {
    return <div className="flex items-center justify-center h-full gap-3 text-slate-400 font-bold"><Loader2 className="animate-spin" /> Loading curriculum...</div>;
  }

  return (
    <div className="flex h-[calc(100vh-64px)] overflow-hidden bg-white relative">
      {/* TOC Sidebar */}
      <aside className="w-80 border-r border-slate-100 p-6 overflow-y-auto bg-slate-50/20">
        <Link to="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-black text-[10px] uppercase tracking-widest mb-8">
          <ChevronLeft size={14} /> Back to Library
        </Link>

        <div className="flex items-center gap-3 mb-8 px-2">
          <BookOpen className="text-blue-600" size={24} />
          <h2 className="font-black text-slate-800 tracking-tight text-lg">Curriculum</h2>
        </div>
        
        <nav className="space-y-2">
          {toc.map((item: any, idx: number) => {
            const isExpanded = expandedChapters.has(idx);
            const hasActiveModule = item.type === 'chapter' && item.modules.some((m: any) => m.id === activeModuleId);

            return (
              <div key={idx} className="space-y-1">
                {item.type === 'chapter' ? (
                  <>
                    <button 
                      onClick={() => toggleChapter(idx)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all
                        ${hasActiveModule ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-white'}`}
                    >
                      <span className="font-black text-[10px] uppercase tracking-[0.2em]">{item.title}</span>
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                    {isExpanded && (
                      <div className="space-y-1 pl-2">
                        {item.modules.map((m: any) => (
                          <ModuleButton 
                            key={m.id}
                            title={m.title}
                            active={activeModuleId === m.id}
                            onClick={() => setActiveModuleId(m.id)}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="px-2">
                    <ModuleButton 
                      title={item.title}
                      active={activeModuleId === item.id}
                      onClick={() => setActiveModuleId(item.id)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-12 lg:p-16 relative bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-slate-200" size={48} /></div>
        ) : content && (
          <div className="max-w-3xl mx-auto animate-in">
            <h1 className="text-5xl font-black tracking-tight text-slate-900 mb-12 leading-tight">{content.title}</h1>
            <div className="prose prose-slate prose-lg max-w-none text-slate-600 leading-relaxed font-medium space-y-6" dangerouslySetInnerHTML={{ __html: content.html }} />
          </div>
        )}

        {/* Floating Chat Re-open Button */}
        {!isChatOpen && (
          <button 
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-2xl shadow-2xl shadow-blue-200 hover:scale-110 active:scale-95 transition-all z-50 flex items-center gap-3 font-black text-sm"
          >
            <MessageSquareText size={20} />
            Ask Tutor
          </button>
        )}
      </main>

      {/* Tutor Sidebar */}
      <aside className={`${isChatOpen ? 'w-80' : 'w-0'} border-l border-slate-100 flex flex-col bg-white transition-all duration-300 overflow-hidden shadow-[-10px_0_30px_rgba(0,0,0,0.02)]`}>
        <div className="p-6 border-b border-slate-50 min-w-[320px]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] text-emerald-500 font-black uppercase tracking-widest">Tutor Live</span>
            <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-slate-50 rounded-lg transition-colors"><X size={18} className="text-slate-400" /></button>
          </div>
          <h3 className="font-black text-slate-900 text-sm">Socratic Tutor</h3>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Context: {content?.title || 'Loading...'}</p>
        </div>
        <div className="flex-1 p-5 overflow-y-auto bg-slate-50/30 min-w-[320px]">
          <ChatMessage role="tutor" text={`Hi Alex! Ready to master **${content?.title}**? Ask me anything!`} />
        </div>
        <div className="p-5 border-t border-slate-100 min-w-[320px]">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 rounded-2xl p-2">
            <input type="text" placeholder="Ask a question..." className="flex-1 bg-transparent outline-none text-sm px-2" />
            <button className="bg-blue-600 text-white p-2 rounded-xl shadow-lg"><Send size={18} /></button>
          </div>
        </div>
      </aside>
    </div>
  );
};

const ModuleButton = ({ title, active, onClick }: any) => (
  <button 
    onClick={onClick}
    className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 outline-none
      ${active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
        : 'text-slate-500 hover:bg-white hover:text-slate-900'
      }`}
  >
    {title}
  </button>
);

const ChatMessage = ({ role, text }: any) => (
  <div className={`flex flex-col gap-1 ${role === 'user' ? 'items-end' : ''}`}>
    <span className={`text-[10px] font-black text-slate-400 uppercase tracking-tighter ${role === 'user' ? 'mr-4' : 'ml-4'}`}>{role === 'user' ? 'You' : 'Tutor'}</span>
    <div className={`p-4 rounded-2xl shadow-sm border max-w-[90%] ${role === 'user' ? 'bg-blue-600 text-white border-blue-700 rounded-tr-none' : 'bg-white text-slate-600 border-slate-100 rounded-tl-none'}`}>
      <p className="text-sm font-medium leading-relaxed">{text}</p>
    </div>
  </div>
);

export default TextbookView;
