import { ChevronDown, ChevronUp, Globe, MapPin } from "lucide-react";
import { useState } from "react";
import cwCalendar from "../calendarComponents/cwCalendar";
import DevCalendar from "../calendarComponents/devCalendar";
import gdCalendar from "../calendarComponents/gdCalendar";
import photographyCalendar from "../calendarComponents/photographyCalendar";
import videoEditingCalendar from "../calendarComponents/videoEditingCalendar";
import digitalArtCalendar from "../calendarComponents/digitalArtCalendar";
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface CourseDay {
  date: string
  title: string
  description?: string
  isOnline: boolean
}

interface Course {
  title: string
  description: string
  calendar: any
  days: CourseDay[]
}

const courses: Course[] = [
  {
    title: "Content Writing",
    description: "Master the art of writing compelling content across different formats",
    calendar: cwCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Sentence Structure and Composition",
        description:
          "Sentence elements, types of sentences, grammatical accuracy, common errors, clarity, paragraph division and flow.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "Research Writing",
        description: "Research paper structure, credible sources and presentation techniques.",
        isOnline: false,
      },
      {
        date: "3rd March 2025",
        title: "Outline & Storyline Development",
        description: "Plot structures, character arcs, engaging openings, conflict and resolution.",
        isOnline: true,
      },
      {
        date: "4th March 2025",
        title: "Technical Writing",
        description: "Professional emails, formal and business letters, report writing, formatting, tone, and clarity.",
        isOnline: true,
      },
      {
        date: "8th March 2025",
        title: "Character & Story Development",
        description:
          "Character creation, dialogue writing, world-building, themes, symbolism, and storytelling techniques.",
        isOnline: false,
      },
      {
        date: "9th March 2025",
        title: "Poetry Writing",
        description:
          "Poetic forms, rhythm and meter, imagery, symbolism, emotional expression, and creative exercises.",
        isOnline: false,
      },
    ],
  },
  {
    title: "Digital Art",
    description: "Learn digital art from basics to advanced techniques",
    calendar: digitalArtCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Strong Foundation",
        description: "Drawing fundamental shapes, understanding structure, and perspective.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "Software Introduction",
        description: "Learning the basics of digital drawing software.",
        isOnline: false,
      },
      {
        date: "3rd March 2025",
        title: "Human Anatomy in Art",
        description: "Proportions, skeletal structure, muscle groups, and capturing realistic poses.",
        isOnline: true,
      },
      {
        date: "4th March 2025",
        title: "Mastering the Tools",
        description: "Advanced tool usage and creating digital sketchbooks.",
        isOnline: true,
      },
      {
        date: "5th March 2025",
        title: "Colouring & Texture Basics",
        description: "Understanding colour theory and texture.",
        isOnline: true,
      },
      {
        date: "6th March 2025",
        title: "Lighting & Shading",
        description: "Genre Selection and advanced techniques.",
        isOnline: true,
      },
      {
        date: "8th March 2025",
        title: "Editing & Post-Processing",
        description: "Refining artwork and monetization strategies.",
        isOnline: false,
      },
      {
        date: "9th March 2025",
        title: "Storytelling in Art",
        description: "Basic Animation Fundamentals with planning.",
        isOnline: false,
      },
    ],
  },
  {
    title: "Video Editing",
    description: "Master video editing with industry-standard tools",
    calendar: videoEditingCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Installation & Setup",
        description: "Software installation and workspace setup.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "Introduction to Video Editing",
        description: "Basics of editing and interface.",
        isOnline: false,
      },
      {
        date: "3rd March 2025",
        title: "Keyframing & Transitions",
        description: "Smooth animations and creative edits.",
        isOnline: true,
      },
      {
        date: "4th March 2025",
        title: "Text & Colour Grading",
        description: "Text animation and visual enhancement.",
        isOnline: true,
      },
      {
        date: "5th March 2025",
        title: "Speed Ramping",
        description: "Cinematic motion and advanced tools.",
        isOnline: true,
      },
      {
        date: "6th March 2025",
        title: "Audio Designing",
        description: "Sound editing and project completion.",
        isOnline: true,
      },
    ],
  },
  {
    title: "Web Development",
    description: "Complete web development from basics to deployment",
    calendar: DevCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Setup & HTML",
        description: "Web structure, tags, and forms.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "CSS & Responsive Design",
        description: "Flexbox, Grid, and webpage styling.",
        isOnline: true,
      },
      {
        date: "3rd March 2025",
        title: "JavaScript",
        description: "JS fundamentals and React setup.",
        isOnline: true,
      },
      {
        date: "4th March 2025",
        title: "React Fundamentals",
        description: "Core concepts of React.",
        isOnline: true,
      },
      {
        date: "5th March 2025",
        title: "React Advanced",
        description: "Advanced React concepts.",
        isOnline: true,
      },
      {
        date: "6th March 2025",
        title: "Project Design",
        description: "Creating the design of the project.",
        isOnline: true,
      },
      {
        date: "8th March 2025",
        title: "API Integration",
        description: "Fetching and displaying data from APIs.",
        isOnline: false,
      },
      {
        date: "9th March 2025",
        title: "Deployment",
        description: "Final touches and deployment on Vercel.",
        isOnline: false,
      },
    ],
  },
  {
    title: "Photography",
    description: "Learn photography from basics to advanced techniques",
    calendar: photographyCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Photography Basics",
        description: "ISO triangle, composition, and various genres.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "Advanced Concepts",
        description: "Colour theory and communication skills.",
        isOnline: false,
      },
      {
        date: "8th March 2025",
        title: "Photo Walk Day 1",
        description: "Practical application and hands-on experience.",
        isOnline: false,
      },
      {
        date: "9th March 2025",
        title: "Photo Walk Day 2",
        description: "Continued practical shooting experience.",
        isOnline: false,
      },
    ],
  },
  {
    title: "Graphic Designing",
    description: "Master graphic design tools and techniques",
    calendar: gdCalendar,
    days: [
      {
        date: "1st March 2025",
        title: "Introduction to Graphic Design",
        description: "Types, software, careers, and freelancing.",
        isOnline: false,
      },
      {
        date: "2nd March 2025",
        title: "Design Basics",
        description: "Vector vs Raster art, Canva basics.",
        isOnline: false,
      },
      {
        date: "3rd March 2025",
        title: "Color Theory & Typography",
        description: "Full poster design in Canva.",
        isOnline: true,
      },
      {
        date: "4th March 2025",
        title: "Illustrator Basics",
        description: "Interface and brushes.",
        isOnline: true,
      },
      {
        date: "5th March 2025",
        title: "Image Tracing",
        description: "Advanced illustration techniques.",
        isOnline: true,
      },
      {
        date: "6th March 2025",
        title: "Photoshop Techniques",
        description: "Masking, selection, and blending.",
        isOnline: true,
      },
      {
        date: "8th March 2025",
        title: "Logo & T-Shirt Design",
        description: "Practical design projects.",
        isOnline: false,
      },
      {
        date: "9th March 2025",
        title: "Final Projects",
        description: "Assignments and final tasks.",
        isOnline: false,
      },
    ],
  },
]

