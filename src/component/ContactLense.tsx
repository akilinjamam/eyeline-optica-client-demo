import { TContactLens, TContactLenseData } from '@/ts-definition/types';
import React from 'react';
import lenseImg from '../../public/images/contact-lense.png';
import Image from 'next/image';
import LenseCartGallary from './LenseCartGallary';
import Title from './Title';

const ContactLense = ({contactLens}: {contactLens:TContactLens[]}) => {


    const contactLense:TContactLenseData ={
        lense: lenseImg
    }

    return (
        <div className='mt-8 mb-8 hidden md:block lg:block'>
           <Title value='CONTACT LENS'/>
            <div className='w-full mt-8 md:block lg:block hidden'>
                <Image className='mx-auto' src={contactLense.lense} alt='contact-lense'/>
            </div>
            <div className='w-full mt-8'>
                <LenseCartGallary contactLens={contactLens} />
            </div>
        </div>
    );
};

export default ContactLense;