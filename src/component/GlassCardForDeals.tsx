/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {CameraIcon} from 'lucide-react'
import Image from 'next/image';
import { TFrame } from '@/ts-definition/types';
import defaultImage from '../../public/images/glass-1.png';
import Link from 'next/link';


const GlassCardForDeals:React.FC<TFrame> = ({images, name, brand, salesPrice, badge,_id, dealsOffer, weeklyDeals, category, rating, otherImages}) => {
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
    <div className="relative bg-white shadow-lg p-4 rounded-4xl w-[193px] md:w-[250px] lg:w-[250px] my-4 border border-blue-400 ">
      {badge && (
        <span className="absolute top-3 left-4 bg-red-600 text-white text-[10px] px-2 py-[1px] rounded-sm font-semibold">
          {badge}
        </span>
      )}

      <div className="w-[153px] md:w-[210px] lg:w-[210px] flex items-center justify-center  ">
        <Link href={`${handleRoute(category as string)}`}>
          <Image
            src={images && images?.length ? images?.[0] : (otherImages ? otherImages[0]?.images[0] : defaultImage)}
            alt={name || "Glass product image"}
            width={150}
            height={150}
            className="object-contain block cursor-pointer h-[90px] md:h-[120px] lg:h-[120px] "
          />
        </Link>
      </div>

      <p className="text-[10px] text-gray-500">{brand}</p>
      <p className="text-[10px] font-semibold text-black">{name}</p>
      <span className="text-md md:text-md lg:text-md font-bold text-black line-through">৳ {salesPrice}</span>
      {
        weeklyDeals && <span className="text-md font-bold text-red-600 mt-1 ml-2">৳{(salesPrice ?? 0) - (Math.floor(((salesPrice ?? 0) * (dealsOffer ?? 0)) / 100))}</span>
      }
      <br /><br />
      <div className='absolute bottom-5 right-2'>
        <div className="text-xs text-gray-600">
            <CameraIcon className="w-5 md:w-8 lg:w-8 h-5 md:h-8 lg:h-8 mx-auto" />
            <span className='text-[8px] md:text-[10px] lg:text-[10px] '>Virtual Try-on</span>
        </div>
      </div>
       <div className="absolute left-1/2 -translate-x-1/2 bottom-5 flex">
      {otherImages &&
        otherImages.map((item:any, index:number) => (
          <div
            key={index}
           
            style={{
              background: `linear-gradient(to right, ${item.fromColor}, ${item.toColor})`,
            }}
            className={`w-[8px] md:w-[12px] lg:w-[12px] h-[8px] md:h-[12px] lg:h-[12px] rounded-full mx-[2px] md:mx-1 lg:mx-1 cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
};

export default GlassCardForDeals;