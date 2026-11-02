<div align="center">

<img src="public/og-image.png" alt="ট্যাক্স সহায়ক বাংলাদেশ deployment" width="100%" />

# Cloudflare Pages Deployment Guide

### Vite frontend, Pages Function এবং secure Gemini AI deployment

[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Vite](https://img.shields.io/badge/Vite-Production_Build-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Gemini](https://img.shields.io/badge/Gemini-Server_Side-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)

[![Branch](https://img.shields.io/badge/Branch-main-111827?style=flat-square&logo=git)](#)
[![Output](https://img.shields.io/badge/Output-dist-047857?style=flat-square)](#)
[![Function](https://img.shields.io/badge/API-%2Fapi%2Fai-0F766E?style=flat-square)](functions/api/ai.js)
[![Secret](https://img.shields.io/badge/Secret-GEMINI__API__KEY-16A34A?style=flat-square)](#)

[প্রথম ডেপ্লয়](#-প্রথমবার-deploy) · [Gemini secret](#-gemini-secret-যোগ-করুন) · [যাচাই](#-deployment-যাচাই) · [সমস্যা সমাধান](#-সমস্যা-সমাধান)

</div>

> [!IMPORTANT]
> `GEMINI_API_KEY` কখনো GitHub, `.env.example`, screenshot বা frontend environment variable-এ রাখবেন না। এটি Cloudflare-এর encrypted secret হিসেবে সংরক্ষণ করুন।

## Architecture

```text
Visitor browser
      │
      ├── Static UI ───────────────► Cloudflare Pages /dist
      │
      └── POST /api/ai ────────────► Pages Function
                                           │
                                           ├── GEMINI_API_KEY secret
                                           └── Google Gemini API
```

Frontend `/api/ai` endpoint-এ প্রশ্ন পাঠায়। `/functions/api/ai.js` Cloudflare runtime থেকে encrypted secret পড়ে Gemini API call করে। API key browser bundle বা network response-এ পাঠানো হয় না। Gemini unavailable হলে frontend স্থানীয় grounded answer ব্যবহার করে।

## প্রস্তুতি

Deploy করার আগে নিশ্চিত করুন:

- [ ] GitHub repository-তে সর্বশেষ code push করা হয়েছে
- [ ] `npm run lint` সফল
- [ ] `npm run build` সফল
- [ ] `/functions/api/ai.js` repository root-এর `functions` directory-তে আছে
- [ ] পুরোনো প্রকাশিত Gemini key revoke করা হয়েছে
- [ ] নতুন Gemini API key তৈরি করা হয়েছে

## প্রথমবার Deploy

### 1. Git repository সংযুক্ত করুন

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) খুলুন।
2. `Workers & Pages` নির্বাচন করুন।
3. `Create application` → `Pages` → `Connect to Git` নির্বাচন করুন।
4. GitHub account authorize করুন।
5. `Mdibrahim789/e-tin-qna` repository নির্বাচন করুন।
6. Production branch হিসেবে `main` নির্বাচন করুন।

### 2. Build configuration দিন

| Cloudflare setting | Value |
| --- | --- |
| Project name | আপনার পছন্দের unique নাম |
| Production branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | খালি রাখুন বা repository root |
| Node.js version | `20` বা নতুন |

> [!NOTE]
> `functions` directory `dist` বা `public`-এর ভেতরে সরাবেন না। Cloudflare repository root-এর `/functions` directory থেকে Pages Function bundle তৈরি করে।

### 3. প্রথম build চালান

`Save and Deploy` নির্বাচন করুন। Build log-এ dependency installation এবং Vite production build সফল হয়েছে কি না দেখুন। প্রথম deployment AI secret ছাড়াও UI deploy করতে পারবে; secret না থাকলে AI local fallback ব্যবহার করবে।

## Gemini secret যোগ করুন

1. Cloudflare Dashboard-এর `Workers & Pages` থেকে project খুলুন।
2. `Settings` → `Variables and Secrets` নির্বাচন করুন।
3. `Add` নির্বাচন করুন।
4. Variable name লিখুন `GEMINI_API_KEY`।
5. নতুন Gemini API key value paste করুন।
6. `Encrypt` নির্বাচন করুন।
7. Environment হিসেবে `Production` নির্বাচন করে save করুন।
8. Preview deployment-এ AI দরকার হলে Preview environment-এও একই secret আলাদাভাবে যোগ করুন।

ঐচ্ছিক model variable:

| Variable | Type | Value |
| --- | --- | --- |
| `GEMINI_API_KEY` | Encrypted secret | আপনার নতুন API key |
| `GEMINI_MODEL` | Plain text | `gemini-2.5-flash-lite` |

`GEMINI_MODEL` না দিলে Function স্বয়ংক্রিয়ভাবে `gemini-2.5-flash-lite` ব্যবহার করে। অন্য model দিলে সেই model আপনার Google project এবং API key-এর জন্য available হতে হবে।

Secret যোগ বা পরিবর্তনের পরে `Deployments` থেকে সর্বশেষ deployment retry করুন, অথবা `main` branch-এ নতুন commit push করুন।

## Deployment যাচাই

Deployment complete হলে নিচের checklist অনুসরণ করুন। `YOUR-PROJECT`-এর জায়গায় আপনার আসল Pages project name বসান।

### Homepage

```text
https://YOUR-PROJECT.pages.dev/
```

- [ ] Homepage load হচ্ছে
- [ ] Bengali font এবং responsive navigation ঠিক আছে
- [ ] Search এবং category filter কাজ করছে
- [ ] Q&A card expand হচ্ছে
- [ ] Mobile bottom navigation দৃশ্যমান

### Function route

Browser-এ খুলুন:

```text
https://YOUR-PROJECT.pages.dev/api/ai
```

Expected response:

```json
{"error":"METHOD_NOT_ALLOWED"}
```

এটি বোঝায় Pages Function route deploy হয়েছে। AI endpoint শুধুমাত্র `POST` request গ্রহণ করে।

### AI chat

AI chat খুলে একটি সাধারণ tax question করুন:

```text
e-TIN কী?
```

- [ ] Loading indicator দেখা যাচ্ছে
- [ ] Gemini answer ফিরে আসছে
- [ ] Source attribution দেখাচ্ছে
- [ ] Follow-up suggestions কাজ করছে
- [ ] Gemini ব্যর্থ হলে local grounded answer দেখা যাচ্ছে

### SEO assets

এই URLগুলো সরাসরি খুলে পরীক্ষা করুন:

```text
/favicon.svg
/og-image.png
/robots.txt
/sitemap.xml
/site.webmanifest
```

> [!WARNING]
> `index.html`, `robots.txt` এবং `sitemap.xml`-এ থাকা canonical domain অবশ্যই আপনার আসল `pages.dev` বা custom domain-এর সঙ্গে মিলতে হবে। Project URL আলাদা হলে deploy করার আগে সব URL update করুন।

## পরবর্তী deployment

Git integration active থাকলে প্রতিবার `main` branch-এ push করার পর Cloudflare স্বয়ংক্রিয় production deployment চালাবে।

```bash
git add .
git commit -m "your commit message"
git push origin main
```

Cloudflare Dashboard-এর `Deployments` tab থেকে build status, preview URL এবং production promotion দেখা যাবে।

## Custom domain

1. Pages project-এর `Custom domains` tab খুলুন।
2. `Set up a custom domain` নির্বাচন করুন।
3. আপনার domain লিখুন এবং DNS verification সম্পন্ন করুন।
4. HTTPS certificate active হওয়া পর্যন্ত অপেক্ষা করুন।
5. নিচের ফাইলগুলোতে canonical URL update করুন:

   - `index.html`
   - `public/robots.txt`
   - `public/sitemap.xml`

6. নতুন deployment চালান।

## Local full-stack পরীক্ষা

শুধু `npm run dev` চালালে Vite frontend চলে; Pages Function চলে না। Frontend এবং Function একসঙ্গে পরীক্ষা করতে:

### 1. Install এবং build

```bash
npm install
npm run build
```

### 2. Local secret তৈরি

Repository root-এ `.dev.vars` তৈরি করুন:

```dotenv
GEMINI_API_KEY=your_real_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
```

### 3. Pages development server চালান

```bash
npx wrangler pages dev dist
```

Local URL সাধারণত:

```text
http://localhost:8788
```

`.dev.vars` `.gitignore`-এ অন্তর্ভুক্ত আছে। তবুও commit করার আগে `git status` দেখে নিশ্চিত করুন secret file staged হয়নি।

## সমস্যা সমাধান

| সমস্যা | সম্ভাব্য কারণ | সমাধান |
| --- | --- | --- |
| `503 AI_NOT_CONFIGURED` | Secret অনুপস্থিত বা ভুল environment | `GEMINI_API_KEY` encrypted secret যোগ করে redeploy করুন |
| `502 AI_REQUEST_FAILED` | Invalid key, unavailable model, quota বা Google API error | Cloudflare Function logs এবং Google AI Studio quota পরীক্ষা করুন |
| `/api/ai` থেকে HTML আসে | Function route deploy হয়নি | `/functions/api/ai.js` path এবং build log পরীক্ষা করুন |
| Preview-তে শুধু local answer | Preview secret নেই | Preview environment-এ secret যোগ করুন |
| Homepage 404 | Output directory ভুল | Build output `dist` দিন |
| Refresh করলে 404 | SPA redirect অনুপস্থিত | `public/_redirects` deploy হয়েছে কি না পরীক্ষা করুন |
| OG image দেখা যায় না | Metadata domain বা image URL ভুল | Actual production domain দিয়ে `og:image` update করুন |
| Favicon পুরোনো | Browser/CDN cache | Hard refresh করুন এবং নতুন deployment verify করুন |

## Logs এবং debugging

Cloudflare Dashboard থেকে:

```text
Workers & Pages → Project → Logs
```

Function error log-এ secret value print করবেন না। বর্তমান Function শুধু structured error event এবং সাধারণ error message log করে।

## Security checklist

- [ ] `GEMINI_API_KEY` encrypted secret
- [ ] কোনো `VITE_GEMINI_API_KEY` নেই
- [ ] কোনো real key Git history-তে active নেই
- [ ] `.dev.vars` untracked
- [ ] AI response `Cache-Control: no-store`
- [ ] User input size সীমিত
- [ ] Sensitive data না লেখার privacy notice দৃশ্যমান
- [ ] Production এবং Preview secret আলাদা করে যাচাই

## Rollback

নতুন deployment-এ সমস্যা হলে Cloudflare Dashboard-এর `Deployments` tab থেকে আগের সফল deployment নির্বাচন করে rollback করুন। Rollback code deployment ফেরত নেয়; Cloudflare environment secrets পরিবর্তন করে না।

## Official documentation

- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Pages Functions](https://developers.cloudflare.com/pages/functions/)
- [Bindings and secrets](https://developers.cloudflare.com/pages/functions/bindings/)
- [Local development](https://developers.cloudflare.com/pages/functions/local-development/)
- [Google Gemini API](https://ai.google.dev/gemini-api/docs)

---

<div align="center">

Deployment শেষ হলে homepage, `/api/ai`, AI fallback এবং SEO assets একবার manual test করুন।

**[README](README.md) · [উপরে ফিরুন](#cloudflare-pages-deployment-guide)**

</div>