export default function ScheduleComponent() {
  const [expandedCourses, setExpandedCourses] = useState<{ [key: string]: boolean }>({})

  const toggleCourse = (courseTitle: string) => {
    setExpandedCourses((prev) => ({
      ...prev,
      [courseTitle]: !prev[courseTitle],
    }))
  }

  return (
    <div className="space-y-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div key={course.title} className="border border-border bg-card">
              <div className="border-b border-border px-5 py-5">
                <p className="tag-editorial mb-2">{course.title}</p>
                <p className="text-sm text-muted-foreground">{course.description}</p>
              </div>
              <div className="p-4">
                <button
                  className="flex w-full items-center justify-between px-2 py-2 text-sm text-foreground transition-colors hover:text-muted-foreground"
                  onClick={() => toggleCourse(course.title)}
                  type="button"
                >
                  <span className="uppercase tracking-widest">View schedule</span>
                  {expandedCourses[course.title] ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </button>
                {expandedCourses[course.title] && (
                  <div className="mt-4 space-y-3">
                    {course.days.map((day, index) => (
                      <div
                        key={index}
                        className="border border-border px-4 py-3"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-sm font-medium text-foreground">{day.title}</h3>
                            <p className="text-xs text-muted-foreground">{day.date}</p>
                            {day.description && (
                              <p className="mt-2 text-sm text-muted-foreground">{day.description}</p>
                            )}
                          </div>
                          {day.isOnline ? (
                            <span title="Online">
                              <Globe className="h-4 w-4 shrink-0 text-muted-foreground" />
                            </span>
                          ) : (
                            <span title="On campus">
                              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    {course.calendar && <course.calendar />}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
