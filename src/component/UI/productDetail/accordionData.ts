import { AccordionItemType } from "@/ts-definition/types";

export const items: AccordionItemType[] = [
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

export const eyeglass: AccordionItemType[] = [
  {
    title: "POWER TYPE",
    children: [
      { title: "With Power (single vision)" },
      { title: "Zero Power" },
      { title: "Bifocal Power" },
      { title: "Prograssive Power" },
      { title: "Reading Power" },
      { title: "Only Frame" },
    ],
  },
  {
    title: "LENSE TYPE",
    children: [
      {
        title: "Regular White",
        children: [
          { title: "White" },
          { title: "Blue Cut" },
          { title: "Phochomatic" },
          { title: "HMC" },
        ],
      },
      {
        title: "Premium",
        children: [
          { title: "Platinum Rio" },
          { title: "Titanium Blue" },
          { title: "Crizal" },
        ],
      },
      {
        title: "High Power",
        children: [
          { title: "Platinum Rio" },
          { title: "Titanium Blue" },
          { title: "Crizal" },
        ],
      },
      {
        title: "Drivesa",
        children: [{ title: "Zieye Drive" }, { title: "Rio drivesafa" }],
      },
    ],
  },
];
