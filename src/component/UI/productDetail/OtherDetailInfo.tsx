const OtherDetailInfo = () => {
    const frameMeasurements = [
  { label: "Frame Width", value: "130 mm / 5.1 in", icon: "" },
  { label: "Bridge", value: "16 mm / 0.6 in", icon: "" },
  { label: "Lens Width", value: "57 mm / 2.2 in", icon: "" },
  { label: "Lens Height", value: "49 mm / 1.9 in", icon: "" },
  { label: "Temple Length", value: "147 mm / 5.8 in", icon: "" },
];

const frameDetails = [
  { label: "Size", value: "Adult Medium (126 - 132 mm / 5.0 - 5.2 in)" },
  { label: "Material", value: "Plastic" },
  { label: "Weight", value: "Lightweight (14 grams / 0.5 ounces)" },
  { label: "Rim", value: "Full Rim" },
  { label: "Shape", value: "Square" },
  {
    label: "Feature",
    value: "Extended Fit, Custom engraving, High Rx, Universal Bridge Fit",
  },
];

const prescriptionDetails = [
  { label: "PD Range", value: "67 - 79 mm", note: "Additional fee for PDs below this range" },
  { label: "Prescription Range", value: "-13.00 / +7.50" },
  { label: "Available as Progressive / Bifocal", value: "Yes" },
  { label: "Available as Readers", value: "No" },
];




  return (
    <div className=" px-0 py-6 ">
      <div className="max-w-[1250px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-sm text-gray-800 ">
        
        {/* Frame Measurements */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Frame Measurements</h3>
          <ul className="space-y-2">
            {frameMeasurements.map((item, idx) => (
              <li key={idx} className="flex items-start ">
                <span className="text-lg">{item.icon}</span>
                <div>
                  <strong>{item.label}:</strong> {item.value}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Frame Details */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Frame Details</h3>
          <ul className="space-y-2">
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
          <ul className="space-y-2">
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
