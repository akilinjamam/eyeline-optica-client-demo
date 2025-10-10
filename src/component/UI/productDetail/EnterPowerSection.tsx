/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { TFrame } from '@/ts-definition/types';
import React, { useState } from 'react';
import { TLensInfo } from './SlideImageAndPriceDetail';
import { useRouter } from 'next/navigation';

type TEyePowerValue = {
    sphere?:string;
    cylinder?:string;
    axis?:string;

}

type TEyePower = {
    leftEye?: TEyePowerValue;
    rightEye?:TEyePowerValue;
}

const EnterPowerSection = ({product, lensInfo}:{product:TFrame, lensInfo:TLensInfo}) => {

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

    const createSphAndCyl = (num1:number, num2:number) => {
        const sphAndCyl = [];
        for(let i = num1; i < num2; i += 0.25){
            const value = i.toFixed(2);
            sphAndCyl.push({label: value, value:value})
        };

        return sphAndCyl;
    }
    const createAxis = (num1:number, num2:number) => {
        const sphAndCyl = [];
        for(let i = num1; i < num2; i++){
            const value = i
            sphAndCyl.push({label: value, value:value})
        };

        return sphAndCyl;
    }

   const sphArr = createSphAndCyl(-30, 15.25)
   const cylArr = createSphAndCyl(-6, 6.25)
   const axisArr = createAxis(1, 181)
   
    const handleSubmit = async (e:any) => {
        e.preventDefault();
        const {name, pd, phoneNumber, email, address} = e.target;

        const totalPrice = lensInfo.price + Number(product.salesPrice);

        const cartData = {
            customerName: name.value, //string
            phoneNumber:phoneNumber.value, 
            email: email.value,
            address:address.value,
            items: [
                {
                    productId: product._id,
                    lensId:lensInfo.id,
                    pd: Number(pd.value),
                    type: "frame_with_lens",
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
            localStorage.setItem("token", data?.data?.token)
             router.push("/cart");
        }

       } catch (error) {
        console.log(error)
       }
    }
    
    return (
        <div className="w-[98%] mx-2 rounded-md px-2">
            <p className="font-semibold text-xl">Enter Power Manually</p>
            <br />
            <form onSubmit={handleSubmit} action="">
                 <div className="w-full bg-gray-100 rounded-md p-2">
                    <p>
                        <span>
                            <input type="checkbox" name="" id="" />
                        </span>
                        {' '}I have same power for both eyes
                    </p>
                    <br />
                    <p>
                        <span>
                            <input type="checkbox" name="" id="" />
                        </span>
                        {' '}I have cylindrical power
                    </p>
                    <div className="grid grid-cols-4">
                        <div>
                            <br />
                            <p className="font-semibold">POSITION</p>
                            <br />
                            Left
                        </div>
                        <div>
                            <br />
                            <p className="font-semibold">SPH</p>
                            <br />
                            <select
                                onChange={(e) =>
                                setEyePower(prev => ({
                                    ...prev,
                                    leftEye: {
                                    ...prev.leftEye,
                                    sphere: e.target.value,
                                    },
                                }))
                                }
                                style={{ width: '90px' }}
                                name=""
                                id=""
                                className="w-[100px] border border-gray-400 rounded-md p-1"
                            >   <option value="">SELECT</option>
                                {
                                    sphArr.map((sph:any, index:number) => {
                                        return (
                                            <option key={index} value={sph.value}>{sph.label}</option>
                                            
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <br />
                            <p className="font-semibold">CYL</p>
                            <br />
                            <select
                             onChange={(e) =>
                                setEyePower(prev => ({
                                    ...prev,
                                    leftEye: {
                                    ...prev.leftEye,
                                    cylinder: e.target.value,
                                    },
                                }))
                            }
                                name=""
                                id=""
                                className="w-[100px] border border-gray-400 rounded-md p-1"
                            >
                                <option value="">Select</option>
                                {
                                    cylArr.map((sph:any, index:number) => {
                                        return (
                                            <option key={index} value={sph.value}>{sph.label}</option>
                                            
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <br />
                            <p className="font-semibold">AXIS</p>
                            <br />
                            <select
                               onChange={(e) =>
                                setEyePower(prev => ({
                                    ...prev,
                                    leftEye: {
                                    ...prev.leftEye,
                                    axis: e.target.value,
                                    },
                                }))
                                }
                                style={{ width: '90px' }}
                                name=""
                                id=""
                                className="w-[100px] border border-gray-400 rounded-md p-1"
                            >
                                <option value="">Select</option>
                                {
                                    axisArr.map((sph:any, index:number) => {
                                        return (
                                            <option key={index} value={sph.value}>{sph.label}</option>
                                            
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <br />
                            
                            <br />
                            Right
                        </div>
                        <div>
                            <br />
                            <br />
                            <select
                                onChange={(e) =>
                                setEyePower(prev => ({
                                    ...prev,
                                    rightEye: {
                                    ...prev.rightEye,
                                    sphere: e.target.value,
                                    },
                                }))
                                }
                                style={{ width: '90px' }}
                                name=""
                                id=""
                                className="w-[100px] border border-gray-400 rounded-md p-1"
                            >   <option value="">SELECT</option>
                                {
                                    sphArr.map((sph:any, index:number) => {
                                        return (
                                            <option key={index} value={sph.value}>{sph.label}</option>
                                            
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <br />
                            
                            <br />
                            <select
                                 onChange={(e) =>
                                setEyePower(prev => ({
                                    ...prev,
                                    rightEye: {
                                    ...prev.rightEye,
                                    cylinder: e.target.value,
                                    },
                                }))
                                }
                                style={{ width: '90px' }}
                                name=""
                                id=""
                                className="w-[100px] border border-gray-400 rounded-md p-1"
                            >
                                <option value="">Select</option>
                                {
                                    cylArr.map((sph:any, index:number) => {
                                        return (
                                            <option key={index} value={sph.value}>{sph.label}</option>
                                            
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div>
                            <br />
                           
                            <br />
                            <select
                               onChange={(e) =>
                                setEyePower(prev => ({
                                    ...prev,
                                    rightEye: {
                                    ...prev.rightEye,
                                    axis: e.target.value,
                                    },
                                }))
                                }
                                style={{ width: '90px' }}
                                name=""
                                id=""
                                className="w-[100px] border border-gray-400 rounded-md p-1"
                            >
                                <option value="">Select</option>
                                {
                                    axisArr.map((sph:any, index:number) => {
                                        return (
                                            <option key={index} value={sph.value}>{sph.label}</option>
                                            
                                        )
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <br />
                <p className="font-semibold text-xl">Whose Prescription is this</p>
                <div>
                    <br />
                    <input
                        className="w-full rounded-md p-4 border border-gray-400"
                        type="number"
                        name="pd"
                        id=""
                        placeholder="PD"
                        step="any"
                        onWheel={(e) => e.currentTarget.blur()}
                    />
                    <br /><br />
                    <input
                        className="w-full rounded-md p-4 border border-gray-400"
                        type="text"
                        name="name"
                        id=""
                        placeholder="YOUR NAME"
                    />
                    <br /><br />
                    <input
                        className="w-full rounded-md p-4 border border-gray-400"
                        type="text"
                        name="email"
                        id=""
                        placeholder="Email"
                    />
                    <br /><br />
                    <input
                        className="w-full rounded-md p-4 border border-gray-400"
                        type="number"
                        name="phoneNumber"
                        id=""
                        placeholder="Phone Number *"
                        onWheel={(e) => e.currentTarget.blur()}
                    />
                    <br /><br />
                    <textarea
                        className="w-full rounded-md p-4 border border-gray-400"
                        name="address"
                        id=""
                        placeholder="Address *"
                    />
                </div>
                <br />
                <div className="flex items-center justify-center w-full h-[20px]">
                    {
                        loading !== 'pending...'
                        ?
                        <button  type='submit' className="bg-blue-900 rounded-3xl px-4 py-2 text-white font-bold cursor-pointer">
                            Save & Add to Cart
                        </button>
                        :
                        <button disabled className="bg-blue-500 rounded-3xl px-4 py-2 text-white font-bold cursor-not-allowed">
                            Please Wait...
                        </button>
                    }
                </div>
                <div className="w-full text-center mt-5 text-green-800 text-sm">
                    <p>Can’t find your power, Call +8801 99088765675</p>
                </div>
            </form>
        </div>
    );
};

export default EnterPowerSection;