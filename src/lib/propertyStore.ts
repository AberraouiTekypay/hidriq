"use client";

import {
  SpeciesKnowledge,
  SoilProfileKnowledge,
  IrrigationInfrastructureProfile,
  ZoneWaterBalance,
  ExplainabilityReport,
  ConfidenceBreakdown,
  UserConfirmationPrompt,
  DataStatus,
  getSpeciesKnowledge,
  getSoilProfile,
  calculateZoneWaterDemand,
  evaluateVegetationConfidence,
} from "./agronomics";

export type WaterStatusType = "GOOD" | "ATTENTION" | "NEEDS_WATER" | "OVERWATERED" | "UNKNOWN";
export type VegetationStatusType = "HEALTHY" | "WATCH" | "STRESSED" | "ANOMALY";
export type IrrigationStatusType = "NORMAL" | "RECENTLY_IRRIGATED" | "NOT_IRRIGATED" | "POSSIBLE_ISSUE";
export type HeatmapColorType = "green" | "yellow" | "orange" | "red" | "blue";
export type PropertyOverallState = "ALL_GOOD" | "ATTENTION_REQUIRED" | "ACTION_REQUIRED" | "ANOMALY_DETECTED" | "OFFLINE";

export interface ZoneCorrection {
  field: string;
  original: string;
  corrected: string;
  timestamp: string;
}

export interface PropertyCoordinates {
  latitude: number;
  longitude: number;
  formatted: string;
  accuracy?: string;
}

export interface PropertyZone {
  id: string;
  number: number;
  name: string;
  shortName: string;
  type: "lawn" | "trees" | "hedge" | "flower_bed" | "pool_surround" | "vegetables";
  vegetation: string;
  soilProfile: string;
  irrigationMethod: string;
  areaM2: number;
  waterStatus: WaterStatusType;
  vegetationStatus: VegetationStatusType;
  irrigationStatus: IrrigationStatusType;
  heatmapLevel: HeatmapColorType;
  estimatedWaterRequirement: string;
  recentRainfall: string;
  recentIrrigation: string;
  expectedRainfall: string;
  recommendedAction: string;
  confidence: number;
  polygon: { x: number; y: number }[];
  center: { x: number; y: number };
  userCorrections: ZoneCorrection[];

  // V5 Master Agronomic Additions
  speciesId?: string;
  speciesKnowledge?: SpeciesKnowledge;
  soilProfileKnowledge?: SoilProfileKnowledge;
  irrigationProfile?: IrrigationInfrastructureProfile;
  waterBalance?: ZoneWaterBalance;
  explainability?: ExplainabilityReport;
  confidenceBreakdown?: ConfidenceBreakdown;
  confirmationPrompt?: UserConfirmationPrompt;
  agronomicDataSource?: DataStatus;
}

export interface PropertyTimelineEvent {
  id: string;
  date: string;
  time: string;
  title: string;
  description: string;
  type: "recommendation" | "weather" | "irrigation" | "photo" | "twin" | "anomaly" | "correction";
  badge?: string;
}

export interface PropertyChangeDetection {
  id: string;
  zoneId: string;
  zoneName: string;
  title: string;
  dateDetected: string;
  period: string;
  observations: string[];
  recommendation: string;
  status: "INVESTIGATING" | "CONFIRMED" | "RESOLVED";
  beforeImg: string;
  afterImg: string;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  coordinates: PropertyCoordinates;
  elevation: string;
  solarAzimuth: string;
  timezone: string;
  climateZone: string;
  referenceET0: string;
  overallState: PropertyOverallState;
  healthyPercentage: number;
  waterAttentionZones: number;
  nextAction: string;
  createdAt: string;
  updatedAt: string;
  zones: PropertyZone[];
  timeline: PropertyTimelineEvent[];
  changeDetections: PropertyChangeDetection[];
}

const STORAGE_KEY = "hidriq_properties_v5";
const ACTIVE_PROPERTY_KEY = "hidriq_active_property_id_v5";

// Default weather profile for Mediterranean summer/early autumn baseline
const DEFAULT_WEATHER = {
  referenceET0MmDay: 4.6,
  forecastNext48hET0MmDay: 4.8,
  recentRainfallPast48hMm: 2.0,
  expectedRainfallNext5DaysMm: 0.0,
  vaporPressureDeficitKPa: 1.8,
  solarRadiationMjM2Day: 22.4,
  avgTemperatureC: 27.5,
  relativeHumidityPercent: 42,
  windSpeedMs: 2.8,
  season: 'summer' as const,
};

