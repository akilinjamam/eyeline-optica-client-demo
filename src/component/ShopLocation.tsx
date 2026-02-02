"use client";

import { MapPin } from "lucide-react";
import storeImg from "../../public/images/store-image/storeImg.png";
import eyeline from "../../public/images/store-image/EYELINE-OPTICA-IMG.jpeg"
import Image, { StaticImageData } from "next/image";

type IStoreLocation = {
  lat: number;
  lng: number;
};

type ShopLocationProps = {
  shopName: string;
  storeLocation: IStoreLocation;
  address: string;
  img:StaticImageData
};

function ShopLocation({
  shopName,
  storeLocation,
  address,
  img,
}: ShopLocationProps) {
  const sec_api_key = "AIzaSyCGUp-Vv-zh5eO7vu7DC0P_iXEpECUasGg";

  const getMapURL = (lat: number, lng: number, zoom = 17) =>
    `https://www.google.com/maps/embed/v1/place?key=${sec_api_key}&q=${lat},${lng}&zoom=${zoom}`;

  return (
    <div className="w-full flex flex-col items-center gap-8 py-1  rounded-2xl my-6 ">
      <h2 className="text-3xl font-extrabold text-gray-900">
        {shopName}
      </h2>

      <div className="w-full max-w-3xl">
        <div className="w-[96%] rounded-2xl overflow-hidden shadow-2xl border border-gray-300 mx-auto">
          <Image src={img} width={1000} height={1000} alt="store-img" />

          <iframe
            width="100%"
            height="420"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={getMapURL(storeLocation.lat, storeLocation.lng)}
          ></iframe>

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

            <div className="flex items-center mt-3">
              <MapPin className="text-blue-700 mt-1" />
              <p className="ml-1">{address}</p>
            </div>

            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${storeLocation.lat},${storeLocation.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-medium hover:underline mt-3 inline-block"
            >
              Get Directions
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShopLocationList() {
  const info = [
    {
      id: 1,
      shopName: "HALISAHAR OUTLET",
      storeLocation: { lat: 22.33219, lng: 91.78891 },
      address:
        "Shop no-3, Nusrat Complex, Plot-14/A, Block-G, P.C. Road, Halishahar, Chattogram",
      img:eyeline
    },
    {
      id: 2,
      shopName: "JAMAL KHAN OUTLET",
      storeLocation: { lat: 22.345986670735794, lng: 91.83429320033994 },
      address: "Minhaz Complex (Ground Floor), 12-Jamal Khan Road, Chittagong",
      img:storeImg
    },
  ];

  return (
    <div id="shop">
      {info.map((item) => (
        <ShopLocation
          key={item.id}
          shopName={item.shopName}
          storeLocation={item.storeLocation}
          address={item.address}
          img={item.img}
        />
      ))}
    </div>
  );
}

export default ShopLocationList;
