"use client"
import {FC} from 'react';
import HorizontalBrandScroll from './HorizontalBrandScroll';

const PopularBrand:FC = () => {
    return (
        <div className='w-full mt-5'>
            <div  className="w-[90%] flex items-center gap-4 mx-auto">
                <hr className="flex-grow border-t border-gray-300" />
                    <p className="whitespace-nowrap text-2xl font-medium">OUR POPULAR BRANDS</p>
                <hr className="flex-grow border-t border-gray-300" />
            </div>
            <HorizontalBrandScroll/>
        </div>
    );
};

export default PopularBrand;