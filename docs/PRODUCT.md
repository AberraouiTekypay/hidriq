# HIDRIQ — Product Thesis & Strategy

**Document Status:** Version 2.0  
**Domain:** [hidriq.com](https://hidriq.com)  
**Positioning:** Water Intelligence  
**Core Promise:** The intelligence layer for water.  

---

## 1. What HIDRIQ Is (and What It Is Not)

### What HIDRIQ Is
- A **vendor-neutral water intelligence and optimization layer** designed to sit between environmental reality and physical irrigation infrastructure.
- Powered by **HIDRIQ CORE**, a common intelligence engine serving two parallel distribution channels:
  - **HIDRIQ BUSINESS:** Hospitality (hotels & resorts), golf courses, commercial landscapes, and high-value agriculture.
  - **HIDRIQ HOME:** Luxury villas, holiday properties, second homes, and private gardens.
- A software-first, API-driven platform that integrates weather forecasts, evapotranspiration ($ET_0$), solar radiation, precipitation probability, soil hydrology assumptions, and property-level landscape characteristics to determine **how much water should be delivered, when, and where**.
- An operational workflow engine that supports progressive automation:
  $$\text{ANALYZE} \longrightarrow \text{RECOMMEND} \longrightarrow \text{AUTOPILOT}$$
- An international platform **built from Morocco and Spain**, designed for water-stressed markets worldwide.

### Geographic Go-To-Market Strategy
HIDRIQ executes a targeted, dual-geography market entry:
- **B2B Beachhead — Morocco:** Leveraging enterprise relationships, particularly design partner **Zephyr Hotels**, to establish deep operational credibility, prove physical water balancing on luxury resort grounds, and audit multi-zone commercial controllers in a rigorous semi-arid climate.
- **B2C Beachhead — Spain:** Launching **HIDRIQ HOME** as a digitally distributed, self-service consumer product targeting premier Mediterranean residential markets: **Costa del Sol, Marbella, Estepona, Sotogrande, Mallorca, Alicante, Valencia, and Murcia**, followed by Portugal (Algarve), Italy, Greece, and southern France.
- **Global Ambition:** HIDRIQ is neither a "Moroccan startup" nor a single-country tool. It is an international water intelligence company built for water-stressed regions globally.

### What HIDRIQ Is Not
- **NOT an irrigation hardware manufacturer:** HIDRIQ does not seek to replace millions of dollars of existing buried valves, solenoid wiring, or multi-station controllers.
- **NOT simply another smart timer:** Unlike residential WiFi controllers that apply static +/- percentage rain pauses based on nearest municipal airport weather, HIDRIQ runs deterministic water demand and microclimate energy-balance models.
- **NOT an ESG vanity dashboard:** HIDRIQ focuses on operational water physics and valve-level delivery rather than retrospective sustainability reporting.
- **NOT initially an agriculture company:** While designed from Day 1 with an agriculture-ready schema (`Farm → Field → Block → Crop`), commercial agriculture is explicitly **Stage 3** in the company's roadmap.

---

## 2. The Core Problem: Fixed Clocks vs. Variable Physics

Much of the world’s installed irrigation infrastructure continues to operate on static calendar schedules programmed weeks or months earlier:

```
CURRENT PRACTICE (Scheduled Guesswork):
┌─────────────────────────┐
│ Tuesday   | 06:00 | 20m │
│ Thursday  | 06:00 | 20m │  ===> Fixed delivery regardless of rain,
│ Saturday  | 06:00 | 20m │       wind, humidity, or soil moisture
└─────────────────────────┘
```

However, real landscape water demand changes every single day:
- **Temperature & Solar Radiation:** Drive daily atmospheric evaporative demand.
- **Relative Humidity & Vapor Pressure Deficit (VPD):** Determine transpirational pull on plant stomata.
- **Wind Speed:** Multiplies evaporation rates and disrupts sprinkler spray distribution patterns.
- **Precipitation:** Infiltrates soil reservoirs, often rendering programmed watering completely redundant.
- **Microclimate & Exposure:** South-facing turf against reflective building glass loses moisture twice as fast as shaded understory planting 50 meters away on the same property.

The gap between fixed clock runtimes and variable environmental demand leads to substantial water waste, elevated pumping energy bills, fungal plant diseases, nutrient leaching, and root degradation.

---

## 3. Product Principles

### Principle 1: Hardware-Optional (“Your Infrastructure. Our Intelligence.”)
HIDRIQ starts with the assumption that the customer already owns functional irrigation infrastructure. The platform connects to what exists:
- Legacy 24VAC controllers (Hunter, Rain Bird, Toro, Weathermatic, Galcon).
- Cloud-connected controllers via manufacturer APIs (where available).
- Flow meters and pulse counters.
- Manual hoses, valves, and hand-watering protocols (via Manual Garden Mode).

Sensors (in-situ soil moisture probes, ultrasonic flow sensors, leaf wetness monitors) are treated as **optional accuracy upgrades**, never as prerequisites.

### Principle 2: Progressive Operating Modes
Operators retain complete control over automation levels:

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│   1. ANALYZE    │ ====> │  2. RECOMMEND   │ ====> │  3. AUTOPILOT   │
└─────────────────┘       └─────────────────┘       └─────────────────┘
Audit current run-        Generate zone-by-         Push runtime schedules
times vs. modeled         zone run-sheets for       directly to supported
depletion; detect         operator approval         controllers via API /
over-watering & leaks.    via WhatsApp/Email/UI.    relay integration.
```

### Principle 3: Disciplined Truth & No Unsupported Claims
HIDRIQ rejects vanity claims such as *"Saves 50% guaranteed"*. Water savings are governed by physics, baseline mismanagement, and climatic conditions. All savings must be measured and validated through controlled trials rather than fabricated for sales literature.

---

## 4. Core B2C Product: Manual Garden Mode & Garden Digital Twin

One of HIDRIQ's most significant strategic innovations is **Manual Garden Mode**, expanding water intelligence to residential gardens that lack automated irrigation systems.

### The Consumer Reality
Millions of homeowners—especially owners of luxury villas, second homes, and holiday retreats across the Mediterranean (Morocco, Spain, Portugal, Italy, Greece)—care deeply about their gardens but water them using hoses, portable sprinklers, or manual taps. They have no interest in spending thousands of euros installing complex solenoid valves and trenching pipes.

### How Manual Garden Mode Works
1. **Input Collection:**
   - Property GPS / address (establishing microclimate and high-resolution weather grid).
   - 3 to 10 photos of the garden taken from different angles.
   - Optional short video walkthrough.
   - Optional photos of taps, hoses, or existing sprinkler heads.
   - Optional recent water bills or historical watering habits.

2. **Garden Digital Twin Generation:**
   The HIDRIQ computer vision pipeline parses the visual assets to establish:
   - **Vegetation Composition:** Classification of turf grass species, mature trees, ornamental shrubs, hedges, flowering beds, vegetable patches, and exposed soil beds.
   - **Exposure & Microclimate:** Sun tracking, partial shade, canopy shading, and reflective surfaces (walls, swimming pools, paved terraces).
   - **Topography & Soil Assumptions:** Visual slope indicators and regional soil classifications (sandy loam, clay, calcareous).
   - **Zonal Partitioning:** Division of the garden into logical micro-zones.

> **Crucial Product Truth:** Photographs alone do **NOT** measure soil moisture. Photos provide vegetation taxonomy, canopy density, landscape geometry, and visual plant health. This visual baseline is then combined with real-time solar radiation, temperature, rainfall, and $ET_0$ physics models to calculate the water balance.

3. **Personalized Weekly Recommendations:**
   The user receives an intuitive weekly watering schedule translated into human terms (minutes of hose time or sprinkler placement), without technical jargon.

```
ILLUSTRATIVE UI EXAMPLE:
┌────────────────────────────────────────────────────────┐
│ YOUR GARDEN THIS WEEK (Villa Oasis, Marrakech)         │
│ Expected Rainfall: 8 mm   |   Landscape Demand: 14 mm  │
│ Recommended Net Irrigation: 6 mm                       │
├────────────────────────────────────────────────────────┤
│ MONDAY    | SKIP   — Sufficient moisture retained      │
│ TUESDAY   | WATER  — ~35 min (Lawn & Citrus)           │
│           | Window: 05:30 – 07:00 (Lowest evaporation) │
│ WEDNESDAY | SKIP   — Optimal moisture balance          │
│ THURSDAY  | WATER  — ~25 min (Ornamental borders)      │
│ FRIDAY    | SKIP                                       │
│ WEEKEND   | EVALUATE — Weather update pending          │
└────────────────────────────────────────────────────────┘
```

### B2C Funnel
$$\text{Free Garden Water Check} \longrightarrow \text{Upload Location + Photos} \longrightarrow \text{Garden Digital Twin} \longrightarrow \text{Weekly Action Plan} \longrightarrow \text{Premium Monitoring} \longrightarrow \text{Controller Connect} \longrightarrow \text{Autopilot}$$

---

## 5. Second-Home / Holiday-Home Positioning

Second-home owners face a distinct challenge: **absentee property ownership**.
- The villa may sit unoccupied for weeks or months in coastal or arid climates.
- Traditional systems either run blindly on timers (wasting water during unseasonal rain) or gardeners over-water to avoid plant mortality before the owner returns.
- System leaks, broken pipe fittings, or stuck valves often go unnoticed until thousands of liters are lost and exorbitant water bills arrive.

**Core Positioning:**
> *“Your property is empty. HIDRIQ watches the water.”*

HIDRIQ continuously computes the water budget for the estate, monitors weather shifts, adjusts recommendations dynamically, and alerts the owner or estate caretaker to abnormal anomalies.

---

## 6. B2B Commercial Verticals

### 1. Hospitality (Beachhead — Hotels & Luxury Resorts)
- **Pain Point:** High landscape water bills, strict guest aesthetic requirements (green turf, immaculate floral borders), complex multi-zone layouts, and high staff turnover.
- **Solution:** Multi-site dashboard, shadow auditing of existing controllers, zone-specific $ET_0$ watering sheets, and non-invasive retrofit.
- **Initial Partner:** **Zephyr Hotels, Morocco** (Design Partner / POC).

### 2. Golf Courses
- **Pain Point:** Huge acreage with diverse micro-topography (greens, tees, fairways, roughs), intense scrutiny over regional water allowances, and high pumping power tariffs.
- **Solution:** Sub-zone microclimate modeling, cycle-and-soak execution to eliminate runoff, and off-peak energy optimization.

### 3. Commercial Landscapes & Large Estates
- **Pain Point:** Large corporate campuses, residential compounds, and public-private parks with distributed legacy controllers from mixed vendors.
- **Solution:** Vendor-neutral consolidation under a single intelligence and policy layer.

### 4. High-Value Agriculture (Stage 3 — Coming Soon)
- **Pain Point:** Water scarcity in arid/semi-arid regions (olives, citrus, almonds, avocados, dates, vineyards) where water volume directly determines crop yield and quality.
- **Architecture Readiness:** Day-1 support for agronomic hierarchies:
  $$\text{Farm} \longrightarrow \text{Field} \longrightarrow \text{Block} \longrightarrow \text{Crop} \longrightarrow \text{Variety} \longrightarrow \text{Growth Stage} \longrightarrow \text{Soil Hydrology}$$
- **Strategic Goal:** Shift from landscape aesthetics to **maximizing economic yield value per cubic metre ($/m³)**.
