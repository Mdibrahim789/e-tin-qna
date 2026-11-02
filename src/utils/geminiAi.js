/**
 * Ultra-Fast Gemini AI Integration for Bangladesh Tax Assistant
 * - Directly answers to-the-point without greetings like "নমস্কার"
 * - Output is concise, clean, and directly answers what was asked
 * - Generates 2-3 clickable related/probable follow-up questions
 */

import { searchQnA } from './searchEngine.js';

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
  // Retrieve top 2 relevant verified questions from our database as factual grounding
  const relevantDocs = searchQnA(query, allQuestions).slice(0, 2);
  const response = await fetchWithTimeout('/api/ai', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      documents: relevantDocs.map((doc) => ({
        question: doc.questionBangla,
        answer: doc.shortAnswer,
        legalSection: doc.legalSection
      }))
    })
  }, 18000);

  if (!response.ok) throw new Error(`AI endpoint returned HTTP ${response.status}`);
  const data = await response.json();
  if (!data?.text) throw new Error('AI endpoint returned an empty response');

  return {
    status: 'matched',
    text: data.text.trim(),
    shortAnswer: data.text.trim(),
    matchedItem: relevantDocs[0] || null,
    sourceName: relevantDocs[0]?.sourceName || 'আয়কর আইন ২০২৩ ও জাতীয় রাজস্ব বোর্ড',
    sourceUrl: relevantDocs[0]?.sourceUrl || 'https://nbr.gov.bd',
    legalSection: relevantDocs[0]?.legalSection || 'সরকারি আয়কর বিধিমালা',
    modelUsed: data.model,
    isGemini: true
  };
}
