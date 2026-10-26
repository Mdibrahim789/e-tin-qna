import React from 'react';
import { HelpCircle, CheckCircle, XCircle, ExternalLink } from 'lucide-react';
import mythsData from '../data/myths.json';

export default function MythBusterSection() {
  const myths = mythsData.myths || [];

  return (
    <section className="bg-gradient-to-b from-white to-slate-50 py-10 rounded-3xl border border-slate-200 p-5 sm:p-8 space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 text-xs font-semibold px-3 py-1 rounded-full border border-amber-200">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>প্রচলিত বিভ্রান্তি দূরীকরণ</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          ট্যাক্স সংক্রান্ত ভুল ধারণা বনাম আসল সত্যি
        </h2>
        <p className="text-sm text-slate-600">
          সাধারণ করদাতাদের মধ্যে প্রচলিত বিভিন্ন বিভ্রান্তি এবং আয়কর আইন ২০২৩ অনুযায়ী তার বাস্তবিক সত্যতা।
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {myths.map((item, idx) => (
          <div 
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3.5 shadow-2xs hover:shadow-xs transition-shadow"
          >
            {/* Myth */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-600 uppercase tracking-wide">
                <XCircle className="w-4 h-4 text-rose-500" />
                <span>প্রচলিত ভুল ধারণা #{idx + 1}:</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 leading-snug">
                "{item.myth}"
              </p>
            </div>

            {/* Fact */}
            <div className="p-3.5 bg-emerald-50/70 rounded-xl border border-emerald-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wide">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>বাস্তব সত্য ও আইনি ব্যাখ্যা:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                {item.fact}
              </p>
            </div>

            {/* Reference */}
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
              <span className="font-medium text-slate-600">
                আইনগত সূত্র: {item.sectionRef}
              </span>
              {item.sourceUrl && (
                <a
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>অফিসিয়াল সাইট</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
