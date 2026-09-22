"use client";

import React from "react";
import Image from "next/image";
import { Building2, Flag, Trees, Sprout, ArrowRight, ShieldCheck } from "lucide-react";

interface B2BSectionProps {
  onOpenLeadModal: (tab?: "b2c" | "b2b") => void;
}

export const B2BSection: React.FC<B2BSectionProps> = ({ onOpenLeadModal }) => {
  const verticals = [
    {
      id: "hospitality",
      title: "HOSPITALITY",
      subtitle: "Hotels, Luxury Resorts & Spas",
      tag: "Active Beachhead",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      icon: Building2,
      description:
        "Optimize complex multi-zone landscape irrigation across hotel properties without requiring a costly hardware replacement stack. Maintain five-star visual standards while identifying unnecessary water delivery.",
      partnerNote: "POC & Design Partner Context: Zephyr Hotels, Morocco",
      actionText: "Request Hospitality Audit",
      stageBadge: "Stage 01 · In Deployment",
      isLive: true,
    },
    {
      id: "golf",
      title: "GOLF COURSES",
      subtitle: "Championship Turf & Fairways",
      tag: "Expansion Vertical",
      image: "https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&w=1200&q=80",
      icon: Flag,
      description:
        "Transition from fixed calendar runs to microclimate-aware turf management. Model elevation slopes, eliminate surface runoff with cycle-and-soak execution, and schedule pumping during off-peak electrical tariff hours.",
      partnerNote: "Designed for multi-satellite controllers (Toro, Hunter, Rain Bird)",
      actionText: "Explore Golf Capabilities",
      stageBadge: "Stage 02 · Next",
      isLive: false,
    },
    {
      id: "commercial",
      title: "COMMERCIAL LANDSCAPES",
      subtitle: "Campuses, Estates & Developments",
      tag: "Portfolio Governance",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=80",
      icon: Trees,
      description:
        "Centralized water intelligence across sprawling commercial developments, private communities, and corporate campuses. Manage heterogeneous legacy controllers through a unified vendor-neutral layer.",
      partnerNote: "Enterprise multi-site dashboard with role-based permissions",
      actionText: "Consult on Commercial Sites",
      stageBadge: "Stage 02 · Next",
      isLive: false,
    },
    {
      id: "agriculture",
      title: "HIGH-VALUE AGRICULTURE",
      subtitle: "Orchards, Vineyards & Specialty Crops",
      tag: "Stage 3 Opportunity",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      icon: Sprout,
      description:
        "The same core water intelligence will expand to high-value agriculture. Moving from landscape aesthetics to optimizing water allocation by crop phenology, variety, and root zone to maximize economic yield value per cubic metre.",
      partnerNote: "Architecture is agriculture-ready from Day 1 (Farm → Field → Block → Crop)",
      actionText: "Join Agriculture Waitlist",
      stageBadge: "Stage 03 · Coming Soon",
      isLive: false,
    },
  ];

  return (
    <section id="business" className="relative py-24 sm:py-32 bg-[#080b10] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-4">
            <Building2 className="w-3.5 h-3.5" />
            HIDRIQ BUSINESS
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            BUILT FOR WATER-INTENSIVE <br className="hidden sm:inline" />
            OPERATIONS.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-slate-300 leading-relaxed">
            Enterprise organizations managing significant landscape and water assets need operational intelligence, not another proprietary hardware trap.
          </p>
        </div>

        {/* 4 Application Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {verticals.map((vert) => {
            const Icon = vert.icon;
            return (
              <div
                key={vert.id}
                className="group rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-teal-500/30 overflow-hidden flex flex-col justify-between transition-all duration-300 text-left"
              >
                {/* Image Container */}
                <div className="relative h-60 w-full overflow-hidden">
                  <Image
                    src={vert.image}
                    alt={vert.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080b10] via-[#080b10]/40 to-transparent" />

                  {/* Stage Badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full font-bold tracking-wider ${
                        vert.isLive
                          ? "bg-emerald-950/80 border border-emerald-500/50 text-emerald-300"
                          : "bg-slate-900/80 border border-white/20 text-slate-300"
                      }`}
                    >
                      {vert.stageBadge}
                    </span>
                  </div>

                  {/* Icon badge */}
                  <div className="absolute bottom-4 left-4 p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-teal-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Content Area */}
                <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-xl font-bold text-white tracking-wide">
                        {vert.title}
                      </h3>
                      <span className="text-xs text-teal-400/90 font-medium">
                        {vert.tag}
                      </span>
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">
                      {vert.subtitle}
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                      {vert.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] space-y-4">
                    <div className="text-xs font-mono text-teal-300/90 bg-teal-950/30 p-2.5 rounded-lg border border-teal-500/20">
                      {vert.partnerNote}
                    </div>

                    <button
                      onClick={() => onOpenLeadModal("b2b")}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.05] hover:bg-teal-500/20 text-white hover:text-teal-300 border border-white/[0.1] hover:border-teal-400/40 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
                    >
                      <span>{vert.actionText}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
