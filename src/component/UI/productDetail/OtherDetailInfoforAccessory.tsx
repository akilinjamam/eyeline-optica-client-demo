/* eslint-disable @typescript-eslint/no-explicit-any */

import { TAccessoryItem } from "@/ts-definition/types";



const OtherDetailInfoForAccessory = ({detail}: {detail:any}) => {
    const frameMeasurements = [
  { label: "Brand", value: detail?.items?.map((item:TAccessoryItem) => item?.brand  )?.join(","), icon: "" },
  { label: "Type", value: detail?.type, icon: "" },
];


  return (
    <div className="px-4 lg:px-0 md:px-0 py-6 ">
      <div className="max-w-[1250px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm text-gray-800 ">
        
        {/* Lens Measurements */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Accessory Info</h3>
          <ul className="space-y-2 text-[16px]">
            {frameMeasurements.map((item, idx) => (
              <li key={idx} className="flex items-center ">
                <span>{item?.icon}</span>
                <div className="">
                  <strong>{item.label}:</strong> {item.value}
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}


export default OtherDetailInfoForAccessory
