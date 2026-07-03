import { codeToTeamName } from "@/lib/codeToTeamName";

export const toRenderableImage = (url?: string) => {
  if (!url) return undefined;
  const driveIdMatch = url.match(/\/d\/([^/]+)/) || url.match(/[?&]id=([^&]+)/);
  if (driveIdMatch?.[1]) {
    return `https://drive.google.com/uc?export=view&id=${driveIdMatch[1]}`;
  }
  return url;
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
