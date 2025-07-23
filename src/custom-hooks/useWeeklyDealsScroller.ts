/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

const useWeeklyDealsScroller = (parentRef: any) => {
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
      parentElement.scrollLeft += 200;
    }
    if (value === "right") {
      if (parentElement.scrollLeft > 0) {
        parentElement.scrollLeft = 0;
        return;
      }
      parentElement.scrollLeft -= 200;
    }
  };

  // const [pause, setPause] = useState<boolean>(false);
  // useEffect(() => {
  //   const parentElement = parentRef.current;

  //   const scrollHandler = () => {
  //     if (pause) {
  //       parentElement.scrollLeft += 0;
  //     } else {
  //       parentElement.scrollLeft += 1;
  //     }

  //     if (
  //       parentElement.scrollLeft + parentElement.clientWidth + 1 ===
  //       parentElement.scrollWidth
  //     ) {
  //       parentElement.scrollLeft = 0;
  //     }
  //   };

  //   const interval = setInterval(scrollHandler, 10);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [pause, parentRef]);

  return { parentRef, handleNavigation };
};

export default useWeeklyDealsScroller;
