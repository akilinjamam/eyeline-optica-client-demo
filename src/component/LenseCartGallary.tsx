"use client"
import React, { FC, useRef } from 'react';
import { ILenseData } from '@/ts-definition/interfaces';
import arrowLeft from '../../public/images/arrow-left.png'
import arrowRight from '../../public/images/arrow-right.png'
import Image from 'next/image';
import useWeeklyDealsScroller from '@/custom-hooks/useWeeklyDealsScroller';
import LenseCard from './LenseCard';
import { lenseData } from './lenseData';

const LenseCartGallary:FC = () => {

    const currentRef = useRef(null);
    const {handleNavigation, parentRef} = useWeeklyDealsScroller(currentRef)
    return (
        <div className='flex items-center justify-around lg:w-[1200px] md:w-[90%] sm:w-[85%] mx-auto gap-5 relative'>
            <Image className='cursor-pointer inline-block mx-3' src={arrowLeft} alt='left-arrow' onClick={() => handleNavigation('right')}/>
            <div ref={parentRef} className='w-[2600px] h-[300px] mx-auto flex items-center  gap-6 mt-10 overflow-x-hidden scroll-smooth  px-2'>
                {
                    lenseData?.map(({image, badge, name, brand, usageInfo, price, originalPrice, discountLabel, discountPercentage }: ILenseData, index: number) => <LenseCard  image={image} badge={badge} name={name} brand={brand} usageInfo={usageInfo} price={price} originalPrice={originalPrice} discountLabel={discountLabel} discountPercentage={discountPercentage}  key={index}/> )
                }
            </div>
            <Image className='cursor-pointer inline-block mx-3' src={arrowRight} alt='right-arrow' onClick={() => handleNavigation('left')}/>
            <div className="pointer-events-none absolute top-0 right-13 lg:right-16 h-full w-32 bg-gradient-to-l from-blue-50/100 to-blue-50/0 z-10" />
        </div>
    );
};

export default LenseCartGallary;