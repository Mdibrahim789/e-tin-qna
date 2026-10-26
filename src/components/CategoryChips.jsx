import React from 'react';
import { 
  LayoutGrid, 
  CreditCard, 
  FileText, 
  FileCheck, 
  AlertTriangle, 
  Receipt, 
  FolderCheck, 
  Users, 
  HelpCircle 
} from 'lucide-react';

const iconMap = {
  LayoutGrid,
  CreditCard,
  FileText,
  FileCheck,
  AlertTriangle,
  Receipt,
  FolderCheck,
  Users,
  HelpCircle
};

export default function CategoryChips({ categories, selectedCategory, onSelectCategory, counts = {} }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar py-2 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth">
      {categories.map((cat) => {
        const IconComponent = iconMap[cat.icon] || LayoutGrid;
        const isSelected = selectedCategory === cat.id;
        const count = counts[cat.id] ?? 0;

        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-150 shrink-0 ${
              isSelected
                ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-700/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <IconComponent className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-slate-500'}`} />
            <span>{cat.name}</span>
            {count > 0 && (
              <span className={`text-[11px] px-1.5 py-0.2 rounded-full font-semibold ${
                isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-600'
              }`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
