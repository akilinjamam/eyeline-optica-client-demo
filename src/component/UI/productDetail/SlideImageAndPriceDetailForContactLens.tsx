/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import useFetchWeeklyDealsData from '@/custom-hooks/useFetchWeeklyDealsData';
import SlideOptionsForContactLens from './SlideOptionForContactLens';
import { TAccessory } from '@/ts-definition/types';
import { useState } from 'react';
import { handleDealsPrice } from '@/utilities/priceAfterDealsDiscount';

export type TAccessoryInfo = {
  images: string[],
  name:string;
  price:number;
  total:number;
  brand:string;
  id:string;
  description:string;
  category:string;
  weeklyDeals:boolean;
}

const SlideImageAndPriceDetailForContactLens = ({ singleLens, allAccessory }: { singleLens: any, allAccessory:TAccessory[] }) => {

  const {dealsData} = useFetchWeeklyDealsData()

  const price = handleDealsPrice(dealsData?.active,singleLens?.weeklyDeals ?? false, singleLens?.salesPrice ?? 0, dealsData?.discountPercent )
 

  const [selectAccessory, setSelectAccessory] = useState<TAccessoryInfo>({
  images: [],
  name: "",
  brand: "",
  price: 0,
  total: 0,
  id: "",
  description: "",
  category: "",
  weeklyDeals:false
})

 const priceForAccessory = handleDealsPrice(dealsData?.active,selectAccessory?.weeklyDeals ?? false, selectAccessory?.total ?? 0, dealsData?.discountPercent )
  
  return (
    <div className="p-2">
     

      {/* Sliding container */}
      
       <SlideOptionsForContactLens singleLens={singleLens} allAccessory={allAccessory} setSelectAccessory={setSelectAccessory} selectAccessory={selectAccessory}/>
       {/* bottom section */}
      <div className="w-full absolute bottom-0 h-25 flex items-center justify-center bg-white">
        <div className="w-[100%] h-auto  flex items-center justify-center">
          <div className="flex items-center justify-end font-bold text-sm w-[80%]">
            <p className='bg-blue-800 rounded-md text-white px-2 py-1 w-full text-center'>৳{Number(price) + (priceForAccessory ? priceForAccessory : 0) }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideImageAndPriceDetailForContactLens
