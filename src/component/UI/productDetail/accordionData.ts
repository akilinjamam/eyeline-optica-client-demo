import { AccordionItemType } from "@/ts-definition/types";

export const eyeglass: AccordionItemType[] = [
  {
    title: "POWER TYPE",
    children: [
      { title: "With Power (single vision)", price: 200 },
      { title: "zero power", price: 100 },
      { title: "Bifocal Power", price: 300 },
      { title: "Prograssive Power", price: 250 },
      { title: "Reading Power", price: 400 },
      { title: "Only Frame", price: 230 },
    ],
  },
  {
    title: "LENSE TYPE",
    children: [
      {
        title: "Regular White",
        children: [
          { title: "White", price: 50 },
          { title: "Blue Cut", price: 250 },
          { title: "Phochomatic", price: 100 },
          { title: "HMC", price: 500 },
        ],
      },
      {
        title: "Premium",
        children: [
          { title: "Platinum Rio", price: 600 },
          { title: "Titanium Blue", price: 260 },
          { title: "Crizal", price: 500 },
        ],
      },
      {
        title: "High Power",
        children: [
          { title: "Platinum Rio", price: 80 },
          { title: "Titanium Blue", price: 70 },
          { title: "Crizal", price: 20 },
        ],
      },
      {
        title: "Drivesa",
        children: [
          { title: "Zieye Drive", price: 700 },
          { title: "Rio drivesafa", price: 250 },
        ],
      },
    ],
  },
];

export const itemsOld: AccordionItemType[] = [
  {
    title: "BRAND",
    children: [
      { title: "Nike", content: "Sports eyewear from Nike." },
      { title: "Ray-Ban", content: "Classic eyewear brand." },
    ],
  },
  {
    title: "FRAME SIZE",
    children: [
      { title: "Small", content: "Best for narrow faces." },
      {
        title: "Medium",
        children: [
          { title: "Option 1", content: "Medium frame option 1." },
          { title: "Option 2", content: "Medium frame option 2." },
        ],
      },
      { title: "Large", content: "Best for wide faces." },
    ],
  },
  { title: "GENDER", content: "Men, Women, Unisex." },
  { title: "MATERIAL", content: "Plastic, Metal, Titanium." },
];
