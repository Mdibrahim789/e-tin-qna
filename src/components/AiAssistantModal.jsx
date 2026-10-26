import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ExternalLink, 
  ShieldAlert, 
  CheckCircle2, 
  BookMarked,
  RotateCcw,
  User,
  Key,
  Check,
  Zap,
  Info,
  ArrowUpRight
} from 'lucide-react';
import { askGroundedAssistant } from '../utils/groundedAi.js';
import { askGeminiAssistant, getStoredGeminiKey, saveGeminiKey } from '../utils/geminiAi.js';

export default function AiAssistantModal({ isOpen, onClose, allQuestions, onSelectQna }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "আসসালামু আলাইকুম! আমি ট্যাক্স সহায়ক এআই। বাংলাদেশের ই-টিআইএন (e-TIN), আয়কর রিটার্ন (eReturn) বা ভ্যাট সংক্রান্ত আপনার প্রশ্নটি লিখুন।",
      isWelcome: true
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [hasGeminiKey, setHasGeminiKey] = useState(false);
  const [keySavedToast, setKeySavedToast] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const key = getStoredGeminiKey();
    setHasGeminiKey(!!key);
    if (key) setApiKeyInput(key);
  }, [isOpen]);

  const testSampleQuestions = [
    "e-TIN কি?",
    "zero return kivabe dibo?",
    "কর দিবস কবে?",
    "নারীদের করমুক্ত সীমা কত?",
    "ব্যাংকে টাকা লেনদেন করলে কি নোটিশ আসবে?"
  ];

  const outsideDomainTests = [
    "বাংলাদেশ ক্রিকেট দলের অধিনায়ক কে?",
    "আমেরিকার ভিসা পেতে কি করতে হবে?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    saveGeminiKey(apiKeyInput);
    setHasGeminiKey(!!apiKeyInput.trim());
    setShowKeyModal(false);
    setKeySavedToast(true);
    setTimeout(() => setKeySavedToast(false), 3000);
  };

  const handleSendMessage = async (queryText) => {
    const q = (queryText || inputQuery).trim();
    if (!q) return;

    // Add user message
    const userMsg = {
      id: Date.now() + '-user',
      sender: 'user',
      text: q
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsTyping(true);

    try {
      if (hasGeminiKey) {
        try {
          const geminiResult = await askGeminiAssistant(q, allQuestions);
          const aiMsg = {
            id: Date.now() + '-ai',
            sender: 'ai',
            result: geminiResult,
            text: geminiResult.text,
            isGemini: true,
            modelUsed: geminiResult.modelUsed
          };
          setMessages((prev) => [...prev, aiMsg]);
          setIsTyping(false);
          return;
        } catch (geminiErr) {
          console.warn("Gemini API call failed, falling back to local grounded engine:", geminiErr);
        }
      }

      // Local grounded engine fallback
      setTimeout(() => {
        const result = askGroundedAssistant(q, allQuestions);
        const aiMsg = {
          id: Date.now() + '-ai',
          sender: 'ai',
          result: result,
          text: result.status === 'matched' ? result.shortAnswer : result.text,
          isGemini: false
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
      }, 300);

    } catch (err) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + '-ai',
          sender: 'ai',
          text: "দুঃখিত, উত্তর প্রসেস করতে সাময়িক সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
        }
      ]);
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "আসসালামু আলাইকুম! আমি ট্যাক্স সহায়ক এআই। বাংলাদেশের ই-টিআইএন, আয়কর রিটার্ন বা ভ্যাট সংক্রান্ত আপনার প্রশ্নটি লিখুন।",
        isWelcome: true
      }
    ]);
  };

  // Helper to parse message text and extract suggestions tag
  const parseMessageContent = (rawText = '') => {
    let mainText = rawText;
    let suggestions = [];

    // Strip out unwanted greetings like "নমস্কার!" or robotic introductions if any
    mainText = mainText.replace(/^(নমস্কার!?|নমস্কার\s*আদাব!?|আমি আপনার[^।\n]+[।\n]|হ্যালো!?)\s*/i, '');

    if (mainText.includes('<<<SUGGESTIONS>>>')) {
      const parts = mainText.split('<<<SUGGESTIONS>>>');
      mainText = parts[0].trim();
      suggestions = parts[1]
        .split('\n')
        .map(s => s.replace(/^[-*•\d.]+\s*/, '').trim())
        .filter(s => s.length > 3);
    }

    return { mainText, suggestions };
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full sm:max-w-xl h-[90vh] sm:h-[700px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white p-4 sm:p-4.5 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Bot className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base leading-tight">ট্যাক্স এআই সহকারী</h3>
                {hasGeminiKey ? (
                  <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <Zap className="w-3 h-3 fill-slate-950" />
                    Gemini AI সক্রিয়
                  </span>
                ) : (
                  <span className="text-[10px] font-semibold bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 px-1.5 py-0.2 rounded-full">
                    জিরো-হ্যালুসিনেশন
                  </span>
                )}
              </div>
              <p className="text-[11px] text-emerald-200">
                {hasGeminiKey 
                  ? "সংক্ষিপ্ত ও সরাসরি উত্তর এবং সম্ভাব্য প্রশ্ন জেনারেটর" 
                  : "শুধুমাত্র সরকারি ভেরিফাইড আইন ও সার্কুলার থেকে উত্তর দেয়"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowKeyModal(true)}
              className={`p-1.5 rounded-lg transition-colors flex items-center gap-1 text-xs ${
                hasGeminiKey ? 'bg-emerald-900 text-amber-300 hover:bg-emerald-950' : 'text-emerald-200 hover:bg-white/10'
              }`}
              title="Gemini API Key সেট করুন"
            >
              <Key className="w-4 h-4" />
            </button>
            <button
              onClick={clearChat}
              className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="চ্যাট হিস্ট্রি মুছুন"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
              title="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Gemini Key Status Notification Toast */}
        {keySavedToast && (
          <div className="bg-emerald-600 text-white px-4 py-2 text-xs flex items-center justify-between animate-in slide-in-from-top-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Check className="w-4 h-4" />
              Gemini API Key সফলভাবে আপডেট হয়েছে!
            </span>
            <button onClick={() => setKeySavedToast(false)}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Guardrail Disclaimer strip */}
        <div className="bg-emerald-50/90 border-b border-emerald-200 px-3.5 py-1.5 text-[11px] text-emerald-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>সরাসরি টু-দ্য-পয়েন্ট উত্তর ও পরবর্তী সম্ভাব্য প্রশ্নের লিংক নিচে দেখুন।</span>
          </div>
          {!hasGeminiKey && (
            <button 
              onClick={() => setShowKeyModal(true)}
              className="text-[10px] text-emerald-800 font-bold underline hover:text-emerald-950 ml-2 shrink-0"
            >
              + Gemini Key যোগ করুন
            </button>
          )}
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => {
            const { mainText, suggestions } = parseMessageContent(msg.text);

            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className={`w-7 h-7 rounded-lg text-white flex items-center justify-center shrink-0 mt-0.5 ${
                    msg.isGemini ? 'bg-amber-600' : 'bg-emerald-700'
                  }`}>
                    {msg.isGemini ? <Zap className="w-4 h-4 fill-white" /> : <Bot className="w-4 h-4" />}
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-emerald-700 text-white rounded-tr-xs'
                      : 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-tl-xs space-y-2.5'
                  }`}
                >
                  {/* Gemini Badge */}
                  {msg.isGemini && (
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold bg-amber-50 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full mb-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Gemini AI রেসপন্স</span>
                    </div>
                  )}

                  {/* Clean, to-the-point text answer */}
                  <div className="whitespace-pre-line font-normal">
                    {mainText}
                  </div>

                  {/* Dynamic Clickable Follow-up Suggestions generated for this answer */}
                  {suggestions.length > 0 && (
                    <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-500 block">
                        পরবর্তী সম্ভাব্য প্রশ্নসমূহ:
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {suggestions.map((sug, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSendMessage(sug)}
                            className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-1.5 rounded-xl transition-all text-left flex items-center justify-between group active:scale-98"
                          >
                            <span>{sug}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-emerald-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0 ml-1.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grounded source link if matched */}
                  {msg.result && msg.result.status === 'matched' && (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2 text-[11px] text-slate-500">
                      <span className="font-semibold text-emerald-800">
                        উৎস: {msg.result.sourceName} ({msg.result.legalSection})
                      </span>
                      {msg.result.matchedItem && (
                        <button
                          onClick={() => {
                            if (onSelectQna) onSelectQna(msg.result.matchedItem);
                            onClose();
                          }}
                          className="text-emerald-700 font-bold hover:underline inline-flex items-center gap-1"
                        >
                          <span>বিস্তারিত কার্ড দেখুন</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  )}

                  {/* If unmatched fallback */}
                  {msg.result && msg.result.status === 'unmatched' && (
                    <div className="p-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-900 text-xs flex items-start gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>এনবিআর হেল্পলাইন: ১৬৫৫৫ (16555) | ওয়েবসাইট: nbr.gov.bd</span>
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-xs text-slate-500 italic">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] text-slate-600">
                  {hasGeminiKey ? "Gemini AI সরাসরি উত্তর প্রস্তুত করছে..." : "সরকারি আইন ও ডাটাবেস যাচাই করা হচ্ছে..."}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Prompts Bar */}
        <div className="p-2.5 bg-slate-100 border-t border-slate-200 shrink-0 overflow-x-auto whitespace-nowrap space-x-1.5 scrollbar-none">
          <span className="text-[10px] font-bold text-slate-500 uppercase mr-1">দ্রুত প্রশ্ন:</span>
          {testSampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-300 px-2.5 py-1 rounded-full transition-colors"
            >
              {q}
            </button>
          ))}
          {outsideDomainTests.map((q, idx) => (
            <button
              key={'out-' + idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-2.5 py-1 rounded-full transition-colors"
              title="এআই গার্ডরেল টেস্ট"
            >
              [টেস্ট] {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="আপনার প্রশ্ন লিখুন (যেমন: zero return, psr ki, fine koto...)"
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition-all active:scale-95 shrink-0"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Gemini API Key Configuration Modal */}
      {showKeyModal && (
        <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
                  <Zap className="w-5 h-5 fill-amber-700 text-amber-700" />
                </div>
                <h4 className="font-bold text-slate-900 text-base">Gemini API সেটিংস</h4>
              </div>
              <button 
                onClick={() => setShowKeyModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Google Gemini API সংযুক্ত থাকলে এআই সহকারী টু-দ্য-পয়েন্ট ও প্রাসঙ্গিক উত্তর প্রদান করবে।
            </p>

            <form onSubmit={handleSaveApiKey} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800">
                  Google Gemini API Key:
                </label>
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  placeholder="AIzaSy... বা AQ..."
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:border-emerald-600"
                />
                <p className="text-[11px] text-slate-500 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-slate-400" />
                  কিটি শুধুমাত্র আপনার ব্রাউজারের লোকাল স্টোরেজে সুরক্ষিত থাকবে।
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                {hasGeminiKey && (
                  <button
                    type="button"
                    onClick={() => {
                      saveGeminiKey('');
                      setApiKeyInput('');
                      setHasGeminiKey(false);
                      setShowKeyModal(false);
                    }}
                    className="text-xs text-rose-600 hover:text-rose-800 font-semibold px-3 py-2"
                  >
                    কি মুছে ফেলুন
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setShowKeyModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl shadow-xs"
                >
                  সংরক্ষণ করুন
                </button>
              </div>
            </form>

            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-500">
              <span>এপিআই কি নেই? </span>
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-emerald-700 font-bold underline inline-flex items-center gap-1 ml-1"
              >
                <span>Google AI Studio থেকে বিনামূল্যে নিন</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
