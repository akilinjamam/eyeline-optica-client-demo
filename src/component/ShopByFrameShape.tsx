import React from 'react';
import FrameShapeGallery from './FrameShapeGallery';

const ShopByFrameShape = () => {
    return (
        <div className='w-full'>
            <p className='font-bold text-3xl text-center mb-2'>Shop By Frame Shape</p>
            <p className='text-center'>Choose your perfect frames from our stylish colors and patterns.</p>
            <br />
            <FrameShapeGallery/>
            <br />
            <button className='w-[120px] block mx-auto mt-2 py-1  text-white font-semibold rounded-xl bg-gradient-to-r from-[#259AFF] to-[#1D4DFF] hover:opacity-90 transition cursor-pointer'>Shop All</button>
            <br />
            <p className='font-semibold text-2xl text-center'>Get 20% off your first order</p>
            <p className=' text-center'>Sign up now for exclusive news and savings</p>
            <form className="mt-4 flex justify-center">
                <input
                type="email"
                placeholder="Email Address"
                className=" border border-blue-400  px-4 py-2 w-[400px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button
                type="submit"
                className="bg-gradient-to-r from-[#259AFF] to-[#1D4DFF] hover:opacity-90 transition text-white text-sm px-4 py-2  hover:bg-blue-700 cursor-pointer"
                >
                Sign Up
                </button>
            </form>

            <p className="text-xs text-gray-500 mt-3 max-w-md mx-auto">
                10% off only applies to full price items. Eyeline Optica reserves the right to modify or cancel at any time.
            </p>

            {/* <p className="text-xs text-blue-600 mt-2 underline cursor-pointer">
                Privacy Policy & Terms
            </p> */}
        </div>
    );
};

export default ShopByFrameShape;