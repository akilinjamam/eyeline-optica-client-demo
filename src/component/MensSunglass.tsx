import { TContactLenseData } from '@/ts-definition/types';
import React, { FC } from 'react';
import mensImg from '../../public/images/mens-sunglass-banner.png';
import Image from 'next/image';

import Title from './Title';
import GlassCardsGallary from './GlassCardsGallary';

const MensSunglass:FC = () => {

    const contactLense:TContactLenseData ={
        lense: mensImg
    }

    return (
        <div className='mt-8'>
            <Title value='MENS SUNGLASSES'/>
            <div className='w-full mt-8'>
                <Image className='mx-auto' src={contactLense.lense} alt='contact-lense'/>
            </div>
            <div className='w-full'>
                <GlassCardsGallary/>
            </div>
        </div>
    );
};

export default MensSunglass;