function buildZoneAgronomics(
  zoneId: string,
  zoneName: string,
  areaM2: number,
  speciesId: string,
  soilKey: string,
  irrigationMethod: 'rotary_sprinkler' | 'drip' | 'micro_sprinkler' | 'hose_manual',
  precipitationRateMmH: number | null,
  priorDepletionMm: number,
  confidenceOverride?: number
) {
  const species = getSpeciesKnowledge(speciesId);
  const soil = getSoilProfile(soilKey, 'ESTIMATED');
  
  const irrigation: IrrigationInfrastructureProfile = {
    method: irrigationMethod,
    applicationEfficiency: irrigationMethod === 'drip' ? 0.90 : irrigationMethod === 'rotary_sprinkler' ? 0.75 : 0.65,
    distributionUniformity: 0.82,
    precipitationRateMmH,
    flowRateLMin: precipitationRateMmH ? Math.round((precipitationRateMmH * areaM2) / 60) : null,
    controllerMakeModel: 'Rain Bird ESP-Me3 with IQ Cloud',
    dataStatus: precipitationRateMmH ? 'MEASURED' : 'UNKNOWN',
    confidence: precipitationRateMmH ? 92 : 45,
    source: precipitationRateMmH ? 'Zone Emitter Hydro-Audit' : 'Unmeasured Hardware',
  };

  const calc = calculateZoneWaterDemand({
    zoneId,
    zoneName,
    zoneAreaM2: areaM2,
    species,
    soil,
    irrigation,
    priorDepletionMm,
    weather: DEFAULT_WEATHER,
  });

  const prompt = evaluateVegetationConfidence(speciesId, confidenceOverride ?? species.citation.confidence);

  return {
    speciesKnowledge: species,
    soilProfileKnowledge: soil,
    irrigationProfile: irrigation,
    waterBalance: calc.waterBalance,
    explainability: calc.explainability,
    confidenceBreakdown: calc.confidenceBreakdown,
    confirmationPrompt: prompt,
    calcStatus: calc.status,
    recommendedAction: calc.recommendedAction,
    estimatedWaterReq: `${calc.grossIrrigationRequirementMm} mm (${calc.volumeLiters} L)`,
  };
}

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: "prop_marbella_01",
    name: "Marbella Villa",
    address: "Calle de los Jazmines 14, Nueva Andalucía, Marbella, Spain",
    coordinates: {
      latitude: 36.5098,
      longitude: -4.8863,
      formatted: "36.5098° N, 4.8863° W",
      accuracy: "±8m",
    },
    elevation: "142 m MSL",
    solarAzimuth: "South-Facing (185° Azimuth)",
    timezone: "Europe/Madrid",
    climateZone: "Mediterranean Semi-Arid (Csa)",
    referenceET0: "4.6 mm/day",
    overallState: "ATTENTION_REQUIRED",
    healthyPercentage: 80,
    waterAttentionZones: 1,
    nextAction: "Irrigate Zone 03 (Oleander Hedge) tomorrow morning before 07:30 AM.",
    createdAt: "2026-08-15T09:00:00Z",
    updatedAt: "2026-09-22T08:30:00Z",
    zones: [
      (() => {
        const ag = buildZoneAgronomics("zone-1", "Front Bermuda Lawn", 180, "turf_bermuda", "sandy_loam", "rotary_sprinkler", 15.0, 4.0);
        return {
          id: "zone-1",
          number: 1,
          name: "Zone 01 — Front Bermuda Lawn",
          shortName: "Front Lawn",
          type: "lawn" as const,
          vegetation: ag.speciesKnowledge.commonName,
          soilProfile: `${ag.soilProfileKnowledge.soilType} (${ag.speciesKnowledge.rootDepthCm.default} cm root depth)`,
          irrigationMethod: "Rotary MP Rotator Sprinklers (15 mm/h)",
          areaM2: 180,
          waterStatus: "GOOD" as const,
          vegetationStatus: "HEALTHY" as const,
          irrigationStatus: "NORMAL" as const,
          heatmapLevel: "green" as const,
          estimatedWaterRequirement: ag.estimatedWaterReq,
          recentRainfall: "2 mm (48h ago)",
          recentIrrigation: "22 min (Tuesday 05:45)",
          expectedRainfall: "0 mm (Next 5 days)",
          recommendedAction: ag.recommendedAction,
          confidence: 94,
          polygon: [
            { x: 12, y: 15 },
            { x: 48, y: 15 },
            { x: 45, y: 48 },
            { x: 12, y: 44 },
          ],
          center: { x: 28, y: 30 },
          userCorrections: [],
          speciesId: "turf_bermuda",
          speciesKnowledge: ag.speciesKnowledge,
          soilProfileKnowledge: ag.soilProfileKnowledge,
          irrigationProfile: ag.irrigationProfile,
          waterBalance: ag.waterBalance,
          explainability: ag.explainability,
          confidenceBreakdown: ag.confidenceBreakdown,
          confirmationPrompt: ag.confirmationPrompt,
          agronomicDataSource: "USER_CONFIRMED" as const,
        };
      })(),
      (() => {
        // ZONE 2: Mature Centenary Olives — Water Balance Sufficient, NO IRRIGATION REQUIRED!
        const ag = buildZoneAgronomics("zone-2", "Centenary Olive Grove", 240, "tree_mature_olive", "clay_loam", "drip", 4.0, 8.0);
        return {
          id: "zone-2",
          number: 2,
          name: "Zone 02 — Centenary Olive Grove",
          shortName: "Olive Grove",
          type: "trees" as const,
          vegetation: ag.speciesKnowledge.commonName,
          soilProfile: `${ag.soilProfileKnowledge.soilType} (120 cm deep taproot)`,
          irrigationMethod: "Pressure-Compensated Root Drip (4 mm/h)",
          areaM2: 240,
          waterStatus: "GOOD" as const,
          vegetationStatus: "HEALTHY" as const,
          irrigationStatus: "NORMAL" as const,
          heatmapLevel: "green" as const,
          estimatedWaterRequirement: ag.estimatedWaterReq,
          recentRainfall: "2 mm (48h ago)",
          recentIrrigation: "40 min deep soak (Sunday)",
          expectedRainfall: "0 mm (Next 5 days)",
          recommendedAction: "No irrigation required today. Deep 120cm root column holds 140+ mm available moisture.",
          confidence: 97,
          polygon: [
            { x: 52, y: 12 },
            { x: 88, y: 14 },
            { x: 86, y: 46 },
            { x: 50, y: 44 },
          ],
          center: { x: 70, y: 28 },
          userCorrections: [],
          speciesId: "tree_mature_olive",
          speciesKnowledge: ag.speciesKnowledge,
          soilProfileKnowledge: ag.soilProfileKnowledge,
          irrigationProfile: ag.irrigationProfile,
          waterBalance: ag.waterBalance,
          explainability: ag.explainability,
          confidenceBreakdown: ag.confidenceBreakdown,
          confirmationPrompt: ag.confirmationPrompt,
          agronomicDataSource: "MEASURED" as const,
        };
      })(),
      (() => {
        // ZONE 3: Oleander Hedge — Deficit Reached, Attention Required!
        const ag = buildZoneAgronomics("zone-3", "Perimeter Oleander Hedge", 95, "shrub_oleander", "sandy_loam", "drip", 8.0, 22.0);
        return {
          id: "zone-3",
          number: 3,
          name: "Zone 03 — Perimeter Oleander Hedge",
          shortName: "Perimeter Hedge",
          type: "hedge" as const,
          vegetation: ag.speciesKnowledge.commonName,
          soilProfile: `${ag.soilProfileKnowledge.soilType} (60 cm root depth)`,
          irrigationMethod: "Inline Surface Micro-Drip (8 mm/h)",
          areaM2: 95,
          waterStatus: "NEEDS_WATER" as const,
          vegetationStatus: "WATCH" as const,
          irrigationStatus: "NOT_IRRIGATED" as const,
          heatmapLevel: "red" as const,
          estimatedWaterRequirement: ag.estimatedWaterReq,
          recentRainfall: "0 mm (Canopy interception loss)",
          recentIrrigation: "0 min (Past 6 days)",
          expectedRainfall: "0 mm (High solar load)",
          recommendedAction: "Irrigate 24 min tomorrow before 07:30 AM (Cycle & Soak: 2x 12m).",
          confidence: 91,
          polygon: [
            { x: 86, y: 14 },
            { x: 96, y: 16 },
            { x: 94, y: 88 },
            { x: 84, y: 86 },
          ],
          center: { x: 90, y: 52 },
          userCorrections: [],
          speciesId: "shrub_oleander",
          speciesKnowledge: ag.speciesKnowledge,
          soilProfileKnowledge: ag.soilProfileKnowledge,
          irrigationProfile: ag.irrigationProfile,
          waterBalance: ag.waterBalance,
          explainability: ag.explainability,
          confidenceBreakdown: ag.confidenceBreakdown,
          confirmationPrompt: ag.confirmationPrompt,
          agronomicDataSource: "USER_CONFIRMED" as const,
        };
      })(),
      (() => {
        // ZONE 4: Lavender & Rosemary — Xeric species, healthy, with user confirmation history
        const ag = buildZoneAgronomics("zone-4", "Mediterranean Lavender & Rosemary", 65, "aromatic_lavender_rosemary", "calcareous_loam", "micro_sprinkler", null, 6.0);
        return {
          id: "zone-4",
          number: 4,
          name: "Zone 04 — Mediterranean Aromatic Beds",
          shortName: "Aromatic Beds",
          type: "flower_bed" as const,
          vegetation: ag.speciesKnowledge.commonName,
          soilProfile: `${ag.soilProfileKnowledge.soilType} with Gravel Mulch`,
          irrigationMethod: "Micro-Spray (Flow Rate UNKNOWN)",
          areaM2: 65,
          waterStatus: "GOOD" as const,
          vegetationStatus: "HEALTHY" as const,
          irrigationStatus: "NORMAL" as const,
          heatmapLevel: "green" as const,
          estimatedWaterRequirement: ag.estimatedWaterReq,
          recentRainfall: "2 mm",
          recentIrrigation: "15 min (Thursday)",
          expectedRainfall: "0 mm",
          recommendedAction: "Xeric adaptation active. Do not overwater — root asphyxiation risk.",
          confidence: 86,
          polygon: [
            { x: 14, y: 48 },
            { x: 44, y: 50 },
            { x: 42, y: 86 },
            { x: 12, y: 84 },
          ],
          center: { x: 26, y: 68 },
          userCorrections: [
            {
              field: "vegetation",
              original: "Ornamental Turf",
              corrected: "Lavender & Rosemary Beds",
              timestamp: "2026-09-10T14:20:00Z",
            },
          ],
          speciesId: "aromatic_lavender_rosemary",
          speciesKnowledge: ag.speciesKnowledge,
          soilProfileKnowledge: ag.soilProfileKnowledge,
          irrigationProfile: ag.irrigationProfile,
          waterBalance: ag.waterBalance,
          explainability: ag.explainability,
          confidenceBreakdown: ag.confidenceBreakdown,
          confirmationPrompt: ag.confirmationPrompt,
          agronomicDataSource: "USER_CONFIRMED" as const,
        };
      })(),
      (() => {
        // ZONE 5: Zoysia Lawn with low confidence confirmation prompt (72% confidence)
        const ag = buildZoneAgronomics("zone-5", "Pool Terrace Lawn", 130, "turf_zoysia", "enriched_loam", "rotary_sprinkler", 12.0, 5.0, 72);
        return {
          id: "zone-5",
          number: 5,
          name: "Zone 05 — Pool Terrace Lawn",
          shortName: "Pool Lawn",
          type: "pool_surround" as const,
          vegetation: ag.speciesKnowledge.commonName,
          soilProfile: `${ag.soilProfileKnowledge.soilType} (Engineered Drainage)`,
          irrigationMethod: "Rotary Pop-up Sprinklers (12 mm/h)",
          areaM2: 130,
          waterStatus: "GOOD" as const,
          vegetationStatus: "HEALTHY" as const,
          irrigationStatus: "RECENTLY_IRRIGATED" as const,
          heatmapLevel: "blue" as const,
          estimatedWaterRequirement: ag.estimatedWaterReq,
          recentRainfall: "3 mm",
          recentIrrigation: "18 min (Yesterday 06:00)",
          expectedRainfall: "0 mm",
          recommendedAction: "Soil moisture reserve at 82%. Skip next scheduled run.",
          confidence: 72,
          polygon: [
            { x: 48, y: 50 },
            { x: 82, y: 48 },
            { x: 80, y: 86 },
            { x: 46, y: 84 },
          ],
          center: { x: 64, y: 66 },
          userCorrections: [],
          speciesId: "turf_zoysia",
          speciesKnowledge: ag.speciesKnowledge,
          soilProfileKnowledge: ag.soilProfileKnowledge,
          irrigationProfile: ag.irrigationProfile,
          waterBalance: ag.waterBalance,
          explainability: ag.explainability,
          confidenceBreakdown: ag.confidenceBreakdown,
          confirmationPrompt: ag.confirmationPrompt,
          agronomicDataSource: "ESTIMATED" as const,
        };
      })(),
    ],
    timeline: [
      {
        id: "tl-01",
        date: "22 Sep 2026",
        time: "08:15",
        title: "Deterministic ASCE FAO-56 Demand Computed",
        description: "Zone 03 deficit crossed 20mm threshold. Triggered recommended 24 min run-sheet for tomorrow morning.",
        type: "recommendation",
        badge: "Agronomic Physics",
      },
      {
        id: "tl-02",
        date: "21 Sep 2026",
        time: "06:18",
        title: "Zone 05 Irrigation Cycle Confirmed",
        description: "Rotary pop-ups operated 18 min. Flow meter registered 1,560 L delivered without pressure loss.",
        type: "irrigation",
        badge: "Delivered",
      },
      {
        id: "tl-03",
        date: "20 Sep 2026",
        time: "14:20",
        title: "User Ground-Truth Memory Calibrated",
        description: "Operator confirmed Zone 04 classification to Mediterranean Lavender & Rosemary. Model Kc adjusted permanently from 0.70 to 0.30.",
        type: "correction",
        badge: "Memory Calibrated",
      },
    ],
    changeDetections: [
      {
        id: "cd-01",
        zoneId: "zone-3",
        zoneName: "Zone 03 — Perimeter Bougainvillea Hedge",
        title: "Subtle Canopy Density Discrepancy (West Section)",
        dateDetected: "20 Sep 2026",
        period: "Compared to 15 Aug 2026",
        observations: [
          "Vegetation density index dropped 8% along a 6-meter stretch near south pillar.",
          "Surface soil visual tone indicates localized dryness under drip emitter #4.",
          "No foliage wilting observed yet; proactive investigation suggested.",
        ],
        recommendation: "Inspect drip line emitter #4 for calcium mineral deposit or emitter displacement before scheduled watering.",
        status: "INVESTIGATING",
        beforeImg: "https://images.unsplash.com/photo-1584467735815-f778f274e296?auto=format&fit=crop&w=600&q=80",
        afterImg: "https://images.unsplash.com/photo-1598902108854-10e335adac99?auto=format&fit=crop&w=600&q=80",
      },
    ],
  },
  {
    id: "prop_madrid_02",
    name: "Madrid House",
    address: "Camino de la Huerta 32, La Moraleja, Madrid, Spain",
    coordinates: {
      latitude: 40.5142,
      longitude: -3.6421,
      formatted: "40.5142° N, 3.6421° W",
      accuracy: "±5m",
    },
    elevation: "690 m MSL",
    solarAzimuth: "South-West (210° Azimuth)",
    timezone: "Europe/Madrid",
    climateZone: "Continental Mediterranean (Csa/BSk)",
    referenceET0: "3.8 mm/day",
    overallState: "ALL_GOOD",
    healthyPercentage: 100,
    waterAttentionZones: 0,
    nextAction: "All 4 zones optimal. Next automated evaluation Thursday 06:00 AM.",
    createdAt: "2026-07-10T11:00:00Z",
    updatedAt: "2026-09-22T07:00:00Z",
    zones: [
      (() => {
        const ag = buildZoneAgronomics("m-zone-1", "Main Fescue Lawn", 210, "turf_tall_fescue", "enriched_loam", "rotary_sprinkler", 14.0, 3.0);
        return {
          id: "m-zone-1",
          number: 1,
          name: "Zone 01 — Main Lawn (Tall Fescue)",
          shortName: "Main Lawn",
          type: "lawn" as const,
          vegetation: ag.speciesKnowledge.commonName,
          soilProfile: `${ag.soilProfileKnowledge.soilType} (${ag.speciesKnowledge.rootDepthCm.default} cm root depth)`,
          irrigationMethod: "Rotary Sprinklers (14 mm/h)",
          areaM2: 210,
          waterStatus: "GOOD" as const,
          vegetationStatus: "HEALTHY" as const,
          irrigationStatus: "NORMAL" as const,
          heatmapLevel: "green" as const,
          estimatedWaterRequirement: ag.estimatedWaterReq,
          recentRainfall: "8 mm (Monday)",
          recentIrrigation: "20 min (Friday)",
          expectedRainfall: "2 mm",
          recommendedAction: "Soil moisture reserve at 86%. Natural rainfall covered weekly transpirational demand.",
          confidence: 96,
          polygon: [
            { x: 15, y: 15 },
            { x: 85, y: 15 },
            { x: 82, y: 80 },
            { x: 18, y: 78 },
          ],
          center: { x: 50, y: 48 },
          userCorrections: [],
          speciesId: "turf_tall_fescue",
          speciesKnowledge: ag.speciesKnowledge,
          soilProfileKnowledge: ag.soilProfileKnowledge,
          irrigationProfile: ag.irrigationProfile,
          waterBalance: ag.waterBalance,
          explainability: ag.explainability,
          confidenceBreakdown: ag.confidenceBreakdown,
          confirmationPrompt: ag.confirmationPrompt,
          agronomicDataSource: "MEASURED" as const,
        };
      })(),
    ],
    timeline: [
      {
        id: "m-tl-01",
        date: "22 Sep 2026",
        time: "07:00",
        title: "All Zones Evaluated Optimal",
        description: "Rainfall deficit buffer sufficient. No irrigation needed across any zone.",
        type: "weather",
        badge: "Optimal",
      },
    ],
    changeDetections: [],
  },
  {
    id: "prop_mallorca_03",
    name: "Mallorca Villa",
    address: "Carrer de les Caletes 8, Port d'Andratx, Mallorca, Spain",
    coordinates: {
      latitude: 39.5447,
      longitude: 2.3831,
      formatted: "39.5447° N, 2.3831° E",
      accuracy: "±10m",
    },
    elevation: "85 m MSL",
    solarAzimuth: "South-East (140° Azimuth)",
    timezone: "Europe/Madrid",
    climateZone: "Maritime Mediterranean (Csa)",
    referenceET0: "4.2 mm/day",
    overallState: "ALL_GOOD",
    healthyPercentage: 92,
    waterAttentionZones: 0,
    nextAction: "Drip pulse scheduled Friday 06:15 AM.",
    createdAt: "2026-06-01T10:00:00Z",
    updatedAt: "2026-09-22T08:00:00Z",
    zones: [
      (() => {
        const ag = buildZoneAgronomics("mal-zone-1", "Seaside Citrus & Palms", 160, "tree_citrus_lemon_orange", "calcareous_loam", "drip", 6.0, 5.0);
        return {
          id: "mal-zone-1",
          number: 1,
          name: "Zone 01 — Coastal Citrus Terrace",
          shortName: "Citrus Terrace",
          type: "trees" as const,
          vegetation: ag.speciesKnowledge.commonName,
          soilProfile: ag.soilProfileKnowledge.soilType,
          irrigationMethod: "Root Drip Rings (6 mm/h)",
          areaM2: 160,
          waterStatus: "GOOD" as const,
          vegetationStatus: "HEALTHY" as const,
          irrigationStatus: "NORMAL" as const,
          heatmapLevel: "green" as const,
          estimatedWaterRequirement: ag.estimatedWaterReq,
          recentRainfall: "4 mm",
          recentIrrigation: "25 min (Wednesday)",
          expectedRainfall: "0 mm",
          recommendedAction: "Root-zone moisture balanced. Next run Friday morning.",
          confidence: 94,
          polygon: [
            { x: 15, y: 15 },
            { x: 85, y: 15 },
            { x: 80, y: 80 },
            { x: 15, y: 75 },
          ],
          center: { x: 48, y: 45 },
          userCorrections: [],
          speciesId: "tree_citrus_lemon_orange",
          speciesKnowledge: ag.speciesKnowledge,
          soilProfileKnowledge: ag.soilProfileKnowledge,
          irrigationProfile: ag.irrigationProfile,
          waterBalance: ag.waterBalance,
          explainability: ag.explainability,
          confidenceBreakdown: ag.confidenceBreakdown,
          confirmationPrompt: ag.confirmationPrompt,
          agronomicDataSource: "USER_CONFIRMED" as const,
        };
      })(),
    ],
    timeline: [],
    changeDetections: [],
  },
];

