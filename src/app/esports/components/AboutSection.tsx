"use client";

import { Calendar, Clock, MapPin } from "lucide-react";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 space-y-8">
      <div className="space-y-2">
        <p className="tag-editorial">About</p>
        <h2 className="editorial-heading text-3xl font-normal sm:text-4xl">The event</h2>
      </div>
      <div className="section-divider" />
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            The HIT Times presents the season&apos;s grandest e-sports event — where speed meets
            strategy and legends are made.
          </p>
          <p>
            Teams battle across multiple titles. Build your strategies, feel the intensity, and
            compete for glory and prizes.
          </p>
          <p>MAR certificates will be awarded to all HIT participants.</p>
          <div className="flex flex-wrap gap-4 pt-2">
            {[
              { icon: Calendar, text: "May 10th–11th, 2025" },
              { icon: MapPin, text: "HIT Campus" },
              { icon: Clock, text: "9:30 AM onwards" },
            ].map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 border border-border px-3 py-2 text-sm text-foreground"
              >
                <Icon className="h-4 w-4 text-muted-foreground" />
                {text}
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden border border-border">
          <Image
            src="https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=800&q=80"
            alt="Esports tournament"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
