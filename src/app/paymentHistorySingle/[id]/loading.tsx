'use client';

const CustomerHistorySingleSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 animate-pulse">
      {/* Title */}
      <div className="h-6 w-48 bg-gray-200 rounded mb-4"></div>

      {/* Card Skeleton */}
      <div className="border border-gray-200 rounded-lg shadow-sm p-4">
        {/* Product Info */}
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>

          <div className="h-4 bg-gray-100 rounded w-full mt-4"></div>
          <div className="h-4 bg-gray-100 rounded w-1/3"></div>
          <div className="h-4 bg-gray-100 rounded w-1/2"></div>

          <div className="h-4 bg-gray-100 rounded w-1/4"></div>
          <div className="h-3 bg-gray-100 rounded w-1/2"></div>

          <div className="h-4 bg-gray-200 rounded w-1/4 mt-3"></div>
          <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        </div>

        {/* Horizontal Separator */}
        <div className="my-5 border-t border-gray-100"></div>

        {/* Status Flow Skeleton */}
        <div className="hidden sm:flex flex-wrap items-center justify-between gap-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="flex flex-col items-center flex-1 min-w-[70px] sm:min-w-[100px]"
            >
              <div className="relative flex items-center justify-center w-full">
                <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                {i < 4 && (
                  <div className="absolute top-1/2 left-[50%] sm:left-[60%] translate-y-[-50%] h-0.5 w-full bg-gray-200"></div>
                )}
              </div>
              <div className="mt-2 h-3 bg-gray-200 rounded w-10 sm:w-16"></div>
            </div>
          ))}
        </div>

        {/* Mobile Flow Skeleton */}
        <div className="flex flex-col gap-3 sm:hidden mt-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-gray-300"></div>
              <div className="flex-1 h-3 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerHistorySingleSkeleton;
