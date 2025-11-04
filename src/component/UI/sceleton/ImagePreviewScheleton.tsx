"use client";

import { FC } from "react";

const ImagePreviewScheleton: FC = () => {
  const skeletons = Array(10).fill(null); // 8 placeholders

  return (
    <div className="w-full px-4 py-4 overflow-x-hidden relative md:block lg:block hidden">
      <div
        style={{ userSelect: "none" }}
        className="
          flex gap-4 overflow-x-hidden cursor-grab 
          mx-auto max-w-[1200px]
          sm:justify-center
          animate-pulse
        "
      >
        {skeletons.map((_, index) => (
          <div
            key={index}
            className="shrink-0 mb-4 bg-white w-[180px] h-[150px] p-2 rounded-md shadow-sm"
          >
            <div className="bg-blue-100 h-[110px] flex items-center justify-center rounded">
              <div className="h-[80px] w-[80px] bg-blue-200 rounded-md"></div>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="h-4 w-20 bg-blue-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Right-side fade overlay */}
      <div className="lg:hidden pointer-events-none absolute -top-4 right-0 h-full w-16 bg-gradient-to-l from-blue-50 via-blue-50/90 to-transparent z-10" />
    </div>
  );
};

export default ImagePreviewScheleton;
