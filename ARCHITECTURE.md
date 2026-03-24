# Premium 1 Logistics LTD - Architecture Plan

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout
│   ├── page.tsx                   # Home
│   ├── globals.css
│   ├── (public)/                  # Public website routes
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── how-we-operate/page.tsx
│   │   ├── quote/page.tsx
│   │   ├── coverage/page.tsx
│   │   ├── testimonials/page.tsx
│   │   ├── insights/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── contact/page.tsx
│   ├── admin/                     # Staff-only dashboard
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── inquiries/page.tsx
│   │   ├── shipments/page.tsx
│   │   ├── documents/page.tsx
│   │   ├── clients/page.tsx
│   │   ├── staff/page.tsx
│   │   └── settings/page.tsx
│   └── api/
│       ├── inquiries/route.ts
│       ├── upload/route.ts
│       └── ...
├── components/
│   ├── ui/                        # shadcn-style primitives
│   ├── design-system/             # Container, Section, CTAButton, etc.
│   ├── layout/                    # Header, Footer, MobileNav
│   └── sections/                  # Hero, ServicesGrid, etc.
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── notify/
│   │   ├── emailProvider.ts
│   │   ├── smsProvider.ts
│   │   └── index.ts
│   └── utils.ts
├── types/
│   └── database.ts
└── data/
    └── mock.ts
supabase/
├── migrations/
│   ├── 001_initial_schema.sql
│   ├── 002_rls_policies.sql
│   └── 003_storage_buckets.sql
└── seed.sql
```

## Tech Stack

- **Frontend**: Next.js 16 App Router, TypeScript, TailwindCSS v4, lucide-react
- **UI**: Custom design system (shadcn-inspired primitives)
- **Backend**: Supabase (Auth, Postgres, Storage, Realtime)
- **Email**: Resend
- **SMS**: Abstracted (Hubtel/Twilio)

## Data Model Summary

- `admins`, `staff_users` - RBAC
- `services` - CMS for service pages
- `inquiries`, `inquiry_files` - Lead capture
- `clients` - CRM
- `shipments`, `shipment_events`, `shipment_documents` - Operations
- `notifications`, `notification_templates` - Comms
- `testimonials`, `blog_posts`, `site_settings` - Content

## Deployment

- Vercel (recommended) or VPS/Coolify
- Env vars: Supabase keys, Resend, SMS provider, APP_BASE_URL
