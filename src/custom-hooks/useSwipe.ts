"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

const useSwipe = (swipeRef: any) => {
  // Drag-to-scroll logic
  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!swipeRef.current) return;
    isDown = true;
    startX = e.pageX - swipeRef.current.offsetLeft;
    scrollLeft = swipeRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown = false;
  };

  const handleMouseUp = () => {
    isDown = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !swipeRef.current) return;
    e.preventDefault();
    const x = e.pageX - swipeRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // speed factor
    swipeRef.current.scrollLeft = scrollLeft - walk;
  };

  return {
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    swipeRef,
  };
};

export default useSwipe;
