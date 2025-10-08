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

export type TFrame = {
  _id?: string;
  name?: string;
  images?: string[];
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
  date?: string; // ISO date
  createdAt?: string; // ISO date
  updatedAt?: string; // ISO date
  __v?: number;
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
};

export type TContactLens = {
  _id: string;
  id?: string;
  name: string;
  brand: string;
  color: string;
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
  images: string[];
};
