import React, { FC } from 'react';
import LatestCollectionGallery from './LatestCollectionGallery';

const LatestCollections:FC = () => {
    return (
        <div className='w-full'>
            <div className='text-center'>
                <p className='text-[36px]'>WEAR THE <span className='font-bold'>TREND</span></p>    
                <p className='text-[21px]'>Our Latest Collections</p>
            </div>  
            <LatestCollectionGallery/>          
        </div>
    );
};

export default LatestCollections;