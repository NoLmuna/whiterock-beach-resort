"use client";

import Image, { ImageProps } from "next/image";
import { normalizeAssetPath } from "@/lib/assetHelper";

export interface ResortImageProps extends Omit<ImageProps, "src"> {
  src: string;
}

export default function ResortImage({ src, alt, ...props }: ResortImageProps) {
  const normalizedSrc = normalizeAssetPath(src);

  return (
    <Image
      src={normalizedSrc}
      alt={alt || "Whiterock Beach Resort"}
      {...props}
    />
  );
}
