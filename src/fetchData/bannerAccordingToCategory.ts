import { IBanner } from "@/ts-definition/interfaces";

export const bannerAccordingToCategory = (
  category: string,
  bannerData: IBanner[]
) => {
  const findCategory = bannerData?.find(
    (cate: IBanner) => cate.category === category
  );
  return findCategory?.images[0];
};
