import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, Clock, Sparkles, TrendingUp, Award, Target } from 'lucide-react';

const Dashboard = () => {
  const [lastLesson, setLastLesson] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem('eduagent_last_lesson');
    if (saved) setLastLesson(JSON.parse(saved));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-12 animate-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Welcome back, Alex!</h1>
          <p className="text-slate-500 text-lg font-medium">Your learning journey is in full swing. Keep the momentum!</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <div className="px-4 py-2 bg-blue-50 rounded-xl text-blue-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">
            <Star size={14} className="fill-blue-600" /> 1,240 XP
          </div>
          <div className="px-4 py-2 bg-emerald-50 rounded-xl text-emerald-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">
            <Clock size={14} /> 12 Day Streak
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard 
          icon={<TrendingUp className="text-blue-600" />} 
          label="Learning Progress" 
          value="68%" 
          subValue="+12% this week" 
          color="blue" 
        />
        <StatCard 
          icon={<Award className="text-emerald-600" />} 
          label="Mastery Points" 
          value="450" 
          subValue="Rank: Expert" 
          color="emerald" 
        />
        <StatCard 
          icon={<Target className="text-amber-600" />} 
          label="Daily Goal" 
          value="45/60" 
          subValue="Minutes studied" 
          color="amber" 
        />
      </div>

      {/* Action Section */}
      <section className="bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl shadow-blue-200">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[100px] -z-0"></div>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black mb-6 border border-blue-500/30 uppercase tracking-widest">
              <Sparkles size={14} /> Continue Learning
            </div>
            <h2 className="text-4xl font-black mb-6 leading-tight">
              {lastLesson ? "Ready to dive back in?" : "Start your learning journey"}
            </h2>
            <p className="text-slate-400 text-lg mb-8 font-medium max-w-md">
              {lastLesson 
                ? `Pick up exactly where you left off in your last session and continue mastering core concepts.`
                : "Explore our comprehensive library of OpenStax textbooks and start building your knowledge today."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              {lastLesson ? (
                <button 
                  onClick={() => navigate(`/lessons/${lastLesson.bookSlug}`)}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center gap-3 active:scale-95 shadow-xl shadow-blue-900/20"
                >
                  Resume Last Lesson <ArrowRight size={20} />
                </button>
              ) : (
                <button 
                  onClick={() => navigate('/lessons')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all flex items-center gap-3 active:scale-95 shadow-xl shadow-blue-900/20"
                >
                  Browse Library <ArrowRight size={20} />
                </button>
              )}
              <button 
                onClick={() => navigate('/lessons')}
                className="bg-white/10 backdrop-blur-md text-white border border-white/10 px-8 py-4 rounded-2xl font-black hover:bg-white/20 transition-all active:scale-95"
              >
                All Courses
              </button>
            </div>
          </div>
          <div className="hidden lg:grid grid-cols-2 gap-4">
            <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col justify-end">
              <div className="text-4xl font-black mb-2">85%</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Global Accuracy</div>
            </div>
            <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 p-8 flex flex-col justify-end">
              <div className="text-4xl font-black mb-2">14</div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Badges Earned</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const StatCard = ({ icon, label, value, subValue, color }: any) => {
  const bgColors: any = {
    blue: 'bg-blue-50',
    emerald: 'bg-emerald-50',
    amber: 'bg-amber-50'
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className={`w-14 h-14 ${bgColors[color]} rounded-2xl flex items-center justify-center mb-6`}>
        {React.cloneElement(icon, { size: 28 })}
      </div>
      <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-2">{label}</p>
      <div className="flex items-baseline gap-3">
        <h3 className="text-3xl font-black text-slate-900">{value}</h3>
        <span className="text-slate-500 text-sm font-bold">{subValue}</span>
      </div>
    </div>
  );
};

export default Dashboard;
