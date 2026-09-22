"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Droplets } from "lucide-react";

interface FooterProps {
  onOpenLeadModal: (tab?: "b2c" | "b2b") => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLeadModal }) => {
  const [legalModalContent, setLegalModalContent] = useState<{
    title: string;
    text: string;
  } | null>(null);

  const openLegalModal = (title: string, text: string) => {
    setLegalModalContent({ title, text });
  };

  return (
    <footer className="relative bg-[#05070a] border-t border-white/[0.08] text-slate-400 text-xs overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 text-left">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-500/10 border border-teal-500/30 text-teal-400">
                <Droplets className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-wider text-white">
                HIDRIQ
              </span>
            </Link>

            <div className="text-xs uppercase tracking-[0.2em] text-teal-400 font-semibold">
              Water Intelligence
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The intelligence layer for water. Predict. Optimize. Automate. Transforming variable environmental data into precise water decisions for hospitality, golf, residential estates, and agriculture.
            </p>

            <div className="pt-2 text-[11px] text-slate-400">
              Operating Beachheads: Morocco (B2B) & Spain (B2C)
            </div>
          </div>

          {/* Platform Columns (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#technology" className="hover:text-teal-300 transition-colors">
                  Water Demand Engine
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-teal-300 transition-colors">
                  Forecast Engine
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-teal-300 transition-colors">
                  Optimization Engine
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-teal-300 transition-colors">
                  Controller Connectors
                </a>
              </li>
              <li>
                <a href="#technology" className="hover:text-teal-300 transition-colors">
                  Verification & Leaks
                </a>
              </li>
            </ul>
          </div>

          {/* Applications Column (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Applications
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#business" className="hover:text-teal-300 transition-colors">
                  Hospitality & Resorts
                </a>
              </li>
              <li>
                <a href="#business" className="hover:text-teal-300 transition-colors">
                  Golf Courses
                </a>
              </li>
              <li>
                <a href="#home" className="hover:text-teal-300 transition-colors">
                  Manual Garden Mode (B2C)
                </a>
              </li>
              <li>
                <a href="#home" className="hover:text-teal-300 transition-colors">
                  Second Homes & Luxury Villas
                </a>
              </li>
              <li>
                <a href="#business" className="hover:text-teal-300 transition-colors">
                  High-Value Agriculture (Stage 3)
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Actions (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Engage
            </h4>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => onOpenLeadModal("b2c")}
                className="text-left py-1 text-xs text-teal-400 hover:text-teal-300 transition-colors cursor-pointer"
              >
                Free Garden Check →
              </button>
              <button
                onClick={() => onOpenLeadModal("b2b")}
                className="text-left py-1 text-xs text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Property Audit →
              </button>
              <a
                href="#automation"
                className="py-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Automation Levels
              </a>
              <a
                href="#hardware"
                className="py-1 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Hardware Architecture
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Line with Mandatory EM300 Attribution */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} HIDRIQ. All rights reserved.</span>
            <span>·</span>
            <span className="font-semibold text-slate-300">
              hidriq.com
            </span>
          </div>

          {/* MANDATORY EM300 LINE: EXACT WORDING */}
          <div className="text-slate-300 font-medium tracking-wide">
            An EM300.co Company
          </div>

          {/* Legal Links */}
          <div className="flex items-center gap-4">
            <button
              onClick={() =>
                openLegalModal(
                  "Privacy Policy",
                  "HIDRIQ collects minimal environmental and garden data to generate precision water schedules. User-uploaded garden photographs are analyzed solely for vegetation taxonomy and microclimate classification, and are never shared or monetized. We adhere to European GDPR and international privacy standards."
                )
              }
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() =>
                openLegalModal(
                  "Terms of Service",
                  "HIDRIQ provides water demand modeling, irrigation recommendations, and controller integration. Operating schedules generated by HIDRIQ are designed to optimize water application based on available weather and soil physics data. In all deployment tiers, system operators retain ultimate oversight of physical property irrigation."
                )
              }
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>·</span>
            <button
              onClick={() =>
                openLegalModal(
                  "Cookie Policy",
                  "HIDRIQ utilizes essential technical cookies for website navigation, user session preferences, and security. We do not employ invasive third-party cross-site advertising trackers."
                )
              }
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal Popup */}
      {legalModalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl glass-panel bg-[#0d1117] p-6 text-left border border-white/[0.15] space-y-4">
            <div className="flex items-center justify-between border-b border-white/[0.08] pb-3">
              <h3 className="text-base font-bold text-white">
                {legalModalContent.title}
              </h3>
              <button
                onClick={() => setLegalModalContent(null)}
                className="text-slate-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {legalModalContent.text}
            </p>
            <div className="pt-2 text-right">
              <button
                onClick={() => setLegalModalContent(null)}
                className="px-4 py-1.5 rounded-lg bg-white/[0.08] hover:bg-white/[0.15] text-white text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
