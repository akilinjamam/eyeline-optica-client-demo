/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {CameraIcon} from 'lucide-react'
import Image from 'next/image';
import defaultImage from '../../public/images/glass-1.png';
import Link from 'next/link';


const GlassCard:React.FC<any> = ({images, otherImages, name, brand, salesPrice, badge, _id}) => {

    return (
    <div className="relative bg-white shadow-lg p-4 rounded-4xl w-[300px] my-4 border border-blue-400 ">
      {badge && (
        <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2 py-[2px] rounded-sm font-semibold">
          {badge}
        </span>
      )}

      {/* <span className="absolute top-2 right-2 text-[10px] text-gray-500 text-center leading-3">
        {color} <br />
      </span> */}

      <div className=" mb-3 w-[260px] flex items-center justify-center">
        <Link href={`/productDetail/${_id}`}>
          <Image
            src={images && images?.length ? images?.[0] : (otherImages ? otherImages[0]?.images[0] : defaultImage)}
            alt={name || "Glass product image"}
            width={250}
            height={110}
            className="object-contain block cursor-pointer h-[150px] "
          />
        </Link>
      </div>

      <p className="text-[10px] text-gray-500">{brand}</p>
      <p className="text-[11px] font-semibold text-black">{name}</p>
      <p className="text-md font-bold text-red-600 mt-1">৳ {salesPrice}</p>

      <div className='absolute bottom-3 right-5'>
        <div className="text-xs text-gray-600 mt-2 ">
            <CameraIcon className="w-8 h-8 mx-auto" />
            <span className='text-[9px]'>Virtual Try-on</span>
        </div>
      </div>
    </div>
  );
};

export default GlassCard;