/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image';
import SlideOptionsForAccessory from './SlideOptionForAccessory';

export type TLensInfo = {
  title:string;
  price:number;
  brand:string;
  color:string;
  id:string;
}

const SlideImageAndPriceDetailForAccessory = ({ singleLens }: { singleLens: any }) => {
  
  return (
    <div className="p-2">
      {/* top section */}
      <div className="w-full h-[20vh] mx-auto flex items-start">
        <div className="w-[40%] h-full border border-gray-400 rounded-md flex items-center justify-center">
          <Image src={singleLens?.images?.length ? singleLens.images?.[0] : ''} alt="single-img" width={150} height={150} />
        </div>
        <div className="w-[60%] h-[200px] p-1">
          <div className="flex justify-between font-bold text-sm">
            <label> {singleLens?.items?.map((i:any) => i.name)?.join('+')}</label>
            <p>৳{singleLens?.items?.map((i:any) => i.salesPrice)?.join('+')}</p>
          </div>
          
          <hr className='my-2'/>
          <div className="flex justify-between font-bold text-sm">
            <label>Sub total:</label>
            <p>৳{singleLens?.items?.map((value:any) => value.salesPrice)?.reduce((acc:any, sum:any) => acc + sum , 0)}</p>
          </div>
          <div className="flex justify-between font-bold text-sm">
            <label>Delivery Charge:</label>
            <p>৳70</p>
          </div>
          <hr className='my-2'/>
          <div className="flex justify-between font-bold text-sm">
            <label>Total:</label>
            <p>৳{singleLens?.items?.map((value:any) => value.salesPrice)?.reduce((acc:any, sum:any) => acc + sum , 0)  + 70 }</p>
          </div>
        </div>
      </div>

      <br />

      {/* Sliding container */}
      
       <SlideOptionsForAccessory singleLens={singleLens}/>
    </div>
  );
};

export default SlideImageAndPriceDetailForAccessory
