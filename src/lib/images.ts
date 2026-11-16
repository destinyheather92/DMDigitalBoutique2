import manifest from "@/data/generated/project-images.json";

export type ImageKey = keyof typeof manifest;

export type ImageAsset = {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
};

export type ImageRef = {
  key: ImageKey;
  alt: string;
};

export function getImage(key: ImageKey): ImageAsset {
  return manifest[key];
}
