"use client"
import React, { FC, useRef } from 'react';
import { glassData } from './glassData';
import { GlassCardProps } from '@/ts-definition/interfaces';
import GlassCard from './GlassCard';
import { ArrowRight } from 'lucide-react';
import Title from './Title';
import useSwipe from '@/custom-hooks/useSwipe';

const BestSelling:FC = () => {
    const swipeRef = useRef(null);
    
        const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)
    return (
        <div className='w-full mt-8 '>
            <Title value='BEST SELLING'/>
            <div className='w-[90%] sm:w-[75%] md:w-[85%] lg:w-[1200px] mx-auto flex items-center justify-end'>
                <div className=' w-[130px] mt-2 px-2 py-2 text-white  font-semibold rounded bg-gradient-to-r from-[#259AFF] to-[#1D4DFF] hover:opacity-90 transition cursor-pointer flex  items-center justify-between'>
                     <button >Show Now </button>
                    <ArrowRight/>
                </div>
            </div>
            <div className='flex items-center justify-around lg:w-[1200px] md:w-[90%] sm:w-[85%] mx-auto gap-5 relative'>
           
            <div 
            ref={swippedRef} 
            className='w-[2600px] h-[300px] mx-auto flex items-center  gap-6 mt-2 overflow-x-hidden scroll-smooth  px-2 cursor-grab'
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            >
                {
                    glassData?.slice(0,6).map(({colorCount, title, model, price, tag, image }: GlassCardProps, index: number) => <GlassCard colorCount={colorCount} image={image} tag={tag} price={price} title={title} model={model} key={index}/> )
                }
            </div>
            <div className="pointer-events-none absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-blue-50/100 to-blue-50/0 z-10 lg:hidden" />
            </div>
        </div>
    );
};

export default BestSelling;