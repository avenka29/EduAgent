import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import LessonsLibrary from './pages/Lessons/LessonsLibrary';
import TextbookView from './pages/Lessons/TextbookView';
import HomeworkHelp from './pages/HomeworkHelp/HomeworkHelp';
import { LayoutDashboard, BookOpen, MessageSquare, GraduationCap } from 'lucide-react';

function AppContent() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  if (isLandingPage) {
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-blue-100 flex flex-col">
      {/* Shared Header / Navigation */}
      <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-primary-blue p-1.5 rounded-xl text-white">
            <GraduationCap size={20} strokeWidth={2.5} />
          </div>
          <span className="text-xl font-black tracking-tight">EduAgent</span>
        </div>

        <nav className="flex items-center gap-2">
          <NavLink to="/dashboard" icon={<LayoutDashboard size={18} />} label="Dashboard" active={location.pathname === '/dashboard'} />
          <NavLink to="/lessons" icon={<BookOpen size={18} />} label="Lessons" active={location.pathname === '/lessons'} />
          <NavLink to="/homework" icon={<MessageSquare size={18} />} label="Homework Help" active={location.pathname === '/homework'} />
        </nav>

        <div className="flex items-center gap-4">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-black text-xs border border-white shadow-sm">
            AJ
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/lessons" element={<LessonsLibrary />} />
          <Route path="/lessons/:bookSlug" element={<TextbookView />} />
          <Route path="/homework" element={<HomeworkHelp />} />
        </Routes>
      </main>
    </div>
  );
}

const NavLink = ({ to, icon, label, active }: any) => (
  <Link
    to={to}
    className={`flex items-center gap-2.5 px-5 py-2 rounded-xl transition-all font-bold text-sm ${
      active 
        ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
        : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
