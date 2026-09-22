"use client";

import React, { useState } from "react";
import { ArrowDown, Check, Layers, Cpu, Radio, RotateCcw, CloudSun, Compass, ShieldCheck } from "lucide-react";

export const ProductThesis: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const loopSteps = [
    {
      name: "PREDICT",
      title: "Model Atmospheric Demand",
      desc: "Calculate daily reference evapotranspiration (ET₀), effective rainfall infiltration, and root-zone moisture depletion per zone.",
      metric: "FAO-56 Penman-Monteith",
    },
    {
      name: "ACT",
      title: "Deliver Optimal Water",
      desc: "Translate net water requirements into precision run-sheets or automated commands pushed to existing controllers.",
      metric: "Cycle & Soak Scheduling",
    },
    {
      name: "MEASURE",
      title: "Log Actual Application",
      desc: "Record flow meters, rainfall gauges, and optional soil moisture telemetry to verify actual vs. intended volumetric delivery.",
      metric: "Sub-meter Reconciliation",
    },
    {
      name: "LEARN",
      title: "Calibrate Hydraulics",
      desc: "Refine soil water-holding capacities and crop coefficients based on observed seasonal dry-down rates.",
      metric: "Empirical Auto-Tuning",
    },
  ];

  return (
    <section id="technology" className="relative py-24 sm:py-32 bg-[#07090d] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Compass className="w-3.5 h-3.5" />
            Product Thesis
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            FROM SCHEDULED WATERING <br className="hidden sm:inline" />
            TO INTELLIGENT WATERING.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            HIDRIQ sits between environmental reality and physical infrastructure — synthesizing weather, physics, and landscape taxonomy to determine the exact water requirement.
          </p>
        </div>

        {/* Conceptual Architecture Flow Diagram */}
        <div className="mb-20 p-6 sm:p-10 rounded-2xl glass-panel border border-white/[0.1] text-left">
          <div className="text-xs uppercase font-mono tracking-widest text-slate-400 mb-6">
            The Flow of Water Intelligence
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            {/* 1. Inputs */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2.5 h-full">
              <span className="text-[11px] font-mono uppercase text-teal-400 font-semibold block">
                01 · Continuous Inputs
              </span>
              <ul className="text-xs text-slate-300 space-y-1.5 font-medium">
                <li className="flex items-center gap-1.5">• Numerical Weather (ECMWF)</li>
                <li className="flex items-center gap-1.5">• Reference ET₀ Evapotranspiration</li>
                <li className="flex items-center gap-1.5">• Effective Rainfall (Peff)</li>
                <li className="flex items-center gap-1.5">• Plant Taxonomy & Canopy (Kl)</li>
                <li className="flex items-center gap-1.5">• Soil Texture & Slope Angle</li>
                <li className="flex items-center gap-1.5">• Sub-meter Flow Data</li>
              </ul>
            </div>

            {/* Down / Right Arrow */}
            <div className="flex md:hidden justify-center py-1">
              <ArrowDown className="w-5 h-5 text-teal-400" />
            </div>

            {/* 2. HIDRIQ CORE */}
            <div className="p-5 rounded-xl bg-teal-950/40 border border-teal-500/40 space-y-2.5 h-full teal-glow">
              <span className="text-[11px] font-mono uppercase text-teal-300 font-semibold block flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-teal-400" />
                02 · HIDRIQ Core Engine
              </span>
              <p className="text-xs text-slate-200 leading-relaxed">
                ASCE FAO-56 Penman-Monteith physical models synthesize daily atmospheric demand and root-zone water balance across micro-zones.
              </p>
              <div className="pt-2 text-[10px] font-mono text-teal-300">
                Independent · Vendor-Neutral
              </div>
            </div>

            {/* Down / Right Arrow */}
            <div className="flex md:hidden justify-center py-1">
              <ArrowDown className="w-5 h-5 text-teal-400" />
            </div>

            {/* 3. Optimal Decision */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2.5 h-full">
              <span className="text-[11px] font-mono uppercase text-cyan-400 font-semibold block">
                03 · Optimal Delivery
              </span>
              <div className="space-y-2 text-xs text-slate-300 font-medium">
                <div><span className="text-white font-bold">WHEN:</span> Off-peak tariff / low evaporative windows</div>
                <div><span className="text-white font-bold">WHERE:</span> Specific micro-zone or garden bed</div>
                <div><span className="text-white font-bold">HOW MUCH:</span> Exact depth in mm / minutes</div>
              </div>
            </div>

            {/* Down / Right Arrow */}
            <div className="flex md:hidden justify-center py-1">
              <ArrowDown className="w-5 h-5 text-teal-400" />
            </div>

            {/* 4. Execution */}
            <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08] space-y-2.5 h-full">
              <span className="text-[11px] font-mono uppercase text-emerald-400 font-semibold block">
                04 · Existing Infrastructure
              </span>
              <p className="text-xs text-slate-300 leading-relaxed">
                Communicated via daily groundskeeper run-sheets, mobile recommendations, or direct controller APIs.
              </p>
              <div className="pt-2 text-[10px] font-mono text-emerald-400">
                Hunter · Rain Bird · Toro · Manual
              </div>
            </div>
          </div>
        </div>

        {/* The Core Feedback Loop: PREDICT -> ACT -> MEASURE -> LEARN */}
        <div className="text-left space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal-400 font-semibold">
              The Closed Loop
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              PREDICT → ACT → MEASURE → LEARN
            </h3>
            <p className="text-sm text-slate-300 mt-2 max-w-2xl">
              Water intelligence is not a one-way command. It is a continuous, self-correcting thermodynamic feedback loop.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {loopSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <div
                  key={step.name}
                  onClick={() => setActiveStep(idx)}
                  className={`p-6 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected
                      ? "bg-teal-950/40 border-teal-500/50 shadow-lg shadow-teal-500/10"
                      : "bg-white/[0.02] border-white/[0.08] hover:border-white/[0.18]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`text-xs font-mono font-bold tracking-widest ${
                        isSelected ? "text-teal-400" : "text-slate-400"
                      }`}
                    >
                      {step.name}
                    </span>
                    <span className="text-xs font-mono text-slate-400">0{idx + 1}</span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">{step.desc}</p>

                  <div className="pt-3 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
                    {step.metric}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
