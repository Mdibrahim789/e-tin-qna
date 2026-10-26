import React from 'react';
import { Scale, ShieldCheck, ExternalLink, PhoneCall } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 pb-16 border-t border-slate-800 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">ট্যাক্স সহায়ক</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              বাংলাদেশের সকল নাগরিকের জন্য আয়কর, ই-টিআইএন এবং ভ্যাট সংক্রান্ত শতভাগ সঠিক, সরকারি আইনের ধারা ভিত্তিক সহজ বাংলা তথ্য ভাণ্ডার।
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 bg-emerald-950/60 p-2.5 rounded-lg border border-emerald-800/50">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>আমরা কোনো NID, TIN, OTP বা ব্যাংক পাসওয়ার্ড চাই না বা সংরক্ষণ করি না।</span>
            </div>
          </div>

          {/* Official Government Portals */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              সরকারি অফিশিয়াল পোর্টাল
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a 
                  href="https://nbr.gov.bd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center justify-between group"
                >
                  <span>জাতীয় রাজস্ব বোর্ড (NBR)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://etaxnbr.gov.bd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center justify-between group"
                >
                  <span>ই-রিটার্ন ও ই-টিআইএন পোর্টাল</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://vat.gov.bd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center justify-between group"
                >
                  <span>ভ্যাট অনলাইন পোর্টাল (vat.gov.bd)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                </a>
              </li>
              <li>
                <a 
                  href="http://bdlaws.minlaw.gov.bd" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 flex items-center justify-between group"
                >
                  <span>বিডি লজ (আইন মন্ত্রণালয়)</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600 group-hover:text-emerald-400" />
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Tools & Guides */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              ডিজিটাল সেবা ও টুলস
            </h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <button 
                  onClick={() => onNavigate('eligibility')} 
                  className="hover:text-emerald-400 text-left"
                >
                  আমার কি রিটার্ন দিতে হবে?
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('checklist')} 
                  className="hover:text-emerald-400 text-left"
                >
                  ডকুমেন্ট চেকলিস্ট তৈরি করুন
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('sources')} 
                  className="hover:text-emerald-400 text-left"
                >
                  সকল সরকারি আইনের ধারা তালিকা
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('verification')} 
                  className="hover:text-emerald-400 text-left"
                >
                  রেট ও তথ্য ভেরিফিকেশন স্টেটাস
                </button>
              </li>
            </ul>
          </div>

          {/* Official Helplines */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              জরুরি এনবিআর হেল্পলাইন
            </h3>
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                <PhoneCall className="w-4 h-4" />
                <span>১৬৫৫৫ (16555)</span>
              </div>
              <p className="text-xs text-slate-400 leading-snug">
                এনবিআর সেন্ট্রাল হেল্পডেস্ক (রবি থেকে বৃহস্পতি, সকাল ৯টা থেকে বিকাল ৫টা)
              </p>
            </div>
            <p className="text-xs text-slate-400">
              ই-মেইল: <span className="text-slate-300">support@etaxnbr.gov.bd</span>
            </p>
          </div>
        </div>

        {/* Mandatory Full Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-800 text-xs text-slate-400 leading-relaxed mb-8">
          <p className="font-semibold text-slate-300 mb-1">আইনগত দায়মুক্তি ঘোষণা (Disclaimer):</p>
          "এই সাইট সাধারণ তথ্য ও শিক্ষামূলক উদ্দেশ্যে তৈরি করা হয়েছে। এটি কোনো রেজিস্টার্ড আয়কর আইনজীবী বা প্রফেশনাল ট্যাক্স অ্যাডভাইজরের পরামর্শের বিকল্প নয়। আপনার কোনো বিশেষ বিতর্ক, অডিট নোটিশ বা জটিল ফাইলের ক্ষেত্রে জাতীয় রাজস্ব বোর্ডের হেল্পলাইন (১৬৫৫৫) অথবা বাংলাদেশ ট্যাক্স ল'ইয়ার্স অ্যাসোসিয়েশনের নিবন্ধিত কোনো আইনজীবীর প্রত্যক্ষ পরামর্শ গ্রহণ করার অনুরোধ করা হচ্ছে।"
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {CURRENT_YEAR} ট্যাক্স সহায়ক বাংলাদেশ। গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের আয়কর আইন ২০২৩ ও বিধিমালা অনুসরণে প্রস্তুতকৃত।</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>নাগরিক সেবায় স্বচ্ছতার সাথে তৈরি</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
