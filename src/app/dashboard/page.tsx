"use client";

import React, { useState } from "react";
import { PropertyHeader } from "@/components/dashboard/PropertyHeader";
import { DigitalTwinCanvas } from "@/components/dashboard/DigitalTwinCanvas";
import { ZoneDetailPanel } from "@/components/dashboard/ZoneDetailPanel";
import { WhatNeedsAttention } from "@/components/dashboard/WhatNeedsAttention";
import { PropertyTimelineView } from "@/components/dashboard/PropertyTimelineView";
import { VisualChangeDetection } from "@/components/dashboard/VisualChangeDetection";
import { AddPropertyModal } from "@/components/dashboard/AddPropertyModal";
import {
  Property,
  PropertyZone,
  INITIAL_PROPERTIES,
  loadPropertiesFromStorage,
  getActivePropertyId,
  setActivePropertyId,
} from "@/lib/propertyStore";
import {
  Layers,
  AlertTriangle,
  Clock,
  Eye,
} from "lucide-react";

type DashboardTab = "digital_twin" | "attention" | "timeline" | "change_detection";

export default function DashboardPage() {
  const [properties, setProperties] = useState<Property[]>(() => {
    if (typeof window !== "undefined") {
      return loadPropertiesFromStorage();
    }
    return INITIAL_PROPERTIES;
  });
  const [activePropertyId, setActiveIdState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      const stored = loadPropertiesFromStorage();
      return getActivePropertyId(stored);
    }
    return INITIAL_PROPERTIES[0].id;
  });
  const [activeTab, setActiveTab] = useState<DashboardTab>("digital_twin");
  const [selectedZone, setSelectedZone] = useState<PropertyZone | null>(null);
  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);

  const activeProperty =
    properties.find((p) => p.id === activePropertyId) || properties[0] || INITIAL_PROPERTIES[0];

  const handleSelectProperty = (id: string) => {
    setActiveIdState(id);
    setActivePropertyId(id);
    setSelectedZone(null);
  };

  const handlePropertyAdded = (newProp: Property) => {
    const updated = loadPropertiesFromStorage();
    setProperties(updated);
    setActiveIdState(newProp.id);
    setActivePropertyId(newProp.id);
  };

  const handleCorrectionSaved = () => {
    const updated = loadPropertiesFromStorage();
    setProperties(updated);
    if (selectedZone) {
      const refreshedProp = updated.find((p) => p.id === activeProperty.id);
      if (refreshedProp) {
        const refreshedZone = refreshedProp.zones.find((z) => z.id === selectedZone.id);
        if (refreshedZone) setSelectedZone(refreshedZone);
      }
    }
  };

  const attentionCount = activeProperty.zones.filter(
    (z) => z.waterStatus === "NEEDS_WATER" || z.waterStatus === "ATTENTION"
  ).length;

  return (
    <div className="min-h-screen bg-[#07090d] text-slate-100 selection:bg-teal-500/20 selection:text-teal-300">
      {/* 1. Master Sticky Header with Multi-Property Switcher */}
      <PropertyHeader
        properties={properties}
        activeProperty={activeProperty}
        onSelectProperty={handleSelectProperty}
        onOpenAddModal={() => setAddModalOpen(true)}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.08] pb-3">
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08] overflow-x-auto max-w-full">
            <button
              type="button"
              onClick={() => setActiveTab("digital_twin")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "digital_twin"
                  ? "bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Digital Twin Map</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("attention")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap relative ${
                activeTab === "attention"
                  ? "bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>What Needs Attention?</span>
              {attentionCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold flex items-center justify-center ml-0.5">
                  {attentionCount}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("timeline")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "timeline"
                  ? "bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Property Memory ({activeProperty.timeline.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("change_detection")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeTab === "change_detection"
                  ? "bg-teal-500 text-slate-950 font-bold shadow-md shadow-teal-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visual Change Detection</span>
              {activeProperty.changeDetections.length > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
              )}
            </button>
          </div>

          {/* Quick Property Health Summary Chip (Section 9) */}
          <div className="hidden lg:flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">
              Health: <strong className="text-emerald-400">{activeProperty.healthyPercentage}%</strong>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">
              Zones: <strong className="text-white">{activeProperty.zones.length}</strong>
            </span>
            <span className="text-slate-600">·</span>
            <span className="text-slate-400">
              Climate: <strong className="text-cyan-300">{activeProperty.climateZone}</strong>
            </span>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "digital_twin" && (
          <DigitalTwinCanvas
            property={activeProperty}
            selectedZoneId={selectedZone?.id || null}
            onSelectZone={(z) => setSelectedZone(z)}
          />
        )}

        {activeTab === "attention" && (
          <WhatNeedsAttention
            property={activeProperty}
            onSelectZone={(z) => setSelectedZone(z)}
          />
        )}

        {activeTab === "timeline" && (
          <PropertyTimelineView property={activeProperty} />
        )}

        {activeTab === "change_detection" && (
          <VisualChangeDetection
            changeDetections={activeProperty.changeDetections}
          />
        )}
      </main>

      {/* Zone Detail & Investigation Panel */}
      <ZoneDetailPanel
        zone={selectedZone}
        propertyId={activeProperty.id}
        onClose={() => setSelectedZone(null)}
        onCorrectionSaved={handleCorrectionSaved}
      />

      {/* Add New Property Asset Modal */}
      <AddPropertyModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onPropertyAdded={handlePropertyAdded}
      />
    </div>
  );
}
