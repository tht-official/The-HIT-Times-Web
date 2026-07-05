"use client";

import AlumniForm from "@/components/admin-portal/alumni/AlumniForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function CreateAlumniPage() {
  return (
    <div className="animate-in-subtle mx-auto max-w-2xl space-y-8">
      <header className="space-y-4">
        <Button variant="ghost" size="sm" className="-ml-2 gap-1.5" asChild>
          <Link href="/admin-portal/alumni">
            <ArrowLeft className="h-3.5 w-3.5" />
            All alumni
          </Link>
        </Button>
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">Add alumni</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a new profile for the public alumni directory.
          </p>
        </div>
      </header>
      <AlumniForm />
    </div>
  );
}
