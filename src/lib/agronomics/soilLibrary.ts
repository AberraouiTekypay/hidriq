// HIDRIQ — Master Soil Intelligence Library (V5)
// An EM300.co Company — Water Intelligence Platform
// Physical Soil Hydraulic Parameters & Water Retention Characteristics

import { SoilProfileKnowledge, DataStatus } from './types';

export const SOIL_PROFILES_REGISTRY: Record<string, SoilProfileKnowledge> = {
  'sandy_loam': {
    soilType: 'Sandy Loam',
    texture: '65% Sand, 20% Silt, 15% Clay',
    fieldCapacityVol: 0.22, // 22% volumetric moisture at -33 kPa
    wiltingPointVol: 0.10,  // 10% volumetric moisture at -1500 kPa
    totalAvailableWaterMmPerMeter: 120, // (0.22 - 0.10) * 1000 = 120 mm/m
    basicInfiltrationRateMmPerHour: 25.0, // High infiltration, low runoff risk
    drainageClass: 'Well-Drained',
    compactionRisk: 'LOW',
    dataStatus: 'ESTIMATED',
    confidence: 84,
    source: 'Regional Mediterranean Soil Survey (CSIC Andalusian & Moroccan Souss Soil Database)',
  },

  'clay_loam': {
    soilType: 'Clay Loam',
    texture: '35% Sand, 35% Silt, 30% Clay',
    fieldCapacityVol: 0.32,
    wiltingPointVol: 0.17,
    totalAvailableWaterMmPerMeter: 150, // High water holding capacity
    basicInfiltrationRateMmPerHour: 8.0, // Low infiltration, high runoff risk if over-applied!
    drainageClass: 'Moderately Slow',
    compactionRisk: 'HIGH',
    dataStatus: 'ESTIMATED',
    confidence: 82,
    source: 'European Soil Data Centre (ESDAC) 1km Topsoil Physical Properties',
  },

  'calcareous_loam': {
    soilType: 'Calcareous Loam (Coastal Terraces)',
    texture: '45% Sand, 40% Silt, 15% Clay with Calcium Carbonate fractions',
    fieldCapacityVol: 0.28,
    wiltingPointVol: 0.13,
    totalAvailableWaterMmPerMeter: 140,
    basicInfiltrationRateMmPerHour: 15.0,
    drainageClass: 'Moderate',
    compactionRisk: 'MODERATE',
    dataStatus: 'ESTIMATED',
    confidence: 86,
    source: 'Spanish Geological and Mining Institute (IGME) Mediterranean Coast Map',
  },

  'coarse_sand': {
    soilType: 'Coarse Sand (Coastal Dune / Beachfront)',
    texture: '90% Sand, 6% Silt, 4% Clay',
    fieldCapacityVol: 0.12,
    wiltingPointVol: 0.04,
    totalAvailableWaterMmPerMeter: 80, // Very low holding capacity: water drains rapidly
    basicInfiltrationRateMmPerHour: 50.0, // Extremely fast infiltration
    drainageClass: 'Excessively Drained',
    compactionRisk: 'LOW',
    dataStatus: 'ESTIMATED',
    confidence: 80,
    source: 'FAO-ISRIC Global Soil Profile Database',
  },

  'enriched_loam': {
    soilType: 'Enriched Garden Loam (Amended Turf Soil)',
    texture: '40% Sand, 40% Silt, 20% Clay with 4% Organic Matter',
    fieldCapacityVol: 0.30,
    wiltingPointVol: 0.14,
    totalAvailableWaterMmPerMeter: 160,
    basicInfiltrationRateMmPerHour: 18.0,
    drainageClass: 'Well-Drained',
    compactionRisk: 'MODERATE',
    dataStatus: 'ESTIMATED',
    confidence: 88,
    source: 'Landscape Architecture Engineered Soil Standard (BS 3882:2015)',
  },
};

/**
 * Calculates Total Available Water (TAW) for a given root depth
 * Formula: TAW (mm) = 1000 * (θ_FC - θ_WP) * Zr
 * where Zr is root depth in meters.
 */
export function calculateTAW(soil: SoilProfileKnowledge, rootDepthCm: number): number {
  const depthM = rootDepthCm / 100;
  return Math.round(soil.totalAvailableWaterMmPerMeter * depthM * 10) / 10;
}

/**
 * Calculates Readily Available Water (RAW) before stress occurs
 * Formula: RAW (mm) = p * TAW
 * where p is the average soil water depletion fraction for no stress (FAO-56 Table 22).
 */
export function calculateRAW(tawMm: number, depletionFractionP: number): number {
  return Math.round(tawMm * depletionFractionP * 10) / 10;
}

export function getSoilProfile(soilKey: string, status: DataStatus = 'ESTIMATED'): SoilProfileKnowledge {
  const profile = SOIL_PROFILES_REGISTRY[soilKey] || SOIL_PROFILES_REGISTRY['sandy_loam'];
  return {
    ...profile,
    dataStatus: status,
  };
}
