import Image from "next/image";
import { cn } from "@/lib/utils";

type HeroBannerImageProps = {
  src: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  /** CSS object-position, e.g. "center 30%" */
  objectPosition?: string;
};

function isLocalBanner(src: string) {
  return src.startsWith("/") && !src.startsWith("//");
}

export function HeroBannerImage({
  src,
  alt = "",
  priority = true,
  className,
  objectPosition = "center center",
}: HeroBannerImageProps) {
  const local = isLocalBanner(src);

  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      quality={local ? 100 : 92}
      sizes="(max-width: 768px) 100vw, (max-width: 1536px) 100vw, 2400px"
      className={cn("object-cover", className)}
      style={{ objectPosition }}
    />
  );
}
