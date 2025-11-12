import React from 'react';
import Image from 'next/image';
import { TContactLens } from '@/ts-definition/types';
import profile from '../../public/images/lense-4.png';
import Link from 'next/link';


const LenseCard:React.FC<TContactLens> = ({images, badge, salesPrice, brand, color, _id}) => {
    
    return (
    <div className="relative bg-white shadow-md p-4 rounded-md w-[180px]">
      {(
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-[2px] rounded-sm font-semibold">
          {(badge === undefined || badge === "") ? "Not-Added": badge }
        </span>
      )}

      
      <br />
      <div className=" mb-3 w-[140px] flex items-center justify-center">
        <Link href={`/contactLensDetail/${_id}`}>
            <Image
          src={(images?.length && images?.length > 0) ? images[0] : profile }
          alt="contact-lense-cart"
          width={120}
          height={60}
          className="object-contain block  "
        />
        </Link>
      </div>

      <p className="text-[10px] text-gray-500">{brand}</p>
      <p className="text-[10px] text-gray-500">{color}</p>
      {/* <p className="text-[11px] font-semibold">{discountPercentage}%</p> */}
      <p className="text-md font-bold text-red-600 mt-1">৳ {salesPrice}</p>

      <div className='absolute bottom-5 right-2'>
        <div className="text-xs text-gray-600">
            {/* <span className='text-[11px] font-bold'>{discountLabel}</span> */}
        </div>
      </div>
    </div>
  );
};

export default LenseCard;