'use client'
import { TOtherImages } from '@/ts-definition/types';
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';

const ImagePart: React.FC<any> = ({ product }) => {
  const [selectImg, setSelectImg] = useState<number>(0);
  const [selectSideImg, setSelectSideImg] = useState(0)

  useEffect(() => {
    // Reset selected image index to 0 whenever product changes
    if (product?.images && product.images.length > 0) {
      setSelectImg(0);
    }
  }, [product]);

  return (
    <div className='lg:block md:block hidden'>
      <div className="w-full bg-white flex items-center justify-between p-1">
        <div className="w-[10%] h-[100%] flex-wrap items-center  ">
          {product?.otherImages?.length > 0 && product.otherImages[0]?.images?.length > 0 && (
          <div>
            {
              product?.otherImages[selectImg]?.images?.map((img:string, index:number) => {
                return (
                  <Image
                  key={index}
                  src={img}
                  height={200}
                  width={200}
                  alt="glass-image"
                  className='w-[50px] mx-auto border border-blue-600 my-3 cursor-pointer'
                  onClick={() => setSelectSideImg(index)}
            />
                )
              })
            }
          </div>
          )}
        </div>
        <div className="flex items-center justify-center w-[90%]">
          {product?.images && product.images.length > 0 && (
            <Image
              src={product.images[selectImg]}
              height={600}
              width={600}
              alt="glass-image"
            />
          )}
          {product?.otherImages && product.otherImages.length > 0 && (
            <Image
              src={product.otherImages[selectImg]?.images[selectSideImg]}
              height={600}
              width={600}
              alt="glass-image"
            />
          )}
        </div>
      </div>

      <div className="w-full bg-white">
        {
          (product?.images && product?.images?.length > 0)
          &&
          <div className="lg:w-[80%] mx-auto flex items-center">
          {product?.images?.slice(0, 6).map(
            (img: StaticImageData | string, index: number) => (
              <Image
                onClick={() => setSelectImg(index)}
                src={img}
                key={index}
                width={50}
                height={50}
                alt="horizontal-img"
                className={`cursor-pointer mr-5 ${
                  index === selectImg ? 'border-t-2 border-gray-400' : ''
                }`}
              />
            )
          )}
        </div>
        }
        {
          (product?.otherImages && product?.otherImages?.length > 0)
          &&
          <div className='w-full flex items-center justify-end'>
            <div className="w-[90%] h-[100px] flex items-center justify-center">
          {product?.otherImages?.slice(0, 6).map(
            (vairant: TOtherImages , index: number) => (
              <div key={index} className='mx-2'>
                <div
                onClick={() => setSelectImg(index)}
                
                className={`text-center cursor-pointer mx-auto rounded-full w-[22px] h-[22px] ${
                  index === selectImg ? 'border-t-2 border-gray-400' : ''
                }`}
                style={{
                  background: `linear-gradient(to right, ${vairant?.fromColor}, ${vairant.toColor})`,
                }}
              >
                </div>
                <p className='text-xs mt-2 text-black'>{vairant?.colorName}</p>
              </div>
            )
          )}
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ImagePart;
