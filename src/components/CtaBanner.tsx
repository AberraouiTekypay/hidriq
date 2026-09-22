"use client";

import React from "react";
import { Sparkles, Building2, ArrowRight } from "lucide-react";

interface CtaBannerProps {
  onOpenLeadModal: (tab?: "b2c" | "b2b") => void;
}

export const CtaBanner: React.FC<CtaBannerProps> = ({ onOpenLeadModal }) => {
  return (
    <section className="relative py-24 sm:py-32 bg-gradient-to-b from-[#07090d] via-[#0b1017] to-[#05070a] border-t border-white/[0.08] overflow-hidden text-center">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.1] text-teal-400 text-xs font-semibold tracking-widest uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          The Intelligence Layer for Water
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-4xl mx-auto">
          Discover how much water your property could be managing differently.
        </h2>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
          Whether you manage a five-star resort in Morocco or a private villa garden in Spain, HIDRIQ brings deterministic water intelligence to your existing infrastructure.
        </p>

        {/* Dual Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenLeadModal("b2c")}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-teal-500/25 transition-all cursor-pointer hover:scale-[1.02]"
          >
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>Check My Garden (Free Assessment)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenLeadModal("b2b")}
            className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.15] text-white font-semibold text-sm tracking-wide backdrop-blur-md hover:border-white/30 transition-all cursor-pointer"
          >
            <Building2 className="w-4 h-4 text-slate-300" />
            <span>Optimize Your Property (Enterprise)</span>
          </button>
        </div>

        <div className="pt-4 text-xs font-mono text-slate-400">
          Hardware Optional · Vendor-Neutral Architecture · Zero Lock-In
        </div>
      </div>
    </section>
  );
};
