"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Trophy, Users } from "lucide-react";
import Image from "next/image";

const tournaments = [
  {
    name: "Valorant Championship",
    time: "To be announced",
    prize: "To be announced",
    teamSize: "5v5",
    registrationFee: "₹79 per person",
    image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "BGMI Showdown",
    time: "To be announced",
    prize: "To be announced",
    teamSize: "4-player squad",
    registrationFee: "₹59 per person",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "COD M Masters",
    time: "To be announced",
    prize: "To be announced",
    teamSize: "4v4",
    registrationFee: "₹59 per person",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "FIFA Tournament",
    time: "To be announced",
    prize: "To be announced",
    teamSize: "1v1",
    registrationFee: "₹49 per person",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=600&q=80",
  },
  {
    name: "eFootball Mobile",
    time: "To be announced",
    prize: "To be announced",
    teamSize: "1v1",
    registrationFee: "₹59 per person",
    image: "https://preview.redd.it/efootball-2025-v0-k74zlrturfad1.jpeg?auto=webp&s=c54252a4b3f1b2a079433d4feefaf9e47c5c5a9c",
  },
  {
    name: "FreeFire MAX",
    time: "To be announced",
    prize: "To be announced",
    teamSize: "4-player squad",
    registrationFee: "₹59 per person",
    image: "https://i.scdn.co/image/ab67616d00001e02c72fc87f92c0e770bcc25ce7",
  },
];

export default function ScheduleSection() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="schedule" className="scroll-mt-24 space-y-8">
      <div className="space-y-3 text-center">
        <p className="tag-editorial">Schedule</p>
        <h2 className="editorial-heading text-3xl font-normal sm:text-4xl">Tournament lineup</h2>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
          May 10th–11th, 2025 at HIT Auditorium. Come prepared to compete.
        </p>
      </div>
      <div className="section-divider" />
      <div className="space-y-4">
        {tournaments.map((tournament) => (
          <Card key={tournament.name} className="border-border">
            <CardContent className="space-y-4 p-5 sm:p-6">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-border">
                    <Image src={tournament.image} alt={tournament.name} fill className="object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium">{tournament.name}</h3>
                    <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-3.5 w-3.5" />
                      {tournament.time}
                    </p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="border border-border px-3 py-2 text-sm">
                    <p className="text-xs text-muted-foreground">Prize</p>
                    <p className="flex items-center gap-1.5 font-medium">
                      <Trophy className="h-3.5 w-3.5" />
                      {tournament.prize}
                    </p>
                  </div>
                  <div className="border border-border px-3 py-2 text-sm">
                    <p className="text-xs text-muted-foreground">Team size</p>
                    <p className="flex items-center gap-1.5 font-medium">
                      <Users className="h-3.5 w-3.5" />
                      {tournament.teamSize}
                    </p>
                  </div>
                  <div className="border border-border px-3 py-2 text-sm">
                    <p className="text-xs text-muted-foreground">Fee</p>
                    <p className="font-medium">{tournament.registrationFee}</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => scrollToSection("register")}>
                Register
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Registration closes May 9th, 2025.
        </p>
        <Button className="mt-4" variant="outline" onClick={() => scrollToSection("rules")}>
          View full rules
        </Button>
      </div>
    </section>
  );
}
