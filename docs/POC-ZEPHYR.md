# HIDRIQ — Design Partnership & Proof of Concept: Zephyr Hotels

**Partner:** Zephyr Hotels  
**Location:** Morocco  
**Project Classification:** Initial Commercial POC & Design Partnership  
**Status:** In Progress / Active POC  

---

## 1. Context & Objective

Morocco faces pronounced hydrological challenges, with prolonged droughts and strict water allocation policies directly impacting the hospitality sector. Luxury resorts must maintain lush gardens, manicured turf, and ornamental flora to uphold five-star guest experiences, while facing rising municipal tariffs and operational limits on groundwater pumping.

**Zephyr Hotels** has partnered with HIDRIQ as the foundational **Design Partner / Proof of Concept (POC)** to evaluate whether an independent water intelligence layer can optimize landscape water delivery without risking plant health or requiring expensive hardware replacements.

> **Important Truth:** HIDRIQ does **not** publish speculative or fabricated percentage savings (e.g., *"Zephyr saves 40%"*). The goal of this POC is to systematically measure, validate, and publish real-world empirical data under strict agronomic observation.

---

## 2. Scope of Work

The trial covers a representative hospitality property encompassing multiple microclimatic zones:
- Manicured Bermuda grass lawns.
- Mediterranean olive and palm groves.
- Densely planted ornamental shrub and floral borders.
- Poolside courtyard landscapes with high reflected heat.
- Perimeter tree hedges.

### Infrastructure Baseline
- **Existing Controllers:** Commercial multi-station 24VAC controllers operating on fixed seasonal calendar programs.
- **Water Source:** Combination of municipal potable connection and licensed groundwater borehole.
- **Metering:** Pulse-enabled mechanical sub-meters installed at the main irrigation distribution manifold.

---

## 3. Phased Implementation Methodology

The POC is structured over a 60-day trial period divided into three distinct operational phases:

```
┌───────────────────────────────────────────────────────────────────────────┐
│                           60-DAY POC PHASING                              │
├────────────────────────┬────────────────────────┬────────────────────────┤
│ DAYS 1 – 21:           │ DAYS 22 – 42:          │ DAYS 43 – 60:          │
│ PHASE 1: SHADOW MODE   │ PHASE 2: RECOMMENDATION│ PHASE 3: AUTOPILOT     │
│ Zero physical changes. │ Manual approval of     │ Direct controller      │
│ Model runs in parallel │ recommended runtimes   │ integration on         │
│ to audit baseline.     │ by property team.      │ supported test zones.  │
└────────────────────────┴────────────────────────┴────────────────────────┘
```

### Phase 1: Shadow Mode (Days 1–21)
- **Objective:** Establish the un-interfered baseline without altering irrigation schedules.
- **Activities:**
  - Complete GPS mapping of valve zones, emitter types, flow rates, and plant species.
  - Ingest on-site weather data and local $ET_0$ calculations.
  - Run the HIDRIQ Water Demand Engine in parallel with existing controller clock schedules.
  - Quantify the baseline discrepancy between **Water Applied** vs. **Model-Estimated Water Required**.

### Phase 2: Recommendation Mode (Days 22–42)
- **Objective:** Human-in-the-loop validation of generated schedules.
- **Activities:**
  - HIDRIQ delivers a daily optimized run-sheet to the resort's head landscape engineer via mobile dashboard and WhatsApp summary.
  - The landscape team manually adjusts controller programs to match recommendations.
  - Weekly visual plant health inspections (leaf turgor, root zone moisture samples, color uniformity).

### Phase 3: Selective Autopilot (Days 43–60)
- **Objective:** Automated schedule execution on designated test zones.
- **Activities:**
  - Connect supported controller interface or dry-contact relay retrofit on test zones.
  - Daily automatic updates of runtime duration and start windows based on forecast rainfall and $ET_0$.
  - Continuous anomaly detection monitoring for sudden pressure drops or valve faults.

---

## 4. Key Performance & Verification Metrics

The POC evaluates the platform across seven concrete, auditable metrics:

1. **Specific Water Consumption ($m^3 / m^2$):** Normalized weekly water application per square meter of landscaped area, adjusted for prevailing $ET_0$.
2. **Irrigation Events Avoided:** Count and volume ($m^3$) of scheduled watering events canceled due to anticipated or recent effective rainfall ($P_{eff}$).
3. **Over-watering & Under-watering Frequency:** Deviation between soil water depletion curves and actual delivery.
4. **Anomalies Detected:** Identification of pipe leaks, head blowouts, or stuck solenoid valves within 60 minutes of occurrence.
5. **Operator Time Efficiency:** Hours spent manually reprogramming controllers and auditing irrigation performance.
6. **Landscape Health Index:** High-resolution photographic NDVI and visual quality scoring to verify zero degradation in aesthetic standards.
7. **Recommendation Acceptance Rate:** Percentage of daily HIDRIQ recommendations accepted and executed by the on-site grounds team.

---

## 5. Deliverables & Next Steps

Upon conclusion of the 60-day trial, HIDRIQ and Zephyr Hotels will publish:
- A co-authored White Paper documenting empirical water consumption changes.
- A financial analysis detailing municipal water bill reductions vs. operational implementation costs.
- Guidelines for scaling the intelligence platform across Zephyr's wider portfolio of hotel properties.
