# HIDRIQ — Master System Architecture & Engine Specification

**Document Status:** Master Version 3.0  
**Classification:** Vendor-Neutral Water Intelligence & Digital Twin Architecture  
**Company:** HIDRIQ ([hidriq.com](https://hidriq.com))  

---

## 1. System Architecture Overview

HIDRIQ is structured around a decoupled, three-tier architecture:
1. **Multi-Source Provider Abstraction Layer:** Ingests heterogeneous geospatial, satellite, weather, and controller data without vendor lock-in.
2. **HIDRIQ Core Intelligence Layer:** Seven deterministic and machine-learning engines computing physical water balance, spatial digital twins, and safety bounds.
3. **Multi-Channel Distribution Layer:** Dual enterprise (**HIDRIQ BUSINESS**) and consumer (**HIDRIQ HOME**) interfaces.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                            1. PROVIDER ABSTRACTION LAYER                                    │
│  ├── IGeospatialProvider (Google Maps / OSM)    ├── IWeatherProvider (ECMWF / Open-Meteo)   │
│  ├── ISatelliteProvider (Sentinel-2 / Aerial)   ├── IElevationProvider (Copernicus DEM)     │
│  ├── IControllerProvider (Hunter/Rain Bird/Toro)├── IMeterProvider (Pulse / Ultrasonic)     │
└──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                               │ (Normalized HidriqPropertyState)
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                            2. HIDRIQ CORE INTELLIGENCE ENGINES                              │
│                                                                                             │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐      │
│  │ 1. Water Demand Engine  │  │ 2. Forecast Engine      │  │ 3. Optimization Engine  │      │
│  │    ASCE FAO-56 ET₀      │  │    NWP grids & Peff     │  │    Cycle & Soak Pumping │      │
│  └────────────┬────────────┘  └────────────┬────────────┘  └────────────┬────────────┘      │
│               │                            │                            │                   │
│               └────────────────────────────┼────────────────────────────┘                   │
│                                            ▼                                                │
│  ┌─────────────────────────┐  ┌─────────────────────────┐  ┌─────────────────────────┐      │
│  │ 4. Execution Engine     │  │ 5. Verification Engine  │  │ 6. Digital Twin Engine  │      │
│  │    APIs & Run-sheets    │  │    Meter Reconciliation │  │    Spatial Segmentation │      │
│  └─────────────────────────┘  └─────────────────────────┘  └─────────────────────────┘      │
│                                            │                                                │
│                                            ▼                                                │
│                               ┌─────────────────────────┐                                   │
│                               │ 7. Visual Health Engine │                                   │
│                               │    NDVI & Stress Change │                                   │
│                               └─────────────────────────┘                                   │
└──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                            3. MULTI-CHANNEL DISTRIBUTION LAYER                              │
│         HIDRIQ BUSINESS (Hospitality / Golf)  │  HIDRIQ HOME (Villas / Manual Gardens)      │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. The Seven Intelligence Engines

### Engine 1: Water Demand Engine
- Computes reference evapotranspiration ($ET_0$) via standardized ASCE / FAO-56 Penman-Monteith equations.
- Computes landscape zone evapotranspiration ($ET_L$) using the Landscape Coefficient Method:
  $$ET_L = K_L \times ET_0 \quad \text{where} \quad K_L = K_s \times K_d \times K_{mc}$$
  - $K_s$: Botanical species factor.
  - $K_d$: Foliage canopy density factor.
  - $K_{mc}$: Microclimate adjustment factor (solar aspect, wall reflections, wind exposure).

### Engine 2: Forecast Engine
- Ingests high-resolution global and regional numerical weather predictions (ECMWF, GFS, AROME).
- Computes **Effective Rainfall ($P_{eff}$)** factoring in soil infiltration capacity and surface slope.
- Calculates vapor pressure deficit ($VPD$) to anticipate peak transpirational pull on plant stomata.

### Engine 3: Optimization Engine
- Transforms net volumetric water requirements ($mm$) into operational valve runtimes ($minutes$).
- **Cycle-and-Soak Logic:** Divides runtimes into short intervals separated by soak periods to eliminate surface runoff on sloped turf or clay soils.
- **Hydraulic & Power Balancing:** Sequences valve stations to stay within mainline flow capacity and schedules pumping during low-cost electrical tariff windows (02:00–06:00).

### Engine 4: Execution Engine
- Pluggable controller adapters for Hunter Hydrawise (GraphQL), Rain Bird IQ4 (REST), Toro Horizon360, and Rachio.
- Generates human-readable digital run-sheets for manual groundskeepers.
- Dispatches Modbus/MQTT triggers to low-cost dry-contact relay retrofit modules.

### Engine 5: Verification & Learning Engine
- Compares metered consumption against modeled application.
- Real-time flow anomaly detection (mainline breaks, stuck open solenoids, clogged emitters).
- Uses observed soil dry-down curves to auto-calibrate soil water retention ($TAW$).

### Engine 6: Property & Landscape Digital Twin Engine
- Ingests cadastral boundaries, elevation grids, and aerial imagery.
- Automatically segments building footprints, swimming pools, hardscape, and garden zones.
- Generates 3D spatial models tracking micro-zone hydrological status (Adequate, Stress, Deficit, Irrigated).

### Engine 7: Visual Health & Anomaly Engine
- Computes Normalized Difference Vegetation Index (NDVI) and visual greenness indices from aerial and user-uploaded photos.
- Longitudinal comparison: compares current canopy turgor and color with historical baselines to detect chronic dry spots or disease symptoms.

---

## 3. The Continuous Automation Loop

Once a property is onboarded, HIDRIQ runs an automated background pipeline requiring zero daily manual user input:

$$\text{Daily Weather Ingestion} \longrightarrow \text{ET}_0 \text{ Calculation} \longrightarrow \text{Rainfall Reconciliation} \longrightarrow \text{Net Demand Computation} \longrightarrow \text{Schedule Optimization} \longrightarrow \text{Execution / Run-Sheet Push} \longrightarrow \text{Meter Ingestion} \longrightarrow \text{Anomaly Check} \longrightarrow \text{Proactive Notification}$$

---

## 4. The Autopilot Safety Architecture

Autonomous control is governed by hardcoded safety bounds where **safety strictly overrides optimization**:

1. **Maximum Daily Water Limits:** Hard volumetric ceiling ($m^3$) per zone prevents flooding under any algorithmic condition.
2. **Maximum Zone Runtime:** Hardware-level or software-level timeout limit per station.
3. **Rain & Freeze Interlock:** Immediate automatic cancellation if rainfall occurs or temperature drops below 2°C.
4. **Sensor Sanity Checks:** Discards out-of-range sensor readings ($>3\sigma$).
5. **Confidence Threshold Fallback:** If weather forecast certainty drops below threshold, reverts automatically from **AUTOPILOT to RECOMMENDATION MODE**.
6. **Physical & Digital Master Override:** Single-touch manual kill switch.
