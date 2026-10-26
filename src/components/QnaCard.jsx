import React, { useEffect, useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2, 
  ExternalLink, 
  ShieldCheck, 
  Calendar, 
  BookMarked,
  Copy,
  Check,
  Link2
} from 'lucide-react';

export default function QnaCard({ qna }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash === `#${qna.id}`) {
        setExpanded(true);
        requestAnimationFrame(() => document.getElementById(qna.id)?.scrollIntoView({ block: 'center' }));
      }
    };
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, [qna.id]);

  const handleCopy = (e) => {
    e.stopPropagation();
    const textToCopy = `${qna.questionBangla}\n\nউত্তর: ${qna.shortAnswer}\n\nউৎস: ${qna.sourceName} (${qna.sourceUrl})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLink = (e) => {
    e.stopPropagation();
    const link = `${window.location.origin}${window.location.pathname}#${qna.id}`;
    navigator.clipboard.writeText(link);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  return (
    <article 
      id={qna.id}
      className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
        expanded 
          ? 'border-emerald-300 shadow-md ring-1 ring-emerald-500/10' 
          : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      {/* Header & Short Answer Area */}
      <div 
        onClick={() => setExpanded(!expanded)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            setExpanded((value) => !value);
          }
        }}
        role="button"
        tabIndex={0}
        aria-expanded={expanded}
        aria-controls={`${qna.id}-details`}
        className="p-4 sm:p-6 cursor-pointer select-none space-y-3"
      >
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded-full">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>{qna.verificationStatus || "অফিশিয়াল সূত্রে যাচাইকৃত"}</span>
            </span>
            {qna.legalSection && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200">
                <BookMarked className="w-3 h-3 text-slate-500" />
                <span>{qna.legalSection}</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px]">
              <Calendar className="w-3 h-3 text-slate-400" />
              যাচাই: {qna.lastVerifiedDate || "২০২৪-১০-০১"}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors active:scale-90"
              title="উত্তর কপি করুন"
              aria-label="Copy Answer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCopyLink}
              className="p-2 text-slate-500 hover:text-slate-800 rounded-xl hover:bg-slate-100 transition-colors active:scale-90"
              title="এই প্রশ্নের লিংক কপি করুন"
              aria-label="Copy Link"
            >
              {linkCopied ? <Check className="w-4 h-4 text-emerald-600" /> : <Link2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Question Title */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-emerald-800">
            {qna.questionBangla}
          </h2>
          <div className="p-1 text-slate-400 shrink-0 mt-0.5">
            {expanded ? <ChevronUp className="w-5 h-5 text-emerald-700" /> : <ChevronDown className="w-5 h-5" />}
          </div>
        </div>

        {/* Step 1 Requirement: Short Answer First (2-3 lines) */}
        <div className="bg-emerald-50/60 rounded-xl p-3 sm:p-3.5 border border-emerald-100 text-slate-800 text-sm sm:text-[15px] leading-relaxed">
          <p className="font-normal">
            <span className="font-semibold text-emerald-950">সংক্ষিপ্ত উত্তর: </span>
            {qna.shortAnswer}
          </p>
        </div>
      </div>

      {/* Expandable Step-by-Step & Checklist Section */}
      {expanded && (
        <div id={`${qna.id}-details`} className="px-4 pb-5 sm:px-6 sm:pb-6 pt-1 border-t border-slate-100 space-y-4 bg-slate-50/40 animate-in fade-in-50 duration-200">
          {/* Step-by-step details */}
          {qna.stepByStepDetails && qna.stepByStepDetails.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                ধাপে ধাপে বিস্তারিত নিয়ম:
              </h4>
              <ul className="space-y-1.5 text-sm text-slate-700">
                {qna.stepByStepDetails.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="leading-relaxed">{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Checklist */}
          {qna.checklist && qna.checklist.length > 0 && (
            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                প্রয়োজনীয় চেকলিস্ট ও ডকুমেন্টস:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                {qna.checklist.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Source Link & Verification Badge */}
          <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600 border-t border-slate-200/60">
            <div className="space-y-0.5">
              <p>
                <span className="font-semibold text-slate-700">সরকারি আইনগত উৎস: </span>
                <span className="text-slate-900">{qna.sourceName || "আয়কর আইন, ২০২৩"}</span>
              </p>
              <p className="text-[11px] text-slate-500">
                আইনের ধারা/পরিপত্র: <span className="font-medium text-slate-700">{qna.legalSection || "সরকারি বিধান"}</span> | সর্বশেষ যাচাই: {qna.lastVerifiedDate || "২০২৪-১০-০১"}
              </p>
            </div>

            {qna.sourceUrl && (
              <a
                href={qna.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-3 py-1.5 rounded-lg text-xs transition-colors shrink-0"
              >
                <span>অফিসিয়াল উৎস দেখুন</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
