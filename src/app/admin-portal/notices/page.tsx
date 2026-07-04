"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowLeft, Download, Megaphone, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify";

interface NoticePayload {
  noticeTitle?: string;
  noticeLink?: string;
}

const tspNotice: NoticePayload = {
  noticeTitle: "Join TSP 24-25",
  noticeLink: "/tsp",
};

const recruitmentNotice: NoticePayload = {
  noticeTitle: "Fill Recruitment Form 2K26",
  noticeLink: "/recruitment",
};

const recruitmentExports = [
  { label: "Developers", href: "/api/v1/recruitment/dev/export" },
  { label: "Cartoonists", href: "/api/v1/recruitment/cartoonist/export" },
  { label: "Photographers", href: "/api/v1/recruitment/photographer/export" },
  { label: "Content writers", href: "/api/v1/recruitment/cw/export" },
  { label: "Public relations", href: "/api/v1/recruitment/pr/export" },
  { label: "Video editors", href: "/api/v1/recruitment/video-editor/export" },
  { label: "Graphic designers", href: "/api/v1/recruitment/gd/export" },
];

async function publishForm(notice: NoticePayload) {
  try {
    const response = await fetch("/api/v1/notice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(notice),
    });

    if (response.status !== 201) {
      toast.error("Something went wrong");
      return;
    }
    toast.success("Published successfully");
  } catch {
    toast.error("Try submitting again");
  }
}

async function removeForm() {
  try {
    const response = await fetch("/api/v1/notice", { method: "DELETE" });

    if (response.status !== 201) {
      toast.error("Something went wrong");
      return;
    }
    toast.success("Removed successfully");
  } catch {
    toast.error("Try removing again");
  }
}

function ExportCard({ label, href }: { label: string; href: string }) {
  return (
    <Link href={href} className="group block h-full">
      <Card
        className={cn(
          "micro-lift h-full border-border/80 transition-[border-color,box-shadow] duration-200",
          "hover:border-border hover:shadow-md"
        )}
      >
        <CardContent className="flex items-center justify-between gap-3 p-4">
          <span className="text-sm font-medium">{label}</span>
          <Download className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
        </CardContent>
      </Card>
    </Link>
  );
}

export default function NoticesPage() {
  return (
    <div className="animate-in-subtle space-y-10">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1.5" asChild>
          <Link href="/admin-portal">
            <ArrowLeft className="h-3.5 w-3.5" />
            Dashboard
          </Link>
        </Button>
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">Notices</h1>
          <p className="mt-2 text-muted-foreground">
            Publish site notices and export recruitment and TSP form data.
          </p>
        </div>
      </header>

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Recruitment notice
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Show or hide the recruitment banner site-wide.
          </p>
        </div>
        <Card className="border-border/80">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">Recruitment form</CardTitle>
            <CardDescription>
              Publishes: &ldquo;{recruitmentNotice.noticeTitle}&rdquo;
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button className="gap-1.5" onClick={() => publishForm(recruitmentNotice)}>
              <Megaphone className="h-4 w-4" />
              Publish notice
            </Button>
            <Button variant="outline" className="gap-1.5" onClick={removeForm}>
              <Trash2 className="h-4 w-4" />
              Remove notice
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Recruitment exports
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Download submitted applications by role.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {recruitmentExports.map((item) => (
            <ExportCard key={item.href} {...item} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            TSP notice
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Show or hide the TSP registration banner.
          </p>
        </div>
        <Card className="border-border/80">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium">TSP form</CardTitle>
            <CardDescription>
              Publishes: &ldquo;{tspNotice.noticeTitle}&rdquo;
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button className="gap-1.5" onClick={() => publishForm(tspNotice)}>
              <Megaphone className="h-4 w-4" />
              Publish notice
            </Button>
            <Button variant="outline" className="gap-1.5" onClick={removeForm}>
              <Trash2 className="h-4 w-4" />
              Remove notice
            </Button>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            TSP export
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Download all TSP form submissions.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <ExportCard label="TSP submitted data" href="/api/v1/tsps/exportform" />
        </div>
      </section>
    </div>
  );
}
