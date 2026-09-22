"use client";

import React from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Check,
} from "lucide-react";
import { Property, PropertyZone } from "@/lib/propertyStore";

interface WhatNeedsAttentionProps {
  property: Property;
  onSelectZone: (zone: PropertyZone) => void;
}

export const WhatNeedsAttention: React.FC<WhatNeedsAttentionProps> = ({
  property,
  onSelectZone,
}) => {
  const attentionZones = property.zones.filter(
    (z) => z.waterStatus === "NEEDS_WATER" || z.waterStatus === "ATTENTION" || z.vegetationStatus === "ANOMALY" || z.irrigationStatus === "POSSIBLE_ISSUE"
  );

  const goodZones = property.zones.filter(
    (z) => z.waterStatus === "GOOD" && z.vegetationStatus === "HEALTHY" && z.irrigationStatus !== "POSSIBLE_ISSUE"
  );

  return (
    <div className="space-y-8 text-left">
      {/* 1. WHAT NEEDS ATTENTION? VIEW (Section 10) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                What Needs Attention?
              </h3>
              <p className="text-xs text-slate-400">
                Prioritized hydrological items and prescriptive interventions for {property.name}.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-300 font-bold">
            {attentionZones.length} Action Items
          </span>
        </div>

        {attentionZones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {attentionZones.map((zone, index) => {
              const isCritical = zone.waterStatus === "NEEDS_WATER";

              return (
                <div
                  key={zone.id}
                  className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                    isCritical
                      ? "bg-rose-950/30 border-rose-500/40 shadow-lg shadow-rose-500/5"
                      : "bg-amber-950/20 border-amber-500/30 shadow-lg shadow-amber-500/5"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-black/40 border border-white/[0.1] text-slate-300 font-bold">
                        #{index + 1} · {zone.name}
                      </span>
                      <span
                        className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          isCritical
                            ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {zone.waterStatus.replace("_", " ")}
                      </span>
                    </div>

                    <div className="text-sm font-bold text-white mb-1.5">
                      {isCritical
                        ? "Moisture Deficit Projected Tomorrow"
                        : "Approaching Soil Allowable Depletion"}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {zone.recommendedAction}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between">
                    <div className="text-[11px] font-mono text-slate-400">
                      Requirement: <span className="text-white font-bold">{zone.estimatedWaterRequirement}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectZone(zone)}
                      className="flex items-center gap-1 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
                    >
                      <span>Investigate Zone</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <div className="text-sm font-bold text-white">All Zones Hydrated in Target Range</div>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Zero water deficits or anomalies detected across your property zones today.
            </p>
          </div>
        )}
      </div>

      {/* 2. WHAT IS GOOD? VIEW (Section 11) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <Check className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Looking Good
              </h3>
              <p className="text-xs text-slate-400">
                Zones operating in balanced hydrological equilibrium. A healthy property should feel calm.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono px-2.5 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 font-bold">
            {goodZones.length} Zones Balanced
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {goodZones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => onSelectZone(zone)}
              className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] hover:border-emerald-500/30 transition-all cursor-pointer text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>ZONE 0{zone.number}</span>
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Optimal
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {zone.shortName}
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 line-clamp-1">
                  {zone.vegetation}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-white/[0.06] text-[10px] text-slate-400 flex items-center justify-between font-mono">
                <span>Rainfall: {zone.recentRainfall}</span>
                <span className="text-emerald-400 font-semibold">96% Turgor</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