export function loadPropertiesFromStorage(): Property[] {
  if (typeof window === "undefined") return INITIAL_PROPERTIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PROPERTIES));
      return INITIAL_PROPERTIES;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_PROPERTIES;
  } catch {
    return INITIAL_PROPERTIES;
  }
}

export function savePropertiesToStorage(properties: Property[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(properties));
  } catch {
    // Storage quota fallback
  }
}

export function getActivePropertyId(properties: Property[]): string {
  if (typeof window === "undefined") {
    return properties[0]?.id || "prop_marbella_01";
  }
  try {
    const saved = localStorage.getItem(ACTIVE_PROPERTY_KEY);
    if (saved && properties.some((p) => p.id === saved)) {
      return saved;
    }
  } catch {
    // fallback
  }
  return properties[0]?.id || "prop_marbella_01";
}

export function setActivePropertyId(id: string): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ACTIVE_PROPERTY_KEY, id);
  } catch {
    // fallback
  }
}

export function saveNewProperty(
  name: string,
  address: string,
  coordinates?: PropertyCoordinates,
  elevation?: string,
  climateZone?: string,
  gardenType?: string
): Property {
  const properties = loadPropertiesFromStorage();
  const id = `prop_${Date.now()}`;
  const coords = coordinates || {
    latitude: 36.5098,
    longitude: -4.8863,
    formatted: "36.5098° N, 4.8863° W",
    accuracy: "±10m",
  };

  const z1Ag = buildZoneAgronomics(`${id}_z1`, "Main Lawn", 160, "turf_bermuda", "sandy_loam", "rotary_sprinkler", 14.0, 3.0);
  const z2Ag = buildZoneAgronomics(`${id}_z2`, "Perimeter Planting", 100, "shrub_oleander", "sandy_loam", "drip", 8.0, 18.0);

  const newProperty: Property = {
    id,
    name: name || "My Garden Property",
    address: address || "Detected Property Location",
    coordinates: coords,
    elevation: elevation || "125 m MSL",
    solarAzimuth: "South-Facing (185° Azimuth)",
    timezone: "Europe/Madrid",
    climateZone: climateZone || "Mediterranean (Csa)",
    referenceET0: "4.6 mm/day",
    overallState: "ALL_GOOD",
    healthyPercentage: 90,
    waterAttentionZones: 0,
    nextAction: "Initial Digital Twin active. Next watering run Friday 05:45 AM.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    zones: [
      {
        id: `${id}_z1`,
        number: 1,
        name: "Zone 01 — Main Lawn & Turf",
        shortName: "Main Lawn",
        type: "lawn",
        vegetation: gardenType || z1Ag.speciesKnowledge.commonName,
        soilProfile: `${z1Ag.soilProfileKnowledge.soilType} (${z1Ag.speciesKnowledge.rootDepthCm.default} cm depth)`,
        irrigationMethod: "Rotary Pop-up Sprinklers (14 mm/h)",
        areaM2: 160,
        waterStatus: "GOOD",
        vegetationStatus: "HEALTHY",
        irrigationStatus: "NORMAL",
        heatmapLevel: "green",
        estimatedWaterRequirement: z1Ag.estimatedWaterReq,
        recentRainfall: "2 mm",
        recentIrrigation: "20 min (Tuesday)",
        expectedRainfall: "0 mm (Next 5 days)",
        recommendedAction: z1Ag.recommendedAction,
        confidence: 94,
        polygon: [
          { x: 15, y: 15 },
          { x: 50, y: 15 },
          { x: 48, y: 55 },
          { x: 15, y: 50 },
        ],
        center: { x: 32, y: 34 },
        userCorrections: [],
        speciesId: "turf_bermuda",
        speciesKnowledge: z1Ag.speciesKnowledge,
        soilProfileKnowledge: z1Ag.soilProfileKnowledge,
        irrigationProfile: z1Ag.irrigationProfile,
        waterBalance: z1Ag.waterBalance,
        explainability: z1Ag.explainability,
        confidenceBreakdown: z1Ag.confidenceBreakdown,
        agronomicDataSource: "USER_CONFIRMED",
      },
      {
        id: `${id}_z2`,
        number: 2,
        name: "Zone 02 — Trees & Perimeter Borders",
        shortName: "Perimeter Borders",
        type: "hedge",
        vegetation: z2Ag.speciesKnowledge.commonName,
        soilProfile: z2Ag.soilProfileKnowledge.soilType,
        irrigationMethod: "Micro-Drip Line (8 mm/h)",
        areaM2: 100,
        waterStatus: "ATTENTION",
        vegetationStatus: "WATCH",
        irrigationStatus: "NOT_IRRIGATED",
        heatmapLevel: "yellow",
        estimatedWaterRequirement: z2Ag.estimatedWaterReq,
        recentRainfall: "2 mm",
        recentIrrigation: "0 min (past 5 days)",
        expectedRainfall: "0 mm",
        recommendedAction: z2Ag.recommendedAction,
        confidence: 90,
        polygon: [
          { x: 55, y: 15 },
          { x: 90, y: 15 },
          { x: 88, y: 85 },
          { x: 55, y: 80 },
        ],
        center: { x: 72, y: 48 },
        userCorrections: [],
        speciesId: "shrub_oleander",
        speciesKnowledge: z2Ag.speciesKnowledge,
        soilProfileKnowledge: z2Ag.soilProfileKnowledge,
        irrigationProfile: z2Ag.irrigationProfile,
        waterBalance: z2Ag.waterBalance,
        explainability: z2Ag.explainability,
        confidenceBreakdown: z2Ag.confidenceBreakdown,
        agronomicDataSource: "ESTIMATED",
      },
    ],
    timeline: [
      {
        id: `tl_${Date.now()}`,
        date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        title: "Property Digital Twin Created",
        description: `Registered permanent digital property asset with coordinates ${coords.formatted}.`,
        type: "twin",
        badge: "Created",
      },
    ],
    changeDetections: [],
  };

  const updatedList = [newProperty, ...properties];
  savePropertiesToStorage(updatedList);
  setActivePropertyId(id);
  return newProperty;
}

