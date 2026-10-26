import React, { useState } from 'react';
import { BookOpen, ExternalLink, ShieldCheck, Scale, Search, CheckCircle } from 'lucide-react';
import sourcesData from '../data/sources.json';
import qnaData from '../data/qna.json';

export default function SourcesPage() {
  const [filterQuery, setFilterQuery] = useState('');
  const allSources = sourcesData.sources || [];
  const questions = qnaData.questions || [];

  const filteredQuestions = questions.filter(q => {
    if (!filterQuery.trim()) return true;
    const term = filterQuery.toLowerCase();
    return (
      q.questionBangla.toLowerCase().includes(term) ||
      (q.legalSection || '').toLowerCase().includes(term) ||
      (q.sourceName || '').toLowerCase().includes(term) ||
      q.id.toLowerCase().includes(term)
    );
  });

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-200">
      {/* Title */}
      <div className="text-center space-y-2 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
          <BookOpen className="w-3.5 h-3.5" />
          <span>সরকারি তথ্যসূত্র ও আইনি ধারার ম্যাপিং</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          প্রাথমিক সরকারি সূত্রের ইনডেক্স ও ম্যাপিং
        </h1>
        <p className="text-sm text-slate-600">
          এই সাইটের প্রতিটি তথ্যের একমাত্র ভিত্তি বাংলাদেশ সরকারের মূল সংবিধিবদ্ধ আইন ও জাতীয় রাজস্ব বোর্ডের অফিশিয়াল নির্দেশিকা। কোনো ব্লগ বা অননুমোদিত উৎসের তথ্য এখানে ব্যবহৃত হয় না।
        </p>
      </div>

      {/* Primary Law Sources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {allSources.map((src) => (
          <div 
            key={src.id}
            className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-2xs hover:border-emerald-300 transition-colors flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-sm">
                  {src.authority}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  ভেরিফাইড
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {src.name}
              </h2>
              <p className="text-xs text-slate-600 leading-relaxed">
                {src.scope}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <div className="flex flex-wrap gap-1">
                {src.keySections.slice(0, 3).map((sec, idx) => (
                  <span key={idx} className="text-[10px] bg-slate-50 text-slate-700 border border-slate-200 px-1.5 py-0.5 rounded-xs">
                    {sec}
                  </span>
                ))}
              </div>
              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-between w-full text-xs font-semibold text-emerald-700 hover:text-emerald-800 pt-1"
              >
                <span>অফিসিয়াল পোর্টাল বা গেজেট</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Comprehensive QnA Mapping Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-7 shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              সকল প্রশ্নোত্তরের আইনগত ম্যাপিং তালিকা
            </h2>
            <p className="text-xs text-slate-500">
              মোট {questions.length}টি প্রশ্নোত্তর সরাসরি আইনের ধারা ও সরকারি লিংকের সাথে সংযুক্ত।
            </p>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              placeholder="ধারা বা প্রশ্ন দিয়ে ফিল্টার..."
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:bg-white focus:border-emerald-600"
            />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3 w-16 text-center">আইডি</th>
                <th className="p-3">প্রশ্নমালা</th>
                <th className="p-3 w-36">আইনি ধারা</th>
                <th className="p-3 w-48">সরকারি সূত্র</th>
                <th className="p-3 w-28 text-center">যাচাই তারিখ</th>
                <th className="p-3 w-20 text-center">লিংক</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredQuestions.map((q) => (
                <tr key={q.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 text-center font-mono text-[11px] text-slate-500">
                    {q.id}
                  </td>
                  <td className="p-3 font-medium text-slate-900 max-w-xs sm:max-w-md">
                    {q.questionBangla}
                  </td>
                  <td className="p-3">
                    <span className="inline-block bg-slate-100 text-slate-800 font-semibold text-xs px-2 py-0.5 rounded-md">
                      {q.legalSection || "সরকারি বিধিমালা"}
                    </span>
                  </td>
                  <td className="p-3 text-xs text-slate-600">
                    {q.sourceName}
                  </td>
                  <td className="p-3 text-center text-xs text-slate-500 whitespace-nowrap">
                    {q.lastVerifiedDate}
                  </td>
                  <td className="p-3 text-center">
                    <a
                      href={q.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 inline-flex text-emerald-700 hover:text-emerald-900 rounded-md hover:bg-emerald-50"
                      title="অফিসিয়াল উৎস ব্রাউজ করুন"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
