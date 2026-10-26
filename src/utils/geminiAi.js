/**
 * Ultra-Fast Gemini AI Integration for Bangladesh Tax Assistant
 * - Directly answers to-the-point without greetings like "নমস্কার"
 * - Output is concise, clean, and directly answers what was asked
 * - Generates 2-3 clickable related/probable follow-up questions
 */

import { searchQnA } from './searchEngine.js';

const SYSTEM_PROMPT = `
তুমি "ট্যাক্স সহায়ক এআই": বাংলাদেশের ই-টিআইএন (e-TIN), অনলাইনে আয়কর রিটার্ন (eReturn) ও ভ্যাট সংক্রান্ত বিশেষজ্ঞ।

কঠোর নিয়মাবলী:
১. কোনোপ্রকার সম্ভাষণ বা নিজের পরিচয় দেবে না: "নমস্কার", "আদাব", "আমি অমুক": এসব কথা কখনো বলবে না। কোনো ভূমিকা ছাড়া প্রথম শব্দ থেকেই সরাসরি মূল উত্তর শুরু করবে।
২. টু-দ্য-পয়েন্ট ও সংক্ষিপ্ত উত্তর: ব্যবহারকারী ঠিক যা জানতে চেয়েছে, কেবল সেটুকুই ২ থেকে ৪টি বুলেট পয়েন্ট বা বাক্যে স্পষ্ট করে দেবে। কোনো অপ্রয়োজনীয় বড় রচনা লিখবে না।
৩. সরকারি আইনের ধারা উল্লেখ: আয়কর আইন ২০২৩-এর প্রাসঙ্গিক ধারা (যেমন: ধারা ১৬৬, ২৬১, ২৬৪, ২৬৬, ১৭১ ইত্যাদি) সংক্ষেপে উল্লেখ করবে।
৪. ২ বছর বা তদূর্ধ্ব বছর রিটার্ন না দিলে করণীয় ও আইনি কৌশল:
   - অনলাইনে e-Return পোর্টালে শুধু চলতি করবর্ষ দেওয়া যায়, বকেয়া বিগত বছর অনলাইনে দেওয়া যায় না।
   - ৩টি ধাপে সমাধান: (১) চলতি বছর অনলাইনে e-Return দিয়ে প্রাপ্তি স্বীকারপত্র নিন, (২) বকেয়া বছরগুলোর জন্য কাগজের রিটার্ন ফরম পূরণ করুন (আয় না থাকলে ০/Nil), (৩) আয়কর আইন ২০২৩-এর ২৬৬ ধারা মতে উপ-কর কমিশনার (DCT) বরাবর যৌক্তিক কারণে (ছাত্র/বেকার/গৃহিণী/আইন না জানা) জরিমানা মওকুফের লিখিত দরখাস্তসহ কর সার্কেলে সরাসরি জমা দিন। কোনো আয় না থাকলে কর্মকর্তা জরিমানা ছাড়াই গ্রহণ করেন।
   - ব্যবহারকারী যদি দরখাস্ত বা ফরম্যাট চায়, তবে উপ-কর কমিশনার বরাবর পূর্ণাঙ্গ বাংলা আবেদনপত্রের নমুনা খসড়া দেবে।
৫. উত্তরের শেষে বাধ্যতামূলকভাবে ব্যবহারকারীর পরবর্তী সম্ভাব্য ২-৩টি ছোট প্রাসঙ্গিক প্রশ্ন দেবে ঠিক নিচের ট্যাগ ফরম্যাটে:
<<<SUGGESTIONS>>>
- পরবর্তী সম্ভাব্য প্রশ্ন ১
- পরবর্তী সম্ভাব্য প্রশ্ন ২
- পরবর্তী সম্ভাব্য প্রশ্ন ৩
`;

export function getStoredGeminiKey() {
  if (typeof window !== 'undefined') {
    const localKey = localStorage.getItem('TAX_QNA_GEMINI_KEY');
    if (localKey && localKey.trim()) return localKey.trim();
  }
  const metaEnv = typeof import.meta !== 'undefined' ? import.meta.env?.VITE_GEMINI_API_KEY : '';
  const nodeEnv = typeof process !== 'undefined' ? process.env?.VITE_GEMINI_API_KEY : '';
  return metaEnv || nodeEnv || '';
}

// Fast fetch with timeout
async function fetchWithTimeout(url, options, timeoutMs = 6000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal
    });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function askGeminiAssistant(query, allQuestions = []) {
  const apiKey = getStoredGeminiKey();
  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  // Retrieve top 2 relevant verified questions from our database as factual grounding
  const relevantDocs = searchQnA(query, allQuestions).slice(0, 2);
  let contextSnippet = "";
  if (relevantDocs.length > 0) {
    contextSnippet = "\n[তথ্যসূত্র:]\n" + relevantDocs.map((doc, idx) => `
#${idx + 1}: ${doc.questionBangla} -> ${doc.shortAnswer} (আইন: ${doc.legalSection})
`).join('\n');
  }

  const promptWithContext = `${SYSTEM_PROMPT}
${contextSnippet}
ব্যবহারকারীর প্রশ্ন: "${query}"

সরাসরি ও সংক্ষেপে বাংলায় উত্তর দাও এবং শেষে <<<SUGGESTIONS>>> সহ ২-৩টি সম্পর্কিত প্রশ্ন দাও:`;

  // Fast models
  const fastModels = [
    'gemini-2.5-flash-lite',
    'gemini-2.5-flash',
    'gemini-flash-latest',
    'gemini-3.5-flash-lite'
  ];

  let lastError = null;

  for (const model of fastModels) {
    try {
      const response = await fetchWithTimeout(
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
              temperature: 0.1, // highly focused and deterministic
              maxOutputTokens: 500
            }
          })
        },
        12000 // 12s timeout per model for reliable completion
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
        throw new Error('Empty response');
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
      if (err.message && (err.message.includes('API_KEY_INVALID') || err.message.includes('API key not valid'))) {
        throw new Error('এআই সার্ভার সাময়িকভাবে সংযোগ বিচ্ছিন্ন, অনুগ্রহ করে পুনরায় চেষ্টা করুন।');
      }
    }
  }

  throw lastError || new Error('এআই উত্তর প্রদানে সাময়িক সমস্যা হয়েছে, অনুগ্রহ করে আবার চেষ্টা করুন।');
}
