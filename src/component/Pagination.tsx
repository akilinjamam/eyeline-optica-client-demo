"use client";
import React, { useState } from "react";

type PaginationProps = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPage,
  onPageChange,
}) => {
    const [slot, setSlot] = useState(1);
    console.log(slot)
  const pages = Array.from({ length: totalPage }, (_, i) => i + 1);
  const totalSlot = Math.ceil(totalPage / 5);
    
  const segmentedPages = pages?.slice((slot*5) - 5 ,(slot*5))

  const handleNext = () => {
    if (currentPage < totalPage) {
        onPageChange(currentPage + 1)
    };
  };
  const handleNextSlot = () => {
    if (slot < totalSlot) {
        setSlot((prev) => prev + 1)
    }
  };
  const handlePrevSlot = () => {
    if (slot > 1) {
        setSlot((prev) => prev - 1)
    }
  };

  const handleLast = () => {
    onPageChange(totalPage);
    const countLastSlot = Math.ceil(totalPage / 5);
    setSlot(countLastSlot)
  };

  return (
   <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 p-4 mt-6 bg-white shadow-md rounded-xl w-full max-w-3xl mx-auto">
      {/* Previous Slot Button */}
      <button
        onClick={handlePrevSlot}
        disabled={slot === 1}
        className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all ${
          slot === 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
        }`}
      >
        Prev Slot
      </button>

      {/* Page Numbers */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {segmentedPages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-9 sm:w-10 h-9 sm:h-10 flex items-center justify-center rounded-lg border font-semibold transition-all duration-150 ${
              page === currentPage
                ? "bg-blue-600 text-white border-blue-600 shadow-sm scale-105"
                : "text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-400"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Slot Button */}
      <button
        onClick={handleNextSlot}
        disabled={slot === totalSlot}
        className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all ${
          slot === totalSlot
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
        }`}
      >
        Next Slot
      </button>

      {/* Divider for mobile */}
      <div className="hidden sm:block border-l h-6 mx-2 border-gray-300"></div>

      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={handleNext}
          disabled={currentPage === totalPage}
          className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base transition-all ${
            currentPage === totalPage
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
          }`}
        >
          Next Page
        </button>
        <button
          onClick={handleLast}
          className="px-3 sm:px-4 py-2 rounded-lg font-medium text-sm sm:text-base bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
        >
          Last Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
