"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Plus,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Home,
  ArrowLeft,
} from "lucide-react";
import { Property } from "@/lib/propertyStore";

interface PropertyHeaderProps {
  properties: Property[];
  activeProperty: Property;
  onSelectProperty: (id: string) => void;
  onOpenAddModal: () => void;
}

export const PropertyHeader: React.FC<PropertyHeaderProps> = ({
  properties,
  activeProperty,
  onSelectProperty,
  onOpenAddModal,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getStatusBadge = (state: Property["overallState"], attentionCount: number) => {
    switch (state) {
      case "ALL_GOOD":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-bold uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            All Good · 0 Attention
          </span>
        );
      case "ATTENTION_REQUIRED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/40 text-amber-300 text-xs font-mono font-bold uppercase tracking-wider">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            {attentionCount} Areas Need Attention
          </span>
        );
      case "ACTION_REQUIRED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 text-xs font-mono font-bold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-rose-400" />
            Action Required
          </span>
        );
      case "ANOMALY_DETECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/40 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-purple-400" />
            Anomaly Flagged
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <header className="border-b border-white/[0.08] bg-[#07090d]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left: Brand + Multi-Property Switcher */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors group mr-2"
              title="Return to Public Website"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
              <span className="hidden sm:inline font-mono">hidriq.com</span>
            </Link>

            <div className="relative">
              {/* Property Selector Trigger */}
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] transition-all cursor-pointer text-left"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/40 flex items-center justify-center shrink-0">
                  <Home className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-white tracking-tight">
                      {activeProperty.name}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                        dropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block truncate max-w-[200px] sm:max-w-[280px]">
                    {activeProperty.address}
                  </span>
                </div>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-[#0c1017] border border-white/[0.15] shadow-2xl p-2 z-50 space-y-1">
                    <div className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest text-slate-400 border-b border-white/[0.06]">
                      Your Registered Properties ({properties.length})
                    </div>

                    <div className="max-h-60 overflow-y-auto space-y-1 py-1">
                      {properties.map((p) => {
                        const isCurrent = p.id === activeProperty.id;
                        return (
                          <button
                            key={p.id}
                            onClick={() => {
                              onSelectProperty(p.id);
                              setDropdownOpen(false);
                            }}
                            className={`w-full text-left p-2.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between ${
                              isCurrent
                                ? "bg-teal-950/60 border border-teal-500/40"
                                : "hover:bg-white/[0.05]"
                            }`}
                          >
                            <div>
                              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                                <span>{p.name}</span>
                                {isCurrent && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
                                )}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate max-w-[190px]">
                                {p.address}
                              </div>
                            </div>
                            <div className="text-right shrink-0">
                              <span
                                className={`text-[10px] font-mono font-bold block ${
                                  p.overallState === "ALL_GOOD"
                                    ? "text-emerald-400"
                                    : "text-amber-400"
                                }`}
                              >
                                {p.healthyPercentage}% Healthy
                              </span>
                              <span className="text-[9px] text-slate-500 block">
                                {p.waterAttentionZones === 0
                                  ? "0 attention"
                                  : `${p.waterAttentionZones} need water`}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-white/[0.06]">
                      <button
                        type="button"
                        onClick={() => {
                          setDropdownOpen(false);
                          onOpenAddModal();
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-teal-500/30"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Property Asset</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Current Operational State Badge */}
            <div className="hidden lg:block">
              {getStatusBadge(activeProperty.overallState, activeProperty.waterAttentionZones)}
            </div>
          </div>

          {/* Right: Telemetry Chips & Action Prompt */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3 text-xs font-mono">
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-400">Elevation:</span>{" "}
                <span className="text-white font-bold">{activeProperty.elevation}</span>
              </div>
              <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08]">
                <span className="text-slate-400">Solar ET₀:</span>{" "}
                <span className="text-amber-300 font-bold">{activeProperty.referenceET0}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onOpenAddModal}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-teal-500/20 shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Property</span>
            </button>
          </div>
        </div>

        {/* Action Attention Banner if action needed */}
        {activeProperty.nextAction && (
          <div className="mt-3 py-2 px-3 rounded-xl bg-teal-950/30 border border-teal-500/30 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-teal-400 shrink-0" />
              <span>
                <strong className="text-white">Next Action:</strong> {activeProperty.nextAction}
              </span>
            </div>
            <span className="text-[10px] font-mono text-teal-300 hidden sm:inline">
              Autopilot Advisory · ASCE FAO-56
            </span>
          </div>
        )}
      </div>
    </header>
  );
};
