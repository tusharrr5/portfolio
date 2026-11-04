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
2. Save your photo as `images-src/me.jpg`. It gets cropped to 4:5 around the centre.
3. Run `npm run images`. This writes resized WebP files to `public/images/`.
4. In `site.ts`, set the project's `image`:
   ```ts
   image: { src: "/images/work/tohfa.webp", alt: "Tohfa home page showing featured gift boxes" },
   ```
   and your photo:
   ```ts
   photo: { src: "/images/me.webp", alt: "[Your name] at a desk", width: 960, height: 1200 },
   ```
   Use the base name (no `-640` suffix). The custom loader in `src/lib/image-loader.ts` picks the right size for each screen.

## 3. Setting up the contact form

The form posts straight from the browser, so it works on a static host. Pick one:

**Web3Forms (recommended, free)**
1. Go to https://web3forms.com, enter your email and copy the access key.
2. In Vercel: Project → Settings → Environment Variables → add `NEXT_PUBLIC_WEB3FORMS_KEY`.
3. Redeploy. Env vars are baked in at build time, so a redeploy is required.

**Formspree**
1. Create a form at https://formspree.io and copy the ID from `https://formspree.io/f/<ID>`.
2. Add `NEXT_PUBLIC_FORMSPREE_ID` in Vercel and redeploy. If both are set, Formspree is used.

For local testing, copy `.env.example` to `.env.local` and fill it in.

The form includes a hidden honeypot field (`botcheck`). Bots that fill it are shown a success message and nothing is sent. With no key set, the form shows its error state with your email address, so visitors can still reach you.

## 4. Deploying to Vercel

1. Push this folder to a GitHub repo.
2. On https://vercel.com/new, import the repo. Vercel detects Next.js. Keep the defaults.
3. Add the environment variables: `NEXT_PUBLIC_WEB3FORMS_KEY` and `NEXT_PUBLIC_SITE_URL` (your final URL, e.g. `https://yourname.dev`).
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

- **Palette:** paper `#F4F1EA`, ink `#1B1A17`, muted `#5C574E`, one vermilion accent `#B0391C`. Every text pair passes WCAG AA (lowest is accent on the darker paper at 4.9:1).
- **Type:** Instrument Serif for headlines, Geist for body text, Geist Mono for labels. All loaded with `next/font`, so there's no layout shift.
- **Motion:** content fades up gently as you scroll. With "reduce motion" turned on there's no animation, and without JS nothing is hidden.

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
- Lighthouse mobile on the local static build (with gzip): Performance 98–99, Accessibility 100, Best Practices 96, SEO 100. The 96 is only the analytics script returning 404 locally. Vercel serves that script.
- Form: success, error, honeypot and "Ask about this" preselect all tested with a mocked endpoint. Inputs are 16px.

---

## Placeholder checklist

Done: name, photo, WhatsApp, GitHub, LinkedIn, prices, projects, about, bug-fix window.

**Still to do**
- [ ] `links.email`: your work email (the only `[PLACEHOLDER]` left in `site.ts`)
- [ ] `NEXT_PUBLIC_WEB3FORMS_KEY` (or `NEXT_PUBLIC_FORMSPREE_ID`) in Vercel, then redeploy
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
