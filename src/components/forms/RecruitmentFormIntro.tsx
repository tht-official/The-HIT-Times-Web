import Image from "next/image";

export function RecruitmentFormIntro() {
  return (
    <div className="space-y-6">
      <div className="overflow-hidden border border-border">
        <Image
          src="https://res.cloudinary.com/dvw5qhccb/image/upload/v1730133636/rec-header.png_reznpj.jpg"
          alt="Recruitment Form 2k26"
          width={1500}
          height={200}
          className="h-auto w-full object-cover"
        />
      </div>
      <div className="space-y-4">
        <div>
          <p className="tag-editorial mb-2">Recruitment</p>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
            Recruitment Form 2k26
          </h1>
        </div>
        <div className="section-divider" />
        <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
          <p>
            Carefully read each description and take your time telling us about yourself.
            Some questions are optional, but we give preference to applicants who answer
            thoroughly. Use proper grammar; spelling mistakes are fine, SMS lingo is not.
            Abusive or unacceptable entries may be disqualified.
          </p>
          <p>
            The name and photo associated with your Google account may be recorded when you
            upload files and submit this form.
          </p>
          <p>
            Queries: Kingshuk Hazra (9641410895, 4th Year) · Ishan Tiwari (9073669191, 3rd
            Year)
          </p>
          <p className="text-destructive">* Indicates required question</p>
        </div>
      </div>
    </div>
  );
}
