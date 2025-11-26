"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import storeImg from "../../public/images/store-image/storeImg.png";
import {MapPin } from "lucide-react";

export default function ShopLocation() {
  const [open, setOpen] = useState(false);
  const sec_api_key = "AIzaSyCGUp-Vv-zh5eO7vu7DC0P_iXEpECUasGg";

  const storeLocation = { lat:22.33219, lng:  91.78891 };
  const defaultCenter = { lat: 22.3569, lng: 91.7832 };
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const getMapURL = (lat:number, lng:number, zoom:number) =>
    `https://www.google.com/maps/embed/v1/place?key=${sec_api_key}&q=${lat},${lng}&zoom=${zoom}`;

  const handleShowLocation = () => {
    if (!iframeRef.current) return;

    let zoom = 12;
    const interval = setInterval(() => {
      if (iframeRef.current) {
        iframeRef.current.src = getMapURL(storeLocation.lat, storeLocation.lng, zoom);
      }
      zoom++;
      if (zoom > 17) clearInterval(interval);
    }, 200);
  };

  return (
    <div className="w-full flex flex-col items-center gap-10 py-7 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl my-16 shadow-xl relative">
      <h2 className="text-3xl font-extrabold text-gray-900 tracking-wide drop-shadow-sm">
        Visit Eyeline Optica
      </h2>

      {/* STORE PREVIEW CARD */}
      <div
        className={`w-[380px] md:w-[480px] h-[480px] rounded-2xl bg-blue-200 shadow-xl transform transition-all duration-500  flex flex-col items-center text-center ${
          open ? "scale-0 opacity-0 hidden" : "scale-100 opacity-100"
        }`}
      >
        <div className="rounded-xl overflow-hidden shadow-lg w-full">
          <Image src={storeImg} alt="store-image" className="w-full h-auto" />
        </div>
        <br />
        <div className="w-full"><p className="text-blue-500 font-bold text-left px-2">Visit us in our Outlet!</p></div>

        <div className="w-full">
          <p className="text-gray-700 mt-4 text-[15px] leading-relaxed text-left px-2">
          Visit us at our outlet and explore top designer frames & best sellers. Get expert support on fit, style & prescription.
        </p>
        </div>

        <button
          onClick={() => setOpen(true)}
          className="bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-5 px-6 py-2 text-sm rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03] transition-all"
        >
          Find Store
        </button>
      </div>

      {/* MAP SECTION */}
      <div className={`${open ? "opacity-100 scale-100" : "opacity-0 scale-95 hidden"} transition-all duration-500 w-full max-w-3xl`}>        
        <div className="w-[96%] rounded-2xl overflow-hidden shadow-2xl relative border border-gray-300 mx-auto">
          <iframe
            ref={iframeRef}
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={getMapURL(defaultCenter.lat, defaultCenter.lng, 12)}
          ></iframe>

          {/* Floating Info Card */}
          <div className=" bg-blue-100 shadow-xl p-4 rounded-xl w-full text-sm border border-gray-200">
            <h3 className="font-bold text-blue-800 text-lg">Store hours</h3>
            <hr className="text-blue-300"/>
            <br />
            <div className="flex items-baseline">
                <div className="text-left w-[50%]">
                    <p>Saturday - Thursday</p>
                    <p>Friday</p>
                </div>
                <div className="text-right w-[50%]">
                    <p>10:00 AM - 9:00 PM</p>
                    <p>3:00 PM - 9:00 PM</p>
                </div>
            </div>
            <br />
            <div className="flex items-center">
              <MapPin fill="#3e3afc" style={{color:"#3e3afc"}}/>
              <p className="ml-2">Shop no-3, Nusrat Complex, plot-14/A, Block-G, P.C.ROAD, Halishahar, Chottograme</p>
            </div>
          
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${storeLocation.lat},${storeLocation.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-medium hover:underline mt-2 inline-block"
            >
              Get Directions
            </a>
          </div>
        </div>

        <button
          onClick={handleShowLocation}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-semibold rounded-xl shadow-md hover:shadow-xl hover:scale-[1.03] transition-all mt-5 mx-auto block"
        >
          Explore Store
        </button>
      </div>
    </div>
  );
}
