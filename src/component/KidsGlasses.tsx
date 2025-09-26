import { TContactLenseData, TFrame } from '@/ts-definition/types';
import kidsImg from '../../public/images/kids-glass-banner.png';
import Image from 'next/image';

import Title from './Title';
import GlassCardsGallary from './GlassCardsGallary';

const Kidsglass = ({data}:{data:TFrame[]}) => {

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
                <GlassCardsGallary data={data}/>
            </div>
        </div>
    );
};

export default Kidsglass;