export function confirmZoneSpecies(
  propertyId: string,
  zoneId: string,
  speciesId: string
): Property[] {
  const properties = loadPropertiesFromStorage();
  const propIndex = properties.findIndex((p) => p.id === propertyId);
  if (propIndex === -1) return properties;

  const prop = { ...properties[propIndex] };
  const zoneIndex = prop.zones.findIndex((z) => z.id === zoneId);
  if (zoneIndex === -1) return properties;

  const oldZone = prop.zones[zoneIndex];
  const species = getSpeciesKnowledge(speciesId);
  const soil = oldZone.soilProfileKnowledge || getSoilProfile('sandy_loam');
  const irrigation = oldZone.irrigationProfile || {
    method: 'rotary_sprinkler',
    applicationEfficiency: 0.75,
    distributionUniformity: 0.80,
    precipitationRateMmH: 15.0,
    flowRateLMin: 40,
    controllerMakeModel: 'Standard Controller',
    dataStatus: 'ESTIMATED',
    confidence: 80,
    source: 'Default Assumption',
  };

  const calc = calculateZoneWaterDemand({
    zoneId: oldZone.id,
    zoneName: oldZone.name,
    zoneAreaM2: oldZone.areaM2,
    species,
    soil,
    irrigation,
    priorDepletionMm: oldZone.waterBalance?.currentDepletionMm || 4.0,
    weather: DEFAULT_WEATHER,
  });

  const updatedZone: PropertyZone = {
    ...oldZone,
    vegetation: species.commonName,
    speciesId,
    speciesKnowledge: species,
    soilProfileKnowledge: soil,
    irrigationProfile: irrigation,
    waterBalance: calc.waterBalance,
    explainability: calc.explainability,
    confidenceBreakdown: calc.confidenceBreakdown,
    agronomicDataSource: 'USER_CONFIRMED',
    confidence: 98,
    confirmationPrompt: undefined, // Cleared on confirmation!
    recommendedAction: calc.recommendedAction,
    estimatedWaterRequirement: `${calc.grossIrrigationRequirementMm} mm (${calc.volumeLiters} L)`,
    userCorrections: [
      ...oldZone.userCorrections,
      {
        field: 'species',
        original: oldZone.vegetation,
        corrected: species.commonName,
        timestamp: new Date().toISOString(),
      },
    ],
  };

  prop.zones[zoneIndex] = updatedZone;
  prop.updatedAt = new Date().toISOString();

  prop.timeline = [
    {
      id: `tl_${Date.now()}`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: "User Confirmed Vegetation Ground-Truth",
      description: `Confirmed ${updatedZone.shortName} as ${species.commonName}. Model calibrated with Kc = ${species.cropCoefficients.summer}.`,
      type: "correction",
      badge: "Memory Calibrated",
    },
    ...prop.timeline,
  ];

  properties[propIndex] = prop;
  savePropertiesToStorage(properties);
  return properties;
}

