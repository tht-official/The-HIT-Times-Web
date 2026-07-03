"use client";

import ScheduleComponent from "@/components/formcomponents/tspSchedule";
import { SiteLogo } from "@/components/common/SiteLogo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const domains = [
  {
    title: "Content Writing",
    body: "Language is not a barrier — Hindi, English, Bengali, or any other. If you want to write, join in.",
  },
  {
    title: "Graphics Designing",
    body: "Move beyond basic tools into Photoshop and professional design workflows.",
  },
  {
    title: "Photography",
    body: "Learn composition and technique, then join us on campus photo walks.",
  },
  {
    title: "Web Development",
    body: "HTML, CSS, JavaScript, and React — from fundamentals to a real-world project.",
  },
  {
    title: "Digital Art",
    body: "Learn digital painting from the ground up and create freely.",
  },
  {
    title: "Video Editing",
    body: "Explore Premiere Pro and craft clips that match the beat and the moment.",
  },
];

const rules = [
  "We mark the best efforts across all domains, not just the flashiest final piece.",
  "Each session you attend earns 2 additional points.",
  "Each completed task is scored out of 10: satisfactory delivery (2), documentation (5), creative initiative (3).",
  "A 5-meeting attendance streak earns a 5-point bonus.",
  "Effective participation during sessions can earn an extra point per meet.",
  "Prizes are alluring, but the journey matters — compete with curiosity, not just the podium.",
];

export default function TspPage() {
  return (
    <div className="animate-in-subtle space-y-16">
      <section className="space-y-8">
        <div className="overflow-hidden border border-border">
          <Image
            src="/tsp-banner-2025.png"
            alt="Trainee Scholars Program 2025"
            width={1600}
            height={500}
            className="h-auto w-full object-cover"
            priority
          />
        </div>

        <div className="mx-auto max-w-3xl space-y-6 text-center">
          <SiteLogo width={180} height={52} className="mx-auto h-14 w-auto sm:h-16" />
          <div className="space-y-3">
            <p className="tag-editorial">Trainee Scholars Program</p>
            <h1 className="editorial-heading text-balance text-3xl font-normal sm:text-4xl lg:text-5xl">
              Follow your passion. Build with The HIT Times.
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            The Trainee Scholars Program is your chance to grow in writing, design,
            photography, development, and more — guided by seniors who have been through
            placements, productions, and campus life.
          </p>
          <Button asChild size="lg">
            <Link href="/forms/tsp-form">
              Fill out the form
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-3xl space-y-6">
        <div className="section-divider" />
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            As the college&apos;s official media and literary club, we promote a creative
            culture on campus and make room for everyone to grow in the field they choose.
            If you have the zeal to learn, we will be your guiding post.
          </p>
          <p>Join us in this adventure and nurture your passion amongst like minds.</p>
          <p className="editorial-heading text-right text-base text-foreground">
            — The HIT Times
          </p>
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-end justify-between gap-4">
          <h2 className="editorial-heading text-2xl font-normal sm:text-3xl">Domains</h2>
        </div>
        <div className="section-divider" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {domains.map((domain) => (
            <Card key={domain.title} className="border-border">
              <CardHeader className="border-b border-border pb-4">
                <p className="tag-editorial">{domain.title}</p>
              </CardHeader>
              <CardContent className="pt-4 text-sm leading-relaxed text-muted-foreground">
                {domain.body}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-6">
          <h2 className="editorial-heading text-2xl font-normal sm:text-3xl">Rules</h2>
          <div className="section-divider" />
          <ul className="space-y-4 text-sm leading-relaxed text-muted-foreground">
            {rules.map((rule) => (
              <li key={rule} className="border-l border-border pl-4">
                {rule}
              </li>
            ))}
          </ul>
        </div>

        <Card className="border-border">
          <CardHeader className="border-b border-border">
            <p className="tag-editorial">Prizes</p>
            <h3 className="editorial-heading text-2xl font-normal">Recognition & rewards</h3>
          </CardHeader>
          <CardContent className="space-y-4 pt-6 text-sm text-muted-foreground">
            <p>
              Top participants are awarded based on performance across the program.
            </p>
            <div className="border border-border px-5 py-4 text-center">
              <p className="editorial-heading text-xl font-normal text-foreground">Winner</p>
            </div>
            <p>
              All participants receive <strong className="text-foreground">MAR certificates</strong> upon
              successful completion.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-8">
        <div className="space-y-2 text-center">
          <p className="tag-editorial">Schedule</p>
          <h2 className="editorial-heading text-2xl font-normal sm:text-3xl">Course catalog</h2>
        </div>
        <ScheduleComponent />
      </section>

      <div className="flex justify-center border-t border-border pt-10">
        <Button asChild size="lg">
          <Link href="/forms/tsp-form">
            Apply now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
