"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Trash2, Edit } from "lucide-react";

interface Prescription {
  sphere: string;
  cylinder: string;
  axis: string;
}

interface CartItemProps {
  image: string;
  name: string;
  id?: string;
  color?: string;
  lensType: string;
  pd: number;
  rightEye: Prescription;
  leftEye: Prescription;
  quantity: number;
  type: string;
  price: number;
  deliveryFee: number;
  lensPrice: number;
  framePrice: number;
  contactLensPrice:number;
  onEdit?: () => void;
  onRemove?: () => void;
}

export default function CartItem({
  image,
  name,
  color,
  lensType,
  pd,
  rightEye,
  leftEye,
  quantity,
  type,
  price,
  deliveryFee,
  lensPrice,
  framePrice,
  contactLensPrice,
  onEdit,
  onRemove,
}: CartItemProps) {
  const [qty, setQty] = useState(quantity);

  // ✅ Compute total price dynamically
  const totalPrice = useMemo(() => price * qty + deliveryFee, [price, qty, deliveryFee]);

  return (
    <div className="flex flex-col md:flex-row gap-5 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-5 mb-6 border border-gray-100">
      {/* LEFT COLUMN - IMAGE */}
      <div className="flex justify-center items-center w-full md:w-1/3">
        <div className="relative w-48 h-36 bg-gray-50 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt="cart-img"
            fill
            className="object-contain hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>

      {/* RIGHT COLUMN - DETAILS */}
      <div className="flex flex-col justify-between w-full md:w-2/3">
        {/* Top Info */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3">
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <span className="text-lg font-bold text-blue-700 mt-1 md:mt-0">
              ৳{totalPrice.toLocaleString()}
            </span>
          </div>

          {color && (
            <p className="text-sm text-gray-500 mb-1">
              <span className="font-medium text-gray-700">Color:</span> {color}
            </p>
          )}

          <div className="text-sm text-gray-600 space-y-1">
            {
              lensType
              &&
              <p>
                <span className="font-medium text-gray-700">Lens Type:</span>{" "}
                {lensType}
              </p>

            }
            <p>
              <span className="font-medium text-gray-700">PD:</span> {pd}
            </p>
            {framePrice > 0 && (
              <p>
                <span className="font-medium text-gray-700">Frame Price:</span>{" "}
                ৳{framePrice.toLocaleString()}
              </p>
            )}
            {lensPrice > 0 && (
              <p>
                <span className="font-medium text-gray-700">Lens Price:</span>{" "}
                ৳{lensPrice.toLocaleString()}
              </p>
            )}
            {contactLensPrice > 0 && (
              <p>
                <span className="font-medium text-gray-700">Contact Lens Price:</span>{" "}
                ৳{contactLensPrice.toLocaleString()}
              </p>
            )}
            <p>
              <span className="font-medium text-gray-700">Delivery Fee:</span>{" "}
              ৳{deliveryFee}
            </p>
          </div>
        </div>

        {/* Prescription Table */}
        {type === "Enter Power Manually" && (
          <div className="overflow-x-auto mt-4 border border-gray-200 ">
            <table className="w-full text-sm text-center">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="border p-2 w-20"></th>
                  <th className="border p-2">Sphere (SPH)</th>
                  <th className="border p-2">Cylinder (CYL)</th>
                  <th className="border p-2">Axis</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border font-medium bg-gray-50 p-2">RIGHT</td>
                  <td className="border p-2">{rightEye.sphere}</td>
                  <td className="border p-2">{rightEye.cylinder}</td>
                  <td className="border p-2">{rightEye.axis}</td>
                </tr>
                <tr>
                  <td className="border font-medium bg-gray-50 p-2">LEFT</td>
                  <td className="border p-2">{leftEye.sphere}</td>
                  <td className="border p-2">{leftEye.cylinder}</td>
                  <td className="border p-2">{leftEye.axis}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* Quantity + Actions */}
        <div className="flex flex-wrap items-center justify-between mt-5 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">Quantity</label>
            <select
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 mt-3 md:mt-0">
            <button
              onClick={onEdit}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
            >
              <Edit size={16} /> Edit
            </button>
            <button
              onClick={onRemove}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
            >
              <Trash2 size={16} /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
