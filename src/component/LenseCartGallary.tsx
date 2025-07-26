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
        <div className='flex items-center justify-around w-[1200px] mx-auto gap-5'>
            <Image className='cursor-pointer' src={arrowLeft} alt='left-arrow' onClick={() => handleNavigation('right')}/>
            <div ref={parentRef} className='w-[2600px] h-[300px] mx-auto flex items-center  gap-6 mt-10 overflow-x-hidden scroll-smooth  px-2'>
                {
                    lenseData?.map(({image, badge, name, brand, usageInfo, price, originalPrice, discountLabel, discountPercentage }: ILenseData, index: number) => <LenseCard  image={image} badge={badge} name={name} brand={brand} usageInfo={usageInfo} price={price} originalPrice={originalPrice} discountLabel={discountLabel} discountPercentage={discountPercentage}  key={index}/> )
                }
            </div>
             <Image className='cursor-pointer' src={arrowRight} alt='right-arrow' onClick={() => handleNavigation('left')}/>
        </div>
    );
};

export default LenseCartGallary;