"use client";

import React, { useState, useEffect } from "react";
import { X, Sparkles, Building2, Home, CheckCircle2, UploadCloud, ShieldCheck } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: "b2c" | "b2b";
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  defaultTab = "b2c",
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

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload =
      activeTab === "b2c"
        ? {
            type: "B2C_GARDEN_CHECK",
            location: b2cLocation,
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
                Select your track below to request an enterprise property audit or generate a free residential garden assessment.
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
                /* B2C FORM FIELDS */
                <>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">
                      Garden / Property Location (City or GPS)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marbella, Mallorca, Estepona, Marrakech, Cascais"
                      value={b2cLocation}
                      onChange={(e) => setB2cLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-slate-400 focus:outline-none focus:border-teal-400"
                    />
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
