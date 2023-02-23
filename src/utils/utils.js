export function convertToSlug(string) {
  return string.trim().replace(/\s+/g, "-").replace(/-+/g, "-").toLowerCase();
}
