"use client";

import CustomCursor from "@/components/ui/CustomCursor";
import Navbar from "@/components/ui/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import Footer from "@/components/ui/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import MarqueeBanner from "@/components/ui/MarqueeBanner";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <MarqueeBanner />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificationsSection />
      </main>
      <Footer />
    </SmoothScroll>
  );
}
