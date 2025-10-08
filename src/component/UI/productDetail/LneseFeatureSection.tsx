/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { X } from "lucide-react";
import Image from "next/image";
import { ILense } from "@/ts-definition/interfaces";

const LensFeatureSection = ({
  selectedLense,
  setSelectedLense,
}: {
  selectedLense: ILense;
  setSelectedLense: (payload: ILense | null) => void;
}) => {
  if (!selectedLense) return null;

  const {
    title,
    images,
    brand,
    category,
    lensType,
    material,
    color,
    index,
    diameter,
    prescriptionRange,
    warranty,
    // deliveryTime,
    features,
    offer,
    price,
    rating,
  } = selectedLense;

  return (
    <div className="p-4 rounded-2xl border border-gray-200 shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="font-bold text-lg text-gray-800">{title}</h2>
        <button
          onClick={() => setSelectedLense(null)}
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
                alt={`${title || "Lens"} image ${idx + 1}`}
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
        {offer ? (
          <span className="text-sm text-green-600 font-medium">
            ({offer}% OFF)
          </span>
        ) : null}
      </div>

      {/* Lens Details */}
      <div className="text-sm text-gray-700 space-y-1 mb-3">
        {brand && <p><span className="font-medium">Brand:</span> {brand}</p>}
        {category && <p><span className="font-medium">Category:</span> {category}</p>}
        {lensType && <p><span className="font-medium">Lens Type:</span> {lensType}</p>}
        {material && <p><span className="font-medium">Material:</span> {material}</p>}
        {color && <p><span className="font-medium">Color:</span> {color}</p>}
        {index !== 0 && <p><span className="font-medium">Index:</span> {index}</p>}
        {diameter !== 0 && <p><span className="font-medium">Diameter:</span> {diameter} mm</p>}
        {prescriptionRange && (
          <p>
            <span className="font-medium">Prescription Range:</span>{" "}
            {prescriptionRange}
          </p>
        )}
        {warranty && <p><span className="font-medium">Warranty:</span> {warranty}</p>}
        {/* {deliveryTime && (
          <p>
            <span className="font-medium">Delivery Time:</span> {deliveryTime}
          </p>
        )} */}
        {rating !== 0 && (
          <p>
            <span className="font-medium">Rating:</span> ⭐ {rating}/5
          </p>
        )}
      </div>

      {/* Features */}
      {features && features.length > 0 && (
        <div className="mt-3">
          <h3 className="font-semibold mb-2 text-gray-800">
            Coatings & Features:
          </h3>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
            {features.map((feature: any, idx: number) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
};

export default LensFeatureSection;
