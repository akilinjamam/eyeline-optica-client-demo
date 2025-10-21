'use client'
/* eslint-disable @typescript-eslint/no-explicit-any */
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';

const ImagePartforAccessory: React.FC<any> = ({ product }) => {
  const [selectImg, setSelectImg] = useState<number>(0);

  useEffect(() => {
    // Reset selected image index to 0 whenever product changes
    if (product?.images && product.images.length > 0) {
      setSelectImg(0);
    }
  }, [product]);

  return (
    <div>
      <div className="w-full bg-white flex items-center justify-between p-1">
        {/* <div className="w-[15%] h-[100%] flex-wrap items-center"></div> */}
        <div className="w-full flex items-center justify-center">
          {product?.images && product.images.length > 0 && (
            <Image
              src={product.images[selectImg]}
              height={600}
              width={600}
              alt="glass-image"
            />
          )}
        </div>
      </div>

      <div className="w-full bg-white">
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
      </div>
    </div>
  );
};

export default ImagePartforAccessory;
