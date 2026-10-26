import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  ExternalLink, 
  ShieldAlert, 
  BookMarked,
  RotateCcw,
  User,
  ArrowUpRight
} from 'lucide-react';
import { askGroundedAssistant } from '../utils/groundedAi.js';
import { askGeminiAssistant } from '../utils/geminiAi.js';

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
      // First attempt fast online AI with preconfigured key
      try {
        const aiResult = await askGeminiAssistant(q, allQuestions);
        const aiMsg = {
          id: Date.now() + '-ai',
          sender: 'ai',
          result: aiResult,
          text: aiResult.text,
          modelUsed: aiResult.modelUsed
        };
        setMessages((prev) => [...prev, aiMsg]);
        setIsTyping(false);
        return;
      } catch (err) {
        console.warn("Online AI call failed, falling back to local grounded engine:", err);
      }

      // Fallback to local grounded engine
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

    // Strip out unwanted greetings like "নমস্কার!" or robotic introductions
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
      <div className="bg-white w-full sm:max-w-xl h-[94dvh] sm:h-[700px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-emerald-700 text-white p-4 sm:p-4.5 flex items-center justify-between shrink-0 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
              <Bot className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base leading-tight">ট্যাক্স এআই সহকারী</h3>
                <span className="text-[10px] font-bold bg-emerald-500/30 text-emerald-100 border border-emerald-400/30 px-2 py-0.5 rounded-full flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse"></span>
                  অনলাইন এআই সক্রিয়
                </span>
              </div>
              <p className="text-[11px] text-emerald-200">
                টু-দ্য-পয়েন্ট ও প্রাসঙ্গিক আইনি পরামর্শ এবং সম্ভাব্য প্রশ্ন
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
        <div className="bg-emerald-50/90 border-b border-emerald-200 px-3.5 py-1.5 text-[11px] text-emerald-950 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <span>সরাসরি টু-দ্য-পয়েন্ট উত্তর ও পরবর্তী সম্ভাব্য প্রশ্নের লিংক নিচে দেখুন।</span>
          </div>
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
                  <div className="w-7 h-7 rounded-lg text-white flex items-center justify-center shrink-0 mt-0.5 bg-emerald-700">
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
                  {/* Subtle AI Badge */}
                  {msg.sender === 'ai' && !msg.isWelcome && (
                    <div className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-50 text-emerald-900 border border-emerald-200 px-2 py-0.5 rounded-full mb-1">
                      <Sparkles className="w-3 h-3 text-emerald-600" />
                      <span>ট্যাক্স এআই উত্তর</span>
                    </div>
                  )}

                  {/* Clean, to-the-point text answer */}
                  <div className="whitespace-pre-line font-normal">
                    {mainText}
                  </div>

                  {/* Dynamic Clickable Follow-up Suggestions generated for this answer */}
                  {suggestions.length > 0 && (
                    <div className="pt-2.5 border-t border-slate-100 space-y-1.5">
                      <p className="text-[11px] font-bold text-slate-600 flex items-center gap-1">
                        <span>সম্পর্কিত সম্ভাব্য প্রশ্নসমূহ:</span>
                      </p>
                      <div className="flex flex-col gap-1.5">
                        {suggestions.map((sugg, sIdx) => (
                          <button
                            key={sIdx}
                            onClick={() => handleSendMessage(sugg)}
                            className="text-left text-xs bg-slate-50 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 border border-slate-200 hover:border-emerald-300 p-2 rounded-xl transition-all flex items-center justify-between group"
                          >
                            <span className="line-clamp-1">{sugg}</span>
                            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0 ml-1.5" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matched Source Attribution if available */}
                  {msg.result?.matchedItem && (
                    <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-1 text-[11px] text-slate-500">
                      <div className="flex items-center gap-1">
                        <BookMarked className="w-3 h-3 text-emerald-600" />
                        <span>সূত্র: {msg.result.matchedItem.sourceName || 'আয়কর আইন ২০২৩'}</span>
                      </div>
                      {msg.result.matchedItem.legalSection && (
                        <span className="font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                          {msg.result.matchedItem.legalSection}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-300 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex gap-2.5 items-center">
              <div className="w-7 h-7 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]"></span>
                <span className="text-[11px] text-slate-600">
                  ট্যাক্স এআই উত্তর প্রস্তুত করছে...
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Prompts Bar */}
        <div className="p-2.5 bg-slate-100 border-t border-slate-200 shrink-0 overflow-x-auto whitespace-nowrap space-x-1.5 no-scrollbar scroll-smooth">
          <span className="text-[10px] font-bold text-slate-500 uppercase mr-1">দ্রুত প্রশ্ন:</span>
          {testSampleQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-300 px-3 py-1.5 rounded-full transition-colors active:scale-95 shrink-0 cursor-pointer"
            >
              {q}
            </button>
          ))}
          {outsideDomainTests.map((q, idx) => (
            <button
              key={'out-' + idx}
              onClick={() => handleSendMessage(q)}
              className="text-xs bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 px-3 py-1.5 rounded-full transition-colors active:scale-95 shrink-0 cursor-pointer"
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
          className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0 safe-bottom"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="আপনার প্রশ্ন লিখুন (যেমন: zero return, psr ki...)"
            className="flex-1 bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-base sm:text-sm focus:outline-none focus:border-emerald-600 focus:bg-white focus:ring-2 focus:ring-emerald-500/10"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white p-2.5 rounded-xl transition-all active:scale-95 shrink-0 cursor-pointer"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
