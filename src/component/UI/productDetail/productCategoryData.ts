import { ILense, IPowerOptions, IPowerTypes } from "@/ts-definition/interfaces";

export const powerTypes: IPowerTypes[] = [
  {
    frameType: "sun + eye",
    type: "Power Type",
    title: "single vision",
    description: "Positive, Negative or Cylindrical",
  },
  {
    frameType: "sun + eye",
    type: "Power Type",
    title: "zero power",
    description: "Blue light block for screen protector",
  },
  {
    frameType: "eye glasses",
    type: "Power Type",
    title: "progressive",
    description: "Two Power in One eye",
  },
  {
    frameType: "eye glasses",
    type: "Power Type",
    title: "bifocal",
    description: "Two Power in One eye",
  },
  {
    frameType: "sun + eye",
    type: "Power Type",
    title: "Frame Only",
    description: "With no lenses",
  },
  {
    frameType: "kids",
    type: "Power Type",
    title: "Myopia control lens",
    description: "not added",
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

  // zero power'
  {
    type: "Lense",
    subType: "zero power",
    title: "Blue Screen Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 300,
  },
  {
    type: "Lense",
    subType: "zero power",
    title: "Own Days Japan Clear Vision Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 900,
  },
  {
    type: "Lense",
    subType: "zero power",
    title: "Brown Tinted Color Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 100,
  },
  {
    type: "Lense",
    subType: "zero power",
    title: "Pink Tinted Color Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 200,
  },
  {
    type: "Lense",
    subType: "zero power",
    title: "Yellow Tinted Color Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 200,
  },
  {
    type: "Lense",
    subType: "zero power",
    title: "Green Tinted Color Lenses",
    features: [
      { feature: "Double Side Anti Glare Lense" },
      { feature: "Scratch Resistant" },
    ],
    price: 200,
  },
  {
    type: "Lense",
    subType: "zero power",
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
export const powerTypeForContactLens: IPowerOptions[] = [
  {
    title: "with power",
    subTitle: "With Power",
    description: "give your desired lens power",
  },
  {
    title: "without power",
    subTitle: "Without Power",
    description: "Only for style purpose",
  },
];

export const powerTypeAndAccessories: IPowerOptions[] = [
  {
    title: "with power and accessories",
    subTitle: "Only Contact Lens",
    description: "choose your desired solution here",
  },
  {
    title: "with power and accessories",
    subTitle: "With Solution",
    description:
      "Keep your lenses fresh and clean with our multipurpose contact lens solution",
  },
  {
    title: "with power and accessories",
    subTitle: "With Solution + Bag + Kit",
    description:
      "All-in-one travel combo with contact lens bag and kit for daily convenience.",
  },
  {
    title: "without power and accessories",
    subTitle: "Only Contact Lens",
    description: "choose your desired solution here",
  },
  {
    title: "without power and accessories",
    subTitle: "With Solution",
    description:
      "Keep your lenses fresh and clean with our multipurpose contact lens solution",
  },

  {
    title: "without power and accessories",
    subTitle: "With Solution + Bag + Kit",
    description:
      "All-in-one travel combo with contact lens bag and kit for daily convenience",
  },
];