export function updateZoneIrrigationSpecs(
  propertyId: string,
  zoneId: string,
  precipitationRateMmH: number
): Property[] {
  const properties = loadPropertiesFromStorage();
  const propIndex = properties.findIndex((p) => p.id === propertyId);
  if (propIndex === -1) return properties;

  const prop = { ...properties[propIndex] };
  const zoneIndex = prop.zones.findIndex((z) => z.id === zoneId);
  if (zoneIndex === -1) return properties;

  const oldZone = prop.zones[zoneIndex];
  const species = oldZone.speciesKnowledge || getSpeciesKnowledge('turf_bermuda');
  const soil = oldZone.soilProfileKnowledge || getSoilProfile('sandy_loam');
  
  const updatedIrrigation: IrrigationInfrastructureProfile = {
    ...(oldZone.irrigationProfile || {
      method: 'rotary_sprinkler',
      applicationEfficiency: 0.75,
      distributionUniformity: 0.80,
      flowRateLMin: null,
      controllerMakeModel: 'Standard Controller',
      confidence: 80,
      source: 'Default Assumption',
    }),
    precipitationRateMmH,
    flowRateLMin: Math.round((precipitationRateMmH * oldZone.areaM2) / 60),
    dataStatus: 'USER_CONFIRMED',
    confidence: 96,
    source: 'User Ground-Truth Measurement',
  };

  const calc = calculateZoneWaterDemand({
    zoneId: oldZone.id,
    zoneName: oldZone.name,
    zoneAreaM2: oldZone.areaM2,
    species,
    soil,
    irrigation: updatedIrrigation,
    priorDepletionMm: oldZone.waterBalance?.currentDepletionMm || 4.0,
    weather: DEFAULT_WEATHER,
  });

  const updatedZone: PropertyZone = {
    ...oldZone,
    irrigationMethod: `${oldZone.irrigationMethod.split('(')[0].trim()} (${precipitationRateMmH} mm/h)`,
    irrigationProfile: updatedIrrigation,
    waterBalance: calc.waterBalance,
    explainability: calc.explainability,
    confidenceBreakdown: calc.confidenceBreakdown,
    recommendedAction: calc.recommendedAction,
    estimatedWaterRequirement: `${calc.grossIrrigationRequirementMm} mm (${calc.volumeLiters} L)`,
    userCorrections: [
      ...oldZone.userCorrections,
      {
        field: 'precipitationRate',
        original: 'UNKNOWN',
        corrected: `${precipitationRateMmH} mm/h`,
        timestamp: new Date().toISOString(),
      },
    ],
  };

  prop.zones[zoneIndex] = updatedZone;
  prop.updatedAt = new Date().toISOString();

  prop.timeline = [
    {
      id: `tl_${Date.now()}`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: "Precipitation Rate Calibrated by User",
      description: `Calibrated ${updatedZone.shortName} application rate to ${precipitationRateMmH} mm/h. Runtime can now be calculated reliably.`,
      type: "correction",
      badge: "Hardware Calibrated",
    },
    ...prop.timeline,
  ];

  properties[propIndex] = prop;
  savePropertiesToStorage(properties);
  return properties;
}

