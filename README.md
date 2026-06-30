# Kesab Kumar Nayak — Portfolio

A production-grade personal portfolio for **Kesab Kumar Nayak**, DevOps & Cloud Infrastructure Engineer.

Built with Next.js 14 (App Router), TypeScript strict mode, Tailwind CSS, and Framer Motion.

---

## Technology Stack

| Tool | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework + SSR |
| TypeScript (strict) | Type safety |
| Tailwind CSS | Styling |
| Framer Motion | Animations |
| React Hook Form + Zod | Form validation |
| Lucide React | Icons |
| next/font | Optimized Google Fonts |

---

## Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## Production Build

```bash
npm run build
npm start
```

---

## Deployment (Vercel)

1. Push this folder to GitHub
2. Import at vercel.com/new
3. Set root directory to `portfolio/` if deploying from parent folder
4. Deploy — Vercel auto-detects Next.js

**Environment Variables (optional — for contact form):**

```env
RESEND_API_KEY=re_...
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## Contact Form — Email Setup

The form is fully validated. To enable email delivery:

1. Sign up at resend.com (free: 3,000 emails/month)
2. Install: `npm install resend`
3. Uncomment the Resend block in `app/api/contact/route.ts`
4. Add `RESEND_API_KEY` to Vercel environment variables

---

## Folder Structure

```
portfolio/
├── app/
│   ├── api/contact/route.ts
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/   Navbar, Footer, Container, ScrollProgress
│   ├── sections/ Hero, About, Experience, Skills, Certifications, Education, CloudSnapshot, Contact
│   └── common/   SectionHeader, TechBadge
├── constants/index.ts
├── data/         experience.ts, skills.ts, certifications.ts, education.ts
├── hooks/        useIntersectionObserver, useReducedMotion, useScrollProgress, useMediaQuery
├── lib/utils.ts
├── types/index.ts
└── public/       favicon.svg, robots.txt, sitemap.xml, manifest.webmanifest
```

---

## Customization

- **Contact info** → `constants/index.ts`
- **Experience** → `data/experience.ts`
- **Skills** → `data/skills.ts`
- **Certifications** → `data/certifications.ts`
- **Education** → `data/education.ts`
- **Design tokens** → `app/globals.css` `:root`
- **Resume PDF** → Drop `resume.pdf` into `public/`

---

&copy; 2025 Kesab Kumar Nayak. All rights reserved.
