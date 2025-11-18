/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";

export interface IDoc {
    _id:string;
    appointmentFee:number;
    name:string;
}

export interface ISlot {
  _id: string;
  doctor:IDoc;
  startAt: string;
  endAt: string;
  isBooked: boolean;
  patient: string | null;
  createdAt:string;
  updatedAt:string;
}

export default function Slots({ doctorId, allSlotData }: { doctorId: string, allSlotData:ISlot[] }) {

const navigate = useRouter();    
const slots = allSlotData?.filter((slot:ISlot) => slot?.doctor?._id === doctorId);


  if (!slots.length) {
    return <p className="text-gray-600">No slots available.</p>;
  }

  // Group by Date
  const grouped = slots.reduce((acc: any, slot) => {
    const date = new Date(slot.startAt).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    acc[date] = acc[date] ? [...acc[date], slot] : [slot];
    return acc;
  }, {});

  const handleBooking = (value:ISlot) => {
    const data = {
        slotId:value?._id,
        startAt:value?.startAt,
        endAt:value?.endAt,
        doctorId,
        appointmentFee: value?.doctor?.appointmentFee,
        doctorName: value?.doctor?.name
    };

    localStorage.setItem("appointmentData", JSON.stringify(data))
    navigate.push("/patientCheckout")
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 max-h-auto overflow-y-auto scrollbar-thin">
      {Object.keys(grouped).map((date) => (
        <div key={date} className="mb-6">
          <p className="text-lg font-semibold text-blue-500 mb-3">{date}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
            {grouped[date].map((slot: ISlot) => {
              const startTime = new Date(slot.startAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              const endTime = new Date(slot.endAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={slot._id}
                  className={`p-3 rounded-lg border 
                    ${
                      slot.isBooked
                        ? "bg-red-100 border-red-300 text-red-600"
                        : "bg-blue-100 border-blue-300 text-blue-700"
                    }
                  `}
                >
                  <p className="font-medium">{startTime} - {endTime}</p>
                  {!slot.isBooked ? (
                    <button
                      onClick={() => handleBooking(slot)}  
                      className="w-full mt-2 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded"
                    >
                      Book
                    </button>
                  ) : (
                    <p className="mt-2 text-xs italic">Already booked</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
