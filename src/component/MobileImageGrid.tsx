"use client";

import Image from "next/image";
import img1 from "../../public/images/brandsIcon/mobile-grid-1.png";
import img2 from "../../public/images/brandsIcon/mobile-grid-2.png";
// import img3 from "../../public/images/brandsIcon/mobile-grid-3.png";
import img4 from "../../public/images/brandsIcon/mobile-grid-4.png";

const MobileImageGrid = () => {
  return (
    <div className=" md:hidden lg:hidden w-full py-6 px-4 flex items-center justify-between">
      <div
        className="
          grid grid-cols-1 grid-rows-1 gap-3 
          w-[49%]
        "
      >
        {/* 1️⃣ Big Image */}
        <div className="col-span-1 row-span-1">
          <Image
            src={img1}
            alt="Image 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* 2️⃣ Small Image */}
        <div className="col-span-1 row-span-1">
          <Image
            src={img4}
            alt="Image 2"
            className="w-full object-cover rounded-lg"
          />
        </div>
      </div>
      <div
        className="
          grid grid-cols-1 grid-rows-1 gap-3 
          w-[49%] 
        "
      >
        {/* 2️⃣ Small Image */}
        <div className="col-span-1 row-span-1">
          <Image
            src={img2}
            alt="Image 2"
            className="w-full h-full rounded-lg"
          />
        </div>
        {/* 1️⃣ Big Image */}
        <div className="col-span-1 row-span-1">
          <Image
            src={img1}
            alt="Image 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>        
      </div>
    </div>
  );
};

export default MobileImageGrid;
