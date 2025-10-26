import React from 'react';
import FrameShapeGallery from './FrameShapeGallery';

const ShopByFrameShape = () => {
    return (
            <div className='w-full'>
                <div className="px-4 sm:px-6 md:px-8 lg:px-0 max-w-screen-lg mx-auto">
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-2 text-black">
                    Shop By Frame Shape
                </p>
                <p className="text-sm sm:text-base md:text-lg text-center text-gray-600">
                    Choose your perfect frames from our stylish colors and patterns.
                </p>
            </div>
            <br />
            <FrameShapeGallery/>
            <br />
            <button className='w-[120px] block mx-auto mt-2 py-1  text-white font-semibold rounded-xl bg-gradient-to-r from-[#259AFF] to-[#1D4DFF] hover:opacity-90 transition cursor-pointer'>Shop All</button>
            <br />
           <div className="px-4 sm:px-6 md:px-8 max-w-3xl mx-auto text-center text-black">
                <p className="font-semibold text-xl sm:text-2xl md:text-3xl">
                Get 20% off your first order
                </p>
                <p className="text-sm sm:text-base mt-1 text-gray-700">
                Sign up now for exclusive news and savings
                </p>

                <form className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
                    <input
                    type="email"
                    placeholder="Email Address"
                    className="border border-blue-400 px-4 py-2 w-full sm:w-[300px] md:w-[400px] text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-[#259AFF] to-[#1D4DFF] hover:opacity-90 transition text-white text-sm px-4 py-2 rounded sm:ml-2 w-full sm:w-auto"
                        >
                        Sign Up
                    </button>
                </form>

                <p className="text-xs text-gray-500 mt-3 max-w-md mx-auto">
                    10% off only applies to full price items. Eyeline Optica reserves the right to modify or cancel at any time.
                </p>
            </div>

        
        </div>
    );
};

export default ShopByFrameShape;