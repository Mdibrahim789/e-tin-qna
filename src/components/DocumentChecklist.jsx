import React, { useState } from 'react';
import { 
  FolderCheck, 
  CheckCircle, 
  Printer, 
  Copy, 
  Check, 
  Briefcase, 
  Code, 
  Store, 
  GraduationCap, 
  Home, 
  Plane 
} from 'lucide-react';

const PERSONA_DOCS = {
  salaried: {
    id: 'salaried',
    name: 'চাকরিজীবী',
    icon: Briefcase,
    docs: [
      { id: 'sal-1', text: 'অফিস বা নিয়োগকর্তা থেকে প্রদত্ত বার্ষিক বেতন ও কর কর্তন সনদ (Salary & Tax Certificate)' },
      { id: 'sal-2', text: '১ জুলাই থেকে ৩০ জুন পর্যন্ত স্যালারি ব্যাংক অ্যাকাউন্টের পূর্ণাঙ্গ স্টেটমেন্ট' },
      { id: 'sal-3', text: 'ব্যাংক থেকে প্রদত্ত বার্ষিক সুদ ও উৎসে কর কর্তন সনদ (Interest & AIT Certificate)' },
      { id: 'sal-4', text: 'ডিপিএস (DPS) থাকলে ব্যাংকের জমার স্টেটমেন্ট বা ডিপোজিট রসিদ (কর রেয়াতের জন্য)' },
      { id: 'sal-5', text: 'জীবন বীমা (Life Insurance) প্রিমিয়াম প্রদানের রসিদ (যদি থাকে)' },
      { id: 'sal-6', text: 'পূর্ববর্তী করবর্ষের ট্যাক্স রিটার্ন জমার প্রাপ্তিস্বীকার পত্র (Acknowledgment Receipt)' },
      { id: 'sal-7', text: 'নিজ নামে থাকা সঞ্চয়পত্র ক্রয়ের প্রত্যয়নপত্র (যদি থাকে)' }
    ]
  },
  freelancer: {
    id: 'freelancer',
    name: 'ফ্রিল্যান্সার / আইটি পেশাজীবী',
    icon: Code,
    docs: [
      { id: 'fre-1', text: 'অনুমোদিত ব্যাংকিং চ্যানেলে রেমিট্যান্স আসার সনদ (Proceeds Realization Certificate - PRC)' },
      { id: 'fre-2', text: 'বাংলাদেশ ব্যাংক নির্ধারিত ফরম-সি (Form-C) অথবা ইনওয়ার্ড রেমিট্যান্স অ্যাডভাইস' },
      { id: 'fre-3', text: 'মার্কেটপ্লেস (Upwork, Fiverr ইত্যাদি) বা সরাসরি ক্লায়েন্টের ইনভয়েসের রেকর্ড' },
      { id: 'fre-4', text: 'সংশ্লিষ্ট ব্যাংক হিসাবের বার্ষিক পূর্ণাঙ্গ বিবরণী (Bank Statement)' },
      { id: 'fre-5', text: 'কাজের জন্য ব্যবহৃত কম্পিউটার বা হার্ডওয়্যার ক্রয়ের ভাউচার (ব্যবসায়িক খরচের জন্য)' },
      { id: 'fre-6', text: 'আইটিইএস (ITES) খাতের কর অব্যাহতি দাবির সমর্থনে প্রাসঙ্গিক চুক্তিনামা' }
    ]
  },
  businessman: {
    id: 'businessman',
    name: 'ব্যবসায়ী (স্বত্বাধিকারী)',
    icon: Store,
    docs: [
      { id: 'bus-1', text: 'হালনাগাদ ট্রেড লাইসেন্সের ফটোকপি' },
      { id: 'bus-2', text: 'ব্যবসার বার্ষিক আয়-ব্যয়, লাভ-ক্ষতির হিসাব এবং স্থিতিপত্র (Balance Sheet)' },
      { id: 'bus-3', text: 'ব্যবসার নামে পরিচালিত কারেন্ট ব্যাংক অ্যাকাউন্টের ১ বছরের পূর্ণ স্টেটমেন্ট' },
      { id: 'bus-4', text: '১৩ ডিজিটের ভ্যাট রেজিস্ট্রেশন সনদ (BIN) এবং মাসিক ভ্যাট রিটার্ন জমার কপি' },
      { id: 'bus-5', text: 'বকেয়া স্টক বা সমাপনী মজুদের তালিকা (Closing Stock Inventory)' },
      { id: 'bus-6', text: 'ব্যবসার দোকান বা গোডাউনের ভাড়ার চুক্তিপত্র ও রসিদ' }
    ]
  },
  student: {
    id: 'student',
    name: 'শিক্ষার্থী',
    icon: GraduationCap,
    docs: [
      { id: 'stu-1', text: 'জাতীয় পরিচয়পত্র (NID) অথবা বৈধ পাসপোর্ট নম্বর' },
      { id: 'stu-2', text: '১২ ডিজিটের ই-টিআইএন (e-TIN) সার্টিফিকেট কপি' },
      { id: 'stu-3', text: 'ব্যক্তিগত ব্যাংক বা বিকাশ অ্যাকাউন্টের বার্ষিক হিসাব বিবরণী' },
      { id: 'stu-4', text: 'টিউশনি বা পার্টটাইম কাজের বার্ষিক আনুমানিক আয়ের হিসাব' },
      { id: 'stu-5', text: 'বাইক থাকলে বিআরটিএ-এর ব্লু-বুক বা রেজিস্ট্রেশনের কপি' }
    ]
  },
  homemaker: {
    id: 'homemaker',
    name: 'গৃহিণী',
    icon: Home,
    docs: [
      { id: 'hom-1', text: 'জাতীয় পরিচয়পত্র (NID) ও ১২ ডিজিটের ই-টিআইএন সনদ' },
      { id: 'hom-2', text: 'সঞ্চয়পত্র ব্যুরো বা ব্যাংক থেকে প্রাপ্ত মুনাফা ও কর কর্তন প্রত্যয়নপত্র' },
      { id: 'hom-3', text: 'ব্যাংক হিসাবের ১ জুলাই থেকে ৩০ জুন পর্যন্ত স্টেটমেন্ট' },
      { id: 'hom-4', text: 'স্বামী বা পিতার নিকট থেকে হেবা বা উপহারসূত্রে টাকা পাওয়ার ব্যাংকিং রেকর্ড' },
      { id: 'hom-5', text: 'নামে ফ্ল্যাট বা জমি থাকলে সাব-কবলা দলিলের অনুলিপি' }
    ]
  },
  probashi: {
    id: 'probashi',
    name: 'প্রবাসী বাংলাদেশী (NRB)',
    icon: Plane,
    docs: [
      { id: 'pro-1', text: 'বৈধ বাংলাদেশী পাসপোর্ট এবং ভিসা / আকামা / ওয়ার্ক পারমিটের কপি' },
      { id: 'pro-2', text: 'বিদেশে অর্জিত আয় বৈধ ব্যাংকিং চ্যানেলে বাংলাদেশে পাঠানোর ব্যাংক প্রত্যয়ন' },
      { id: 'pro-3', text: 'বাংলাদেশে থাকা ব্যাংক হিসাব বা এফডিআরের বার্ষিক বিবরণী' },
      { id: 'pro-4', text: 'বাংলাদেশে জমি, ফ্ল্যাট বা সঞ্চয়পত্র থাকলে তার প্রামাণ্য নথি' },
      { id: 'pro-5', text: 'নন-রেসিডেন্ট ট্যাক্সপেয়ার হিসেবে পূরণকৃত বিবরণী' }
    ]
  }
};

