export default function DoctorTag({ text }: { text: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-8 w-auto"
      viewBox="0 0 200 32"
      preserveAspectRatio="none"
    >
      <path
        d="M0 0 H180 L165 16 L180 32 H0 Z"
        fill="#2563eb"
      />
      <text
        x="5"
        y="20"
        fontSize="14"
        fill="white"
        fontFamily="sans-serif"
        fontWeight="600"
      >
        {text.length > 20 ? text.slice(0,20) + '...' : text }
      </text>
    </svg>
  );
}
