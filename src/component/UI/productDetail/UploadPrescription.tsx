"use client"
import { Camera } from 'lucide-react';
import Image from 'next/image';
import React, { useState } from 'react';

const UploadPrescription = () => {
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState<string>("");
    console.log(setLoading)
  const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };
    return (
        <div>
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
            
          </div>
          {/* input fields */}
          <div className="px-2">
            <div>
                    
                    <br /><br />
                    <input
                        className="w-full rounded-md p-4 border border-gray-400"
                        type="text"
                        name="name"
                        id=""
                        placeholder="YOUR NAME"
                    />
                    <br /><br />
                    <input
                        className="w-full rounded-md p-4 border border-gray-400"
                        type="text"
                        name="email"
                        id=""
                        placeholder="Email"
                    />
                    <br /><br />
                    <input
                        className="w-full rounded-md p-4 border border-gray-400"
                        type="number"
                        name="phoneNumber"
                        id=""
                        placeholder="Phone Number *"
                        onWheel={(e) => e.currentTarget.blur()}
                    />
                    <br /><br />
                    <textarea
                        className="w-full rounded-md p-4 border border-gray-400"
                        name="address"
                        id=""
                        placeholder="Address *"
                    />
                </div>
                <br />
                <div className="flex items-center justify-center w-full h-[20px]">
                    {
                        loading !== 'pending...'
                        ?
                        <button  type='submit' className="bg-blue-900 rounded-3xl px-4 py-2 text-white font-bold cursor-pointer">
                            Save & Add to Cart
                        </button>
                        :
                        <button disabled className="bg-blue-500 rounded-3xl px-4 py-2 text-white font-bold cursor-not-allowed">
                            Please Wait...
                        </button>
                    }
                </div>
        </div>
        <br />
        </div>
    );
};

export default UploadPrescription;