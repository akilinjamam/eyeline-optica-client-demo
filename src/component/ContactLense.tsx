import { TContactLenseData } from '@/ts-definition/types';
import React, { FC } from 'react';
import lenseImg from '../../public/images/contact-lense.png';
import Image from 'next/image';
import LenseCartGallary from './LenseCartGallary';

const ContactLense:FC = () => {

    const contactLense:TContactLenseData ={
        lense: lenseImg
    }

    return (
        <div className='mt-8'>
            <div  className="w-[90%] flex items-center gap-4 mx-auto">
                <hr className="flex-grow border-t border-gray-300" />
                    <p className="whitespace-nowrap text-[36px] font-medium">Contact Lense</p>
                <hr className="flex-grow border-t border-gray-300" />
            </div>
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