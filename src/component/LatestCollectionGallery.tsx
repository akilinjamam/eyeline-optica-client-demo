"use client"
import React, { FC, useRef } from 'react';
import { latestCollectionData } from './latestCollectionsElements';
import { TLatestCollectionsData } from '@/ts-definition/interfaces';
import LatestCollectionCard from './LatestCollectionCard';
import useSwipe from '@/custom-hooks/useSwipe';

const LatestCollectionGallery:FC = () => {
        const swipeRef = useRef(null);
    
        const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)
    return (
       <div className='relative'>
            <div className=' w-[97%] mx-auto flex items-center lg:justify-center sm:justify-start overflow-x-hidden cursor-grab'
        ref={swippedRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        >
            <div className='w-[1200px] flex items-center justify-between gap-2.5 select-none'>
                {
                    latestCollectionData?.map(({image, type}:TLatestCollectionsData, index: number) => <LatestCollectionCard key={index} image={image} type={type}/>)
                }
            </div>
           
            </div>
             <div className="pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-blue-50/100 to-blue-50/0 z-10" />
       </div>
    );
};

export default LatestCollectionGallery;