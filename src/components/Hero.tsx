"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Building2, Droplet, Sun, Wind, Activity, Layers } from "lucide-react";

interface HeroProps {
  onOpenLeadModal: (tab?: "b2c" | "b2b") => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenLeadModal }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-28 pb-16 lg:py-36">
      {/* Cinematic Background Image with Gradient Masking */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=2000&q=80"
          alt="Luxury Mediterranean resort landscape managed with intelligent water distribution"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-[0.42] contrast-[1.15]"
        />
        {/* Deep cinematic gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-[#07090d]/65 to-[#07090d]/85" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07090d]/90 via-transparent to-[#07090d]/80" />
        <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Hero Content (Left 7 Columns) */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Eyebrow & Geographic Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] backdrop-blur-md">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-teal-400">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping" />
                Water Intelligence
              </span>
              <span className="text-white/20">|</span>
              <span className="text-[11px] text-slate-300 font-medium">
                Morocco + Spain Beachheads
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.06]">
              WATER. <br />
              <span className="bg-gradient-to-r from-white via-slate-200 to-teal-300 bg-clip-text text-transparent">
                INTELLIGENTLY
              </span>{" "}
              MANAGED.
            </h1>

            {/* Subheading */}
            <p className="max-w-2xl text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed">
              HIDRIQ turns weather, environmental and infrastructure data into better water decisions — 
              helping landscapes and eventually farms use only what they need.
            </p>

            {/* Core Position & Tagline */}
            <p className="text-xs uppercase tracking-[0.22em] text-teal-400/90 font-semibold">
              The intelligence layer for water · Predict. Optimize. Automate.
            </p>

            {/* Dual CTAs: B2C (Home) and B2B (Business) */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              {/* B2C Home CTA */}
              <button
                onClick={() => onOpenLeadModal("b2c")}
                className="group flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-slate-950 font-bold text-sm tracking-wide shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40 hover:scale-[1.02] transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Check My Garden (Free)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* B2B Business CTA */}
              <button
                onClick={() => onOpenLeadModal("b2b")}
                className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] text-white font-medium text-sm tracking-wide backdrop-blur-md hover:border-white/30 transition-all cursor-pointer"
              >
                <Building2 className="w-4 h-4 text-slate-300" />
                <span>Optimize Your Property</span>
              </button>

              {/* V4 Property Dashboard Link */}
              <Link
                href="/dashboard"
                className="flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-teal-950/40 hover:bg-teal-900/60 border border-teal-500/30 hover:border-teal-500/50 text-teal-300 font-medium text-sm tracking-wide backdrop-blur-md transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-teal-400" />
                <span>Property Dashboard</span>
              </Link>
            </div>

            {/* Hardware-Neutral & Stage Notice */}
            <div className="flex items-center gap-6 pt-2 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Hardware Optional
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                Vendor-Neutral Architecture
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Agriculture: Stage 3
              </span>
            </div>
          </div>

          {/* Right Column: Interactive Real-Time Intelligence Telemetry Card */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-2xl p-6 glass-panel teal-glow border border-white/[0.12] space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-semibold tracking-wider uppercase text-slate-200">
                    Live Microclimate Telemetry
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-teal-950/60 border border-teal-500/30 text-teal-300">
                  Model: ASCE FAO-56
                </span>
              </div>

              {/* Data Ingestion Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-left">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                    <Sun className="w-3.5 h-3.5 text-amber-400" />
                    <span>Solar ET₀</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">4.8 <span className="text-[10px] text-slate-400">mm/d</span></div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-left">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                    <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Rain (48h)</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">0.0 <span className="text-[10px] text-slate-400">mm</span></div>
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-left">
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mb-1">
                    <Wind className="w-3.5 h-3.5 text-blue-400" />
                    <span>VPD Index</span>
                  </div>
                  <div className="text-base font-bold text-white font-mono">1.9 <span className="text-[10px] text-slate-400">kPa</span></div>
                </div>
              </div>

              {/* Processing Stream Visualization */}
              <div className="p-4 rounded-xl bg-[#090e15]/90 border border-teal-500/20 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-mono">INPUTS</span>
                  <span className="text-teal-400 font-mono text-[11px]">Weather + Satellite + Soil</span>
                </div>

                <div className="flex items-center justify-center py-1">
                  <div className="h-4 w-px bg-gradient-to-b from-teal-400 to-cyan-400" />
                </div>

                <div className="p-3 rounded-lg bg-teal-950/40 border border-teal-500/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-teal-400" />
                    <span className="text-xs font-semibold text-white">HIDRIQ Engine</span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono font-medium">Optimization Active</span>
                </div>

                <div className="flex items-center justify-center py-1">
                  <div className="h-4 w-px bg-gradient-to-b from-teal-400 to-cyan-400" />
                </div>

                {/* Output Card */}
                <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.1] text-left space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
                      Recommendation Generated
                    </span>
                    <span className="text-[10px] text-teal-300 font-mono">Zone 04 · Turf Lawn</span>
                  </div>
                  <div className="text-xs text-slate-200">
                    <span className="font-semibold text-white">Water Window:</span> 05:15 – 05:33 (18 min)
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Cycle-and-soak applied · Zero surface runoff predicted
                  </div>
                </div>
              </div>

              {/* Real World Validation Note */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                <span>Commercial Beachhead: Luxury Hospitality</span>
                <Link
                  href="/dashboard"
                  className="text-teal-400 hover:text-teal-300 font-mono transition-colors"
                >
                  Explore Digital Twin →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
