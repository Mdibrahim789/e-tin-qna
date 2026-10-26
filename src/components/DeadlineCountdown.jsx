import React, { useState, useEffect } from 'react';
import { Calendar, Clock, AlertTriangle, ExternalLink } from 'lucide-react';

export default function DeadlineCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Current or upcoming tax day: 30 November
    const now = new Date();
    const currentYear = now.getFullYear();
    let targetTaxDay = new Date(`${currentYear}-11-30T23:59:59`);

    if (now > targetTaxDay) {
      targetTaxDay = new Date(`${currentYear + 1}-11-30T23:59:59`);
    }

    const interval = setInterval(() => {
      const difference = targetTaxDay.getTime() - new Date().getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 text-white rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden border border-emerald-700/30">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
        <div className="space-y-1.5 max-w-lg">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            <Clock className="w-3.5 h-3.5" />
            <span>আইনগত সময়সীমা কাউন্টডাউন</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>জাতীয় কর দিবস: ৩০ নভেম্বর</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            আয়কর আইন ২০২৩-এর ধারা ১৭১ অনুযায়ী সাধারণ ব্যক্তি করদাতাদের বার্ষিক আয়কর রিটার্ন দাখিলের সংবিধিবদ্ধ শেষ তারিখ। শেষ মুহূর্তের সার্ভার জট এড়াতে আগেই অনলাইনে রিটার্ন দিন।
          </p>
        </div>

        {/* Counter Blocks */}
        <div className="flex items-center gap-2 sm:gap-3 w-full lg:w-auto justify-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[76px] border border-white/10">
            <span className="block text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {timeLeft.days}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-300 font-medium uppercase">দিন</span>
          </div>

          <div className="text-xl sm:text-2xl font-bold text-slate-400">:</div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[76px] border border-white/10">
            <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-300 font-medium uppercase">ঘণ্টা</span>
          </div>

          <div className="text-xl sm:text-2xl font-bold text-slate-400">:</div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[76px] border border-white/10">
            <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-300 font-medium uppercase">মিনিট</span>
          </div>

          <div className="text-xl sm:text-2xl font-bold text-slate-400">:</div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 text-center min-w-[62px] sm:min-w-[76px] border border-white/10">
            <span className="block text-2xl sm:text-3xl font-black text-emerald-400 font-mono">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs text-slate-300 font-medium uppercase">সেকেন্ড</span>
          </div>
        </div>
      </div>
    </div>
  );
}