export default function DocumentChecklist() {
  const [activePersona, setActivePersona] = useState('salaried');
  const [checkedItems, setCheckedItems] = useState({});
  const [copied, setCopied] = useState(false);

  const currentPersona = PERSONA_DOCS[activePersona] || PERSONA_DOCS.salaried;
  const docs = currentPersona.docs;

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = docs.filter(d => checkedItems[d.id]).length;

  const copyChecklist = () => {
    const listText = `ট্যাক্স রিটার্ন ডকুমেন্ট চেকলিস্ট (${currentPersona.name}):\n\n` +
      docs.map((d, i) => `${i + 1}. [${checkedItems[d.id] ? '✓' : ' '}] ${d.text}`).join('\n') +
      `\n\nউৎস: আয়কর আইন ২০২৩ ও এনবিআর নির্দেশিকা (ট্যাক্স সহায়ক বিডি)`;
    
    navigator.clipboard.writeText(listText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-5 sm:p-8 max-w-4xl mx-auto space-y-6">
      {/* Title */}
      <div className="space-y-2 text-center max-w-xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
          <FolderCheck className="w-3.5 h-3.5" />
          <span>স্মার্ট চেকলিস্ট টুল</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          ব্যক্তিগত ট্যাক্স ডকুমেন্ট চেকলিস্ট
        </h2>
        <p className="text-sm text-slate-600">
          আপনার পেশা সিলেক্ট করে দেখুন রিটার্ন জমা দেওয়ার পূর্বে কোন কোন ফাইল বা কাগজ হাতের কাছে প্রস্তুত রাখতে হবে।
        </p>
      </div>

      {/* Persona Selection Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none justify-start sm:justify-center">
        {Object.values(PERSONA_DOCS).map((item) => {
          const IconComponent = item.icon;
          const isSelected = activePersona === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePersona(item.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                isSelected
                  ? 'bg-emerald-700 text-white shadow-sm ring-2 ring-emerald-700/20'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>

      {/* Checklist Card */}
      <div className="bg-slate-50/70 rounded-2xl border border-slate-200 p-4 sm:p-6 space-y-4">
        {/* Progress Header */}
        <div className="flex items-center justify-between gap-3 flex-wrap border-b border-slate-200/80 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-800">
              {currentPersona.name}-দের জন্য আবশ্যক ডকুমেন্টস
            </span>
            <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
              {completedCount} / {docs.length} প্রস্তুত
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={copyChecklist}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              <span>{copied ? 'কপি হয়েছে!' : 'তালিকা কপি'}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-3 py-1.5 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-500" />
              <span>প্রিন্ট করুন</span>
            </button>
          </div>
        </div>

        {/* List of checkable items */}
        <div className="space-y-2.5">
          {docs.map((doc, idx) => {
            const isChecked = !!checkedItems[doc.id];
            return (
              <div
                key={doc.id}
                onClick={() => toggleCheck(doc.id)}
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer select-none transition-all ${
                  isChecked 
                    ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 font-medium' 
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-800'
                }`}
              >
                <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                  isChecked ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                }`}>
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
                <div className="text-xs sm:text-sm leading-relaxed">
                  <span className="font-semibold text-slate-500 mr-2">{idx + 1}.</span>
                  <span className={isChecked ? 'line-through text-slate-600' : ''}>{doc.text}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
