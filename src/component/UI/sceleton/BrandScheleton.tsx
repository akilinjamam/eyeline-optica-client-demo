"use client";

import { FC } from "react";

const BrandCarouselSkeleton: FC = () => {
  const placeholders = Array(20).fill(null); // Adjust count as needed

  return (
    <div className="w-full lg:block md:block hidden">
      <div className="lg:w-[1250px] md:w-[90%] sm:w-full overflow-x-hidden overflow-y-hidden mx-auto">
        <div className="w-[5000px] h-[200px] flex items-center justify-between animate-pulse">
          {placeholders.map((_, index) => (
            <div
              key={index}
              className="w-[120px] h-[120px] bg-blue-100 rounded-md m-[10px]"
            >
              <div className="h-full w-full bg-blue-200 rounded-md"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandCarouselSkeleton;
