"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Droplets, ArrowUpRight, Sparkles, Building2, Home } from "lucide-react";

interface NavbarProps {
  onOpenLeadModal: (defaultTab?: "b2c" | "b2b") => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenLeadModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Technology", href: "#technology" },
    { label: "Digital Twin", href: "#digital-twin" },
    { label: "Business", href: "#business" },
    { label: "Home & Garden", href: "#home" },
    { label: "Automation", href: "#automation" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#07090d]/90 backdrop-blur-md border-b border-white/[0.08] py-3.5 shadow-2xl"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="group flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-teal-500/50 rounded-lg p-1">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500/20 via-cyan-500/10 to-transparent border border-teal-500/30 group-hover:border-teal-400/60 transition-colors">
              <Droplets className="w-4 h-4 text-teal-400" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-wider text-white group-hover:text-teal-300 transition-colors">
                HIDRIQ
              </span>
              <span className="text-[9px] uppercase tracking-[0.22em] text-slate-400 -mt-1 font-medium">
                Water Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative py-1 hover:after:w-full after:w-0 after:h-0.5 after:bg-teal-400 after:absolute after:bottom-0 after:left-0 after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Direct Link to Persistent Property Dashboard */}
            <Link
              href="/dashboard"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold tracking-wide rounded-full text-slate-300 hover:text-white bg-white/[0.04] border border-white/[0.1] hover:border-teal-500/40 transition-all cursor-pointer"
              title="Open persistent digital property assets"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span>Property Dashboard</span>
            </Link>

            {/* B2C Self-Service CTA */}
            <button
              onClick={() => onOpenLeadModal("b2c")}
              className="group flex items-center gap-2 px-3.5 py-2 text-xs font-semibold tracking-wide rounded-full text-teal-300 bg-teal-950/40 border border-teal-500/30 hover:bg-teal-900/50 hover:border-teal-400 transition-all cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-teal-400 group-hover:rotate-12 transition-transform" />
              <span>Check My Garden</span>
            </button>

            {/* B2B Enterprise CTA */}
            <button
              onClick={() => onOpenLeadModal("b2b")}
              className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wide rounded-full text-slate-900 bg-white hover:bg-slate-200 transition-all cursor-pointer shadow-sm hover:shadow-teal-500/20"
            >
              <span>Optimize Property</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => onOpenLeadModal("b2c")}
              className="px-2.5 py-1.5 text-xs font-semibold rounded-full text-teal-300 bg-teal-950/50 border border-teal-500/30"
            >
              Garden Check
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500/50"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0e14] border-b border-white/[0.08] px-4 pt-4 pb-6 mt-3 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-teal-400 py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-white/[0.08] flex flex-col gap-2.5">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-white/[0.06] border border-teal-500/40"
            >
              <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span>Enter Property Dashboard</span>
            </Link>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal("b2c");
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-teal-300 bg-teal-950/60 border border-teal-500/40"
            >
              <Home className="w-4 h-4 text-teal-400" />
              <span>Free Garden Water Check (Home)</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadModal("b2b");
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-slate-900 bg-white"
            >
              <Building2 className="w-4 h-4" />
              <span>Optimize Property (Business)</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
