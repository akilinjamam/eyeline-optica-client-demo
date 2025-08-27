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
