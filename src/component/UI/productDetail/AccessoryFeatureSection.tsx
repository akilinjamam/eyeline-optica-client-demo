/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { TAccessoryInfo } from "./SlideImageAndPriceDetailForContactLens";

const AccessoryFeatureSection = ({
  selectedAccessory,
  setSelectedAccessory,
  setOpen
}: {
  selectedAccessory: TAccessoryInfo;
  setSelectedAccessory: (payload: any | null) => void;
  setOpen: (payload: any | null) => void;
}) => {
  if (!selectedAccessory) return null;

  const {
    name,
    brand,
    price,
    images,
    description
   
  } = selectedAccessory;

  return (
    <div className="p-4 rounded-2xl border border-gray-200 shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg text-gray-800">{name}</h2>
        <button
          onClick={() => {
            setSelectedAccessory(null)
            setOpen(false)
          }}
          className="text-gray-500 hover:text-gray-700 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <hr className="mb-3" />

      {/* Image Gallery */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          {images.map((img: string, idx: number) => (
            <div
              key={idx}
              className="relative group overflow-hidden rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <Image
                src={img}
                alt={`${"accessory"}-image ${idx + 1}`}
                width={200}
                height={200}
                className="object-cover w-full h-32 sm:h-40 group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Price */}
      <div className="flex items-center gap-2 mb-3">
        <p className="text-orange-600 font-bold text-lg">
          ৳{price?.toLocaleString()}
        </p>
       
      </div>

      {/* Lens Details */}
      <div className="text-sm text-gray-700 space-y-1 mb-3">
        {brand && <p><span className="font-medium">Brand:</span> {brand}</p>}
        {description && <p><span className="font-medium"></span> {description}</p>}
        
      </div>

    </div>
  );
};

export default AccessoryFeatureSection;
