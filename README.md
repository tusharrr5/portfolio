# Freelance portfolio

A single-page portfolio with case study pages and an admin panel at `/admin`. Built with Next.js 16 (App Router), TypeScript and Tailwind 4, and deployed on Vercel. Every page is prerendered as static HTML.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npm run preview      # serve the build on http://localhost:4173
npm run cms          # with `npm run dev`: edit content at localhost:3000/admin/ without logging in
npm run lint
npm run images       # resize screenshots/photo into /public/images
npm run screenshots  # Playwright screenshots at 360–1440px into /screenshots (run build first)
```

---

## 1. Editing content: the admin panel

Go to **https://tusharbhojwani.vercel.app/admin/**, sign in with GitHub and edit anything: profile and links, availability, hero text and numbers, projects and case studies, services and prices, process, about and skills, FAQ, testimonials and the contact form text.

Press **Publish → Publish now** to save. The admin commits the change to the GitHub repo, and Vercel rebuilds the site. It's live in about a minute.

Only GitHub accounts with write access to `tusharrr5/portfolio` can save. Anyone else who signs in gets an error and can't change anything.

**Tips**
- **Prices:** "Show prices" in *Profile, links & settings* hides every price at once. Prices are plain numbers in rupees (`20000` shows as "From ₹20,000").
- **Projects:** "Show on the home page" also creates the project's `/work/<url name>/` page. Keep 3 or 4 on. Drag to reorder; the first is the big featured card.
- **Testimonials:** the section stays hidden until you add one. Only real quotes, with permission.
- **Highlighted words** (hero and contact headings) must match words in the heading exactly, or be left empty.
- **Images:** upload in the admin (photo, project screenshots). Uploads go to `public/images/uploads/` and are used as-is, so keep them under about 500 KB. A wide (16:10) desktop screenshot works best for projects, a square image for your photo.

### One-time setup (so you can sign in)

The admin signs in through a GitHub OAuth App. Do this once:

1. Open https://github.com/settings/developers → **OAuth Apps** → **New OAuth App**.
2. Fill in:
   - **Application name:** `Portfolio admin`
   - **Homepage URL:** `https://tusharbhojwani.vercel.app`
   - **Authorization callback URL:** `https://tusharbhojwani.vercel.app/api/decap/callback/` (keep the `/` at the end)
3. Click **Register application**. Copy the **Client ID**, then click **Generate a new client secret** and copy it. You only see the secret once.
4. In Vercel → your project → **Settings → Environment Variables**, add:
   - `GITHUB_CLIENT_ID` = the Client ID
   - `GITHUB_CLIENT_SECRET` = the client secret
5. **Deployments → ⋯ → Redeploy.**
6. Open `/admin/`, click **Login with GitHub** and approve.

If you change your domain later, update both URLs in the OAuth App to the new domain.

### Editing on your computer

Run `npm run dev` and `npm run cms` in two terminals, then open http://localhost:3000/admin/. Changes are written straight to the files in `/content` with no login. Commit and push them yourself.

You can also edit the JSON files in `/content` by hand. `src/content/site.ts` loads them and fills in defaults for empty fields.

## 2. Adding screenshots and your photo

**Easy way:** upload them in the admin panel (see section 1).

**Fastest-loading way (on your computer):** this makes several sizes so phones download smaller files.
1. Save full-size screenshots as `images-src/work/<slug>.png` (e.g. `images-src/work/tohfa.png`). Desktop screenshots at 1440px wide or more work best. They get cropped to 16:10 from the top, so every card matches.
2. Save your photo as `images-src/me.webp` (or `.png`/`.jpg`). It gets cropped square around the centre.
3. Run `npm run images`. This writes resized WebP files to `public/images/`.
4. Set the image path in the admin or in `content/projects.json` / `content/profile.json`, using the base name with no `-640` suffix, e.g. `/images/work/tohfa.webp` or `/images/me.webp`. The loader in `src/lib/image-loader.ts` picks the right size for each screen.
5. Commit and push.

## 3. How the contact form works

**Enquiries go to your WhatsApp.** When someone submits the form, it opens WhatsApp (the app on phones, WhatsApp Web on computers) with a chat to `links.whatsapp` and their name, email, project type and message already typed in. They tap send and it arrives on your business number. There's no server and no API key, and it works on a static host.

The success screen tells them to tap send, and gives them an "Open WhatsApp" button and your email in case WhatsApp didn't open.

**Optional: an email copy of every enquiry.** Visitors sometimes open WhatsApp and never tap send. To still get their details by email:
1. Go to https://web3forms.com, enter `tusharbhojwani.in@gmail.com` and copy the access key.
2. In Vercel: Project → Settings → Environment Variables → add `NEXT_PUBLIC_WEB3FORMS_KEY` (or `NEXT_PUBLIC_FORMSPREE_ID` for Formspree).
3. Redeploy. Env vars are baked in at build time.

The email copy is sent in the background and never blocks the WhatsApp step. For local testing, copy `.env.example` to `.env.local`.

The form has a hidden honeypot field (`botcheck`). Bots that fill it see the success screen, and nothing opens or sends.

Why not fully automatic delivery to WhatsApp? That needs the paid WhatsApp Business API (through Meta or a provider like Twilio) plus a server to keep the token secret. A static site can't hold that safely, and the prefilled chat gets the message to the same number.

## 4. Deploying to Vercel

