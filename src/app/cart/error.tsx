"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-20">
      <h2 className="text-xl font-semibold text-red-600">Something went wrong!</h2>
      <p className="text-gray-600 mt-2">{error.message || "Failed to load product."}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}
