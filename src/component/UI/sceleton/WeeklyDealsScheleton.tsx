"use client";

import React from "react";

const WeeklyDealsSkeleton = () => {
  return (
    <div
      style={{
        background: "linear-gradient(to right, #04030B, #0E113A, #355AC0)",
      }}
      className="w-full py-4 sm:py-6 animate-pulse"
    >
      <div className="w-[95%] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Title placeholder */}
        <div className="h-10 sm:h-12 w-[220px] sm:w-[300px] bg-gradient-to-r from-orange-700 to-yellow-500 opacity-40 rounded-md"></div>

        {/* Timer placeholder */}
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 bg-white/20 rounded-md"></div>
          <div className="w-14 h-14 bg-white/20 rounded-md"></div>
          <div className="w-14 h-14 bg-white/20 rounded-md"></div>
          <div className="w-14 h-14 bg-white/20 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyDealsSkeleton;
