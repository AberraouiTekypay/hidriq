// HIDRIQ — Master Longitudinal Learning Engine (V5)
// An EM300.co Company — Water Intelligence Platform
// Constrained Property Calibration & Ground-Truth Verification

export interface CalibrationObservation {
  zoneId: string;
  predictedDemandMm: number;
  actualDeliveredMm: number;
  rainfallMm: number;
  observedCanopyHealth: 'HEALTHY' | 'SLIGHT_STRESS' | 'VIGOROUS_OVERGROWTH' | 'CHLOROSIS';
  timestamp: string;
}

export interface CalibrationResult {
  calibrated: boolean;
  zoneId: string;
  priorMicroclimateFactor: number;
  newMicroclimateFactor: number;
  changePercentage: number;
  reason: string;
  safetyConstrained: boolean;
  auditBadge: string;
}

/**
 * Calibrates zone microclimate factor (Kmc) based on empirical historical response.
 * Strictly bounded between 0.70 and 1.30 to prevent dangerous model drift.
 */
export function evaluateLongitudinalCalibration(
  currentKmc: number,
  observation: CalibrationObservation
): CalibrationResult {
  const totalWaterSupplied = observation.actualDeliveredMm + observation.rainfallMm;
  const discrepancy = totalWaterSupplied - observation.predictedDemandMm;

  let delta = 0;
  let reason = '';

  // Case 1: Vegetation stayed completely healthy despite receiving less water than predicted
  // Implies microclimate demand or evaporative exposure is lower than generic model assumed
  if (observation.observedCanopyHealth === 'HEALTHY' && discrepancy < -3.0) {
    delta = -0.04; // 4% downward calibration
    reason = `Canopy maintained optimal vigor despite 3+ mm deficit below predicted demand. Calibrating microclimate coefficient downward to reflect high local shade/protection.`;
  }
  // Case 2: Vegetation showed slight moisture stress despite receiving predicted demand
  else if (observation.observedCanopyHealth === 'SLIGHT_STRESS' && discrepancy >= -1.0) {
    delta = +0.05; // 5% upward calibration
    reason = `Slight canopy stress observed under normal water delivery. Calibrating microclimate coefficient upward to compensate for elevated local wind exposure or reflected heat.`;
  }
  else {
    return {
      calibrated: false,
      zoneId: observation.zoneId,
      priorMicroclimateFactor: currentKmc,
      newMicroclimateFactor: currentKmc,
      changePercentage: 0,
      reason: `Observed vegetation response matches baseline model expectations. No adjustment needed.`,
      safetyConstrained: false,
      auditBadge: 'Baseline Validated',
    };
  }

  const rawNewKmc = Math.round((currentKmc + delta) * 100) / 100;
  
  // HARD SAFETY CONSTRAINTS: Prevent unsafe drift
  const MIN_KMC = 0.75;
  const MAX_KMC = 1.25;
  const boundedNewKmc = Math.max(MIN_KMC, Math.min(MAX_KMC, rawNewKmc));
  const safetyConstrained = boundedNewKmc !== rawNewKmc;

  return {
    calibrated: true,
    zoneId: observation.zoneId,
    priorMicroclimateFactor: currentKmc,
    newMicroclimateFactor: boundedNewKmc,
    changePercentage: Math.round(((boundedNewKmc - currentKmc) / currentKmc) * 100),
    reason,
    safetyConstrained,
    auditBadge: 'Model Calibrated',
  };
}
