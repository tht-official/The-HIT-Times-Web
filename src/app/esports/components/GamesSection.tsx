"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import Image from "next/image";

const games = [
  {
    name: "VALORANT",
    image: "https://images.unsplash.com/photo-1580327344181-c1163234e5a0?auto=format&fit=crop&w=600&q=80",
    description: "5v5 tactical shooter with precise gunplay and unique agent abilities.",
    format: "Team-based",
    teamSize: "5v5",
  },
  {
    name: "BGMI",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=600&q=80",
    description: "Battle royale where strategy and survival determine the last team standing.",
    format: "Battle Royale",
    teamSize: "4-player squad",
  },
  {
    name: "Call of Duty",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=600&q=80",
    description: "Fast-paced action with cutting-edge weapons and team-based objectives.",
    format: "Team-based",
    teamSize: "4v4",
  },
  {
    name: "FIFA",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?auto=format&fit=crop&w=600&q=80",
    description: "Football simulation with realistic gameplay.",
    format: "1v1 Tournament",
    teamSize: "Individual",
  },
  {
    name: "FreeFire",
    image: "https://i.scdn.co/image/ab67616d00001e02c72fc87f92c0e770bcc25ce7",
    description: "Battle royale squad competition.",
    format: "Battle Royale",
    teamSize: "4-player squad",
  },
  {
    name: "eFootball",
    image: "https://preview.redd.it/efootball-2025-v0-k74zlrturfad1.jpeg?auto=webp&s=c54252a4b3f1b2a079433d4feefaf9e47c5c5a9c",
    description: "Mobile football simulation tournament.",
    format: "1v1 Tournament",
    teamSize: "Individual",
  },
];

export default function GamesSection() {
  return (
    <section id="games" className="scroll-mt-24 space-y-8">
      <div className="space-y-4 text-center">
        <p className="tag-editorial">Titles</p>
        <h2 className="editorial-heading text-3xl font-normal sm:text-4xl">Featured games</h2>
        <div className="inline-flex items-center gap-2 border border-border px-4 py-2 text-sm">
          <Trophy className="h-4 w-4" />
          <span>Total prize pool: ₹XX,999</span>
        </div>
        <p className="mx-auto max-w-2xl text-sm text-muted-foreground">
          Individual game prizes to be announced at the event.
        </p>
      </div>
      <div className="section-divider" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <Card key={game.name} className="overflow-hidden border-border">
            <div className="relative aspect-[16/10] border-b border-border">
              <Image src={game.image} alt={game.name} fill className="object-cover" />
            </div>
            <CardHeader className="pb-2">
              <p className="tag-editorial">{game.name}</p>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>{game.description}</p>
              <p>
                <span className="text-foreground">Format:</span> {game.format}
              </p>
              <p>
                <span className="text-foreground">Team size:</span> {game.teamSize}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
