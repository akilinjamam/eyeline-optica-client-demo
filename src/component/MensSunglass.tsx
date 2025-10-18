"use client"
import { TContactLenseData, TFrame } from '@/ts-definition/types';
import React, { useRef } from 'react';
import mensImg from '../../public/images/mens-sunglass-banner.png';
import Image from 'next/image';
import arrowLeft from '../../public/images/arrow-left.png'
import arrowRight from '../../public/images/arrow-right.png'
import Title from './Title';
import GlassCard from './GlassCard';
import useWeeklyDealsScroller from '@/custom-hooks/useWeeklyDealsScroller';

const MensSunglass = ({data} : {data:TFrame[]}) => {

    const contactLense:TContactLenseData ={
        lense: mensImg
    }

    const currentRef = useRef(null);
    const {handleNavigation, parentRef} = useWeeklyDealsScroller(currentRef)

    return (
        <div className='mt-8'>
            <Title value='MENS SUNGLASSES'/>
            <div className='w-full mt-8'>
                <Image className='mx-auto' src={contactLense.lense} alt='contact-lense'/>
            </div>
            <div className='w-full'>
                <div className='flex items-center justify-around lg:w-[1200px] md:w-[80%] mx-auto gap-5 relative'>
                            <Image className='cursor-pointer inline-block mx-3' src={arrowLeft} alt='left-arrow' onClick={() => handleNavigation('right')}/>
                            <div style={{userSelect:'none'}}  ref={parentRef} className='w-[2600px] h-[300px] mx-auto flex items-center  gap-6 mt-10 overflow-x-hidden scroll-smooth  px-2 '>
                                {
                                    data?.map(({color, name, brand, salesPrice, badge, images,_id }: TFrame, index: number) => <GlassCard color={color} images={images} badge={badge} salesPrice={salesPrice} name={name} brand={brand} key={index} _id={_id}/> )
                                }
                               <div className="pointer-events-none absolute top-0 right-13 lg:right-16 h-full w-32 bg-gradient-to-l from-blue-50/100 to-blue-50/0 z-10" />
                            </div>
                             <Image className='cursor-pointer inline-block mx-3' src={arrowRight} alt='right-arrow' onClick={() => handleNavigation('left')}/>
                </div>
            </div>
        </div>
    );
};

export default MensSunglass;