import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Printer, 
  AlertCircle, 
  Download, 
  ShieldCheck, 
  CheckCircle2, 
  HelpCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export default function WaiverLetterGenerator({ onGoToQna }) {
  // Form states
  const [formData, setFormData] = useState({
    applicantName: 'মো: আব্দুল্লাহ',
    guardianName: 'মো: রফিকুল ইসলাম',
    tinNumber: '১২৩৪৫৬৭৮৯০১২',
    taxCircle: 'সার্কেল-১৫',
    taxZone: 'কর অঞ্চল-২, ঢাকা',
    mobileNumber: '০১৭১২৩৪৫৬৭৮',
    presentStatus: 'student', // student, unemployed, housewife, illness, unaware
    customStatus: '',
    backlogYears: '২০২৪-২০২৫ এবং ২০২৫-২০২৬',
    currentYearFiled: true,
    currentYearName: '২০২৬-২০২৭',
    address: 'ঢাকা, বাংলাদেশ'
  });

  const [copied, setCopied] = useState(false);

  const statusDescriptions = {
    student: 'একজন ছাত্র/ছাত্রী এবং আমার কোনো ধরনের আয়ের উৎস বা করযোগ্য আয় নেই',
    unemployed: 'বর্তমানে কর্মহীন/বেকার এবং আমার কোনো নিয়মিত আয়ের উৎস বা করযোগ্য আয় নেই',
    housewife: 'একজন গৃহিণী এবং পারিবারিক ভরণপোষণে জীবনযাপন করছি, আমার নিজস্ব কোনো আয় নেই',
    illness: 'দীর্ঘদিন গুরুতর অসুস্থ ও চিকিৎসাধীন থাকার কারণে স্বাভাবিক কাজকর্ম থেকে বিরত ছিলাম',
    unaware: 'সাধারণ নাগরিক হিসেবে আয়কর আইনের ধারা ও রিটার্ন দাখিলের বাধ্যবাধকতা সম্পর্কে যথাযথভাবে অবগত ছিলাম না'
  };

  const getReasonText = () => {
    if (formData.presentStatus === 'custom' && formData.customStatus.trim()) {
      return formData.customStatus.trim();
    }
    return statusDescriptions[formData.presentStatus] || statusDescriptions.student;
  };

  // Generate the formal letter in Bengali
  const generateLetterText = () => {
    const today = new Date();
    const bengaliDate = today.toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const reason = getReasonText();

    return `তারিখ: ${bengaliDate}

বরাবর,
উপ-কর কমিশনার
${formData.taxCircle || 'কর সার্কেল-.....'}
${formData.taxZone || 'কর অঞ্চল-.....'}

বিষয়: বিগত ${formData.backlogYears} করবর্ষের বকেয়া আয়কর রিটার্ন গ্রহণ এবং আয়কর আইন, ২০২৩-এর ২৬৬ ধারা অনুযায়ী জরিমানা মওকুফের আবেদন।

মহোদয়,
বিনীত নিবেদন এই যে, আমি নিম্নস্বাক্ষরকারী ${formData.applicantName || '................................'}, পিতা/স্বামী: ${formData.guardianName || '................................'}, ১২ ডিজিট ই-টিআইএন: ${formData.tinNumber || '....................'}, আপনার কর সার্কেলের একজন নিবন্ধিত করদাতা।

আমি ${reason}। বিগত ${formData.backlogYears} করবর্ষে আমার বাৎসরিক আয় সরকারের নির্ধারিত করমুক্ত আয়ের সীমার নিচে থাকায় এবং আয়কর আইন ও সময়সীমা সম্পর্কে সম্যক ধারণা না থাকার কারণে নির্ধারিত কর দিবসের মধ্যে রিটার্ন দাখিল করা সম্ভবপর হয়নি। এটি সম্পূর্ণ আমার অনিচ্ছাকৃত একটি মানবিক ভুল।

${formData.currentYearFiled ? `উল্লেখ্য যে, একজন সচেতন ও দায়িত্বশীল নাগরিক হিসেবে আমি ইতোমধ্যে বর্তমান চলতি (${formData.currentYearName}) করবর্ষের আয়কর রিটার্ন জাতীয় রাজস্ব বোর্ডের অনলাইন e-Return পোর্টালে দাখিল করেছি এবং তার অনলাইন প্রাপ্তি স্বীকারপত্র (Acknowledgement Slip) এই আবেদনের সাথে সংযুক্ত করেছি।` : `উল্লেখ্য যে, আমি সচেতন নাগরিক হিসেবে বর্তমান চলতি করবর্ষসহ বিগত সকল বকেয়া রিটার্ন সুরাহা করতে সংকল্পবদ্ধ।`}

অতএব, মহোদয়ের নিকট আমার বিনীত প্রার্থনা এই যে, আমার কোনো করযোগ্য আয় না থাকা এবং সার্বিক পরিস্থিতি মানবিক দৃষ্টিতে বিবেচনা করে, আয়কর আইন, ২০২৩-এর ২৬৬ ধারা মোতাবেক কোনো প্রকার আর্থিক জরিমানা বা বিলম্ব সুদ ধার্য ব্যতিরেকে আমার বিগত ${formData.backlogYears} করবর্ষের বকেয়া শূন্য (জিরো) রিটার্ন ফরমসমূহ গ্রহণপূর্বক প্রাপ্তি স্বীকারপত্র প্রদান করে বাধিত করবেন।

সংযুক্তিসমূহ:
১. বিগত ${formData.backlogYears} করবর্ষের পূরণকৃত পেপার আয়কর রিটার্ন ফরম (২ প্রস্থ)।
${formData.currentYearFiled ? `২. চলতি (${formData.currentYearName}) করবর্ষের অনলাইন e-Return প্রাপ্তি স্বীকারপত্রের কপি।\n` : ''}৩. ১২ ডিজিটের ই-টিআইএন (e-TIN) সার্টিফিকেটের কপি।
৪. জাতীয় পরিচয়পত্র (NID)-এর ফটোকপি।

বিনীত নিবেদক,

স্বাক্ষর: .....................................................
নাম: ${formData.applicantName}
ই-টিআইএন: ${formData.tinNumber}
মোবাইল: ${formData.mobileNumber}
ঠিকানা: ${formData.address}`;
  };

  const handleCopy = () => {
    const text = generateLetterText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header & Strategic Overview */}
      <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-emerald-800/40 space-y-4">
        <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full border border-emerald-400/30">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>আয়কর আইন, ২০২৩ — ধারা ২৬৬ (জরিমানা মওকুফ ও শিথিলকরণ)</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-snug">
          বকেয়া রিটার্ন জরিমানা মওকুফের দরখাস্ত জেনারেটর
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          TIN খুলেছেন কিন্তু ২ বছর বা তার বেশি সময় ধরে রিটার্ন জমা দেননি? কোনো আয় না থাকলে আতঙ্কিত হওয়ার কোনো কারণ নেই। নিচের ৩টি ধাপে কর সার্কেল থেকে কোনো জরিমানা ছাড়াই আইনি সমাধান নিশ্চিত করুন।
        </p>

        {/* 3 Steps Strategy Infographic */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-3">
          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-900 font-bold flex items-center justify-center text-xs">
              ১
            </div>
            <h3 className="font-bold text-sm text-emerald-200">চলতি বছর অনলাইনে দিন</h3>
            <p className="text-xs text-slate-300">
              e-Return পোর্টালে শুধুমাত্র চলতি বছরের রিটার্ন অনলাইনে ফ্রিতে দেওয়া যায়। আয়ের ঘরে "০" দিয়ে প্রাপ্তি স্বীকারপত্র প্রিন্ট করুন।
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-900 font-bold flex items-center justify-center text-xs">
              ২
            </div>
            <h3 className="font-bold text-sm text-emerald-200">বকেয়া কাগজের ফরম পূরণ</h3>
            <p className="text-xs text-slate-300">
              অনলাইনে বিগত বছরের অপশন নেই। তাই এনবিআরের এক পাতার কাগজের ফরম সংগ্রহ করে আয়ের ঘরে "০" বা "Nil" লিখে স্বাক্ষর করুন।
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 space-y-2">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-900 font-bold flex items-center justify-center text-xs">
              ৩
            </div>
            <h3 className="font-bold text-sm text-emerald-200">মওকুফ দরখাস্তসহ জমা</h3>
            <p className="text-xs text-slate-300">
              নিচে আপনার তথ্য দিয়ে প্রস্তুত দরখাস্তটি কর সার্কেলে উপ-কর কমিশনার (DCT) বরাবর জমা দিন। কোনো আয় না থাকলে জরিমানা ব্যতিরেকে গ্রহণ করা হয়।
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Inputs on Left, Real-Time Letter on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Inputs (5 cols on lg) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-5 print:hidden">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              <span>আপনার তথ্য পূরণ করুন</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              তথ্যগুলো দিলে ডানপাশে স্বয়ংক্রিয়ভাবে অফিশিয়াল দরখাস্ত তৈরি হবে।
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                করদাতার নাম *
              </label>
              <input 
                type="text"
                value={formData.applicantName}
                onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-600 font-medium"
                placeholder="যেমন: মো: আব্দুল্লাহ"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                পিতা বা স্বামীর নাম *
              </label>
              <input 
                type="text"
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-600 font-medium"
                placeholder="যেমন: মো: রফিকুল ইসলাম"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                ১২ ডিজিট ই-টিআইএন (e-TIN) নম্বর *
              </label>
              <input 
                type="text"
                value={formData.tinNumber}
                onChange={(e) => setFormData({ ...formData, tinNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-600 font-medium tracking-wider"
                placeholder="যেমন: ১২৩৪৫৬৭৮৯০১২"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  কর সার্কেল *
                </label>
                <input 
                  type="text"
                  value={formData.taxCircle}
                  onChange={(e) => setFormData({ ...formData, taxCircle: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-600 font-medium"
                  placeholder="যেমন: সার্কেল-১৫"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  কর অঞ্চল *
                </label>
                <input 
                  type="text"
                  value={formData.taxZone}
                  onChange={(e) => setFormData({ ...formData, taxZone: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-600 font-medium"
                  placeholder="যেমন: কর অঞ্চল-২, ঢাকা"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                মোবাইল নম্বর
              </label>
              <input 
                type="text"
                value={formData.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-600 font-medium"
                placeholder="যেমন: ০১৭১২৩৪৫৬৭৮"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                বিলম্বের কারণ বা আপনার অবস্থা *
              </label>
              <select 
                value={formData.presentStatus}
                onChange={(e) => setFormData({ ...formData, presentStatus: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-600 font-medium bg-white"
              >
                <option value="student">ছাত্র / ছাত্রী (কোনো করযোগ্য আয় নেই)</option>
                <option value="unemployed">বেকার / কর্মহীন (কোনো নিয়মিত আয় নেই)</option>
                <option value="housewife">গৃহিণী (পারিবারিক ভরণপোষণ, নিজস্ব আয় নেই)</option>
                <option value="unaware">আইন সম্পর্কে অজ্ঞতা ও অসচেতনতা</option>
                <option value="illness">অসুস্থতা বা প্রবাসে অবস্থানজনিত কারণ</option>
                <option value="custom">অন্যান্য কারণ (নিজে লিখুন)</option>
              </select>
            </div>

            {formData.presentStatus === 'custom' && (
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  নির্দিষ্ট কারণটি লিখুন
                </label>
                <textarea 
                  rows={2}
                  value={formData.customStatus}
                  onChange={(e) => setFormData({ ...formData, customStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-600 font-medium text-xs"
                  placeholder="যেমন: পারিবারিক জটিলতার কারণে এবং কোনো আয় না থাকায়..."
                />
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                বকেয়া করবর্ষসমূহ *
              </label>
              <input 
                type="text"
                value={formData.backlogYears}
                onChange={(e) => setFormData({ ...formData, backlogYears: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:outline-emerald-600 font-medium"
                placeholder="যেমন: ২০২৪-২০২৫ এবং ২০২৫-২০২৬"
              />
            </div>

            <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={formData.currentYearFiled}
                  onChange={(e) => setFormData({ ...formData, currentYearFiled: e.target.checked })}
                  className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
                />
                <span className="font-semibold text-xs text-slate-800">
                  চলতি করবর্ষের রিটার্ন অনলাইনে দাখিল করেছি
                </span>
              </label>
              <p className="text-[11px] text-slate-500 pl-6 leading-relaxed">
                (পরামর্শ: অনলাইনে চলতি রিটার্ন জমা দিয়ে Acknowledgement কপি যুক্ত করলে কর কর্মকর্তা দ্রুত জরিমানা মওকুফ করেন।)
              </p>
            </div>
          </div>
        </div>

        {/* Live Formal Bengali Application (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-300 shadow-md relative print:border-none print:shadow-none print:p-0">
            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-4 mb-6 print:hidden">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                  দরখাস্তের লাইভ প্রিভিউ
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                    copied 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100'
                  }`}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'কপি সম্পন্ন!' : 'দরখাস্ত কপি করুন'}</span>
                </button>

                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 px-3 py-2 rounded-xl text-xs font-bold transition-all"
                >
                  <Printer className="w-4 h-4 text-slate-600" />
                  <span>প্রিন্ট / PDF</span>
                </button>
              </div>
            </div>

            {/* Application Paper Rendering */}
            <div className="font-serif text-slate-900 leading-relaxed text-sm sm:text-base space-y-4 select-text bg-amber-50/20 p-4 sm:p-6 rounded-2xl border border-amber-200/50 print:bg-white print:border-none print:p-0">
              <div className="text-right text-xs text-slate-500 font-sans">
                {new Date().toLocaleDateString('bn-BD', { day: 'numeric', month: 'long', year: 'numeric' })}
              </div>

              <div className="space-y-0.5">
                <p>বরাবর,</p>
                <p className="font-bold">উপ-কর কমিশনার</p>
                <p>{formData.taxCircle || '[কর সার্কেল নম্বর]'}</p>
                <p>{formData.taxZone || '[কর অঞ্চল]'}</p>
              </div>

              <div className="font-bold pt-2 pb-1 border-b border-slate-300 text-slate-950">
                বিষয়: বিগত {formData.backlogYears} করবর্ষের বকেয়া আয়কর রিটার্ন গ্রহণ এবং আয়কর আইন, ২০২৩-এর ২৬৬ ধারা অনুযায়ী জরিমানা মওকুফের আবেদন।
              </div>

              <p>মহোদয়,</p>

              <p className="text-justify indent-6">
                বিনীত নিবেদন এই যে, আমি নিম্নস্বাক্ষরকারী <span className="font-bold underline decoration-dotted">{formData.applicantName}</span>, পিতা/স্বামী: <span className="font-bold">{formData.guardianName}</span>, ১২ ডিজিটের ই-টিআইএন নম্বর: <span className="font-bold tracking-wider">{formData.tinNumber}</span>, আপনার কর সার্কেলের একজন নিবন্ধিত করদাতা।
              </p>

              <p className="text-justify indent-6">
                আমি <span className="font-semibold text-emerald-950">{getReasonText()}</span>। বিগত {formData.backlogYears} করবর্ষে আমার বাৎসরিক আয় সরকারের নির্ধারিত করমুক্ত সীমার অনেক নিচে থাকায় এবং আয়কর আইন ও প্রক্রিয়া সম্পর্কে অজ্ঞতার কারণে নির্ধারিত কর দিবসের মধ্যে রিটার্ন দাখিল করা সম্ভবপর হয়নি। এটি সম্পূর্ণ আমার অনিচ্ছাকৃত মানবিক ভুল।
              </p>

              {formData.currentYearFiled && (
                <p className="text-justify indent-6">
                  উল্লেখ্য যে, একজন সচেতন ও দায়িত্বশীল নাগরিক হিসেবে আমি ইতোমধ্যে বর্তমান চলতি ({formData.currentYearName}) করবর্ষের আয়কর রিটার্ন জাতীয় রাজস্ব বোর্ডের অনলাইন e-Return পোর্টালে সফলভাবে দাখিল করেছি এবং তার অনলাইন প্রাপ্তি স্বীকারপত্রের (Acknowledgement Slip) কপি এই আবেদনের সাথে সংযুক্ত করেছি।
                </p>
              )}

              <p className="text-justify indent-6">
                অতএব, মহোদয়ের নিকট আমার বিনীত প্রার্থনা এই যে, আমার কোনো করযোগ্য আয় না থাকা এবং সার্বিক পরিস্থিতি মানবিক বিবেচনায় এনে, <span className="font-bold">আয়কর আইন, ২০২৩-এর ২৬৬ ধারা মোতাবেক কোনো প্রকার আর্থিক জরিমানা বা বিলম্ব সুদ ধার্য ব্যতিরেকে</span> আমার বিগত {formData.backlogYears} করবর্ষের বকেয়া শূন্য (জিরো) রিটার্ন ফরমসমূহ গ্রহণপূর্বক প্রাপ্তি স্বীকারপত্র প্রদান করে বাধিত করবেন।
              </p>

              <div className="pt-2">
                <p className="font-bold text-xs uppercase tracking-wider text-slate-700">সংযুক্তিসমূহ:</p>
                <ol className="list-decimal list-inside text-xs space-y-1 text-slate-700 mt-1">
                  <li>বিগত {formData.backlogYears} করবর্ষের পূরণকৃত পেপার আয়কর রিটার্ন ফরম (স্বাক্ষরিত)।</li>
                  {formData.currentYearFiled && <li>চলতি ({formData.currentYearName}) করবর্ষের অনলাইন e-Return প্রাপ্তি স্বীকারপত্রের কপি।</li>}
                  <li>১২ ডিজিটের ই-টিআইএন (e-TIN) সার্টিফিকেটের কপি।</li>
                  <li>জাতীয় পরিচয়পত্র (NID)-এর ফটোকপি।</li>
                </ol>
              </div>

              <div className="pt-8 flex justify-end">
                <div className="text-left text-xs space-y-1 font-sans">
                  <p>বিনীত নিবেদক,</p>
                  <p className="pt-4 border-b border-slate-400 w-48"></p>
                  <p className="font-bold text-sm text-slate-900">{formData.applicantName}</p>
                  <p>ই-টিআইএন: {formData.tinNumber}</p>
                  <p>মোবাইল: {formData.mobileNumber}</p>
                  <p>ঠিকানা: {formData.address}</p>
                </div>
              </div>
            </div>

            {/* Instructions box beneath the letter */}
            <div className="mt-6 bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs space-y-2 text-emerald-950 print:hidden">
              <div className="flex items-center gap-1.5 font-bold text-emerald-900">
                <AlertCircle className="w-4 h-4 text-emerald-700" />
                <span>কর অফিসে জমা দেওয়ার গুরুত্বপূর্ণ নিয়ম:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-emerald-800 leading-relaxed">
                <li>আবেদনপত্রের <strong>২টি কপি</strong> প্রিন্ট করবেন: ১ কপি কর সার্কেলে জমা দেবেন এবং অপর কপিতে কর্মকর্তার কাছ থেকে <strong>রিসিভ সিল ও তারিখ</strong> নিয়ে নিজের কাছে সংরক্ষণ করবেন।</li>
                <li>বকেয়া বছরগুলোর জন্য কাগজের রিটার্ন ফরমে আয়ের ঘরে "০" বা "Nil" লিখে স্বাক্ষর করবেন।</li>
                <li>সাধারণত ছাত্র, বেকার বা করমুক্ত আয়ের ব্যক্তিদের ক্ষেত্রে কর কর্মকর্তারা কোনো জরিমানা ছাড়াই বকেয়া রিটার্ন গ্রহণ করে নেন।</li>
              </ul>
            </div>
          </div>

          {/* Additional Action Links */}
          <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs print:hidden">
            <span className="text-slate-600">
              অনলাইনে চলতি রিটার্ন দিতে চান? অথবা পেপার ফরম ডাউনলোড করবেন?
            </span>
            <div className="flex items-center gap-2">
              <a 
                href="https://etaxnbr.gov.bd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 text-emerald-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-300"
              >
                <span>e-Return পোর্টাল</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <a 
                href="https://nbr.gov.bd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-3 py-1.5 rounded-lg border border-slate-300"
              >
                <span>এনবিআর ওয়েবসাইট</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
