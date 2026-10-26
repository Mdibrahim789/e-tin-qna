/**
 * Grounded AI Engine
 * Strictly answers ONLY from verified qna.json database.
 * Never hallucinates or invents figures/dates/sections.
 */

import { searchQnAWithScores } from './searchEngine.js';

const STRICT_FALLBACK_BANGLA = 
  "এই বিষয়ে আমি নিশ্চিত নই। অনুগ্রহ করে এনবিআর অফিসিয়াল ওয়েবসাইট (nbr.gov.bd) বা একজন রেজিস্টার্ড ট্যাক্স অ্যাডভাইজরের সাথে যোগাযোগ করুন।";

// Whole-word tax domain terms (exact word tokens or specific compounds, avoiding generic verb 'করা/করব')
const TAX_DOMAIN_TERMS = new Set([
  'tin', 'e-tin', 'etin', 'টিআইএন', 'ই-টিআইএন',
  'return', 'ereturn', 'রিটার্ন', 'ই-রিটার্ন', 'জিরো', 'zero',
  'vat', 'ভ্যাট', 'bin', 'বিআইএন', 'মূসক', 'mushak',
  'tax', 'ট্যাক্স', 'কর', 'আয়কর', 'করদাতা', 'করমুক্ত', 'করবর্ষ', 'করধাপ',
  'psr', 'পিএসআর', 'স্ল্যাব', 'slab', 'threshold', 'সীমা',
  'জরিমানা', 'সুদ', 'দণ্ড', 'fine', 'penalty', 'interest',
  'কর দিবস', 'tax day', 'deadline', 'সময়সীমা',
  'রেয়াত', 'rebate', 'ডিপিএস', 'dps', 'সঞ্চয়পত্র', 'বীমা',
  'নথি', 'ডকুমেন্ট', 'কাগজপত্র', 'checklist', 'বেতন', 'salary',
  'ফ্রিল্যান্সার', 'freelancer', 'রেমিট্যান্স', 'remittance',
  'অডিট', 'audit', 'আপিল', 'appeal', 'চালান', 'challan',
  'ট্রেড লাইসেন্স', 'trade license'
]);

// Excluded foreign jurisdictions, future predictions or unrelated topics
const EXCLUDED_PATTERNS = [
  'ভারত', 'india', 'জিএসটি', 'gst', 'সুইজারল্যান্ড', 'swiss', 'বিদেশী ব্যাংক',
  'আমেরিকা', 'ক্রিকেট', 'ফুটবল', 'ফিফা', 'ঔষধ', 'প্যারাসিটামল', 'ভিসা ফি',
  'ফেসবুক', 'হ্যাক', 'ট্রেন', 'লটারি', 'আইফোন', '২০৩০', '২০৩৫', '২০৪০'
];

export function askGroundedAssistant(query, allQuestions) {
  if (!query || !query.trim()) {
    return {
      status: 'error',
      text: "অনুগ্রহ করে আপনার ট্যাক্স বা ই-টিআইএন সম্পর্কিত প্রশ্নটি বাংলায় বা বাংলিশে লিখুন।",
      shortAnswer: "অনুগ্রহ করে আপনার ট্যাক্স বা ই-টিআইএন সম্পর্কিত প্রশ্নটি বাংলায় বা বাংলিশে লিখুন।",
      matchedItem: null,
      sourceUrl: null,
      section: null
    };
  }

  const cleanQuery = query.trim().toLowerCase();

  // Guardrail 1: Filter out excluded patterns (foreign systems, hacking, sports, future prediction)
  if (EXCLUDED_PATTERNS.some(p => cleanQuery.includes(p))) {
    return {
      status: 'unmatched',
      text: STRICT_FALLBACK_BANGLA,
      shortAnswer: STRICT_FALLBACK_BANGLA,
      matchedItem: null,
      sourceUrl: "https://nbr.gov.bd",
      section: "সরকারি যাচাই"
    };
  }

  // Guardrail 2: Query must contain at least one legitimate tax domain token as a whole word
  const words = cleanQuery.split(/[\s,?!।.]+/).filter(Boolean);
  const hasTaxDomainWord = words.some(w => TAX_DOMAIN_TERMS.has(w)) ||
    cleanQuery.includes('আয়কর') ||
    cleanQuery.includes('ই-টিআইএন') ||
    cleanQuery.includes('ই-রিটার্ন') ||
    cleanQuery.includes('জিরো রিটার্ন') ||
    cleanQuery.includes('ট্যাক্স') ||
    cleanQuery.includes('করমুক্ত') ||
    cleanQuery.includes('কর দিবস') ||
    cleanQuery.includes('কর রেয়াত');

  if (!hasTaxDomainWord) {
    return {
      status: 'unmatched',
      text: STRICT_FALLBACK_BANGLA,
      shortAnswer: STRICT_FALLBACK_BANGLA,
      matchedItem: null,
      sourceUrl: "https://nbr.gov.bd",
      section: "সরকারি যাচাই"
    };
  }

  // Guardrail 3: Perform substantive scoring against QnA database
  const scoredResults = searchQnAWithScores(cleanQuery, allQuestions);

  if (!scoredResults || scoredResults.length === 0) {
    return {
      status: 'unmatched',
      text: STRICT_FALLBACK_BANGLA,
      shortAnswer: STRICT_FALLBACK_BANGLA,
      matchedItem: null,
      sourceUrl: "https://nbr.gov.bd",
      section: "সরকারি যাচাই"
    };
  }

  const { item: bestMatch, score } = scoredResults[0];

  // Guardrail 4: Require high substantive match score
  if (score < 40) {
    return {
      status: 'unmatched',
      text: STRICT_FALLBACK_BANGLA,
      shortAnswer: STRICT_FALLBACK_BANGLA,
      matchedItem: null,
      sourceUrl: "https://nbr.gov.bd",
      section: "সরকারি যাচাই"
    };
  }

  // Build clean, grounded answer directly from the verified database
  return {
    status: 'matched',
    questionTitle: bestMatch.questionBangla,
    shortAnswer: bestMatch.shortAnswer,
    text: bestMatch.shortAnswer,
    steps: bestMatch.stepByStepDetails || [],
    checklist: bestMatch.checklist || [],
    matchedItem: bestMatch,
    sourceName: bestMatch.sourceName,
    sourceUrl: bestMatch.sourceUrl,
    legalSection: bestMatch.legalSection,
    lastVerifiedDate: bestMatch.lastVerifiedDate,
    disclaimer: "এই তথ্যটি সরকারি আইনের ধারা ও এনবিআর নির্দেশিকা অনুযায়ী সংগৃহীত।"
  };
}
