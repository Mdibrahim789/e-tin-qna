import React from 'react';
import { 
  Home, 
  FileText, 
  CheckSquare, 
  FileCheck2, 
  Bot,
  Sparkles
} from 'lucide-react';

export default function MobileBottomNav({ activeTab, setActiveTab, onOpenAiModal }) {
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] px-2 py-1.5 flex items-center justify-around safe-bottom"
      aria-label="Mobile Navigation"
    >
      {/* 1. Home & QnA */}
      <button
        onClick={() => handleTabClick('home')}
        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
          activeTab === 'home' 
            ? 'text-emerald-800 font-bold' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className={`p-1 rounded-lg ${activeTab === 'home' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
          <Home className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">হোম</span>
      </button>

      {/* 2. Waiver Letter Generator */}
      <button
        onClick={() => handleTabClick('waiver')}
        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
          activeTab === 'waiver' 
            ? 'text-emerald-800 font-bold' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className={`p-1 rounded-lg ${activeTab === 'waiver' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
          <FileText className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">মওকুফ</span>
      </button>

      {/* 3. Central AI Assistant Highlight Button */}
      <button
        onClick={onOpenAiModal}
        className="flex flex-col items-center justify-center flex-1 py-1 -mt-3 group cursor-pointer"
        aria-label="Open AI Assistant"
      >
        <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-emerald-700 to-teal-600 text-white flex items-center justify-center shadow-md shadow-emerald-700/30 border-2 border-white group-active:scale-95 transition-transform">
          <Bot className="w-6 h-6 animate-pulse" />
        </div>
        <span className="text-[10px] font-bold text-emerald-800 mt-0.5">ট্যাক্স এআই</span>
      </button>

      {/* 4. Eligibility Checker */}
      <button
        onClick={() => handleTabClick('eligibility')}
        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
          activeTab === 'eligibility' 
            ? 'text-emerald-800 font-bold' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className={`p-1 rounded-lg ${activeTab === 'eligibility' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
          <CheckSquare className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">চেকার</span>
      </button>

      {/* 5. Document Checklist */}
      <button
        onClick={() => handleTabClick('checklist')}
        className={`flex flex-col items-center justify-center flex-1 py-1 rounded-xl transition-all ${
          activeTab === 'checklist' 
            ? 'text-emerald-800 font-bold' 
            : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <div className={`p-1 rounded-lg ${activeTab === 'checklist' ? 'bg-emerald-100 text-emerald-800' : ''}`}>
          <FileCheck2 className="w-5 h-5" />
        </div>
        <span className="text-[10px] mt-0.5 tracking-tight">চেকলিস্ট</span>
      </button>
    </nav>
  );
}
