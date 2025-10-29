/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ILense } from '@/ts-definition/interfaces';

type TEyePowerValue = {
    sphere?:string;
    cylinder?:string;
    axis?:string;

}

type TEyePower = {
    leftEye?: TEyePowerValue;
    rightEye?:TEyePowerValue;
}

const EnterPowerSectionForLens = ({singleLens}:{singleLens:ILense}) => {

    const router = useRouter();

    const [loading, setLoading] = useState('');
    const [eyePower, setEyePower] = useState<TEyePower>({
        leftEye: {
            sphere:  "0",
            cylinder: "0",
            axis:"0"
        },
        rightEye: {
            sphere: "0",
            cylinder:"0",
            axis:"0"
        }
    })

    console.log(eyePower)

    const createSphAndCyl = (negativeRange: number, positiveRange: number) => {
    const sphAndCyl = [];
    for (let i = negativeRange; i < 0; i += 0.25) {
      const value = i.toFixed(2);
      sphAndCyl.push({ label: value, value });
    }
    sphAndCyl.push({ label: "0.00", value: "0" });
    for (let i = 0.25; i <= positiveRange; i += 0.25) {
      const value = `+${i.toFixed(2)}`;
      sphAndCyl.push({ label: value, value });
    }
    return sphAndCyl;
  };

  const createAxis = (start: number, end: number) => {
    const axisArr = [];
    for (let i = start; i <= end; i++) {
      axisArr.push({ label: String(i), value: String(i) });
    }
    return axisArr;
  };


   const sphArr = createSphAndCyl(-30, 15.25)
   const cylArr = createSphAndCyl(-6, 6.25)
   const axisArr = createAxis(1, 181)
   
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const {name, pd, phoneNumber, email, address} = e.target;

        const totalPrice = singleLens.salesPrice
        console.log(singleLens)
        const cartData = {
            customerName: name.value, //string
            phoneNumber:phoneNumber.value, 
            email: email.value,
            address:address.value,
            items: [
                {
                    
                    lensId:singleLens._id,
                    pd: Number(pd.value),
                    type: "lens",
                    submitType:"Enter Power Manually",
                    quantity: 1,
                    unitPrice: totalPrice,
                    subtotal: totalPrice,
                    leftEye: eyePower.leftEye,
                    rightEye: eyePower.rightEye,
                }
            ],
            totalAmount: totalPrice,
            deliveryFee: 70,
        }
        console.log(cartData)
        setLoading('pending...')
       try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}cart/create-cart`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(cartData),
        });
        

        const data = await res.json();
        console.log(data)
        if(data.success){
            setLoading('');
            window.dispatchEvent(new Event("cartUpdated"));
            localStorage.setItem("token", data?.data?.token)
             router.push("/cart");
        }

       } catch (error) {
        console.log(error)
       }
    }
    
    return (
        <div className="w-[98%] mx-auto rounded-md px-2 sm:px-4 py-4 bg-white shadow-sm h-[70vh] overflow-y-scroll hide-scrollbar">
            <p className="font-semibold text-xl mb-4">Enter Power Manually</p>

            <form onSubmit={handleSubmit}>
                <div className="w-full bg-gray-50 rounded-md p-4 ">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Left Eye */}
                    <div className="border rounded-md p-3 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-700 mb-3 text-center">
                        LEFT EYE
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                        {/* SPH */}
                        <div>
                        <p className="font-medium mb-1">SPH</p>
                        <select
                                onClick={(e) => {
                                    const select = e.currentTarget;
                                    const zeroOption = Array.from(select.options).find(
                                    (opt) => opt.value === "0"
                                    );
                                    if (zeroOption) {
                                    // Scroll "0" into center view when dropdown opens
                                    setTimeout(() => {
                                        zeroOption.scrollIntoView({ block: "nearest" });
                                    }, 0);
                                    }
                                }}
                                value={eyePower.leftEye?.sphere || "0"} // keep 0 selected by default
                                onChange={(e) =>
                                    setEyePower((prev) => ({
                                    ...prev,
                                    leftEye: { ...prev.leftEye, sphere: e.target.value },
                                    }))
                                }
                                className="w-full border border-gray-400 rounded-md p-2"
                                >
                                {sphArr.map((sph: any, index: number) => (
                                    <option key={index} value={sph.value}>
                                    {sph.label}
                                    </option>
                                ))}
                        </select>
                        </div>

                        {/* CYL */}
                        <div>
                        <p className="font-medium mb-1">CYL</p>
                        <select
                                onClick={(e) => {
                                    const select = e.currentTarget;
                                    const zeroOption = Array.from(select.options).find(
                                    (opt) => opt.value === "0"
                                    );
                                    if (zeroOption) {
                                    // Scroll "0" into center view when dropdown opens
                                    setTimeout(() => {
                                        zeroOption.scrollIntoView({ block: "nearest" });
                                    }, 0);
                                    }
                                }}
                                value={eyePower.leftEye?.cylinder || "0"} // keep 0 selected by default
                                onChange={(e) =>
                                    setEyePower((prev) => ({
                                    ...prev,
                                    leftEye: { ...prev.leftEye, cylinder: e.target.value },
                                    }))
                                }
                                className="w-full border border-gray-400 rounded-md p-2"
                                >
                                {cylArr.map((cyl: any, index: number) => (
                                    <option key={index} value={cyl.value}>
                                    {cyl.label}
                                    </option>
                                ))}
                        </select>
                        </div>

                        {/* AXIS */}
                        <div>
                        <p className="font-medium mb-1">AXIS</p>
                        <select
                            value={eyePower.leftEye?.axis}
                            onChange={(e) =>
                            setEyePower((prev) => ({
                                ...prev,
                                leftEye: { ...prev.leftEye, axis: e.target.value },
                            }))
                            }
                            className="w-full border border-gray-400 rounded-md p-2"
                        >
                            {axisArr.map((axis, index) => (
                            <option key={index} value={axis.value}>
                                {axis.label}
                            </option>
                            ))}
                        </select>
                        </div>
                    </div>
                    </div>

                    {/* Right Eye */}
                    <div className="border rounded-md p-3 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold text-blue-700 mb-3 text-center">
                        RIGHT EYE
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                        {/* SPH */}
                        <div>
                        <p className="font-medium mb-1">SPH</p>
                        <select
                                onClick={(e) => {
                                    const select = e.currentTarget;
                                    const zeroOption = Array.from(select.options).find(
                                    (opt) => opt.value === "0"
                                    );
                                    if (zeroOption) {
                                    // Scroll "0" into center view when dropdown opens
                                    setTimeout(() => {
                                        zeroOption.scrollIntoView({ block: "nearest" });
                                    }, 0);
                                    }
                                }}
                                value={eyePower.rightEye?.sphere || "0"} // keep 0 selected by default
                                onChange={(e) =>
                                    setEyePower((prev) => ({
                                    ...prev,
                                    rightEye: { ...prev.rightEye, sphere: e.target.value },
                                    }))
                                }
                                className="w-full border border-gray-400 rounded-md p-2"
                                >
                                {sphArr.map((sph: any, index: number) => (
                                    <option key={index} value={sph.value}>
                                    {sph.label}
                                    </option>
                                ))}
                        </select>
                        </div>

                        {/* CYL */}
                        <div>
                        <p className="font-medium mb-1">CYL</p>
                        <select
                                onClick={(e) => {
                                    const select = e.currentTarget;
                                    const zeroOption = Array.from(select.options).find(
                                    (opt) => opt.value === "0"
                                    );
                                    if (zeroOption) {
                                    // Scroll "0" into center view when dropdown opens
                                    setTimeout(() => {
                                        zeroOption.scrollIntoView({ block: "nearest" });
                                    }, 0);
                                    }
                                }}
                                value={eyePower.rightEye?.cylinder || "0"} // keep 0 selected by default
                                onChange={(e) =>
                                    setEyePower((prev) => ({
                                    ...prev,
                                    rightEye: { ...prev.rightEye, cylinder: e.target.value },
                                    }))
                                }
                                className="w-full border border-gray-400 rounded-md p-2"
                                >
                                {cylArr.map((cyl: any, index: number) => (
                                    <option key={index} value={cyl.value}>
                                    {cyl.label}
                                    </option>
                                ))}
                        </select>
                        </div>

                        {/* AXIS */}
                        <div>
                        <p className="font-medium mb-1">AXIS</p>
                        <select
                            value={eyePower.rightEye?.axis}
                            onChange={(e) =>
                            setEyePower((prev) => ({
                                ...prev,
                                rightEye: { ...prev.rightEye, axis: e.target.value },
                            }))
                            }
                            className="w-full border border-gray-400 rounded-md p-2"
                        >
                            {axisArr.map((axis, index) => (
                            <option key={index} value={axis.value}>
                                {axis.label}
                            </option>
                            ))}
                        </select>
                        </div>
                    </div>
                    </div>
                </div>
                <br />
                <input
                    className="w-full rounded-md p-3 border border-gray-400"
                    type="number"
                    name="pd"
                    placeholder="PD"
                    step="any"
                    onWheel={(e) => e.currentTarget.blur()}
                />
                </div>

                {/* Prescription Info */}
                <div className="mt-6">
                <p className="font-semibold text-xl mb-3">
                    Whose Prescription is this?
                </p>

                <div className="flex flex-col gap-3">
                    <input
                    className="w-full rounded-md p-3 border border-gray-400"
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    />
                    <input
                    className="w-full rounded-md p-3 border border-gray-400"
                    type="email"
                    name="email"
                    placeholder="Email"
                    />
                    <input
                    className="w-full rounded-md p-3 border border-gray-400"
                    type="number"
                    name="phoneNumber"
                    placeholder="Phone Number *"
                    onWheel={(e) => e.currentTarget.blur()}
                    />
                    <textarea
                    className="w-full rounded-md p-3 border border-gray-400"
                    name="address"
                    placeholder="Address *"
                    rows={3}
                    />
                </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                {loading !== "pending..." ? (
                    <button
                    type="submit"
                    className="bg-blue-900 rounded-3xl px-6 py-3 text-white font-bold hover:bg-blue-800 transition-all"
                    >
                    Save & Add to Cart
                    </button>
                ) : (
                    <button
                    disabled
                    className="bg-blue-500 rounded-3xl px-6 py-3 text-white font-bold cursor-not-allowed"
                    >
                    Please Wait...
                    </button>
                )}
                </div>

                <div className="w-full text-center mt-4 text-green-700 text-sm">
                <p>Can’t find your power? Call +8801 99088765675</p>
                </div>
            </form>
        </div>
    );
};

export default EnterPowerSectionForLens;