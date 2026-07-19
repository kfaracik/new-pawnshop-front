import Image from "next/image";

const isOptimizable = (src) =>
  typeof src === "string" && src.length > 0 && !src.startsWith("data:");

export default function SmartImage({ src, ...props }) {
  const optimizable = isOptimizable(src);

  if (optimizable) {
    return <Image src={src} {...props} />;
  }

  return <Image src={src} unoptimized loader={({ src: s }) => s} {...props} />;
}
