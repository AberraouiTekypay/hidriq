"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { ProblemSection } from "@/components/ProblemSection";
import { ProductThesis } from "@/components/ProductThesis";
import { DigitalTwinExperience } from "@/components/DigitalTwinExperience";
import { HowItWorks } from "@/components/HowItWorks";
import { IntelligenceEngine } from "@/components/IntelligenceEngine";
import { B2BSection } from "@/components/B2BSection";
import { B2CSection } from "@/components/B2CSection";
import { SecondHomeSection } from "@/components/SecondHomeSection";
import { HardwarePhilosophy } from "@/components/HardwarePhilosophy";
import { AutomationLevelsSection } from "@/components/AutomationLevelsSection";
import { CtaBanner } from "@/components/CtaBanner";
import { Footer } from "@/components/Footer";
import { LeadCaptureModal } from "@/components/LeadCaptureModal";

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState<"b2c" | "b2b">("b2c");
  const [autoDetect, setAutoDetect] = useState(false);

  const handleOpenModal = (tab: "b2c" | "b2b" = "b2c", autoDetectLocation = false) => {
    setModalTab(tab);
    setAutoDetect(autoDetectLocation);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setAutoDetect(false);
  };

  return (
    <main className="min-h-screen bg-[#07090d] text-slate-100 selection:bg-teal-500/20 selection:text-teal-300">
      {/* 1. Minimal Premium Navigation */}
      <Navbar onOpenLeadModal={handleOpenModal} />

      {/* 2. Cinematic Hero Section */}
      <Hero onOpenLeadModal={handleOpenModal} />

      {/* 3. The Problem: Clocks vs Variable Demand */}
      <ProblemSection />

      {/* 4. Product Thesis & Closed Loop (PREDICT -> ACT -> MEASURE -> LEARN) */}
      <ProductThesis />

      {/* 5. The Living Digital Twin Interactive Experience (Spatial Showcase) */}
      <DigitalTwinExperience />

      {/* 6. How It Works (Observe, Predict, Optimize, Automate & Operating Modes) */}
      <HowItWorks />

      {/* 7. The Water Intelligence Engine (5 Software Engines) */}
      <IntelligenceEngine />

      {/* 8. B2B Applications: HIDRIQ BUSINESS (Hospitality, Golf, Commercial, Agriculture Stage 3) */}
      <B2BSection onOpenLeadModal={handleOpenModal} />

      {/* 9. B2C Application: HIDRIQ HOME (Manual Garden Mode & Digital Twin) */}
      <B2CSection onOpenLeadModal={handleOpenModal} />

      {/* 10. Second-Home / Absentee Villa Angle */}
      <SecondHomeSection onOpenLeadModal={handleOpenModal} />

      {/* 11. Hardware Philosophy (Your Infrastructure. Our Intelligence.) */}
      <HardwarePhilosophy onOpenLeadModal={handleOpenModal} />

      {/* 12. Nine Levels of Water Automation & Autopilot Safety Model */}
      <AutomationLevelsSection />

      {/* 13. Conversion Call to Action */}
      <CtaBanner onOpenLeadModal={handleOpenModal} />

      {/* 14. Footer with Exact EM300 Attribution */}
      <Footer onOpenLeadModal={handleOpenModal} />

      {/* Interactive Assessment & Enterprise Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        defaultTab={modalTab}
        autoDetectLocation={autoDetect}
      />
    </main>
  );
}
