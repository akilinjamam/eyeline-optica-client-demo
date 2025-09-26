import { TContactLenseData, TFrame } from '@/ts-definition/types';
import womensImg from '../../public/images/women-glass-banner.png';
import Image from 'next/image';

import Title from './Title';
import GlassCardsGallary from './GlassCardsGallary';

const WomenSunglass = ({data}: {data:TFrame[]}) => {

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
                <GlassCardsGallary data={data}/>
            </div>
        </div>
    );
};

export default WomenSunglass;