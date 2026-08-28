// Returns the URL only if it is a safe http(s) link, otherwise undefined.
// Blocks javascript:, data:, vbscript: and other script-capable schemes that
// would turn an <a href> or image src into a click-to-execute XSS vector.
export const safeExternalUrl = (value) => {
  if (typeof value !== "string" || value.trim() === "") return undefined;
  try {
    const url = new URL(value, "https://placeholder.invalid");
    if (url.protocol === "http:" || url.protocol === "https:") {
      return value;
    }
  } catch {
    return undefined;
  }
  return undefined;
};
