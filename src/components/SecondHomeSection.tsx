"use client";

import React from "react";
import Image from "next/image";
import { CloudRain, Bell, ArrowRight, PlaneTakeoff } from "lucide-react";

interface SecondHomeProps {
  onOpenLeadModal: (tab?: "b2c" | "b2b") => void;
}

export const SecondHomeSection: React.FC<SecondHomeProps> = ({ onOpenLeadModal }) => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#080b10] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 text-xs font-semibold tracking-wider uppercase">
              <PlaneTakeoff className="w-3.5 h-3.5" />
              Second-Home & Villa Intelligence
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              EMPTY HOUSE. <br />
              <span className="text-teal-400">INTELLIGENT</span> GARDEN.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              Your property may sit unoccupied for weeks or months in the Mediterranean sun. Your irrigation shouldn&apos;t have to run blindly.
            </p>

            <blockquote className="border-l-2 border-teal-400 pl-4 py-1 text-sm font-medium italic text-slate-200">
              “Your property is empty. HIDRIQ watches the water.”
            </blockquote>

            <p className="text-sm text-slate-300 leading-relaxed">
              Whether your villa is located in Marbella, Mallorca, Marrakech, the Algarve, or Tuscany, traditional systems either run static timers during heavy winter rains—wasting thousands of liters—or under-water during sudden heatwaves, leading to scorched lawns and dead specimens before you return.
            </p>

            {/* Value Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <CloudRain className="w-4 h-4 text-cyan-400 mb-2" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Weather-Aware Pauses
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Automatically skips or trims scheduled watering when Mediterranean storms deposit sufficient soil moisture.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                <Bell className="w-4 h-4 text-amber-400 mb-2" />
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                  Abnormal Leak Alerts
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Flags unexpected continuous flow or meter spikes, alerting you or your estate caretaker before astronomical bills arrive.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenLeadModal("b2c")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] text-white font-medium text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                <span>Protect Your Second Home</span>
                <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
              </button>
            </div>
          </div>

          {/* Right Image / Telemetry Card (5 Cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden h-[440px] border border-white/[0.1] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury Mediterranean villa with sunlit pool and garden"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover filter brightness-[0.8]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-black/30 to-transparent" />

              {/* Status Overlay */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-white/10 text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-bold text-white font-mono">ESTATE STATUS: SECURE</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">Marbella, Spain</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white/[0.04] border border-white/[0.06] space-y-1 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Recent Rain:</span>
                    <span className="font-mono text-cyan-300">12 mm (Yesterday)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Scheduled Irrigation:</span>
                    <span className="font-mono text-amber-300 font-bold">PAUSED (48 Hours)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span>Flow Baseline:</span>
                    <span className="font-mono text-emerald-300">0.0 L/min (No Leaks)</span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-400 font-mono text-center">
                  Remote oversight active · 0 physical intervention needed
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
