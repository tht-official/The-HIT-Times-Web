"use client";
import BaseCalendar, { HighlightGroup } from "./BaseCalendar";

const highlightedGroups: Record<string, HighlightGroup> = {
  group1: { days: [1],       dotClass: "bg-[#8c3030] dark:bg-[#cc4444] border-2 border-[#5c1e1e] dark:border-[#ff6666]", labelClass: "text-[#8c3030] dark:text-[#ff7777]", description: "Introductory Session" },
  group3: { days: [2, 8, 9], dotClass: "bg-[#006e8c] dark:bg-[#007fa3] border-2 border-[#003d4d] dark:border-[#55ffff]", labelClass: "text-[#006e8c] dark:text-[#55ffff]", description: "Offline Training" },
};

const cwCalendar: React.FC = () => {
  return (
    <BaseCalendar
      month={7}
      year={2026}
      title="TSP · Content Writing"
      highlightedGroups={highlightedGroups}
    />
  );
};

export default cwCalendar;
