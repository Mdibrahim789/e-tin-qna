import { cleanText, generateAnswer, normalizeRequest } from '../server/gemini.js';

function send(response, status, data) {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  return response.status(status).json(data);
}

export default async function handler(request, response) {
  if (request.method !== 'POST') return send(response, 405, { error: 'METHOD_NOT_ALLOWED' });
  if (!process.env.GEMINI_API_KEY) return send(response, 503, { error: 'AI_NOT_CONFIGURED' });
  const contentType = request.headers['content-type'] || '';
  if (!contentType.includes('application/json')) return send(response, 415, { error: 'JSON_REQUIRED' });
  const contentLength = Number(request.headers['content-length'] || 0);
  if (contentLength > 32768) return send(response, 413, { error: 'REQUEST_TOO_LARGE' });

  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body;
    const { query, documents } = normalizeRequest(body);
    if (!query) return send(response, 400, { error: 'QUESTION_REQUIRED' });
    const model = cleanText(process.env.GEMINI_MODEL, 80) || 'gemini-2.5-flash-lite';
    const text = await generateAnswer(process.env.GEMINI_API_KEY, model, query, documents);
    return send(response, 200, { text, model });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(JSON.stringify({ event: 'gemini_request_failed', message }));
    return send(response, 502, { error: 'AI_REQUEST_FAILED' });
  }
}
