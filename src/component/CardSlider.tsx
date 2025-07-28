"use client"
// components/CardSlider.tsx
import React, { useRef } from "react";

const CardSlider: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = scrollRef.current.clientWidth;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

// Add inside your component
const touchStartX = useRef<number | null>(null);
const touchEndX = useRef<number | null>(null);

const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  touchStartX.current = e.touches[0].clientX;
};

const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
  touchEndX.current = e.touches[0].clientX;
};

const handleTouchEnd = () => {
  if (
    touchStartX.current !== null &&
    touchEndX.current !== null &&
    Math.abs(touchStartX.current - touchEndX.current) > 50
  ) {
    const direction =
      touchStartX.current > touchEndX.current ? "right" : "left";
    scroll(direction);
  }

  // reset
  touchStartX.current = null;
  touchEndX.current = null;
};



  return (
    <div className="relative w-[1200px] overflow-hidden">
      {/* Navigation buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 z-10 top-1/2 transform -translate-y-1/2 bg-white px-2"
      >
        ◀
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 z-10 top-1/2 transform -translate-y-1/2 bg-white px-2"
      >
        ▶
      </button>

      {/* Card container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth no-scrollbar touch-pan-x"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {[...Array(20)].map((_, idx) => (
          <div
            key={idx}
            className="min-w-[240px] flex-shrink-0 h-40 m-2 bg-blue-200 rounded"
          >
            Card {idx + 1}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardSlider;
