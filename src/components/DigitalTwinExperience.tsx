"use client";

import React, { useState } from "react";
import { Layers, Sparkles, Camera, AlertTriangle } from "lucide-react";

export const DigitalTwinExperience: React.FC = () => {
  const [selectedZoneId, setSelectedZoneId] = useState<string>("z1");
  const [timeDimension, setTimeDimension] = useState<"today" | "7days" | "30days">("today");

  const zones = [
    {
      id: "z1",
      name: "Zone 1: Front Lawn",
      species: "Bermuda Grass (Cynodon dactylon)",
      area: "340 m²",
      exposure: "Full Sun · South-Facing",
      confidence: 94,
      status: "adequate",
      colorClass: "border-emerald-500/60 bg-emerald-950/30 text-emerald-300",
      statusLabel: "Adequate Moisture",
      statusColor: "text-emerald-400",
      dotColor: "bg-emerald-400",
      et0Demand: "4.6 mm/day",
      effectiveRain: "0.0 mm",
      netIrrigationNeeded: "3.2 mm",
      action: "Next run scheduled: Tomorrow at 05:15 (22 min · 2 cycles)",
      soilDepletion: 32, // %
      anomaly: null,
      photoPrompt: "Automatic classification confirmed via aerial NDVI (0.72). No additional photos needed.",
    },
    {
      id: "z2",
      name: "Zone 2: Citrus & Olive Grove",
      species: "Olea europaea & Citrus limon (8 trees)",
      area: "420 m²",
      exposure: "Partial Morning Shade · Terraced Slope",
      confidence: 91,
      status: "irrigated",
      colorClass: "border-blue-500/60 bg-blue-950/30 text-blue-300",
      statusLabel: "Recently Irrigated",
      statusColor: "text-blue-400",
      dotColor: "bg-blue-400",
      et0Demand: "3.8 mm/day",
      effectiveRain: "0.0 mm",
      netIrrigationNeeded: "0.0 mm (Saturated)",
      action: "Deep soak executed yesterday. Skip watering for 72 hours.",
      soilDepletion: 14,
      anomaly: null,
      photoPrompt: "Canopy density validated. Optional photo requested after seasonal pruning.",
    },
    {
      id: "z3",
      name: "Zone 3: Perimeter Hedge",
      species: "Bougainvillea spectabilis & Pittosporum",
      area: "190 m²",
      exposure: "Reflected Heat Wall · West-Facing",
      confidence: 88,
      status: "stress",
      colorClass: "border-amber-500/60 bg-amber-950/30 text-amber-300",
      statusLabel: "Potential Water Stress",
      statusColor: "text-amber-400",
      dotColor: "bg-amber-400",
      et0Demand: "5.1 mm/day",
      effectiveRain: "0.0 mm",
      netIrrigationNeeded: "4.8 mm",
      action: "High vapor pressure deficit detected. Pulse 15 min at 06:00.",
      soilDepletion: 68,
      anomaly: "Reflected radiation from perimeter masonry wall accelerates localized transpirational loss.",
      photoPrompt: "Please snap 1 photo of the lower foliage to confirm leaf turgor vs. heat stress.",
    },
    {
      id: "z4",
      name: "Zone 4: Floral Perennial Beds",
      species: "Lavandula, Salvia, Agapanthus",
      area: "160 m²",
      exposure: "East-Facing · Sandy Loam Bed",
      confidence: 96,
      status: "deficit",
      colorClass: "border-red-500/60 bg-red-950/30 text-red-300",
      statusLabel: "Probable Deficit / Anomaly",
      statusColor: "text-red-400",
      dotColor: "bg-red-400",
      et0Demand: "4.9 mm/day",
      effectiveRain: "0.0 mm",
      netIrrigationNeeded: "5.4 mm",
      action: "Flow rate anomaly flagged: Sub-meter logged 25% lower flow than baseline. Possible emitter blockage.",
      soilDepletion: 82,
      anomaly: "Suspicion: Drip emitter pressure drop or partially clogged inline filter.",
      photoPrompt: "Photograph drip line manifold or soil near lavender base to verify flow delivery.",
    },
    {
      id: "z5",
      name: "Zone 5: Poolside Terraces",
      species: "Architectural Planters & Cycas revoluta",
      area: "310 m²",
      exposure: "High Ambient Reflection · Shaded Afternoons",
      confidence: 95,
      status: "adequate",
      colorClass: "border-emerald-500/60 bg-emerald-950/30 text-emerald-300",
      statusLabel: "Adequate Moisture",
      statusColor: "text-emerald-400",
      dotColor: "bg-emerald-400",
      et0Demand: "3.2 mm/day",
      effectiveRain: "0.0 mm",
      netIrrigationNeeded: "1.8 mm",
      action: "Maintain baseline maintenance watering. Next cycle: Friday.",
      soilDepletion: 28,
      anomaly: null,
      photoPrompt: "Planter boundaries confirmed via cadastral aerial overlay.",
    },
  ];

  const activeZone = zones.find((z) => z.id === selectedZoneId) || zones[0];

  return (
    <section id="digital-twin" className="relative py-24 sm:py-32 bg-[#07090d] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Layers className="w-3.5 h-3.5" />
            The Living Digital Twin
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            A LIVING DIGITAL TWIN <br className="hidden sm:inline" />
            OF YOUR LANDSCAPE.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            HIDRIQ goes beyond static dashboards. We construct an evolving spatial and hydrological model of the property — tracking microclimate exposure, soil reservoirs, vegetation health, and physical water status zone by zone.
          </p>
        </div>

        {/* Digital Twin Interactive Workspace */}
        <div className="rounded-2xl glass-panel border border-white/[0.12] overflow-hidden teal-glow">
          {/* Top Bar: Property Metadata & Time Slider */}
          <div className="p-4 sm:p-6 border-b border-white/[0.08] flex flex-col lg:flex-row lg:items-center justify-between gap-4 text-left">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                  Villa Oasis · Marbella, Spain
                </h3>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                36.51°N, 4.88°W · Elevation: 84m · Parcel: 1,420 m² · Automated First Pass
              </span>
            </div>

            {/* Time Dimension Navigation */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono uppercase text-slate-400">Time Horizon:</span>
              <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                {(
                  [
                    { id: "today", label: "Today (Live)" },
                    { id: "7days", label: "7-Day Outlook" },
                    { id: "30days", label: "30-Day Arc" },
                  ] as const
                ).map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTimeDimension(t.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                      timeDimension === t.id
                        ? "bg-teal-500 text-slate-950 font-bold shadow"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Core Interactive Body: Spatial Map on Left, Zone Telemetry on Right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Spatial Map View (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-8 bg-[#090d13] border-b lg:border-b-0 lg:border-r border-white/[0.08] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Spatial Zone Topology (Interactive)
                  </span>
                  <div className="flex items-center gap-2 text-[10px] font-mono">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" /> Adequate
                    </span>
                    <span className="flex items-center gap-1 text-amber-400">
                      <span className="w-2 h-2 rounded-full bg-amber-400" /> Stress
                    </span>
                    <span className="flex items-center gap-1 text-red-400">
                      <span className="w-2 h-2 rounded-full bg-red-400" /> Deficit
                    </span>
                    <span className="flex items-center gap-1 text-blue-400">
                      <span className="w-2 h-2 rounded-full bg-blue-400" /> Irrigated
                    </span>
                  </div>
                </div>

                {/* Spatial Map Representation */}
                <div className="relative w-full h-[360px] sm:h-[420px] rounded-xl bg-[#06080c] border border-white/[0.08] p-4 overflow-hidden">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 bg-grid-pattern opacity-40" />

                  {/* Building Core Footprint */}
                  <div className="absolute top-[28%] left-[28%] w-[44%] h-[42%] rounded-xl bg-slate-900/90 border border-white/20 flex flex-col items-center justify-center text-center p-2 z-10 shadow-2xl backdrop-blur-md">
                    <span className="text-xs font-bold text-white tracking-wider">RESIDENCE</span>
                    <span className="text-[10px] text-slate-400 font-mono">Main Villa Footprint</span>
                    <span className="text-[9px] text-teal-400/80 font-mono mt-1">Passive Shading Active</span>
                  </div>

                  {/* Swimming Pool Footprint */}
                  <div className="absolute bottom-[8%] right-[10%] w-[24%] h-[18%] rounded-lg bg-cyan-950/70 border border-cyan-400/40 flex items-center justify-center text-center z-10">
                    <span className="text-[10px] font-mono text-cyan-300 font-semibold">Pool & Reflection</span>
                  </div>

                  {/* Zone 1: Front Lawn (Top Full Width) */}
                  <button
                    onClick={() => setSelectedZoneId("z1")}
                    className={`absolute top-[4%] left-[4%] w-[92%] h-[20%] rounded-lg border-2 transition-all p-2 text-left z-20 cursor-pointer ${
                      selectedZoneId === "z1"
                        ? "border-teal-400 bg-teal-950/60 shadow-lg shadow-teal-500/20"
                        : "border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">Zone 1 · Front Lawn (340 m²)</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] text-emerald-300 font-mono block">Status: Adequate (32% Depleted)</span>
                  </button>

                  {/* Zone 2: Citrus Grove (Left Flank) */}
                  <button
                    onClick={() => setSelectedZoneId("z2")}
                    className={`absolute top-[28%] left-[4%] w-[20%] h-[42%] rounded-lg border-2 transition-all p-2 text-left z-20 cursor-pointer ${
                      selectedZoneId === "z2"
                        ? "border-teal-400 bg-teal-950/60 shadow-lg shadow-teal-500/20"
                        : "border-blue-500/40 bg-blue-950/20 hover:border-blue-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">Zone 2</span>
                      <span className="w-2 h-2 rounded-full bg-blue-400" />
                    </div>
                    <span className="text-[10px] text-blue-300 font-mono block mt-1">Citrus Grove</span>
                    <span className="text-[9px] text-slate-400 font-mono">Terraced</span>
                  </button>

                  {/* Zone 3: Perimeter Hedge (Right Flank) */}
                  <button
                    onClick={() => setSelectedZoneId("z3")}
                    className={`absolute top-[28%] right-[4%] w-[20%] h-[42%] rounded-lg border-2 transition-all p-2 text-left z-20 cursor-pointer ${
                      selectedZoneId === "z3"
                        ? "border-teal-400 bg-teal-950/60 shadow-lg shadow-teal-500/20"
                        : "border-amber-500/40 bg-amber-950/20 hover:border-amber-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">Zone 3</span>
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    </div>
                    <span className="text-[10px] text-amber-300 font-mono block mt-1">Hedge</span>
                    <span className="text-[9px] text-amber-400/90 font-mono font-bold">Stress Risk</span>
                  </button>

                  {/* Zone 4: Floral Beds (Bottom Left) */}
                  <button
                    onClick={() => setSelectedZoneId("z4")}
                    className={`absolute bottom-[4%] left-[4%] w-[38%] h-[22%] rounded-lg border-2 transition-all p-2 text-left z-20 cursor-pointer ${
                      selectedZoneId === "z4"
                        ? "border-teal-400 bg-teal-950/60 shadow-lg shadow-teal-500/20"
                        : "border-red-500/40 bg-red-950/20 hover:border-red-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">Zone 4 · Perennials</span>
                      <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                    </div>
                    <span className="text-[10px] text-red-300 font-mono block">Deficit / Anomaly Flagged</span>
                  </button>

                  {/* Zone 5: Poolside Planters (Bottom Center-Right) */}
                  <button
                    onClick={() => setSelectedZoneId("z5")}
                    className={`absolute bottom-[4%] left-[46%] w-[20%] h-[22%] rounded-lg border-2 transition-all p-2 text-left z-20 cursor-pointer ${
                      selectedZoneId === "z5"
                        ? "border-teal-400 bg-teal-950/60 shadow-lg shadow-teal-500/20"
                        : "border-emerald-500/40 bg-emerald-950/20 hover:border-emerald-400"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white font-mono">Zone 5</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <span className="text-[10px] text-emerald-300 font-mono block mt-1">Terraces</span>
                  </button>
                </div>
              </div>

              {/* Automatic Discovery Confidence Feedback */}
              <div className="mt-4 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                  Automatic Detection Confidence: 92% Average
                </span>
                <span className="font-mono text-teal-300">Click any zone to inspect physics</span>
              </div>
            </div>

            {/* Zone Telemetry & Recommendations (5 Cols) */}
            <div className="lg:col-span-5 p-6 sm:p-8 text-left flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-4">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 font-bold">
                      Zone Hydrological Telemetry
                    </span>
                    <h4 className="text-xl font-bold text-white mt-0.5">
                      {activeZone.name}
                    </h4>
                    <span className="text-xs text-slate-400 italic font-mono">
                      {activeZone.species}
                    </span>
                  </div>

                  <div className="text-right">
                    <span className={`text-xs font-bold font-mono uppercase flex items-center gap-1.5 ${activeZone.statusColor}`}>
                      <span className={`w-2 h-2 rounded-full ${activeZone.dotColor}`} />
                      {activeZone.statusLabel}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                      Confidence: {activeZone.confidence}%
                    </span>
                  </div>
                </div>

                {/* Microclimate Physical Numbers */}
                <div className="grid grid-cols-3 gap-2.5 mb-6 text-xs font-mono">
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">Daily ET₀:</span>
                    <span className="text-white font-bold">{activeZone.et0Demand}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">Peff Rain:</span>
                    <span className="text-cyan-300 font-bold">{activeZone.effectiveRain}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                    <span className="text-slate-400 block text-[10px]">Net Deficit:</span>
                    <span className="text-amber-300 font-bold">{activeZone.netIrrigationNeeded}</span>
                  </div>
                </div>

                {/* Soil Reservoir Depletion Bar */}
                <div className="space-y-1.5 mb-6">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Soil Moisture Depletion:</span>
                    <span className="font-mono text-white font-bold">{activeZone.soilDepletion}% of RAW</span>
                  </div>
                  <div className="h-2 w-full bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        activeZone.soilDepletion > 70
                          ? "bg-red-500"
                          : activeZone.soilDepletion > 45
                          ? "bg-amber-400"
                          : "bg-emerald-400"
                      }`}
                      style={{ width: `${activeZone.soilDepletion}%` }}
                    />
                  </div>
                </div>

                {/* Operational Action Recommendation */}
                <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 space-y-1.5 mb-4">
                  <span className="text-[10px] font-mono uppercase text-teal-300 font-bold tracking-wider block">
                    Recommended Irrigation Action
                  </span>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    {activeZone.action}
                  </p>
                </div>

                {/* Anomaly Callout if present */}
                {activeZone.anomaly && (
                  <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 flex items-start gap-2.5 mb-4">
                    <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-red-200 leading-relaxed">
                      <strong>Anomaly Flagged:</strong> {activeZone.anomaly}
                    </div>
                  </div>
                )}

                {/* Intelligently Requested Photo Box */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex items-start gap-2.5">
                  <Camera className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white block text-[11px]">Intelligently Requested Photo:</strong>
                    {activeZone.photoPrompt}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/[0.08] text-[11px] text-slate-400">
                <span>Vegetation & Hydrology Engine · Multi-Layer Model</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
