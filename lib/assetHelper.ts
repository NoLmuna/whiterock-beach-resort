/**
 * Normalizes asset paths provided in Windows backslash, relative, or absolute formats
 * into clean Next.js public URL paths.
 * 
 * Example:
 * "assets\\icon\\ CW-WHITEROCK BEACH RESORT Logo.png" -> "/assets/icon/CW-WHITEROCK BEACH RESORT Logo.png"
 * "assets/images/homepage/home1.png" -> "/assets/images/homepage/home1.png"
 */
export function normalizeAssetPath(path: string): string {
  if (!path) return "";
  // Replace backslashes with forward slashes
  let clean = path.replace(/\\/g, "/").trim();

  // Normalize multiple consecutive slashes
  clean = clean.replace(/\/+/g, "/");

  // Fix known space typos in filename paths (e.g., "icon/ CW-WHITEROCK" -> "icon/CW-WHITEROCK")
  clean = clean.replace(/\/ +/g, "/");

  // Ensure leading slash for Next.js Image static assets
  if (!clean.startsWith("/") && !clean.startsWith("http")) {
    clean = "/" + clean;
  }

  return clean;
}
