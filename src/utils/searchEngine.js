/**
 * Custom search engine supporting Bangla Unicode and Banglish phonetic keyword matching
 * Includes strict stopword filtering to prevent false positive matches on out-of-domain queries
 */

// Common stopwords that should not trigger false domain matches
export const STOP_WORDS = new Set([
  'কে', 'কি', 'কী', 'হয়', 'হবে', 'কত', 'করে', 'থেকে', 'দিয়ে', 'কোন', 'কোনো',
  'আমার', 'আপনার', 'তার', 'বাংলাদেশ', 'দলের', 'বর্তমান', 'অধিনায়ক', 'খেতে', 'খাওয়া',
  'হয়েছে', 'উদ্ধার', 'করব', 'যাওয়া', 'যায়', 'যাবে', 'কোটিপতি', 'নিশ্চিত', 'ট্রেনের',
  'ভাড়া', 'দরদাম', 'বাজারদর', 'ফি', 'টাকা', 'bangladesh', 'er', 'ar', 'ki', 'koto',
  'ke', 'hobe', 'hoy', 'te', 'theke', 'kora', 'korbo', 'kore', 'the', 'is', 'in',
  'of', 'for', 'to', 'how', 'what', 'who', 'when', 'why', 'a', 'an', 'and', 'or', 'with'
]);

// Basic phonetic mappings for common Banglish queries
const BANGLISH_MAP = {
  'kivabe': 'কীভাবে',
  'keno': 'কেন',
  'kobe': 'কবে',
  'dibo': 'দিব',
  'khulbo': 'খুলব',
  'shunno': 'শূন্য',
  'fine': 'জরিমানা',
  'penalty': 'দণ্ড',
  'deadline': 'শেষ তারিখ',
  'last date': 'শেষ তারিখ',
  'tax day': 'কর দিবস',
  'threshold': 'করমুক্ত সীমা',
  'slab': 'করধাপ',
  'return': 'রিটার্ন',
  'tin': 'টিআইএন',
  'vat': 'ভ্যাট',
  'bin': 'বিআইএন',
  'rebate': 'রেয়াত'
};

export function searchQnAWithScores(query, items) {
  if (!query || !query.trim()) return items.map(item => ({ item, score: 0 }));

  const cleanQuery = query.trim().toLowerCase();
  const allTokens = cleanQuery.split(/[\s,?!।.]+/).filter(Boolean);
  
  // Meaningful substantive tokens (excluding stopwords)
  const substantiveTokens = allTokens.filter(t => !STOP_WORDS.has(t) && t.length > 1);

  // If user typed only stopwords (e.g. "বাংলাদেশ কি?" or "কে?"), return 0 score
  if (substantiveTokens.length === 0) {
    return [];
  }

  const scored = items.map((item) => {
    let score = 0;
    const titleBangla = (item.questionBangla || '').toLowerCase();
    const titleEnglish = (item.questionEnglish || '').toLowerCase();
    const shortAns = (item.shortAnswer || '').toLowerCase();
    const section = (item.legalSection || '').toLowerCase();
    const keywords = (item.banglishKeywords || []).map(k => k.toLowerCase());

    // 1. Exact match on question (full query)
    if (titleBangla.includes(cleanQuery)) score += 100;
    if (titleEnglish.includes(cleanQuery)) score += 90;

    // 2. Keyword exact match
    for (const kw of keywords) {
      if (kw === cleanQuery) score += 95;
      else if (kw.includes(cleanQuery)) score += 60;
    }

    // 3. Substantive Token-level matches only
    for (const token of substantiveTokens) {
      let matchedToken = false;

      if (titleBangla.includes(token)) {
        score += 40;
        matchedToken = true;
      }
      if (titleEnglish.includes(token)) {
        score += 35;
        matchedToken = true;
      }
      if (keywords.some(k => k.includes(token))) {
        score += 30;
        matchedToken = true;
      }
      if (section.includes(token)) {
        score += 50;
        matchedToken = true;
      }

      // Check Banglish mapping
      const mappedBangla = BANGLISH_MAP[token];
      if (mappedBangla) {
        if (titleBangla.includes(mappedBangla)) {
          score += 45;
          matchedToken = true;
        }
        if (keywords.some(k => k.includes(mappedBangla))) {
          score += 35;
          matchedToken = true;
        }
      }

      // Only search short answer if a substantive domain token matched
      if (matchedToken && shortAns.includes(token)) {
        score += 10;
      }
    }

    return { item, score };
  });

  return scored
    .filter((entry) => entry.score >= 30) // Require minimum substantive score
    .sort((a, b) => b.score - a.score);
}

export function searchQnA(query, items) {
  const scored = searchQnAWithScores(query, items);
  return scored.map(s => s.item);
}
