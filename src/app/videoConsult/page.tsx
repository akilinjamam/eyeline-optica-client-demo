"use client";
import PatientCall from "@/component/UI/doctorDetail/PatientCall";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [doctorName, setDoctorName] = useState<string>("");

  useEffect(() => {
    const data = localStorage.getItem("appointmentData");
    const patientId = localStorage.getItem("patientId")
    if (!data) return;

    const parsed = JSON.parse(data);

    setRoomId(parsed?.slotId || null);
    setPatientId(patientId || null);
    setDoctorName(parsed?.doctorName);
  }, []);

  if (!roomId || !patientId) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-600">
        Loading...
      </div>
    );
  }

  

  return <PatientCall roomId={roomId} patientId={patientId} doctorName={doctorName}/>;
};

export default Page;
