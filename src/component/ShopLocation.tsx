"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import storeImg from "../../public/images/store-image/storeImg.png";
import { MapPin } from "lucide-react";

export default function ShopLocation() {
  const [open, setOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const sec_api_key = "AIzaSyCGUp-Vv-zh5eO7vu7DC0P_iXEpECUasGg";

  const storeLocation = { lat: 22.33219, lng: 91.78891 };

  const getMapURL = (lat: number, lng: number, zoom = 17) =>
    `https://www.google.com/maps/embed/v1/place?key=${sec_api_key}&q=${lat},${lng}&zoom=${zoom}`;

  const handleFindStore = () => {
    setOpen(true);

    // Load store location immediately
    setTimeout(() => {
      if (iframeRef.current) {
        iframeRef.current.src = getMapURL(
          storeLocation.lat,
          storeLocation.lng
        );
      }
    }, 100);
  };

  return (
    <div
      id="shop"
      className="w-full flex flex-col items-center gap-10 py-7 bg-gradient-to-b from-blue-50 to-blue-100 rounded-2xl my-16 shadow-xl"
    >
      <h2 className="text-3xl font-extrabold text-gray-900">
        Visit Eyeline Optica
      </h2>

      {/* STORE PREVIEW CARD */}
      {!open && (
        <div className="w-[380px] md:w-[480px] h-[480px] rounded-2xl bg-blue-200 shadow-xl flex flex-col items-center text-center">
          <div className="rounded-xl overflow-hidden shadow-lg w-full">
            <Image src={storeImg} alt="store-image" className="w-full h-auto" />
          </div>

          <p className="text-blue-500 font-bold text-left px-2 mt-4 w-full">
            Visit us in our Outlet!
          </p>

          <p className="text-gray-700 mt-2 text-[15px] leading-relaxed text-left px-2">
            Visit us at our outlet and explore top designer frames & best sellers.
            Get expert support on fit, style & prescription.
          </p>

          <button
            onClick={handleFindStore}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-6 px-6 py-2 text-sm rounded-xl shadow-md hover:scale-[1.03] transition-all"
          >
            Find Store
          </button>
        </div>
      )}

      {/* MAP SECTION */}
      {open && (
        <div className="w-full max-w-3xl transition-all duration-500">
          <div className="w-[96%] rounded-2xl overflow-hidden shadow-2xl border border-gray-300 mx-auto">
            <iframe
              ref={iframeRef}
              width="100%"
              height="420"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={getMapURL(storeLocation.lat, storeLocation.lng)}
            ></iframe>

            {/* INFO CARD */}
            <div className="bg-blue-100 shadow-xl p-4 rounded-xl w-full text-sm border border-gray-200">
              <h3 className="font-bold text-blue-800 text-lg">Store hours</h3>
              <hr className="my-2" />

              <div className="flex justify-between">
                <div>
                  <p>Saturday - Thursday</p>
                  <p>Friday</p>
                </div>
                <div className="text-right">
                  <p>10:00 AM - 9:00 PM</p>
                  <p>3:00 PM - 9:00 PM</p>
                </div>
              </div>

              <div className="flex items-start mt-3">
                <MapPin className="text-blue-700 mt-1" />
                <p className="ml-2">
                  Shop no-3, Nusrat Complex, Plot-14/A, Block-G, P.C. Road,
                  Halishahar, Chattogram
                </p>
              </div>

              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${storeLocation.lat},${storeLocation.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-700 font-medium hover:underline mt-3 inline-block"
              >
                Get Directions
              </a>
              <br />
              <button
                onClick={() => setOpen(false)}
                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white mt-6 px-6 py-2 text-sm rounded-xl shadow-md hover:scale-[1.03] transition-all"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
