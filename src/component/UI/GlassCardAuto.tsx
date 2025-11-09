"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { CameraIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import defaultImage from "../../../public/images/glass-1.png";

// ✅ Define the types
export interface TOtherImages {
  colorName: string;
  fromColor: string;
  toColor: string;
  images: string[];
}

export interface TFrame {
  _id: string;
  name: string;
  brand: string;
  salesPrice: number;
  badge?: string;
  color?: string;
  images: string[]; // Normal image array
  otherImages?: TOtherImages[]; // Optional color variant images
}

// ✅ Component
const GlassCardAuto: React.FC<TFrame> = ({
  otherImages,
  images,
  name,
  brand,
  salesPrice,
  badge,
  color,
  _id,
}) => {
  const [selectColor, setSelectColor] = useState(0);
  const navigate = useRouter();

  /**
   * 🧩 Step 1: Normalize images
   * - If "images" array is valid → use it
   * - Else → fallback to default image
   */
  const baseImages =
    Array.isArray(images) && images.length > 0
      ? images
      : [defaultImage.src];

  
  const selectedVariantImages =
    otherImages?.[selectColor]?.images?.length
      ? otherImages[selectColor].images
      : baseImages;

 
  const imagesToDisplay =
    otherImages && otherImages.length > 0
      ? selectedVariantImages
      : baseImages;

  return (
    <div className="relative bg-white shadow-md p-2 rounded-md w-full">
      {/*  Badge */}
      {badge && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-[2px] rounded-sm font-semibold z-10">
          {badge}
        </span>
      )}

      {/*  Color Label */}
      <span className="absolute top-2 right-2 text-[10px] text-gray-500 text-center leading-3 z-10">
        {color}
      </span>

      {/* Image Slider */}
      <div className="mb-3 w-full h-[120px] relative">
        <Swiper
          modules={[Navigation]}
          slidesPerView={1}
          navigation={true}
          className="mySwiper w-full h-full"
        >
          {imagesToDisplay.map((imageSrc, index) => (
            <SwiperSlide key={index}>
              <Image
                onClick={() => navigate.push(`/productDetail/${_id}`)}
                src={imageSrc || defaultImage}
                alt={`${name} - Image ${index + 1}`}
                fill
                className="object-contain cursor-pointer"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* ℹ️ Product Details + Color Options + Virtual Try-on */}
      <div className="flex items-center justify-between w-full">
        {/* 🏷️ Brand & Name */}
        <div className="w-[60px]">
          <p className="text-[10px] text-gray-500">{brand}</p>
          <p className="text-[11px] font-semibold">{name}</p>
          <p className="text-md font-bold text-red-600 mt-1">৳ {salesPrice}</p>
        </div>

        {/* 🎨 Color selectors */}
        <div className="flex">
          {otherImages &&
            otherImages.length > 0 &&
            otherImages.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectColor(index)}
                style={{
                  background: `linear-gradient(to right, ${item.fromColor}, ${item.toColor})`,
                }}
                className={`w-[10px] h-[10px] rounded-full ml-1 cursor-pointer ${
                  selectColor === index ? "ring-1 ring-gray-600" : ""
                }`}
              />
            ))}
        </div>

        {/* 📸 Virtual Try-on */}
        <div className="text-xs text-center text-gray-600 mt-2">
          <CameraIcon className="w-8 h-8 mx-auto" />
          <span className="text-[9px]">Virtual Try-on</span>
        </div>
      </div>
    </div>
  );
};

export default GlassCardAuto;
