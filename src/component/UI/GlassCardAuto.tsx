import React from 'react';
import {CameraIcon} from 'lucide-react'
import { GlassCardProps } from '@/ts-definition/interfaces';
import Image from 'next/image';
import Link from 'next/link';



const GlassCardAuto:React.FC<GlassCardProps> = ({image, title, model, price, tag, colorCount, id}) => {

    return (
    <div className="relative bg-white shadow-md p-4 rounded-md w-full md:w-[230px] lg:w-[230px] xl:w-[210px] 2xl:w-[230px] ">
      {tag && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-[2px] rounded-sm font-semibold">
          {tag}
        </span>
      )}

      <span className="absolute top-2 right-2 text-[10px] text-gray-500 text-center leading-3">
        {colorCount} <br />
        Colour
      </span>

      <div className=" mb-3 w-full flex items-center justify-center">
        <Link href={`/singleproduct/${id}`}>
          <Image
          src={image}
          alt={title}
          width={120}
          height={60}
          className="object-contain block  "
        />
        </Link>
      </div>

      <p className="text-[10px] text-gray-500">{model}</p>
      <p className="text-[11px] font-semibold">{title}</p>
      <p className="text-md font-bold text-red-600 mt-1">৳ {price}</p>

      <div className='absolute bottom-2 right-2'>
        <div className="text-xs text-gray-600 mt-2 ">
            <CameraIcon className="w-8 h-8 mx-auto" />
            <span className='text-[9px]'>Virtual Try-on</span>
        </div>
      </div>
    </div>
  );
};

export default GlassCardAuto;