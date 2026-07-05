/**
 * Normalizes image URLs from the API (Google Drive, ImageKit, Cloudinary, etc.)
 * into a URL that can be embedded in <img> tags.
 */
export function extractGoogleDriveId(url: string): string | null {
  const patterns = [
    /\/file\/d\/([^/]+)/,
    /\/d\/([^/]+)/,
    /[?&]id=([^&]+)/,
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match?.[1]) return match[1];
  }

  return null;
}

export function resolveImageUrl(
  url?: string | null,
  size = 500
): string | undefined {
  if (!url || typeof url !== "string") return undefined;

  const trimmed = url.trim();
  if (!trimmed) return undefined;

  const driveId = extractGoogleDriveId(trimmed);
  if (driveId) {
    // Direct googleusercontent URL — more reliable than drive thumbnail redirects
    return `https://lh3.googleusercontent.com/d/${driveId}=w${size}`;
  }

  if (
    trimmed.startsWith("http://") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("/")
  ) {
    return trimmed;
  }

  return `/${trimmed}`;
}
