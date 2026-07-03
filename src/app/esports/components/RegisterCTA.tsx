"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Gamepad, Trophy, Users, Zap } from "lucide-react";

export default function RegisterCTA() {
  const registrationFormUrl = "https://forms.gle/AD3FkxdYn2jrq77w7";

  return (
    <section id="register" className="scroll-mt-24">
      <Card className="border-border">
        <CardContent className="space-y-8 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="space-y-5">
              <div>
                <p className="tag-editorial mb-2">Registration</p>
                <h2 className="editorial-heading text-3xl font-normal sm:text-4xl">
                  Ready to compete?
                </h2>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Join the showdown on May 10th–11th, 2025. Register now to secure your spot.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: Trophy, label: "Epic prizes" },
                  { icon: Users, label: "Pro competition" },
                  { icon: Gamepad, label: "Multiple games" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 border border-border px-3 py-2 text-sm"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center border border-border">
                <Zap className="h-6 w-6" />
              </div>
              <Button
                size="lg"
                className="w-full sm:w-auto"
                onClick={() => window.open(registrationFormUrl, "_blank")}
              >
                Register now
              </Button>
              <p className="text-xs text-muted-foreground">Limited spots available</p>
            </div>
          </div>
          <div className="border-t border-border pt-4 text-center text-sm text-muted-foreground">
            Registration closes <span className="text-foreground">May 9th, 2025</span> · Event:{" "}
            <span className="text-foreground">May 10th & 11th, 2025</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
