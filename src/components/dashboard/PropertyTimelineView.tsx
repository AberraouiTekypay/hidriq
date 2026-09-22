"use client";

import React from "react";
import {
  Clock,
  Droplets,
  CloudRain,
  Camera,
  RotateCcw,
  Sparkles,
  AlertCircle,
} from "lucide-react";
import { Property, PropertyTimelineEvent } from "@/lib/propertyStore";

interface PropertyTimelineViewProps {
  property: Property;
  onAddEvent?: (event: Omit<PropertyTimelineEvent, "id">) => void;
}

export const PropertyTimelineView: React.FC<PropertyTimelineViewProps> = ({
  property,
}) => {
  const getEventIcon = (type: PropertyTimelineEvent["type"]) => {
    switch (type) {
      case "recommendation":
        return <Sparkles className="w-3.5 h-3.5 text-teal-400" />;
      case "irrigation":
        return <Droplets className="w-3.5 h-3.5 text-blue-400" />;
      case "weather":
        return <CloudRain className="w-3.5 h-3.5 text-cyan-400" />;
      case "photo":
        return <Camera className="w-3.5 h-3.5 text-amber-400" />;
      case "anomaly":
        return <AlertCircle className="w-3.5 h-3.5 text-rose-400" />;
      case "correction":
        return <RotateCcw className="w-3.5 h-3.5 text-purple-400" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
        <div>
          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
            Permanent Property Memory & Timeline
          </h3>
          <p className="text-xs text-slate-400">
            Chronological audit trail of weather reconciliations, irrigation events, model calibrations, and user ground-truth.
          </p>
        </div>

        <span className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-slate-300">
          {property.timeline.length} Recorded Events
        </span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-white/[0.08]">
        {property.timeline.map((event) => (
          <div key={event.id} className="relative group">
            {/* Timeline Node Icon */}
            <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-[#0c1017] border border-white/[0.2] flex items-center justify-center">
              {getEventIcon(event.type)}
            </div>

            {/* Event Card */}
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-white/[0.15] transition-all text-left">
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-white tracking-tight">
                    {event.title}
                  </span>
                  {event.badge && (
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.2 rounded bg-teal-950/60 border border-teal-500/30 text-teal-300">
                      {event.badge}
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-mono text-slate-400 shrink-0">
                  {event.date} · {event.time}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {event.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