export function saveZoneCorrection(
  propertyId: string,
  zoneId: string,
  field: "name" | "vegetation" | "type" | "irrigationMethod",
  correctedValue: string
): Property[] {
  const properties = loadPropertiesFromStorage();
  const propertyIndex = properties.findIndex((p) => p.id === propertyId);
  if (propertyIndex === -1) return properties;

  const prop = { ...properties[propertyIndex] };
  const zoneIndex = prop.zones.findIndex((z) => z.id === zoneId);
  if (zoneIndex === -1) return properties;

  const originalValue = prop.zones[zoneIndex][field] || "";
  const updatedZone = {
    ...prop.zones[zoneIndex],
    [field]: correctedValue,
    userCorrections: [
      ...prop.zones[zoneIndex].userCorrections,
      {
        field,
        original: String(originalValue),
        corrected: correctedValue,
        timestamp: new Date().toISOString(),
      },
    ],
  };

  prop.zones[zoneIndex] = updatedZone;
  prop.updatedAt = new Date().toISOString();

  prop.timeline = [
    {
      id: `tl_${Date.now()}`,
      date: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      title: "User Correction Saved to Property Memory",
      description: `Updated ${prop.zones[zoneIndex].shortName} ${field}: "${originalValue}" → "${correctedValue}".`,
      type: "correction",
      badge: "Memory Calibrated",
    },
    ...prop.timeline,
  ];

  properties[propertyIndex] = prop;
  savePropertiesToStorage(properties);
  return properties;
}
