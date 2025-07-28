import { TContactLenseData } from '@/ts-definition/types';
import React, { FC } from 'react';
import womensImg from '../../public/images/women-glass-banner.png';
import Image from 'next/image';

import Title from './Title';
import GlassCardsGallary from './GlassCardsGallary';

const WomenSunglass:FC = () => {

    const contactLense:TContactLenseData ={
        lense: womensImg
    }

    return (
        <div className='mt-8'>
            <Title value='WOMENS SUNGLASSES'/>
            <div className='w-full mt-8'>
                <Image className='mx-auto' src={contactLense.lense} alt='contact-lense'/>
            </div>
            <div className='w-full'>
                <GlassCardsGallary/>
            </div>
        </div>
    );
};

export default WomenSunglass;