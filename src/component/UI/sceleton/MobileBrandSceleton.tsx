"use client";

import { FC } from "react";

const MobileBrandCarouselSkeleton: FC = () => {
  const placeholders = Array(20).fill(null); // Adjust as needed

  return (
    <div className="w-full md:hidden lg:hidden block">
      <div className="lg:w-[1250px] md:w-[90%] sm:w-full overflow-x-hidden overflow-y-hidden mx-auto">
        {/* First Row */}
        <div className="w-[4000px] h-[70px] flex items-center justify-between animate-pulse">
          {placeholders.map((_, index) => (
            <div
              key={index}
              className="bg-blue-100 w-[200px] h-[50px] flex items-center justify-between rounded-full m-[4px]"
            >
              <div className="w-[100px] h-[30px] bg-blue-200 rounded-md ml-3"></div>
              <div className="w-[50px] h-[30px] bg-blue-200 rounded-md mr-3"></div>
            </div>
          ))}
        </div>

        {/* Second Row (reversed duplicate, same skeleton style) */}
        <div className="w-[4000px] h-[70px] flex items-center justify-between animate-pulse">
          {placeholders.map((_, index) => (
            <div
              key={`row2-${index}`}
              className="bg-blue-100 w-[200px] h-[50px] flex items-center justify-between rounded-full m-[4px]"
            >
              <div className="w-[100px] h-[30px] bg-blue-200 rounded-md ml-3"></div>
              <div className="w-[50px] h-[30px] bg-blue-200 rounded-md mr-3"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileBrandCarouselSkeleton;
