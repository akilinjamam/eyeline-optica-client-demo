"use client";
import PatientCall from "@/component/UI/doctorDetail/PatientCall";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { JwtPayloadForAppointment } from "../cart/page";

const Page = () => {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [patientId, setPatientId] = useState<string | null>(null);
  const [doctorName, setDoctorName] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token-appointment");
    if(token){
      const decodeToken = jwtDecode(token) as JwtPayloadForAppointment;
      setRoomId(decodeToken.slotId as string)
      setPatientId(decodeToken.patientId as string)
      setDoctorName("Doctor");
    }
    
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
