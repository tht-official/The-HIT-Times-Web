"use client";

import { useState } from "react";
import ScheduleComponent from "@/components/formcomponents/tspSchedule";
import { SiteLogo } from "@/components/common/SiteLogo";
import { ArrowRight, Mail, Sparkles, Check, Gift, HelpCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Inter, Space_Grotesk } from "next/font/google";
import {
  PickaxeIcon,
  CameraIcon,
  BeeIcon,
  WolfIcon,
  TrophyIcon,
  GrassBlockIcon,
  QuillIcon,
  PaletteIcon,
  VideoCameraIcon,
  CreeperIcon,
  HeartIcon,
  DiamondIcon,
  CreeperBlock3D,
} from "./pixelIcons";

const inter = Inter({ subsets: ["latin"] });
const space = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

const domains = [
  {
    title: "Content Writing",
    body: "Language is not a barrier — Hindi, English, Bengali, or any other. If you want to write, join in.",
    color: "emerald",
  },
  {
    title: "Graphics Designing",
    body: "Move beyond basic tools into Photoshop and professional design workflows.",
    color: "amber",
  },
  {
    title: "Photography",
    body: "Learn composition and technique, then join us on campus photo walks.",
    color: "cyan",
  },
  {
    title: "Web Development",
    body: "HTML, CSS, JavaScript, and React — from fundamentals to a real-world project.",
    color: "emerald",
  },
  {
    title: "Digital Art",
    body: "Learn digital painting from the ground up and create freely.",
    color: "cyan",
  },
  {
    title: "Video Editing",
    body: "Explore Premiere Pro and craft clips that match the beat and the moment.",
    color: "amber",
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

const domainIcons: Record<string, any> = {
  "Content Writing": QuillIcon,
  "Graphics Designing": ({ className }: { className?: string }) => (
    <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 shrink-0 ${className || ""}`}>
      <Sparkles className="h-5 w-5 text-orange-500" />
    </div>
  ),
  "Graphic Designing": ({ className }: { className?: string }) => (
    <div className={`w-10 h-10 flex items-center justify-center rounded-xl bg-orange-500/10 border border-orange-500/20 shrink-0 ${className || ""}`}>
      <Sparkles className="h-5 w-5 text-orange-500" />
    </div>
  ),
  "Photography": CameraIcon,
  "Web Development": GrassBlockIcon,
  "Digital Art": PaletteIcon,
  "Video Editing": VideoCameraIcon,
};

const domainDetails: Record<string, string[]> = {
  "Content Writing": ["Article & blog writing", "Press releases & club reporting", "Creative fiction & poetry", "Social media copywriting"],
  "Graphics Designing": ["Photoshop & Illustrator fundamentals", "Event poster & banner design", "Brand identity & logo design", "Social media graphic templates"],
  "Photography": ["Composition & lighting basics", "DSLR & mirrorless operation", "Campus photo walk projects", "Lightroom editing workflow"],
  "Web Development": ["HTML, CSS & JavaScript basics", "React component architecture", "Responsive & accessible design", "Deploy a real-world project"],
  "Digital Art": ["Procreate / Krita fundamentals", "Digital painting techniques", "Character & concept art", "Portfolio building"],
  "Video Editing": ["Premiere Pro timeline editing", "Color grading & LUTs", "Motion graphics & transitions", "Campus event highlight reels"],
};

export default function TspPage() {
  const [expandedCourses, setExpandedCourses] = useState<{ [key: string]: boolean }>({});
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [activeTab, setActiveTab] = useState<"rules" | "prizes">("rules");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <div className={`relative -mx-4 -my-3 sm:-mx-6 sm:-my-8 lg:-mx-8 lg:-my-10 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-slate-100 overflow-hidden min-h-screen ${inter.className}`}>

      {/* Inject custom CSS keyframe animations for Minecraft-themed details */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes pixelFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(4deg); }
        }
        @keyframes pixelFloatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(12px) rotate(-4deg); }
        }
        .animate-pixel-float {
          animation: pixelFloat 8s ease-in-out infinite;
        }
        .animate-pixel-float-delayed {
          animation: pixelFloatReverse 9s ease-in-out infinite;
          animation-delay: 2s;
        }
        /* Particle hover effects */
        @keyframes particleRise1 {
          0% { transform: translate(0, 0) scale(0.8) rotate(0deg); opacity: 0; }
          15% { opacity: 0.85; }
          100% { transform: translate(-25px, -55px) scale(0.2) rotate(45deg); opacity: 0; }
        }
        @keyframes particleRise2 {
          0% { transform: translate(0, 0) scale(0.8) rotate(0deg); opacity: 0; }
          15% { opacity: 0.85; }
          100% { transform: translate(25px, -45px) scale(0.2) rotate(-45deg); opacity: 0; }
        }
        @keyframes particleRise3 {
          0% { transform: translate(0, 0) scale(0.8) rotate(0deg); opacity: 0; }
          15% { opacity: 0.85; }
          100% { transform: translate(-10px, -65px) scale(0.2) rotate(90deg); opacity: 0; }
        }
        .group:hover .particle-1 {
          animation: particleRise1 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
        .group:hover .particle-2 {
          animation: particleRise2 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          animation-delay: 0.25s;
        }
        .group:hover .particle-3 {
          animation: particleRise3 1.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
          animation-delay: 0.5s;
        }
      `}} />

      {/* Background Dot Pattern for a subtle geometric feel */}
      <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20"
        style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #94a3b8 1px, transparent 0)', backgroundSize: '24px 24px' }} />

      {/* Subtle Minecraft-Inspired Background floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Floating Diamond (top-left) */}
        <div className="absolute left-[5%] top-[12%] opacity-15 dark:opacity-[0.08] hidden md:block animate-pixel-float">
          <DiamondIcon size={44} />
        </div>
        {/* Floating Heart (top-right) */}
        <div className="absolute right-[6%] top-[25%] opacity-15 dark:opacity-[0.08] hidden md:block animate-pixel-float-delayed">
          <HeartIcon size={40} />
        </div>
        {/* Floating Grass block (mid-left) */}
        <div className="absolute left-[4%] top-[48%] opacity-15 dark:opacity-[0.08] hidden lg:block animate-pixel-float-delayed">
          <GrassBlockIcon size={56} />
        </div>
        {/* Floating Bee (mid-right) */}
        <div className="absolute right-[5%] top-[62%] opacity-15 dark:opacity-[0.08] hidden md:block animate-pixel-float">
          <BeeIcon size={44} />
        </div>
        {/* Floating Pickaxe (bottom-left) */}
        <div className="absolute left-[6%] top-[80%] opacity-15 dark:opacity-[0.08] hidden md:block animate-pixel-float">
          <PickaxeIcon size={44} />
        </div>
        {/* Floating Trophy (bottom-right) */}
        <div className="absolute right-[8%] top-[85%] opacity-15 dark:opacity-[0.08] hidden lg:block animate-pixel-float-delayed">
          <TrophyIcon size={44} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto  space-y-8">

        {/* TOP BANNER */}
        <section className="relative w-full rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-900/5 dark:ring-white/10 group">
          <Image
            src="/image.png"
            alt="Trainee Scholars Program 2026"
            width={1800}
            height={600}
            className="h-auto w-full object-cover"
            priority
          />
        </section>

        {/* HERO SECTION */}
        <section className="relative w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-slate-200 dark:ring-white/10 group">
          <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
            style={{ backgroundImage: "url('/tsp-bg2.png')", opacity: 0.15 }} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50/90 via-slate-50/50 to-slate-50/90 dark:from-[#0a0a0a]/90 dark:via-[#0a0a0a]/60 dark:to-[#0a0a0a]/90" />

          {/* Theme-adapted radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(52,211,153,0.04)_0%,transparent_70%)] pointer-events-none z-0" />

          {/* Theme-adapted pixel grid overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 bg-[linear-gradient(rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(52,211,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,0.03)_1px,transparent_1px)] bg-[size:32px_32px] z-0" />

          {/* Stepped Landscape Block Silhouettes */}
          <div className="absolute bottom-0 left-0 w-64 h-16 pointer-events-none select-none z-0 opacity-20 dark:opacity-10 flex items-end">
            <div className="w-16 h-8 bg-emerald-700/40 dark:bg-emerald-500/20 rounded-none" />
            <div className="w-16 h-12 bg-emerald-600/40 dark:bg-emerald-600/30 rounded-none -ml-4" />
            <div className="w-24 h-16 bg-emerald-500/40 dark:bg-emerald-700/20 rounded-none -ml-4" />
          </div>
          <div className="absolute bottom-0 right-0 w-80 h-20 pointer-events-none select-none z-0 opacity-20 dark:opacity-10 flex items-end justify-end">
            <div className="w-32 h-16 bg-emerald-500/40 dark:bg-emerald-700/20 rounded-none" />
            <div className="w-20 h-12 bg-emerald-600/40 dark:bg-emerald-600/30 rounded-none -mr-4" />
            <div className="w-16 h-6 bg-emerald-700/40 dark:bg-emerald-500/20 rounded-none -mr-4" />
          </div>

          {/* Blueprint coordinate watermark */}
          {/* <div className="absolute right-6 bottom-4 md:right-12 md:bottom-8 pointer-events-none select-none z-0">
            <div className="relative p-3 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.01] border border-dashed border-emerald-600/20 dark:border-emerald-500/10 rounded-xl">
              {/* <CreeperIcon size={160} className="text-emerald-700/15 dark:text-emerald-400/8" /> */}
              {/* <div className="absolute inset-0 border border-dashed border-emerald-600/20 dark:border-emerald-500/10" />
              <div className="absolute top-1/2 left-0 right-0 border-t border-dashed border-emerald-600/20 dark:border-emerald-500/10" />
              <div className="absolute left-1/2 top-0 bottom-0 border-l border-dashed border-emerald-600/20 dark:border-emerald-500/10" />
            </div>
          </div> */}

          {/* Left Floating Isometric Creeper Head */}
          <div className="absolute left-8 xl:left-14 top-[18%] hidden lg:block animate-pixel-float pointer-events-auto cursor-help select-none z-20 group/creeper opacity-90 dark:opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="absolute inset-[-20px] bg-emerald-500/20 dark:bg-emerald-400/25 rounded-full blur-xl opacity-0 group-hover/creeper:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CreeperBlock3D size={120} />
            </div>
          </div>

          {/* Right Floating Isometric Creeper Head */}
          <div className="absolute right-8 xl:right-14 top-[22%] hidden lg:block animate-pixel-float-delayed pointer-events-auto cursor-help select-none z-20 group/creeper opacity-90 dark:opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105">
            <div className="relative">
              <div className="absolute inset-[-20px] bg-emerald-500/20 dark:bg-emerald-400/25 rounded-full blur-xl opacity-0 group-hover/creeper:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <CreeperBlock3D size={120} />
            </div>
          </div>

          {/* Floating Block Fragments - Left */}
          <div className="absolute left-24 top-[35%] hidden xl:block animate-pixel-float-delayed pointer-events-none opacity-40 dark:opacity-25 z-10">
            <div className="w-3.5 h-3.5 bg-emerald-600 dark:bg-emerald-400/40 transform rotate-12 border border-emerald-500/10" />
          </div>
          <div className="absolute left-8 top-[10%] hidden xl:block animate-pixel-float pointer-events-none opacity-30 dark:opacity-20 z-10">
            <div className="w-2.5 h-2.5 bg-emerald-500 dark:bg-emerald-500/30 transform -rotate-12 border border-emerald-400/10" />
          </div>

          {/* Floating Block Fragments - Right */}
          <div className="absolute right-28 top-[15%] hidden xl:block pointer-events-none opacity-40 dark:opacity-25 z-10 animate-pixel-float">
            <div className="w-3.5 h-3.5 bg-emerald-400 dark:bg-emerald-300/40 transform rotate-45 border border-emerald-500/10" />
          </div>
          <div className="absolute right-12 top-[40%] hidden xl:block pointer-events-none opacity-30 dark:opacity-20 z-10 animate-pixel-float-delayed">
            <div className="w-2.5 h-2.5 bg-emerald-700 dark:bg-emerald-600/30 transform -rotate-45 border border-emerald-500/10" />
          </div>

          {/* Stacked Pixel Blocks Corner Decoration - Top Left */}
          <div className="absolute left-5 top-5 hidden md:flex gap-1 items-end pointer-events-none select-none z-10 opacity-40 dark:opacity-20">
            <div className="w-3.5 h-3.5 bg-emerald-600 dark:bg-emerald-600/40 border border-emerald-500/15"></div>
            <div className="w-3.5 h-6 bg-emerald-700 dark:bg-emerald-700/50 border border-emerald-500/15"></div>
            <div className="w-3.5 h-2.5 bg-emerald-500 dark:bg-emerald-500/30 border border-emerald-500/15"></div>
          </div>

          {/* Stacked Pixel Blocks Corner Decoration - Bottom Right */}
          <div className="absolute right-5 bottom-5 hidden md:flex gap-1 items-end pointer-events-none select-none z-10 opacity-40 dark:opacity-20">
            <div className="w-3.5 h-2.5 bg-emerald-500 dark:bg-emerald-500/30 border border-emerald-500/15"></div>
            <div className="w-3.5 h-4.5 bg-emerald-600 dark:bg-emerald-600/40 border border-emerald-500/15"></div>
            <div className="w-3.5 h-3.5 bg-emerald-700 dark:bg-emerald-700/50 border border-emerald-500/15"></div>
          </div>


          <div className="relative z-10 mx-auto max-w-4xl px-6 py-10 md:py-10 text-center flex flex-col items-center justify-center space-y-4">
            <SiteLogo width={200} height={60} className="h-16 w-auto filter dark:invert opacity-90 transition-opacity hover:opacity-100" />

            <div className="space-y-6">
              <p className={`${space.className} text-sm md:text-base font-semibold tracking-[0.2em] text-emerald-700 dark:text-[#4caf50] uppercase`}>
                Trainee Scholars Program
              </p>
              <h1 className={`${space.className} text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]`}>
                Follow your passion.<br />
                Build with <span className="text-emerald-700 dark:text-[#4caf50]">The HIT Times</span>.
              </h1>

              <div className="w-16 h-1.5 bg-emerald-700 dark:bg-[#4caf50] rounded-full mx-auto" />

              <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Your chance to grow in writing, design, photography, development, and more — guided by seniors who have been through placements, productions, and campus life.
              </p>
            </div>

            <Link href="/forms/tsp-form" className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-medium text-white rounded-xl overflow-hidden transition-all bg-emerald-600 dark:bg-[#3a8a3a] hover:bg-emerald-500 dark:hover:bg-[#4caf50] font-bold py-3 px-10 rounded-md transition-all shadow-[inset_0_-4px_0_rgba(0,0,0,0.15)] dark:shadow-[inset_0_-4px_0_rgba(0,0,0,0.4)] hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] dark:hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.4)] hover:translate-y-[2px] disabled:opacity-50 active:shadow-none active:translate-y-[4px]">
              <span className={`${space.className} tracking-wide font-semibold`}>Fill out the form</span>
              <ArrowRight className="h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
              <div className="absolute inset-0 border border-white/20 rounded-xl pointer-events-none" />
            </Link>
          </div>
        </section>

        {/* INTRO SIGN POST */}
        <section className="mx-auto max-w-3xl">
          <div className="relative rounded-2xl bg-white dark:bg-zinc-900 p-8 md:p-10 shadow-lg ring-1 ring-slate-200 dark:ring-white/10 text-center group">
            <div className="space-y-6 text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300">
              <p>
                As the college&apos;s official media and literary club, we promote a creative
                culture on campus and make room for everyone to grow in the field they choose.
                If you have the zeal to learn, we will be your guiding post.
              </p>
              <p>Join us in this adventure and nurture your passion amongst like minds.</p>
              <p className={`${space.className} text-right text-sm font-semibold text-slate-400 dark:text-slate-500 mt-6`}>
                — The HIT Times
              </p>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { val: "6", label: "Domains", desc: "Explore diverse creative fields", color: "text-emerald-500" },
              { val: "MAR", label: "Certificate", desc: "Earn certificates on completion", color: "text-emerald-500" },
              { val: "19", label: "Points System", desc: "Climb the leaderboards", color: "text-emerald-500" },
              { val: "2", label: "Bonus Points", desc: "For consistency", color: "text-emerald-500" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm ring-1 ring-slate-200 dark:ring-white/10 transition-transform hover:-translate-y-1 group relative overflow-hidden">
                {/* Subtle Hover Particles */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-0">
                  <div className="absolute bottom-2 left-1/3 w-1.5 h-1.5 bg-emerald-500/25 opacity-0 particle-1" />
                  <div className="absolute bottom-3 right-1/3 w-1 h-1 bg-emerald-500/25 opacity-0 particle-2" />
                </div>
                <div className={`${space.className} text-4xl font-bold ${stat.color} mb-2 text-emerald-700 dark:text-[#4caf50] z-10`}>{stat.val}</div>
                <div className="text-xs font-semibold tracking-wider text-slate-500 uppercase z-10">{stat.label}</div>
                <div className="text-[11px] text-slate-400 text-center mt-2 z-10">{stat.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* COURSE CATALOG */}
        <section className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className={`${space.className} text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-wide`}>
              What You&apos;ll Explore
            </h2>
            <div className="w-16 h-1 bg-emerald-700 dark:bg-[#4caf50] rounded-full mx-auto" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {domains.map((domain) => {
              const IconComponent = domainIcons[domain.title];
              const bullets = domainDetails[domain.title] || [];

              let particleBg = "";
              let bgAccent = "";
              let textAccent = "";
              let ringHover = "";

              if (domain.color === "emerald") {
                particleBg = "bg-emerald-500/30";
                bgAccent = "bg-emerald-50 dark:bg-emerald-500/5";
                textAccent = "text-emerald-600 dark:text-emerald-400";
                ringHover = "hover:ring-emerald-500/50";
              } else if (domain.color === "amber") {
                particleBg = "bg-amber-500/30";
                bgAccent = "bg-amber-50 dark:bg-amber-500/5";
                textAccent = "text-amber-600 dark:text-amber-400";
                ringHover = "hover:ring-amber-500/50";
              } else {
                particleBg = "bg-cyan-500/30";
                bgAccent = "bg-cyan-50 dark:bg-cyan-500/5";
                textAccent = "text-cyan-600 dark:text-cyan-400";
                ringHover = "hover:ring-cyan-500/50";
              }

              return (
                <div key={domain.title} className={`group relative flex flex-col p-6 md:p-8 bg-white dark:bg-zinc-900 rounded-3xl shadow-sm ring-1 ring-slate-200 dark:ring-white/10 transition-all duration-300 hover:shadow-xl ${ringHover} hover:-translate-y-1 overflow-hidden`}>


                  {/* Subtle Hover Particles */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-0">
                    <div className={`absolute bottom-4 left-1/4 w-1.5 h-1.5 ${particleBg} opacity-0 particle-1`} />
                    <div className={`absolute bottom-6 right-1/3 w-2 h-2 ${particleBg} opacity-0 particle-2`} />
                    <div className={`absolute bottom-8 left-1/2 w-1.5 h-1.5 ${particleBg} opacity-0 particle-3`} />
                  </div>

                  {/* Subtle Geometric Background shape */}
                  <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full ${bgAccent} transition-transform duration-500 group-hover:scale-150`} />

                  <div className="absolute top-6 right-6 text-slate-300 dark:text-slate-700 transition-colors group-hover:text-slate-400 dark:group-hover:text-slate-500">
                    <PickaxeIcon size={24} className="opacity-50" />
                  </div>

                  <div className="relative z-10 flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-2xl ${bgAccent} ring-1 ring-black/5 dark:ring-white/10`}>
                      {IconComponent && <IconComponent size={32} className={textAccent} />}
                    </div>
                    <h3 className={`${space.className} text-lg font-bold text-slate-900 dark:text-white`}>
                      {domain.title}
                    </h3>
                  </div>

                  <p className="relative z-10 text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    {domain.body}
                  </p>

                  <div className="mt-auto relative z-10">
                    <div className="h-px w-full bg-gradient-to-r from-slate-200 dark:from-white/10 to-transparent mb-6" />
                    <ul className="space-y-3">
                      {bullets.map((item) => (
                        <li key={item} className="flex items-start gap-3 text-xs md:text-sm text-slate-600 dark:text-slate-300">
                          <Check className={`h-4 w-4 shrink-0 mt-0.5 ${textAccent}`} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* RULES AND PRIZES TABS SECTION */}
        <section className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-lg ring-1 ring-slate-200 dark:ring-white/10 overflow-hidden group relative">
            <div className="flex border-b border-slate-200 dark:border-white/10">
              <button
                onClick={() => setActiveTab("rules")}
                className={`flex-1 py-5 text-sm font-semibold transition-colors ${activeTab === "rules"
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/5"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <HelpCircle className="h-4 w-4" />
                  <span className={space.className}>Rules & Guidelines</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("prizes")}
                className={`flex-1 py-5 text-sm font-semibold transition-colors ${activeTab === "prizes"
                  ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/5"
                  : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/5"
                  }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <Gift className="h-4 w-4" />
                  <span className={space.className}>Recognition & Rewards</span>
                </div>
              </button>
            </div>

            <div className="p-8 md:p-10">
              {activeTab === "rules" && (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {rules.map((rule, idx) => (
                    <li key={idx} className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50 dark:bg-zinc-800/50 ring-1 ring-slate-200 dark:ring-white/5 hover:ring-emerald-500/30 transition-shadow group relative overflow-hidden">
                      <span className={`${space.className} flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-bold shrink-0 mt-0.5 z-10`}>
                        {idx + 1}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed z-10">{rule}</span>
                    </li>
                  ))}
                </ul>
              )}

              {activeTab === "prizes" && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-amber-50 dark:bg-amber-500/5 ring-1 ring-amber-200 dark:ring-amber-500/20 group relative overflow-hidden">
                    <div className="p-4 bg-white dark:bg-amber-500/10 rounded-full shadow-sm mb-4 z-10">
                      <TrophyIcon size={40} className="text-amber-500" />
                    </div>
                    <h4 className={`${space.className} text-lg font-bold text-amber-700 dark:text-amber-400 mb-2 z-10`}>Top Performers</h4>
                    <p className="text-sm text-amber-900/70 dark:text-amber-200/70 z-10">
                      Top participants are awarded based on performance across the program.
                    </p>
                  </div>

                  <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl bg-cyan-50 dark:bg-cyan-500/5 ring-1 ring-cyan-200 dark:ring-cyan-500/20 group relative overflow-hidden">
                    <div className="p-4 bg-white dark:bg-cyan-500/10 rounded-full shadow-sm mb-4 z-10">
                      <Check className="h-10 w-10 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <h4 className={`${space.className} text-lg font-bold text-cyan-700 dark:text-cyan-400 mb-2 z-10`}>MAR Certificates</h4>
                    <p className="text-sm text-cyan-900/70 dark:text-cyan-200/70 z-10">
                      All participants receive official certificates upon successful completion.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SCHEDULE COMPONENT */}
        <section className="pt-8 space-y-10">
          <div className="text-center space-y-4">
            <h2 className={`${space.className} text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-wide`}>
              Active Class Schedules
            </h2>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto" />
          </div>

          <div className="max-w-6xl mx-auto">
            <ScheduleComponent
              expandedCourses={expandedCourses}
              setExpandedCourses={setExpandedCourses}
            />
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="flex justify-center pt-10 pb-4">
          <Link href="/forms/tsp-form" className="group/btn relative inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-medium text-white rounded-xl overflow-hidden transition-all bg-emerald-600 dark:bg-[#3a8a3a] hover:bg-emerald-500 dark:hover:bg-[#4caf50] font-bold py-3 px-10 rounded-md transition-all shadow-[inset_0_-4px_0_rgba(0,0,0,0.15)] dark:shadow-[inset_0_-4px_0_rgba(0,0,0,0.4)] hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.15)] dark:hover:shadow-[inset_0_-2px_0_rgba(0,0,0,0.4)] hover:translate-y-[2px] disabled:opacity-50 active:shadow-none active:translate-y-[4px]">
            <span className={`${space.className} font-bold`}>Apply Now to Join</span>
            <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
            <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />
          </Link>
        </section>

      </div>
    </div>
  );
}
