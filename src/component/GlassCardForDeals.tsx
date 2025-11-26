import React from 'react';
import {CameraIcon} from 'lucide-react'
import Image from 'next/image';
import { TFrame } from '@/ts-definition/types';
import defaultImage from '../../public/images/glass-1.png';
import Link from 'next/link';


const GlassCardForDeals:React.FC<TFrame> = ({images, name, brand, salesPrice, badge, color,_id, dealsOffer, weeklyDeals, category, rating}) => {
  console.log(rating)

  const handleRoute = (value:string) => {
    if(value === 'Frame'){
      return `/productDetail/${_id}`
    }
    if(value === 'Lens'){
      return `/lensDetail/${_id}`
    }
    if(value === 'Contact Lens'){
      return `/contactLensDetail/${_id}`
    }
    if(value === 'Accessory'){
      return `/accessoryDetail/${_id}`
    }
  }

    return (
    <div className="relative bg-white shadow-md p-4 rounded-md w-[240px]">
      {badge && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-[2px] rounded-sm font-semibold">
          {badge}
        </span>
      )}

      <span className="absolute top-2 right-2 text-[10px] text-gray-500 text-center leading-3">
        {color} <br />
        
      </span>

      <div className=" mb-3 w-[200px] flex items-center justify-center">
        <Link href={`${handleRoute(category as string)}`}>
          <Image
            src={images && images?.length ? images?.[0] : defaultImage}
            alt={name || "Glass product image"}
            width={120}
            height={60}
            className="object-contain block cursor-pointer"
          />
        </Link>
      </div>

      <p className="text-[10px] text-gray-500">{brand}</p>
      <p className="text-[11px] font-semibold text-black">{name}</p>
      <span className="text-md font-bold text-red-600 mt-1 line-through ">৳ { salesPrice}</span>
      {
        weeklyDeals && <span className="text-md font-bold text-red-600 mt-1 ml-2">৳ {(salesPrice ?? 0) - (Math.floor(((salesPrice ?? 0) * (dealsOffer ?? 0)) / 100))}</span>
      }

      <div className='absolute bottom-2 right-2'>
        <div className="text-xs text-gray-600 mt-2 ">
            <CameraIcon className="w-8 h-8 mx-auto" />
            <span className='text-[9px]'>Virtual Try-on</span>
        </div>
      </div>
    </div>
  );
};

export default GlassCardForDeals;