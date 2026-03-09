import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Book, ArrowRight, GraduationCap, Clock } from 'lucide-react';

const LessonsLibrary = () => {
  const [textbooks, setTextbooks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastLesson, setLastLesson] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Load last left off state
    const saved = localStorage.getItem('eduagent_last_lesson');
    if (saved) setLastLesson(JSON.parse(saved));

    const fetchBooks = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/textbook/list');
        const data = await res.json();
        setTextbooks(data);
      } catch (err) {
        console.error('Failed to load textbooks', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Curriculum Library</h1>
          <p className="text-slate-500 text-lg font-medium">Select a textbook to begin your structured learning path.</p>
        </div>
        
        {lastLesson && (
          <button 
            onClick={() => navigate(`/lessons/${lastLesson.bookSlug}`)}
            className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-2xl font-black shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
          >
            <Clock size={18} /> Resume Last Lesson
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          [1, 2, 3].map(i => <div key={i} className="h-[450px] bg-slate-100 animate-pulse rounded-[2.5rem]"></div>)
        ) : (
          textbooks.map((book) => (
            <TextbookCard 
              key={book.slug} 
              book={book} 
              onClick={() => navigate(`/lessons/${book.slug}`)} 
            />
          ))
        )}
      </div>
    </div>
  );
};

const TextbookCard = ({ book, onClick }: any) => (
  <div 
    onClick={onClick}
    className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col"
  >
    <div className="aspect-[4/3] overflow-hidden relative">
      <img 
        src={`http://localhost:4000${book.coverUrl}`} 
        alt={book.title}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
        <span className="text-white font-black flex items-center gap-2">
          Start Reading <ArrowRight size={18} />
        </span>
      </div>
      <div className="absolute top-6 left-6">
        <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-sm">
          <GraduationCap size={20} className="text-blue-600" />
        </div>
      </div>
    </div>

    <div className="p-8 flex-1 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">Mathematics</span>
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight line-clamp-2">
        {book.title}
      </h3>
      <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed mb-6">
        Comprehensive OpenStax curriculum covering core concepts and advanced applications.
      </p>
      <div className="mt-auto pt-6 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
          <Book size={14} /> Course Material
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
          <ArrowRight size={18} />
        </div>
      </div>
    </div>
  </div>
);

export default LessonsLibrary;
