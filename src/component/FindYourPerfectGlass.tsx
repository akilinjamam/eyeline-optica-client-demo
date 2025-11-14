import React from 'react';
// import image1 from '../../public/images/findYourPerfectImageGlass-1.png'
// import image2 from '../../public/images/findYourPerfectImageGlass-2.png'
// import image3 from '../../public/images/findYourPerfectImageGlass-3.png'
import Image from 'next/image';
import Title from './Title';
import { IBanner } from '@/ts-definition/interfaces';
import { bannerAccordingToCategory } from '@/fetchData/bannerAccordingToCategory';

const FindYourPerfectGlass = ({bannerData}: {bannerData:IBanner[]}) => {
    return (
        <div className='hidden lg:block'>
            <Title value='FIND YOUR PERFECT GLASS'/>
            <div className=" grid grid-cols-2 gap-4 w-full max-w-[1200px] mx-auto mt-8 ">
  
                <div className="flex flex-col gap-4">
                    <div className="w-full">
                    <Image width={500} height={500} src={bannerAccordingToCategory("Desktop Find Your Perfect Glass One", bannerData) as string} alt="Photochromic-Lenses" className="w-full h-auto rounded-xl shadow" />
                    </div>
                    <div className="w-full">
                    <Image width={500} height={500} src={bannerAccordingToCategory("Desktop Find Your Perfect Glass Two", bannerData) as string} alt="Progressive Lenses" className="w-full h-auto rounded-xl shadow" />
                    </div>
                </div>

  
                <div className="w-full h-full">
                    <Image width={500} height={500} src={bannerAccordingToCategory("Desktop Find Your Perfect Glass Three", bannerData) as string} alt="Reading Glasses" className="w-full h-full object-cover rounded-xl shadow" />
                </div>
            </div>

        </div>
    );
};

export default FindYourPerfectGlass;