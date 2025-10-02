"use client"
import React, { useRef } from 'react';
import GlassCard from './GlassCard';
import arrowLeft from '../../public/images/arrow-left.png'
import arrowRight from '../../public/images/arrow-right.png'
import Image from 'next/image';
import useWeeklyDealsScroller from '@/custom-hooks/useWeeklyDealsScroller';
import { TFrame } from '@/ts-definition/types';


const GlassCardsGallary = ({data}: {data:TFrame[]}) => {

    const currentRef = useRef(null);
    const {handleNavigation, parentRef} = useWeeklyDealsScroller(currentRef)
  
    return (
        <div className='flex items-center justify-around lg:w-[1200px] md:w-[80%] mx-auto gap-5 relative'>
            <Image className='cursor-pointer inline-block mx-3' src={arrowLeft} alt='left-arrow' onClick={() => handleNavigation('right')}/>
            <div style={{userSelect:'none'}}  ref={parentRef} className='w-[2600px] h-[300px] mx-auto flex items-center  gap-6 mt-10 overflow-x-hidden scroll-smooth  px-2 '>
                {
                    data?.filter((f:TFrame) => f?.weeklyDeals === true)?.map(({color, name, brand, salesPrice, badge, images,_id }: TFrame, index: number) => <GlassCard color={color} images={images} badge={badge} salesPrice={salesPrice} name={name} brand={brand} key={index} _id={_id}/> )
                }
               <div className="pointer-events-none absolute top-0 right-13 lg:right-16 h-full w-32 bg-gradient-to-l from-blue-50/100 to-blue-50/0 z-10" />
            </div>
             <Image className='cursor-pointer inline-block mx-3' src={arrowRight} alt='right-arrow' onClick={() => handleNavigation('left')}/>
        </div>
    );
};

export default GlassCardsGallary;