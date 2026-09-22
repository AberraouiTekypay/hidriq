"use client";

import React, { useState } from "react";
import {
  Flame,
  Droplets,
  Sprout,
  Activity,
  Compass,
} from "lucide-react";
import { Property, PropertyZone } from "@/lib/propertyStore";

export type OverlayMode = "water" | "vegetation" | "irrigation" | "heatmap";

interface DigitalTwinCanvasProps {
  property: Property;
  selectedZoneId: string | null;
  onSelectZone: (zone: PropertyZone) => void;
}

export const DigitalTwinCanvas: React.FC<DigitalTwinCanvasProps> = ({
  property,
  selectedZoneId,
  onSelectZone,
}) => {
  const [overlayMode, setOverlayMode] = useState<OverlayMode>("water");
  const [hoveredZoneId, setHoveredZoneId] = useState<string | null>(null);

  // Helper to get fill and stroke based on overlay mode
  const getZoneStyles = (zone: PropertyZone) => {
    if (overlayMode === "heatmap") {
      switch (zone.heatmapLevel) {
        case "green":
          return {
            fill: "rgba(16, 185, 129, 0.45)",
            stroke: "#10b981",
            text: "#34d399",
            badge: "TARGET RANGE",
          };
        case "yellow":
          return {
            fill: "rgba(234, 179, 8, 0.45)",
            stroke: "#eab308",
            text: "#facc15",
            badge: "APPROACHING DEFICIT",
          };
        case "orange":
          return {
            fill: "rgba(249, 115, 22, 0.50)",
            stroke: "#f97316",
            text: "#fb923c",
            badge: "ATTENTION REQUIRED",
          };
        case "red":
          return {
            fill: "rgba(239, 68, 68, 0.55)",
            stroke: "#ef4444",
            text: "#f87171",
            badge: "WATER DEFICIT",
          };
        case "blue":
          return {
            fill: "rgba(14, 165, 233, 0.50)",
            stroke: "#0ea5e9",
            text: "#38bdf8",
            badge: "HIGH AVAILABILITY",
          };
        default:
          return {
            fill: "rgba(71, 85, 105, 0.35)",
            stroke: "#64748b",
            text: "#94a3b8",
            badge: "NORMAL",
          };
      }
    }

    if (overlayMode === "vegetation") {
      switch (zone.vegetationStatus) {
        case "HEALTHY":
          return {
            fill: "rgba(16, 185, 129, 0.4)",
            stroke: "#10b981",
            text: "#34d399",
            badge: "HEALTHY",
          };
        case "WATCH":
          return {
            fill: "rgba(245, 158, 11, 0.45)",
            stroke: "#f59e0b",
            text: "#fbbf24",
            badge: "WATCH",
          };
        case "STRESSED":
          return {
            fill: "rgba(239, 68, 68, 0.5)",
            stroke: "#ef4444",
            text: "#f87171",
            badge: "STRESSED",
          };
        case "ANOMALY":
          return {
            fill: "rgba(168, 85, 247, 0.5)",
            stroke: "#a855f7",
            text: "#c084fc",
            badge: "ANOMALY",
          };
        default:
          return { fill: "rgba(100, 116, 139, 0.3)", stroke: "#64748b", text: "#94a3b8", badge: "NORMAL" };
      }
    }

    if (overlayMode === "irrigation") {
      switch (zone.irrigationStatus) {
        case "NORMAL":
          return { fill: "rgba(20, 184, 166, 0.4)", stroke: "#14b8a6", text: "#2dd4bf", badge: "NORMAL" };
        case "RECENTLY_IRRIGATED":
          return { fill: "rgba(59, 130, 246, 0.5)", stroke: "#3b82f6", text: "#60a5fa", badge: "IRRIGATED" };
        case "NOT_IRRIGATED":
          return { fill: "rgba(148, 163, 184, 0.35)", stroke: "#94a3b8", text: "#cbd5e1", badge: "INACTIVE" };
        case "POSSIBLE_ISSUE":
          return { fill: "rgba(239, 68, 68, 0.55)", stroke: "#ef4444", text: "#f87171", badge: "CHECK VALVE" };
        default:
          return { fill: "rgba(100, 116, 139, 0.3)", stroke: "#64748b", text: "#94a3b8", badge: "NORMAL" };
      }
    }

    // Default: Water Status
    switch (zone.waterStatus) {
      case "GOOD":
        return {
          fill: "rgba(16, 185, 129, 0.4)",
          stroke: "#10b981",
          text: "#34d399",
          badge: "● GOOD",
        };
      case "ATTENTION":
        return {
          fill: "rgba(245, 158, 11, 0.45)",
          stroke: "#f59e0b",
          text: "#fbbf24",
          badge: "● ATTENTION",
        };
      case "NEEDS_WATER":
        return {
          fill: "rgba(239, 68, 68, 0.55)",
          stroke: "#ef4444",
          text: "#f87171",
          badge: "● NEEDS WATER",
        };
      case "OVERWATERED":
        return {
          fill: "rgba(14, 165, 233, 0.5)",
          stroke: "#0ea5e9",
          text: "#38bdf8",
          badge: "● EXCESS MOISTURE",
        };
      default:
        return {
          fill: "rgba(100, 116, 139, 0.3)",
          stroke: "#64748b",
          text: "#94a3b8",
          badge: "● UNKNOWN",
        };
    }
  };

  return (
    <div className="space-y-4 text-left">
      {/* Visual Overlay Mode Controls Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/[0.02] border border-white/[0.08] p-3 rounded-2xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
          <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
            Digital Twin Spatial Canvas
          </span>
          <span className="text-[11px] text-slate-400 hidden md:inline">
            · Tap any zone to inspect
          </span>
        </div>

        {/* 4 Overlay Switches */}
        <div className="grid grid-cols-2 sm:flex items-center gap-1.5 p-1 rounded-xl bg-black/50 border border-white/[0.08]">
          <button
            type="button"
            onClick={() => setOverlayMode("water")}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              overlayMode === "water"
                ? "bg-teal-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Droplets className="w-3.5 h-3.5" />
            <span>Water Status</span>
          </button>

          <button
            type="button"
            onClick={() => setOverlayMode("vegetation")}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              overlayMode === "vegetation"
                ? "bg-emerald-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sprout className="w-3.5 h-3.5" />
            <span>Vegetation</span>
          </button>

          <button
            type="button"
            onClick={() => setOverlayMode("irrigation")}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              overlayMode === "irrigation"
                ? "bg-cyan-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Irrigation</span>
          </button>

          <button
            type="button"
            onClick={() => setOverlayMode("heatmap")}
            className={`flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              overlayMode === "heatmap"
                ? "bg-gradient-to-r from-amber-500 to-rose-500 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Heatmap</span>
          </button>
        </div>
      </div>

      {/* Interactive Visual Canvas Container */}
      <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#0a0e14] shadow-2xl min-h-[460px] sm:min-h-[520px] flex items-center justify-center p-4">
        {/* Background Grid Lines and Architectural Cadastral Envelope */}
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#14b8a6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

        {/* Top-Right HUD Legend */}
        <div className="absolute top-4 right-4 z-20 p-3 rounded-xl bg-black/80 backdrop-blur-md border border-white/[0.1] text-left hidden sm:block max-w-[210px]">
          <div className="text-[10px] font-mono uppercase text-teal-400 font-bold mb-1.5 flex items-center justify-between">
            <span>
              {overlayMode === "water"
                ? "Water Status Legend"
                : overlayMode === "vegetation"
                ? "Vegetation Legend"
                : overlayMode === "irrigation"
                ? "Irrigation Legend"
                : "Heatmap Deficit Scale"}
            </span>
          </div>

          <div className="space-y-1 text-[10px] font-mono">
            {overlayMode === "water" && (
              <>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Target Range (Good)</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Approaching Deficit</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-300">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Needs Water</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Recently Irrigated</span>
                </div>
              </>
            )}

            {overlayMode === "vegetation" && (
              <>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Healthy Turgor</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Watch State</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-300">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Moisture Stressed</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-300">
                  <span className="w-2 h-2 rounded-full bg-purple-400" />
                  <span>Visual Anomaly</span>
                </div>
              </>
            )}

            {overlayMode === "irrigation" && (
              <>
                <div className="flex items-center gap-1.5 text-teal-300">
                  <span className="w-2 h-2 rounded-full bg-teal-400" />
                  <span>Normal Schedule</span>
                </div>
                <div className="flex items-center gap-1.5 text-blue-300">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Recently Executed</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                  <span>Idle / Rest Day</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-300">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>Possible Valve Issue</span>
                </div>
              </>
            )}

            {overlayMode === "heatmap" && (
              <>
                <div className="flex items-center gap-1.5 text-emerald-300">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>0–15% Deficit (Optimal)</span>
                </div>
                <div className="flex items-center gap-1.5 text-amber-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>15–30% Deficit</span>
                </div>
                <div className="flex items-center gap-1.5 text-orange-300">
                  <span className="w-2 h-2 rounded-full bg-orange-400" />
                  <span>30–45% Attention</span>
                </div>
                <div className="flex items-center gap-1.5 text-rose-300">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span>&gt;45% Critical Deficit</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Compass & Solar Orientation HUD */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 p-2.5 rounded-xl bg-black/75 backdrop-blur-md border border-white/[0.08] text-[10px] font-mono text-slate-400">
          <Compass className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{property.solarAzimuth}</span>
        </div>

        {/* Interactive SVG Digital Twin Map */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full max-w-[620px] max-h-[500px] select-none"
        >
          <defs>
            {/* Filter for glowing selected polygon */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Pattern for Main Villa Residence */}
            <pattern id="villaPattern" width="4" height="4" patternUnits="userSpaceOnUse">
              <path d="M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
            </pattern>
          </defs>

          {/* Property Boundary Line */}
          <rect
            x="5"
            y="5"
            width="90"
            height="90"
            rx="4"
            fill="rgba(255, 255, 255, 0.015)"
            stroke="rgba(255, 255, 255, 0.15)"
            strokeWidth="0.5"
            strokeDasharray="1.5 1.5"
          />

          {/* Villa Residence Building Footprint (Hardscape) */}
          <rect
            x="36"
            y="32"
            width="28"
            height="26"
            rx="2"
            fill="#121720"
            stroke="rgba(255, 255, 255, 0.3)"
            strokeWidth="0.8"
          />
          <rect
            x="36"
            y="32"
            width="28"
            height="26"
            rx="2"
            fill="url(#villaPattern)"
          />
          <text
            x="50"
            y="44"
            textAnchor="middle"
            fill="#94a3b8"
            fontSize="2.4"
            fontFamily="monospace"
            fontWeight="bold"
            letterSpacing="0.2"
          >
            MAIN RESIDENCE
          </text>
          <text
            x="50"
            y="48"
            textAnchor="middle"
            fill="#64748b"
            fontSize="1.8"
            fontFamily="monospace"
          >
            Villa Footprint
          </text>

          {/* Swimming Pool Footprint */}
          <rect
            x="49"
            y="64"
            width="14"
            height="8"
            rx="1.5"
            fill="rgba(14, 165, 233, 0.25)"
            stroke="rgba(56, 189, 248, 0.6)"
            strokeWidth="0.6"
          />
          <text
            x="56"
            y="69"
            textAnchor="middle"
            fill="#38bdf8"
            fontSize="1.6"
            fontFamily="monospace"
            fontWeight="bold"
          >
            POOL
          </text>

          {/* Driveway / Access Hardscape */}
          <path
            d="M 5 70 L 32 70 L 32 78 L 5 78 Z"
            fill="#0f141c"
            stroke="rgba(255, 255, 255, 0.12)"
            strokeWidth="0.4"
          />
          <text
            x="18"
            y="75"
            textAnchor="middle"
            fill="#64748b"
            fontSize="1.6"
            fontFamily="monospace"
          >
            DRIVEWAY
          </text>

          {/* Garden Zones Polygons */}
          {property.zones.map((zone) => {
            const isHovered = hoveredZoneId === zone.id;
            const isSelected = selectedZoneId === zone.id;
            const styles = getZoneStyles(zone);

            // Construct points string
            const pointsStr = zone.polygon
              .map((p) => `${p.x},${p.y}`)
              .join(" ");

            return (
              <g
                key={zone.id}
                className="cursor-pointer transition-all duration-200"
                onClick={() => onSelectZone(zone)}
                onMouseEnter={() => setHoveredZoneId(zone.id)}
                onMouseLeave={() => setHoveredZoneId(null)}
              >
                {/* Zone Polygon */}
                <polygon
                  points={pointsStr}
                  fill={styles.fill}
                  stroke={isSelected ? "#38bdf8" : isHovered ? "#ffffff" : styles.stroke}
                  strokeWidth={isSelected ? "1.4" : isHovered ? "1.0" : "0.7"}
                  filter={isSelected ? "url(#glow)" : undefined}
                  className="transition-all duration-200"
                />

                {/* Zone Centered Information Badge */}
                <g transform={`translate(${zone.center.x}, ${zone.center.y})`}>
                  <rect
                    x="-11"
                    y="-4.5"
                    width="22"
                    height="9"
                    rx="1.5"
                    fill="rgba(10, 14, 20, 0.85)"
                    stroke={isSelected ? "#38bdf8" : styles.stroke}
                    strokeWidth={isSelected ? "0.8" : "0.4"}
                  />
                  <text
                    x="0"
                    y="-1.2"
                    textAnchor="middle"
                    fill="#ffffff"
                    fontSize="2.0"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    Z0{zone.number} · {zone.shortName}
                  </text>
                  <text
                    x="0"
                    y="2.6"
                    textAnchor="middle"
                    fill={styles.text}
                    fontSize="1.7"
                    fontWeight="bold"
                    fontFamily="monospace"
                  >
                    {styles.badge}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Visual Zone List Quick Selector (Section 5 requirement) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
        {property.zones.map((zone) => {
          const isSelected = selectedZoneId === zone.id;
          const isGood = zone.waterStatus === "GOOD";
          const needsWater = zone.waterStatus === "NEEDS_WATER";

          return (
            <button
              key={zone.id}
              onClick={() => onSelectZone(zone)}
              className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? "bg-teal-950/70 border-teal-400 shadow-md shadow-teal-500/10"
                  : "bg-white/[0.02] border-white/[0.08] hover:border-white/[0.2]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-300 mb-1">
                  <span>ZONE 0{zone.number}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isGood
                        ? "bg-emerald-400"
                        : needsWater
                        ? "bg-rose-400 animate-pulse"
                        : "bg-amber-400"
                    }`}
                  />
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {zone.shortName}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {zone.vegetation}
                </div>
              </div>

              <div className="mt-2.5 pt-2 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono">
                <span
                  className={
                    isGood
                      ? "text-emerald-400 font-bold"
                      : needsWater
                      ? "text-rose-400 font-bold"
                      : "text-amber-400 font-bold"
                  }
                >
                  {zone.waterStatus.replace("_", " ")}
                </span>
                <span className="text-slate-500">{zone.areaM2} m²</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
