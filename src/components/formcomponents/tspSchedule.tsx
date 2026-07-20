"use client";

import { ChevronDown, ChevronUp, Globe, MapPin, Calendar as CalendarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import cwCalendar from "../calendarComponents/cwCalendar";
import DevCalendar from "../calendarComponents/devCalendar";
import gdCalendar from "../calendarComponents/gdCalendar";
import photographyCalendar from "../calendarComponents/photographyCalendar";
import videoEditingCalendar from "../calendarComponents/videoEditingCalendar";
import digitalArtCalendar from "../calendarComponents/digitalArtCalendar";

interface CourseDay {
  date: string;
  title: string;
  description?: string;
  isOnline: boolean;
}

interface Course {
  title: string;
  description: string;
  calendar: any;
  days: CourseDay[];
}

const courses: Course[] = [
  {
    title: "Content Writing",
    description: "Master the art of writing compelling content across different formats",
    calendar: cwCalendar,
    days: [
      { date: "1st August 2026", title: "Sentence Structure and Composition", description: "Sentence elements, types of sentences, grammatical accuracy, common errors, clarity, paragraph division and flow.", isOnline: false },
      { date: "2nd August 2026", title: "Technical Writing", description: "Professional Emails, Letters, Research Paper, Credible Source, Format & Tonning.(Last 30 minutes about SE & ethical AI usage)", isOnline: false },
      { date: "8th August 2026", title: "Character & Story Development", description: "Character creation, dialogue writing, world-building, themes, symbolism, and storytelling techniques.", isOnline: false },
      { date: "9th August 2026", title: "Poetry Writing", description: "Poetic forms, rhythm and meter, imagery, symbolism, emotional expression, and creative exercises.", isOnline: false },
    ],
  },
  {
    title: "Digital Art",
    description: "Learn digital art from basics to advanced techniques",
    calendar: digitalArtCalendar,
    days: [
      { date: "1st August 2026", title: "Strong Foundation & Traditional Art Basics", description: "Drawing fundamental shapes (circles,spheres,cones,cylinders,boxes), understanding structure and perspective.", isOnline: false },
      { date: "2rd August 2026", title: "Human Anatomy in Art", description: "Proportions, skeletal structure, muscle groups, and capturing realistic poses.", isOnline: false },
      { date: "4th August 2026", title: "Software Introduction", description: "Learning the basics of digital drawing software. (Ibis PaintX, Autodesk Sketchbook, Krita) for both mobile and PC. Mastering the Tools&Digital Scrapbooks-Advanced tool usage and creating digital sketch books for creative exploration.", isOnline: true },
      { date: "5th August 2026", title: "Colouring & Texture Basics", description: "Understanding colour theory and texture.", isOnline: true },
      { date: "6th August 2026", title: "Lighting & Shading", description: "Different types of art works(Comic Style etc)/Genre", isOnline: true },
      { date: "8th August 2026", title: "Editing & Post-Processing & Selling Your Art", description: "Refining artwork and monetization strategies.Story telling in Art & Basic Animation Fundamentals with planning, framing and post processing. Assignments will be given to enhance learning and practice", isOnline: false },
      { date: "9th August 2026", title: "Extras", description: "Doubt class + rest of animation", isOnline: false },
    ],
  },
  {
    title: "Video Editing",
    description: "Master video editing from basics to advanced techniques across CapCut, Premiere Pro, After Effects, and Blender",
    calendar: videoEditingCalendar,
    days: [
      {
        date: "30th July 2026",
        title: "Day 0 · Software Installation",
        description: "• Basic (CapCut): Software installations across all devices\n• Advance (Premiere Pro, After Effects, Blender, Media Encoder & plugins): Software installations\n(Pre-requisite for Advance: Laptop with min. 8GB RAM, graphics card & basic video editing knowledge)",
        isOnline: true,
      },
      {
        date: "1st August 2026",
        title: "Day 1 · Basics & Interface",
        description: "• Basic: Getting started with interface and basic tools\n• Advance: Basics of Premiere Pro & After Effects and working with dynamic link",
        isOnline: false,
      },
      {
        date: "2nd August 2026",
        title: "Day 2 · Cinematography, Masking & Tracking",
        description: "• Basic: Cinematography / video recording (framing, composition, colour grading)\n• Advance: Masking, tracking (Mocha included), blending modes, rotoscoping and cinematography",
        isOnline: false,
      },
      {
        date: "3rd August 2026",
        title: "Day 3 · Speed Ramping & Colour Correction",
        description: "• Basic: Speed ramping, digital stabilization, keyframing and custom animation\n• Advance: Colour correction and grading (basic to advance)",
        isOnline: true,
      },
      {
        date: "4th August 2026",
        title: "Day 4 · Motion Graphics & Audio Editing",
        description: "• Basic: Advance colour grading and audio editing\n• Advance: Motion graphics (graphs), typography, animations and a mini project",
        isOnline: true,
      },
      {
        date: "5th August 2026",
        title: "Day 5 · Social Media Editing & Blender Intro",
        description: "• Basic: Editing for social media, working with projects\n• Advance: Blender (Basic introduction, object manipulation, editing & modeling, material & lighting, textures)",
        isOnline: true,
      },
      {
        date: "6th August 2026",
        title: "Day 6 · Masterclass & Blender VFX",
        description: "• Basic: Social media masterclass and guest lecture\n• Advance: Blender (Camera & rendering, basic environment creation, green screen composition, VFX on real footages)",
        isOnline: true,
      },
    ],
  },
  {
    title: "Web Development",
    description: "Complete web development from basics to deployment",
    calendar: DevCalendar,
    days: [
      { date: "1st August 2026", title: "Javascript foundation to advance", description: "Variables and data types, Operators, Loops, Arrays, Function, Callback and Async await. ", isOnline: false },
      { date: "2nd August 2026", title: "Node js/Express js", description: "Express js, Routing, Middlewares, Form handling, session and cookies and Mongo db.", isOnline: false },
      { date: "4rd August 2026", title: "React Fundamentals", description: "Why React, Setting up React, JSX, Props, States and Event Handling.", isOnline: true },
      { date: "6th August 2026", title: "React Applied", description: "React Router, Fetching Backend Data and Crud Integration", isOnline: true },
      { date: "8th August 2026", title: "Backend", description: "Authentication & Authorization, Folder Structure and Multer.", isOnline: false },
      { date: "9th August 2026", title: "Project", description: "Project initialization and completion.", isOnline: false },
    ],
  },
  {
    title: "Photography",
    description: "Learn photography from basics to advanced techniques",
    calendar: photographyCalendar,
    days: [
      { date: "1st August 2026", title: "Introduction to Photography", description: "Camera types and gear Parts of a camera Exposure Triangle (ISO, Aperture, Shutter Speed) Camera modes (Auto, Program, Aperture Priority, Shutter Priority, Manual) Small practical exercises", isOnline: false },
      { date: "2nd August 2026", title: "Creative Photography Techniques", description: "Basic composition (Rule of Thirds, Leading Lines, Framing) Focusing modes (AF-S, AF-C, Manual Focus) White Balance Metering modes Depth of Field Perspective and camera angles Lighting basics (Natural & Artificial Light) Portrait and street photography basics Hands-on practice", isOnline: false },
      { date: "8th August 2026", title: " Editing & Photography Genres", description: "Introduction to photo editing (Lightroom/Snapseed) Basic editing workflow (Exposure, Contrast, Color, Crop) Color grading basics Different photography genres: Portrait, Landscape", isOnline: false },
      { date: "9th August 2026", title: "Photo Walk  (Practical Session)", description: "Camera settings in real-life situations Finding light and compositions Portrait practice Street photography practice Nature/details and architecture shots Instructor feedback during the walk", isOnline: false },
    ],
  },
  {
    title: "Graphic Designing",
    description: "Master graphic design tools and techniques",
    calendar: gdCalendar,
    days: [
      { date: "1st August 2026", title: "Introduction to Graphic Design", description: "Types, software, careers, freelancing and internships. Vector art VS Raster art, Canvas basics, Color theory & Typography.", isOnline: false },
      { date: "2nd August 2026", title: "Shellioute and Poster Design", description: "Shellioute design, Poster Design using Canva.", isOnline: false },
      { date: "3rd August 2026", title: "Illustrator Basics", description: "Illustrator interface, brushes", isOnline: true },
      { date: "6th August 2026", title: "Photoshop Techniques", description: "Masking, selection, and blending.", isOnline: true },
      { date: "8th August 2026", title: "Product Designing", description: "Practical design projects.", isOnline: false },
      { date: "9th August 2026", title: "Final Projects", description: "Assignments and final tasks.", isOnline: false },
    ],
  },
];

const accentMap: Record<string, { ring: string; border: string; bg: string; text: string; iconBg: string; activeBg: string }> = {
  "Content Writing": { ring: "ring-emerald-200 dark:ring-emerald-900/50", border: "border-emerald-200 dark:border-emerald-900/50", bg: "bg-emerald-50/50 dark:bg-emerald-950/20", text: "text-emerald-600 dark:text-emerald-400", iconBg: "bg-emerald-100 dark:bg-emerald-500/20", activeBg: "bg-emerald-50 dark:bg-emerald-900/20" },
  "Digital Art": { ring: "ring-cyan-200 dark:ring-cyan-900/50", border: "border-cyan-200 dark:border-cyan-900/50", bg: "bg-cyan-50/50 dark:bg-cyan-950/20", text: "text-cyan-600 dark:text-cyan-400", iconBg: "bg-cyan-100 dark:bg-cyan-500/20", activeBg: "bg-cyan-50 dark:bg-cyan-900/20" },
  "Video Editing": { ring: "ring-amber-200 dark:ring-amber-900/50", border: "border-amber-200 dark:border-amber-900/50", bg: "bg-amber-50/50 dark:bg-amber-950/20", text: "text-amber-600 dark:text-amber-400", iconBg: "bg-amber-100 dark:bg-amber-500/20", activeBg: "bg-amber-50 dark:bg-amber-900/20" },
  "Web Development": { ring: "ring-emerald-200 dark:ring-emerald-900/50", border: "border-emerald-200 dark:border-emerald-900/50", bg: "bg-emerald-50/50 dark:bg-emerald-950/20", text: "text-emerald-600 dark:text-emerald-400", iconBg: "bg-emerald-100 dark:bg-emerald-500/20", activeBg: "bg-emerald-50 dark:bg-emerald-900/20" },
  "Photography": { ring: "ring-cyan-200 dark:ring-cyan-900/50", border: "border-cyan-200 dark:border-cyan-900/50", bg: "bg-cyan-50/50 dark:bg-cyan-950/20", text: "text-cyan-600 dark:text-cyan-400", iconBg: "bg-cyan-100 dark:bg-cyan-500/20", activeBg: "bg-cyan-50 dark:bg-cyan-900/20" },
  "Graphic Designing": { ring: "ring-amber-200 dark:ring-amber-900/50", border: "border-amber-200 dark:border-amber-900/50", bg: "bg-amber-50/50 dark:bg-amber-950/20", text: "text-amber-600 dark:text-amber-400", iconBg: "bg-amber-100 dark:bg-amber-500/20", activeBg: "bg-amber-50 dark:bg-amber-900/20" },
};

/** Single collapsible course card with smooth animation and click-outside. */
function CourseCard({
  course,
  isExpanded,
  onToggle,
  onClickOutside,
}: {
  course: Course;
  isExpanded: boolean;
  onToggle: () => void;
  onClickOutside: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const accent = accentMap[course.title] ?? accentMap["Content Writing"];

  useEffect(() => {
    if (!isExpanded) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClickOutside();
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isExpanded, onClickOutside]);

  return (
    <div
      ref={ref}
      id={`schedule-${course.title.toLowerCase().replace(/\s+/g, "-")}`}
      className={`flex flex-col bg-white dark:bg-zinc-950 rounded-2xl transition-all duration-300 overflow-hidden relative group ${isExpanded ? "ring-2 " + accent.ring + " shadow-md" : "ring-1 ring-slate-200 dark:ring-slate-800 hover:shadow-md"}`}
    >
      <button
        onClick={onToggle}
        className={`w-full text-left px-5 py-5 transition-colors ${isExpanded ? accent.activeBg : "hover:bg-slate-50 dark:hover:bg-zinc-900"}`}
      >
        <div className="flex justify-between items-center gap-4">
          <div className="space-y-1">
            <h3 className={`text-base font-bold tracking-wide ${accent.text}`}>
              {course.title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">
              {course.description}
            </p>
          </div>
          <div className={`p-2 rounded-full shrink-0 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""} ${accent.iconBg}`}>
            <ChevronDown className={`h-5 w-5 ${accent.text}`} />
          </div>
        </div>
      </button>

      {/* Smooth expand/collapse via grid transition */}
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="p-5 space-y-4">

            {/* Calendar list */}
            <div className="space-y-4">
              {course.days.map((day, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-xl bg-white dark:bg-zinc-950 ring-1 ring-slate-200 dark:ring-slate-800 transition-colors hover:ring-slate-300 dark:hover:ring-slate-700"
                >
                  <div className="flex flex-col items-center gap-1 shrink-0 mt-1">
                    <div className={`p-1.5 rounded-full ${accent.iconBg}`}>
                      <CalendarIcon className={`h-4 w-4 ${accent.text}`} />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">
                        {day.title}
                      </h4>
                      <span
                        title={day.isOnline ? "Online" : "On campus"}
                        className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 ${day.isOnline
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                          }`}
                      >
                        {day.isOnline ? <Globe className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                        <span className="hidden sm:inline">{day.isOnline ? "Online" : "On Campus"}</span>
                      </span>
                    </div>
                    <p className={`text-xs font-bold mb-2 ${accent.text}`}>
                      {day.date}
                    </p>
                    {day.description && (
                      <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-line">
                        {day.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Calendar component if present */}
            {course.calendar && (
              <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
                <div className="bg-white dark:bg-zinc-950 rounded-xl p-4 ring-1 ring-slate-200 dark:ring-slate-800 overflow-x-auto">
                  <course.calendar />
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScheduleComponent({
  expandedCourses,
  setExpandedCourses,
}: {
  expandedCourses?: Record<string, boolean>;
  setExpandedCourses?: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
}) {
  const [localExpanded, setLocalExpanded] = useState<Record<string, boolean>>({});

  const expanded = expandedCourses ?? localExpanded;
  const setExpanded = setExpandedCourses ?? setLocalExpanded;

  const toggle = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const collapse = (title: string) => {
    setExpanded((prev) => ({ ...prev, [title]: false }));
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start">
      {courses.map((course) => (
        <CourseCard
          key={course.title}
          course={course}
          isExpanded={!!expanded[course.title]}
          onToggle={() => toggle(course.title)}
          onClickOutside={() => collapse(course.title)}
        />
      ))}
    </div>
  );
}
