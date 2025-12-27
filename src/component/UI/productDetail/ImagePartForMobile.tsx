/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { TOtherImages } from '@/ts-definition/types';
import Image, { StaticImageData } from 'next/image';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ImagePartForMobile: React.FC<any> = ({ product }) => {
  const [selectImg, setSelectImg] = useState<number>(0);

  useEffect(() => {
    // Reset selected image index to 0 whenever product changes
    if (product?.images && product.images.length > 0) {
      setSelectImg(0);
    }
  }, [product]);

  return (
    <div className="lg:hidden md:hidden block">
      {/* Main Image Section */}
      <div className="w-full  flex items-center justify-center p-1">
        {product?.otherImages && product.otherImages.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={1}
            navigation={false}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="mySwiper w-full h-full"
          >
            {product?.otherImages[selectImg]?.images.map(
              (otherImg: string, index: number) => (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center">
                    <Image
                      src={otherImg}
                      height={600}
                      width={600}
                      alt="glass-image"
                      className="object-contain"
                    />
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        ) : (
          product?.images &&
          product.images.length > 0 && (
            <Image
              src={product.images[selectImg]}
              height={600}
              width={600}
              alt="glass-image"
              className="object-contain"
            />
          )
        )}
      </div>

      {/* Horizontal Preview Thumbnails */}
      <div className="w-full">
        {product?.images && product?.images?.length > 0 && (
          <div className="lg:w-[80%] mx-auto flex items-center overflow-x-auto p-2">
            {product?.images?.slice(0, 6).map(
              (img: StaticImageData | string, index: number) => (
                <Image
                  onClick={() => setSelectImg(index)}
                  src={img}
                  key={index}
                  width={50}
                  height={50}
                  alt="horizontal-img"
                  className={`cursor-pointer mr-5 rounded-md ${
                    index === selectImg ? 'border-t-2 border-gray-400' : ''
                  }`}
                />
              )
            )}
          </div>
        )}

        <hr className="text-gray-300" />

        {/* Color name section */}
        <div className="mt-2 mb-3 flex items-center justify-between">
          <div className=''>
             <span className="text-black ml-2 font-bold">Color: </span>
            <span className="text-gray-400 font-light">
              {product?.otherImages[selectImg]?.colorName}
            </span>
          </div>
          <div className='mr-2'>
            {/* Color variants */}
            {product?.otherImages && product?.otherImages?.length > 0 && (
              <div className="w-full">
                <div className="w-[100%] h-[40px] flex items-center justify-start">
                  {product?.otherImages?.slice(0, 6).map(
                    (variant: TOtherImages, index: number) => (
                      <div key={index} className="mx-2">
                        <div
                          onClick={() => setSelectImg(index)}
                          className={`cursor-pointer mx-auto rounded-full w-[22px] h-[22px] flex items-center justify-center ${
                            index === selectImg
                              ? 'border border-gray-400 p-[3px]'
                              : ''
                          }`}
                        >
                          <div
                            className="w-full h-full rounded-full"
                            style={{
                              background: `linear-gradient(to right, ${variant?.fromColor}, ${variant?.toColor})`,
                            }}
                          ></div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        
      </div>

      {/* Swiper pagination custom styles */}
      <style jsx global>{`
        .swiper-pagination {
          bottom: 8px !important;
        }
        .swiper-pagination-bullet {
          background-color: #ccc !important;
          opacity: 0.7;
        }
        .swiper-pagination-bullet-active {
          background-color: #333 !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ImagePartForMobile;
