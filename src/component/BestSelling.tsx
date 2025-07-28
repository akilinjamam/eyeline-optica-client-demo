"use client"
import React, { FC, useRef } from 'react';
import { glassData } from './glassData';
import { GlassCardProps } from '@/ts-definition/interfaces';
import GlassCard from './GlassCard';
import useWeeklyDealsScroller from '@/custom-hooks/useWeeklyDealsScroller';
import { ArrowRight } from 'lucide-react';
import Title from './Title';

const BestSelling:FC = () => {
    const currentRef = useRef(null);
    const {parentRef} = useWeeklyDealsScroller(currentRef)
    return (
        <div className='w-full mt-8'>
            <Title value='BEST SELLING'/>
            <div className='w-[1200px] mx-auto flex items-center justify-end'>
                <div className=' w-[130px] mt-2 px-2 py-2 text-white  font-semibold rounded bg-gradient-to-r from-[#259AFF] to-[#1D4DFF] hover:opacity-90 transition cursor-pointer flex  items-center justify-between'>
                     <button >Show Now </button>
                    <ArrowRight/>
                </div>
            </div>
            <div className='flex items-center justify-around w-[1200px] mx-auto gap-5'>
           
            <div ref={parentRef} className='w-[2600px] h-[300px] mx-auto flex items-center  gap-6 mt-2 overflow-x-hidden scroll-smooth  px-2 '>
                {
                    glassData?.slice(0,6).map(({colorCount, title, model, price, tag, image }: GlassCardProps, index: number) => <GlassCard colorCount={colorCount} image={image} tag={tag} price={price} title={title} model={model} key={index}/> )
                }
            </div>
            
            </div>
        </div>
    );
};

export default BestSelling;