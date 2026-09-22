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
} from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"b2c" | "b2b">(defaultTab);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

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
            // Fallback coordinate formatting if API route fails
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
          // Network or offline fallback
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
          setLocationError("GPS signal timed out. Please enter your location manually or click retry.");
        } else {
          setLocationError("Unable to acquire location automatically. Please type your city or address.");
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

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-2xl glass-panel border border-white/[0.15] bg-[#0c1017] p-6 sm:p-8 text-left shadow-2xl teal-glow my-8">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
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
                Select your track below to generate a free residential garden assessment or request an enterprise property audit.
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
                        placeholder="e.g. Marbella, Mallorca, Estepona, Marrakech, Cascais (or click Auto-Detect)"
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
                      Email Address for Weekly Water Plan
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
                        <option>High-Value Agriculture (Stage 3)</option>
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
                        placeholder="e.g. Morocco, Spain, Portugal, UAE"
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
                  <span>Synthesizing...</span>
                ) : activeTab === "b2c" ? (
                  <>
                    <Sparkles className="w-4 h-4 text-slate-950" />
                    <span>Generate Free Garden Assessment</span>
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
          /* SUCCESS STATE */
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 border border-teal-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-white">
              {activeTab === "b2c" ? "Garden Profile Received" : "Property Inquiry Received"}
            </h3>

            <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
              {activeTab === "b2c"
                ? "Your garden location and photos have been queued for Digital Twin synthesis. We will send your initial weekly watering recommendation directly to your email."
                : "Our engineering and agronomy team has logged your site parameters. We will review your controller architecture and schedule an exploratory technical review."}
            </p>

            {locationSuccess && detectedEnv && (
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-950/60 border border-teal-500/30 text-teal-300 text-[11px] font-mono mx-auto">
                <span>✓ Auto-Derived: {detectedEnv.elevation} · {detectedEnv.referenceET0} ET₀ · {detectedEnv.solarExposure}</span>
              </div>
            )}

            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-6 py-2.5 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Return to Site
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
