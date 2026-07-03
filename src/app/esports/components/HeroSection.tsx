"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { FC } from "react";

interface HeroSectionProps {
  scrollToSection: (section: string) => void;
}

const HeroSection: FC<HeroSectionProps> = ({ scrollToSection }) => {
  return (
    <section id="hero" className="scroll-mt-24 border border-border px-6 py-16 sm:px-10 sm:py-20">
      <div className="mx-auto max-w-3xl space-y-8 text-center">
        <p className="tag-editorial">The HIT Times presents</p>
        <h1 className="editorial-heading text-balance text-4xl font-normal leading-tight sm:text-5xl lg:text-6xl">
          Lock&apos;d Down
        </h1>
        <p className="text-lg text-muted-foreground">The ultimate e-sports showdown</p>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Gear up for an electrifying clash of challengers — six games, unlimited teams,
          and two days on the virtual battlefield.
        </p>
        <div className="btn-row justify-center">
          <Button size="lg" className="w-full sm:w-auto" onClick={() => scrollToSection("register")}>
            Register now
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto"
            onClick={() => scrollToSection("schedule")}
          >
            View schedule
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4 border-t border-border pt-8 sm:grid-cols-4">
          {[
            ["Unlimited", "Teams"],
            ["6", "Games"],
            ["Epic", "Prize pool"],
            ["2", "Days"],
          ].map(([value, label]) => (
            <div key={label} className="space-y-1">
              <p className="editorial-heading text-2xl font-normal">{value}</p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
