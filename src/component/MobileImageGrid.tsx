"use client";

import Image from "next/image";
// import img1 from "../../public/images/brandsIcon/mobile-grid-1.png";
// import img2 from "../../public/images/brandsIcon/mobile-grid-2.png";
// import img3 from "../../public/images/brandsIcon/mobile-grid-3.png";
// import img4 from "../../public/images/brandsIcon/mobile-grid-4.png";
import { IBanner } from "@/ts-definition/interfaces";
import { bannerAccordingToCategory } from "@/fetchData/bannerAccordingToCategory";

const MobileImageGrid = ({bannerData}: {bannerData:IBanner[]}) => {
  return (
    <div className="md:hidden lg:hidden">
      <p className="text-center font-bold text-blue-700">Exclusive at Eyeline Optica</p>
      <div className="w-full py-2 px-4 flex items-center justify-between">
      
      {/* div 1 */}
      <div
        className="
          grid grid-cols-1 grid-rows-1 gap-3 
          w-[49%]
        "
      >
        {/* 1️⃣ Big Image */}
        
        <div className="col-span-1 row-span-1">
          <Image
            width={400}
            height={400}
            src={bannerAccordingToCategory("Mobile Banner One", bannerData) as string}
            alt="Image 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* 2️⃣ Small Image */}
        <div className="col-span-1 row-span-1">
          <Image
             width={300}
            height={300}
            src={bannerAccordingToCategory("Mobile Banner Two", bannerData) as string}
            alt="Image 2"
            className="w-full object-cover rounded-lg"
          />
        </div>
      </div>
      {/* div 2 */}
      <div
        className="
          grid grid-cols-1 grid-rows-1 gap-3 
          w-[49%]
        "
      >
        {/* 2️⃣ Small Image */}
        <div className="col-span-1 row-span-1">
          <Image
             width={300}
            height={300}
            src={bannerAccordingToCategory("Mobile Banner Four", bannerData) as string}
            alt="Image 2"
            className="w-full h-full rounded-lg"
          />
        </div>
        {/* 1️⃣ Big Image */}
        <div className="col-span-1 row-span-1">
          <Image
            width={400}
            height={400}
            src={bannerAccordingToCategory("Mobile Banner Three", bannerData) as string}
            alt="Image 1"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>        
      </div>
      </div>
    </div>
  );
};

export default MobileImageGrid;
