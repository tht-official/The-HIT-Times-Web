export type PlayerRole = "captain" | "vice" | null;

export function getPlayerRole(description?: string): PlayerRole {
  if (!description) return null;
  const normalized = description.toLowerCase();
  if (/vice\s*captain/i.test(normalized) || /\bvc\b/i.test(normalized)) {
    return "vice";
  }
  if (/\bcaptain\b/i.test(normalized)) {
    return "captain";
  }
  return null;
}
