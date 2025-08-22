import { ILense, IPowerOptions, IPowerTypes } from "@/ts-definition/interfaces";

export const powerTypes: IPowerTypes[] = [
  {
    type: "Power Type",
    title: "With Power",
  },
  {
    type: "Power Type",
    title: "Zero Power",
  },
  {
    type: "Power Type",
    title: "Progressive Power",
  },
  {
    type: "Power Type",
    title: "Bifocal",
  },
  {
    type: "Power Type",
    title: "Frame Only",
  },
];

export const lenses: ILense[] = [
  // With power
  {
    type: "Lense",
    subType: "With Power",
    title: "Anti-glare Premium",
  },
  {
    type: "Lense",
    subType: "With Power",
    title: "Blue Screen Lens",
  },
  {
    type: "Lense",
    subType: "With Power",
    title: "Thgin Blue Screen Lens",
  },
  {
    type: "Lense",
    subType: "With Power",
    title: "Own Days Japan Clear Vision",
  },

  // Bifocal / Progressive Power
  {
    type: "Lense",
    subType: "Bifocal / Progressive Power",
    title: "Anti Glare Normal Corridor Progressive",
  },
  {
    type: "Lense",
    subType: "Bifocal / Progressive Power",
    title: "Blue Screen Normal Corridor Progressive",
  },
  {
    type: "Lense",
    subType: "Progressive Power",
    title: "Blue Screen Wide Corridor Progressive",
  },
  {
    type: "Lense",
    subType: "Bifocal",
    title: "Blue Screen Wide Corridor Bifocal",
  },

  // Zero power'
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Blue Screen Lenses",
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Own Days Japan Clear Vision Lenses",
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Brown Tinted Color Lenses",
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Pink Tinted Color Lenses",
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Yellow Tinted Color Lenses",
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Green Tinted Color Lenses",
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Gray Tinted Color Lenses",
  },
];

export const powerOptions: IPowerOptions[] = [
  {
    title: "I don't know my power",
    subTitle: "Submit Power later in 15 days",
    description: "After placing the order",
  },
  {
    title: "I know my power",
    subTitle: "Enter Power Manually",
    description: "Input your latest eye prescription",
  },
  {
    title: "I know my power",
    subTitle: "Upload Prescription",
    description: "Upload your power prescription",
  },
];
