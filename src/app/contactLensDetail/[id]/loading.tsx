// app/products/[id]/loading.tsx
export default function Loading() {
  return (
    <div className="w-full bg-blue-50 px-1 animate-pulse h-[100vh] ">
      <div className="w-full md:w-[90%] lg:w-[1250px] mx-auto md:flex lg:flex items-baseline border-y border-gray-400 flex-wrap h-full">
        {/* Image Skeleton */}
        <div className="sm:w-full md:w-[55%] lg:w-[55%] p-2">
          <div className="w-full h-[400px] bg-gray-300 rounded-lg"></div>
        </div>

        {/* Details Skeleton */}
        <div className="sm:w-full md:w-[45%] lg:w-[45%] p-4 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-2/3"></div>
          <div className="h-10 bg-gray-300 rounded w-full"></div>
          <div className="h-10 bg-gray-300 rounded w-1/3"></div>
        </div>
      </div>

      {/* Regarding Info Skeleton */}
      <div className="bg-blue-50 w-full md:w-[90%] lg:w-[1250px] mx-auto p-4 space-y-2">
        <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
    </div>
  );
}
