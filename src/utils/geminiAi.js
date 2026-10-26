/**
 * Gemini AI Integration for Bangladesh Tax Assistant
 * Uses Google Gemini API (gemini-3.8-flash & gemini-3.5-flash-lite)
 * with Bangladesh Tax Laws grounding and NBR guidelines
 */

import { searchQnA } from './searchEngine.js';

const SYSTEM_PROMPT = `
তুমি "ট্যাক্স সহায়ক এআই" — বাংলাদেশে ই-টিআইএন (e-TIN), অনলাইনে আয়কর রিটার্ন (eReturn), করের স্ল্যাব, কর রেয়াত এবং ভ্যাট সম্পর্কিত একজন অত্যন্ত দক্ষ, নির্ভুল ও নির্ভরযোগ্য ভার্চুয়াল সহকারী।

তোমার নির্দেশনাবলী:
১. ভাষা: সহজ, প্রাঞ্জল ও সাধারণ মানুষের বোধগম্য বাংলা। কঠিন আইনি পরিভাষা এলে ব্র্যাকেটে সহজ ব্যাখ্যা দেবে (যেমন: "পিএসআর (Proof of Submission of Return - রিটার্ন জমার প্রমাণপত্র)")।
২. আইনগত ভিত্তি: উত্তর দেওয়ার সময় সর্বদা গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের "আয়কর আইন, ২০২৩", সংশ্লিষ্ট "অর্থ আইন", "মূল্য সংযোজন কর ও সম্পূরক শুল্ক আইন, ২০১২" এবং জাতীয় রাজস্ব বোর্ডের (NBR) অফিসিয়াল নির্দেশিকা মেনে চলবে। প্রযোজ্য ক্ষেত্রে ধারা উল্লেখ করবে (যেমন: ধারা ১৬৬, ধারা ২৬১, ধারা ২৬৪, ধারা ১৭১, ধারা ১৭৩, ধারা ১৭৪ ইত্যাদি)।
৩. মূল তথ্যাদি:
   - স্বাভাবিক ব্যক্তি করদাতার সাধারণ করমুক্ত সীমা: ৩,৫০,০০০ টাকা।
   - মহিলা ও ৬৫+ বছর বয়স্ক জ্যেষ্ঠ নাগরিক: ৪,০০,০০০ টাকা।
   - তৃতীয় লিঙ্গ ও প্রতিবন্ধী করদাতা: ৪,৭৫,০০০ টাকা।
   - গেজেটভুক্ত যুদ্ধাহত বীর মুক্তিযোদ্ধা: ৫,০০,০০০ টাকা।
   - কর স্ল্যাব: প্রথম ৩.৫ লাখে ০%, পরবর্তী ১ লাখে ৫%, পরবর্তী ৩ লাখে ১০%, পরবর্তী ৪ লাখে ১৫%, পরবর্তী ৫ লাখে ২০%, বাকি অংশে ২৫%।
   - ন্যূনতম কর: ঢাকা ও চট্টগ্রাম সিটি কর্পোরেশন ৫,০০০ টাকা; অন্যান্য সিটি কর্পোরেশন ৪,০০০ টাকা; জেলার জন্য ৩,০০০ টাকা।
   - কর দিবস: প্রতি বছর ৩০ নভেম্বর (ধারা ১৭১)।
   - বিলম্ব সুদ: কর দিবসের পর বকেয়া করের ওপর প্রতি মাসে ২% সরল সুদ (ধারা ১৭৪)।
৪. কঠোর সতর্কতা ও গার্ডরেল:
   - যদি কোনো প্রশ্ন সম্পূর্ণ অ-কর সংক্রান্ত হয় (যেমন: খেলাধুলা, ক্রিকেট, বিনোদন, চিকিৎসা, সাধারণ বিজ্ঞান, বিদেশী ভিসা, হ্যাকিং ইত্যাদি), তবে কোনো অনুমান না করে স্পষ্টভাবে বলবে:
     "এই বিষয়ে আমি নিশ্চিত নই। অনুগ্রহ করে এনবিআর অফিসিয়াল ওয়েবসাইট (nbr.gov.bd) বা একজন রেজিস্টার্ড ট্যাক্স আইনজীবীর সাথে যোগাযোগ করুন।"
   - কখনোই মনগড়া বা কাল্পনিক কোনো রেট, স্ল্যাব, তারিখ বা আইনি ধারা বানাবে না।
`;

