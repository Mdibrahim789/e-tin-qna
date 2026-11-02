<div align="center">

<img src="public/og-image.png" alt="ট্যাক্স সহায়ক বাংলাদেশ" width="100%" />

<br />

<img src="public/favicon.svg" alt="ট্যাক্স সহায়ক লোগো" width="96" height="96" />

# ট্যাক্স সহায়ক বাংলাদেশ

### e-TIN, আয়কর রিটার্ন ও ভ্যাট সংক্রান্ত সহজ বাংলা তথ্য সহায়ক

[![Live Website](https://img.shields.io/badge/LIVE_WEBSITE-ভিজিট_করুন-047857?style=for-the-badge&logo=vercel&logoColor=white)](https://etin-umber.vercel.app/)
[![Repository](https://img.shields.io/badge/GITHUB-SOURCE_CODE-0F172A?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Mdibrahim789/e-tin-qna)

[![React](https://img.shields.io/badge/React-19-149ECA?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare-Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Live-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://etin-umber.vercel.app/)
[![Gemini](https://img.shields.io/badge/Google-Gemini_AI-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://ai.google.dev/)

[![Questions](https://img.shields.io/badge/Verified_Q%26A-78-047857?style=flat-square&labelColor=064E3B)](src/data/qna.json)
[![Categories](https://img.shields.io/badge/Categories-9-0D9488?style=flat-square&labelColor=134E4A)](src/data/qna.json)
[![Language](https://img.shields.io/badge/Language-বাংলা-F42A41?style=flat-square&labelColor=006A4E)](#)
[![Responsive](https://img.shields.io/badge/UI-Responsive-0284C7?style=flat-square&labelColor=0C4A6E)](#)
[![API Key](https://img.shields.io/badge/API_Key-Server_Side-16A34A?style=flat-square&labelColor=14532D)](functions/api/ai.js)

**বাংলা ও বাংলিশে খুঁজুন। যাচাইকৃত স্থানীয় তথ্য দেখুন। প্রয়োজন হলে নিরাপদ server-side AI সহায়তা নিন।**

[বৈশিষ্ট্য](#-মূল-বৈশিষ্ট্য) · [প্রযুক্তি](#-প্রযুক্তি) · [লোকাল সেটআপ](#-লোকাল-সেটআপ) · [ডেপ্লয়মেন্ট](#ডেপ্লয়মেন্ট) · [নিরাপত্তা](#-নিরাপত্তা-ও-প্রাইভেসি)

</div>

> [!IMPORTANT]
> এটি একটি স্বাধীন শিক্ষামূলক তথ্যসেবা। এটি জাতীয় রাজস্ব বোর্ডের অফিসিয়াল ওয়েবসাইট নয় এবং পেশাদার কর বা আইনি পরামর্শের বিকল্প নয়। জটিল ফাইল, অডিট বা বিরোধের ক্ষেত্রে এনবিআর হেল্পলাইন ১৬৫৫৫ অথবা নিবন্ধিত কর আইনজীবীর পরামর্শ নিন।

## পরিচিতি

ট্যাক্স সহায়ক বাংলাদেশ সাধারণ নাগরিকদের জন্য e-TIN, আয়কর রিটার্ন, eReturn, জিরো রিটার্ন, করমুক্ত সীমা, ট্যাক্স স্ল্যাব, ভ্যাট ও BIN সম্পর্কিত তথ্য সহজ বাংলায় উপস্থাপন করে। প্রতিটি প্রশ্নোত্তরের সঙ্গে সংক্ষিপ্ত উত্তর, ধাপে ধাপে নির্দেশনা, প্রয়োজনীয় কাগজপত্র, আইনের ধারা এবং সরকারি উৎস দেওয়ার চেষ্টা করা হয়েছে।

প্রকল্পটিতে বর্তমানে **৭৮টি প্রশ্নোত্তর** এবং **৯টি বিষয়ভিত্তিক ক্যাটাগরি** রয়েছে। বাংলা ইউনিকোডের পাশাপাশি সাধারণ বাংলিশ কিওয়ার্ডও সার্চ করা যায়।

## মূল বৈশিষ্ট্য

| সুবিধা | বিবরণ |
| --- | --- |
| বাংলা ও বাংলিশ সার্চ | `zero return`, `e-TIN kivabe khulbo`, `fine koto` এবং বাংলা প্রশ্ন সমর্থন করে |
| যাচাইকৃত Q&A | সংক্ষিপ্ত উত্তর, ধাপ, চেকলিস্ট, আইনের ধারা ও সরকারি উৎস |
| নিরাপদ Gemini AI | Vercel বা Cloudflare server function থেকে Gemini API call; key browser bundle-এ প্রকাশ হয় না |
| Local fallback | Gemini অনুপলভ্য হলে স্থানীয় grounded search উত্তর দেয় |
| রিটার্ন যোগ্যতা চেকার | আয় ও প্রযোজ্য শর্ত অনুযায়ী প্রাথমিক নির্দেশনা |
| ডকুমেন্ট চেকলিস্ট | চাকরি, ব্যবসা, ফ্রিল্যান্সিং, প্রবাস ও অন্যান্য পেশার জন্য কাস্টম তালিকা |
| মওকুফ আবেদন | ধারা ২৬৬ ভিত্তিক আবেদনপত্রের editable preview, copy ও print সুবিধা |
| আপডেট ও সূত্র | গুরুত্বপূর্ণ NBR আপডেট, আইনের ধারা ও source mapping |
| Mobile-first UI | ছোট পর্দার জন্য compact navigation, sticky actions ও responsive layout |
| SEO ready | Open Graph image, favicon, manifest, JSON-LD, sitemap এবং robots metadata |

## AI request flow

```text
User question
     │
     ▼
Local Q&A search and grounding
     │
     ▼
POST /api/ai
     │
     ▼
Vercel Function বা Cloudflare Pages Function
     │
     ▼
Google Gemini API
     │
     ├── Success: grounded AI answer
     └── Failure: local verified answer
```

Browser কখনো `GEMINI_API_KEY` পায় না। Secret শুধু নির্বাচিত hosting platform-এর server runtime থেকে পড়া হয়।

## প্রযুক্তি

| অংশ | প্রযুক্তি |
| --- | --- |
| Frontend | React 19, Vite 8 |
| Styling | Tailwind CSS 4 |
| Icons | Lucide React |
| AI | Google Gemini API |
| Server endpoint | Vercel Functions এবং Cloudflare Pages Functions |
| Hosting | Vercel বা Cloudflare Pages |
| Content | Local JSON datasets |
| Quality checks | Oxlint, Vite production build |

## প্রজেক্ট গঠন

```text
e-tin-qna/
├── api/
│   └── ai.js                  # Vercel Gemini endpoint
├── functions/
│   └── api/ai.js              # Cloudflare Gemini endpoint
├── server/
│   └── gemini.js              # Shared validation এবং Gemini logic
├── public/
│   ├── favicon.svg
│   ├── og-image.png
│   ├── robots.txt
│   ├── sitemap.xml
│   └── site.webmanifest
├── src/
│   ├── components/            # UI এবং interactive tools
│   ├── data/                  # Q&A, sources, myths এবং updates
│   ├── pages/                 # Updates, sources এবং verification
│   └── utils/                 # Search এবং AI clients
├── DEPLOY.md
├── VERCEL_DEPLOY.md
└── package.json
```

## লোকাল সেটআপ

### প্রয়োজনীয় সফটওয়্যার

- Node.js 20 বা নতুন
- npm

### Frontend চালু করুন

```bash
git clone https://github.com/Mdibrahim789/e-tin-qna.git
cd e-tin-qna
npm install
npm run dev
```

Vite development server সাধারণত `http://localhost:5173` ঠিকানায় চালু হবে। এই mode-এ Pages Function চলে না, তাই AI chat local fallback ব্যবহার করতে পারে।

### সম্পূর্ণ Pages Function পরীক্ষা

প্রথমে project root-এ `.dev.vars` ফাইল তৈরি করুন:

```dotenv
GEMINI_API_KEY=your_real_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
```

তারপর:

```bash
npm run build
npx wrangler pages dev dist
```

`.dev.vars` Git-এ commit করবেন না। এটি ইতোমধ্যে `.gitignore`-এ আছে।

## দরকারি কমান্ড

| Command | কাজ |
| --- | --- |
| `npm run dev` | Vite development server |
| `npm run build` | Production bundle তৈরি |
| `npm run preview` | Production build preview |
| `npm run lint` | Oxlint quality check |
| `npx wrangler pages dev dist` | Frontend এবং Pages Function একসঙ্গে চালানো |

## ডেপ্লয়মেন্ট

একই repository Vercel অথবা Cloudflare Pages-এ deploy করা যায়। দুই platform-এই `/api/ai` server-side endpoint ব্যবহার করে, তাই `GEMINI_API_KEY` browser bundle-এ প্রকাশ হয় না।

### Vercel deployment guide

বর্তমান production site: **[etin-umber.vercel.app](https://etin-umber.vercel.app/)**

#### ১. Repository import

1. [Vercel Dashboard](https://vercel.com/dashboard) থেকে **Add New → Project** নির্বাচন করুন।
2. GitHub account connect করে `Mdibrahim789/e-tin-qna` repository import করুন।
3. নিচের build settings নিশ্চিত করুন।

| Setting | Value |
| --- | --- |
| Framework Preset | `Vite` |
| Root Directory | `./` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Production Branch | `main` |

#### ২. Gemini environment variables

Project-এর **Settings → Environment Variables** খুলে নিচের variable যোগ করুন।

| Name | Value | Environment |
| --- | --- | --- |
| `GEMINI_API_KEY` | Google AI Studio-এর নতুন API key | Production এবং প্রয়োজন হলে Preview |
| `GEMINI_MODEL` | `gemini-2.5-flash-lite` | Production এবং Preview |

`GEMINI_MODEL` optional। API key যোগ বা পরিবর্তনের পরে **Deployments → latest deployment → Redeploy** নির্বাচন করুন। Variable পরিবর্তন পুরোনো deployment-এ প্রয়োগ হয় না।

> [!CAUTION]
> `VITE_GEMINI_API_KEY` ব্যবহার করবেন না। `VITE_` prefix দেওয়া variable frontend bundle-এ প্রকাশ হতে পারে।

#### ৩. Existing Vercel deployment আপডেট

`etin-umber.vercel.app` project-এর জন্য:

1. Production environment-এ `GEMINI_API_KEY` যোগ করুন।
2. GitHub-এর `main` branch-এ সর্বশেষ commit আছে নিশ্চিত করুন।
3. latest production deployment redeploy করুন।
4. homepage খুলে AI chat থেকে tax-related প্রশ্ন করুন।
5. `/api/ai`-এ সরাসরি GET করলে `{ "error": "METHOD_NOT_ALLOWED" }` পাওয়া স্বাভাবিক, কারণ endpoint শুধু POST গ্রহণ করে।

#### ৪. Local Vercel test

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

`.env.local` commit করবেন না।

### Cloudflare Pages deployment guide

#### ১. Git repository connect

1. Cloudflare Dashboard থেকে **Workers & Pages** খুলুন।
2. **Create → Pages → Connect to Git** নির্বাচন করুন।
3. `Mdibrahim789/e-tin-qna` repository এবং `main` branch নির্বাচন করুন।
4. নিচের build settings দিন।


| Setting | Value |
| --- | --- |
| Production branch | `main` |
| Framework preset | `Vite` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Root directory | Repository root |

#### ২. Gemini secret যোগ করুন

Cloudflare project-এর **Settings → Variables and Secrets** খুলুন।

| Name | Type | Value |
| --- | --- | --- |
| `GEMINI_API_KEY` | Encrypted secret | Google AI Studio-এর নতুন API key |
| `GEMINI_MODEL` | Plain text | `gemini-2.5-flash-lite` |

Production environment-এ secret যোগ করে নতুন deployment চালান। Preview deployment-এ AI পরীক্ষা করতে চাইলে Preview environment-এও আলাদাভাবে secret যোগ করুন।

#### ৩. Local Cloudflare test

Project root-এ `.dev.vars` তৈরি করুন:

```dotenv
GEMINI_API_KEY=your_real_gemini_api_key
GEMINI_MODEL=gemini-2.5-flash-lite
```

তারপর চালান:

```bash
npm run build
npx wrangler pages dev dist
```

`.dev.vars` commit করবেন না।

### Deployment troubleshooting

| সমস্যা | সমাধান |
| --- | --- |
| `503 AI_NOT_CONFIGURED` | সঠিক production environment-এ `GEMINI_API_KEY` যোগ করে redeploy করুন |
| `502 AI_REQUEST_FAILED` | Function logs, API key এবং model access পরীক্ষা করুন |
| `405 METHOD_NOT_ALLOWED` | `/api/ai` শুধু POST request গ্রহণ করে |
| AI local answer দেখায় | Browser Network tab এবং hosting platform-এর Function Logs দেখুন |
| নতুন variable কাজ করছে না | Variable save করার পরে নতুন deployment চালান |
| Build failed | Locally `npm run lint` এবং `npm run build` চালিয়ে error ঠিক করুন |

### Production checklist

- [ ] `main` branch-এ সর্বশেষ code আছে
- [ ] Build command `npm run build`
- [ ] Output directory `dist`
- [ ] `GEMINI_API_KEY` শুধু server-side secret
- [ ] Production redeploy সম্পন্ন
- [ ] Homepage, favicon এবং OG image load হয়
- [ ] AI chat এবং local fallback পরীক্ষা করা হয়েছে
- [ ] Canonical URL `https://etin-umber.vercel.app/`
- [ ] Mobile এবং desktop layout পরীক্ষা করা হয়েছে

আরও বিস্তারিত reference হিসেবে [Vercel guide](VERCEL_DEPLOY.md) এবং [Cloudflare guide](DEPLOY.md) repository-তে রাখা হয়েছে।

## নিরাপত্তা ও প্রাইভেসি

- Gemini API key শুধু server-side encrypted secret হিসেবে ব্যবহৃত হয়।
- API response cache করা হয় না।
- AI request সর্বোচ্চ ৫০০ অক্ষরের প্রশ্ন এবং ২টি প্রাসঙ্গিক Q&A context গ্রহণ করে।
- সাইট ব্যবহার করতে login, NID, TIN, OTP বা banking credential প্রয়োজন হয় না।
- AI chat-এর লেখা Google Gemini API-তে পাঠানো হয়। সেখানে সংবেদনশীল তথ্য লিখবেন না।
- পুরোনো বা প্রকাশিত API key থাকলে Google AI Studio থেকে revoke করে নতুন key তৈরি করুন।

## তথ্যসূত্র ও যাচাই

প্রকল্পের তথ্য প্রধানত নিচের উৎসগুলোর সঙ্গে মিলিয়ে প্রস্তুত করা হয়েছে:

- [জাতীয় রাজস্ব বোর্ড](https://nbr.gov.bd/)
- [NBR e-Return Portal](https://etaxnbr.gov.bd/)
- [ভ্যাট অনলাইন](https://vat.gov.bd/)
- [বাংলাদেশের আইন](http://bdlaws.minlaw.gov.bd/)
- আয়কর আইন, ২০২৩
- মূল্য সংযোজন কর ও সম্পূরক শুল্ক আইন, ২০১২

> [!CAUTION]
> করহার, করমুক্ত সীমা, সময়সীমা, পরিপত্র এবং portal procedure পরিবর্তিত হতে পারে। রিটার্ন দাখিল বা আর্থিক সিদ্ধান্তের আগে সর্বশেষ NBR নির্দেশনা যাচাই করুন।

## অবদান

ভুল তথ্য, পুরোনো source বা UI সমস্যা পেলে GitHub Issue খুলুন। পরিবর্তন প্রস্তাব করলে সংশ্লিষ্ট সরকারি source link এবং যাচাইয়ের তারিখ যুক্ত করুন।

1. Repository fork করুন
2. Feature branch তৈরি করুন
3. পরিবর্তন করুন এবং `npm run lint` ও `npm run build` চালান
4. পরিষ্কার commit message লিখুন
5. Pull request খুলুন

## রক্ষণাবেক্ষণ চেকলিস্ট

- [ ] নতুন Finance Act বা NBR circular প্রকাশ হলে thresholds যাচাই
- [ ] Question-level `lastVerifiedDate` আপডেট
- [ ] ভাঙা সরকারি link পরীক্ষা
- [ ] Production AI endpoint এবং fallback পরীক্ষা
- [ ] Sitemap, canonical URL এবং OG metadata যাচাই

---

<div align="center">

তথ্যকে সহজ, নিরাপদ ও নাগরিকবান্ধব করার একটি স্বাধীন উদ্যোগ।

**[উপরে ফিরুন](#ট্যাক্স-সহায়ক-বাংলাদেশ)**

</div>
