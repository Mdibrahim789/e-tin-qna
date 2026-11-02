const SYSTEM_PROMPT = `
তুমি "ট্যাক্স সহায়ক এআই": বাংলাদেশের ই-টিআইএন, অনলাইনে আয়কর রিটার্ন এবং ভ্যাট সংক্রান্ত তথ্য সহকারী।

নিয়ম:
১. সম্ভাষণ বা নিজের পরিচয় না দিয়ে সরাসরি উত্তর দাও।
২. উত্তর ২ থেকে ৪টি সংক্ষিপ্ত বাক্য বা বুলেটের মধ্যে রাখো।
৩. দেওয়া যাচাইকৃত তথ্যের বাইরে নির্দিষ্ট হার, সীমা, ধারা বা সময়সীমা বানিয়ে বলবে না।
৪. প্রশ্নটি বাংলাদেশের কর, ই-টিআইএন, রিটার্ন বা ভ্যাটের বাইরে হলে বিনয়ের সঙ্গে জানাও যে তুমি শুধু এই বিষয়গুলোতে সাহায্য করো।
৫. এটি সাধারণ তথ্য, পেশাদার আইনি বা কর পরামর্শ নয়। জটিল বিরোধ বা নোটিশে এনবিআর হেল্পলাইন ১৬৫৫৫ বা নিবন্ধিত কর আইনজীবীর পরামর্শ নিতে বলো।
৬. শেষে ২ থেকে ৩টি ছোট সম্পর্কিত প্রশ্ন এই ফরম্যাটে দাও:
<<<SUGGESTIONS>>>
- প্রশ্ন ১
- প্রশ্ন ২
`;

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

function cleanText(value, maxLength) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function buildPrompt(query, documents) {
  const context = documents.length
    ? documents.map((doc, index) => [
        `তথ্য ${index + 1}: ${doc.question}`,
        `যাচাইকৃত উত্তর: ${doc.answer}`,
        doc.legalSection ? `আইনি সূত্র: ${doc.legalSection}` : ''
      ].filter(Boolean).join('\n')).join('\n\n')
    : 'কোনো সরাসরি মিল পাওয়া যায়নি। নির্দিষ্ট সংখ্যা বা আইনের ধারা অনুমান করবে না।';

  return `যাচাইকৃত স্থানীয় তথ্য:\n${context}\n\nব্যবহারকারীর প্রশ্ন: ${query}`;
}

async function callGemini(apiKey, model, prompt) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 500
          }
        }),
        signal: controller.signal
      }
    );

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const message = data?.error?.message || `Gemini returned HTTP ${response.status}`;
      throw new Error(message);
    }

    const text = data?.candidates?.[0]?.content?.parts?.map((part) => part.text || '').join('').trim();
    if (!text) throw new Error('Gemini returned an empty response');
    return text;
  } finally {
    clearTimeout(timeout);
  }
}

export async function onRequestPost(context) {
  try {
    if (!context.env.GEMINI_API_KEY) {
      return json({ error: 'AI_NOT_CONFIGURED' }, 503);
    }

    const contentType = context.request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      return json({ error: 'JSON_REQUIRED' }, 415);
    }

    const contentLength = Number(context.request.headers.get('content-length') || 0);
    if (contentLength > 32768) return json({ error: 'REQUEST_TOO_LARGE' }, 413);

    const body = await context.request.json();
    const query = cleanText(body?.query, 500);
    if (!query) return json({ error: 'QUESTION_REQUIRED' }, 400);

    const documents = Array.isArray(body?.documents)
      ? body.documents.slice(0, 2).map((doc) => ({
          question: cleanText(doc?.question, 300),
          answer: cleanText(doc?.answer, 1200),
          legalSection: cleanText(doc?.legalSection, 200)
        })).filter((doc) => doc.question && doc.answer)
      : [];

    const model = cleanText(context.env.GEMINI_MODEL, 80) || 'gemini-2.5-flash-lite';
    const text = await callGemini(context.env.GEMINI_API_KEY, model, buildPrompt(query, documents));

    return json({ text, model });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(JSON.stringify({ event: 'gemini_request_failed', message }));
    return json({ error: 'AI_REQUEST_FAILED' }, 502);
  }
}

export function onRequest() {
  return json({ error: 'METHOD_NOT_ALLOWED' }, 405);
}
