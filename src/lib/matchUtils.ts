import { codeToTeamName } from "@/lib/codeToTeamName";

export const toRenderableImage = (url?: string) => {
  if (!url) return undefined;
  const driveIdMatch = url.match(/\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);
  if (driveIdMatch?.[1]) {
    return `https://drive.google.com/thumbnail?id=${driveIdMatch[1]}&sz=w500`;
  }
  return url;
};

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
