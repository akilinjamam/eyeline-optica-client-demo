/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import SlideOptions from './SlideOptions';
import { TFrame, TWeeklyDeals } from '@/ts-definition/types';
import { ILense } from '@/ts-definition/interfaces';
import { useState } from 'react';
import { handleDealsPrice } from '@/utilities/priceAfterDealsDiscount';

export type TLensInfo = {
  title:string;
  price:number;
  brand:string;
  color:string;
  id:string;
  weeklyDeals?:boolean;
  lensType:string;
}

const SlideImageAndPriceDetail = ({ product, lens, weeklyDeals, setSelectTitle }: { product: TFrame, lens:ILense[], weeklyDeals:TWeeklyDeals, setSelectTitle:any }) => {
  const [lensInfo, setLensInfo] = useState<TLensInfo>({
    title:"",
    price:0,
    brand: "",
    color: "",
    id:"",
    lensType: "",

  });

  const price = handleDealsPrice(weeklyDeals?.active,product?.weeklyDeals ?? false, product?.salesPrice ?? 0, weeklyDeals?.discountPercent )

  const lensPrice = handleDealsPrice(weeklyDeals?.active,lensInfo?.weeklyDeals ?? false, lensInfo?.price ?? 0, weeklyDeals?.discountPercent )
 
  return (
    <div className="p-2">
      {/* Sliding container */}
      <SlideOptions setSelectTitle={setSelectTitle} lens={lens} setLensInfo={setLensInfo as () => void} product={product as TFrame} lensInfo={lensInfo} />
      {/* bottom section */}
      <div className="w-full absolute bottom-0 h-25 flex items-center justify-center bg-white">
        <div className="w-[100%] h-auto  flex items-center justify-center">
          <div className="flex items-center justify-end font-bold text-sm w-[80%]">
            
            <p className='bg-blue-800 rounded-md text-white px-2 py-4 w-full text-center'>৳{Number(price) + (lensPrice ?? 0) }</p>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideImageAndPriceDetail;