export function getStoredGeminiKey() {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('TAX_QNA_GEMINI_KEY');
    if (localKey && localKey.trim()) return localKey.trim();
  }
  return import.meta.env?.VITE_GEMINI_API_KEY || '';
}

export function saveGeminiKey(key) {
  if (typeof window !== 'undefined') {
    if (key && key.trim()) {
      localStorage.setItem('TAX_QNA_GEMINI_KEY', key.trim());
    } else {
      localStorage.removeItem('TAX_QNA_GEMINI_KEY');
    }
  }
}

export async function askGeminiAssistant(query, allQuestions = []) {
  const apiKey = getStoredGeminiKey();
  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  // Retrieve top relevant verified questions from our database as factual grounding
  const relevantDocs = searchQnA(query, allQuestions).slice(0, 3);
  let contextSnippet = "";
  if (relevantDocs.length > 0) {
    contextSnippet = "\n\n[সংশ্লিষ্ট ভেরিফাইড ডাটাবেস তথ্যসূত্র:]\n" + relevantDocs.map((doc, idx) => `
উৎস #${idx + 1}:
প্রশ্ন: ${doc.questionBangla}
সংক্ষিপ্ত উত্তর: ${doc.shortAnswer}
আইনি ধারা: ${doc.legalSection} (${doc.sourceName})
ধাপসমূহ: ${(doc.stepByStepDetails || []).join('; ')}
`).join('\n');
  }

  const promptWithContext = `${SYSTEM_PROMPT}

${contextSnippet}

ব্যবহারকারীর বর্তমান প্রশ্ন: "${query}"

অনুগ্রহ করে উপরের আইন ও ভেরিফাইড তথ্যের আলোকে ব্যবহারকারীকে সঠিক, সুন্দর ও ধাপে ধাপে বাংলা উত্তর দিন:`;

  // Models to try (starting with the official recommended gemini-3.8-flash)
  const models = ['gemini-3.8-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite'];
  let lastError = null;

  for (const model of models) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: promptWithContext }]
              }
            ],
            generationConfig: {
              temperature: 0.2, // low temperature for maximum factual precision
              maxOutputTokens: 1024,
            }
          })
        }
      );

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        const errMsg = errJson?.error?.message || `HTTP ${response.status}`;
        throw new Error(errMsg);
      }

      const data = await response.json();
      const candidate = data.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error('Gemini API did not return text response.');
      }

      return {
        status: 'matched',
        text: text.trim(),
        shortAnswer: text.trim(),
        matchedItem: relevantDocs[0] || null,
        sourceName: relevantDocs[0]?.sourceName || 'আয়কর আইন ২০২৩ ও জাতীয় রাজস্ব বোর্ড',
        sourceUrl: relevantDocs[0]?.sourceUrl || 'https://nbr.gov.bd',
        legalSection: relevantDocs[0]?.legalSection || 'সরকারি আয়কর বিধিমালা',
        modelUsed: model,
        isGemini: true
      };
    } catch (err) {
      lastError = err;
      // If error is invalid API key, stop and alert user
      if (err.message && (err.message.includes('API_KEY_INVALID') || err.message.includes('API key not valid'))) {
        throw new Error('আপনার জেমিনি এপিআই কি (API Key) সঠিক নয়। অনুগ্রহ করে নতুন একটি কি ইনপুট দিন।');
      }
    }
  }

  throw lastError || new Error('Gemini API কল করতে সমস্যা হয়েছে।');
}
