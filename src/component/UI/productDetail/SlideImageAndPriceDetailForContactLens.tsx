/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image';
import SlideOptionsForContactLens from './SlideOptionForContactLens';
import { TAccessory } from '@/ts-definition/types';
import { useState } from 'react';

export type TAccessoryInfo = {
  images: string[],
  name:string;
  price:number;
  total:number;
  brand:string;
  id:string;
  description:string;
  category:string;
}

const SlideImageAndPriceDetailForContactLens = ({ singleLens, allAccessory }: { singleLens: any, allAccessory:TAccessory[] }) => {

  const [selectAccessory, setSelectAccessory] = useState<TAccessoryInfo>({
  images: [],
  name: "",
  brand: "",
  price: 0,
  total: 0,
  id: "",
  description: "",
  category: ""
})
  
  return (
    <div className="p-2">
      {/* top section */}
      <div className="w-full h-[20vh] mx-auto flex items-start">
        <div className="w-[40%] h-full border border-gray-400 rounded-md flex items-center justify-center">
          <Image src={singleLens?.images?.length ? singleLens.images?.[0] : ''} alt="single-img" width={150} height={150} />
        </div>
        <div className="w-[60%] h-[200px] p-1">
          <div className="flex justify-between font-bold text-sm">
            <label>{singleLens?.name}</label>
            <p>৳{singleLens?.salesPrice}</p>
          </div>
          {
            selectAccessory?.name
            &&
            <div className="flex justify-between font-bold text-sm">
              <label>{selectAccessory?.name}</label>
              <p>৳{selectAccessory?.price}</p>
          </div>
          }
          
          <hr className='my-2'/>
          <div className="flex justify-between font-bold text-sm">
            <label>Sub total:</label>
            <p>৳{Number(singleLens?.salesPrice) +  (selectAccessory?.total ? selectAccessory?.total : 0) }</p>
          </div>
          <div className="flex justify-between font-bold text-sm">
            <label>Delivery Charge:</label>
            <p>৳70</p>
          </div>
          <hr className='my-2'/>
          <div className="flex justify-between font-bold text-sm">
            <label>Total:</label>
            <p>৳{Number(singleLens?.salesPrice) + (selectAccessory?.total ? selectAccessory?.total : 0)  + 70 }</p>
          </div>
        </div>
      </div>

      <br />

      {/* Sliding container */}
      
       <SlideOptionsForContactLens singleLens={singleLens} allAccessory={allAccessory} setSelectAccessory={setSelectAccessory} selectAccessory={selectAccessory}/>
    </div>
  );
};

export default SlideImageAndPriceDetailForContactLens
