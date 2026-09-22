"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  X,
  Sparkles,
  Building2,
  Home,
  CheckCircle2,
  UploadCloud,
  ShieldCheck,
  LocateFixed,
  MapPin,
  AlertCircle,
  RefreshCw,
  Sun,
  Mountain,
  Droplets,
  Compass,
  Copy,
  Check,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { saveNewProperty } from "@/lib/propertyStore";

interface EnvironmentalProfile {
  elevation: string;
  referenceET0: string;
  solarExposure: string;
  climateClassification: string;
  cadastralGrid: string;
  dataConfidence: string;
}

interface CoordinatesData {
  latitude: number;
  longitude: number;
  accuracy: string;
  formatted: string;
}

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "b2c" | "b2b";
  autoDetectLocation?: boolean;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  defaultTab = "b2c",
  autoDetectLocation = false,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"b2c" | "b2b">(defaultTab);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedSchedule, setCopiedSchedule] = useState<boolean>(false);
  const [syncSubscribed, setSyncSubscribed] = useState<boolean>(false);

  // Sync tab when opening or defaultTab changes via close / reopen
  const [prevDefaultTab, setPrevDefaultTab] = useState(defaultTab);
  if (defaultTab !== prevDefaultTab) {
    setPrevDefaultTab(defaultTab);
    setActiveTab(defaultTab);
    setSubmitted(false);
  }

  // B2C Form State
  const [b2cLocation, setB2cLocation] = useState("");
  const [b2cEmail, setB2cEmail] = useState("");
  const [b2cGardenType, setB2cGardenType] = useState("Lawn & Mediterranean Shrubs");
  const [b2cWaterMethod, setB2cWaterMethod] = useState("Hose / Manual Taps");
  const b2cPhotosSelected = 3;

  // Geolocation states
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [detectedCoords, setDetectedCoords] = useState<CoordinatesData | null>(null);
  const [detectedEnv, setDetectedEnv] = useState<EnvironmentalProfile | null>(null);

  // B2B Form State
  const [b2bName, setB2bName] = useState("");
  const [b2bCompany, setB2bCompany] = useState("");
  const [b2bEmail, setB2bEmail] = useState("");
  const [b2bCategory, setB2bCategory] = useState("Hotel / Resort");
  const [b2bCountry, setB2bCountry] = useState("Morocco");
  const [b2bController, setB2bController] = useState("Rain Bird");
  const [b2bMessage, setB2bMessage] = useState("");

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Automatic Geolocation Handler
  const handleAutoDetectLocation = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser. Please enter your location manually.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const acc = position.coords.accuracy ? Math.round(position.coords.accuracy) : null;

        try {
          const res = await fetch(
            `/api/geocode/reverse?lat=${lat}&lng=${lng}${acc ? `&accuracy=${acc}` : ""}`
          );

          if (res.ok) {
            const data = await res.json();
            const displayName = data.locationName
              ? `${data.locationName} (${data.coordinates.formatted})`
              : data.coordinates.formatted;

            setB2cLocation(displayName);
            setDetectedCoords(data.coordinates);
            setDetectedEnv(data.environmentalParameters);
            setLocationSuccess(true);
            setLocationError(null);
          } else {
            const latDir = lat >= 0 ? "N" : "S";
            const lngDir = lng >= 0 ? "E" : "W";
            const formatted = `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
            setB2cLocation(`Detected GPS: ${formatted}`);
            setDetectedCoords({
              latitude: lat,
              longitude: lng,
              accuracy: acc ? `±${acc}m` : "±15m",
              formatted,
            });
            setLocationSuccess(true);
          }
        } catch {
          const latDir = lat >= 0 ? "N" : "S";
          const lngDir = lng >= 0 ? "E" : "W";
          const formatted = `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
          setB2cLocation(`Detected GPS: ${formatted}`);
          setDetectedCoords({
            latitude: lat,
            longitude: lng,
            accuracy: acc ? `±${acc}m` : "±15m",
            formatted,
          });
          setLocationSuccess(true);
        } finally {
          setIsLocating(false);
        }
      },
      (err) => {
        setIsLocating(false);
        if (err.code === 1) {
          setLocationError("Location permission was declined. Please enter your garden city or address manually.");
        } else if (err.code === 2) {
          setLocationError("GPS position unavailable. Please enter your garden address manually.");
        } else if (err.code === 3) {
          setLocationError("GPS signal timed out. Please enter your location manually or retry.");
        } else {
          setLocationError("Unable to acquire location automatically. Please enter your garden address.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  // Trigger auto-detection on open if requested
  useEffect(() => {
    if (isOpen && autoDetectLocation && activeTab === "b2c" && !b2cLocation) {
      const timer = setTimeout(() => {
        handleAutoDetectLocation();
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoDetectLocation, activeTab, b2cLocation, handleAutoDetectLocation]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload =
      activeTab === "b2c"
        ? {
            type: "B2C_GARDEN_CHECK",
            location: b2cLocation,
            coordinates: detectedCoords || null,
            environmentalParameters: detectedEnv || null,
            isAutoDetected: locationSuccess,
            email: b2cEmail,
            gardenType: b2cGardenType,
            wateringMethod: b2cWaterMethod,
            simulatedPhotos: b2cPhotosSelected,
            timestamp: new Date().toISOString(),
          }
        : {
            type: "B2B_PROPERTY_AUDIT",
            name: b2bName,
            company: b2bCompany,
            email: b2bEmail,
            category: b2bCategory,
            country: b2bCountry,
            currentController: b2bController,
            message: b2bMessage,
            timestamp: new Date().toISOString(),
          };

    // Simulate synthesis calculation delay of 1.2s for high-tech feeling
    await new Promise((r) => setTimeout(r, 1200));

    // Attempt webhook if configured
    try {
      const endpoint = process.env.NEXT_PUBLIC_LEAD_WEBHOOK_URL;
      if (endpoint) {
        await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
    } catch {
      // Graceful fallback
    }

    setLoading(false);
    setSubmitted(true);
  };

  const handleCopySchedule = () => {
    const propertyTitle = b2cLocation || "My Garden";
    const text = `🌿 HIDRIQ Water Intelligence Plan for ${propertyTitle}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Weekly Target: 26 mm (38% volume reduction)
• Optimal Window: 05:30 – 06:15 AM (Pre-dawn to eliminate evaporative loss)
• Weekly Schedule:
   - Monday:    SKIP (Moisture reserve optimal)
   - Tuesday:   WATER 25 min (Cycle & Soak: 2x 12m)
   - Wednesday: SKIP (Deep soak percolation active)
   - Thursday:  SKIP (Transpiration buffer holding)
   - Friday:    WATER 20 min (Target root perimeter)
   - Saturday:  SKIP (Subsurface retention active)
   - Sunday:    SKIP (Atmospheric equilibrium check)
• Technique: Cycle & Soak (2 cycles separated by 15 min rest to prevent surface runoff)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Generated by HIDRIQ — The Intelligence Layer for Water (https://hidriq.com)`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedSchedule(true);
      setTimeout(() => setCopiedSchedule(false), 3000);
    }
  };

  const handleSaveToDashboard = () => {
    const newProp = saveNewProperty(
      b2cLocation ? `${b2cLocation} Garden Villa` : "My Garden Property",
      b2cLocation || "Detected Property Location",
      detectedCoords || undefined,
      detectedEnv?.elevation,
      detectedEnv?.climateClassification,
      b2cGardenType
    );
    handleClose();
    router.push(`/dashboard?id=${newProp.id}`);
  };

  const handleSaveB2bToDashboard = () => {
    const newProp = saveNewProperty(
      b2bCompany ? `${b2bCompany} Property` : `${b2bName}'s Commercial Site`,
      `${b2bCategory} · ${b2bCountry}`,
      undefined,
      "180 m MSL",
      "Semi-Arid Commercial",
      b2bCategory
    );
    handleClose();
    router.push(`/dashboard?id=${newProp.id}`);
  };

  const handleClose = () => {
    setSubmitted(false);
    setCopiedSchedule(false);
    setSyncSubscribed(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div
        className={`relative w-full ${
          submitted && activeTab === "b2c" ? "max-w-2xl" : "max-w-xl"
        } rounded-2xl glass-panel border border-white/[0.15] bg-[#0c1017] p-5 sm:p-7 text-left shadow-2xl teal-glow my-6 max-h-[92vh] overflow-y-auto`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer z-10"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            {/* Modal Heading */}
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 font-bold block mb-1">
                Direct Inquiry & Assessment
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Connect with HIDRIQ
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Select your track below to generate an immediate garden water assessment or request an enterprise property audit.
              </p>
            </div>

            {/* Tab Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08] mb-6">
              <button
                type="button"
                onClick={() => setActiveTab("b2c")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "b2c"
                    ? "bg-teal-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                <span>Home / Garden (Free)</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("b2b")}
                className={`flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === "b2b"
                    ? "bg-teal-500 text-slate-950 shadow-md font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>Enterprise / Property</span>
              </button>
            </div>

            {/* Active Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {activeTab === "b2c" ? (
                /* B2C FORM FIELDS WITH AUTOMATIC GEOLOCATION */
                <>
                  {/* Location & Auto-Geolocation block */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-medium text-slate-300">
                        Garden / Property Location
                      </label>
                      <button
                        type="button"
                        onClick={handleAutoDetectLocation}
                        disabled={isLocating}
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer bg-teal-950/70 hover:bg-teal-900/80 px-2.5 py-1 rounded-lg border border-teal-500/30"
                      >
                        <LocateFixed
                          className={`w-3.5 h-3.5 ${
                            isLocating ? "animate-spin text-teal-300" : "text-teal-400"
                          }`}
                        />
                        <span>
                          {isLocating
                            ? "Acquiring GPS..."
                            : locationSuccess
                            ? "Re-detect GPS"
                            : "Auto-Detect Location"}
                        </span>
                      </button>
                    </div>

                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <MapPin className="w-4 h-4 text-teal-400" />
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marbella, Mallorca, Estepona, Cascais (or click Auto-Detect)"
                        value={b2cLocation}
                        onChange={(e) => {
                          setB2cLocation(e.target.value);
                          if (locationSuccess) setLocationSuccess(false);
                        }}
                        className="w-full pl-9 pr-24 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                      />
                      <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                        {locationSuccess ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-[10px] font-mono text-emerald-300">
                            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                            GPS Verified
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={handleAutoDetectLocation}
                            disabled={isLocating}
                            className="text-[10px] font-mono font-bold text-teal-400 hover:text-teal-300 px-2 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] transition-colors cursor-pointer"
                          >
                            {isLocating ? "Locating..." : "1-Click GPS"}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Scanner radar feedback when acquiring location */}
                    {isLocating && (
                      <div className="p-2.5 rounded-lg bg-teal-950/40 border border-teal-500/30 flex items-center gap-2.5 text-xs text-teal-300">
                        <RefreshCw className="w-4 h-4 animate-spin text-teal-400 shrink-0" />
                        <span className="animate-pulse font-mono text-[11px]">
                          Triangulating GPS fix · Querying microclimate elevation & solar model...
                        </span>
                      </div>
                    )}

                    {/* Geolocation error notification */}
                    {locationError && (
                      <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-start gap-2 text-xs text-amber-200">
                        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                        <div className="text-[11px] leading-relaxed">
                          {locationError}
                        </div>
                      </div>
                    )}

                    {/* Automated Environmental Telemetry Box when Detected */}
                    {locationSuccess && detectedEnv && detectedCoords && (
                      <div className="p-3 rounded-xl bg-teal-950/30 border border-teal-500/30 text-left space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-wider text-teal-300 font-bold">
                              Auto-Derived Environmental Profile
                            </span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">
                            {detectedCoords.formatted} ({detectedCoords.accuracy})
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-[10px] font-mono">
                          <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
                              <Mountain className="w-3 h-3 text-slate-400" />
                              <span>Elevation</span>
                            </div>
                            <span className="text-white font-bold">{detectedEnv.elevation}</span>
                          </div>
                          <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
                              <Sun className="w-3 h-3 text-amber-400" />
                              <span>Solar Azimuth</span>
                            </div>
                            <span className="text-teal-300 font-bold truncate block">
                              {detectedEnv.solarExposure}
                            </span>
                          </div>
                          <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
                              <Droplets className="w-3 h-3 text-cyan-400" />
                              <span>Live ET₀</span>
                            </div>
                            <span className="text-amber-300 font-bold">{detectedEnv.referenceET0}</span>
                          </div>
                          <div className="p-2 rounded bg-black/40 border border-white/[0.06]">
                            <div className="flex items-center gap-1 text-slate-400 mb-0.5">
                              <Compass className="w-3 h-3 text-emerald-400" />
                              <span>Microclimate</span>
                            </div>
                            <span className="text-cyan-300 font-bold truncate block">
                              {detectedEnv.climateClassification}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                          <span className="italic">
                            ✓ Elevation, solar radiation & weather grid auto-derived.
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setLocationSuccess(false);
                              setB2cLocation("");
                            }}
                            className="text-teal-400 hover:underline cursor-pointer"
                          >
                            Clear
                          </button>
                        </div>
                      </div>
                    )}

                    {!locationSuccess && !isLocating && !locationError && (
                      <div className="flex items-center justify-between pt-0.5 px-1 text-[11px] text-slate-400">
                        <span>
                          💡 Click <strong>Auto-Detect</strong> to automatically acquire GPS, elevation & solar orientation.
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Primary Vegetation
                      </label>
                      <select
                        value={b2cGardenType}
                        onChange={(e) => setB2cGardenType(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0e131b] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-teal-400"
                      >
                        <option>Lawn & Mediterranean Shrubs</option>
                        <option>Mature Trees, Olives & Citrus</option>
                        <option>Floral Borders & Flowering Plants</option>
                        <option>Vegetable Garden & Fruit Trees</option>
                        <option>Mixed Villa Grounds with Pool</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        How Do You Currently Water?
                      </label>
                      <select
                        value={b2cWaterMethod}
                        onChange={(e) => setB2cWaterMethod(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0e131b] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-teal-400"
                      >
                        <option>Hose / Hand-watering (Manual)</option>
                        <option>Portable Lawn Sprinklers</option>
                        <option>Basic Tap Timer / Battery Spigot</option>
                        <option>Installed Multi-Zone Controller</option>
                        <option>Garden Caretaker / Landscaper</option>
                      </select>
                    </div>
                  </div>

                  {/* Photo Upload Simulation Box */}
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-dashed border-white/[0.15] text-center space-y-1.5">
                    <UploadCloud className="w-6 h-6 text-teal-400 mx-auto" />
                    <div className="text-xs font-semibold text-white">
                      Upload 3–10 Garden Photos (Digital Twin)
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Include lawn, borders, sun exposure, and trees for vegetation classification.
                    </div>
                    <div className="pt-1 flex items-center justify-center gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-teal-950/60 text-teal-300 border border-teal-500/30">
                        {b2cPhotosSelected} Photos attached (Ready)
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Email Address for Free Weekly Water Plan
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="your.email@domain.com"
                      value={b2cEmail}
                      onChange={(e) => setB2cEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </>
              ) : (
                /* B2B FORM FIELDS */
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Marc Benali"
                        value={b2bName}
                        onChange={(e) => setB2bName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Atlas Hospitality Group"
                        value={b2bCompany}
                        onChange={(e) => setB2bCompany(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Work Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={b2bEmail}
                        onChange={(e) => setB2bEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Property / Sector
                      </label>
                      <select
                        value={b2bCategory}
                        onChange={(e) => setB2bCategory(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0e131b] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-teal-400"
                      >
                        <option>Hotel / Resort</option>
                        <option>Golf Course</option>
                        <option>Commercial Campus</option>
                        <option>Residential Estate</option>
                        <option>High-Value Agriculture</option>
                        <option>Irrigation / Technology Partner</option>
                        <option>Investor Inquiry</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Spain, Morocco, Portugal, UAE"
                        value={b2bCountry}
                        onChange={(e) => setB2bCountry(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Current Installed Controller
                      </label>
                      <select
                        value={b2bController}
                        onChange={(e) => setB2bController(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#0e131b] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-teal-400"
                      >
                        <option>Rain Bird (IQ4 / ESP)</option>
                        <option>Hunter (Hydrawise / ACC2)</option>
                        <option>Toro (Lynx / Sentinel)</option>
                        <option>Galcon (GSI / Computered)</option>
                        <option>Weathermatic (SmartLine)</option>
                        <option>Mixed / Multiple Brands</option>
                        <option>Manual Valves / Unknown</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Message / Irrigated Hectares / Objective
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share details on your property acreage, number of zones, or water challenges..."
                      value={b2bMessage}
                      onChange={(e) => setB2bMessage(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                    />
                  </div>
                </>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-lg shadow-teal-500/20 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                    <span>Calculating ASCE FAO-56 Water Balance...</span>
                  </div>
                ) : activeTab === "b2c" ? (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Generate Immediate Garden Plan</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4 text-slate-950" />
                    <span>Request Property Baseline Audit</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                <span>Strict privacy guarantee · No unsolicited sales outreach</span>
              </div>
            </form>
          </div>
        ) : (
          /* IMMEDIATE RESULTS DASHBOARD */
          <div>
            {activeTab === "b2c" ? (
              /* IMMEDIATE B2C ASSESSMENT REPORT */
              <div className="space-y-5 text-left">
                {/* Header with Generated Digital Twin Tag */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/[0.08] pb-4">
                  <div>
                    <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono font-semibold uppercase tracking-wider mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Digital Twin Synthesized · ID #HDQ-8492
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                      Your Immediate Garden Water Plan
                    </h3>
                    <p className="text-xs text-slate-300 mt-0.5">
                      Target Site: <strong className="text-teal-300 font-semibold">{b2cLocation || "Detected Garden Location"}</strong> · {b2cGardenType}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handleCopySchedule}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/[0.12] border border-white/[0.1] text-xs font-semibold text-white transition-all cursor-pointer"
                      title="Copy formatted schedule for your gardener or caretaker"
                    >
                      {copiedSchedule ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-300">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-300" />
                          <span>Copy for Gardener</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Primary Value Matrix Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Recommended Volume
                    </span>
                    <div className="text-lg sm:text-xl font-extrabold text-white font-mono mt-0.5">
                      26 <span className="text-xs font-normal text-slate-300">mm/wk</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-400 block mt-0.5">
                      ↓ 38% Volume Saved
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Annual Savings
                    </span>
                    <div className="text-lg sm:text-xl font-extrabold text-teal-300 font-mono mt-0.5">
                      ~135 <span className="text-xs font-normal text-slate-300">m³</span>
                    </div>
                    <span className="text-[10px] text-slate-300 block mt-0.5">
                      ~€420 utility savings
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Optimal Window
                    </span>
                    <div className="text-lg sm:text-xl font-extrabold text-cyan-300 font-mono mt-0.5">
                      05:30 – 06:15
                    </div>
                    <span className="text-[10px] text-slate-300 block mt-0.5">
                      Pre-dawn (Zero drift)
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Frequency
                    </span>
                    <div className="text-lg sm:text-xl font-extrabold text-amber-300 font-mono mt-0.5">
                      2 Days <span className="text-xs font-normal text-slate-300">/ wk</span>
                    </div>
                    <span className="text-[10px] text-slate-300 block mt-0.5">
                      Cycle & Soak Protocol
                    </span>
                  </div>
                </div>

                {/* V4 Permanent Property Asset Bridge */}
                <div className="p-4 rounded-xl bg-gradient-to-r from-teal-950/80 via-emerald-950/60 to-black/80 border border-teal-500/40 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg shadow-teal-500/10">
                  <div className="text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Permanent Digital Property Asset</span>
                      <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">V4</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Saved to your account. Access spatial digital twin, visual change detection, and dynamic weather sync.
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleSaveToDashboard}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:opacity-95 transition-opacity cursor-pointer shrink-0 shadow-md shadow-teal-500/20"
                  >
                    <span>Open Property Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* 7-Day Hydration Run-Sheet */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-teal-400" />
                      <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                        This Week&apos;s Active Run-Sheet
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Dynamic ASCE FAO-56 Penman-Monteith Model
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                    {[
                      {
                        day: "MON",
                        status: "SKIP",
                        desc: "Soil moisture reserve at 88%",
                        duration: "0 min",
                        water: false,
                      },
                      {
                        day: "TUE",
                        status: "WATER",
                        desc: "05:45 (Cycle & soak: 2x 12m)",
                        duration: "25 min",
                        water: true,
                      },
                      {
                        day: "WED",
                        status: "SKIP",
                        desc: "Deep soak percolation active",
                        duration: "0 min",
                        water: false,
                      },
                      {
                        day: "THU",
                        status: "SKIP",
                        desc: "Transpiration buffer holding",
                        duration: "0 min",
                        water: false,
                      },
                      {
                        day: "FRI",
                        status: "WATER",
                        desc: "05:45 (Target root perimeter)",
                        duration: "20 min",
                        water: true,
                      },
                      {
                        day: "SAT",
                        status: "SKIP",
                        desc: "Subsurface retention active",
                        duration: "0 min",
                        water: false,
                      },
                      {
                        day: "SUN",
                        status: "SKIP",
                        desc: "Atmospheric equilibrium check",
                        duration: "0 min",
                        water: false,
                      },
                    ].map((s) => (
                      <div
                        key={s.day}
                        className={`p-2.5 rounded-xl border text-left flex flex-col justify-between ${
                          s.water
                            ? "bg-teal-950/60 border-teal-500/40 shadow-sm shadow-teal-500/10"
                            : "bg-white/[0.02] border-white/[0.06]"
                        }`}
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono font-bold text-slate-300 mb-1">
                          <span>{s.day}</span>
                          {s.water && (
                            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                          )}
                        </div>
                        <div>
                          <span
                            className={`text-[10px] font-bold font-mono px-1.5 py-0.2 rounded uppercase block w-fit mb-1 ${
                              s.water
                                ? "bg-teal-500/20 text-teal-300 border border-teal-500/30"
                                : "bg-slate-800/80 text-slate-400"
                            }`}
                          >
                            {s.status}
                          </span>
                          <div className="text-xs font-bold text-white">{s.duration}</div>
                          <div className="text-[9px] text-slate-400 leading-tight mt-0.5 line-clamp-2">
                            {s.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prescriptive Guidance */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-start gap-3">
                  <Compass className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <div className="text-xs text-slate-300 leading-relaxed">
                    <strong className="text-white block mb-0.5">
                      Agronomic Prescription for {b2cGardenType}:
                    </strong>
                    Frequent shallow waterings promote shallow roots and cause up to 40% loss to solar evaporation. 
                    HIDRIQ prescribes <strong>Cycle & Soak</strong> (two 12-minute cycles separated by a 15-minute infiltration interval) to drive roots deep while maintaining lush canopy color.
                  </div>
                </div>

                {/* Conversion Funnel Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-teal-950/50 via-cyan-950/30 to-black/50 border border-teal-500/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-teal-300" />
                        <span>Activate Weekly Weather-Synced Sync (Free)</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-teal-500/20 text-teal-300 border border-teal-500/30">
                          AUTOPILOT
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        Dispatched to <strong className="text-white">{b2cEmail}</strong>. Keep receiving updated schedules every Sunday night synced to upcoming weather.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setSyncSubscribed(true)}
                      disabled={syncSubscribed}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shrink-0 flex items-center gap-1.5 ${
                        syncSubscribed
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                          : "bg-teal-500 hover:bg-teal-400 text-slate-950 shadow-md shadow-teal-500/20"
                      }`}
                    >
                      {syncSubscribed ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Weekly Sync Active</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-slate-950" />
                          <span>Subscribe Weekly Sync</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Controller Upgrade Hook */}
                  <div className="pt-3 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-slate-400">
                    <div>
                      <strong className="text-slate-200">Want hands-off automation?</strong> HIDRIQ connects directly to your Rain Bird, Hunter, or smart spigot.
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("b2b");
                        setSubmitted(false);
                      }}
                      className="text-teal-400 hover:text-teal-300 font-semibold inline-flex items-center gap-1 shrink-0 cursor-pointer"
                    >
                      <span>Explore Controller Autopilot</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setB2cLocation("");
                      setLocationSuccess(false);
                    }}
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer"
                  >
                    ← Check another garden
                  </button>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Return to Site
                  </button>
                </div>
              </div>
            ) : (
              /* IMMEDIATE B2B ENTERPRISE AUDIT CONFIRMATION */
              <div className="space-y-5 text-left">
                <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-950/80 border border-teal-500/40 text-teal-300 text-[10px] font-mono font-semibold uppercase tracking-wider mb-2">
                    Enterprise Technical Request Logged
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Property Audit Initiated
                  </h3>
                  <p className="text-xs text-slate-300 mt-1">
                    Preliminary benchmarking active for <strong className="text-white">{b2bCompany || "Your Property"}</strong> ({b2bCategory} · {b2bCountry}).
                  </p>
                </div>

                {/* Preliminary Commercial Projections */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <div className="p-3 rounded-xl bg-teal-950/40 border border-teal-500/30">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Target Utility Reduction
                    </span>
                    <div className="text-lg font-extrabold text-teal-300 font-mono mt-0.5">
                      28% – 35%
                    </div>
                    <span className="text-[10px] text-slate-300 block mt-0.5">
                      Commercial volume reduction
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Controller Architecture
                    </span>
                    <div className="text-lg font-extrabold text-white font-mono mt-0.5">
                      {b2bController}
                    </div>
                    <span className="text-[10px] text-emerald-400 block mt-0.5">
                      ✓ Supported without hardware replacement
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                    <span className="text-[10px] font-mono uppercase text-slate-400 block">
                      Technical Turnaround
                    </span>
                    <div className="text-lg font-extrabold text-cyan-300 font-mono mt-0.5">
                      &lt; 24 Hours
                    </div>
                    <span className="text-[10px] text-slate-300 block mt-0.5">
                      Engineering brief to {b2bEmail}
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs text-slate-300 leading-relaxed">
                  Our engineering team will review your station layout, hydraulic constraints, and local meteorological microclimate. We will dispatch a tailored site evaluation directly to <strong className="text-white">{b2bEmail}</strong>.
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-slate-400 hover:text-white transition-colors cursor-pointer text-left"
                  >
                    ← Edit inquiry parameters
                  </button>

                  <div className="flex flex-wrap items-center gap-2.5">
                    <button
                      type="button"
                      onClick={handleSaveB2bToDashboard}
                      className="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 text-slate-950 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-teal-500/20"
                    >
                      <span>Open Property Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleClose}
                      className="px-5 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      Return to Site
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
