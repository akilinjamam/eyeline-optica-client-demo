/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PatientProfile() {
  const router = useRouter();

  const [slotData, setSlotData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Step 1: Get appointmentData from localStorage
        const raw = localStorage.getItem("appointmentData");
        if (!raw) return;

        const parsedData = JSON.parse(raw);
        const slotId = parsedData?.slotId;
        // if (!slotId) return;

        // Step 2: Fetch slot data from backend
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/get-single-slot/${slotId}`,
          { cache: "no-store" }
        );

        const data = await res.json();
        setSlotData(data?.data);

      } catch (error) {
        console.log("Error loading profile:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white text-xl">
        Loading profile...
      </div>
    );
  }

  if (!slotData) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
        <p className="text-xl">No patient data found.</p>
      </div>
    );
  }

  const patient = slotData?.patient;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 via-blue-900 to-black p-6 text-white flex justify-center">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/10">

        {/* Header */}
        <h1 className="text-3xl font-bold text-center mb-6 tracking-wide">
          Patient Profile
        </h1>

        {/* Profile Card */}
        <div className="bg-black/30 rounded-xl p-5 border border-white/10 shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-3xl font-bold">
              {patient?.name?.charAt(0) ?? "P"}
            </div>
            <div>
              <p className="text-2xl font-semibold">{patient?.name}</p>
              <p className="text-sm opacity-70">{patient?.phone}</p>
            </div>
          </div>

          {/* Details */}
          <div className="mt-6 space-y-3 text-lg">
            <p>
              <span className="opacity-70">Age:</span> {patient?.age ?? "N/A"}
            </p>
            <p>
              <span className="opacity-70">Address:</span>{" "}
              {patient?.address ?? "N/A"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 space-y-4">
          <button
            onClick={() => router.push("/videoConsult")}
            className="w-full py-3 text-lg font-semibold bg-green-500 hover:bg-green-600 rounded-xl shadow-lg transition-all duration-300"
          >
            Start Video Consultation
          </button>

          <button
            onClick={() => router.push("/myPrescription")}
            className="w-full py-3 text-lg font-semibold bg-green-500 hover:bg-green-600 rounded-xl shadow-lg transition-all duration-300"
          >
            Prescription
          </button>
        </div>
      </div>
    </div>
  );
}
