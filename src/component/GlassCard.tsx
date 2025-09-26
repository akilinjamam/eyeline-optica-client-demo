import React from 'react';
import {CameraIcon} from 'lucide-react'
import Image from 'next/image';
import { TFrame } from '@/ts-definition/types';



const GlassCard:React.FC<TFrame> = ({images, name, brand, salesPrice, badge, color}) => {

    return (
    <div className="relative bg-white shadow-md p-4 rounded-md w-[180px]">
      {badge && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-[2px] rounded-sm font-semibold">
          {badge}
        </span>
      )}

      <span className="absolute top-2 right-2 text-[10px] text-gray-500 text-center leading-3">
        {color} <br />
        Colour
      </span>

      <div className=" mb-3 w-[140px] flex items-center justify-center">
        <Image
          src={images && images?.length ? images[0] : '/placeholder.png'}
           alt={name || "Glass product image"}
          width={120}
          height={60}
          className="object-contain block  "
        />
      </div>

      <p className="text-[10px] text-gray-500">{brand}</p>
      <p className="text-[11px] font-semibold">{name}</p>
      <p className="text-md font-bold text-red-600 mt-1">৳ {salesPrice}</p>

      <div className='absolute bottom-2 right-2'>
        <div className="text-xs text-gray-600 mt-2 ">
            <CameraIcon className="w-8 h-8 mx-auto" />
            <span className='text-[9px]'>Virtual Try-on</span>
        </div>
      </div>
    </div>
  );
};

export default GlassCard;