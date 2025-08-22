import { StaticImageData } from "next/image";

export interface Brand {
  elements: StaticImageData;
}

export interface GlassCardProps {
  id?: number;
  image: StaticImageData;
  title: string;
  model: string;
  price: number;
  tag?: string;
  key?: number;
  images?: StaticImageData[];
  colorCount: number;
}

export interface TLatestCollectionsData {
  image: StaticImageData;
  type: string;
}

export interface ILenseData {
  badge?: string;
  image: StaticImageData;
  name?: string;
  brand?: string;
  usageInfo?: string;
  price?: number;
  originalPrice?: number;
  discountPercentage?: number;
  discountLabel?: string;
}

export interface IFrameData {
  color: string;
  title: string;
}

export interface ISinglePageProps {
  params: {
    id: string;
  };
}

export interface IPowerTypes {
  type: string;
  title: string;
}

export interface ILenseFeatures {
  feature: string;
}

export interface ILense {
  type: string;
  subType: string;
  title: string;
  features: ILenseFeatures[];
  price: number;
}

export interface IPowerOptions {
  title: string;
  subTitle: string;
  description: string;
}
