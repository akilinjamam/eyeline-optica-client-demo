import { ILense, IPowerOptions, IPowerTypes } from "@/ts-definition/interfaces";

export const powerTypes: IPowerTypes[] = [
  {
    type: "Power Type",
    title: "single vision",
    description: "Positive, Negative or Cylindrical",
  },
  {
    type: "Power Type",
    title: "Zero Power",
    description: "Blue light block for screen protector",
  },
  {
    type: "Power Type",
    title: "progressive",
    description: "Two Power in One eye",
  },
  {
    type: "Power Type",
    title: "bifocal",
    description: "Two Power in One eye",
  },
  {
    type: "Power Type",
    title: "Frame Only",
    description: "With no lenses",
  },
];

export const lenses: ILense[] = [
  // With power
  {
    type: "Lense",
    subType: "single vision",
    title: "Anti-glare Premium",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 200,
  },
  {
    type: "Lense",
    subType: "single vision",
    title: "Blue Screen Lens",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 300,
  },
  {
    type: "Lense",
    subType: "single vision",
    title: "Thgin Blue Screen Lens",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 150,
  },
  {
    type: "Lense",
    subType: "single vision",
    title: "Own Days Japan Clear Vision",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 600,
  },

  // Bifocal / Progressive Power
  {
    type: "Lense",
    subType: "Bifocal / Progressive Power",
    title: "Anti Glare Normal Corridor Progressive",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 200,
  },
  {
    type: "Lense",
    subType: "Bifocal / Progressive Power",
    title: "Blue Screen Normal Corridor Progressive",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 500,
  },
  {
    type: "Lense",
    subType: "Progressive Power",
    title: "Blue Screen Wide Corridor Progressive",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 400,
  },
  {
    type: "Lense",
    subType: "Bifocal",
    title: "Blue Screen Wide Corridor Bifocal",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 800,
  },

  // Zero power'
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Blue Screen Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 300,
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Own Days Japan Clear Vision Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 900,
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Brown Tinted Color Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 100,
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Pink Tinted Color Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 200,
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Yellow Tinted Color Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 200,
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Green Tinted Color Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 200,
  },
  {
    type: "Lense",
    subType: "Zero Power",
    title: "Gray Tinted Color Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 200,
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
