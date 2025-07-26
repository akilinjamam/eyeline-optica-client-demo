import React from 'react';
import {  ILenseData } from '@/ts-definition/interfaces';
import Image from 'next/image';



const LenseCard:React.FC<ILenseData> = ({image, badge, price, brand, usageInfo, discountPercentage, discountLabel}) => {

    return (
    <div className="relative bg-white shadow-md p-4 rounded-md w-[180px]">
      {badge && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-[2px] rounded-sm font-semibold">
          {badge}
        </span>
      )}

      
      <br />
      <div className=" mb-3 w-[140px] flex items-center justify-center">
        <Image
          src={image}
          alt="contact-lense-cart"
          width={120}
          height={60}
          className="object-contain block  "
        />
      </div>

      <p className="text-[10px] text-gray-500">{brand}</p>
      <p className="text-[10px] text-gray-500">{usageInfo}</p>
      <p className="text-[11px] font-semibold">{discountPercentage}%</p>
      <p className="text-md font-bold text-red-600 mt-1">৳ {price}</p>

      <div className='absolute bottom-5 right-2'>
        <div className="text-xs text-gray-600">
            <span className='text-[11px] font-bold'>{discountLabel}</span>
        </div>
      </div>
    </div>
  );
};

export default LenseCard;