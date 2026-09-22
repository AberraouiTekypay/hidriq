# HIDRIQ — Technical System Architecture

**Document Status:** Version 2.0  
**Domain:** [hidriq.com](https://hidriq.com)  
**System Classification:** Vendor-Neutral Water Intelligence & Optimization Platform  

---

## 1. Architectural Philosophy

HIDRIQ is built on three foundational architectural principles:

1. **Deterministic Agronomic & Physical Grounding:**
   Atmospheric physics, fluid mechanics, and plant physiology govern water movement. We prioritize established physical formulations (e.g., FAO-56 Penman-Monteith, dual crop coefficients, Green-Ampt infiltration) over unexplainable black-box machine learning for baseline water demand calculations.

2. **Machine Learning Where High-Value:**
   Machine learning is targeted specifically where deterministic models fail:
   - Computer vision for multi-species vegetation classification from user-submitted garden photos.
   - Microclimate bias correction of numerical weather models.
   - Anomaly detection on high-frequency flow meter data (leak detection, burst pipes, valve failures).
   - Dynamic parameter tuning (effective root depth and soil hydraulic conductivity calibration).

3. **Vendor-Neutral Decoupling:**
   The intelligence layer is strictly decoupled from the execution hardware. Controller drivers are pluggable adapters communicating over standard protocols.

---

## 2. The Core Closed Loop

The platform operates as a continuous, self-correcting feedback loop:

```
          ┌────────────────────────────────────────┐
          │               PREDICT                  │
          │  Calculate daily ET₀ & zone depletion   │
          └──────────────────┬─────────────────────┘
                             │
                             ▼
          ┌────────────────────────────────────────┐
          │                 ACT                    │
          │  Generate run-sheets / execute valves   │
          └──────────────────┬─────────────────────┘
                             │
                             ▼
          ┌────────────────────────────────────────┐
          │               MEASURE                  │
          │  Log flow meters, rain gauges, sensors │
          └──────────────────┬─────────────────────┘
                             │
                             ▼
          ┌────────────────────────────────────────┐
          │                LEARN                   │
          │  Reconcile predicted vs actual balance │
          └──────────────────┬─────────────────────┘
                             │
                             └──────── (Feeds back to PREDICT)
```

---

## 3. The Five Intelligence Engines

```
                               ┌────────────────────────────────┐
                               │       EXTERNAL DATA SOURCES     │
                               │  - NWP Weather Models (ECMWF)  │
                               │  - Satellite Multispectral     │
                               │  - Soil Taxonomy Grids         │
                               └───────────────┬────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                HIDRIQ INTELLIGENCE CORE                                     │
│                                                                                             │
│  ┌───────────────────────┐                    ┌───────────────────────┐                    │
│  │ 1. WATER DEMAND       │                    │ 2. FORECAST           │                    │
│  │    ENGINE             │                    │    ENGINE             │                    │
│  │ - FAO-56 Penman-      │                    │ - High-res spatial    │                    │
│  │   Monteith ET₀        │                    │   interpolation       │                    │
│  │ - Landscape coeff (Kl)│                    │ - Ensemble precip prob│                    │
│  │ - Soil reservoir TAW  │                    │ - Vapor pressure def. │                    │
│  └───────────┬───────────┘                    └───────────┬───────────┘                    │
│              │                                            │                                 │
│              └────────────────────┬───────────────────────┘                                 │
│                                   │                                                         │
│                                   ▼                                                         │
│                      ┌────────────────────────┐                                             │
│                      │ 3. OPTIMIZATION        │                                             │
│                      │    ENGINE              │                                             │
│                      │ - Cycle & soak logic   │                                             │
│                      │ - Hydraulic constraints│                                             │
│                      │ - Time-of-use tariffs  │                                             │
│                      └────────────┬───────────┘                                             │
│                                   │                                                         │
│              ┌────────────────────┴───────────────────────┐                                 │
│              ▼                                            ▼                                 │
│  ┌───────────────────────┐                    ┌───────────────────────┐                    │
│  │ 4. EXECUTION          │                    │ 5. VERIFICATION &     │                    │
│  │    ENGINE             │                    │    LEARNING ENGINE    │                    │
│  │ - Controller Adapters │                    │ - Meter reconciliation│                    │
│  │ - Webhook / API push  │                    │ - Anomaly / leak det. │                    │
│  │ - Run-sheet generator │                    │ - Model auto-tuning   │                    │
│  └───────────────────────┘                    └───────────────────────┘                    │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Engine 1: Water Demand Engine
Calculates daily reference evapotranspiration ($ET_0$) using the standardized ASCE / FAO-56 Penman-Monteith equation:

$$ET_0 = \frac{0.408 \Delta (R_n - G) + \gamma \frac{900}{T + 273} u_2 (e_s - e_a)}{\Delta + \gamma (1 + 0.34 u_2)}$$

Where:
- $R_n$: Net radiation at the crop surface ($MJ / m^2 \cdot \text{day}$)
- $G$: Soil heat flux density ($MJ / m^2 \cdot \text{day}$)
- $T$: Mean daily air temperature at 2m height ($^\circ C$)
- $u_2$: Wind speed at 2m height ($m/s$)
- $e_s - e_a$: Vapor pressure deficit ($kPa$)
- $\Delta$: Slope of saturation vapor pressure curve ($kPa / ^\circ C$)
- $\gamma$: Psychrometric constant ($kPa / ^\circ C$)

For landscape zones, actual plant evapotranspiration ($ET_L$) is calculated via the Landscape Coefficient Method (Costello et al., University of California):

$$ET_L = K_L \times ET_0 \quad \text{where} \quad K_L = K_s \times K_d \times K_{mc}$$

- $K_s$: Species factor (botanical water need)
- $K_d$: Density factor (vegetation canopy coverage)
- $K_{mc}$: Microclimate factor (sun exposure, wind exposure, proximity to heat-retaining paved surfaces)

### Engine 2: Forecast Engine
- Ingests high-resolution global and regional numerical weather models (ECMWF HRES, GFS, Meteo-France AROME).
- Computes **Effective Rainfall ($P_{eff}$)** rather than total rainfall, accounting for surface runoff, canopy interception, and infiltration capacity:
  $$P_{eff} = f(P_{total}, \text{Soil Hydrologic Group}, \text{Antecedent Moisture}, \text{Slope})$$
- Evaluates precipitation probability ($PoP$) over rolling 24h, 48h, and 72h windows to delay watering when natural rainfall is probable.

### Engine 3: Optimization Engine
Transforms net water requirements into actionable runtime minutes per valve zone:
- **Cycle-and-Soak Scheduling:** Mitigates runoff on slopes and in low-permeability soils by dividing watering into multiple short pulses separated by soak periods:
  $$\text{Cycle Duration} = \min\left(\text{Total Required Runtime}, \frac{\text{Surface Storage Depth}}{\text{Precipitation Rate} - \text{Infiltration Rate}}\right)$$
- **Hydraulic & Pressure Balancing:** Prevents pressure drops by ensuring simultaneous active zones do not exceed the main supply line flow capacity ($m^3 / h$).
- **Energy Window Optimization:** Schedules pumping during off-peak electrical tariff hours (typically 02:00–06:00) when atmospheric evaporative losses are minimal and power costs are lowest.

### Engine 4: Execution / Controller Integration Engine
Translates optimized schedules into operational delivery based on the site's capability tier:
- **Tier 1 (Manual Run-Sheet):** Generates structured PDF/WhatsApp instructions for on-site groundskeepers or homeowners.
- **Tier 2 (Cloud Controller API):** Pushes runtime programs directly to manufacturer cloud APIs (e.g., Hunter Hydrawise GraphQL/OAuth, Rain Bird IQ4 REST API, Toro Horizon360).
- **Tier 3 (Local Hardware Retrofit Bridge):** Low-cost IP/Cellular relay bridge connected to existing 24VAC common/valve wires for closed-loop control without replacing existing enclosures.

### Engine 5: Verification & Learning Engine
- Compares metered consumption with modeled application depth.
- **Anomaly Detection:** Flags standard deviation outliers in water flow, such as:
  - High continuous flow = Mainline burst or stuck solenoid valve.
  - Low flow = Clogged drip emitters or closed isolation valve.
  - Flow during scheduled off-periods = Manual bypass or unauthorized usage.
- Updates empirical soil water retention coefficients based on observed seasonal dry-down curves.

---

## 4. Computer Vision & Garden Digital Twin Architecture

For **Manual Garden Mode**, the vision pipeline ingests photos and builds the spatial model:

```
[User Photos / Video Walkthrough]
                 │
                 ▼
     ┌───────────────────────┐
     │ Preprocessing         │ ===> EXIF GPS extraction & orientation validation
     └───────────┬───────────┘
                 │
                 ▼
     ┌───────────────────────┐
     │ Semantic Segmentation │ ===> Multi-class segmentation (Turf, Tree Canopy,
     └───────────┬───────────┘      Shrub, Flower, Hardscape, Water, Soil)
                 │
                 ▼
     ┌───────────────────────┐
     │ Solar Exposure Map    │ ===> Shadow extraction mapped to solar azimuth & zenith
     └───────────┬───────────┘
                 │
                 ▼
     ┌───────────────────────┐
     │ Digital Twin Zone Map │ ===> Output: Zonal geometry, estimated Kc & density
     └───────────────────────┘
```

---

## 5. Security, Reliability & Fail-Safe Architecture

1. **Default-Safe Failover:** If connectivity or weather ingestion is lost, the local controller defaults to conservative base programs or safe-hold states.
2. **Maximum Runtime Lockout:** Hardcoded software limits ensure no valve zone can remain open longer than a site-configured threshold, preventing accidental flood events.
3. **Data Protection:** All location, imagery, and meter data are encrypted in transit (TLS 1.3) and at rest (AES-256).
