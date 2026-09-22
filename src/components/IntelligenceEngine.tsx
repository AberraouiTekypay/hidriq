"use client";

import React, { useState } from "react";
import { Database, Cpu, CloudRain, Gauge, Activity, Radio } from "lucide-react";

export const IntelligenceEngine: React.FC = () => {
  const [activeEngine, setActiveEngine] = useState<number>(0);

  const engines = [
    {
      id: "demand",
      name: "1. Water Demand Engine",
      icon: Cpu,
      formula: "ET_L = K_L × ET₀ (where K_L = K_s × K_d × K_mc)",
      role: "Determines biological water consumption per square meter.",
      details: [
        "ASCE / FAO-56 Penman-Monteith reference evapotranspiration calculation",
        "Landscape Coefficient Method incorporating botanical species need (Ks)",
        "Microclimate adjustment factor (Kmc) for solar radiation, shade, and wind exposure",
        "Soil water holding capacity (TAW/RAW) and depletion tracking",
      ],
    },
    {
      id: "forecast",
      name: "2. Forecast Engine",
      icon: CloudRain,
      formula: "P_eff = f(Rainfall, Soil Infiltration, Antecedent Moisture)",
      role: "Predicts incoming atmospheric energy and natural precipitation.",
      details: [
        "High-resolution numerical weather prediction (ECMWF / GFS / AROME grids)",
        "Effective rainfall infiltration vs. un-infiltrated surface runoff computation",
        "Rolling 24h, 48h, and 72h precipitation probability risk weighting",
        "Vapor pressure deficit (VPD) forecasting to anticipate transpirational stress",
      ],
    },
    {
      id: "optimization",
      name: "3. Optimization Engine",
      icon: Gauge,
      formula: "Cycle Runtime = min(Total Needed, Infiltration Threshold)",
      role: "Converts millimeters of deficit into hydraulic execution schedules.",
      details: [
        "Cycle-and-soak partitioning: pulses watering to eliminate runoff on slopes",
        "Hydraulic line balancing: restricts simultaneous zones to prevent pressure drops",
        "Electrical time-of-use tariff scheduling (prioritizing 02:00–06:00 pumping)",
        "Wind drift avoidance: skips spray head runtime during peak wind gusts",
      ],
    },
    {
      id: "execution",
      name: "4. Execution Engine",
      icon: Radio,
      formula: "Vendor-Neutral Protocol Abstraction (REST / Webhook / Modbus)",
      role: "Communicates the schedule to existing infrastructure.",
      details: [
        "Pluggable controller connectors for Hunter Hydrawise, Rain Bird IQ4, Toro",
        "Groundskeeper mobile dispatch: generates daily human-readable run-sheets",
        "Dry-contact relay retrofit bridge support for legacy 24VAC systems",
        "Default-safe failsafe limits prevent any zone from running past safety thresholds",
      ],
    },
    {
      id: "verification",
      name: "5. Verification & Learning",
      icon: Activity,
      formula: "Δ Flow = Metered Real-Time Flow - Expected Baseline Flow",
      role: "Detects physical failures and recalibrates model parameters.",
      details: [
        "Real-time sub-meter reconciliation: flags mainline bursts, stuck valves, and leaks",
        "Closed-loop comparison between scheduled vs. metered water delivery",
        "Observed dry-down curve analysis to auto-calibrate soil hydraulic parameters",
        "Weekly performance auditing and verified water accounting",
      ],
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#07090d] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Database className="w-3.5 h-3.5" />
            Software Infrastructure
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            THE DATA LAYER <br className="hidden sm:inline" />
            BENEATH WATER.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            HIDRIQ is a software infrastructure platform. We turn disconnected environmental streams, soil hydrology, and legacy controllers into a cohesive, deterministic optimization engine.
          </p>
        </div>

        {/* Engine Tabs and In-Depth Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Engine Selector Column (5 cols) */}
          <div className="lg:col-span-5 space-y-3 text-left">
            {engines.map((eng, idx) => {
              const Icon = eng.icon;
              const isSelected = activeEngine === idx;
              return (
                <button
                  key={eng.id}
                  onClick={() => setActiveEngine(idx)}
                  className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-teal-950/40 border-teal-500/60 shadow-md shadow-teal-500/10"
                      : "bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.12]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isSelected
                          ? "bg-teal-500/20 text-teal-300"
                          : "bg-white/[0.05] text-slate-400"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div
                        className={`text-sm font-bold ${
                          isSelected ? "text-white" : "text-slate-300"
                        }`}
                      >
                        {eng.name}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate max-w-[240px]">
                        {eng.role}
                      </div>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-mono font-bold ${
                      isSelected ? "text-teal-400" : "text-slate-400"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Engine Detail Card (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 glass-panel border border-teal-500/30 text-left teal-glow">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400">
                Engine Specification
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-slate-300">
                Deterministic Model
              </span>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">
              {engines[activeEngine].name}
            </h3>
            <p className="text-sm text-slate-300 mb-6">
              {engines[activeEngine].role}
            </p>

            {/* Formula Block */}
            <div className="p-4 rounded-xl bg-black/50 border border-teal-500/20 mb-6 font-mono text-xs text-teal-300">
              <span className="text-slate-400 block text-[10px] uppercase tracking-widest mb-1">
                Mathematical Formulation
              </span>
              {engines[activeEngine].formula}
            </div>

            {/* Technical Bullet Details */}
            <div className="space-y-3">
              <span className="text-xs uppercase font-mono tracking-wider text-slate-400 font-semibold block">
                Key Technical Capabilities
              </span>
              {engines[activeEngine].details.map((detail, dIdx) => (
                <div key={dIdx} className="flex items-start gap-2.5 text-xs text-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                  <span className="leading-relaxed">{detail}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] flex items-center justify-between text-[11px] text-slate-400">
              <span>Software & Data Architecture</span>
              <span className="text-emerald-400 font-mono">Hardware-Neutral</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
