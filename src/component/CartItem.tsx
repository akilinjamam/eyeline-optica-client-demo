"use client";

import { useState } from "react";
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
  color?: string;
  lensType: string;
  pd:  number;
  rightEye: Prescription;
  leftEye: Prescription;
  quantity: number;
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
  onEdit,
  onRemove,
}: CartItemProps) {
  const [qty, setQty] = useState(quantity);

  return (
    <div className="flex flex-col md:flex-row gap-4 bg-blue-50 rounded-xl shadow-sm p-4 mb-4">
      {/* LEFT COLUMN - IMAGE */}
      <div className="flex justify-center items-center w-full md:w-1/3">
        <div className="relative w-44 h-32">
          <Image
            src={image}
            alt={name}
            fill
            className="object-contain rounded-md"
          />
        </div>
      </div>

      {/* RIGHT COLUMN - DETAILS */}
      <div className="flex flex-col justify-between w-full md:w-2/3">
        {/* Top Info */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          {color && (
            <p className="text-sm text-gray-500 font-medium">Color: {color}</p>
          )}
          <div className="text-sm text-gray-600 mt-1">
            <p>
              <span className="font-semibold text-gray-700">Lens Type:</span>{" "}
              {lensType}
            </p>
            <p>
              <span className="font-semibold text-gray-700">PD:</span> {pd}
            </p>
          </div>
        </div>

        {/* Prescription Table */}
        <div className="overflow-x-auto">
          <table className="w-full border text-sm text-center rounded-lg">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border p-1"> </th>
                <th className="border p-1">Sphere (SPH)</th>
                <th className="border p-1">Cylinder (CYL)</th>
                <th className="border p-1">Axis</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border font-medium">RIGHT</td>
                <td className="border">{rightEye.sphere}</td>
                <td className="border">{rightEye.cylinder}</td>
                <td className="border">{rightEye.axis}</td>
              </tr>
              <tr>
                <td className="border font-medium">LEFT</td>
                <td className="border">{leftEye.sphere}</td>
                <td className="border">{leftEye.cylinder}</td>
                <td className="border">{leftEye.axis}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Quantity + Actions */}
        <div className="flex flex-wrap items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-semibold">Quantity</label>
            <select
              className="border rounded px-2 py-1 text-sm"
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

          <div className="flex gap-3 mt-3 md:mt-0">
            <button
              onClick={onEdit}
              className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              <Edit size={16} /> Edit
            </button>
            <button
              onClick={onRemove}
              className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
            >
              <Trash2 size={16} /> Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
