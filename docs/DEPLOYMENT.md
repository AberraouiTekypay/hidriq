# HIDRIQ — Deployment & Infrastructure Runbook

**Primary Domain:** [https://hidriq.com](https://hidriq.com)  
**Platform:** [Vercel](https://vercel.com)  
**Framework:** Next.js (App Router)  
**Parent / Venture Entity:** An EM300.co Company  

---

## 1. Vercel Deployment

The application is architected for zero-configuration, production-grade deployment on Vercel's global edge network.

### CLI Deployment Commands
```bash
# Link repository to Vercel project
vercel link

# Deploy a preview release
vercel

# Deploy directly to production
vercel --prod
```

---

## 2. Domain & DNS Configuration (`hidriq.com`)

To bind the production domain `hidriq.com` to the Vercel deployment:

1. **In the Vercel Dashboard:**
   - Navigate to **Project Settings** > **Domains**.
   - Add `hidriq.com` and `www.hidriq.com` (with automatic redirect to the apex domain).

2. **In your DNS Registrar / DNS Provider:**
   Configure the following records:

   | Type | Host / Name | Value / Destination | TTL |
   | :--- | :--- | :--- | :--- |
   | **A** | `@` (apex) | `76.76.21.21` (Vercel IP) | Auto / 300 |
   | **CNAME** | `www` | `cname.vercel-dns.com.` | Auto / 300 |

3. **SSL/TLS Certificate:**
   Vercel provisions an automated, auto-renewing Let's Encrypt Wildcard SSL certificate once the DNS records propagate.

---

## 3. Environment Variables & Form Lead Ingestion

The lead capture form on the landing page is designed to support multiple serverless lead ingestion backends.

Configure in `.env.local` or Vercel Environment Variables:

```bash
# Optional: External webhook endpoint (Zapier, Make, HubSpot, or custom API)
NEXT_PUBLIC_LEAD_WEBHOOK_URL=https://api.your-crm.com/v1/leads

# Optional: Notification email recipient
NOTIFICATION_EMAIL=contact@hidriq.com
```

### Lead Schema Payload
When a user submits the "Talk to HIDRIQ" or "Free Garden Water Check" form, the payload is structured as follows:

```json
{
  "timestamp": "2026-09-22T12:00:00.000Z",
  "name": "Jane Doe",
  "company": "Zephyr Hospitality Group",
  "email": "jane@zephyrhotels.com",
  "category": "Hotel / Resort",
  "country": "Morocco",
  "message": "Interested in evaluating Shadow Mode for our Marrakech resort grounds.",
  "interestType": "B2B_PARTNER"
}
```

---

## 4. Production Verification Checklist

Before releasing to commercial partners or investors, verify:
- [x] **Zero Console / Hydration Errors:** Validate client rendering in dev and prod builds.
- [x] **Metadata & Open Graph:** Verify `<title>`, `<meta description>`, `og:image`, `twitter:card` via [opengraph.xyz](https://www.opengraph.xyz).
- [x] **LCP & CWV Optimization:** Confirm high fetch priority on hero imagery and lazy-loading on secondary assets.
- [x] **Reduced Motion Compliance:** Verify `@media (prefers-reduced-motion: reduce)` disables non-essential animations.
- [x] **Brand Compliance:** Verify exact footer attribution: `An EM300.co Company`.
