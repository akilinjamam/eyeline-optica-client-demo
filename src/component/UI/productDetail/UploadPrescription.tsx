/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { Camera } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const UploadPrescription = ({cartInfo}: {cartInfo:any}) => {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [loading, setLoading] = useState<string>("")

    const handleCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        setImageFiles(files);
        setImagePreviews(files.map((file) => URL.createObjectURL(file)));
      }
    };

    const router = useRouter();

    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const { name, phoneNumber, email, address } = e.target;

      const formData = new FormData();

      // Build JSON object
      const fullObj = {
        customerName: name.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
        address: address.value,
        totalAmount: cartInfo.subtotal,
        deliveryFee: 70,
        items: [
          {
            ...cartInfo,
            submitType: "uploadPrescription",
          },
        ],
      };

  // Append JSON data
  formData.append("data", JSON.stringify(fullObj));

  // Append multiple image files
  imageFiles.forEach((file) => {
    formData.append("prescriptionImg", file);
  });

  setLoading("pending...");
  console.log(JSON.parse(formData.get("data") as string));
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/cart/create-cart-with-prescription`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log(data);
    if (data.success) {
      setLoading("");
      window.dispatchEvent(new Event("cartUpdated"));
      localStorage.setItem("token", data?.data?.token);
      router.push("/cart");
    }
  } catch (error) {
    console.error(error);
    setLoading("");
  }
};


    return (
        <form onSubmit={handleSubmit}>
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
                          multiple
                          onChange={handleCapture}
                        />
                      </label>

                      {/* Preview */}
                      {imagePreviews.length > 0 && (
                        <div className="mt-6">
                          <h2 className="text-lg font-semibold text-gray-700 mb-3">
                            Preview
                          </h2>
                          <div className="relative w-full overflow-hidden rounded-xl shadow-lg border border-gray-200">
                            {
                              imagePreviews?.map((preview:any, index:number) => {
                                return (
                                  <Image
                                    key={index+1}
                                    src={preview}
                                    alt="Prescription"
                                    className="w-full h-auto object-contain mb-2"
                                    width={200}
                                    height={200}
                            />
                                )
                              })
                            }
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
        </form>
    );
};

export default UploadPrescription;