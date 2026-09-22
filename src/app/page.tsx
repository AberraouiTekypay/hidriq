"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { ProductThesis } from "@/components/ProductThesis";
import { HowItWorks } from "@/components/HowItWorks";
import { IntelligenceEngine } from "@/components/IntelligenceEngine";
import { B2BSection } from "@/components/B2BSection";
import { B2CSection } from "@/components/B2CSection";
import { SecondHomeSection } from "@/components/SecondHomeSection";
import { HardwarePhilosophy } from "@/components/HardwarePhilosophy";
import { ZephyrPocSection } from "@/components/ZephyrPocSection";
import { RoadmapSection } from "@/components/RoadmapSection";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"b2c" | "b2b">("b2c");

  const handleOpenModal = (tab: "b2c" | "b2b" = "b2c") => {
    setModalTab(tab);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#07090d] text-slate-100 selection:bg-teal-500/20 selection:text-teal-300">
      {/* 1. Minimal Premium Navigation */}
      <Navbar onOpenLeadModal={handleOpenModal} />

      {/* 2. Cinematic Hero Section */}
      <Hero onOpenLeadModal={handleOpenModal} />

      {/* 3. The Problem: Clocks vs Variable Demand */}
      <ProblemSection />

      {/* 4. Product Thesis & Closed Loop */}
      <ProductThesis />

      {/* 5. How It Works (Observe, Predict, Optimize, Automate & Operating Modes) */}
      <HowItWorks />

      {/* 6. The Water Intelligence Engine (5 Engines) */}
      <IntelligenceEngine />

      {/* 7. B2B Applications (Hospitality, Golf, Commercial, Agriculture Stage 3) */}
      <B2BSection onOpenLeadModal={handleOpenModal} />

      {/* 8. B2C Application (HIDRIQ HOME & Manual Garden Mode) */}
      <B2CSection onOpenLeadModal={handleOpenModal} />

      {/* 9. Second-Home / Absentee Villa Angle */}
      <SecondHomeSection onOpenLeadModal={handleOpenModal} />

      {/* 10. Hardware Philosophy (Your Infrastructure. Our Intelligence.) */}
      <HardwarePhilosophy onOpenLeadModal={handleOpenModal} />

      {/* 11. Zephyr Hotels POC (Built in the Real World) */}
      <ZephyrPocSection onOpenLeadModal={handleOpenModal} />

      {/* 12. Strategic Roadmap (4 Stages & Dual Traction Curves) */}
      <RoadmapSection />

      {/* 13. Conversion Call to Action */}
      <CtaBanner onOpenLeadModal={handleOpenModal} />

      {/* 14. Footer with Exact EM300 Attribution */}
      <Footer onOpenLeadModal={handleOpenModal} />

      {/* Interactive Assessment & Enterprise Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        defaultTab={modalTab}
      />
    </main>
  );
}
