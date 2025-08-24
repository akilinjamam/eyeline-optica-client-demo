"use client"
import React from 'react';

const EnterPowerSection = () => {
    return (
        <div className="w-[98%] mx-2 rounded-md px-2">
            <p className="font-semibold text-xl">Enter Power Manually</p>
            <br />
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
                <div className="grid grid-cols-3">
                    <div>
                        <br />
                        <p className="font-semibold">Power</p>
                        <br />
                        SPH
                    </div>
                    <div>
                        <br />
                        <p className="font-semibold">LEFT (OS)</p>
                        <br />
                        <select
                            style={{ width: '90px' }}
                            name=""
                            id=""
                            className="w-[100px] border border-gray-400 rounded-md p-1"
                        >
                            <option value="">Select</option>
                        </select>
                    </div>
                    <div>
                        <br />
                        <p className="font-semibold">RIGHT (OD)</p>
                        <br />
                        <select
                            style={{ width: '90px' }}
                            name=""
                            id=""
                            className="w-[100px] border border-gray-400 rounded-md p-1"
                        >
                            <option value="">Select</option>
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
                    type="text"
                    name=""
                    id=""
                    placeholder="Name *"
                />
                <br /><br />
                <input
                    className="w-full rounded-md p-4 border border-gray-400"
                    type="text"
                    name=""
                    id=""
                    placeholder="Phone Number *"
                />
            </div>
            <br />
            <div className="flex items-center justify-center w-full h-[20px]">
                <button className="bg-blue-900 rounded-3xl px-4 py-2 text-white font-bold cursor-pointer">
                    Save & Add to Cart
                </button>
            </div>
            <div className="w-full text-center mt-5 text-green-800 text-sm">
                <p>Can’t find your power, Call +8801 99088765675</p>
            </div>
        </div>
    );
};

export default EnterPowerSection;