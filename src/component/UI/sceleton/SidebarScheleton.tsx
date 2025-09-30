"use client";

const SidebarSkeleton = () => {
  return (
    <aside
      className="
        fixed top-0 left-0 h-[100vh] w-60 p-2 bg-blue-50 shadow-lg z-50
        border-r-2 border-gray-200
        md:static md:shadow-none overflow-y-scroll hide-scrollbar
        animate-pulse
      "
    >
      {/* Header (mobile) */}
      <div className="flex justify-between items-center p-4 border-b md:hidden">
        <div className="w-20 h-5 bg-gray-300 rounded"></div>
        <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
      </div>

      {/* Frame Color Section */}
      <div className="mt-4">
        <div className="w-28 h-4 bg-gray-300 rounded mb-3"></div>
        <div className="space-y-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
              <div className="w-16 h-3 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Accordion Section */}
      <div className="mt-6 space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            {/* Accordion title */}
            <div className="w-32 h-4 bg-gray-300 rounded"></div>
            {/* Accordion children */}
            <div className="ml-2 space-y-2">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="w-24 h-3 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Active Filters Section */}
      <div className="mt-6">
        <div className="w-28 h-4 bg-gray-300 rounded mb-2"></div>
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="w-20 h-6 bg-gray-200 rounded"></div>
          ))}
        </div>
        <div className="mt-3 w-24 h-8 bg-gray-400 rounded"></div>
      </div>
    </aside>
  );
};

export default SidebarSkeleton;
