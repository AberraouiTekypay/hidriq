"use client";

import React from "react";
import Image from "next/image";
import { Building2, CheckCircle2, ShieldCheck, ArrowUpRight, Compass, Activity } from "lucide-react";

interface ZephyrPocSectionProps {
  onOpenLeadModal: (tab?: "b2c" | "b2b") => void;
}

export const ZephyrPocSection: React.FC<ZephyrPocSectionProps> = ({ onOpenLeadModal }) => {
  const trialPhases = [
    {
      phase: "Phase 1: Shadow Mode",
      days: "Days 1–21",
      desc: "Run HIDRIQ in parallel with existing controller clock programs. Audit baseline water delivery against modeled daily evapotranspiration with zero physical intervention.",
      status: "Active Baseline",
    },
    {
      phase: "Phase 2: Recommendation Mode",
      days: "Days 22–42",
      desc: "Deliver optimized zone-by-zone run-sheets to the resort grounds team for review and manual controller adjustment. Monitor plant health and visual vigor.",
      status: "Human-in-the-Loop",
    },
    {
      phase: "Phase 3: Selective Autopilot",
      days: "Days 43–60",
      desc: "Connect supported controller interfaces or dry-contact relay retrofits to execute automated, weather-adaptive watering cycles on designated test zones.",
      status: "Automated Control",
    },
  ];

  return (
    <section id="poc" className="relative py-24 sm:py-32 bg-[#080b10] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Building2 className="w-3.5 h-3.5" />
            Field Validation
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            BUILT IN THE REAL WORLD.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            HIDRIQ&apos;s first commercial design partnership is focused on luxury hospitality in Morocco with <strong className="text-white">Zephyr Hotels</strong>.
          </p>
        </div>

        {/* Case Study Card */}
        <div className="rounded-2xl glass-panel border border-white/[0.1] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            {/* Image Column (5 Cols) */}
            <div className="lg:col-span-5 relative min-h-[360px] lg:min-h-full">
              <Image
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Moroccan resort estate grounds"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover filter brightness-[0.85]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-transparent to-black/30" />

              {/* Status Badge */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-left">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  Design Partner / POC
                </span>
                <span className="text-sm font-bold text-white">
                  Zephyr Hotels · Morocco
                </span>
              </div>

              {/* Scope Metrics */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-left">
                <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2">
                  Trial Scope Parameters:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-white/[0.04] text-slate-300">
                    <span className="text-slate-400 block text-[10px]">Terrain:</span>
                    Resort Turf & Palms
                  </div>
                  <div className="p-2 rounded bg-white/[0.04] text-slate-300">
                    <span className="text-slate-400 block text-[10px]">Trial Duration:</span>
                    60 Days Phased
                  </div>
                </div>
              </div>
            </div>

            {/* Trial Methodology & Phasing Column (7 Cols) */}
            <div className="lg:col-span-7 p-6 sm:p-10 text-left flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4 mb-6">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-teal-400 font-bold">
                      Controlled Agronomic Evaluation
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      Measuring True Water Physics on Moroccan Hotel Grounds
                    </h3>
                  </div>
                  <span className="text-xs font-mono px-2.5 py-1 rounded bg-teal-950/60 border border-teal-500/30 text-teal-300">
                    Active POC
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
                  Morocco’s arid climate presents an urgent hydrological challenge. Through our design partnership with Zephyr Hotels, we map irrigation zones, ingest real-time weather and solar data, model exact botanical transpiration, compare current schedules, and validate recommendations against actual sub-meter consumption.
                </p>

                {/* 3-Phase Progression */}
                <div className="space-y-3">
                  {trialPhases.map((phase) => (
                    <div
                      key={phase.phase}
                      className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-mono">
                          {phase.phase}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950/40 text-teal-300 border border-teal-500/20">
                          {phase.days}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Empirical Integrity Note */}
              <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-200">Disciplined Integrity:</strong> Actual percentage savings and volumetric efficiencies will be published upon verified completion of the controlled POC.
                </div>

                <button
                  onClick={() => onOpenLeadModal("b2b")}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0"
                >
                  <span>Become a Design Partner</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
