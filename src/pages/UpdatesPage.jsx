import React from 'react';
import { Bell, ExternalLink, Calendar, Tag } from 'lucide-react';
import updatesData from '../data/updates.json';

export default function UpdatesPage() {
  const updates = updatesData.updates || [];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
          <Bell className="w-3.5 h-3.5" />
          <span>জাতীয় রাজস্ব বোর্ড (NBR) সার্কুলার ও নোটিশ</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          এনবিআরের সর্বশেষ প্রজ্ঞাপন ও নির্দেশনা
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          অনলাইন ফাইলিং সংক্রান্ত বিশেষ আদেশ, সময়সীমা পরিবর্তন এবং কর পরিপালন সম্পর্কিত সর্বশেষ অফিশিয়াল সরকারি আপডেট।
        </p>
      </div>

      {/* Updates List */}
      <div className="space-y-4">
        {updates.map((item) => (
          <article 
            key={item.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-3 shadow-xs hover:border-emerald-300 transition-colors"
          >
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                  <Tag className="w-3 h-3" />
                  <span>{item.tag}</span>
                </span>
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-slate-400" />
                  প্রকাশের তারিখ: {item.date}
                </span>
              </div>

              <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                অফিসিয়াল উৎস: {item.source}
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 leading-snug">
              {item.title}
            </h2>

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {item.summary}
            </p>

            <div className="pt-2 flex items-center justify-between text-xs border-t border-slate-100">
              <span className="text-slate-500">
                তথ্যসূত্র: এনবিআর গেজেট ও প্রেস বিজ্ঞপ্তি
              </span>
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-700 font-semibold hover:underline"
              >
                <span>মূল সরকারি প্রজ্ঞাপন দেখুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
