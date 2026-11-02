import { cleanText, generateAnswer, normalizeRequest } from '../../server/gemini.js';

const JSON_HEADERS = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff'
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: JSON_HEADERS });
}

export async function onRequestPost(context) {
  try {
    if (!context.env.GEMINI_API_KEY) return json({ error: 'AI_NOT_CONFIGURED' }, 503);
    const contentType = context.request.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return json({ error: 'JSON_REQUIRED' }, 415);
    const contentLength = Number(context.request.headers.get('content-length') || 0);
    if (contentLength > 32768) return json({ error: 'REQUEST_TOO_LARGE' }, 413);

    const { query, documents } = normalizeRequest(await context.request.json());
    if (!query) return json({ error: 'QUESTION_REQUIRED' }, 400);
    const model = cleanText(context.env.GEMINI_MODEL, 80) || 'gemini-2.5-flash-lite';
    const text = await generateAnswer(context.env.GEMINI_API_KEY, model, query, documents);
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
