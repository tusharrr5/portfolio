# Freelance portfolio

A single-page portfolio with case study pages. Built with Next.js 16 (App Router), TypeScript and Tailwind 4, exported as static HTML and deployed on Vercel.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static site in /out
npm run preview      # serve /out on http://localhost:4173
npm run lint
npm run images       # resize screenshots/photo into /public/images
npm run screenshots  # Playwright screenshots at 360–1440px into /screenshots (run build first)
```

---

## 1. Editing content

**Everything you'd want to change is in [`src/content/site.ts`](src/content/site.ts).** Text, links, projects, case studies, services, prices, FAQ and the contact form options all live there. You shouldn't need to open a component.

- Anything in `[SQUARE BRACKETS]` is a placeholder. Search the file for `[` to find them all.
- **Prices:** set `settings.showPrices` to `false` to hide every price on the site. Set each service's `priceFrom` to a number (e.g. `15000`). It shows as "From ₹15,000".
- **Projects:** `featured: true` shows a project on the home page and creates its `/work/<slug>/` page. Keep 3 or 4 featured. Order in the array is the order on the page.
- **Testimonials:** the section is hidden until `testimonials` has at least one entry. Only add real quotes, with permission.
- **Hero headline:** `hero.emphasis` is the part set in red italic. It must match text inside `hero.headline` exactly.
- **Calendly:** set `links.calendly` to show a "Book a call" button in the contact section. Leave it `""` to hide it.

## 2. Adding screenshots and your photo

1. Save full-size screenshots as `images-src/work/<slug>.png` (e.g. `images-src/work/tohfa.png`). Desktop screenshots at 1440px wide or more work best. They get cropped to 16:10 from the top, so every card matches.
2. Save your photo as `images-src/me.webp` (or `.png`/`.jpg`). It gets cropped square around the centre.
3. Run `npm run images`. This writes resized WebP files to `public/images/`.
4. In `site.ts`, set the project's `image`:
   ```ts
   image: { src: "/images/work/tohfa.webp", alt: "Tohfa home page showing featured gift boxes" },
   ```
   and your photo:
   ```ts
   photo: { src: "/images/me.webp", alt: "[Your name] at a desk", width: 640, height: 640 },
   ```
   Use the base name (no `-640` suffix). The custom loader in `src/lib/image-loader.ts` picks the right size for each screen.

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

`next.config.ts` uses `output: "export"`, so `/out` is plain HTML/CSS/JS and also works on Netlify, Cloudflare Pages or GitHub Pages.

## 5. What's where

```
src/content/site.ts        all content
src/app/layout.tsx         fonts, metadata, header/footer, analytics, JSON-LD
src/app/page.tsx           home page section order
src/app/work/[slug]/       case study pages
src/app/og.png/route.tsx   social share image, rendered at build time
src/app/sitemap.ts         sitemap.xml
src/app/robots.ts          robots.txt
src/app/globals.css        colour tokens, buttons, reveal animation
src/components/            UI pieces; sections/ holds the home page sections
scripts/                   image resizing, local server, screenshot checks
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

Done: name, photo, email, WhatsApp (form delivers there), GitHub, LinkedIn, prices, projects, about, bug-fix window.

**Still to do**
- [ ] Optional: `NEXT_PUBLIC_WEB3FORMS_KEY` in Vercel for an email copy of every enquiry, then redeploy
- [ ] `NEXT_PUBLIC_SITE_URL` in Vercel once you know the final URL
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
