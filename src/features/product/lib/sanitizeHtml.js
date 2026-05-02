const ALLOWED_TAGS = new Set([
  "b",
  "strong",
  "i",
  "em",
  "u",
  "p",
  "br",
  "ul",
  "ol",
  "li",
  "blockquote",
]);

const stripDangerousBlocks = (value) =>
  value
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi, "")
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");

const stripDangerousAttributes = (value) =>
  value
    .replace(/\son\w+\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "")
    .replace(/\sstyle\s*=\s*(".*?"|'.*?'|[^\s>]+)/gi, "")
    .replace(/\s(href|src)\s*=\s*(['"])\s*javascript:[^'"]*\2/gi, "");

const stripDisallowedTags = (value) =>
  value.replace(/<\/?([a-z0-9-]+)([^>]*)>/gi, (match, tagName) =>
    ALLOWED_TAGS.has(String(tagName).toLowerCase()) ? match : ""
  );

export const sanitizeHtml = (value) => {
  if (typeof value !== "string") {
    return "";
  }

  return stripDisallowedTags(stripDangerousAttributes(stripDangerousBlocks(value))).trim();
};
