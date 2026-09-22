# HIDRIQ — Multi-Source Data Layer & Provider Abstractions

**Document Status:** Grounded Architecture Specification (Master V3)  
**Company:** HIDRIQ ([hidriq.com](https://hidriq.com))  
**Positioning:** Water Intelligence  
**Core Promise:** The intelligence layer for water.  

---

## 1. Provider-Agnostic Design Philosophy

HIDRIQ is built to avoid hard-coding dependencies on any single proprietary data vendor. Atmospheric physics, spatial geometries, and soil hydraulics are universal; external providers are treated as interchangeable data ingestion adapters behind strict HIDRIQ interfaces.

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                 EXTERNAL PROVIDER ECOSYSTEM                                 │
│  [Google Maps / OpenStreetMap]   [ECMWF / Open-Meteo / NOAA]   [Sentinel-2 / Planet Labs]   │
│  [SRTM / Copernicus DEM]         [Hunter / Rain Bird APIs]     [Pulse / LoRaWAN Flow Meters] │
└──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                               │
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                              HIDRIQ PROVIDER ABSTRACTION LAYER                              │
│                                                                                             │
│   ├── IGeospatialProvider        ├── IWeatherProvider          ├── ISatelliteProvider       │
│   ├── IElevationProvider         ├── IEvapotranspirationProvider├── IControllerProvider     │
│   └── IMappingProvider           ├── ISensorProvider           └── IMeterProvider           │
└──────────────────────────────────────────────┬──────────────────────────────────────────────┘
                                               │ (Normalized Ingestion Models)
                                               ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│                                HIDRIQ CORE INTELLIGENCE ENGINE                              │
│                [Digital Twin]  [Water Demand]  [Forecast]  [Optimization]  [Safety]         │
└─────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Ingestion Abstraction Interfaces

### 2.1 IGeospatialProvider & IMappingProvider
- **Role:** Converts addresses, postal codes, or raw GPS coordinates into cadastral boundaries, building footprints, and spatial bounding boxes.
- **Supported Implementations:**
  - **Google Maps Platform (Places & Geocoding API):** High-precision global reverse geocoding and property boundary resolution.
  - **OpenStreetMap / Overpass API:** Open-source fallback for spatial geometry, public rights-of-way, and parcel delineation.
  - **Cadastral APIs (Spain Catastro & Morocco ANCFCC):** Official parcel registry APIs where legally accessible.

### 2.2 ISatelliteProvider
- **Role:** Ingests high-resolution multispectral and RGB optical imagery for automated garden and vegetation classification.
- **Supported Implementations:**
  - **European Space Agency Sentinel-2 (Copernicus Open Access Hub):** Free, multi-spectral imagery (10m resolution) on 5-day revisit cycles. Used for regional NDVI (Normalized Difference Vegetation Index) and moisture index (NDWI).
  - **High-Resolution Commercial Aerials (Google Maps Static Satellite / Mapbox Satellite):** Sub-meter RGB imagery used for initial boundary discovery, lawn separation, and hardscape detection.
  - **PlanetScope (Optional Enterprise):** 3m daily constellation imagery for large-scale golf courses and agricultural blocks.

### 2.3 IWeatherProvider & IEvapotranspirationProvider
- **Role:** Ingests hourly historical, real-time observed, and 7–14 day forecast weather variables.
- **Supported Implementations:**
  - **ECMWF HRES & IFS:** European Centre for Medium-Range Weather Forecasts 9km global deterministic models (gold standard for Mediterranean microclimates).
  - **Open-Meteo Ensemble API:** High-resolution multi-model weather engine providing direct FAO-56 Penman-Monteith reference $ET_0$, solar radiation ($MJ/m^2$), and hourly precipitation probability.
  - **Météo-France AROME / DWD ICON:** Ultra-high-resolution regional models for southern Europe and North Africa.
  - **Local On-Site Weather Stations (Ambient, Davis, Rain Bird WS-PRO):** Ingested via standard Weather Underground or MQTT endpoints for immediate microclimate ground-truthing.

### 2.4 IElevationProvider
- **Role:** Supplies digital elevation models (DEM) to determine surface slope angle, water runoff velocity, and solar aspect (north/south hillside radiation exposure).
- **Supported Implementations:**
  - **Copernicus DEM (GLO-30):** Global 30m resolution digital surface model.
  - **NASA SRTM v3:** Shuttle Radar Topography Mission elevation grid.
  - **LiDAR / UAV Orthomosaics (Enterprise):** Centimeter-accurate topography for golf courses and luxury multi-level terraced villas.

### 2.5 IControllerProvider
- **Role:** Bi-directional bridge to existing physical irrigation controllers.
- **Supported Implementations:**
  - **Hunter Hydrawise API:** GraphQL & OAuth 2.0 interface for remote schedule overrides and runtime logging.
  - **Rain Bird IQ4 REST API:** Commercial BMS integration protocol for central controllers.
  - **Toro Horizon360 OpenAPI:** Equipment and zone management endpoints.
  - **Rachio Cloud REST API:** Webhook-driven residential controller adapter.
  - **HIDRIQ Relay Bridge (Hardware-Neutral Retrofit):** Modbus / MQTT cellular bridge for legacy 24VAC multi-station controllers.
  - **Manual Run-Sheet Dispatcher:** Formats optimized instructions for groundskeepers and homeowners without connected controllers.

### 2.6 IMeterProvider & ISensorProvider
- **Role:** Ingests water volume consumption and ground moisture telemetry.
- **Supported Implementations:**
  - **Pulse-Output Sub-Meters:** Optical pulse counters (1 pulse = 1 liter or 10 liters) connected to LoRaWAN or NB-IoT dataloggers.
  - **Ultrasonic Flow Meters:** In-line transit-time ultrasonic meters logging continuous flow rate ($L/min$) to detect micro-leaks.
  - **Multi-Depth Soil Capacitance Probes (Optional):** Sentek, Decagon/METER Group, or CropX SDI-12 probes measuring volumetric water content (VWC) at 10cm, 20cm, 30cm, and 50cm depths.

---

## 3. Normalized Internal Schema (`HidriqPropertyState`)

External provider data is transformed into a standardized, immutable internal payload consumed by the Water Demand Engine:

```typescript
export interface HidriqPropertyState {
  propertyId: string;
  coordinates: { latitude: number; longitude: number; elevationMeters: number };
  microclimate: {
    slopeDegrees: number;
    solarAspectAzimuth: number;
    windShelterFactor: number;
  };
  weather: {
    et0ReferenceMmDay: number;
    temperatureMeanC: number;
    solarRadiationMjM2Day: number;
    vaporPressureDeficitKpa: number;
    rainfallPast24hMm: number;
    forecastEffectiveRainfall48hMm: number;
    precipitationProbabilityPct: number;
  };
  zones: Array<{
    zoneId: string;
    label: string;
    vegetationCategory: "lawn" | "citrus_grove" | "shrub_border" | "hedges" | "floral" | "vegetable";
    cropCoefficientKc: number;
    canopyDensityKd: number;
    microclimateExposureKmc: number;
    rootDepthCm: number;
    soilReadilyAvailableWaterMm: number;
    lastIrrigationTimestamp: string;
    flowRateLitersPerMinute: number;
    hardwareControllerId?: string;
  }>;
}
```

---

## 4. Licensing, Attribution & Compliance

1. **Unsplash Photographic Assets:** Verified under the Unsplash License (free for commercial and non-commercial use). See [`IMAGE_SOURCES.md`](file:///C:/hidriq/docs/IMAGE_SOURCES.md).
2. **Open-Meteo & OpenStreetMap:** Compliant with Open Database License (ODbL) and CC BY 4.0, preserving all required open data notices.
3. **Copernicus Sentinel Data:** Utilized in full compliance with the European Commission Copernicus Open Access terms (free, full, and open data policy).
4. **Google Maps Platform:** All map rendering and geocoding implementations adhere to the Google Maps Platform Terms of Service, utilizing client-side SDK rendering without unauthorized server-side tile caching.
