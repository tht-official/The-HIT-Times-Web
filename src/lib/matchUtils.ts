import { codeToTeamName } from "@/lib/codeToTeamName";
import { resolveImageUrl } from "@/lib/imageUtils";

/** @deprecated Use resolveImageUrl from @/lib/imageUtils */
export const toRenderableImage = (url?: string) => resolveImageUrl(url, 500);

export const getMatchPhaseLabel = (match: {
  is_live?: boolean;
  match_type?: string;
}) => {
  if (match.is_live) return "In progress";
  if (match.match_type === "cricket") return "Match ended";
  return "Full time";
};

export const formatMatchDateTime = (d: Date | string) => {
  const date = new Date(d);
  return (
    date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    }) +
    " · " +
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
};

export const getTeamLabel = (code: string, name?: string) =>
  codeToTeamName[code] || name || code;
