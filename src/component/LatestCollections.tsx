import React, { FC } from 'react';
import LatestCollectionGallery from './LatestCollectionGallery';

const LatestCollections:FC = () => {
    return (
        <div className='w-full'>
           <div className="w-full text-black max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 text-center">
                <p className="text-[28px] sm:text-[32px] md:text-[36px] leading-tight">
                    WEAR THE <span className="font-bold text-blue-700">TREND</span>
                </p>
                <p className="text-[16px] sm:text-[18px] md:text-[21px]">
                    Our Latest Collections
                </p>
            </div>  
            <LatestCollectionGallery/>          
        </div>
    );
};

export default LatestCollections;