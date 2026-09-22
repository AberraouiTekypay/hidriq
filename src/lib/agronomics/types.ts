// HIDRIQ — Master Agronomic Intelligence Types (V5)
// An EM300.co Company — Water Intelligence Platform

export type DataStatus = 'MEASURED' | 'ESTIMATED' | 'INFERRED' | 'USER_CONFIRMED' | 'UNKNOWN';

export type PropertyState = 
  | 'ALL GOOD' 
  | 'ATTENTION REQUIRED' 
  | 'ACTION REQUIRED' 
  | 'ANOMALY DETECTED' 
  | 'OFFLINE / DATA MISSING';

export type VegetationClass =
  | 'turf'
  | 'lawn'
  | 'ornamental'
  | 'trees'
  | 'shrubs_hedges'
  | 'flowers'
  | 'vegetables_fruits'
  | 'crops_agriculture'
  | 'mediterranean_drought_tolerant';

export type DroughtTolerance = 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';

export type IrrigationMethodType =
  | 'drip'
  | 'micro_sprinkler'
  | 'rotary_sprinkler'
  | 'spray_nozzle'
  | 'bubbler'
  | 'hose_manual'
  | 'unknown';

export type WaterBalanceState =
  | 'OPTIMAL'
  | 'WATCH'
  | 'WATER DEFICIT'
  | 'EXCESS WATER RISK'
  | 'UNKNOWN';

export interface SourceCitation {
  source: string;
  methodology: string;
  version: string;
  geography: string;
  date: string;
  confidence: number;
  applicability: string;
}

export interface SpeciesKnowledge {
  id: string;
  commonName: string;
  scientificName: string;
  vegetationClass: VegetationClass;
  rootDepthCm: {
    min: number;
    max: number;
    default: number;
  };
  cropCoefficients: {
    spring: number;
    summer: number;
    autumn: number;
    winter: number;
  };
  allowableDepletionFraction: number; // p factor (e.g. 0.5 for turf, 0.65 for mature trees)
  droughtTolerance: DroughtTolerance;
  irrigationStrategy: string;
  cycleAndSoakRecommended: boolean;
  maxCycleDurationMinutes: number;
  minSoakIntervalMinutes: number;
  citation: SourceCitation;
}

export interface SoilProfileKnowledge {
  soilType: string;
  texture: string;
  fieldCapacityVol: number; // m3/m3
  wiltingPointVol: number;   // m3/m3
  totalAvailableWaterMmPerMeter: number; // TAW in mm/m (FC - WP) * 1000
  basicInfiltrationRateMmPerHour: number;
  drainageClass: string;
  compactionRisk: 'LOW' | 'MODERATE' | 'HIGH';
  dataStatus: DataStatus;
  confidence: number;
  source: string;
}

export interface IrrigationInfrastructureProfile {
  method: IrrigationMethodType;
  applicationEfficiency: number; // 0.0 - 1.0 (e.g. Drip = 0.90, Spray = 0.65)
  distributionUniformity: number; // 0.0 - 1.0
  precipitationRateMmH: number | null; // null when unknown!
  flowRateLMin: number | null;
  controllerMakeModel: string;
  dataStatus: DataStatus;
  confidence: number;
  source: string;
}

export interface SupportingDataPoint {
  label: string;
  value: string;
  status: DataStatus;
  source: string;
  measuredUnit?: string;
}

export interface ConfidenceBreakdown {
  vegetationCertainty: number; // 0 - 100
  soilCertainty: number;       // 0 - 100
  irrigationCertainty: number; // 0 - 100
  weatherQuality: number;      // 0 - 100
  dataFreshness: number;       // 0 - 100
  overallScore: number;        // 0 - 100
}

export interface ExplainabilityReport {
  whyRequired: string;
  howMuchRequiredMm: number;
  howMuchRequiredLiters: number | null;
  whyNow: string;
  whyThisZone: string;
  supportingData: SupportingDataPoint[];
  assumptions: string[];
  confidenceBreakdown: ConfidenceBreakdown;
  whatWouldChangeRecommendation: string[];
  runtimeEstimate: {
    calculated: boolean;
    runtimeMinutes?: number;
    recommendedWindow?: string;
    cycleCount?: number;
    cycleDurationMinutes?: number;
    soakIntervalMinutes?: number;
    reasonIfNotCalculated?: string;
  };
  modelVersion: string;
  generatedAt: string;
}

export interface ZoneWaterBalance {
  rootZoneDepthM: number;
  totalAvailableWaterMm: number;    // TAW
  readilyAvailableWaterMm: number;  // RAW = TAW * p
  currentDepletionMm: number;       // Dr
  availableWaterRemainingMm: number;
  percentDepletion: number;
  state: WaterBalanceState;
  lastCalculated: string;
  dataStatus: DataStatus;
}

export interface UserConfirmationPrompt {
  required: boolean;
  field: 'species' | 'soil' | 'irrigation_method' | 'precipitation_rate';
  title: string;
  description: string;
  detectedValue: string;
  confidence: number;
  candidateOptions: Array<{
    id: string;
    label: string;
    description: string;
  }>;
}

export interface AgronomicZoneState {
  zoneId: string;
  zoneNumber: number;
  name: string;
  shortName: string;
  areaM2: number;
  species: SpeciesKnowledge;
  soil: SoilProfileKnowledge;
  irrigation: IrrigationInfrastructureProfile;
  waterBalance: ZoneWaterBalance;
  explainability: ExplainabilityReport;
  confirmationPrompt?: UserConfirmationPrompt;
  historicalResponse: {
    predictedWaterMm: number;
    actualAppliedWaterMm: number;
    rainfallMm: number;
    vegetationHealthTrend: 'IMPROVING' | 'STABLE' | 'DECLINING';
    calibrationFactor: number;
  };
}
