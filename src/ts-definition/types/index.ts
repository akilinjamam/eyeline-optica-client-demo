/* eslint-disable @typescript-eslint/no-explicit-any */
import { StaticImageData } from "next/image";

export type TTimes = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

export type TAppointmentService = {
  img: StaticImageData;
  text: string;
};

export type TContactLenseData = {
  lense: StaticImageData;
};

export type TRegardingInfoTab = {
  info: string;
};

export type AccordionItemType = {
  title?: string;
  content?: string;
  children?: AccordionItemType[];
  price?: number;
};

export type TAccordion = {
  item: AccordionItemType[];
  selectData?: any;
  selectPrice?: any;
};

export type GoForwardPayload = { type: string; title: string };

export type TTelemedicineData = {
  id: number;
  name: string;
  degree: string;
  post: string;
  reviews: number;
  exp: number;
  img: StaticImageData;
  key?: number;
  bmdcNumber?: string;
  fee?: number;
};

export type TData<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    meta?: {
      page: number;
      limit: number;
      total: number;
      totalPage: number;
    };
    data: T;
  };
};
export type TDataWithoutMeta<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
};

export type TOtherImages = {
  colorName: string;
  fromColor: string;
  toColor: string;
  images: string[];
};

export type TFrame = {
  _id?: string;
  name?: string;
  images?: string[];
  otherImages?: TOtherImages[];
  type?: string;
  materialsCategory?: string;
  frameCategory?: string;
  sizeCategory?: string;
  shapeCategory?: string;
  biologyCategory?: string;
  color?: string;
  purchasePrice?: number;
  salesPrice?: number;
  discount?: number;
  quantity?: number;
  sold?: number;
  features?: string[]; // array is empty but probably string[] in future
  brand?: string;
  barcode?: string;
  badge?: string;
  description?: string;
  weeklyDeals?: boolean;
  reviews?: string[]; // assuming reviews array holds strings, can be expanded to object type if needed
  frameMeasurements?: string;
  frameDetails?: string;
  prescriptionDetails?: string;
  stock?: boolean;
  date?: string; // ISO date
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
  __v?: number;
  dealsOffer?: number;
  category?: string;
  frameWidth?: string;
  bridge?: string;
  lensWidth?: string;
  lensHeight?: string;
  templeLength?: string;
  size?: string;
  weight?: string;
  pdRange?: string;
  prescriptionRange?: string;
  availableAsProBi?: boolean;
  availableAsReader?: boolean;
};

// src/types/lens.type.ts

export type LensType = "single vision" | "bifocal" | "progressive" | "reading";

export type LensMaterial = "plastic" | "polycarbonate" | "high-index" | "glass";

export type TLens = {
  _id?: string;
  id?: string;
  name?: string;
  description?: string;
  purchasePrice?: number;
  salesPrice?: number;
  stock?: number;
  category?: string;
  brand?: string;
  images?: string[];
  lensType?: LensType;
  material?: LensMaterial;
  coatings?: string[];
  prescriptionRange?: string;
  index?: number;
  thickness?: string;
  color?: string;
  diameter?: number;
  warranty?: string;
  deliveryTime?: string;
  offer?: number;
  rating?: number;
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
  __v?: number;
  badge?: string;
  weeklyDeals?: boolean;
};

export type TContactLens = {
  _id?: string;
  id?: string;
  name: string;
  brand: string;
  color?: string;
  type?: "daily disposable" | "monthly" | "monthly (colored)" | string; // extendable
  material?: string;
  waterContent?: string; // e.g. "38%" (kept as string for flexibility)
  diameter?: number; // mm
  baseCurve?: number; // mm
  powerRange?: string; // e.g. "-12.00 to +8.00"
  uvProtection?: boolean;
  purchasePrice?: number;
  features?: string[];
  salesPrice: number;
  stock?: number;
  offer?: number; // percentage (0-100)
  rating?: number; // 1-5
  description?: string;
  additionalType?: string;
  images: string[];
  powerType?: string;
  badge?: string;
};

export type TAccessoryItem = {
  name: string;
  barcode?: string; // optional since you may default to "not-added"
  brand: string;
  category: string;
  quantity: number;
  stock?: boolean; // default true
  purchasePrice: number;
  salesPrice: number;
  discount?: number; // default 0
  sold?: number; // default 0
  measurement: string;
  description?: string; // default "not-added"
};

export type TAccessory = {
  _id?: string;
  images: string[];
  customerId: string; // MongoDB ObjectId as string
  weeklyDeals: boolean;
  type:
    | "With Solution"
    | "With Bag"
    | "With Kit"
    | "With Solution + Kit"
    | "With Solution + Bag"
    | "With Kit + Bag"
    | "With Solution + Bag + Kit"
    | "others";
  items: TAccessoryItem[];
};

export type TBlog = {
  _id?: string;
  title: string;
  images: string;
  category: string;
  description: string;
  createdAt?: any;
};

export type TWeeklyDeals = {
  startDate: any;
  endDate: any;
  available?: boolean;
  active: boolean;
  _id?: string;
  id?: string;
  title: string;
  discountPercent: number;
};
