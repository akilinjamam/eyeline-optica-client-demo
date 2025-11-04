/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import useFetchWeeklyDealsData from '@/custom-hooks/useFetchWeeklyDealsData';
import SlideOptionsForAccessory from './SlideOptionForAccessory';
import { handleDealsPrice } from '@/utilities/priceAfterDealsDiscount';

export type TLensInfo = {
  title:string;
  price:number;
  brand:string;
  color:string;
  id:string;
}

const SlideImageAndPriceDetailForAccessory = ({ singleLens }: { singleLens: any }) => {
  const regularPrice = singleLens?.items?.map((value:any) => value.salesPrice)?.reduce((acc:any, sum:any) => acc + sum , 0);

  const {dealsData} = useFetchWeeklyDealsData()

  const priceIfDealsAvailable = handleDealsPrice(dealsData?.active,singleLens?.weeklyDeals ?? false, regularPrice ?? 0, dealsData?.discountPercent )

  return (
    <div className="p-2">
      
       <SlideOptionsForAccessory singleLens={singleLens}/>
       {/* bottom section */}
      <div className="w-full absolute bottom-0 h-15 flex items-center justify-center bg-white">
        <div className="w-[100%] h-auto  flex items-center justify-center">
          <div className="flex items-center justify-end font-bold text-sm w-[90%]">
            <p className='bg-blue-800 rounded-md text-white px-2 py-1 w-full text-center'>৳{priceIfDealsAvailable}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideImageAndPriceDetailForAccessory
