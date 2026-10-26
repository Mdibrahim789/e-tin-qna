import React from 'react';
import { AlertCircle, ShieldCheck } from 'lucide-react';

export default function DisclaimerBanner() {
  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-950 px-3 py-1.5 sm:px-4 sm:py-2.5 text-[10px] sm:text-sm">
      <div className="max-w-7xl mx-auto flex items-start sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-tight sm:leading-snug">
            <span className="font-semibold text-amber-900">সংবিধিবদ্ধ সতর্কতা:</span> এই সাইটটি সাধারণ নাগরিক সচেতনতা ও তথ্যের জন্য তৈরি। এটি কোনো অফিশিয়াল ট্যাক্স অ্যাডভাইজরের বিকল্প পরামর্শ নয়। আপনার ফাইলের জটিলতা বা নির্দিষ্ট কোনো বিরোধের ক্ষেত্রে এনবিআর হেল্পলাইন (১৬৫৫৫) বা একজন রেজিস্টার্ড ট্যাক্স আইনজীবীর পরামর্শ নিন।
          </p>
        </div>
        <div className="hidden lg:flex items-center gap-1.5 text-emerald-800 font-medium shrink-0 bg-emerald-100/70 px-2.5 py-1 rounded-full border border-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>১০০% নিরাপদ: কোনো NID/TIN/পাসওয়ার্ড নেওয়া হয় না</span>
        </div>
      </div>
    </div>
  );
}
