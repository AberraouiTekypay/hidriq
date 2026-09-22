# HIDRIQ — Architectural Decision Records (ADRs)

**Company:** HIDRIQ ([hidriq.com](https://hidriq.com))  
**Positioning:** Water Intelligence  
**Parent Venture:** An EM300.co Company  

---

## ADR 001: Independent Software Layer vs. Proprietary Hardware

### Context
Incumbents like Rain Bird, Hunter, Toro, and Netafim make the vast majority of their margins by selling proprietary controllers, valves, and decoders. Entering the market as another hardware company requires massive CAPEX, injection molding, inventory carrying costs, distributor relationships, and long sales cycles.

### Decision
HIDRIQ is structured strictly as an **independent, vendor-neutral water intelligence and optimization software layer**. We adopt the positioning: *“Your infrastructure. Our intelligence.”* Existing irrigation infrastructure is preserved wherever technically feasible.

### Consequences
- **Pros:** Fast sales velocity, zero supply chain risk, capital efficiency, multi-site portfolio appeal.
- **Cons:** Requires building robust software adapters for legacy protocols and dealing with varying vendor API availability.

---

## ADR 002: Core B2C Offering — Manual Garden Mode & Digital Twins

### Context
Smart sprinkler controllers (e.g., Rachio) only target homes with pre-installed, multi-valve electronic in-ground irrigation. Over 80% of residential garden owners globally—including owners of luxury Mediterranean second homes—water manually or using basic spigots and hoses.

### Decision
Elevate **Manual Garden Mode** to a core B2C product. Users upload location and 3–10 garden photos; HIDRIQ constructs an approximate **Garden Digital Twin** that classifies vegetation, exposure, and approximate zones to deliver human-readable weekly watering schedules.

### Explicit Caveat
We explicitly state in all documentation and UI that photographs alone do **not** measure soil moisture; they establish vegetation taxonomy, canopy density, and microclimate exposure, which is then computed against numerical weather and $ET_0$ physics models.

---

## ADR 003: Hospitality Beachhead (Zephyr Hotels) Prior to Agriculture

### Context
Agriculture consumes ~70% of global freshwater withdrawals, representing the largest absolute market. However, agricultural sales cycles are seasonal, margins are tight, and farmers are risk-averse to experimental software.

### Decision
Launch with **Hospitality Landscaping (Hotels & Resorts)** as the commercial beachhead, validated through an initial design partnership with **Zephyr Hotels in Morocco**.

### Rationale
- Resorts have high aesthetic standards, concentrated water bills, immediate budget authority, and year-round operations.
- The underlying architecture is built **agriculture-ready** from Day 1 (`Farm → Field → Block → Crop`), enabling a seamless expansion into high-value agriculture as Stage 3.

---

## ADR 004: Disciplined Truth & No Fabricated Savings Percentages

### Context
Many climate-tech startups claim generic *"Save 50% on your water bill!"* without baseline empirical evidence. This undermines credibility with experienced engineers, agronomists, and institutional hotel operators.

### Decision
HIDRIQ prohibits the publication of unsubstantiated percentage savings claims. The platform communicates its physical methodology (FAO-56 Penman-Monteith, microclimate modeling) and clearly marks the Zephyr Hotels engagement as an active **POC / Design Partner**, committing to publishing only audited empirical results upon POC completion.

---

## ADR 005: Operational Progression (Analyze → Recommend → Autopilot)

### Context
Groundskeepers and landscape managers are reluctant to hand total control of expensive landscapes to autonomous software on Day 1.

### Decision
Structure customer onboarding into three distinct operational modes:
1. **Analyze:** Shadow mode auditing baseline schedules against weather physics without physical intervention.
2. **Recommend:** Generating daily/weekly run-sheets for manual operator sign-off.
3. **Autopilot:** Closed-loop automated valve execution only where supported integrations exist and after operator confidence is established.

---

## ADR 006: Visual & Design Language

### Context
Water technology websites often fall into generic clichés (blue water droplets, cartoon leaves, hands holding soil, cheap SaaS dashboards).

### Decision
Adopt a **cinematic, high-end infrastructure and deep-tech aesthetic**:
- Dark cinematic hero and technical sections contrasted with elegant editorial panels.
- Deep charcoal/near-black backgrounds with restrained teal/aquatic accents.
- Sophisticated sans-serif typography, generous whitespace, and high-resolution aerial imagery.
- Subtle data overlays showing the physical-to-digital translation without sci-fi gimmickry.

---

## ADR 007: Venture Identity & Governance

### Context
HIDRIQ is founded under the EM300 venture umbrella.

### Decision
The footer across all web properties and documents must contain the exact, unaltered attribution:
> **“An EM300.co Company”**
No variations (such as *"Powered by EM300"* or *"Part of EM300"*) are permitted.
