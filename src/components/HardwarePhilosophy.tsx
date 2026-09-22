"use client";

import React from "react";
import { Cpu, Plus, Layers, Shield, Wrench, ArrowRight } from "lucide-react";

interface HardwarePhilosophyProps {
  onOpenLeadModal: (tab?: "b2c" | "b2b") => void;
}

export const HardwarePhilosophy: React.FC<HardwarePhilosophyProps> = ({ onOpenLeadModal }) => {
  return (
    <section className="relative py-24 sm:py-32 bg-[#07090d] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-950/50 border border-teal-500/30 text-teal-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Wrench className="w-3.5 h-3.5" />
            Hardware Philosophy
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            YOUR INFRASTRUCTURE. <br />
            OUR INTELLIGENCE.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            The objective is not to replace millions in installed valves, solenoid wiring, and pump stations. 
            The objective is to make what already exists vastly smarter.
          </p>
        </div>

        {/* Conceptual Equation Component */}
        <div className="p-8 sm:p-12 rounded-2xl glass-panel border border-teal-500/20 text-center mb-16 teal-glow">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
            {/* Box 1: Existing Controller */}
            <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08] text-left">
              <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
                Asset 01
              </span>
              <h4 className="text-base font-bold text-white mb-1">Existing Controller</h4>
              <p className="text-xs text-slate-400">
                Hunter, Rain Bird, Toro, Galcon, Weathermatic, or standard manual valves.
              </p>
            </div>

            {/* Plus Symbol */}
            <div className="flex justify-center text-teal-400">
              <Plus className="w-8 h-8" />
            </div>

            {/* Box 2: HIDRIQ Software */}
            <div className="p-6 rounded-xl bg-teal-950/50 border border-teal-500/40 text-left">
              <span className="text-[10px] font-mono uppercase text-teal-300 block mb-1">
                Asset 02
              </span>
              <h4 className="text-base font-bold text-white mb-1">HIDRIQ Intelligence</h4>
              <p className="text-xs text-slate-300">
                Continuous FAO-56 Penman-Monteith ET₀ calculations, microclimate modeling & run-sheets.
              </p>
            </div>

            {/* Equals Symbol */}
            <div className="flex justify-center text-teal-400 font-mono text-2xl font-bold">
              =
            </div>

            {/* Box 3: Output */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-teal-950/60 to-emerald-950/40 border border-teal-400/50 text-left shadow-lg">
              <span className="text-[10px] font-mono uppercase text-emerald-300 block mb-1">
                Result
              </span>
              <h4 className="text-base font-bold text-white mb-1">Intelligent Irrigation</h4>
              <p className="text-xs text-slate-200">
                Autonomous, weather-aware water optimization with zero rip-and-replace costs.
              </p>
            </div>
          </div>
        </div>

        {/* 3 Strategic Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-teal-950/60 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Designed for Vendor-Neutral Integration</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              We do not claim universal out-of-the-box compatibility with every antique controller, but our architecture is built to ingest data and dispatch programs across heterogeneous multi-vendor fleets.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Sensors as Optional Upgrades</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              In-situ soil probes and dendrometers can be added where higher spatial precision is desired, but they are never a mandatory prerequisite to receive value from day one.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white/[0.02] border border-white/[0.08]">
            <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Shield className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-white mb-2">Non-Invasive Retrofit Bridges</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Where cloud APIs do not exist on legacy 24VAC controllers, low-cost modular dry-contact relay bridges enable remote schedule actuation without disturbing existing wiring harness layouts.
            </p>
          </div>
        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onOpenLeadModal("b2b")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.12] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            <span>Inquire About Your Installed Controllers</span>
            <ArrowRight className="w-3.5 h-3.5 text-teal-400" />
          </button>
        </div>
      </div>
    </section>
  );
};
