import React, { lazy, Suspense, useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import DisclaimerBanner from './components/DisclaimerBanner';
import SearchBar from './components/SearchBar';
import CategoryChips from './components/CategoryChips';
import QnaCard from './components/QnaCard';
import DeadlineCountdown from './components/DeadlineCountdown';
import MythBusterSection from './components/MythBusterSection';
import MobileBottomNav from './components/MobileBottomNav';
import Footer from './components/Footer';

// Data & Utils
import qnaData from './data/qna.json';
import { searchQnA } from './utils/searchEngine';
import { 
  Sparkles, 
  Bot, 
  HelpCircle, 
  ShieldCheck, 
  ArrowRight,
  Layers
} from 'lucide-react';

const WaiverLetterGenerator = lazy(() => import('./components/WaiverLetterGenerator'));
const EligibilityChecker = lazy(() => import('./components/EligibilityChecker'));
const DocumentChecklist = lazy(() => import('./components/DocumentChecklist'));
const AiAssistantModal = lazy(() => import('./components/AiAssistantModal'));
const UpdatesPage = lazy(() => import('./pages/UpdatesPage'));
const SourcesPage = lazy(() => import('./pages/SourcesPage'));
const VerificationPage = lazy(() => import('./pages/VerificationPage'));

const categories = qnaData.categories || [];
const allQuestions = qnaData.questions || [];

function PageLoader() {
  return (
    <div className="min-h-48 grid place-items-center" role="status" aria-live="polite">
      <div className="flex items-center gap-2 text-sm font-semibold text-emerald-800">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-200 border-t-emerald-700" />
        পৃষ্ঠা প্রস্তুত হচ্ছে…
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Filter questions based on search query and selected category
  const filteredQuestions = useMemo(() => {
    let list = allQuestions;

    if (selectedCategory !== 'all') {
      list = list.filter((q) => q.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      list = searchQnA(searchQuery, list);
    }

    return list;
  }, [selectedCategory, searchQuery]);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: allQuestions.length };
    categories.forEach((cat) => {
      if (cat.id !== 'all') {
        counts[cat.id] = allQuestions.filter((q) => q.category === cat.id).length;
      }
    });
    return counts;
  }, []);

  const handleSelectQnaFromAi = (qnaItem) => {
    setActiveTab('home');
    setSelectedCategory('all');
    setSearchQuery(qnaItem.questionBangla);
    setTimeout(() => {
      const el = document.getElementById(qnaItem.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 200);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* Top Statutory Disclaimer Banner */}
      <DisclaimerBanner />

      {/* Main Navbar */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAiModal={() => setIsAiModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3.5 sm:px-6 lg:px-8 py-4 sm:py-10 pb-28 md:pb-12 space-y-8 sm:space-y-12 overflow-x-hidden">
        {activeTab === 'home' && (
          <div className="space-y-8 sm:space-y-12">
            {/* Hero Section */}
            <section className="text-center space-y-3 sm:space-y-4 pt-1 sm:pt-4">
              <div className="inline-flex items-center gap-2 bg-emerald-100/80 text-emerald-800 text-[11px] sm:text-sm font-semibold px-3 py-1.5 rounded-full border border-emerald-300/80 shadow-2xs">
                <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-700 shrink-0" />
                <span>১০০% প্রাথমিক সরকারি উৎস ও আয়কর আইন ২০২৩ ভিত্তিক</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.25] max-w-4xl mx-auto px-1">
                বাংলাদেশের <span className="text-emerald-700 underline decoration-emerald-300 decoration-wavy decoration-2">ই-টিআইএন, আয়কর রিটার্ন</span> ও ভ্যাট সহায়ক
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
                কোনো ট্যাক্স জ্ঞান না থাকলেও ১ মিনিটে বাংলায় খুঁজে নিন আপনার প্রশ্নের সুনির্দিষ্ট আইনানুগ উত্তর, করমুক্ত সীমা এবং ধাপে ধাপে নির্দেশিকা।
              </p>

              {/* Central Search Bar */}
              <div className="pt-2 sm:pt-4">
                <SearchBar 
                  searchQuery={searchQuery} 
                  setSearchQuery={setSearchQuery} 
                  onSelectSuggestion={(sugg) => {
                    setSelectedCategory('all');
                    setSearchQuery(sugg);
                  }}
                />
              </div>
            </section>

            {/* Countdown to Tax Day */}
            <section>
              <DeadlineCountdown />
            </section>

            {/* Special Emergency Advisory Banner for Backlog Taxpayers */}
            <section className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-teal-500/10 border-2 border-amber-300/80 rounded-3xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-3xl">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping"></span>
                  <span>জরুরি আইনি সমাধান • আয়কর আইন ২০২৩ ধারা ২৬৬</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-slate-900">
                  TIN সার্টিফিকেট করে বিপদে আছেন ভাবছেন? বিগত ২ বছর বা তার বেশি সময় রিটার্ন দেননি?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  আতঙ্কিত হওয়ার কিছু নেই! কোনো আয় না থাকলে করের পরিমাণ ০ টাকা (জিরো রিটার্ন)। চলতি বছর অনলাইনে জমা দিয়ে, উপ-কর কমিশনার বরাবর মওকুফ আবেদনসহ পেপার রিটার্ন জমা দিলে কোনো জরিমানা ছাড়াই সমস্যার সমাধান হয়।
                </p>
              </div>
              <button
                onClick={() => setActiveTab('waiver')}
                className="whitespace-nowrap bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-2xl shadow-sm transition-all flex items-center gap-2 self-stretch md:self-auto justify-center cursor-pointer"
              >
                <span>জরিমানা মওকুফ আবেদন তৈরি করুন</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </section>

            {/* Quick Action Cards Bar */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div 
                onClick={() => setActiveTab('waiver')}
                className="bg-white p-4 rounded-2xl border-2 border-amber-200 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">ধারা ২৬৬ মওকুফ</span>
                  <h2 className="text-sm font-bold text-slate-900 group-hover:text-amber-900">২ বছর রিটার্ন দেননি?</h2>
                </div>
                <ArrowRight className="w-5 h-5 text-amber-400 group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
              </div>

              <div 
                onClick={() => setActiveTab('eligibility')}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wide">ইন্টারঅ্যাক্টিভ চেকার</span>
                  <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800">আমার কি রিটার্ন দিতে হবে?</h2>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>

              <div 
                onClick={() => setActiveTab('checklist')}
                className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">ব্যক্তিগত গাইড</span>
                  <h2 className="text-sm font-bold text-slate-900 group-hover:text-teal-800">ডকুমেন্ট চেকলিস্ট তৈরি করুন</h2>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
              </div>

              <div 
                onClick={() => setIsAiModalOpen(true)}
                className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-2xl border border-emerald-200 hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                    জিরো-হ্যালুসিনেশন
                  </span>
                  <h2 className="text-sm font-bold text-slate-900 group-hover:text-emerald-900">ট্যাক্স এআই সহকারীর সাথে চ্যাট</h2>
                </div>
                <Bot className="w-5 h-5 text-emerald-700 group-hover:scale-110 transition-transform" />
              </div>
            </section>

            {/* QnA Section with Category Chips */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Layers className="w-6 h-6 text-emerald-700" />
                    <span>ভেরিফাইড প্রশ্নোত্তর সংকলন</span>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    {searchQuery ? `"${searchQuery}" এর জন্য অনুসন্ধান ফলাফল:` : 'সকল প্রশ্ন ও ধাপে ধাপে সমাধান:'}
                  </p>
                </div>

                <div className="text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1 rounded-full">
                  মোট {filteredQuestions.length}টি প্রশ্ন পাওয়া গেছে
                </div>
              </div>

              {/* Category Filter Chips */}
              <CategoryChips 
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(id) => {
                  setSelectedCategory(id);
                }}
                counts={categoryCounts}
              />

              {/* Questions Feed */}
              {filteredQuestions.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {filteredQuestions.map((q) => (
                    <QnaCard 
                      key={q.id} 
                      qna={q} 
                      onSelectCategory={(catId) => setSelectedCategory(catId)}
                    />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center space-y-3">
                  <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
                  <p className="text-base font-semibold text-slate-700">
                    কোনো প্রশ্নোত্তর খুঁজে পাওয়া যায়নি।
                  </p>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    আপনার সার্চ কিওয়ার্ড পরিবর্তন করুন অথবা আমাদের গ্রাউন্ডেড এআই সহকারীকে সরাসরি জিজ্ঞাসা করুন।
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="inline-flex text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200"
                  >
                    সকল প্রশ্ন পুনরায় দেখুন
                  </button>
                </div>
              )}
            </section>

            {/* Myth vs Reality Section */}
            <MythBusterSection />
          </div>
        )}

        {/* Tab: Penalty Waiver Letter Generator */}
        <Suspense fallback={<PageLoader />}>
        {activeTab === 'waiver' && (
          <WaiverLetterGenerator 
            onGoToQna={(catId) => {
              setActiveTab('home');
              setSelectedCategory(catId);
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab 2: Eligibility Checker Tool */}
        {activeTab === 'eligibility' && (
          <EligibilityChecker 
            onGoToQna={(catId) => {
              setActiveTab('home');
              setSelectedCategory(catId);
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          />
        )}

        {/* Tab 3: Document Checklist Tool */}
        {activeTab === 'checklist' && (
          <DocumentChecklist />
        )}

        {/* Tab 4: Latest NBR Updates */}
        {activeTab === 'updates' && (
          <UpdatesPage />
        )}

        {/* Tab 5: Official Law Sources & Mapping */}
        {activeTab === 'sources' && (
          <SourcesPage />
        )}

        {/* Tab 6: Quality & Verification Checklist */}
        {activeTab === 'verification' && (
          <VerificationPage />
        )}
        </Suspense>
      </main>

      {/* Floating AI Assistant Trigger Button (Desktop Only) */}
      <div className="fixed bottom-6 right-6 z-30 hidden md:block">
        <button
          onClick={() => setIsAiModalOpen(true)}
          className="group flex items-center gap-2.5 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 border-2 border-white/20 cursor-pointer"
          aria-label="Open AI Assistant Chat"
        >
          <div className="relative">
            <Bot className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping"></span>
          </div>
          <span className="font-bold text-sm tracking-wide">ট্যাক্স এআই</span>
        </button>
      </div>

      {/* Mobile Sticky Bottom Navigation Bar */}
      <MobileBottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenAiModal={() => setIsAiModalOpen(true)} 
      />

      {/* Grounded AI Assistant Modal */}
      {isAiModalOpen && (
        <Suspense fallback={null}>
          <AiAssistantModal
            isOpen={isAiModalOpen}
            onClose={() => setIsAiModalOpen(false)}
            allQuestions={allQuestions}
            onSelectQna={handleSelectQnaFromAi}
          />
        </Suspense>
      )}

      {/* Comprehensive Footer with Full Legal Disclaimer */}
      <Footer onNavigate={(tabId) => setActiveTab(tabId)} />
    </div>
  );
}
