"use client";

import { useState, useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { DonationOptions } from "@/components/DonationOptions";
import { MonthlyGiving } from "@/components/MonthlyGiving";
import { WhereDonationsGo } from "@/components/WhereDonationsGo";
import { ImpactSection } from "@/components/ImpactSection";
import { ServiceTrips } from "@/components/ServiceTrips";
import { Footer } from "@/components/Footer";
import { DonationModal } from "@/components/DonationModal";

export default function Home() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  useEffect(() => {
    const handler = () => setIsDonationModalOpen(true);
    window.addEventListener("openDonationModal", handler);
    return () => window.removeEventListener("openDonationModal", handler);
  }, []);

  return (
    <main>
      <HeroSection onDonate={() => setIsDonationModalOpen(true)} />
      <DonationOptions onDonate={() => setIsDonationModalOpen(true)} />
      <MonthlyGiving onDonate={() => setIsDonationModalOpen(true)} />
      <WhereDonationsGo />
      <ImpactSection onDonate={() => setIsDonationModalOpen(true)} />
      <ServiceTrips onDonate={() => setIsDonationModalOpen(true)} />
      <Footer />
      <DonationModal isOpen={isDonationModalOpen} onClose={() => setIsDonationModalOpen(false)} />

</main>
  );
}