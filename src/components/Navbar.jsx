import React, { useState } from 'react';
import { 
  Scale, 
  Bot, 
  HelpCircle, 
  CheckSquare, 
  Bell, 
  BookOpen, 
  Menu, 
  X,
  FileCheck2,
  FileText
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenAiModal }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'হোম', mobileLabel: 'হোম ও প্রশ্নোত্তর', icon: HelpCircle },
    { id: 'waiver', label: 'মওকুফ আবেদন', mobileLabel: 'জরিমানা মওকুফ দরখাস্ত', icon: FileText },
    { id: 'eligibility', label: 'রিটার্ন চেকার', mobileLabel: 'আমার কি রিটার্ন দিতে হবে?', icon: CheckSquare },
    { id: 'checklist', label: 'ডকুমেন্ট', mobileLabel: 'ডকুমেন্ট চেকলিস্ট', icon: FileCheck2 },
    { id: 'updates', label: 'আপডেট', mobileLabel: 'এনবিআর আপডেট', icon: Bell },
    { id: 'sources', label: 'আইন ও সূত্র', mobileLabel: 'আইনের ধারা ও সূত্র', icon: BookOpen },
    { id: 'verification', label: 'যাচাই', mobileLabel: 'ভেরিফিকেশন তালিকা', icon: Scale },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-13 sm:h-15">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group min-w-0"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl bg-gradient-to-tr from-emerald-700 to-emerald-500 flex items-center justify-center text-white shadow-sm shadow-emerald-500/20 group-hover:scale-105 transition-transform shrink-0">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors whitespace-nowrap">
                  ট্যাক্স সহায়ক
                </span>
                <span className="text-[8px] sm:text-[10px] font-semibold bg-emerald-100 text-emerald-800 px-1 sm:px-1.5 py-0.5 rounded-sm">
                  বিডি
                </span>
              </div>
              <p className="text-[10px] text-slate-500 -mt-0.5 hidden xs:block xl:hidden">
                ই-টিআইএন, আয়কর রিটার্ন ও ভ্যাট গাইড
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-0.5" aria-label="প্রধান নেভিগেশন">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                    isActive 
                      ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* AI Assistant Button & Mobile Toggle */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              onClick={onOpenAiModal}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              <Bot className="w-4 h-4 animate-pulse" />
              <span className="hidden sm:inline">এআই সহকারী</span>
              <span className="sm:hidden">এআই চ্যাট</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 xl:hidden rounded-lg hover:bg-slate-100"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="xl:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-6 space-y-1 shadow-lg animate-in slide-in-from-top-2 max-h-[calc(100dvh-4rem)] overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-800 font-semibold' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`} />
                <span>{item.mobileLabel}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
