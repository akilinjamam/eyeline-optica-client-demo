"use client";

import React from "react";

const TitleSkeleton: React.FC = () => {
  return (
    <div>
      {/* ✅ Desktop & Tablet */}
      <div className="w-[90%] lg:flex md:flex hidden items-center gap-4 mx-auto px-2 animate-pulse">
        <hr className="flex-grow border-t border-gray-200" />
        <div className="w-48 h-6 bg-gray-200 rounded"></div>
        <hr className="flex-grow border-t border-gray-200" />
      </div>

      {/* ✅ Mobile */}
      <div className="lg:hidden md:hidden block px-5 animate-pulse">
        <div className="h-5 w-32 bg-blue-200 rounded"></div>
      </div>
    </div>
  );
};

export default TitleSkeleton;
