"use client";

import { FC } from "react";

const MobileBannerSkeleton: FC = () => {
  const skeletons = Array(6).fill(null); // 6 placeholders

  return (
    <div className="w-full px-1 py-4 overflow-x-hidden relative md:hidden lg:hidden block">
      <div
        style={{ userSelect: "none" }}
        className="
          flex gap-2 overflow-x-hidden cursor-grab 
          mx-auto max-w-full
          sm:justify-center
          animate-pulse
        "
      >
        {skeletons.map((_, index) => (
          <div
            key={index}
            style={{ borderRadius: "50px" }}
            className="shrink-0 mb-4 bg-blue-100 w-[200px] h-[300px] shadow-sm"
          >
            <div className="flex items-center justify-center">
              <div
                style={{
                  borderTopRightRadius: "50px",
                  borderTopLeftRadius: "50px",
                  borderBottomLeftRadius: "30px",
                  borderBottomRightRadius: "30px",
                }}
                className="h-[260px] w-full bg-blue-200"
              ></div>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="h-4 w-24 bg-blue-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileBannerSkeleton;
