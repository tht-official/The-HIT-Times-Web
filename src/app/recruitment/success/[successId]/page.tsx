"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const allInvLinks = [
  { title: "content-writer", url: "https://chat.whatsapp.com/GEE95DRfs8DDmFBzoIN2fm" },
  { title: "cartoonist", url: "https://chat.whatsapp.com/JHGttWD2Pic2PTo5MzVmBW" },
  { title: "graphic-designer", url: "https://chat.whatsapp.com/Bu6xtYTHjI9AyUVchTDZc1" },
  { title: "video-editor", url: "https://chat.whatsapp.com/KP1IKArzmK022HcLYg60eq" },
  { title: "developer", url: "https://chat.whatsapp.com/EMBGnkqbkRv3Y1GigW0cRI" },
  { title: "photographer", url: "https://chat.whatsapp.com/L3kWjEz5MtHFp8Df0RjhDM" },
  { title: "public-relations", url: "https://chat.whatsapp.com/CY7mqMaCH4zLc2QgbjXcLp" },
];

function SuccessPage({ params }: { params: { successId: string } }) {
  const router = useRouter();
  const invLink = allInvLinks.find((obj) => params.successId === obj.title);

  return (
    <div className="animate-in-subtle mx-auto max-w-2xl space-y-8 py-8 text-center">
      <header className="space-y-4">
        <p className="tag-editorial">Submitted</p>
        <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
          Application received
        </h1>
      </header>

      {invLink && (
        <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
          <p>
            Hello <span className="text-foreground">{invLink.title.replace(/-/g, " ")}</span> —
            your Recruitment Form 2k26 application for The HIT Times has been received.
          </p>
          <p>
            You will receive a mail shortly. Please check your Gmail spam folder. If you
            don&apos;t find the email, contact{" "}
            <a href="mailto:thehittimes@gmail.com" className="text-foreground underline">
              thehittimes@gmail.com
            </a>
            .
          </p>
        </div>
      )}

      <div className="btn-row justify-center pt-4">
        <Button onClick={() => router.push("/")}>Back to home</Button>
        <Button variant="outline" asChild>
          <Link href="/recruitment">Recruitment page</Link>
        </Button>
      </div>
    </div>
  );
}

export default SuccessPage;
