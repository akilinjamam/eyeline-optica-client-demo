"use client"
import React, {  useRef } from 'react';

import GlassCard from './GlassCard';
import arrowLeft from '../../public/images/arrow-left.png'
import arrowRights from '../../public/images/arrow-right.png'
import Image from 'next/image';
import useWeeklyDealsScroller from '@/custom-hooks/useWeeklyDealsScroller';
import {ArrowRight} from 'lucide-react'
import Title from './Title';
import { TFrame } from '@/ts-definition/types';
import { useRouter } from 'next/navigation';
import useSwipe from '@/custom-hooks/useSwipe';

const NewArrivals = ({data} : {data:TFrame[]}) => {
    const router = useRouter();
    const currentRef = useRef(null);
    const {handleNavigation, parentRef} = useWeeklyDealsScroller(currentRef)

    const swipeRef = useRef(null);

    const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)
    return (
        <div className='w-full mt-8 '>
            <Title value='NEW ARRIVAL'/>
            <br />
            <div className='w-[90%] sm:w-[75%] md:w-[85%] lg:w-[1200px] mx-auto flex items-center justify-end'>
                <div className=' w-[130px] mt-2 px-2 py-2 text-white  font-semibold rounded bg-gradient-to-r from-[#259AFF] to-[#1D4DFF] hover:opacity-90 transition cursor-pointer flex  items-center justify-between'>
                     <button onClick={() => router.push('/allglasses/brand')}>Shop Now </button>
                    <ArrowRight/>
                </div>
            </div>

            <div className='hidden md:block lg:block'>
                <div className='flex items-center justify-around lg:w-[1200px] md:w-[90%] sm:w-[85%] mx-auto gap-5 relative'>
                <Image className='cursor-pointer inline-block mx-3' src={arrowLeft} alt='left-arrow' onClick={() => handleNavigation('right')}/>
                <div ref={parentRef} className='w-[2600px] h-[300px] mx-auto flex items-center  gap-6 mt-2 overflow-x-hidden scroll-smooth  px-2'>
                {
                    data?.slice(0,13)?.map(({color, name, brand, salesPrice, badge, images, _id }: TFrame, index: number) => <GlassCard color={color} images={images} badge={badge} salesPrice={salesPrice} name={name} brand={brand} key={index} _id={_id}/> )
                }
                </div>
                <Image className='cursor-pointer inline-block mx-3' src={arrowRights} alt='right-arrow' onClick={() => handleNavigation('left')}/>
                <div className="pointer-events-none absolute top-0 right-13 lg:right-16 h-full w-32 bg-gradient-to-l from-blue-50/100 to-blue-50/0 z-10" />
                </div>
            </div>
            <div className='lg:hidden md:hidden block'>
                <div className='flex items-center justify-around lg:w-[1200px] md:w-[90%] sm:w-[85%] mx-auto gap-5 relative'>
                
                <div 
                ref={swippedRef} 
                className='w-[2600px] h-[300px] mx-auto flex items-center  gap-6 mt-2 overflow-x-hidden scroll-smooth  px-2'
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                >
                {
                    data?.slice(0,13)?.map(({color, name, brand, salesPrice, badge, images, _id }: TFrame, index: number) => <GlassCard color={color} images={images} badge={badge} salesPrice={salesPrice} name={name} brand={brand} key={index} _id={_id}/> )
                }
                </div>
                
                </div>
            </div>
        </div>
    );
};

export default NewArrivals;