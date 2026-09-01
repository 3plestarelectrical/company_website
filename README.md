# 3ple Star Electrical Technology — Next.js Rebuild

Migrated from the static HTML site to Next.js (App Router) with a fully
custom, hand-built admin dashboard — no CMS platform, no UI component
library. Every form, table, and the blog editor is plain React + hand-written
CSS, talking to your own Postgres database.

## Stack

- **Next.js 15** (App Router) on Vercel
- **Postgres** (Neon or Supabase recommended) via plain `pg` — no ORM
- **Auth.js** (credentials provider) for `/admin` login only — the public
  site has no auth
- **Vercel Blob** for image uploads
- **Resend** for email notifications on new inquiries

## Project structure

```
app/
  sitemap.ts        → auto-generated sitemap.xml (static pages + posts + products)
  robots.ts         → robots.txt, disallows /admin and /api from indexing
  (site)/          → public pages (home, about, services, training,
                      contact, blog, catalog) — has Header/Footer
  admin/
    login/          → login page, no sidebar
    (dashboard)/    → everything else under /admin — has the sidebar shell
  api/              → NextAuth route + image upload route
components/         → Header, Footer, ContactForm, and all admin components
  admin/
    blog-editor/    → the custom block-based post editor
lib/                → db.ts, auth.ts, posts.ts, products.ts, email.ts, blocks.ts
context/            → EditorDirtyContext (unsaved-changes tracking)
types/blocks.ts      → the block content model for blog posts
scripts/            → schema.sql, migrate.ts, seed-admin.ts
```

## Local setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up Postgres.** Create a free database on [Neon](https://neon.tech)
   or [Supabase](https://supabase.com), copy the connection string.

3. **Environment variables** — copy `.env.example` to `.env` and fill in:
   ```bash
   cp .env.example .env
   ```
   - `NEXT_PUBLIC_SITE_URL` — your production domain, used by `sitemap.xml`
     and `robots.txt` (defaults to the current Vercel preview URL if unset)
   - `DATABASE_URL` — your Postgres connection string
   - `AUTH_SECRET` — generate with `npx auth secret`
   - `RESEND_API_KEY` — from [resend.com](https://resend.com) (free tier is
     fine to start)
   - `NOTIFY_EMAIL` — where inquiry notifications get sent
   - `BLOB_READ_WRITE_TOKEN` — only needed for local dev; Vercel sets this
     automatically once you add a Blob store to your project

4. **Run the database migration**
   ```bash
   npm run db:migrate
   ```
   This applies `scripts/schema.sql`. Safe to re-run.

5. **Create your admin accounts** — there's no signup page by design; only
   this script creates accounts:
   ```bash
   npm run seed:admin -- --email=owner@3plestarelectrical.com --password=CHANGE_ME --role=owner
   npm run seed:admin -- --email=dev@example.com --password=CHANGE_ME --role=developer
   ```

6. **Run the dev server**
   ```bash
   npm run dev
   ```
   Visit `http://localhost:3000` for the public site,
   `http://localhost:3000/admin/login` for the dashboard.

## Deploying to Vercel

1. Push this repo to GitHub, import it into Vercel.
2. Add all the env vars from `.env` in the Vercel project settings.
3. Add a **Postgres** integration (Neon/Supabase) and a **Blob** store from
   the Vercel Storage tab — this auto-populates `DATABASE_URL` and
   `BLOB_READ_WRITE_TOKEN`.
4. Run the migration once against the production database (you can run
   `npm run db:migrate` locally pointed at the prod `DATABASE_URL`, or set up
   a one-off Vercel deploy hook).
5. Run `npm run seed:admin` locally against the production `DATABASE_URL` to
   create the real owner/developer accounts.
6. Deploy. Old URLs like `/about.html` redirect permanently to `/about` (see
   `next.config.js`).

## What's intentionally NOT here yet (deferred per our scope discussion)

- Live chat
- E-commerce cart / checkout / payments — catalog is browse-and-inquire only
- Customer accounts

## Known limitations (documented, not bugs)

- The "unsaved changes" guard in the blog editor covers browser tab
  close/refresh and in-app sidebar navigation, but **not** the browser's
  back/forward buttons — Next.js App Router doesn't expose a reliable hook
  for intercepting `popstate` before its own router reacts to it.
- The markdown-lite paragraph renderer only supports `**bold**` and
  `*italic*` — by design, to avoid a full markdown parser dependency.
