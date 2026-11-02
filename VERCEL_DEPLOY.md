<div align="center">

<img src="public/og-image.png" alt="ট্যাক্স সহায়ক বাংলাদেশ" width="100%" />

# Vercel Deployment Guide

### Vite frontend, secure Gemini function এবং production environment setup

[![Vercel](https://img.shields.io/badge/Vercel-Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://etin-umber.vercel.app/)
[![Gemini](https://img.shields.io/badge/Gemini-Server_Side-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](api/ai.js)
[![Live](https://img.shields.io/badge/Live-etin--umber.vercel.app-059669?style=for-the-badge)](https://etin-umber.vercel.app/)

</div>

> [!IMPORTANT]
> `GEMINI_API_KEY` কখনো frontend variable, source code, screenshot বা GitHub commit-এ রাখবেন না। Vercel Project Settings থেকে server-side environment variable হিসেবে যোগ করুন।

## কীভাবে কাজ করে

```text
Browser
  ├── Vite static site
  └── POST /api/ai
          │
          ▼
     Vercel Function
          │
          ├── GEMINI_API_KEY
          └── Google Gemini API
```

`/api/ai.js` Vercel Function হিসেবে চলে। Shared Gemini logic `/server/gemini.js`-এ রাখা হয়েছে, তাই Cloudflare এবং Vercel একই validation, grounding এবং response policy ব্যবহার করে। API key browser-এ যায় না।

## বর্তমান production site

- Live URL: [https://etin-umber.vercel.app/](https://etin-umber.vercel.app/)
- Production branch: `main`
- API route: `https://etin-umber.vercel.app/api/ai`

## GitHub থেকে নতুন project import

1. Vercel Dashboard-এ **Add New → Project** নির্বাচন করুন।
2. Git provider connect করে `Mdibrahim789/e-tin-qna` repository import করুন।
3. নিচের build settings নিশ্চিত করুন।

| Setting | Value |
| --- | --- |
| Framework Preset | `Vite` |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Production Branch | `main` |

## Gemini environment variables

Vercel project খুলে **Settings → Environment Variables**-এ যান।

| Name | Value | Environment |
| --- | --- | --- |
| `GEMINI_API_KEY` | Google AI Studio-এর নতুন API key | Production এবং প্রয়োজন হলে Preview |
| `GEMINI_MODEL` | `gemini-2.5-flash-lite` | Production এবং Preview |

`GEMINI_MODEL` optional। এটি না দিলে endpoint `gemini-2.5-flash-lite` ব্যবহার করে। Key যোগ বা পরিবর্তনের পরে **Deployments** থেকে latest deployment redeploy করুন। Environment variable পরিবর্তন পুরোনো deployment-এ স্বয়ংক্রিয়ভাবে প্রয়োগ হয় না।

> [!CAUTION]
> `VITE_GEMINI_API_KEY` নাম ব্যবহার করবেন না। `VITE_` prefix দেওয়া variable frontend bundle-এ প্রকাশ হতে পারে।

## Existing deployment আপডেট

বর্তমান `etin-umber.vercel.app` project-এর জন্য:

1. Project Settings-এ `GEMINI_API_KEY` এবং optional `GEMINI_MODEL` যোগ করুন।
2. Environment হিসেবে অন্তত **Production** নির্বাচন করুন।
3. GitHub-এর `main` branch-এ এই repository-এর সর্বশেষ commit আছে নিশ্চিত করুন।
4. **Deployments → latest deployment → Redeploy** নির্বাচন করুন।
5. redeploy শেষ হলে homepage এবং AI chat পরীক্ষা করুন।

## যাচাই

Browser-এ homepage খুলুন:

```text
https://etin-umber.vercel.app/
```

API route-এ সরাসরি GET request করলে নিচের response পাওয়া স্বাভাবিক:

```json
{ "error": "METHOD_NOT_ALLOWED" }
```

তারপর chat থেকে একটি tax-related প্রশ্ন পাঠান। সফল হলে response Vercel Function থেকে আসবে। Configuration ভুল বা Gemini unavailable হলে UI local verified answer ব্যবহার করবে।

## Local Vercel test

Project root-এ `.env.local` তৈরি করুন:

```dotenv
GEMINI_API_KEY=your_real_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
```

তারপর চালান:

```bash
npm install
npx vercel dev
```

`.env.local` commit করবেন না। এটি `.gitignore`-এর `.env*` rule দিয়ে বাদ দেওয়া আছে।

## Logs এবং troubleshooting

| সমস্যা | সমাধান |
| --- | --- |
| `503 AI_NOT_CONFIGURED` | Production environment-এ `GEMINI_API_KEY` যোগ করে redeploy করুন |
| `502 AI_REQUEST_FAILED` | Vercel Function Logs এবং Gemini key/model access পরীক্ষা করুন |
| `405 METHOD_NOT_ALLOWED` | `/api/ai` route শুধু POST request গ্রহণ করে |
| AI local answer দেখায় | browser Network tab এবং Vercel Function Logs পরীক্ষা করুন |
| নতুন variable কাজ করছে না | variable save করার পর নতুন deployment চালান |
| build failed | `npm run lint` এবং `npm run build` locally চালিয়ে error ঠিক করুন |

## Production checklist

- [ ] `main` branch সর্বশেষ commit-এ আছে
- [ ] Framework Preset `Vite`
- [ ] Output Directory `dist`
- [ ] `GEMINI_API_KEY` শুধু server-side environment variable
- [ ] Production redeploy সম্পন্ন
- [ ] Homepage, favicon এবং OG image load হয়
- [ ] `/api/ai` POST request কাজ করে
- [ ] Canonical URL `https://etin-umber.vercel.app/`
- [ ] Mobile এবং desktop UI পরীক্ষা করা হয়েছে

## আরও তথ্য

- Cloudflare Pages ব্যবহার করলে [DEPLOY.md](DEPLOY.md) অনুসরণ করুন।
- Vercel environment variables: https://vercel.com/docs/environment-variables
- Vercel Node.js Functions: https://vercel.com/docs/functions/runtimes/node-js

