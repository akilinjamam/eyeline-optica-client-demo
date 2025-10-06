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
    <div className="flex items-center gap-3  p-4 rounded-md justify-center">
      {/* Next Page Button */}
      <button
        onClick={handlePrevSlot}
        className={`px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700`}
      >
        Prev Slot
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-2">
        {segmentedPages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-10 h-10 border rounded-md font-semibold transition-all ${
              page === currentPage
                ? "bg-blue-600 text-white border-blue-600"
                : "text-black border-blue-400 hover:bg-blue-100"
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Last Page Link */}
      
      <button
        onClick={handleNextSlot}
        className={`px-4 py-2 rounded-md font-semibold text-white ${
          currentPage === totalPage
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Next Slot
      </button>
      <button
        onClick={handleNext}
        disabled={currentPage === totalPage}
        className={`px-4 py-2 rounded-md font-semibold text-white ${
          currentPage === totalPage
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Next Page
      </button>
      <button
        onClick={handleLast}
        className={`px-4 py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-700`}
      >
        Last Page
      </button>
    </div>
  );
};

export default Pagination;
