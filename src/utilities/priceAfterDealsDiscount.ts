export const handleDealsPrice = (
  dealActive: boolean,
  weeklyDeals: boolean,
  productPrice: number,
  discountPercent: number
) => {
  if (dealActive && weeklyDeals) {
    const totalDiscount = Math.floor(
      ((productPrice ?? 0) * discountPercent) / 100
    );
    const priceAfterDiscount = (productPrice ?? 0) - totalDiscount;
    return priceAfterDiscount;
  }
  if (!dealActive && !weeklyDeals) return productPrice;
  if (!dealActive && weeklyDeals) return productPrice;
  if (dealActive && !weeklyDeals) return productPrice;
};
