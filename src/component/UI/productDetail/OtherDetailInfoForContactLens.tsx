import { TContactLens } from "@/ts-definition/types";


const OtherDetailInfoForContactLens = ({detail}: {detail:TContactLens}) => {
    const frameMeasurements = [
  { label: "Lens Type", value: detail?.type, icon: "" },
  { label: "Material", value: detail?.material, icon: "" },
  { label: "Power Type", value: detail?.powerType, icon: "" },
  { label: "Water Content", value: detail?.waterContent, icon: "" },
  { label: "Color", value: detail?.color === "" ? "not-added" : detail?.color , icon: "" },
  { label: "Brand", value: detail?.brand, icon: "" },
  { label: "diameter(mm)", value: detail?.diameter, icon: "" },
  { label: "Base Curve", value: detail?.baseCurve, icon: "" },
  { label: "Features", value: detail?.features?.map((coatings:string) => coatings)?.join(","), icon: "" },
];


const prescriptionDetails = [
  { label: "PD Range", value: detail?.powerRange, note: "Additional fee for PDs below this range" }
];

  return (
    <div className="px-4 lg:px-0 md:px-0 py-6 ">
      <div className="max-w-[1250px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm text-gray-800 ">
        
        {/* Lens Measurements */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Contact Lens Info</h3>
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


        {/* Prescription Details */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Prescription Details</h3>
          <ul className="space-y-2 text-[18px]">
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


export default OtherDetailInfoForContactLens
