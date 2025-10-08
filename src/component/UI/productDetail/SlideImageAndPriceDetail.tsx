'use client'
import Image from 'next/image';
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
  console.log(lensInfo)
 
  return (
    <div className="p-2">
      {/* top section */}
      <div className="w-full h-[20vh] mx-auto flex items-start">
        <div className="w-[40%] h-full border border-gray-400 rounded-md flex items-center justify-center">
          <Image src={product?.images?.length ? product.images?.[0] : ''} alt="single-img" width={150} height={150} />
        </div>
        <div className="w-[60%] h-[200px] p-1">
          <div className="flex justify-between font-bold text-sm">
            <label>Frame: {product?.name}</label>
            <p>৳{product?.salesPrice}</p>
          </div>
          <div className="flex justify-between font-bold text-sm">
            <label>Lens: {lensInfo?.title}</label>
            <p>৳{lensInfo?.price}</p>
          </div>
          <hr className='my-2'/>
          <div className="flex justify-between font-bold text-sm">
            <label>Total:</label>
            <p>৳{Number(product?.salesPrice) + lensInfo?.price}</p>
          </div>
        </div>
      </div>

      <br />

      {/* Sliding container */}
      <SlideOptions lens={lens} setLensInfo={setLensInfo as () => void}/>
    </div>
  );
};

export default SlideImageAndPriceDetail;
