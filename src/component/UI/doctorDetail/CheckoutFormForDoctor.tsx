/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";

interface CheckoutProps {
  info: {
    doctorId: string;
    slotId: string;
    appointmentFee: number;
  };
}

export default function CheckoutFormForDoctor({ info }: CheckoutProps) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    age: "",
    address: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const payload = {
      ...form,
      doctorId: info.doctorId,
      slotId: info.slotId,
      appointmentFee: info.appointmentFee,
    };
   

    try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}ssl-appointment/ssl-init-appointment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (data?.success) {
      localStorage.removeItem("token-appointment")
      window.location.href = data.data;
    }
    if (!data?.success) {
      toast.error(data?.message);
    }
    } catch (error) {
        console.log(error)
    }
    
  
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
     <ToastContainer/>
      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          placeholder="Your Name"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Phone Number
        </label>
        <input
          type="text"
          name="phone"
          required
          value={form.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          placeholder="01XXXXXXXXX"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Age
        </label>
        <input
          type="number"
          name="age"
          required
          value={form.age}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          placeholder="Age"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium text-gray-700">
          Address
        </label>
        <textarea
          name="address"
          required
          value={form.address}
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
          placeholder="Your Address"
        ></textarea>
      </div>

      <div className="bg-green-50 border border-green-300 p-3 rounded-xl">
        <p className="font-semibold text-green-700">
          Appointment Fee: {info.appointmentFee} ৳
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
      >
        Confirm & Pay
      </button>
    </form>
  );
}
