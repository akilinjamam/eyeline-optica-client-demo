'use client'
import SlideOptions from './SlideOptions';
import { TFrame } from '@/ts-definition/types';
import { ILense } from '@/ts-definition/interfaces';
import { useState } from 'react';

export type TLensInfo = {
  title:string;
  price:number;
  brand:string;
  color:string;
  id:string;
}

const SlideImageAndPriceDetail = ({ product, lens }: { product: TFrame, lens:ILense[] }) => {
  const [lensInfo, setLensInfo] = useState<TLensInfo>({
    title:"",
    price:0,
    brand: "",
    color: "",
    id:""

  })
 
  return (
    <div className="p-2">
      {/* Sliding container */}
      <SlideOptions lens={lens} setLensInfo={setLensInfo as () => void} product={product as TFrame} lensInfo={lensInfo}/>
      {/* bottom section */}
      <div className="w-full absolute bottom-0 h-15 flex items-center justify-center bg-white">
        <div className="w-[100%] h-auto  flex items-center justify-center">
          <div className="flex items-center justify-end font-bold text-sm w-[90%]">
            <p className='bg-blue-800 rounded-md text-white px-2 py-1 w-full text-center'>৳{Number(product?.salesPrice) + lensInfo?.price }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideImageAndPriceDetail;
