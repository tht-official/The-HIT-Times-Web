"use client";

import FormInput from "@/components/formcomponents/FormInput";
import { FormActions } from "@/components/forms/FormActions";
import { FormClosedState } from "@/components/forms/FormClosedState";
import { FormSection } from "@/components/forms/FormSection";
import { FormSignInGate } from "@/components/forms/FormSignInGate";
import { RecruitmentFormIntro } from "@/components/forms/RecruitmentFormIntro";
import { formChoiceInputClass, formChoiceRowClass } from "@/components/forms/form-styles";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const positions = [
  { value: "content-writer", label: "Content Writer / Editor" },
  { value: "cartoonist", label: "Cartoonist / Digital Artist" },
  { value: "developer", label: "Developer (Web / App)" },
  { value: "graphic-designer", label: "Graphic Designer" },
  { value: "photographer", label: "Photographer" },
  { value: "public-relations", label: "Public Relations and Management" },
  { value: "video-editor", label: "Video Editor" },
];

const otherPositions = [
  "Content-Writer",
  "Reporter",
  "Photographer",
  "Graphic-Designer",
  "Video-Editor",
  "Cartoonist",
  "Web-Developer",
  "App-Developer",
  "Public-Relations",
  "None",
];

type CommonSheetData = {
  name: string;
  roll: string;
  position: string;
  other_position: string[];
};

export default function RecCommonForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isNoticeEmpty, setNoticeEmpty] = useState(false);
  const form = useForm<CommonSheetData>();
  const { register, handleSubmit } = form;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res2 = await fetch("/api/v1/notice");
        let notice = await res2.json();
        notice = notice.reverse();
        if (notice.length === 0 || notice[0].noticeLink !== "/recruitment") {
          setNoticeEmpty(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPost();
  }, []);

  const onSubmit = async (formData: CommonSheetData) => {
    setIsSubmitted(true);
    const others = formData.other_position?.join(", ") ?? "";
    toast.success("Fill the next page");
    router.push(
      `./recruitment/${formData.position}?name=${formData.name}&roll=${formData.roll}&other=${others}`
    );
    setIsSubmitted(false);
  };

  if (!session) {
    return (
      <FormSignInGate
        title="Recruitment 2k26"
        description="Please sign in to continue the recruitment application."
      />
    );
  }

  return (
    <div className="animate-in-subtle mx-auto max-w-3xl space-y-8 pb-12">
      <RecruitmentFormIntro />

      {isNoticeEmpty ? (
        <FormClosedState programName="Recruitment" />
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <FormInput title="Name" id="name" isRequired register={register} />
          <FormInput
            title="Roll number (format: 25/CSE/084)"
            id="roll"
            isRequired
            register={register}
          />

          <FormSection
            title="Primary position"
            description="Select the role that best matches what you do or want to learn. You can list additional roles below."
            required
          >
            <div className="space-y-3">
              {positions.map((pos) => (
                <label key={pos.value} className={formChoiceRowClass}>
                  <input
                    type="radio"
                    className={formChoiceInputClass}
                    value={pos.value}
                    required
                    {...register("position")}
                  />
                  <span>{pos.label}</span>
                </label>
              ))}
            </div>
          </FormSection>

          <FormSection
            title="Other positions"
            description="If you can contribute in additional roles, select them here."
          >
            <div className="space-y-3">
              {otherPositions.map((pos) => (
                <label key={pos} className={formChoiceRowClass}>
                  <input
                    type="checkbox"
                    className={formChoiceInputClass}
                    value={pos}
                    {...register("other_position")}
                  />
                  <span>{pos.replace(/-/g, " ")}</span>
                </label>
              ))}
            </div>
          </FormSection>

          <FormActions
            isSubmitting={isSubmitted}
            submitLabel="Next"
            onClear={() => {
              router.push("/recruitment");
              toast.success("Kindly fill again");
            }}
          />
        </form>
      )}
    </div>
  );
}
