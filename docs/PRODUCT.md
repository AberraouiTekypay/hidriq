# HIDRIQ — Master Product Thesis & Strategy

**Document Status:** Master Version 3.0 (Supersedes V1 & V2)  
**Domain:** [hidriq.com](https://hidriq.com)  
**Positioning:** WATER INTELLIGENCE  
**Core Statement:** “The intelligence layer for water.”  
**Supporting Line:** “Predict. Optimize. Automate.”  
**Corporate Entity:** An EM300.co Company  

---

## 1. Company Classification & Category

HIDRIQ is positioned primarily as:
- **ClimateTech / WaterTech** with a major **AgriTech** application.
- Supporting application verticals: **HospitalityTech**, **PropTech**, and **Golf / Landscape Technology**.

HIDRIQ is **not** positioned as an agriculture-only company. Water intelligence is the core horizontal platform capable of operating across:
- Private gardens, luxury villas, and second homes (**HIDRIQ HOME**).
- Hotels, luxury resorts, golf courses, and commercial campuses (**HIDRIQ BUSINESS**).
- Specialty orchards, vineyards, and greenhouses (**HIDRIQ AGRI** — Stage 3).
- District water utilities, municipal parks, and basin-scale networks (**HIDRIQ INFRASTRUCTURE** — Stage 4).

---

## 2. Core Product Thesis & Strategic Identity

### What HIDRIQ Is
- A **vendor-neutral water intelligence and optimization layer** designed to sit between environmental reality and physical irrigation infrastructure.
- Built on a single fundamental question:
  > **“Given what we know about this land, vegetation/crop, weather, soil and infrastructure, how much water should be delivered, when, and where?”**
- Powered by a continuous, physical feedback loop:
  $$\text{OBSERVE} \longrightarrow \text{PREDICT} \longrightarrow \text{ACT} \longrightarrow \text{MEASURE} \longrightarrow \text{LEARN}$$
- An international platform **built from Morocco and Spain**, designed for water-stressed environments globally.

### What HIDRIQ Is Not
- **NOT an irrigation hardware company:** Does not replace valves, solenoids, or controllers.
- **NOT a sensor manufacturer:** Sensors are optional accuracy upgrades, never mandatory prerequisites.
- **NOT a generic ESG dashboard:** Focuses on operational physical delivery rather than retrospective sustainability PR.
- **NOT a consumer smart sprinkler gadget:** Does not require electronic smart controllers; works natively with manual hoses via Manual Garden Mode.

---

## 3. The Bigger Product Vision: A Living Digital Twin of Every Managed Landscape

HIDRIQ does not build isolated water dashboards. The strategic product destination is:
> **A Living Digital Twin of every managed landscape, with water intelligence as its foundational operational layer.**

The Digital Twin progressively models:
$$\text{Property} \longrightarrow \text{Landscape} \longrightarrow \text{Zones} \longrightarrow \text{Vegetation} \longrightarrow \text{Terrain} \longrightarrow \text{Soil} \longrightarrow \text{Weather} \longrightarrow \text{Irrigation} \longrightarrow \text{Consumption} \longrightarrow \text{Health} \longrightarrow \text{Longitudinal Change}$$

Water intelligence is the first major intelligence layer. Future layers built on this spatial twin include:
- Localized plant stress and canopy density monitoring.
- Micro-leak and stuck-valve anomaly localization.
- Non-invasive visual disease/stress classification.
- Predictive infrastructure maintenance.
- Longitudinal landscape change detection.

---

## 4. The Seven Intelligence Engines

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 HIDRIQ CORE INTELLIGENCE                                    │
│                                                                                             │
│  1. Water Demand Engine         │ Calculates ASCE FAO-56 Penman-Monteith ET₀ & zone Kc.     │
│  2. Forecast Engine             │ High-res NWP spatial grids, effective rainfall & VPD.     │
│  3. Optimization Engine         │ Cycle-and-soak, runoff elimination & power tariff windows.│
│  4. Execution Engine            │ Vendor-neutral API adapters, relay bridges & run-sheets.  │
│  5. Verification & Learning     │ Flow meter reconciliation, leak anomaly & auto-tuning.   │
│  6. Digital Twin Engine         │ Automated spatial parcel discovery, zones & exposure.     │
│  7. Visual Health & Anomaly     │ Multi-spectral NDVI & longitudinal photo change detection.│
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Automation-First Onboarding: Ask for as Little as Possible

### The Core Automation Principle
The user should never have to manually configure complex agronomic formulas or draw polygons from scratch:

```
USER:   "Here is my property." (Address, GPS, or Pin)
HIDRIQ: "We found your property. Elevation: 84m, 1,420 m² parcel."
USER:   "Correct."
HIDRIQ: "We detected 5 garden zones (Lawn: 94% conf, Citrus: 91% conf). We need 1 photo of Zone 3."
USER:   "Uploaded."
HIDRIQ: "I will tell you when it needs water."
LATER:  "I will manage the irrigation for you."
```

### Automatic Garden Discovery with Confidence Scoring
1. Ingests address/GPS $\rightarrow$ Cadastral parcel geometry, elevation model, and satellite imagery.
2. Segments building footprint, hardscape, swimming pool, and vegetative zones.
3. Assigns an explicit **Confidence Level** to each classification. Where confidence is low, HIDRIQ asks a single confirmation question rather than requesting manual entry:
   - *“We think this area is lawn. Correct? [YES / NO]”*
   - *“We found five garden zones. Correct? [CONFIRM / EDIT]”*

### Intelligently Requested Photos
Instead of asking for generic photos, HIDRIQ only asks for imagery to resolve specific ambiguities:
- *“Photograph this specific shaded area to verify microclimate factor $K_{mc}$.”*
- *“Photograph the citrus tree root zone to confirm drip line emitter density.”*

---

## 6. The Nine Levels of Automation

HIDRIQ structures system capability into a clear progressive scale:

| Level | Name | Description & Capability | User Effort |
| :--- | :--- | :--- | :--- |
| **Level 0** | **Digital Twin** | Cadastral discovery, spatial zones, elevation, and base microclimate. | Initial confirmation |
| **Level 1** | **Recommendation** | Weekly personalized watering schedules and duration run-sheets. | Executes manual watering |
| **Level 2** | **Water Monitoring** | Ingestion of sub-meters and utility bills; consumption vs. modeled demand. | Periodic review |
| **Level 3** | **Controller Integration**| Bi-directional API link to existing controllers (Hunter, Rain Bird, Toro). | Authorize OAuth / API |
| **Level 4** | **Sensor Integration** | Optional in-situ soil moisture capacitance probes and local weather stations.| Automated telemetry |
| **Level 5** | **Autopilot** | Closed-loop automated schedule adjustments pushed directly to valves. | Zero (Hands-off) |
| **Level 6** | **Anomaly Detection** | Real-time flow telemetry flagging pipe bursts, stuck valves, or clogs. | Proactive alert only |
| **Level 7** | **Vegetation Health** | Longitudinal visual health tracking; identifying chronic dry spots. | Automated tracking |
| **Level 8** | **Predictive Maintenance**| Anticipating solenoid valve failures or pressure drops before breakdown. | Preemptive notice |

---

## 7. The Autopilot Safety Architecture

Autonomous valve execution is never enabled on Day 1. The progression requires establishing a baseline period:
$$\text{ANALYZE (Shadow Mode)} \longrightarrow \text{RECOMMEND} \longrightarrow \text{USER APPROVAL} \longrightarrow \text{AUTOPILOT}$$

### Hardcoded Fail-Safe Rules (Safety Overrides Optimization)
1. **Maximum Daily Water Limits & Zone Runtime Caps:** Hard software locks prevent any valve zone from operating longer than a safety threshold, regardless of model output.
2. **Rain & Freeze Interlock:** Immediate automatic cancellation if natural rainfall exceeds 3mm or temperatures drop below 2°C.
3. **Sensor Sanity Checks:** If sensor readings deviate by $>3\sigma$ from expected physical ranges, data is quarantined.
4. **Confidence Fallback:** If weather forecast confidence drops below threshold, the system immediately reverts from **AUTOPILOT to RECOMMENDATION MODE**.
5. **Emergency Manual Override:** Physical and digital master kill-switches remain available at all times.

---

## 8. Human Input Decreases Over Time

The product is designed around a natural compounding intelligence curve:
- **DAY 01:** User confirms property geometry and provides targeted photos.
- **DAY 30:** HIDRIQ understands microclimate responses, soil infiltration, and transpirational curves.
- **DAY 90:** HIDRIQ understands normal baseline behavior and historical variations.
- **LONG TERM:** HIDRIQ manages water autonomously, contacting the user only when anomalies occur.

---

## 9. Parallel Go-To-Market & Geographic Beachheads

HIDRIQ runs enterprise B2B and consumer B2C in parallel from Day 1:
- **B2B Beachhead — Morocco (Zephyr Hotels):** 60-day commercial trial proving physical water balancing on luxury hotel grounds across multi-zone commercial controllers.
- **B2C Beachhead — Spain (Costa del Sol, Marbella, Mallorca, Alicante):** Self-service digital distribution of HIDRIQ HOME and Manual Garden Mode.
- **Geographic Framing:** *“Built from Morocco + Spain · Designed for water-stressed markets worldwide.”*

---

## 10. Persistent Property Asset Architecture & Visual Water Intelligence (V4)

HIDRIQ does not operate as a one-off assessment tool or ephemeral questionnaire. The foundational object in the system is the **Permanent Property Asset**.

### 10.1 Property-First Hierarchy
```
USER ACCOUNT
 ├── PROPERTY 1 (e.g., Marbella Villa — Active Asset)
 │    ├── Spatial Digital Twin (Cadastral polygon, microclimate, zones)
 │    ├── Operational Overlays (Water, Vegetation, Irrigation, Heatmap)
 │    ├── Zone Hydraulic Profiles & User Ground-Truth Memory
 │    ├── Longitudinal Event Timeline (Audit trail)
 │    └── Visual Change Detection (Before / After photo verification)
 ├── PROPERTY 2 (e.g., Madrid House)
 └── PROPERTY 3 (e.g., Mallorca Villa)
```

### 10.2 Four Operational Visual Overlays
The Interactive Digital Twin Canvas supports 4 real-time visual lenses:
1. **Water Status:** Identifies hydraulic saturation levels (`GOOD`, `ATTENTION`, `NEEDS WATER`, `OVERWATERED`).
2. **Vegetation Health:** Highlights canopy vigor, stress patterns, and anomaly signatures (`HEALTHY`, `WATCH`, `ANOMALY`).
3. **Irrigation State:** Visualizes physical emitter status (`NORMAL`, `RECENTLY_IRRIGATED`, `POSSIBLE_ISSUE`, `NOT_IRRIGATED`).
4. **Thermal / ET₀ Heatmap:** Visualizes solar transpiration load across south-facing slopes vs shaded micro-pockets.

### 10.3 "User Corrections Become Data" (Ground-Truth Memory)
When an operator or homeowner inspects a zone drawer and updates its ground reality (e.g., reclassifying generic turf to lavender beds, or noting a changed emitter type):
- The digital twin **permanently stores the correction** into `userCorrections[]`.
- The system recalibrates the zone crop coefficient ($K_c$) and infiltration rate.
- An immutable timeline event is generated with the badge `Memory Calibrated`.
- The system never forgets user ground-truth.

### 10.4 Prioritized Attention vs. Calm State
To eliminate alert fatigue:
- **"What Needs Attention?":** Elevates only zones requiring operational intervention (e.g., dry spots, clogged emitters, scheduled cycles).
- **"Looking Good":** Provides a calm, reassuring confirmation of stable root-zone balances.

---

## 11. Master Agronomic Intelligence & Trusted Irrigation Engine (Master V5)

### 11.1 Critical Principle: Zero LLM Hallucination for Hydraulic Decisions
HIDRIQ recommendations **MUST NOT be generated by an LLM or generic AI model**.
All water demands are computed via deterministic physical formulas:
- **ASCE Standardized FAO-56 Penman-Monteith Reference Evapotranspiration ($ET_0$)**
- **Dual Crop Coefficients ($K_c$)** grounded in peer-reviewed agronomic literature (FAO-56, UC ANR WUCOLS IV, INRAA).
- **USDA-SCS Effective Rainfall Model ($P_{eff}$)** filtering canopy interception and soil infiltration limits.
- **Root-Zone Soil Moisture Accounting ($TAW, RAW$)** preventing both drought stress and root asphyxiation.

### 11.2 Zone-Level Distinction: Never Treat Landscape as Homogeneous
- **Bermuda Turf:** Shallow root column (15–25 cm), moderate depletion threshold ($p=0.50$), high summer $K_c=0.70$.
- **Centenary Olives:** Massive deep root column (80–180 cm), extreme drought tolerance ($K_c=0.35$), high depletion buffer ($p=0.65$).
- **Olive Tree Rule:** The engine **NEVER applies a turf irrigation model to trees**. Deep root buffers hold weeks of moisture and require "NO IRRIGATION TODAY" when turf requires replenishment.

### 11.3 Runtime Honesty & Data Provenance
- If emitter precipitation rate is unknown: **Do not fabricate precision.** Return: *"Water requirement estimated (X mm), irrigation runtime cannot yet be calculated reliably without precipitation rate."*
- Every telemetry data point enforces strict provenance: `MEASURED | ESTIMATED | INFERRED | USER_CONFIRMED | UNKNOWN`.

### 11.4 The 20 Non-Negotiable Product Rules
1. Never pretend estimated data is measured data.
2. Never let an LLM independently determine irrigation requirements.
3. Never treat all vegetation as equivalent.
4. Never treat all soil as equivalent.
5. Never treat all irrigation systems as equivalent.
6. Never fabricate precision.
7. Never manufacture alerts.
8. Never automatically diagnose plant disease.
9. Never allow low-confidence intelligence to control physical infrastructure.
10. Never overwrite user-confirmed property knowledge without evidence.
11. Never repeatedly ask the user for information already known.
12. Never hard-code the system around one external provider.
13. Never claim water savings without measured evidence.
14. Never allow machine learning to override agronomic safety constraints.
15. Always show the reason behind important recommendations.
16. Always retain historical property observations.
17. Always distinguish measured, estimated, inferred and user-confirmed data.
18. Always allow manual override.
19. Always provide a conservative fallback when critical data is missing.
20. The property is the persistent unit of intelligence.
