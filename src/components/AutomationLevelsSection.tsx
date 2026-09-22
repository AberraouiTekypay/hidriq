"use client";

import React, { useState } from "react";
import { ShieldCheck, Gauge } from "lucide-react";

export const AutomationLevelsSection: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<number>(5);

  const levels = [
    {
      lvl: 0,
      title: "Digital Twin",
      category: "Spatial Foundation",
      desc: "Automatic property discovery via coordinates, elevation, cadastral boundary, and aerial imagery.",
      userEffort: "High (Confirmation)",
      autonomy: "Passive Observation",
    },
    {
      lvl: 1,
      title: "Recommendation",
      category: "Human Action",
      desc: "Weekly personalized watering schedules and duration run-sheets generated for groundskeepers or homeowners.",
      userEffort: "Moderate (Manual run)",
      autonomy: "Advisory Guidance",
    },
    {
      lvl: 2,
      title: "Water Monitoring",
      category: "Accounting",
      desc: "Sub-meter and water bill ingestion tracking baseline consumption vs. modeled biological demand.",
      userEffort: "Low (Periodic check)",
      autonomy: "Accounting Tracking",
    },
    {
      lvl: 3,
      title: "Controller Integration",
      category: "Hardware Bridge",
      desc: "Bi-directional connection to existing controllers (Hunter, Rain Bird, Toro) via cloud APIs or relay modules.",
      userEffort: "Minimal (Authorize link)",
      autonomy: "Connected Execution",
    },
    {
      lvl: 4,
      title: "Sensor Integration",
      category: "Precision Upgrade",
      desc: "Optional multi-depth soil moisture probes and weather stations for localized ground-truth calibration.",
      userEffort: "Zero (Automated telemetry)",
      autonomy: "High Precision Grounding",
    },
    {
      lvl: 5,
      title: "Autopilot",
      category: "Autonomous Delivery",
      desc: "Closed-loop automated schedule updates pushed directly to valves with multi-layer safety bounds.",
      userEffort: "Zero (Hands-off)",
      autonomy: "Full Operational Autopilot",
    },
    {
      lvl: 6,
      title: "Anomaly Detection",
      category: "Risk Protection",
      desc: "Sub-meter flow monitoring flagging stuck valves, main pipe breaks, or clogged drip lines in real time.",
      userEffort: "Zero (Proactive alerts)",
      autonomy: "Continuous Vigilance",
    },
    {
      lvl: 7,
      title: "Vegetation Health",
      category: "Longitudinal Vision",
      desc: "Multi-spectral change detection and photo comparison tracking canopy vigor and moisture stress over time.",
      userEffort: "Zero (Automated tracking)",
      autonomy: "Biological Observation",
    },
    {
      lvl: 8,
      title: "Predictive Maintenance",
      category: "Asset Health",
      desc: "Predicting solenoid burnout, pressure drops, or distribution failures before physical breakdown occurs.",
      userEffort: "Zero (Preemptive alerts)",
      autonomy: "Self-Healing Infrastructure",
    },
  ];

  return (
    <section id="automation" className="relative py-24 sm:py-32 bg-[#080b10] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Gauge className="w-3.5 h-3.5" />
            Autonomy Spectrum
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            NINE LEVELS OF WATER <br className="hidden sm:inline" />
            AUTOMATION.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Human input decreases as algorithmic understanding compounds. From Day 1 digital twin discovery to Level 8 predictive maintenance.
          </p>
        </div>

        {/* Human Effort Inversion Curve (Day 1 -> Day 90) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-16 text-left">
          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <span className="text-xs font-mono text-teal-400 font-bold block mb-1">
              DAY 01
            </span>
            <h4 className="text-sm font-bold text-white mb-1">User Confirms Property</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              HIDRIQ discovers the property automatically. The user confirms boundaries and snaps targeted photos where guidance is requested.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <span className="text-xs font-mono text-cyan-400 font-bold block mb-1">
              DAY 30
            </span>
            <h4 className="text-sm font-bold text-white mb-1">HIDRIQ Understands Microclimates</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Soil dry-down curves and real transpirational responses are mapped against daily ECMWF weather and solar radiation.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <span className="text-xs font-mono text-blue-400 font-bold block mb-1">
              DAY 90
            </span>
            <h4 className="text-sm font-bold text-white mb-1">Baseline Behavior Mastered</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Normal water uptake profiles are established. Flow meter anomaly baselines and cycle-and-soak thresholds operate with high confidence.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-teal-950/40 border border-teal-500/40 teal-glow">
            <span className="text-xs font-mono text-emerald-300 font-bold block mb-1">
              LONG TERM
            </span>
            <h4 className="text-sm font-bold text-white mb-1">Autonomous Governance</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Continuous optimization runs in the background. The user is only interrupted if an anomaly, leak, or biological risk emerges.
            </p>
          </div>
        </div>

        {/* 9 Levels Interactive Carousel / Grid */}
        <div className="p-6 sm:p-10 rounded-2xl glass-panel border border-white/[0.1] text-left mb-16">
          <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400 font-bold">
              Automation Levels Spectrum (Level 0 – Level 8)
            </span>
            <span className="text-xs font-mono text-slate-400">
              Selected: Level 0{selectedLevel} · {levels[selectedLevel].title}
            </span>
          </div>

          {/* Level Selector Buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2 mb-8">
            {levels.map((lvl) => {
              const isSelected = selectedLevel === lvl.lvl;
              return (
                <button
                  key={lvl.lvl}
                  onClick={() => setSelectedLevel(lvl.lvl)}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? "bg-teal-500 text-slate-950 border-teal-400 shadow-lg shadow-teal-500/20 font-bold"
                      : "bg-white/[0.02] border-white/[0.08] text-slate-300 hover:border-white/[0.2]"
                  }`}
                >
                  <div className="text-[10px] font-mono uppercase">L{lvl.lvl}</div>
                  <div className="text-xs font-semibold truncate">{lvl.title}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Level Deep Dive */}
          <div className="p-6 rounded-xl bg-[#090e15] border border-teal-500/30 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-teal-950 border border-teal-500/40 text-teal-300 uppercase">
                  Level {levels[selectedLevel].lvl} · {levels[selectedLevel].category}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">
                {levels[selectedLevel].title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {levels[selectedLevel].desc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between text-slate-300">
                <span>User Input Needed:</span>
                <span className="text-teal-300 font-bold">{levels[selectedLevel].userEffort}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Autonomy Status:</span>
                <span className="text-emerald-400 font-bold">{levels[selectedLevel].autonomy}</span>
              </div>
            </div>
          </div>
        </div>

        {/* The Autopilot Safety Model (Critical Trust Anchor) */}
        <div className="p-6 sm:p-8 rounded-2xl bg-teal-950/20 border border-teal-500/30 text-left">
          <div className="flex items-center gap-2.5 mb-4">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <h3 className="text-lg sm:text-xl font-bold text-white">
              The Autopilot Safety Architecture: Safety Overrides Optimization
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-3xl">
            HIDRIQ never immediately activates autonomous valve actuation on a newly onboarded property. Autonomous control is preceded by a baseline observation phase. Hardcoded fail-safes protect physical infrastructure at all times:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08]">
              <span className="text-teal-400 font-bold block mb-1">• Maximum Runtime Cap</span>
              <span className="text-slate-400">Hard lock limits any zone from running beyond site-defined thresholds.</span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08]">
              <span className="text-cyan-400 font-bold block mb-1">• Rain & Freeze Interlock</span>
              <span className="text-slate-400">Immediate automatic abort if effective precipitation or sub-zero temp occurs.</span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08]">
              <span className="text-amber-400 font-bold block mb-1">• Confidence Fallback</span>
              <span className="text-slate-400">If forecast confidence drops below threshold, reverts to Recommendation Mode.</span>
            </div>

            <div className="p-3 rounded-xl bg-black/40 border border-white/[0.08]">
              <span className="text-emerald-400 font-bold block mb-1">• Manual Master Override</span>
              <span className="text-slate-400">Physical and digital emergency shutoff always available with single button.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
