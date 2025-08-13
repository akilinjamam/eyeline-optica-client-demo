export const calculatingTotal = (value: number[]) => {
  let sum = 0;
  for (const total of value) {
    sum = sum + total;
  }
  return sum;
};
