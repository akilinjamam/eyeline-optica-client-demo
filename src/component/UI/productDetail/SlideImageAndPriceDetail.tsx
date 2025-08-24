'use client'
import { GlassCardProps } from '@/ts-definition/interfaces';
import Image from 'next/image';
import SlideOptions from './SlideOptions';


const SlideImageAndPriceDetail = ({ product }: { product: GlassCardProps }) => {
  
  return (
    <div className="p-2">
      {/* top section */}
      <div className="w-full h-[20vh] mx-auto flex items-start">
        <div className="w-[40%] h-full bg-gray-200 flex items-center justify-center">
          <Image src={product.image} alt="single-img" width={150} height={150} />
        </div>
        <div className="w-[60%] h-[200px] p-1">
          <div className="flex justify-between font-bold text-sm">
            <label>Price</label>
            <p>{product.price}</p>
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
