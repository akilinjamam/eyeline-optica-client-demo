import { TFrame } from "@/ts-definition/types";
import Image from "next/image";
import frameWidth from "../../../../public/frameDetailPic/frame-detail-img-1.png"
import bridge from "../../../../public/frameDetailPic/frame-detail-img-2.png"
import lensWidth from "../../../../public/frameDetailPic/frame-detail-img-3.png"
import lensHeight from "../../../../public/frameDetailPic/frame-detail-img-4.png"
import templeLength from "../../../../public/frameDetailPic/frame-detail-img-5.png"

const OtherDetailInfo = ({detail}: {detail:TFrame}) => {
    const frameMeasurements = [
  { label: "Frame Width", value: detail?.frameWidth, icon: frameWidth },
  { label: "Bridge", value: detail?.bridge, icon: bridge },
  { label: "Lens Width", value: detail?.lensWidth, icon: lensWidth },
  { label: "Lens Height", value: detail?.lensHeight, icon: lensHeight },
  { label: "Temple Length", value: detail?.templeLength, icon: templeLength },
];

const frameDetails = [
  { label: "Size", value: detail?.sizeCategory },
  { label: "Material", value: detail?.materialsCategory },
  { label: "Weight", value: detail?.weight },
  { label: "Rim", value: detail?.frameCategory },
  { label: "Shape", value: detail?.shapeCategory },
  {
    label: "Feature",
    value: detail?.features?.map((feature:string) => feature)?.join(','),
  },
];

const prescriptionDetails = [
  { label: "PD Range", value: detail?.pdRange, note: "Additional fee for PDs below this range" },
  { label: "Prescription Range", value: detail?.prescriptionRange },
  { label: "Available as Progressive / Bifocal", value: detail?.availableAsProBi ? "Yes" : "No" },
  { label: "Available as Readers", value: detail?.availableAsReader ? "Yes" : "No" },
];




  return (
    <div className=" lg:px-0 md:px-0 px-4 py-6 ">
      <div className="max-w-[1250px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm text-gray-800 ">
        
        {/* Frame Measurements */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Frame Measurements</h3>
          <ul className="space-y-2 text-[16px] ">
            {frameMeasurements.map((item, idx) => (
              <li key={idx} className="flex items-center ">
                <Image src={item?.icon} height={40} width={40} alt={`frame-detail-${idx}`} />
                <div className="ml-2">
                  <strong>{item.label}:</strong> {item.value}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Frame Details */}
        <div>
          <h3 id="middleSection" className="font-semibold text-lg mb-3">Frame Details</h3>
          <ul className="space-y-2 text-[16px]">
            {frameDetails.map((item, idx) => (
              <li key={idx}>
                <strong>{item.label}:</strong>{" "}
                <span className="">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prescription Details */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Prescription Details</h3>
          <ul className="space-y-2 text-[16px]">
            {prescriptionDetails.map((item, idx) => (
              <li key={idx}>
                <strong>{item.label}</strong>: {item.value}
                {item.note && (
                  <div className="text-xs text-gray-500">{item.note}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


export default OtherDetailInfo
