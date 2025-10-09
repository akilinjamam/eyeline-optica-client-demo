/* eslint-disable @typescript-eslint/no-explicit-any */
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
  description: string;
}

export interface ILenseFeatures {
  feature: string;
}

export interface ILense {
  id?: string;
  type: string;
  subType: string;
  title: string;
  features: ILenseFeatures[];
  price: number;
  images?: string[];
  brand?: string;
  category?: string;
  lensType?: string;
  material?: string;
  color?: string;
  index?: number;
  diameter?: number;
  prescriptionRange?: string;
  warranty?: string;
  deliveryTime?: string;
  offer?: number;
  purchasePrice?: number;
  rating?: number;
  description?: string;
}

export interface IPowerOptions {
  title: string;
  subTitle: string;
  description: string;
}

export interface ITelemedicineServiceData {
  img: StaticImageData;
  title: string;
}

export interface ISelectOtherOptionsForDoctor {
  title: string;
  icon: any;
}
