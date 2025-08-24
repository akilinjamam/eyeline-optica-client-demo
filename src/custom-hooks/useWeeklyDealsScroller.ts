/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

const useWeeklyDealsScroller = (parentRef: any, scrollLength: number = 200) => {
  const handleNavigation = (value: string) => {
    const parentElement = parentRef.current;

    if (value === "left") {
      if (
        parentElement.scrollLeft + parentElement.clientWidth + 1 >=
        parentElement.scrollWidth
      ) {
        parentElement.scrollLeft = 0;
        return;
      }
      parentElement.scrollLeft += scrollLength;
    }
    if (value === "right") {
      if (parentElement.scrollLeft > 0) {
        parentElement.scrollLeft -= scrollLength;
      }
    }
  };

  return { parentRef, handleNavigation };
};

export default useWeeklyDealsScroller;
