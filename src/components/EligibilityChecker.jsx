import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw,
  Info
} from 'lucide-react';

export default function EligibilityChecker({ onGoToQna }) {
  const [taxpayerCategory, setTaxpayerCategory] = useState('general'); // general, female_senior, disabled_third, freedom_fighter
  const [annualIncome, setAnnualIncome] = useState('');
  const [hasSpecialConditions, setHasSpecialConditions] = useState({
    hasCar: false,
    hasTradeLicense: false,
    hasCreditCard: false,
    hasBankLoan: false,
    hasCityProperty: false,
    hasSavingsCert: false,
    isGovtEmployee: false,
    hasCompanyShare: false
  });

  const [result, setResult] = useState(null);

  // Thresholds based on Finance Act 2024 & Income Tax Act 2023
  const thresholds = {
    general: 350000,
    female_senior: 400000,
    disabled_third: 475000,
    freedom_fighter: 500000
  };

  const handleConditionToggle = (key) => {
    setHasSpecialConditions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const calculateEligibility = (e) => {
    e.preventDefault();
    const income = parseFloat(annualIncome) || 0;
    const threshold = thresholds[taxpayerCategory] || 350000;
    
    // Check if any mandatory condition is checked
    const anyConditionSelected = Object.values(hasSpecialConditions).some(v => v === true);

    let verdict = '';
    let description = '';
    let type = ''; // taxable, zero, not_required

    if (income > threshold) {
      type = 'taxable';
      verdict = 'আপনার আয়কর রিটার্ন দাখিল বাধ্যতামূলক এবং কর প্রদেয় হবে';
      description = `আপনার বাৎসরিক আয় (৳${income.toLocaleString('en-IN')}) আপনার প্রযোজ্য করমুক্ত সীমা (৳${threshold.toLocaleString('en-IN')}) অতিক্রম করেছে। আয়কর আইন ২০২৩-এর ধারা ১৬৬ অনুযায়ী আপনাকে নিয়মিত রিটার্ন দাখিল করতে হবে এবং স্ল্যাব অনুযায়ী প্রযোজ্য কর পরিশোধ করতে হবে।`;
    } else if (anyConditionSelected) {
      type = 'zero';
      verdict = 'আপনাকে "জিরো রিটার্ন" (শূন্য কর) দাখিল করতে হবে';
      description = `আপনার আয় করমুক্ত সীমার (৳${threshold.toLocaleString('en-IN')}) নিচে থাকলেও, মোটরযান, ট্রেড লাইসেন্স, ক্রেডিট কার্ড বা নির্দিষ্ট সেবার সুবিধাভোগী হওয়ায় আয়কর আইন ২০২৩-এর ধারা ২৬৪ অনুযায়ী রিটার্ন জমার প্রমাণপত্র (PSR) পেতে আপনাকে অনলাইনে জিরো রিটার্ন জমা দিতে হবে। কোনো করের টাকা দিতে হবে না।`;
    } else if (income > 0 && income <= threshold) {
      type = 'not_mandatory_safe';
      verdict = 'আইনত রিটার্ন দাখিল বাধ্যতামূলক নয় (তবে ভবিষ্যৎ সুবিধার জন্য জিরো রিটার্ন দিতে পারেন)';
      description = `আপনার কোনো বিশেষ সেবা বা সম্পত্তি নেই এবং আয়ও করমুক্ত সীমার নিচে। তবে যদি আপনার পূর্বেই ই-টিআইএন খোলা থাকে, তবে যেকোনো আইনগত জটিলতা এড়াতে একটি জিরো রিটার্ন দাখিল করে রাখা সর্বোত্তম।`;
    } else {
      type = 'not_required';
      verdict = 'আপনার কোনো রিটার্ন বা টিআইএন প্রয়োজন নেই';
      description = `আপনার কোনো করযোগ্য আয় বা বিশেষ নাগরিক সেবা গ্রহণের বাধ্যবাধকতা নেই।`;
    }

    setResult({
      type,
      verdict,
      description,
      income,
      threshold,
      specialConditions: anyConditionSelected
    });
  };

  const resetForm = () => {
    setAnnualIncome('');
    setTaxpayerCategory('general');
    setHasSpecialConditions({
      hasCar: false,
      hasTradeLicense: false,
      hasCreditCard: false,
      hasBankLoan: false,
      hasCityProperty: false,
      hasSavingsCert: false,
      isGovtEmployee: false,
      hasCompanyShare: false
    });
    setResult(null);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-2 text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>১০০% ক্লায়েন্ট-সাইড: কোনো ব্যক্তিগত তথ্য সংরক্ষণ করা হয় না</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          "আমার কি রিটার্ন দিতে হবে?" যোগ্যতা যাচাইকারী
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed">
          আয়কর আইন ২০২৩-এর ধারা ১৬৬ ও ২৬৪ অনুযায়ী মাত্র ১ মিনিটে জেনে নিন আপনার রিটার্ন দেওয়া বাধ্যতামূলক কিনা এবং কর কত হতে পারে।
        </p>
      </div>

      {!result ? (
        <form onSubmit={calculateEligibility} className="space-y-6">
          {/* Step 1: Category */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-800">
              ১. আপনার করদাতার ধরন নির্বাচন করুন:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTaxpayerCategory('general')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  taxpayerCategory === 'general'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 font-medium'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-semibold text-sm">সাধারণ পুরুষ করদাতা</div>
                <div className="text-xs text-slate-500 mt-0.5">করমুক্ত আয়ের সীমা: ৩,৫০,০০০ টাকা</div>
              </button>

              <button
                type="button"
                onClick={() => setTaxpayerCategory('female_senior')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  taxpayerCategory === 'female_senior'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 font-medium'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-semibold text-sm">নারী অথবা ৬৫+ বছর বয়সী নাগরিক</div>
                <div className="text-xs text-slate-500 mt-0.5">করমুক্ত আয়ের সীমা: ৪,০০,০০০ টাকা</div>
              </button>

              <button
                type="button"
                onClick={() => setTaxpayerCategory('disabled_third')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  taxpayerCategory === 'disabled_third'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 font-medium'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-semibold text-sm">তৃতীয় লিঙ্গ বা প্রতিবন্ধী ব্যক্তি</div>
                <div className="text-xs text-slate-500 mt-0.5">করমুক্ত আয়ের সীমা: ৪,৭৫,০০০ টাকা</div>
              </button>

              <button
                type="button"
                onClick={() => setTaxpayerCategory('freedom_fighter')}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  taxpayerCategory === 'freedom_fighter'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/20 font-medium'
                    : 'border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="font-semibold text-sm">গেজেটভুক্ত যুদ্ধাহত বীর মুক্তিযোদ্ধা</div>
                <div className="text-xs text-slate-500 mt-0.5">করমুক্ত আয়ের সীমা: ৫,০০,০০০ টাকা</div>
              </button>
            </div>
          </div>

          {/* Step 2: Income input */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-800">
              ২. আপনার সম্ভাব্য বাৎসরিক মোট আয় লিখুন (টাকায়):
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 font-bold">৳</span>
              <input
                type="number"
                min="0"
                step="1000"
                value={annualIncome}
                onChange={(e) => setAnnualIncome(e.target.value)}
                placeholder="যেমন: 360000"
                className="w-full pl-9 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/10 text-base"
                required
              />
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Info className="w-3.5 h-3.5 text-slate-400" />
              ১ জুলাই থেকে ৩০ জুন পর্যন্ত অর্জিত সকল বেতন, ব্যবসা বা অন্যান্য আয়ের মোট যোগফল।
            </p>
          </div>

          {/* Step 3: Mandatory Conditions under Sec 264 */}
          <div className="space-y-3">
            <label className="block text-sm font-bold text-slate-800">
              ৩. নিচের কোনো সেবা বা সম্পদ কি আপনার রয়েছে? (প্রযোজ্যগুলো টিক দিন):
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {[
                { key: 'hasCar', label: 'মোটরগাড়ি বা জিপের মালিকানা (ব্যক্তিগত বা বাণিজ্যিক)' },
                { key: 'hasTradeLicense', label: 'সিটি কর্পোরেশন বা পৌরসভায় ট্রেড লাইসেন্স রয়েছে' },
                { key: 'hasCreditCard', label: 'ব্যাংকের ক্রেডিট কার্ড ব্যবহার করেন' },
                { key: 'hasBankLoan', label: '৫ লাখ টাকার বেশি ব্যাংক ঋণ গ্রহণ করেছেন' },
                { key: 'hasCityProperty', label: 'সিটি কর্পোরেশন বা পৌরসভায় বাড়ি/ফ্ল্যাট বা জমি আছে' },
                { key: 'hasSavingsCert', label: '৫ লাখ টাকার বেশি সঞ্চয়পত্র রয়েছে' },
                { key: 'isGovtEmployee', label: 'সরকারি কর্মকর্তা বা কর্মচারী (নির্দিষ্ট স্কেলভুক্ত)' },
                { key: 'hasCompanyShare', label: 'যেকোনো লিমিটেড কোম্পানির পরিচালক বা শেয়ারহোল্ডার' }
              ].map((item) => (
                <label
                  key={item.key}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer select-none text-xs sm:text-sm transition-all ${
                    hasSpecialConditions[item.key]
                      ? 'bg-emerald-50/70 border-emerald-400 text-emerald-950 font-medium'
                      : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={hasSpecialConditions[item.key]}
                    onChange={() => handleConditionToggle(item.key)}
                    className="mt-0.5 rounded-sm border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-8 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 text-base active:scale-95"
            >
              <span>ফলাফল যাচাই করুন</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      ) : (
        /* Result Display Card */
        <div className="space-y-6 animate-in fade-in-50 duration-200">
          <div className={`p-6 rounded-2xl border ${
            result.type === 'taxable' 
              ? 'bg-amber-50/70 border-amber-300 text-amber-950'
              : result.type === 'zero'
              ? 'bg-blue-50/70 border-blue-300 text-blue-950'
              : 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
          }`}>
            <div className="flex items-start gap-3.5">
              {result.type === 'taxable' ? (
                <AlertCircle className="w-7 h-7 text-amber-600 shrink-0 mt-0.5" />
              ) : result.type === 'zero' ? (
                <CheckCircle2 className="w-7 h-7 text-blue-600 shrink-0 mt-0.5" />
              ) : (
                <CheckCircle2 className="w-7 h-7 text-emerald-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-2">
                <h3 className="text-xl font-bold leading-tight">
                  {result.verdict}
                </h3>
                <p className="text-sm leading-relaxed text-slate-800">
                  {result.description}
                </p>
              </div>
            </div>

            {/* Quick summary points */}
            <div className="mt-5 pt-4 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">আপনার করমুক্ত সীমা:</span>
                <span className="font-bold text-slate-900 text-sm">৳{result.threshold.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">প্রদত্ত বাৎসরিক আয়:</span>
                <span className="font-bold text-slate-900 text-sm">৳{result.income.toLocaleString('en-IN')}</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-lg border border-slate-200">
                <span className="text-slate-500 block">আইনগত ভিত্তি:</span>
                <span className="font-bold text-slate-900 text-sm">ধারা ১৬৬ ও ২৬৪</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={resetForm}
              className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-medium text-sm py-2 px-4 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>পুনরায় নতুন তথ্য দিয়ে যাচাই করুন</span>
            </button>

            {onGoToQna && (
              <button
                onClick={() => onGoToQna(result.type === 'zero' ? 'zero-return' : 'return')}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium text-sm py-2.5 px-5 rounded-xl shadow-xs transition-all flex items-center gap-1.5"
              >
                <span>রিটার্ন জমা দেওয়ার নিয়ম দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
