/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState } from "react";

import { Loader, FileDown } from "lucide-react";
import { getPrescription } from "@/fetchData/fetchFrameData";
import usePrescriptionPdfDownloader from "@/custom-hooks/usePrescriptionPdfDownloader";
import { IDoctor } from "@/ts-definition/interfaces";
import { jwtDecode } from "jwt-decode";
import { JwtPayloadForAppointment } from "../cart/page";

// Matching your backend model
export interface IMedicine {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
}

export interface IPrescription {
  _id: string;
  doctorId: IDoctor;
  patientId: any;
  date: string;
  diagnosis: string;
  medicines: IMedicine[];
  tests: string;
  advice: string;

  // Additional fields needed for PDF
  patientName?: string;
  age?: string;
  gender?: string;
  doctorName?: string;
  specialization?: string;
  clinicName?: string;
  clinicAddress?: string;
  contact?: string;
}

const PrescriptionItem = ({ pres }: { pres: any }) => {
  // Call the hook at the top level of the component (valid hook usage)
  const { generatePDF } = usePrescriptionPdfDownloader(pres as any);

  return (
    <div
      key={pres._id}
      className="border p-4 rounded-md shadow-sm bg-white"
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">Date: {pres.date}</p>
          <p className="text-sm text-gray-600">Doctor: {pres?.doctorId?.name}</p>
          <p className="text-sm text-gray-600">Patient: {pres?.patientId?.name}</p>
          <p className="text-sm text-gray-600">
            Diagnosis: {pres.diagnosis}
          </p>
        </div>

        <button
          onClick={generatePDF}
          className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 transition"
        >
          <FileDown className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      <div className="mt-3">
        <p className="text-sm text-gray-700">
          <strong>Medicines:</strong>
        </p>
        <ul className="list-disc list-inside text-gray-600 text-sm">
          {pres.medicines.map((m:any, index:number) => (
            <li key={index}>
              {m.name} — {m.dosage}, {m.frequency}, {m.duration}
            </li>
          ))}
        </ul>
      </div>

      {pres.tests && (
        <p className="text-sm mt-2">
          <strong>Tests:</strong> {pres.tests}
        </p>
      )}

      {pres.advice && (
        <p className="text-sm mt-1">
          <strong>Advice:</strong> {pres.advice}
        </p>
      )}
    </div>
  );
};

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState<IPrescription[]>([]);
  const [loading, setLoading] = useState(false);
  const [patientId, setPatientId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token-appointment");
    if(token){
      const decode = jwtDecode(token) as JwtPayloadForAppointment;
      console.log(decode)
      setPatientId(decode?.patientId as string);
    }
  }, []);

  useEffect(() => {
    if (!patientId) return;

    const loadPrescriptions = async () => {
      setLoading(true);
      try {
        const res = await getPrescription();
        const allData = res?.data || [];
        console.log(res?.data)

        const filtered = allData.filter(
          (p: IPrescription) => p.patientId?._id === patientId
        );

        setPrescriptions(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPrescriptions();
  }, [patientId]);

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <Loader className="animate-spin text-blue-500 w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Prescriptions</h2>

      {prescriptions.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No prescriptions found.
        </div>
      ) : (
        <div className="space-y-4">
          {prescriptions.map((pres) => (
            <PrescriptionItem key={pres._id} pres={pres} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PrescriptionList;
