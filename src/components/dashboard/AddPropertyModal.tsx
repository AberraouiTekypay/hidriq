"use client";

import React, { useState } from "react";
import {
  X,
  LocateFixed,
  MapPin,
  AlertCircle,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Property, saveNewProperty } from "@/lib/propertyStore";

interface AddPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPropertyAdded: (newProperty: Property) => void;
}

export const AddPropertyModal: React.FC<AddPropertyModalProps> = ({
  isOpen,
  onClose,
  onPropertyAdded,
}) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [gardenType, setGardenType] = useState("Lawn & Mediterranean Shrubs");
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [detectedCoords, setDetectedCoords] = useState<{
    latitude: number;
    longitude: number;
    formatted: string;
    accuracy?: string;
  } | null>(null);
  const [detectedElevation, setDetectedElevation] = useState("130 m MSL");
  const [detectedClimate, setDetectedClimate] = useState("Mediterranean (Csa)");

  if (!isOpen) return null;

  const handleAutoDetect = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setLocationError("Geolocation not supported by browser.");
      return;
    }

    setIsLocating(true);
    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const acc = pos.coords.accuracy ? Math.round(pos.coords.accuracy) : null;

        try {
          const res = await fetch(`/api/geocode/reverse?lat=${lat}&lng=${lng}${acc ? `&accuracy=${acc}` : ""}`);
          if (res.ok) {
            const data = await res.json();
            setAddress(data.locationName || `${lat.toFixed(4)}°, ${lng.toFixed(4)}°`);
            setDetectedCoords(data.coordinates);
            if (data.environmentalParameters) {
              setDetectedElevation(data.environmentalParameters.elevation);
              setDetectedClimate(data.environmentalParameters.climateClassification);
            }
            setLocationSuccess(true);
          } else {
            const latDir = lat >= 0 ? "N" : "S";
            const lngDir = lng >= 0 ? "E" : "W";
            const formatted = `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
            setAddress(`GPS Position: ${formatted}`);
            setDetectedCoords({ latitude: lat, longitude: lng, formatted, accuracy: acc ? `±${acc}m` : undefined });
            setLocationSuccess(true);
          }
        } catch {
          const latDir = lat >= 0 ? "N" : "S";
          const lngDir = lng >= 0 ? "E" : "W";
          const formatted = `${Math.abs(lat).toFixed(4)}° ${latDir}, ${Math.abs(lng).toFixed(4)}° ${lngDir}`;
          setAddress(`GPS Position: ${formatted}`);
          setDetectedCoords({ latitude: lat, longitude: lng, formatted, accuracy: acc ? `±${acc}m` : undefined });
          setLocationSuccess(true);
        } finally {
          setIsLocating(false);
        }
      },
      () => {
        setIsLocating(false);
        setLocationError("GPS signal unavailable or permission declined. Enter city or address manually.");
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const created = saveNewProperty(
      name,
      address,
      detectedCoords || undefined,
      detectedElevation,
      detectedClimate,
      gardenType
    );
    onPropertyAdded(created);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-2xl glass-panel border border-white/[0.15] bg-[#0c1017] p-6 text-left shadow-2xl teal-glow my-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="text-[10px] font-mono uppercase tracking-widest text-teal-400 font-bold block mb-1">
            Digital Asset Registration
          </span>
          <h3 className="text-xl font-bold text-white tracking-tight">
            Add New Property Asset
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            Permanently registers a new estate or villa into your account with its own Digital Twin, weather feed, and micro-zones.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Property Asset Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Cascais Villa, Ibiza Finca, Quinta da Marinha"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-medium text-slate-300">
                Location (Address or GPS)
              </label>
              <button
                type="button"
                onClick={handleAutoDetect}
                disabled={isLocating}
                className="inline-flex items-center gap-1.5 text-[10px] font-semibold text-teal-400 hover:text-teal-300 transition-colors cursor-pointer bg-teal-950/70 px-2 py-0.5 rounded border border-teal-500/30"
              >
                <LocateFixed className={`w-3 h-3 ${isLocating ? "animate-spin" : ""}`} />
                <span>{isLocating ? "Acquiring GPS..." : "1-Click GPS"}</span>
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4 text-teal-400" />
              </div>
              <input
                type="text"
                required
                placeholder="e.g. Marbella, Mallorca, Estepona, Cascais"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
              />
            </div>

            {locationSuccess && detectedCoords && (
              <div className="mt-1.5 text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>Verified GPS: {detectedCoords.formatted} ({detectedElevation})</span>
              </div>
            )}

            {locationError && (
              <div className="mt-1.5 text-[10px] text-amber-300 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                <span>{locationError}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">
              Primary Garden Vegetation
            </label>
            <select
              value={gardenType}
              onChange={(e) => setGardenType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#0e131b] border border-white/[0.1] text-xs text-white focus:outline-none focus:border-teal-400"
            >
              <option>Lawn & Mediterranean Shrubs</option>
              <option>Mature Trees, Olives & Citrus</option>
              <option>Floral Borders & Flowering Plants</option>
              <option>Vegetable Garden & Fruit Trees</option>
              <option>Mixed Villa Grounds with Pool</option>
            </select>
          </div>

          <div className="pt-2 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md shadow-teal-500/20 flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Create Digital Twin Asset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
