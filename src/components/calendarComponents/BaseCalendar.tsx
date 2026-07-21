"use client";
import dayjs from "dayjs";

const daysOfWeek: string[] = ["Su", "M", "T", "W", "Th", "F", "Sa"];

export interface HighlightGroup {
  days: number[];
  dotClass: string;
  labelClass: string;
  description: string;
}

interface BaseCalendarProps {
  month: number; // 0-based
  year: number;
  title: string;
  highlightedGroups: Record<string, HighlightGroup>;
}

const BaseCalendar: React.FC<BaseCalendarProps> = ({ month, year, title, highlightedGroups }) => {
  const currentDate = dayjs().year(year).month(month);
  const daysInMonth = currentDate.endOf("month").date();
  const firstDayOfWeek = currentDate.startOf("month").day();

  return (
    <div className="mt-4 border-4 border-[#8c6239] dark:border-[#3c3c3c] bg-[#ebd8be] dark:bg-[#1a1a1a] shadow-[inset_0_4px_0_#f4e7d3] dark:shadow-[inset_0_4px_0_#333333] p-4 w-full">
      {/* Header */}
      <div className="flex justify-center items-center mb-3 border-b-2 border-dashed border-[#8c6239]/40 dark:border-[#3c3c3c] pb-2">
        <h2 className="minecraft-font text-sm font-bold text-[#2b190c] dark:text-[#d4b896] tracking-widest uppercase">
          {currentDate.format("MMMM YYYY")}
        </h2>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 text-center mb-1">
        {daysOfWeek.map((day) => (
          <div key={day} className="minecraft-font text-[10px] font-bold text-[#5c3e21] dark:text-[#8c6239] uppercase py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {Array.from({ length: firstDayOfWeek }).map((_, i) => <div key={`empty-${i}`} />)}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const group = Object.values(highlightedGroups).find((g) => g.days.includes(day));
          return (
            <div
              key={i}
              className={`flex items-center justify-center w-7 h-7 mx-auto text-[11px] font-mono font-bold transition-all ${
                group
                  ? `${group.dotClass} text-white`
                  : "text-[#47301c] dark:text-zinc-400 hover:bg-[#8c6239]/20 dark:hover:bg-white/10"
              }`}
            >
              {day}
            </div>
          );
        })}
      </div>

      {/* Footer label */}
      <div className="mt-3 pt-2 border-t-2 border-dashed border-[#8c6239]/40 dark:border-[#3c3c3c] text-center">
        <p className="minecraft-font text-[10px] text-[#5c3e21] dark:text-zinc-500 uppercase tracking-widest">
          {title}
        </p>
      </div>

      {/* Legend */}
      <div className="mt-3 grid grid-cols-1 gap-1.5">
        {Object.entries(highlightedGroups).map(([key, group]) => (
          <div key={key} className="flex items-center gap-2">
            <div className={`w-4 h-4 shrink-0 ${group.dotClass}`} />
            <span className={`minecraft-font text-[10px] uppercase tracking-wider ${group.labelClass}`}>
              {group.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BaseCalendar;
