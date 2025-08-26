/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

const useWeeklyDealsScroller = (parentRef: any, dataLength: number = 12) => {
  const handleNavigation = (value: string) => {
    const parentElement = parentRef.current;

    const perScrollWidth = parentElement.scrollWidth / dataLength;

    console.log(parentElement.scrollWidth);

    if (value === "left") {
      if (
        parentElement.scrollLeft + parentElement.clientWidth + 1 >=
        parentElement.scrollWidth
      ) {
        parentElement.scrollLeft = 0;
        return;
      }
      parentElement.scrollLeft += perScrollWidth;
    }
    if (value === "right") {
      if (parentElement.scrollLeft > 0) {
        parentElement.scrollLeft -= perScrollWidth;
      }
    }
  };

  return { parentRef, handleNavigation };
};

export default useWeeklyDealsScroller;
