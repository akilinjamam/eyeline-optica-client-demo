import { TContactLenseData, TFrame } from '@/ts-definition/types';
import React from 'react';
import mensImg from '../../public/images/mens-sunglass-banner.png';
import Image from 'next/image';

import Title from './Title';
import GlassCardsGallary from './GlassCardsGallary';

const MensSunglass = ({data} : {data:TFrame[]}) => {

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
                <GlassCardsGallary data={data}/>
            </div>
        </div>
    );
};

export default MensSunglass;