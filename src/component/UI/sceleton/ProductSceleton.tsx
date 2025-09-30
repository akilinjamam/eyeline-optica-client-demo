const ProductSkeleton = () => {
  return (
    <div className="relative bg-white shadow-md p-4 rounded-md w-[97%] animate-pulse mx-1">
      {/* Badge placeholder */}
      <span className="absolute top-2 left-2 w-10 h-4 bg-gray-300 rounded-sm"></span>

      {/* Color placeholder */}
      <span className="absolute top-2 right-2 w-8 h-3 bg-gray-200 rounded"></span>

      {/* Image placeholder */}
      <div className="mb-3 w-full flex items-center justify-center">
        <div className="w-[120px] h-[60px] bg-gray-300 rounded"></div>
      </div>

      {/* Brand */}
      <div className="h-3 w-16 bg-gray-200 rounded mb-2"></div>

      {/* Name */}
      <div className="h-3 w-28 bg-gray-300 rounded mb-2"></div>

      {/* Price */}
      <div className="h-4 w-20 bg-gray-400 rounded mb-2"></div>

      {/* Try-on button placeholder */}
      <div className="absolute bottom-2 right-2 flex flex-col items-center space-y-1">
        <div className="w-8 h-8 bg-gray-300 rounded"></div>
        <div className="w-10 h-2 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

const ProductSkeletonGallery = () => {
  return (
    <div
      className="
        grid 
        grid-cols-1 
        sm:grid-cols-3 
        md:grid-cols-4 
        lg:grid-cols-5 
        xl:grid-cols-6 
        gap-4 w-full
      "
    >
      {Array.from({ length: 12 }).map((_, idx) => (
        <ProductSkeleton key={idx} />
      ))}
    </div>
  );
};

export default ProductSkeletonGallery;
