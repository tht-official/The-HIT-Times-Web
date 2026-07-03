"use client";

import { useEffect, useState } from "react";
import AboutSection from "./components/AboutSection";
import GamesSection from "./components/GamesSection";
import HeroSection from "./components/HeroSection";
import RegisterCTA from "./components/RegisterCTA";
import RulesSection from "./components/RulesSection";
import ScheduleSection from "./components/ScheduleSection";

const sections = ["hero", "about", "games", "schedule", "rules", "register"] as const;

export default function EsportsLandingPage() {
  const [activeSection, setActiveSection] = useState<string>("hero");

  useEffect(() => {
    const handleScroll = () => {
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element && window.scrollY >= element.offsetTop - 200) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="animate-in-subtle relative space-y-12 pb-12 sm:space-y-20">
      <div className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        {sections.map((section) => (
          <button
            key={section}
            type="button"
            onClick={() => scrollToSection(section)}
            className={`h-2.5 w-2.5 rounded-full border transition-colors ${
              activeSection === section
                ? "border-foreground bg-foreground"
                : "border-border bg-transparent hover:border-foreground/60"
            }`}
            aria-label={`Scroll to ${section}`}
          />
        ))}
      </div>

      <HeroSection scrollToSection={scrollToSection} />
      <AboutSection />
      <GamesSection />
      <ScheduleSection />
      <RulesSection />
      <RegisterCTA />
    </div>
  );
}
