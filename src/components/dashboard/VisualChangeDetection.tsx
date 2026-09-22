"use client";

import React from "react";
import Image from "next/image";
import {
  Eye,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { PropertyChangeDetection } from "@/lib/propertyStore";

interface VisualChangeDetectionProps {
  changeDetections: PropertyChangeDetection[];
}

export const VisualChangeDetection: React.FC<VisualChangeDetectionProps> = ({
  changeDetections,
}) => {

  if (!changeDetections || changeDetections.length === 0) {
    return (
      <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] text-center space-y-2 text-left">
        <CheckCircle2 className="w-8 h-8 text-teal-400 mx-auto" />
        <div className="text-sm font-bold text-white text-center">
          No Significant Visual Anomalies Detected
        </div>
        <p className="text-xs text-slate-400 max-w-md mx-auto text-center">
          Longitudinal photographic baselines show stable canopy density and vegetation greenness across all micro-zones.
        </p>
      </div>
    );
  }

  const current = changeDetections[0];

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-[10px] font-mono font-semibold uppercase tracking-wider mb-1.5">
            <Eye className="w-3.5 h-3.5" />
            Longitudinal Visual Analysis
          </div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Visual Change & Microclimate Anomaly Detection
          </h3>
          <p className="text-xs text-slate-400">
            Comparing current multi-spectral photo evidence against historical property baselines.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-lg bg-purple-950/40 border border-purple-500/30 text-purple-300 font-bold">
          {changeDetections.length} Flagged Area
        </span>
      </div>

      {/* Before / After Comparison Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-[#0a0e15] border border-white/[0.12] shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
          <div>
            <div className="text-sm font-bold text-white">
              {current.title}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Target: <strong className="text-teal-300">{current.zoneName}</strong> · {current.period}
            </div>
          </div>

          <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/40 text-purple-300 w-fit">
            Status: {current.status}
          </span>
        </div>

        {/* Visual Comparison Split Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400 font-bold uppercase">Baseline (30 Days Ago)</span>
              <span className="text-slate-500 text-[10px]">Optimal Turgor</span>
            </div>
            <div className="relative h-56 rounded-xl overflow-hidden border border-white/[0.08]">
              <Image
                src={current.beforeImg}
                alt="Baseline garden canopy state"
                fill
                className="object-cover filter brightness-[0.9]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
                Baseline Reference
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-purple-300 font-bold uppercase">Current Observation</span>
              <span className="text-amber-400 text-[10px]">12% Spectral Shift</span>
            </div>
            <div className="relative h-56 rounded-xl overflow-hidden border border-purple-500/30">
              <Image
                src={current.afterImg}
                alt="Current observed garden canopy"
                fill
                className="object-cover filter brightness-[0.95]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-purple-300 border border-purple-500/30">
                Latest Photo Inspection
              </div>
            </div>
          </div>
        </div>

        {/* Observations List */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2">
          <span className="text-xs font-bold text-white block font-mono uppercase tracking-wider">
            Hydrological Observations:
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {current.observations.map((obs, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5" />
                <span>{obs}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Non-Alarmist Recommendation (Section 13) */}
        <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-purple-400" />
              <span>Potential Anomaly Detected: Would you like to investigate?</span>
            </div>
            <p className="text-xs text-slate-300">
              {current.recommendation}
            </p>
          </div>

          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shrink-0"
          >
            Log Inspection
          </button>
        </div>
      </div>
    </div>
  );
};
