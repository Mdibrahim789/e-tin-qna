# Cloudflare Pages deployment guide

এই প্রকল্পে Vite frontend-এর পাশাপাশি `/functions/api/ai.js` নামে একটি Cloudflare Pages Function আছে। Browser `/api/ai` endpoint-এ প্রশ্ন পাঠায়, আর Function Cloudflare secret থেকে Gemini key নিয়ে Google API call করে। `GEMINI_API_KEY` browser bundle-এ প্রকাশ হয় না।

## 1. Pages build settings

Cloudflare Dashboard থেকে `Workers & Pages` খুলে আপনার Pages project নির্বাচন করুন। Git repository হিসেবে `Mdibrahim789/e-tin-qna` এবং production branch হিসেবে `main` ব্যবহার করুন।

| Setting | Value |
| --- | --- |
| Framework preset | Vite |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | Repository root / blank |
| Node version | 20 or newer |

`functions` directory অবশ্যই repository root-এ থাকবে, `dist` বা `public`-এর ভেতরে নয়। Cloudflare Pages Git deployment এটি স্বয়ংক্রিয়ভাবে শনাক্ত করবে।

## 2. Gemini secret যোগ করুন

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) খুলুন।
2. `Workers & Pages` থেকে আপনার Pages project নির্বাচন করুন।
3. `Settings` → `Variables and Secrets` → `Add` নির্বাচন করুন।
4. Variable name দিন `GEMINI_API_KEY`।
5. Value হিসেবে Google AI Studio থেকে নেওয়া Gemini API key paste করুন।
6. `Encrypt` নির্বাচন করে `Save` করুন। Plain text variable হিসেবে রাখবেন না।
7. Production এবং Preview দুই environment-এ AI দরকার হলে দুই environment-এর জন্য secret যোগ করুন।

ঐচ্ছিকভাবে `GEMINI_MODEL` নামে একটি plain-text variable যোগ করতে পারেন। Default model `gemini-2.5-flash-lite`। অন্য model ব্যবহার করলে Google Gemini API-তে সেই model আপনার key-এর জন্য available কি না নিশ্চিত করুন।

Secret যোগ বা পরিবর্তনের পরে নতুন deployment চালাতে হবে। `Deployments` থেকে latest commit-এর পাশে `Retry deployment` দিন, অথবা repository-তে নতুন commit push করুন।

## 3. Deploy

Git integration আগে থেকেই active থাকলে `main` branch-এ push করলেই build এবং deploy শুরু হবে। Build log-এ frontend build-এর পাশাপাশি Pages Functions bundle তৈরি হয়েছে কি না দেখুন।

Deploy শেষ হলে নিচের URL পরীক্ষা করুন:

- Homepage: `https://YOUR-PROJECT.pages.dev/`
- AI endpoint method check: browser-এ `https://YOUR-PROJECT.pages.dev/api/ai` খুললে `METHOD_NOT_ALLOWED` JSON দেখাবে। এটি route কাজ করছে বোঝায়।
- UI থেকে AI chat খুলে একটি tax question করুন। Server AI ব্যর্থ হলেও local grounded answer দেখানো হবে।

## 4. Local Pages Function test

শুধু `npm run dev` চালালে Vite frontend চলবে, কিন্তু Pages Function চলবে না। পূর্ণ app পরীক্ষা করতে:

```bash
npm install
npm run build
```

Repository root-এ `.dev.vars` নামে untracked file তৈরি করুন:

```dotenv
GEMINI_API_KEY=your_real_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
```

তারপর চালান:

```bash
npx wrangler pages dev dist
```

Local site সাধারণত `http://localhost:8788`-এ চালু হবে। `.dev.vars` Git-এ commit করবেন না; project `.gitignore` এটি বাদ দেয়।

## 5. Troubleshooting

- `503 AI_NOT_CONFIGURED`: `GEMINI_API_KEY` secret অনুপস্থিত, ভুল environment-এ যোগ হয়েছে, অথবা secret যোগ করার পরে redeploy হয়নি।
- `502 AI_REQUEST_FAILED`: key invalid, model unavailable, Gemini quota শেষ, অথবা Google API সাময়িকভাবে ব্যর্থ। Cloudflare project-এর `Logs` পরীক্ষা করুন।
- `/api/ai` থেকে SPA HTML আসছে: `functions/api/ai.js` repository root-এর সঠিক path-এ নেই বা deployment Functions bundle তৈরি করেনি।
- Preview deployment-এ local answer আসে: Preview environment-এও আলাদা করে secret যোগ করুন।

## Security and privacy

- কোনো real API key `.env.example`, source code, Git commit, screenshot বা chat-এ রাখবেন না।
- পুরোনো frontend-এ প্রকাশিত Gemini key থাকলে Google AI Studio থেকে সেটি revoke করে নতুন key তৈরি করুন। Git history থেকে key মুছলেই পুরোনো key নিরাপদ হয় না।
- AI chat-এর প্রশ্ন Google Gemini API-তে পাঠানো হয়। ব্যবহারকারীদের NID, TIN, OTP, password, bank information বা অন্য sensitive information না লিখতে বলুন।
- API response cache করা হয় না এবং Function key কখনো client-কে ফেরত দেয় না।

Official Cloudflare references: [Pages Functions](https://developers.cloudflare.com/pages/functions/), [bindings and secrets](https://developers.cloudflare.com/pages/functions/bindings/), [local development](https://developers.cloudflare.com/pages/functions/local-development/).
