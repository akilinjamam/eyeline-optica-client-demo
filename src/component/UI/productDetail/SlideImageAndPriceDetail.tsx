'use client'
import Image from 'next/image';
import SlideOptions from './SlideOptions';
import { TFrame } from '@/ts-definition/types';


const SlideImageAndPriceDetail = ({ product }: { product: TFrame }) => {
  
  return (
    <div className="p-2">
      {/* top section */}
      <div className="w-full h-[20vh] mx-auto flex items-start">
        <div className="w-[40%] h-full border border-gray-400 rounded-md flex items-center justify-center">
          <Image src={product?.images?.length ? product.images?.[0] : ''} alt="single-img" width={150} height={150} />
        </div>
        <div className="w-[60%] h-[200px] p-1">
          <div className="flex justify-between font-bold text-sm">
            <label>Price</label>
            <p>{product?.salesPrice}</p>
          </div>
          <div className="flex justify-between font-bold text-sm">
            <label>Total:</label>
          </div>
        </div>
      </div>

      <br />

      {/* Sliding container */}
      <SlideOptions/>
    </div>
  );
};

export default SlideImageAndPriceDetail;
