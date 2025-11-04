/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import useFetchWeeklyDealsData from '@/custom-hooks/useFetchWeeklyDealsData';
import SlideOptionsForLens from './SlideOptionForLens';
import { handleDealsPrice } from '@/utilities/priceAfterDealsDiscount';

export type TLensInfo = {
  title:string;
  price:number;
  brand:string;
  color:string;
  id:string;
}

const SlideImageAndPriceDetailForLens = ({ singleLens }: { singleLens: any }) => {

  const {dealsData} = useFetchWeeklyDealsData()

  const price = handleDealsPrice(dealsData?.active,singleLens?.weeklyDeals ?? false, singleLens?.salesPrice ?? 0, dealsData?.discountPercent )
  
  return (
    <div className="p-2">
        
      <SlideOptionsForLens singleLens={singleLens}/>
      {/* bottom section */}
      <div className="w-full absolute bottom-0 h-15 flex items-center justify-center bg-white">
        <div className="w-[100%] h-auto  flex items-center justify-center">
          <div className="flex items-center justify-end font-bold text-sm w-[90%]">
            <p className='bg-blue-800 rounded-md text-white px-2 py-1 w-full text-center'>৳{Number(price) }</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideImageAndPriceDetailForLens;
