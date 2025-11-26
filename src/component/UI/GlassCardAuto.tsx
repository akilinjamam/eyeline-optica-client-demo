"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { CameraIcon } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import defaultImage from "../../../public/images/glass-1.png";
import virtualTryOnIcon from "../../../public/images/virtual-try-on.png"

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
  sizeCategory?:string;
  otherImages?: TOtherImages[];
  rating?:number;
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
  sizeCategory,
  rating
}) => {
  const [selectColor, setSelectColor] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
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

  
  let selectedVariantImages =
  otherImages?.[selectColor]?.images?.length
    ? otherImages[selectColor].images
    : baseImages;

// If clicking thumb → reorder so selected image becomes first
if (selectedImage > 0 && selectedVariantImages[selectedImage]) {
  selectedVariantImages = [
    selectedVariantImages[selectedImage],
    ...selectedVariantImages.filter((_, i) => i !== selectedImage),
  ];
}

 
  const imagesToDisplay =
    otherImages && otherImages.length > 0
      ? selectedVariantImages
      : baseImages;

  return (
  <div className="relative bg-white shadow-md p-2 rounded-md w-full">

    {/* 🔵 Badge (Top Middle) */}
    {badge && (
      <span className="absolute top-2 left-1/2 -translate-x-1/2 
        bg-blue-600 text-white text-xs px-3 py-[3px] rounded-md 
        font-semibold z-20 shadow">
        {badge}
      </span>
    )}

    {/* 🎨 Color Label (Remove or keep) */}
    <span className="absolute top-2 right-2 text-[10px] text-gray-500 z-10">
      {color}
    </span>

    {/* 🖼️ Image + Try-on */}
    <div className="mb-3 w-full h-[260px] relative">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        navigation={false}
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

      {/* 📸 Virtual Try-on (Centered Under Image) */}
     {/* 📸 Virtual Try-on + Extra Small Images */}
<div className="absolute bottom-[-70px] left-1/2 -translate-x-1/2 
  text-center flex flex-col items-center z-10 w-full">

  {/* Virtual Try-on Icon */}
  <Image src={virtualTryOnIcon} alt="virtual-try-on" className="mx-auto" />

  {/* Small Thumbnail Images */}
  {otherImages && otherImages?.[selectColor]?.images?.length > 1 && (
    <div className="flex items-center justify-center mt-2 gap-2">
      {otherImages && otherImages[selectColor]?.images.map((img, index) => (
        <Image
          key={index}
          src={img}
          width={35}
          height={35}
          alt="thumb"
          onClick={() => setSelectedImage(index)}
          className={`rounded-full border cursor-pointer object-cover ${
            selectedImage === index
              ? "border-blue-500"
              : "border-gray-300"
          }`}
        />
      ))}
    </div>
  )}
</div>
    </div>

    {/* 🏷️ Product Name & Details */}
    <div className="flex items-start justify-between w-full pt-6">

      {/* ▶️ Brand + Name + Price */}
      <div className="w-[70px]">
        <p className="text-[10px] text-gray-500">{brand}</p>
        <p className="text-[11px] font-semibold text-black">{name}</p>
        <p className="text-md font-bold text-black mt-1">
          ৳ {salesPrice}
        </p>
      </div>

      {/* 🎨 Color selectors (Bottom Middle) */}
       <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex">
      {otherImages &&
        otherImages.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectColor(index)}
            style={{
              background: `linear-gradient(to right, ${item.fromColor}, ${item.toColor})`,
            }}
            className={`w-[12px] h-[12px] rounded-full mx-1 cursor-pointer ${
              selectColor === index ? "ring-[2px] ring-gray-600" : ""
            }`}
          />
        ))}
      </div>

      {/* ⭐ Rating + Size (Right Side) */}
      <div className="absolute right-2 bottom-2 flex flex-col items-center text-right">
      <div className="flex items-center">
        <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 h-4 fill-blue-500"
        viewBox="0 0 24 24"
      >
        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.788 1.402 8.168L12 18.896l-7.336 3.87 1.402-8.168L.132 9.21l8.2-1.192z" />
      </svg>
      <span className="ml-1 text-black">{rating ? rating : 4}</span>
      </div>

      <span className="text-[13px] font-semibold mt-1 text-black">Size: {sizeCategory?.toUpperCase().slice(0,1)}</span>
      </div>

    </div>
  </div>
);

};

export default GlassCardAuto;
