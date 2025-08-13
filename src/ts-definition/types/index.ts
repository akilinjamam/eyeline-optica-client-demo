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
};

export type TAccordion = {
  item: AccordionItemType[];
  selectData?: any;
};