1. Push this folder to a GitHub repo.
2. On https://vercel.com/new, import the repo. Vercel detects Next.js. Keep the defaults.
3. Add the environment variable `NEXT_PUBLIC_SITE_URL` (your final URL, e.g. `https://yourname.dev`), and optionally `NEXT_PUBLIC_WEB3FORMS_KEY` for email copies of enquiries.
4. Deploy.
5. Turn on **Analytics** in the Vercel project's Analytics tab. The `<Analytics />` component is already installed.
6. Optional: add a custom domain under Settings → Domains, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

All pages are prerendered as static HTML. Only the two admin login routes (`/api/decap/auth` and `/api/decap/callback`) run as small serverless functions, which Vercel sets up automatically.

## 5. What's where

```
content/*.json             all content (edited by the admin panel)
src/content/site.ts        loads the JSON with types and defaults
src/cms/config.ts          admin panel forms
src/app/admin/route.ts     the /admin page
src/app/api/decap/         GitHub sign-in for the admin
src/app/layout.tsx         fonts, metadata, header/footer, analytics, JSON-LD
src/app/page.tsx           home page section order
src/app/work/[slug]/       case study pages
src/app/og.png/route.tsx   social share image, rendered at build time
src/app/sitemap.ts         sitemap.xml
src/app/robots.ts          robots.txt
src/app/globals.css        colour tokens, buttons, reveal animation
src/components/            UI pieces; sections/ holds the home page sections
scripts/                   image resizing, screenshot checks
```

## 6. Design notes

- **Theme:** cyberpunk, kept professional, with colours taken from the portrait. Deep navy (`#070C1A`), cyan accent (`#27DEF7`, from the React icon), warm orange (`#FF9F4A`, from the glowing ring) only for small tags and the portrait glow, mint for "available". Every text pair passes WCAG AA (most pass AAA).
- **Shape language:** cut-corner primary buttons, HUD corner brackets on key cards, square 2–4px corners, a dot-matrix backdrop and `// 01` mono section labels.
- **Type:** Chakra Petch for headlines and buttons, Geist for body text, Geist Mono for labels. All loaded with `next/font`.
- **Layout:** hero with an ID-card portrait and a live status panel; the first project as a wide featured card with the next two side by side; services as a pricing table with a recommended plan; a vertical process timeline beside a sticky heading; an `about.json` facts card; and one combined contact panel.
- **Portrait:** `images-src/me.webp` is your illustrated portrait. It is cropped square, so keep the face near the centre if you replace it. Run `npm run images` after changing it. The original photo is kept as `images-src/me-photo.webp`.
- **Motion:** gentle fade-up on scroll, turned off for "reduce motion".
- Colours live in `src/app/globals.css` under `:root`.

**What I took from the reference sites:**
- *akkila.dev:* the availability block with location, timezone, reply time and a live local clock.
- *mayank-rajput-portfolio:* putting the client first (services before the bio), live-link-first project cards, "Good for" on each service, and the project-type dropdown.
- *brittanychiang.com:* calm hierarchy with small mono metadata above each item.
- *paco.me / leerob.com:* restraint. Few colours, typography doing the work, short first-person copy.
- (jeznach.com didn't load because of a certificate error, so I couldn't use it.)

Layouts and copy are original. No text was copied.

## 7. Last checks (Nov 2026 build)

- `npm run build` and `npm run lint` both pass cleanly.
- No horizontal scroll at 360, 390, 430, 768, 1024 or 1440px (checked automatically by `npm run screenshots`).
- On a 390×844 phone, the hero headline, supporting line and primary button all show above the sticky bar.
- Lighthouse mobile on the local static build (with gzip): Performance 96–98, Accessibility 100, Best Practices 96, SEO 100. The 96 is only the analytics script returning 404 locally. Vercel serves that script.
- Form: opens WhatsApp to +91 92329 28771 with the enquiry filled in; success screen, honeypot and "Ask about this" preselect tested. Inputs are 16px.

---

## Placeholder checklist

Done: name, photo, email, site URL (tusharbhojwani.vercel.app), WhatsApp (form delivers there), GitHub, LinkedIn, prices, projects, about, bug-fix window.

**Still to do**
- [ ] Admin sign-in: create the GitHub OAuth App and add `GITHUB_CLIENT_ID` and `GITHUB_CLIENT_SECRET` in Vercel (see section 1)
- [ ] Optional: `NEXT_PUBLIC_WEB3FORMS_KEY` in Vercel for an email copy of every enquiry, then redeploy
- [ ] `links.calendly`: optional

**Projects (taken from github.com/tusharrr5)**
- Featured: **Bound**, **Course Management System**, **ShopSphere** (your 10 PRs).
- **FoodShare** is written up but hidden (`featured: false`), because its live site returned a 500 error on 4 Nov 2026. Fix the deployment, then set `featured: true` and add a screenshot.
- Tohfa, Real-Time Collaborative Workspace and ByteX aren't in your public repos. If they're private or have other names, send the links and they can replace or join these.
- Bound and ShopSphere have no live site, so they show a typeset panel instead of a screenshot. If you deploy a demo, set `live` and add `images-src/work/<slug>.png`.

**Prices (my suggestion, change freely)**
- Landing page from ₹8,000 · Business website from ₹20,000 · Custom app/store/AI from ₹45,000
- Set `settings.showPrices = false` to hide them all.

**Terms now on the site**
- Timelines: landing page 1–2 weeks, business site 2–4 weeks, custom 4–8 weeks
- Two rounds of revisions per stage
- 50 days of free bug fixes after launch
- 50% upfront, 50% before launch
