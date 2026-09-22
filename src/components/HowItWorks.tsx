"use client";

import React, { useState } from "react";
import { Eye, TrendingUp, Sliders, Zap, CheckCircle2, ChevronRight } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const [activeMode, setActiveMode] = useState<"analyze" | "recommend" | "autopilot">("analyze");

  const steps = [
    {
      num: "01",
      title: "OBSERVE",
      icon: Eye,
      summary: "Understand the property, landscape zones, microclimates, and existing irrigation infrastructure.",
      details: "GPS zone boundary mapping, botanical species cataloging, emission device precipitation rates, and historical calendar runtimes.",
    },
    {
      num: "02",
      title: "PREDICT",
      icon: TrendingUp,
      summary: "Estimate actual plant water requirements based on high-resolution atmospheric physics.",
      details: "ASCE FAO-56 Penman-Monteith daily reference ET₀, effective rainfall infiltration models, and root-zone water balance tracking.",
    },
    {
      num: "03",
      title: "OPTIMIZE",
      icon: Sliders,
      summary: "Generate hydraulic-aware watering schedules tailored to terrain and soil infiltration.",
      details: "Cycle-and-soak partitioning to eliminate slope runoff, electrical tariff pumping windows, and pressure-balanced station sequencing.",
    },
    {
      num: "04",
      title: "AUTOMATE",
      icon: Zap,
      summary: "Communicate optimized runtimes to existing infrastructure where technically supported.",
      details: "Dispatched via daily digital run-sheets for grounds staff, cloud API integrations (Hunter, Rain Bird, Toro), or retrofit relay modules.",
    },
  ];

  return (
    <section className="relative py-24 sm:py-32 bg-[#080b10] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4">
            System Methodology
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            HOW HIDRIQ WORKS.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            A structured progression from passive property observation to closed-loop autonomous execution.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-teal-500/30 transition-all text-left flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-mono font-bold text-teal-400">
                      {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-teal-950/50 border border-teal-500/30 flex items-center justify-center text-teal-300">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 tracking-wide">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed mb-4">
                    {step.summary}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.06] text-[11px] text-slate-400 leading-normal">
                  {step.details}
                </div>
              </div>
            );
          })}
        </div>

        {/* Progressive Operating Modes: ANALYZE -> RECOMMEND -> AUTOPILOT */}
        <div className="p-8 sm:p-10 rounded-2xl glass-panel border border-white/[0.1] text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/[0.08] pb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-teal-400 font-semibold block mb-1">
                Operational Progression
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Operate at the level of autonomy you trust.
              </h3>
            </div>

            {/* Mode Selector Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
              {(["analyze", "recommend", "autopilot"] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setActiveMode(mode)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                    activeMode === mode
                      ? "bg-teal-500 text-slate-950 shadow-md font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className={`p-6 rounded-xl border transition-all ${
                activeMode === "analyze"
                  ? "bg-teal-950/30 border-teal-500/50"
                  : "bg-white/[0.01] border-white/[0.05] opacity-60"
              }`}
            >
              <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold uppercase mb-2">
                <CheckCircle2 className="w-4 h-4" /> Mode 1: ANALYZE
              </div>
              <h4 className="text-base font-bold text-white mb-2">Shadow Mode Auditing</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Understand what is currently happening. Ingest current schedules and compare them with calculated atmospheric demand without touching a single valve.
              </p>
            </div>

            <div
              className={`p-6 rounded-xl border transition-all ${
                activeMode === "recommend"
                  ? "bg-teal-950/30 border-teal-500/50"
                  : "bg-white/[0.01] border-white/[0.05] opacity-60"
              }`}
            >
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs font-bold uppercase mb-2">
                <CheckCircle2 className="w-4 h-4" /> Mode 2: RECOMMEND
              </div>
              <h4 className="text-base font-bold text-white mb-2">Human-in-the-Loop Action</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Tell operators exactly what to change. Deliver daily optimized run-sheets to groundskeepers via web, WhatsApp, or email for manual review and sign-off.
              </p>
            </div>

            <div
              className={`p-6 rounded-xl border transition-all ${
                activeMode === "autopilot"
                  ? "bg-teal-950/30 border-teal-500/50"
                  : "bg-white/[0.01] border-white/[0.05] opacity-60"
              }`}
            >
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold uppercase mb-2">
                <CheckCircle2 className="w-4 h-4" /> Mode 3: AUTOPILOT
              </div>
              <h4 className="text-base font-bold text-white mb-2">Autonomous Delivery</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Automatically push optimized runtime programs to supported controllers via cloud APIs or retrofit bridges, with hard failsafe duration bounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
