# HIDRIQ — Project & Venture Documentation

**Brand:** HIDRIQ  
**Domain:** [hidriq.com](https://hidriq.com)  
**Positioning:** Water Intelligence  
**Core Promise:** The intelligence layer for water.  
**Supporting Line:** Predict. Optimize. Automate.  
**Parent / Venture Entity:** An EM300.co Company  

---

## Executive Summary

HIDRIQ is a venture-backed climate-infrastructure and deep-software company building the **vendor-neutral water intelligence and optimization layer**. 

Much of the world’s installed irrigation infrastructure—spanning hospitality resorts, golf courses, luxury residential estates, and eventually high-value agriculture—still relies on fixed, programmed clock schedules (e.g., *Tuesday at 06:00 for 20 minutes*). Yet water demand changes continuously with temperature, solar radiation, humidity, wind, rainfall, soil saturation, and plant phenology.

HIDRIQ answers a single foundational question:
> **“Given what we know about this land, vegetation/crop, weather and infrastructure, how much water should be delivered, when, and where?”**

Rather than manufacturing another proprietary controller or locking customers into single-vendor hardware ecosystems, HIDRIQ is **software-first, API-driven, and hardware-optional**. It makes existing irrigation infrastructure smarter through an intelligent feedback loop:
$$\text{PREDICT} \longrightarrow \text{ACT} \longrightarrow \text{MEASURE} \longrightarrow \text{LEARN}$$

---

## Market Beachhead & Strategic Trajectory

1. **Stage 1 (NOW) — Hospitality:**
   - Initial beachhead: Hotels, resorts, and landscaped estates with high aesthetic standards and high water expenses.
   - Initial POC / Design Partner: **Zephyr Hotels, Morocco**.
   - Focus: Multi-zone landscape optimization, microclimate modeling, shadow-mode schedule auditing.

2. **Stage 2 (NEXT) — Golf Courses & Luxury Residential:**
   - Expansion into golf courses (highly variable turf microclimates and strict water budgets) and luxury second homes / holiday properties (Spain, Morocco, Portugal, Italy, Greece).
   - Core B2C product: **Manual Garden Mode** and **Garden Digital Twin**, allowing residential owners to receive precision watering recommendations without requiring smart controllers.

3. **Stage 3 (COMING SOON) — High-Value Agriculture:**
   - Agriculture-ready data architecture from Day 1 (`Farm → Field → Block → Crop → Variety → Growth Stage → Soil → Irrigation Zone → Sensors → Weather → Yield`).
   - Strategic shift from minimizing landscape water to **maximizing economic yield value per cubic metre ($/m³)**.

4. **Stage 4 (FUTURE) — Water Infrastructure:**
   - District-level water optimization, municipal landscape networks, basin-scale predictive modeling, and water asset intelligence.

> **Note on Commercial Landing Page Architecture:**  
> The public commercial landing page ([`src/app/page.tsx`](file:///C:/hidriq/src/app/page.tsx)) is tailored strictly for high-conversion startup and enterprise acquisition. Internal venture milestone sequences and early single-partner design briefs are housed in dedicated venture documentation ([`docs/ROADMAP.md`](file:///C:/hidriq/docs/ROADMAP.md) and [`docs/POC-ZEPHYR.md`](file:///C:/hidriq/docs/POC-ZEPHYR.md)).

---

## Documentation Index

Detailed documentation is organized in this repository:

| Document | Purpose & Contents |
| :--- | :--- |
| [`PRODUCT.md`](file:///C:/hidriq/docs/PRODUCT.md) | Full product thesis, problem space, B2B verticals, B2C Manual Garden Mode, Garden Digital Twin, second-home use cases, and operating modes. |
| [`ARCHITECTURE.md`](file:///C:/hidriq/docs/ARCHITECTURE.md) | Technical system architecture, the 5 intelligence engines, agronomic models (FAO-56 Penman-Monteith ET₀), APIs, and feedback loop. |
| [`POC-ZEPHYR.md`](file:///C:/hidriq/docs/POC-ZEPHYR.md) | Scope, methodology, shadow-mode phasing, and verification metrics for the initial POC with Zephyr Hotels in Morocco. |
| [`ROADMAP.md`](file:///C:/hidriq/docs/ROADMAP.md) | Staged venture roadmap from Hospitality (Stage 1) through Golf/Residential (Stage 2), Agriculture (Stage 3), and Water Infrastructure (Stage 4). |
| [`COMPETITIVE-LANDSCAPE.md`](file:///C:/hidriq/docs/COMPETITIVE-LANDSCAPE.md) | Rigorous market analysis of incumbent hardware manufacturers (Rain Bird, Hunter, Toro, Netafim, Galcon, Weathermatic) and ag-tech platforms (CropX, Arable), highlighting the independent intelligence opportunity. |
| [`IMAGE_SOURCES.md`](file:///C:/hidriq/docs/IMAGE_SOURCES.md) | Image audit, licensing confirmation, photographer credits, and Unsplash URLs used across the platform. |
| [`DATA-SOURCES.md`](file:///C:/hidriq/docs/DATA-SOURCES.md) | Multi-source data ingestion abstractions (Geospatial, Weather, Satellite, Elevation, Controllers, Meters, Sensors). |
| [`DEPLOYMENT.md`](file:///C:/hidriq/docs/DEPLOYMENT.md) | Deployment runbook for Vercel, Next.js configuration, custom domain DNS records (`hidriq.com`), and environment variables. |
| [`DECISIONS.md`](file:///C:/hidriq/docs/DECISIONS.md) | Architectural Decision Records (ADRs) explaining key venture, design, technical, and commercial choices. |

---

## Technology Stack

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 4
- **Animation & Transitions:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Vercel (Edge & Serverless)
- **Domain:** `https://hidriq.com`

---

## Quick Start (Local Development)

```bash
# Clone repository
git clone https://github.com/AberraouiTekypay/hidriq.git
cd hidriq

# Install dependencies
npm install

# Run local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

```bash
# Build for production
npm run build

# Run production server
npm run start
```
