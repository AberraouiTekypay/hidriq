"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Home, Camera, Compass, Sun, ArrowRight, Info } from "lucide-react";

interface B2CSectionProps {
  onOpenLeadModal: (tab?: "b2c" | "b2b") => void;
}

export const B2CSection: React.FC<B2CSectionProps> = ({ onOpenLeadModal }) => {
  const [selectedDay, setSelectedDay] = useState<string>("Tuesday");

  const weeklySchedule = [
    { day: "Monday", status: "SKIP", reason: "8 mm rainfall anticipated; soil reservoir moisture optimal.", duration: "0 min", isWater: false },
    { day: "Tuesday", status: "WATER", reason: "Sun exposure high; target lawn & Mediterranean citrus perimeter.", duration: "35 min", isWater: true, window: "05:30 – 07:00" },
    { day: "Wednesday", status: "SKIP", reason: "Soil reservoir moisture holding within root-zone target.", duration: "0 min", isWater: false },
    { day: "Thursday", status: "WATER", reason: "Compensate for dry wind & rising VPD; floral beds & shrubs.", duration: "25 min", isWater: true, window: "06:00 – 06:45" },
    { day: "Friday", status: "SKIP", reason: "Deep soak retention active; no transpirational stress.", duration: "0 min", isWater: false },
    { day: "Saturday", status: "SKIP", reason: "Evaluate upcoming Sunday marine layer forecast.", duration: "0 min", isWater: false },
    { day: "Sunday", status: "WATER", reason: "Early morning lawn refresh prior to peak midday heat.", duration: "20 min", isWater: true, window: "05:45 – 06:15" },
  ];

  return (
    <section id="home" className="relative py-24 sm:py-32 bg-[#07090d] border-t border-white/[0.06] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Home className="w-3.5 h-3.5" />
            HIDRIQ HOME · CORE B2C PRODUCT
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            YOUR HOME SHOULD KNOW <br className="hidden sm:inline" />
            WHEN IT NEEDS WATER.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Over 80% of gardens do not have automated smart controllers. HIDRIQ works for anyone with a garden, a hose, or a tap — no hardware required.
          </p>
          <div className="mt-4 text-xs uppercase tracking-[0.2em] text-teal-400 font-semibold">
            “Your garden doesn’t need to be smart for HIDRIQ to make it smarter.”
          </div>
        </div>

        {/* The Manual Garden Concept & Digital Twin */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Visual Showcase (5 Cols) */}
          <div className="lg:col-span-5 relative rounded-2xl overflow-hidden h-[420px] border border-white/[0.1] shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80"
              alt="Contemporary luxury villa with pool and manicured garden"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover filter brightness-[0.85]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#07090d] via-transparent to-black/30" />

            {/* Overlay Badge */}
            <div className="absolute top-4 left-4 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-left">
              <span className="text-[10px] font-mono uppercase text-teal-400 font-bold block">
                Garden Digital Twin
              </span>
              <span className="text-xs text-white font-medium">
                Costa del Sol, Spain · Villa Assessment
              </span>
            </div>

            {/* Detected Elements Tag Cloud */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-left">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 mb-2">
                Classified Micro-Zones via Photos:
              </div>
              <div className="flex flex-wrap gap-1.5 text-[11px] font-mono">
                <span className="px-2 py-0.5 rounded bg-teal-950/80 border border-teal-500/30 text-teal-300">Bermuda Turf (180 m²)</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.06] text-slate-300">Olive & Citrus (8 trees)</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.06] text-slate-300">Bougainvillea Hedge</span>
                <span className="px-2 py-0.5 rounded bg-white/[0.06] text-slate-300">Full Sun Exposure (South)</span>
              </div>
            </div>
          </div>

          {/* Explanation & Science Truth (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
              Manual Garden Mode: Turn photos into a personalized watering plan.
            </h3>

            <p className="text-sm text-slate-300 leading-relaxed">
              Homeowners take 3 to 10 photos of their garden from different angles. HIDRIQ’s vision pipeline constructs a <strong>Garden Digital Twin</strong>, identifying plant varieties, lawn boundaries, tree canopies, sun/shade exposure, and slope orientation.
            </p>

            {/* Critical Truth Callout */}
            <div className="p-4 rounded-xl bg-teal-950/30 border border-teal-500/30 flex items-start gap-3">
              <Info className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-300 leading-relaxed">
                <strong className="text-white block mb-0.5">Important Physical Truth:</strong>
                Photographs alone do <em>not</em> measure subsurface soil moisture. Photographs classify vegetation taxonomy, canopy density, and exposure. HIDRIQ then pairs this visual twin with real-time numerical weather models, solar radiation (ET₀), and soil hydrology to calculate your water schedule.
              </div>
            </div>

            {/* 3-Step Simple User Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <Camera className="w-4 h-4 text-teal-400 mb-1.5" />
                <div className="text-xs font-bold text-white">1. Snap Photos</div>
                <div className="text-[11px] text-slate-400 mt-1">Upload 3–10 garden photos and location.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <Compass className="w-4 h-4 text-cyan-400 mb-1.5" />
                <div className="text-xs font-bold text-white">2. Twin Created</div>
                <div className="text-[11px] text-slate-400 mt-1">AI models zones, plants, and exposure.</div>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <Sun className="w-4 h-4 text-emerald-400 mb-1.5" />
                <div className="text-xs font-bold text-white">3. Weekly Plan</div>
                <div className="text-[11px] text-slate-400 mt-1">Receive precise when/how-long guidance.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Illustrative Consumer UI: YOUR GARDEN THIS WEEK */}
        <div className="p-6 sm:p-8 rounded-2xl glass-panel border border-white/[0.1] text-left space-y-6 teal-glow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse" />
                <h3 className="text-lg font-bold text-white">
                  YOUR GARDEN THIS WEEK
                </h3>
              </div>
              <span className="text-xs text-slate-400">
                Sample Property: Villa Oasis · Marbella, Costa del Sol
              </span>
            </div>

            {/* Atmospheric Summary Metric */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <span className="text-slate-400">Rainfall:</span> <span className="text-cyan-300 font-bold">8 mm</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                <span className="text-slate-400">Demand:</span> <span className="text-amber-300 font-bold">14 mm</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-teal-950/60 border border-teal-500/40">
                <span className="text-teal-300">Net Irrigation:</span> <span className="text-white font-bold">6 mm</span>
              </div>
            </div>
          </div>

          {/* Interactive Day Cards Carousel / Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {weeklySchedule.map((item) => {
              const isSelected = selectedDay === item.day;
              return (
                <button
                  key={item.day}
                  onClick={() => setSelectedDay(item.day)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-teal-950/50 border-teal-400 shadow-md shadow-teal-500/10"
                      : "bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]"
                  }`}
                >
                  <div className="text-xs font-mono font-bold text-slate-300 mb-2">
                    {item.day.slice(0, 3).toUpperCase()}
                  </div>

                  <div>
                    <span
                      className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded uppercase block w-fit mb-2 ${
                        item.isWater
                          ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {item.status}
                    </span>
                    <div className="text-sm font-extrabold text-white">
                      {item.duration}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Day Expanded Explanation */}
          {weeklySchedule.find((d) => d.day === selectedDay) && (
            <div className="p-4 rounded-xl bg-black/40 border border-teal-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono font-bold text-teal-300 uppercase mb-1">
                  {selectedDay} Action Breakdown
                </div>
                <div className="text-xs text-slate-200">
                  {weeklySchedule.find((d) => d.day === selectedDay)?.reason}
                </div>
                {weeklySchedule.find((d) => d.day === selectedDay)?.window && (
                  <div className="text-[11px] text-teal-400 font-mono mt-1">
                    Optimal Window: {weeklySchedule.find((d) => d.day === selectedDay)?.window} (Lowest evaporative loss)
                  </div>
                )}
              </div>

              <div className="text-[10px] text-slate-400 font-mono uppercase bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.08] shrink-0">
                Illustrative UI Example
              </div>
            </div>
          )}

          {/* CTA Box */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-300">
              Start with a free assessment of your garden. No credit card, no hardware purchase required.
            </div>

            <button
              onClick={() => onOpenLeadModal("b2c")}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md hover:shadow-teal-500/30 shrink-0"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Check My Garden (Free)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
