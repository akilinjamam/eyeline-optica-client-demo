import { TContactLenseData } from '@/ts-definition/types';
import React, { FC } from 'react';
import kidsImg from '../../public/images/kids-glass-banner.png';
import Image from 'next/image';

import Title from './Title';
import GlassCardsGallary from './GlassCardsGallary';

const Kidsglass:FC = () => {

    const contactLense:TContactLenseData ={
        lense: kidsImg
    }

    return (
        <div className='mt-8'>
            <Title value='KIDS GLASSES'/>
            <div className='w-full mt-8'>
                <Image className='mx-auto' src={contactLense.lense} alt='contact-lense'/>
            </div>
            <div className='w-full'>
                <GlassCardsGallary/>
            </div>
        </div>
    );
};

export default Kidsglass;