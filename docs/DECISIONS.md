# HIDRIQ — Master Architectural Decision Records (ADRs)

**Document Status:** Master Version 3.0  
**Company:** HIDRIQ ([hidriq.com](https://hidriq.com))  
**Positioning:** Water Intelligence  
**Corporate Entity:** An EM300.co Company  

---

## ADR 001: Independent Software Layer vs. Proprietary Hardware
- **Decision:** HIDRIQ is structured strictly as an **independent, vendor-neutral water intelligence and optimization software layer**. We adopt the positioning: *“Your infrastructure. Our intelligence.”* Existing irrigation infrastructure is preserved wherever technically feasible.
- **Consequences:** Capital efficiency, fast sales cycles, zero supply chain risk, multi-site portfolio appeal.

---

## ADR 002: Core B2C Offering — Manual Garden Mode & Digital Twins
- **Decision:** Elevate **Manual Garden Mode** to a core B2C product. Users provide location and targeted garden photos; HIDRIQ constructs a **Garden Digital Twin** classifying vegetation, exposure, and zones to deliver weekly watering schedules without requiring smart controllers.
- **Explicit Caveat:** Photographs alone do **not** measure subsurface soil moisture. Photos classify taxonomy and canopy, which is then computed against numerical weather and $ET_0$ physics models.

---

## ADR 003: Hospitality Beachhead (Zephyr Hotels) Prior to Agriculture
- **Decision:** Launch with **Hospitality Landscaping (Hotels & Resorts)** in Morocco as the commercial beachhead via **Zephyr Hotels**.
- **Rationale:** High aesthetic standards, concentrated water bills, year-round operation. The architecture is built **agriculture-ready** from Day 1 (`Farm → Field → Block → Crop`), enabling a seamless expansion into high-value agriculture as Stage 3.

---

## ADR 004: Disciplined Truth & No Fabricated Savings Percentages
- **Decision:** Prohibit the publication of unsubstantiated percentage savings claims. The platform communicates its physical methodology and marks the Zephyr Hotels engagement as an active **POC / Design Partner**, committing to publishing only audited empirical results upon POC completion.

---

## ADR 005: Operational Progression (Analyze → Recommend → Autopilot)
- **Decision:** Structure customer onboarding into three distinct operational modes:
  1. **Analyze (Shadow Mode):** Auditing baseline schedules against weather physics without physical intervention.
  2. **Recommend:** Generating daily/weekly run-sheets for manual operator sign-off.
  3. **Autopilot:** Closed-loop automated valve execution only where supported integrations exist and after operator confidence is established.

---

## ADR 006: Visual & Design Language
- **Decision:** Adopt a **cinematic, high-end infrastructure and deep-tech aesthetic**:
  - Dark cinematic hero and technical sections contrasted with elegant editorial panels.
  - Deep charcoal/near-black backgrounds with restrained teal/aquatic accents.
  - Interactive Living Digital Twin spatial explorer as the visual centerpiece.

---

## ADR 007: Venture Identity & Governance
- **Decision:** The footer across all web properties and documents must contain the exact, unaltered attribution:
  > **“An EM300.co Company”**

---

## ADR 008: A Living Digital Twin of Every Managed Landscape (Master V3)
- **Context:** Treating HIDRIQ as merely an irrigation timer dashboard limits long-term venture enterprise value.
- **Decision:** Define the product destination as **a Living Digital Twin of every managed landscape**, with water intelligence as its foundational first layer.
- **Consequences:** Enables subsequent intelligence layers: plant stress, visual anomaly detection, leak localization, and predictive maintenance.

---

## ADR 009: Provider-Agnostic Multi-Source Abstraction Layer (Master V3)
- **Context:** Relying on a single geospatial, satellite, or weather vendor creates platform vulnerability and vendor lock-in.
- **Decision:** Build modular provider abstractions (`IGeospatialProvider`, `IWeatherProvider`, `ISatelliteProvider`, `IControllerProvider`, `IMeterProvider`).
- **Consequences:** HIDRIQ can switch from open-source Sentinel-2 to commercial PlanetScope, or from Open-Meteo to ECMWF HRES, without touching core engine logic.

---

## ADR 010: Automation-First User Onboarding (Master V3)
- **Context:** Requiring users to fill out complex forms or manually trace garden zones creates high friction and abandon rates.
- **Decision:** Adopt the philosophy: **“Ask the user for as little information as possible.”** Automatically derive location, elevation, terrain, weather, and garden zones. Present an initial discovery pass and ask simple confirmation questions. Request photos only to resolve specific system ambiguities.

---

## ADR 011: Autopilot Safety Model & Confidence-Based Fallback (Master V3)
- **Context:** Premature or unconstrained autonomous valve actuation risks flooding or catastrophic landscape damage.
- **Decision:** Enforce hardcoded daily volumetric caps, zone runtime limits, freeze/rain interlocks, and confidence fallbacks. If forecast confidence drops below threshold, the system automatically reverts from **AUTOPILOT to RECOMMENDATION MODE**. Safety strictly overrides optimization.

---

## ADR 012: Commercial Landing Page Focus & Funnel Streamlining
- **Context:** Displaying internal venture stage roadmaps and early design-partner trial callouts directly on the main landing page clutters customer acquisition and distracts from core product capabilities.
- **Decision:** Tailor the public landing page strictly to commercial conversion (Startups / Enterprises / Homeowners). Internal strategic roadmaps and design-partner POC milestones are maintained in dedicated venture documentation (`docs/POC-ZEPHYR.md`, `docs/ROADMAP.md`).

---

## ADR 013: Immediate Gratification Assessment & Conversion Funnel
- **Context:** Delaying assessment results ("we will email you next week") causes high funnel abandonment and fails to demonstrate instant product intelligence.
- **Decision:** Deliver an **immediate, interactive Water Intelligence Plan on screen**. The user immediately sees their optimal weekly volume, annual savings, optimal pre-dawn window (05:30–06:15 AM), 7-day run-sheet, 1-click WhatsApp export for groundskeepers, and an opt-in hook for recurring automated weather sync.

---

## ADR 014: Persistent Property Asset Model vs. Ephemeral Garden Form
- **Context:** Treating garden input as a one-time form or questionnaire requires returning users to start over, destroying customer retention and preventing longitudinal learning.
- **Decision:** Elevate **Property** to the primary persistent entity in HIDRIQ (`USER -> PROPERTIES[]`). Properties are permanently stored with full digital twins, spatial polygons, multi-overlay status, and audit history. Returning users land immediately in their asset command center ("WELCOME BACK").
- **Consequences:** Users can manage multi-property portfolios (e.g. Marbella Villa + Madrid House + Mallorca Villa) with 1-click switching.

---

## ADR 015: User Ground-Truth Calibration & Longitudinal Change Detection
- **Context:** Automated vision models and remote sensing will occasionally misclassify vegetation or irrigation hardware. Furthermore, sudden notifications about dry patches can induce user panic.
- **Decision:** 
  1. **User Corrections Become Data:** Any edit made by an operator in a zone drawer is written into immutable zone memory (`userCorrections[]`), tuning the agronomic water model and logging a `Memory Calibrated` audit event.
  2. **Non-Alarmist Change Detection:** Visual anomalies between sequential photos are framed as inquisitive investigation prompts (e.g. *"Slight color variation detected on west perimeter — check emitter #4 for mineral deposit"*) rather than alarming alerts.

---

## ADR 016: Deterministic Agronomic Physics vs. Generative LLM Recommendations (Master V5)
- **Context:** Using Large Language Models (LLMs) or black-box generative AI to invent irrigation run-times leads to hallucinated volumes, catastrophic plant overwatering, or root asphyxiation.
- **Decision:** Irrigation calculations are strictly **deterministic**, grounded in ASCE FAO-56 Penman-Monteith, dual crop coefficients ($K_c$), soil water depletion ($TAW, RAW$), and USDA-SCS effective rainfall. LLMs are explicitly prohibited from calculating water volumes or runtimes.
- **Consequences:** Verifiable physical truth, regulatory defensibility, and trust from commercial agronomic operators.

---

## ADR 017: Transparent 8-Point Explainability and Runtime Honesty (Master V5)
- **Context:** Black-box recommendations undermine operator trust, and fabricating precision when hardware precipitation rates are unknown misleads users.
- **Decision:** 
  1. Every recommendation must answer the 8 mandatory physical questions (Why required? How much? Why now? Why this zone? Supporting data? Assumptions? Confidence breakdown? What would change it?).
  2. If emitter precipitation rate is unknown, HIDRIQ **explicitly refuses to guess exact runtime**, stating that water depth is estimated and runtime cannot yet be calculated reliably until nozzle flow rates are verified.

