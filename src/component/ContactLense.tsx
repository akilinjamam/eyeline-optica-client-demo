import { TContactLens } from '@/ts-definition/types';
import React from 'react';
import Image from 'next/image';
import LenseCartGallary from './LenseCartGallary';
import Title from './Title';
import { IBanner } from '@/ts-definition/interfaces';
import { bannerAccordingToCategory } from '@/fetchData/bannerAccordingToCategory';

const ContactLense = ({contactLens, bannerData}: {contactLens:TContactLens[], bannerData:IBanner[]}) => {


    // const contactLense:TContactLenseData ={
    //     lense: lenseImg
    // }

    return (
        <div className='mt-8 mb-8 hidden md:block lg:block'>
           <Title value='CONTACT LENS'/>
            <div className='w-full mt-8 md:block lg:block hidden'>
                <Image width={1400} height={1400} className='mx-auto' src={bannerAccordingToCategory("Desktop Contact Lens", bannerData) as string} alt='contact-lense'/>
            </div>
            <div className='w-full mt-8'>
                <LenseCartGallary contactLens={contactLens} />
            </div>
        </div>
    );
};

export default ContactLense;