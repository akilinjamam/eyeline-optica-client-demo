type DoctorTagProps = {
  text: string;
  charWidth: number
};

export default function DoctorTag({ text, charWidth = 9 }: DoctorTagProps) {
  // Calculate width based on text length
  const textLength = text.length > 20 ? 20 : text.length;
  const baseWidth = 60; // minimum width
  const tagWidth = baseWidth + textLength * charWidth;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8"
      viewBox={`0 0 ${tagWidth} 32`}
      preserveAspectRatio="none"
    >
      {/* Background shape with arrow */}
      <path d={`M0 0 H${tagWidth - 20} L${tagWidth - 35} 16 L${tagWidth - 20} 32 H0 Z`} fill="#2563eb" />

      {/* Text */}
      <text
        x="8"
        y="20"
        fontSize="14"
        fill="white"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        {/* {text.length > 20 ? text.slice(0, 20) + "..." : text} */}
        {text}
      </text>
    </svg>
  );
}
