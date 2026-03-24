# Premium 1 Logistics LTD

Corporate logistics website and internal operations management for Ghana, West Africa, and international trade.

## Tech Stack

- **Frontend**: Next.js 16 App Router, TypeScript, TailwindCSS v4, lucide-react
- **Backend**: Supabase (Auth, Postgres, Storage)
- **Email**: Resend (contact + inquiry notifications)
- **SMS**: Hubtel / Twilio (abstracted in `lib/notify`)

## Setup

### 1. Install

```bash
npm install
```

### 2. Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run migrations: `001_initial_schema.sql`, `002_rls_policies.sql`, `003_storage_buckets.sql`
3. Seed: `supabase/seed.sql`
4. Buckets: `inquiry-uploads`, `shipment-documents`, `blog-covers`
5. **Auth**: Create at least one user (Email provider) for admin access

### 3. Environment

Copy `.env.example` → `.env.local`:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` / `ANON_KEY` | Client + middleware |
| `SUPABASE_SERVICE_ROLE_KEY` | API routes (inquiries, uploads) |
| `RESEND_API_KEY` / `NOTIFY_STAFF_EMAIL` | Email alerts |
| `APP_BASE_URL` | Canonical URL, sitemap, JSON-LD |
| `ALLOW_QUOTE_WITHOUT_DB=true` | **Demo only**: quotes work without DB |
| `ADMIN_AUTH_DISABLED=true` | **Demo only**: `/admin` without login |

### 4. Public site branding (optional)

`NEXT_PUBLIC_SITE_PHONE`, `NEXT_PUBLIC_SITE_EMAIL`, `NEXT_PUBLIC_WHATSAPP_E164`, `NEXT_PUBLIC_MAP_EMBED_URL`, `NEXT_PUBLIC_CALENDLY_URL`, `NEXT_PUBLIC_CAREERS_EMAIL`

### 5. Run

```bash
npm run dev
```

## Admin access

- **Production**: Sign in at `/auth/admin` with a Supabase Auth user. Middleware protects `/admin/*`.
- **Local demo**: `ADMIN_AUTH_DISABLED=true` bypasses auth (do not use in production).

## Public routes

| Path | Description |
|------|-------------|
| `/` | Home, trust strip, verticals, Calendly CTA |
| `/about` | Story, pillars, leadership, licences |
| `/services`, `/services/[slug]` | Services + FAQ schema + case snapshots |
| `/how-we-operate` | Process, TMS/WMS narrative, SLAs |
| `/coverage` | Regions + transit bands |
| `/track` | Client visibility roadmap |
| `/testimonials` | Extended quotes + case studies |
| `/insights`, `/insights/[slug]` | Filterable blog + authors + related |
| `/careers` | Open roles |
| `/contact` | Map, contact form, quote CTA |
| `/quote` → `/quote/thanks` | Honeypot, progress, optional upload |
| `/privacy`, `/terms`, `/cookies` | Legal |

## Features

- Cookie consent banner
- Contact API + quote honeypot
- Extended JSON-LD (phone, email, `sameAs`)
- Sitemap includes all insight articles
- FAQ structured data on service pages

## Deployment

Set all production env vars; **never** enable `ADMIN_AUTH_DISABLED` or `ALLOW_QUOTE_WITHOUT_DB` on public production unless intentional.
