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
  HelpCircle
} from 'lucide-react';
import { askGroundedAssistant } from '../utils/groundedAi';

export default function AiAssistantModal({ isOpen, onClose, allQuestions, onSelectQna }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: "আসসালামু আলাইকুম! আমি ট্যাক্স সহায়ক এআই। বাংলাদেশের ই-টিআইএন (e-TIN), অনলাইনে আয়কর রিটার্ন (e-Return), করের স্ল্যাব এবং ভ্যাট সংক্রান্ত যেকোনো প্রশ্ন বাংলায় বা বাংলিশে আমাকে জিজ্ঞাসা করতে পারেন।",
      isWelcome: true
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

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

  const handleSendMessage = (queryText) => {
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

    // Run grounded lookup
    setTimeout(() => {
      const result = askGroundedAssistant(q, allQuestions);

      const aiMsg = {
        id: Date.now() + '-ai',
        sender: 'ai',
        result: result,
        text: result.status === 'matched' ? result.shortAnswer : result.text
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 400);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: "আসসালামু আলাইকুম! আমি ট্যাক্স সহায়ক এআই। বাংলাদেশের ই-টিআইএন, আয়কর রিটার্ন বা ভ্যাট সংক্রান্ত যেকোনো প্রশ্ন জিজ্ঞাসা করুন।",
        isWelcome: true
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white w-full sm:max-w-xl h-[88vh] sm:h-[680px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white p-4 sm:p-4.5 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Bot className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base leading-tight">ট্যাক্স এআই সহকারী</h3>
                <span className="text-[10px] font-semibold bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 px-1.5 py-0.2 rounded-full">
                  জিরো-হ্যালুসিনেশন
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                শুধুমাত্র সরকারি ভেরিফাইড আইন ও সার্কুলার থেকে উত্তর দেয়
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
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

        {/* Guardrail Disclaimer strip */}
        <div className="bg-emerald-50/90 border-b border-emerald-200 px-3.5 py-1.5 text-[11px] text-emerald-950 flex items-center gap-1.5 shrink-0">
          <ShieldAlert className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
          <span>কঠোর নিয়ম: ডাটাবেসের বাইরের কোনো তথ্যে এআই আন্দাজে কোনো রেট বা ধারা বানাবে না।</span>
        </div>

        {/* Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-emerald-700 text-white rounded-tr-xs'
                    : 'bg-white border border-slate-200 text-slate-800 shadow-2xs rounded-tl-xs space-y-2.5'
                }`}
              >
                {/* Text answer */}
                <p>{msg.text}</p>

                {/* Grounded source link if matched */}
                {msg.result && msg.result.status === 'matched' && (
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    {msg.result.steps && msg.result.steps.length > 0 && (
                      <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1 text-xs">
                        <span className="font-bold text-slate-700 block">ধাপসমূহ:</span>
                        <ul className="list-disc pl-4 space-y-1 text-slate-600">
                          {msg.result.steps.slice(0, 3).map((st, i) => (
                            <li key={i}>{st}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center justify-between gap-2 text-[11px] text-slate-500 pt-1">
                      <span className="font-semibold text-emerald-800">
                        উৎস: {msg.result.sourceName}
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
          ))}

          {isTyping && (
            <div className="flex gap-2.5 items-center text-xs text-slate-500 italic">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] text-slate-600">সরকারি আইন ও ডাটাবেস যাচাই করা হচ্ছে...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Prompts */}
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
    </div>
  );
}
