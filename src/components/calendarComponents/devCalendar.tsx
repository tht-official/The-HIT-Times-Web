"use client";
import BaseCalendar, { HighlightGroup } from "./BaseCalendar";

const highlightedGroups: Record<string, HighlightGroup> = {
  group1: { days: [1],             dotClass: "bg-[#8c3030] dark:bg-[#cc4444] border-2 border-[#5c1e1e] dark:border-[#ff6666]", labelClass: "text-[#8c3030] dark:text-[#ff7777]", description: "Introductory Session" },
  group2: { days: [4,6], dotClass: "bg-[#2e6900] dark:bg-[#3d8f00] border-2 border-[#1a4500] dark:border-[#55ff55]", labelClass: "text-[#2e6900] dark:text-[#55ff55]", description: "Online Training" },
  group3: { days: [2,8, 9],          dotClass: "bg-[#006e8c] dark:bg-[#007fa3] border-2 border-[#003d4d] dark:border-[#55ffff]", labelClass: "text-[#006e8c] dark:text-[#55ffff]", description: "Offline Training" },
};

const devCalendar: React.FC = () => {
  return (
    <BaseCalendar
      month={7}
      year={2026}
      title="TSP · Web Development"
      highlightedGroups={highlightedGroups}
    />
  );
};

export default devCalendar;
