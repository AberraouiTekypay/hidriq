"use client";

import React from "react";
import { Milestone } from "lucide-react";

export const RoadmapSection: React.FC = () => {
  const stages = [
    {
      stage: "STAGE 01",
      timing: "NOW",
      title: "Parallel Launch: Hospitality & Consumer",
      focus: "Morocco B2B + Spain B2C",
      badgeColor: "bg-teal-500/20 text-teal-300 border-teal-500/40",
      isCurrent: true,
      milestones: [
        "Zephyr Hotels POC (Morocco): 60-day baseline audit and phased execution.",
        "HIDRIQ HOME Launch (Spain): Digital rollout across Marbella, Mallorca, Alicante & Costa del Sol.",
        "Manual Garden Mode & Garden Digital Twin: Free water checks via photo analysis.",
        "Core Water Demand Engine v1.0 (FAO-56 Penman-Monteith ASCE standardized models).",
      ],
    },
    {
      stage: "STAGE 02",
      timing: "NEXT",
      title: "Golf & Mediterranean Residential Scale",
      focus: "Turf Topography & Absentee Homes",
      badgeColor: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      isCurrent: false,
      milestones: [
        "Championship Golf Course optimization: Slope cycle-and-soak & electrical tariff pumping.",
        "Expansion of HIDRIQ HOME to Portugal (Algarve), Italy (Tuscany), and Greece.",
        "Absentee Second-Home Monitoring: Remote freeze and burst pipe anomaly alerts.",
        "Cloud Controller API connectors for Hunter Hydrawise, Rain Bird IQ4, and Toro.",
      ],
    },
    {
      stage: "STAGE 03",
      timing: "COMING SOON",
      title: "High-Value Specialty Agriculture",
      focus: "Economic Yield Optimization ($/m³)",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      isCurrent: false,
      milestones: [
        "Activation of the multi-tier agricultural hierarchy (Farm → Field → Block → Crop → Variety).",
        "Regulated Deficit Irrigation (RDI) models for olives, almonds, citrus, and vineyards.",
        "Shift from water minimization to maximizing crop economic value per cubic metre.",
        "Subsurface soil sensor fusion for automated root-zone moisture calibration.",
      ],
    },
    {
      stage: "STAGE 04",
      timing: "FUTURE",
      title: "Water Infrastructure & Basin Intelligence",
      focus: "District & Municipal Scale",
      badgeColor: "bg-blue-500/20 text-blue-300 border-blue-500/40",
      isCurrent: false,
      milestones: [
        "Basin-scale predictive withdrawal forecasting for water utility authorities.",
        "District-level non-revenue water (NRW) loss detection and distribution balance.",
        "Municipal park and green-space policy orchestration via central API limits.",
      ],
    },
  ];

  return (
    <section id="roadmap" className="relative py-24 sm:py-32 bg-[#07090d] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Milestone className="w-3.5 h-3.5" />
            Strategic Roadmap
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            BUILT TO SCALE FROM <br className="hidden sm:inline" />
            GARDENS TO BASINS.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Progression is governed by physical validation and algorithmic maturity rather than speculative calendar deadlines.
          </p>
        </div>

        {/* 4 Stage Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 text-left">
          {stages.map((st) => (
            <div
              key={st.stage}
              className={`p-6 rounded-2xl border transition-all flex flex-col justify-between ${
                st.isCurrent
                  ? "bg-teal-950/30 border-teal-500/50 shadow-xl shadow-teal-500/10"
                  : "bg-white/[0.02] border-white/[0.08]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-bold text-slate-400 tracking-wider">
                    {st.stage}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border uppercase ${st.badgeColor}`}
                  >
                    {st.timing}
                  </span>
                </div>

                <h3 className="text-base font-bold text-white mb-1">
                  {st.title}
                </h3>
                <div className="text-xs font-mono text-teal-400 mb-5">
                  {st.focus}
                </div>

                <ul className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
                  {st.milestones.map((m, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-1.5 shrink-0" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 mt-6 border-t border-white/[0.06] text-[11px] font-mono text-slate-400">
                {st.isCurrent ? "Phase in active deployment" : "Next sequence on roadmap"}
              </div>
            </div>
          ))}
        </div>

        {/* Dual Traction Engine Table for Investors & Partners */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.08] text-left">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/[0.08] pb-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold block mb-1">
                Traction Architecture
              </span>
              <h3 className="text-lg font-bold text-white">
                One Core Engine · Dual Compounding Curves
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Designed for enterprise depth & consumer velocity
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-white/[0.08] text-slate-400 font-mono">
                  <th className="py-2.5 pr-4 font-semibold">Traction Dimension</th>
                  <th className="py-2.5 px-4 font-semibold text-teal-300">B2B Track: HIDRIQ BUSINESS</th>
                  <th className="py-2.5 pl-4 font-semibold text-cyan-300">B2C Track: HIDRIQ HOME</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-slate-300">
                <tr>
                  <td className="py-3 pr-4 font-medium text-white">Launch Beachhead</td>
                  <td className="py-3 px-4">Morocco (Zephyr Hotels)</td>
                  <td className="py-3 pl-4">Spain (Marbella, Costa del Sol, Mallorca)</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-white">Core Metric</td>
                  <td className="py-3 px-4">Hectares / Properties Onboarded</td>
                  <td className="py-3 pl-4">Gardens Assessed / Digital Twins Created</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-white">Volume Unit</td>
                  <td className="py-3 px-4">m³ Analyzed, Modeled & Optimized</td>
                  <td className="py-3 pl-4">Avoided Unnecessary Watering Cycles</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium text-white">Commercial Model</td>
                  <td className="py-3 px-4">Annual SaaS per Valve Zone + Site License</td>
                  <td className="py-3 pl-4">Free Assessment → Monthly Monitoring (€9–€29/mo)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
