"use client";

import React, { useState } from "react";
import {
  X,
  Droplets,
  CloudRain,
  RotateCcw,
  Sun,
  Edit3,
  Check,
  Info,
  ShieldCheck,
  HelpCircle,
  Activity,
  FileText,
  Clock,
  AlertTriangle,
  Layers,
} from "lucide-react";
import {
  PropertyZone,
  saveZoneCorrection,
  confirmZoneSpecies,
  updateZoneIrrigationSpecs,
} from "@/lib/propertyStore";
import { DataStatus } from "@/lib/agronomics";

interface ZoneDetailPanelProps {
  zone: PropertyZone | null;
  propertyId: string;
  onClose: () => void;
  onCorrectionSaved: () => void;
}

type TabType = "overview" | "explainability" | "provenance" | "calibration";

export const ZoneDetailPanel: React.FC<ZoneDetailPanelProps> = ({
  zone,
  propertyId,
  onClose,
  onCorrectionSaved,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [correctedVegetation, setCorrectedVegetation] = useState("");
  const [correctedMethod, setCorrectedMethod] = useState("");
  const [enteredPrecipitationRate, setEnteredPrecipitationRate] = useState<string>("15");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  if (!zone) return null;

  const handleStartEdit = () => {
    setCorrectedVegetation(zone.vegetation);
    setCorrectedMethod(zone.irrigationMethod);
    setActiveTab("calibration");
  };

  const handleSaveCorrection = (e: React.FormEvent) => {
    e.preventDefault();
    if (correctedVegetation && correctedVegetation !== zone.vegetation) {
      saveZoneCorrection(propertyId, zone.id, "vegetation", correctedVegetation);
    }
    if (correctedMethod && correctedMethod !== zone.irrigationMethod) {
      saveZoneCorrection(propertyId, zone.id, "irrigationMethod", correctedMethod);
    }
    setSuccessMessage("Ground-truth correction calibrated into permanent property memory.");
    setSaveSuccess(true);
    onCorrectionSaved();
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleConfirmSpecies = (speciesId: string) => {
    confirmZoneSpecies(propertyId, zone.id, speciesId);
    setSuccessMessage("Botanical ground-truth confirmed! Model calibrated permanently.");
    setSaveSuccess(true);
    onCorrectionSaved();
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const handleCalibratePrecipitationRate = (e: React.FormEvent) => {
    e.preventDefault();
    const rate = parseFloat(enteredPrecipitationRate);
    if (!isNaN(rate) && rate > 0) {
      updateZoneIrrigationSpecs(propertyId, zone.id, rate);
      setSuccessMessage(`Hardware calibrated with ${rate} mm/h application rate. Runtime calculated.`);
      setSaveSuccess(true);
      onCorrectionSaved();
      setTimeout(() => setSaveSuccess(false), 3500);
    }
  };

  const explainability = zone.explainability;
  const waterBalance = zone.waterBalance;
  const prompt = zone.confirmationPrompt;
  const species = zone.speciesKnowledge;
  const soil = zone.soilProfileKnowledge;
  const irrigation = zone.irrigationProfile;

  const renderStatusBadge = (status: DataStatus) => {
    switch (status) {
      case "MEASURED":
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[9px] font-mono text-emerald-300">
            <Check className="w-2.5 h-2.5" />
            MEASURED
          </span>
        );
      case "USER_CONFIRMED":
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-teal-950/80 border border-teal-500/40 text-[9px] font-mono text-teal-300">
            <ShieldCheck className="w-2.5 h-2.5" />
            USER_CONFIRMED
          </span>
        );
      case "INFERRED":
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/40 text-[9px] font-mono text-cyan-300">
            INFERRED
          </span>
        );
      case "ESTIMATED":
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-amber-950/80 border border-amber-500/40 text-[9px] font-mono text-amber-300">
            ESTIMATED
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-800 border border-slate-600 text-[9px] font-mono text-slate-300">
            UNKNOWN
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-2xl glass-panel border border-white/[0.15] bg-[#0c1017] p-5 sm:p-7 text-left shadow-2xl teal-glow my-6 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
          aria-label="Close panel"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="border-b border-white/[0.08] pb-4 mb-4">
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            <span className="px-2 py-0.5 rounded bg-teal-950/80 border border-teal-500/40 text-teal-300 text-[10px] font-mono font-bold uppercase">
              ZONE 0{zone.number}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {zone.areaM2} m² Area
            </span>
            {renderStatusBadge(zone.agronomicDataSource || "ESTIMATED")}
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ml-auto mr-8 ${
                zone.waterStatus === "GOOD"
                  ? "bg-emerald-950/80 border border-emerald-500/40 text-emerald-300"
                  : zone.waterStatus === "NEEDS_WATER"
                  ? "bg-rose-950/80 border border-rose-500/40 text-rose-300"
                  : "bg-amber-950/80 border border-amber-500/40 text-amber-300"
              }`}
            >
              {zone.waterStatus.replace("_", " ")}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {zone.name}
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Vegetation: <strong className="text-teal-300 font-semibold">{zone.vegetation}</strong>
            {species?.scientificName && <span className="italic text-slate-400"> ({species.scientificName})</span>}
            {soil && <span className="text-slate-400"> · Soil: <strong className="text-slate-200">{soil.soilType}</strong></span>}
            {irrigation && <span className="text-slate-400"> · Method: <strong className="text-slate-200">{irrigation.method.replace("_", " ")}</strong></span>}
          </p>

          {saveSuccess && (
            <div className="mt-2.5 p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5 animate-fadeIn">
              <Check className="w-3.5 h-3.5" />
              <span>{successMessage}</span>
            </div>
          )}
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 mb-4 overflow-x-auto text-xs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
              activeTab === "overview"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Overview & Hydraulics</span>
          </button>

          <button
            onClick={() => setActiveTab("explainability")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
              activeTab === "explainability"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Agronomic Explanation</span>
          </button>

          <button
            onClick={() => setActiveTab("provenance")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
              activeTab === "provenance"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Data Provenance</span>
          </button>

          <button
            onClick={() => setActiveTab("calibration")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer shrink-0 ${
              activeTab === "calibration"
                ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Calibrate Ground-Truth</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & HYDRAULICS */}
        {activeTab === "overview" && (
          <div className="space-y-4">
            {/* User Confirmation Prompt Banner if Confidence < 80% */}
            {prompt && prompt.required && (
              <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-500/40 text-left space-y-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-xs font-bold text-amber-200">
                    Species Confirmation Required (Confidence: {prompt.confidence}%)
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  {prompt.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {prompt.candidateOptions.map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => handleConfirmSpecies(opt.id)}
                      className="p-2.5 rounded-lg bg-black/50 hover:bg-teal-950/60 border border-white/[0.1] hover:border-teal-500/40 text-left transition-all cursor-pointer group"
                    >
                      <div className="text-xs font-bold text-white group-hover:text-teal-300">
                        {opt.label}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-2">
                        {opt.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Application Rate Unknown Warning (Section 11: Do not pretend to know exact runtime) */}
            {explainability?.runtimeEstimate && !explainability.runtimeEstimate.calculated && (
              <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/40 text-left flex items-start gap-2.5">
                <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div className="text-xs text-slate-300 space-y-1">
                  <strong className="text-white block">
                    Water Requirement Estimated · Runtime Cannot Yet Be Calculated
                  </strong>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    {explainability.runtimeEstimate.reasonIfNotCalculated}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveTab("calibration")}
                    className="text-cyan-300 hover:text-cyan-200 text-[11px] font-semibold underline pt-0.5 cursor-pointer"
                  >
                    Enter emitter precipitation rate to enable exact minutes →
                  </button>
                </div>
              </div>
            )}

            {/* 4 Core Hydrological Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                  <Droplets className="w-3.5 h-3.5 text-teal-400" />
                  <span>Gross Demand</span>
                </div>
                <div className="text-base font-bold text-white font-mono">
                  {zone.estimatedWaterRequirement}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  ASCE FAO-56 Penman
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                  <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Effective Rain</span>
                </div>
                <div className="text-base font-bold text-white font-mono">
                  {zone.recentRainfall}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  USDA-SCS Infiltration
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                  <RotateCcw className="w-3.5 h-3.5 text-blue-400" />
                  <span>Recent Delivery</span>
                </div>
                <div className="text-base font-bold text-white font-mono">
                  {zone.recentIrrigation}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Controller Log
                </span>
              </div>

              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mb-1">
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Forecast 5D</span>
                </div>
                <div className="text-base font-bold text-white font-mono">
                  {zone.expectedRainfall}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  ECMWF HRES Grid
                </span>
              </div>
            </div>

            {/* Root-Zone Water Balance Depletion Gauge */}
            {waterBalance && (
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-left space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-white flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-teal-400" />
                    <span>Physical Root-Zone Water Balance</span>
                  </span>
                  <span className="font-mono text-slate-300">
                    State: <strong className={waterBalance.state === "WATER DEFICIT" ? "text-rose-400" : "text-emerald-400"}>{waterBalance.state}</strong>
                  </span>
                </div>

                {/* Depletion Progress Bar */}
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span>Field Capacity (100% Full)</span>
                    <span>Depletion: {waterBalance.percentDepletion}%</span>
                    <span>Stress Threshold (RAW: {waterBalance.readilyAvailableWaterMm} mm)</span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden relative">
                    <div
                      className={`h-full rounded-full transition-all ${
                        waterBalance.percentDepletion > 60
                          ? "bg-rose-500"
                          : waterBalance.percentDepletion > 40
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                      }`}
                      style={{ width: `${Math.min(100, 100 - waterBalance.percentDepletion)}%` }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-mono">
                  <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                    <span className="text-slate-500 block text-[9px] uppercase">Available Moisture</span>
                    <span className="text-white font-bold">{waterBalance.availableWaterRemainingMm} mm</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                    <span className="text-slate-500 block text-[9px] uppercase">Total Capacity (TAW)</span>
                    <span className="text-teal-300 font-bold">{waterBalance.totalAvailableWaterMm} mm</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                    <span className="text-slate-500 block text-[9px] uppercase">Root Column Depth</span>
                    <span className="text-cyan-300 font-bold">{species?.rootDepthCm.default ?? 30} cm</span>
                  </div>
                </div>
              </div>
            )}

            {/* Prescriptive Action Banner */}
            <div className="p-4 rounded-xl bg-teal-950/40 border border-teal-500/40 text-left">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Agronomic Recommendation</span>
                </span>
                <span className="text-[10px] font-mono text-slate-300">
                  Confidence: <strong className="text-white">{zone.confidence}%</strong>
                </span>
              </div>
              <p className="text-xs text-white leading-relaxed font-semibold">
                {zone.recommendedAction}
              </p>
              {species?.cycleAndSoakRecommended && (
                <div className="mt-2 pt-2 border-t border-teal-500/20 text-[11px] text-teal-300 font-mono flex items-center gap-1.5">
                  <span>Cycle & Soak Active: Max {species.maxCycleDurationMinutes}m runs with {species.minSoakIntervalMinutes}m soak to eliminate surface runoff.</span>
                </div>
              )}
            </div>

            {/* User Corrections Memory History if any */}
            {zone.userCorrections && zone.userCorrections.length > 0 && (
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-xs">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                  Calibrated by User Ground-Truth:
                </span>
                {zone.userCorrections.map((c, i) => (
                  <div key={i} className="text-[11px] text-slate-300 font-mono">
                    • {c.field}: &ldquo;{c.original}&rdquo; → <strong className="text-teal-300">&ldquo;{c.corrected}&rdquo;</strong>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 flex items-center justify-between">
              <button
                type="button"
                onClick={handleStartEdit}
                className="flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-semibold cursor-pointer py-1"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Calibrate Ground-Truth</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: AGRONOMIC EXPLANABILITY (The 8 Mandatory Questions) */}
        {activeTab === "explainability" && explainability && (
          <div className="space-y-4 text-left">
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 font-mono">
              Deterministic Model: <strong className="text-teal-300">{explainability.modelVersion}</strong>
            </div>

            <div className="space-y-3 text-xs">
              {/* Question 1 & 2 */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                  <span className="text-teal-400 font-mono text-[11px]">01 / 02</span>
                  <span>Why is water required & How much?</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {explainability.whyRequired}
                </p>
                <div className="mt-2 text-teal-300 font-mono text-[11px]">
                  Calculated Target: <strong>{explainability.howMuchRequiredMm} mm</strong>
                  {explainability.howMuchRequiredLiters && ` (${explainability.howMuchRequiredLiters} Liters across ${zone.areaM2} m²)`}
                </div>
              </div>

              {/* Question 3 */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                  <span className="text-teal-400 font-mono text-[11px]">03</span>
                  <span>Why now?</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {explainability.whyNow}
                </p>
              </div>

              {/* Question 4 */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                  <span className="text-teal-400 font-mono text-[11px]">04</span>
                  <span>Why this zone specifically?</span>
                </h4>
                <p className="text-slate-300 leading-relaxed">
                  {explainability.whyThisZone}
                </p>
              </div>

              {/* Question 6: Assumptions */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                  <span className="text-teal-400 font-mono text-[11px]">05</span>
                  <span>What assumptions were made?</span>
                </h4>
                <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                  {explainability.assumptions.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>

              {/* Question 7: Confidence Breakdown */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-white font-bold mb-1.5 flex items-center gap-2">
                  <span className="text-teal-400 font-mono text-[11px]">06</span>
                  <span>How confident is HIDRIQ? (Confidence Breakdown)</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 font-mono text-[10px]">
                  <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                    <span className="text-slate-400 block">Vegetation Certainty</span>
                    <span className="text-white font-bold text-xs">{explainability.confidenceBreakdown.vegetationCertainty}%</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                    <span className="text-slate-400 block">Soil Certainty</span>
                    <span className="text-white font-bold text-xs">{explainability.confidenceBreakdown.soilCertainty}%</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                    <span className="text-slate-400 block">Irrigation Certainty</span>
                    <span className="text-white font-bold text-xs">{explainability.confidenceBreakdown.irrigationCertainty}%</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                    <span className="text-slate-400 block">Weather Quality</span>
                    <span className="text-white font-bold text-xs">{explainability.confidenceBreakdown.weatherQuality}%</span>
                  </div>
                  <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                    <span className="text-slate-400 block">Data Freshness</span>
                    <span className="text-white font-bold text-xs">{explainability.confidenceBreakdown.dataFreshness}%</span>
                  </div>
                  <div className="p-2 rounded bg-teal-950/60 border border-teal-500/30">
                    <span className="text-teal-300 block">Overall Score</span>
                    <span className="text-teal-200 font-bold text-xs">{explainability.confidenceBreakdown.overallScore}%</span>
                  </div>
                </div>
              </div>

              {/* Question 8: What would change the recommendation? */}
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <h4 className="text-white font-bold mb-1 flex items-center gap-2">
                  <span className="text-teal-400 font-mono text-[11px]">07</span>
                  <span>What would change this recommendation?</span>
                </h4>
                <ul className="space-y-1 text-slate-300 text-[11px] list-disc list-inside">
                  {explainability.whatWouldChangeRecommendation.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DATA PROVENANCE (Strict Status Badges) */}
        {activeTab === "provenance" && explainability && (
          <div className="space-y-4 text-left">
            <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/30 text-xs text-slate-300 flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Strict Data Provenance Guarantee:</strong>
                HIDRIQ never presents estimated telemetry as measured facts. Every input to the physical water-balance model is explicitly classified by certainty and origin.
              </div>
            </div>

            <div className="space-y-2">
              {explainability.supportingData.map((dp, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div>
                    <div className="text-xs font-semibold text-white flex items-center gap-2">
                      <span>{dp.label}</span>
                      {renderStatusBadge(dp.status)}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      Source: {dp.source}
                    </div>
                  </div>
                  <div className="text-xs font-mono font-bold text-teal-300 shrink-0">
                    {dp.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Scientific Citation Notice */}
            {species?.citation && (
              <div className="p-3 rounded-xl bg-black/40 border border-white/[0.06] text-[11px] font-mono space-y-1">
                <span className="text-slate-400 uppercase block text-[9px]">Botanical Methodology Reference:</span>
                <div className="text-slate-300">{species.citation.source}</div>
                <div className="text-slate-500">{species.citation.methodology} ({species.citation.geography})</div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CALIBRATE GROUND-TRUTH */}
        {activeTab === "calibration" && (
          <div className="space-y-5 text-left">
            {/* Calibration Form 1: Botanical & Method Ground-Truth */}
            <form onSubmit={handleSaveCorrection} className="space-y-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-teal-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  1. Botanical & Delivery Calibration
                </h4>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Vegetation Classification
                </label>
                <input
                  type="text"
                  required
                  value={correctedVegetation}
                  onChange={(e) => setCorrectedVegetation(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400 font-mono"
                  placeholder="e.g. Bermuda Grass, Centenary Olives, Lavender Beds"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Installed Delivery Method
                </label>
                <select
                  value={correctedMethod}
                  onChange={(e) => setCorrectedMethod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#0e131b] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-teal-400"
                >
                  <option>Rotary MP Rotator Sprinklers (15 mm/h)</option>
                  <option>Pop-up Gear Drive Spray Heads (25 mm/h)</option>
                  <option>Pressure-Compensated Drip Rings (4 mm/h)</option>
                  <option>Inline Surface Micro-Drip (8 mm/h)</option>
                  <option>Micro-Spray & Root Bubblers (18 mm/h)</option>
                  <option>Manual Hose / Spigot</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Botanical Ground-Truth</span>
              </button>
            </form>

            {/* Calibration Form 2: Enter Emitter Precipitation Rate */}
            <form onSubmit={handleCalibratePrecipitationRate} className="space-y-3.5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-cyan-400" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                  2. Calibrate Application Rate (mm/h)
                </h4>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                If the exact nozzle precipitation rate is measured or known from controller documentation, enter it below to transition runtime calculation from UNKNOWN to MEASURED.
              </p>

              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="100"
                  required
                  value={enteredPrecipitationRate}
                  onChange={(e) => setEnteredPrecipitationRate(e.target.value)}
                  className="w-32 px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white font-mono focus:outline-none focus:border-teal-400"
                  placeholder="e.g. 15.0"
                />
                <span className="text-xs font-mono text-slate-400">mm / hour</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Calibrate Precipitation Rate</span>
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
