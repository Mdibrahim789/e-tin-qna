# Deploy: Cloudflare Pages

## Settings
- Framework preset: Vite
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: repo root
- Node version: 20 (or the version in your Pages project settings)

## Steps
1. Cloudflare Dashboard → Pages → Create application → Pages → Connect to Git.
2. Select repository `Mdibrahim789/e-tin-qna`, branch `main`.
3. Enter the build command and output directory above, then Save and Deploy.
4. After the first deploy, check the live homepage, search, a QnA card, the AI assistant modal and the Sources page.
5. For a custom domain, add it in Pages → Custom domains and update `public/sitemap.xml` with the full live URL.

## Notes
- This is a static Vite + React site. There is no server or database to deploy.
- The AI assistant runs in the browser only, from `src/data/qna.json`. It does not send TIN, NID or any personal data anywhere.
- The `public/_redirects` file keeps single-page-app routing working on Cloudflare Pages.
- Do NOT deploy with unverified 2024 thresholds/slabs as current: see the re-verification note in README.md.
