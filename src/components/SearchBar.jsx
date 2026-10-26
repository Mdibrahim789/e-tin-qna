import React from 'react';
import { Search, X, Sparkles } from 'lucide-react';

export default function SearchBar({ searchQuery, setSearchQuery, onSelectSuggestion }) {
  const trendingQueries = [
    "e-TIN ki?",
    "zero return kivabe dibo?",
    "return na dile ki fine hobe?",
    "VAT ar BIN ki?",
    "student tax return",
    "freelancer remittance tax"
  ];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Big Search Input */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 sm:pl-5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
          <Search className="w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="বাংলা বা বাংলিশে প্রশ্ন লিখুন (যেমন: zero return, e-TIN kivabe khulbo, জরিমানার নিয়ম...)"
          className="w-full pl-12 sm:pl-14 pr-12 py-3.5 sm:py-4 bg-white rounded-2xl border-2 border-slate-200 text-slate-900 placeholder:text-slate-400 text-base sm:text-lg focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 shadow-sm transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
            aria-label="Clear Search"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Trending Question Chips */}
      <div className="mt-3.5 flex items-center gap-2 overflow-x-auto no-scrollbar py-1 -mx-4 px-4 sm:mx-0 sm:px-0 flex-nowrap scroll-smooth">
        <div className="flex items-center gap-1 text-xs font-semibold text-slate-500 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>জনপ্রিয়:</span>
        </div>
        {trendingQueries.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              setSearchQuery(item);
              if (onSelectSuggestion) onSelectSuggestion(item);
            }}
            className="text-xs bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 px-3 py-1.5 rounded-full transition-colors active:scale-95 shrink-0"
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
