import { TContactLenseData } from '@/ts-definition/types';
import React, { FC } from 'react';
import lenseImg from '../../public/images/contact-lense.png';
import Image from 'next/image';
import LenseCartGallary from './LenseCartGallary';
import Title from './Title';

const ContactLense:FC = () => {

    const contactLense:TContactLenseData ={
        lense: lenseImg
    }

    return (
        <div className='mt-8 mb-8'>
           <Title value='CONTACT LENS'/>
            <div className='w-full mt-8'>
                <Image className='mx-auto' src={contactLense.lense} alt='contact-lense'/>
            </div>
            <div className='w-full mt-8'>
                <LenseCartGallary/>
            </div>
        </div>
    );
};

export default ContactLense;