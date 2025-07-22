/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";

const useBrandScroller = (parentRef: any) => {
  const [pause, setPause] = useState<boolean>(false);
  useEffect(() => {
    const parentElement = parentRef.current;

    const scrollHandler = () => {
      if (pause) {
        parentElement.scrollLeft += 0;
      } else {
        parentElement.scrollLeft += 1;
      }

      if (
        parentElement.scrollLeft + parentElement.clientWidth + 1 ===
        parentElement.scrollWidth
      ) {
        parentElement.scrollLeft = 0; // Reset the scroll position to the beginning
      }
    };

    const interval = setInterval(scrollHandler, 10);

    return () => {
      clearInterval(interval);
    };
  }, [pause, parentRef]);

  return { parentRef, pause, setPause };
};

export default useBrandScroller;
