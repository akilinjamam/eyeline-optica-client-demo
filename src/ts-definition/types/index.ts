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
