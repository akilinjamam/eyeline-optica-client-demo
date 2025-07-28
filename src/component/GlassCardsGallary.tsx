"use client"
import React, { FC, useRef } from 'react';
import { glassData } from './glassData';
import { GlassCardProps } from '@/ts-definition/interfaces';
import GlassCard from './GlassCard';
import arrowLeft from '../../public/images/arrow-left.png'
import arrowRight from '../../public/images/arrow-right.png'
import Image from 'next/image';
import useWeeklyDealsScroller from '@/custom-hooks/useWeeklyDealsScroller';

const GlassCardsGallary:FC = () => {
    const currentRef = useRef(null);
    const {handleNavigation, parentRef} = useWeeklyDealsScroller(currentRef)

    return (
        <div  className='flex items-center justify-around w-[1200px] mx-auto gap-5 relative'>
            <Image className='cursor-pointer' src={arrowLeft} alt='left-arrow' onClick={() => handleNavigation('right')}/>
            <div style={{userSelect:'none'}}  ref={parentRef} className='w-[2600px] h-[300px] mx-auto flex items-center  gap-6 mt-10 overflow-x-hidden scroll-smooth  px-2 '>
                {
                    glassData?.map(({colorCount, title, model, price, tag, image }: GlassCardProps, index: number) => <GlassCard colorCount={colorCount} image={image} tag={tag} price={price} title={title} model={model} key={index}/> )
                }
               <div className="pointer-events-none absolute top-0 right-10 h-full w-32 bg-gradient-to-l from-blue-50/100 to-blue-50/0 z-10" />
            </div>
             <Image className='cursor-pointer' src={arrowRight} alt='right-arrow' onClick={() => handleNavigation('left')}/>
        </div>
    );
};

export default GlassCardsGallary;