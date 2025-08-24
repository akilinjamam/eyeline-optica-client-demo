"use client"
import { Camera } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const UploadPrescription = () => {
    const [image, setImage] = useState<string | null>(null);

  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };
    return (
        <div className="flex flex-col items-center justify-center h-auto bg-gradient-to-br from-blue-50 to-blue-100 p-6">
                  <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 text-center">
                    <h1 className="text-2xl font-bold text-gray-700 mb-4">
                      Upload Prescription
                    </h1>
                    <p className="text-gray-500 mb-6">
                      Take a clear photo of your doctor’s prescription
                    </p>

                    {/* Fancy Button */}
                    <label className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-lg font-medium rounded-xl shadow-md cursor-pointer transition transform hover:scale-105">
                      <Camera className="w-5 h-5" />
                      Take Photo
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        onChange={handleCapture}
                      />
                    </label>

                    {/* Preview */}
                    {image && (
                      <div className="mt-6">
                        <h2 className="text-lg font-semibold text-gray-700 mb-3">
                          Preview
                        </h2>
                        <div className="relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-200">
                          <Image
                            src={image}
                            alt="Prescription"
                            className="w-full h-auto object-contain"
                            width={200}
                            height={200}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='flex items-center justify-center w-full h-[100px] '>
                     <button className='rounded-3xl bg-blue-800 text-white font-bold px-4 py-2 cursor-pointer'>Save & Add to Cart</button>
                  </div>
                </div>
    );
};

export default UploadPrescription;