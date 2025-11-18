"use client";

import { useEffect, useState } from "react";
import CheckoutFormForDoctor from "./CheckoutFormForDoctor";

interface StoredData {
  doctorId: string;
  slotId: string;
  appointmentFee: number;
  startAt:string;
  endAt:string;
  doctorName:string;
}

export default function CheckoutDoctor() {
  const [info, setInfo] = useState<StoredData | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("appointmentData");
    if (data) {
      setInfo(JSON.parse(data));
    }
  }, []);

  if (!info) {
    return (
      <div className="p-10 text-center text-gray-600">
        No appointment found. Please select a slot again.
      </div>
    );
  }

  const slotStartDate = new Date(info.startAt)?.toLocaleDateString();
  const startTime = new Date(info.startAt)?.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})
  const endTime = new Date(info.endAt)?.toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})

  return (
    <div className="min-h-screen flex justify-center items-start px-5 py-10 bg-gray-100">
      <div className="w-full max-w-3xl bg-white shadow rounded-2xl p-6">
        <h1 className="text-2xl font-semibold text-blue-500">Checkout</h1>

        <p className="mt-3 text-gray-700">
          You are booking an appointment with:
        </p>

        <div className="bg-blue-50 rounded-lg p-3 mt-2 mb-6 border border-blue-200">
          <p><strong>name:</strong> {info.doctorName}</p>
          <p><strong>date:</strong> {slotStartDate}</p>
          <p><strong>start time:</strong> {startTime}</p>
          <p><strong>End time:</strong> {endTime}</p>
          <p><strong>Appointment Fee:</strong> {info.appointmentFee} ৳</p>
        </div>
        <CheckoutFormForDoctor info={info} />
      </div>
    </div>
  );
}
