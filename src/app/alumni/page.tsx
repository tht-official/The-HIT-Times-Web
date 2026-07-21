"use client";

import AlumniCard from "@/components/alumni/Profile";
import { Alumni } from "@/models/Alumnus";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { BrandLoader } from "@/components/common/loader/Loaders";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

interface AlumniData {
  year: string;
  alumni: Alumni[];
}

const AlumniPage: React.FC = () => {
  const [alumniData, setAlumniData] = useState<AlumniData[]>([]);
  const [filter, setFilter] = useState({
    startSession: new Date().getFullYear() - 4,
    endSession: new Date().getFullYear(),
  });
  const [loading, setLoading] = useState(true);

  const fetchAlumniData = useCallback(async () => {
    setLoading(true);
    const response = await fetch(
      `/api/v1/alumnus?startSession=${filter.startSession}&endSession=${filter.endSession}`
    );
    const data = await response.json();
    const alumni = data.data as Alumni[];
    const grouped: { [year: string]: Alumni[] } = {};

    alumni.forEach((alumnus) => {
      const year = String(alumnus.session_end);
      if (grouped[year]) grouped[year].push(alumnus);
      else grouped[year] = [alumnus];
    });

    setAlumniData(
      Object.entries(grouped)
        .map(([year, alumni]) => ({ year, alumni }))
        .sort((a, b) => parseInt(b.year) - parseInt(a.year))
    );
    setLoading(false);
  }, [filter.startSession, filter.endSession]);

  useEffect(() => {
    fetchAlumniData();
  }, [fetchAlumniData]);

  const currentYear = new Date().getFullYear();

  return (
    <div className="animate-in-subtle space-y-10">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="editorial-heading text-3xl font-normal sm:text-4xl">
            Alumni
          </h1>
          <p className="mt-2 text-muted-foreground">
            Former members who shaped The HIT Times.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            className="h-9 rounded-md border border-border bg-background px-3 text-sm transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-ring"
            value={`${filter.startSession}-${filter.endSession}`}
            onChange={(e) => {
              const [start, end] = e.target.value.split("-");
              setFilter({
                startSession: parseInt(start),
                endSession: parseInt(end),
              });
            }}
          >
            {Array.from({ length: currentYear - 2012 }, (_, i) => {
              const end = currentYear - i;
              const start = end - 4;
              return (
                <option key={end} value={`${start}-${end}`}>
                  {start}–{end}
                </option>
              );
            })}
          </select>
        </div>
      </header>

      {loading ? (
        <BrandLoader variant="inline" />
      ) : alumniData.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border py-16 text-center text-muted-foreground">
          No alumni found for this session.{" "}
          <Button variant="link" asChild className="h-auto p-0">
            <Link href="/about-us#contact-us">Contact us</Link>
          </Button>
        </div>
      ) : (
        <div className="space-y-12">
          {alumniData.map(({ year, alumni }) => (
            <section key={year}>
              <div className="mb-6 flex items-center gap-4">
                <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  Class of {year}
                </h2>
                <Separator className="flex-1" />
              </div>
              <div className="flex flex-wrap gap-6">
                {alumni.map((member) => (
                  <AlumniCard key={member._id.toString()} {...member} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlumniPage;
