"use client";

import React from "react";
import { Clock, AlertTriangle, CheckCircle2, CloudRain, SunMedium, Wind, Thermometer } from "lucide-react";

export const ProblemSection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#080b10] border-t border-white/[0.06] overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/40 border border-red-500/30 text-red-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Clock className="w-3.5 h-3.5" />
            The Systemic Disconnect
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            WATER IS STILL BEING <br className="hidden sm:inline" />
            MANAGED BY CLOCKS.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Much of the installed irrigation infrastructure across resorts, golf courses, estates, and private gardens still relies on fixed calendar schedules programmed days, weeks, or months earlier.
          </p>
        </div>

        {/* Environmental Dynamics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
          {[
            { label: "Rainfall", icon: CloudRain, change: "Highly variable" },
            { label: "Temperature", icon: Thermometer, change: "Fluctuates daily" },
            { label: "Humidity / VPD", icon: Wind, change: "Hourly shifts" },
            { label: "Solar Energy", icon: SunMedium, change: "Seasonal arc" },
            { label: "Evapotranspiration", icon: SunMedium, change: "Microclimatic" },
            { label: "Soil Retention", icon: AlertTriangle, change: "Non-linear" },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
              >
                <Icon className="w-4 h-4 text-teal-400 mb-2" />
                <div className="text-sm font-semibold text-white">{item.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{item.change}</div>
              </div>
            );
          })}
        </div>

        {/* Comparison: Current Scheduled System vs HIDRIQ Water Intelligence */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Legacy Clock System (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl p-6 sm:p-8 bg-red-950/15 border border-red-500/20 text-left flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-red-500/20 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-400" />
                  <span className="text-sm font-bold tracking-wider uppercase text-red-300">
                    Legacy Controller Schedule
                  </span>
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-red-900/40 text-red-200">
                  Fixed Calendar
                </span>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="p-3.5 rounded-lg bg-black/40 border border-red-500/20 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Tuesday</span>
                  <span className="text-red-400">06:00 · 20 min</span>
                </div>
                <div className="p-3.5 rounded-lg bg-black/40 border border-red-500/20 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Thursday</span>
                  <span className="text-red-400">06:00 · 20 min</span>
                </div>
                <div className="p-3.5 rounded-lg bg-black/40 border border-red-500/20 flex items-center justify-between">
                  <span className="text-slate-300 font-medium">Saturday</span>
                  <span className="text-red-400">06:00 · 20 min</span>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-red-900/20 border border-red-500/30 text-xs text-red-200/90 leading-relaxed">
                <strong>Failure mode:</strong> Irrigation continues blindly during rainstorms, causing surface runoff, fungal plant disease, and wasted water. During extreme heatwaves, it under-waters, resulting in costly landscape damage.
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-red-500/20 text-[11px] text-red-300/80">
              Assumes environmental conditions remain static indefinitely.
            </div>
          </div>

          {/* HIDRIQ Intelligence (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl p-6 sm:p-8 bg-teal-950/20 border border-teal-500/30 text-left flex flex-col justify-between relative teal-glow">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] uppercase font-mono px-2.5 py-1 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-300 font-semibold">
                Dynamic Physical Balance
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2 border-b border-teal-500/20 pb-4 mb-6">
                <CheckCircle2 className="w-5 h-5 text-teal-400" />
                <span className="text-sm font-bold tracking-wider uppercase text-teal-300">
                  HIDRIQ Intelligence Layer
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                “What does the landscape actually need today?”
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Instead of executing blind clock cycles, HIDRIQ continuously balances reference evapotranspiration (ET₀), effective rainfall (P_eff), soil reservoir depletion, and specific plant crop coefficients (Kc).
              </p>

              {/* Dynamic Action Schedule */}
              <div className="space-y-3 font-mono text-sm">
                <div className="p-3.5 rounded-lg bg-black/40 border border-teal-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span className="text-white font-medium">Tuesday</span>
                  </div>
                  <span className="text-amber-400 font-semibold">SKIP (8 mm rain forecast within 12h)</span>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-teal-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400" />
                    <span className="text-white font-medium">Thursday</span>
                  </div>
                  <span className="text-teal-300 font-semibold">WATER (34 min · Cycle & Soak · 05:15)</span>
                </div>

                <div className="p-3.5 rounded-lg bg-black/40 border border-teal-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="text-white font-medium">Saturday</span>
                  </div>
                  <span className="text-emerald-300 font-semibold">ADAPT (14 min · Shaded zones deferred)</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-teal-500/20 flex items-center justify-between text-xs text-teal-300/80">
              <span>Optimized delivery tailored to real microclimates</span>
              <span className="font-semibold">Zero Hardware Replacement Needed</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
