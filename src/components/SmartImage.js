import Image from "next/image";

// Only these hosts may be fetched by the Next image optimizer. Everything else
// (arbitrary product image URLs, data: URIs) is rendered unoptimized so the
// server never fetches an attacker-controllable URL (image-optimizer SSRF).
const OPTIMIZER_ALLOWED_HOSTS = new Set(["upload.wikimedia.org"]);

const isOptimizable = (src) => {
  if (typeof src !== "string" || src.length === 0 || src.startsWith("data:")) {
    return false;
  }
  try {
    return OPTIMIZER_ALLOWED_HOSTS.has(new URL(src).hostname);
  } catch {
    // Relative/same-origin paths (no host) are safe to optimize.
    return !src.startsWith("//") && src.startsWith("/");
  }
};

export default function SmartImage({ src, alt = "", ...props }) {
  if (isOptimizable(src)) {
    return <Image src={src} alt={alt} {...props} />;
  }

  return <Image src={src} alt={alt} unoptimized loader={({ src: s }) => s} {...props} />;
}
