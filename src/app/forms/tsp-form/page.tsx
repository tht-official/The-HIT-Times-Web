"use client";

import { FormActions } from "@/components/forms/FormActions";
import { FormClosedState } from "@/components/forms/FormClosedState";
import { FormSection } from "@/components/forms/FormSection";
import { FormSignInGate } from "@/components/forms/FormSignInGate";
import {
  formChoiceInputClass,
  formChoiceRowClass,
  formInputClass,
  formTextareaClass,
} from "@/components/forms/form-styles";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const domains = [
  { key: "writing", label: "Content Writing" },
  { key: "drawing", label: "Digital Art" },
  { key: "designing", label: "Graphic Designing" },
  { key: "videoEditing", label: "Video Editing" },
  { key: "technology", label: "Web Development" },
  { key: "photography", label: "Photography" },
] as const;

const departments = [
  "AEIE",
  "Agriculture",
  "BT",
  "CE",
  "CHE",
  "CSE",
  "CSE-AIML",
  "CSE-CS",
  "CSE-DS",
  "ECE",
  "EE",
  "FT",
  "IT",
  "ME",
  "Masters",
];

type SheetData = {
  name: string;
  roll: string;
  email: string;
  phone: string;
  dept: string;
  year: string;
  writing: string;
  drawing: string;
  designing: string;
  videoEditing: string;
  technology: string;
  photography: string;
  suggestion: string;
};

export default function TSPForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNoticeEmpty, setNoticeEmpty] = useState(false);
  const form = useForm<SheetData>();
  const { register, handleSubmit } = form;

  const getInterestsNo = (formData: SheetData) => {
    let interestParams = "";
    if (formData.writing === "yes") interestParams += "0";
    if (formData.drawing === "yes") interestParams += "1";
    if (formData.designing === "yes") interestParams += "2";
    if (formData.videoEditing === "yes") interestParams += "3";
    if (formData.technology === "yes") interestParams += "4";
    if (formData.photography === "yes") interestParams += "5";
    return interestParams;
  };

  const checkEmailAndRedirect = async (email: string) => {
    try {
      const response = await fetch("/api/v1/tsps/checkuser ", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (data.success && data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      checkEmailAndRedirect(session.user.email);
    }
  }, [session]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res2 = await fetch("/api/v1/notice");
        let notice = await res2.json();
        notice = notice.reverse();
        if (notice.length === 0 || notice[0].noticeLink !== "/tsp") {
          setNoticeEmpty(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const postSheet = async (formData: SheetData): Promise<boolean> => {
    try {
      const response = await fetch("/api/v1/tsps", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (response.status !== 201) {
        toast.error(data.msg || "Something went wrong");
        return false;
      }
      toast.success("Submitted successfully");
      return true;
    } catch {
      setIsSubmitted(false);
      toast.error("Try submitting again");
      return false;
    }
  };

  const onSubmit = async (formData: SheetData) => {
    setIsSubmitted(true);
    const isUploaded = await postSheet(formData);
    if (isUploaded) {
      router.replace(`/forms/tsp-form/${getInterestsNo(formData)}`);
    }
  };

  if (!session) {
    return (
      <FormSignInGate
        title="TSP Application"
        description="Please sign in to continue the Trainee Scholars Program form."
        bannerSrc="/tsp-banner-2025.png"
        bannerAlt="Trainee Scholars Program"
      />
    );
  }

  return (
    <div className="animate-in-subtle mx-auto max-w-3xl space-y-8 pb-12">
      <div className="overflow-hidden border border-border">
        <Image
          src="/tsp-banner-2025.png"
          alt="Trainee Scholars Program"
          width={1200}
          height={320}
          className="h-auto w-full object-cover"
        />
      </div>

      {isNoticeEmpty ? (
        <FormClosedState programName="TSP" />
      ) : (
        <Card className="border-border">
          <CardContent className="space-y-8 p-6 sm:p-8">
            <header className="space-y-4">
              <p className="tag-editorial">Application</p>
              <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
                Trainee Scholars Program
              </h1>
              <div className="section-divider" />
              <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  The HIT Times invites you to grow in writing, design, photography,
                  development, and more. Fill out the form to take the first step.
                </p>
                <p>
                  Form queries: Ashutosh Pathak (9142151436) · B. Harshita (7209593292)
                  <br />
                  Technical support: Kingshuk Hazra (9641410895)
                </p>
              </div>
            </header>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormSection title="Email" required>
                <input
                  type="email"
                  className={formInputClass}
                  value={session.user?.email ?? ""}
                  readOnly
                  {...register("email")}
                />
              </FormSection>

              <FormSection title="Name" required>
                <input
                  type="text"
                  className={formInputClass}
                  placeholder="Your full name"
                  required
                  {...register("name")}
                />
              </FormSection>

              <FormSection
                title="Roll number"
                description="Format: 24/ME/001"
                required
              >
                <input
                  type="text"
                  className={formInputClass}
                  placeholder="24/ME/001"
                  required
                  {...register("roll")}
                />
              </FormSection>

              <FormSection title="Contact number" required>
                <input
                  type="tel"
                  className={formInputClass}
                  placeholder="Your phone number"
                  required
                  {...register("phone")}
                />
              </FormSection>

              <FormSection
                title="What interests you most?"
                description="Select all domains that apply."
              >
                <div className="grid gap-3 sm:grid-cols-2">
                  {domains.map((domain) => (
                    <label key={domain.key} className={formChoiceRowClass}>
                      <input
                        type="checkbox"
                        className={formChoiceInputClass}
                        value="yes"
                        {...register(domain.key)}
                      />
                      <span>{domain.label}</span>
                    </label>
                  ))}
                </div>
              </FormSection>

              <FormSection title="Department" required>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {departments.map((dept) => (
                    <label key={dept} className={formChoiceRowClass}>
                      <input
                        type="radio"
                        className={formChoiceInputClass}
                        value={dept}
                        required
                        {...register("dept")}
                      />
                      <span>{dept}</span>
                    </label>
                  ))}
                </div>
              </FormSection>

              <FormSection title="Year" required>
                <div className="space-y-3">
                  {["1st Year", "2nd Year"].map((year) => (
                    <label key={year} className={formChoiceRowClass}>
                      <input
                        type="radio"
                        className={formChoiceInputClass}
                        value={year}
                        required
                        {...register("year")}
                      />
                      <span>{year}</span>
                    </label>
                  ))}
                </div>
              </FormSection>

              <FormSection
                title="We would love to hear from you"
                description="Share ideas on scheduling, events, or anything you'd like from the program."
              >
                <textarea
                  rows={4}
                  className={formTextareaClass}
                  placeholder="Your suggestions and ideas"
                  {...register("suggestion")}
                />
              </FormSection>

              <FormActions isSubmitting={isSubmitted} submitLabel="Submit application" />
            </form>

            <p className="text-center text-sm text-muted-foreground">
              <Link href="/tsp" className="underline-offset-4 hover:underline">
                Back to TSP overview
              </Link>
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
