import { StaticImageData } from "next/image";

export interface Brand {
  elements: StaticImageData;
}

export interface GlassCardProps {
  image: StaticImageData;
  title: string;
  model: string;
  price: number;
  tag?: string;
  colorCount: number;
}
