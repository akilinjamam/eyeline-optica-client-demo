/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image';
import SlideOptionsForContactLens from './SlideOptionForContactLens';

export type TLensInfo = {
  title:string;
  price:number;
  brand:string;
  color:string;
  id:string;
}

const SlideImageAndPriceDetailForContactLens = ({ singleLens }: { singleLens: any }) => {
  
  return (
    <div className="p-2">
      {/* top section */}
      <div className="w-full h-[20vh] mx-auto flex items-start">
        <div className="w-[40%] h-full border border-gray-400 rounded-md flex items-center justify-center">
          <Image src={singleLens?.images?.length ? singleLens.images?.[0] : ''} alt="single-img" width={150} height={150} />
        </div>
        <div className="w-[60%] h-[200px] p-1">
          <div className="flex justify-between font-bold text-sm">
            <label>Frame: {singleLens?.name}</label>
            <p>৳{singleLens?.salesPrice}</p>
          </div>
          
          <hr className='my-2'/>
          <div className="flex justify-between font-bold text-sm">
            <label>Sub total:</label>
            <p>৳{Number(singleLens?.salesPrice) }</p>
          </div>
          <div className="flex justify-between font-bold text-sm">
            <label>Delivery Charge:</label>
            <p>৳70</p>
          </div>
          <hr className='my-2'/>
          <div className="flex justify-between font-bold text-sm">
            <label>Total:</label>
            <p>৳{Number(singleLens?.salesPrice)  + 70 }</p>
          </div>
        </div>
      </div>

      <br />

      {/* Sliding container */}
      
       <SlideOptionsForContactLens singleLens={singleLens}/>
    </div>
  );
};

export default SlideImageAndPriceDetailForContactLens
