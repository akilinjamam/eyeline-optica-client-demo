"use client"

import React, { useRef } from 'react';
import Title from './Title';
// import imageOne from '../../public/images/designed-sunglasses-1.png'
// import imageTwo from '../../public/images/designed-sunglasses-2.png'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useSwipe from '@/custom-hooks/useSwipe';
import { IBanner } from '@/ts-definition/interfaces';
import { bannerAccordingToCategory } from '@/fetchData/bannerAccordingToCategory';

 type Element = {
        id: number;
        name: string;
        image: string;
        link:string;
    };
    

const DesignedSunglasses = ({bannerData}: {bannerData:IBanner[]}) => {

  const elements:Element[] = [
        {
            id: 1,
            name: 'Eyeglasses',
            image: bannerAccordingToCategory("Mobile Designed Sunglasses One", bannerData) as string,
            link: "/allglasses/sunglasses"
        },
        {
            id: 2,
            name: 'Sunglasses',
            image: bannerAccordingToCategory("Mobile Designed Sunglasses Two", bannerData) as string,
            link: "/allglasses/sunglasses"
        },
        {
            id: 3,
            name: 'Special Glasses',
            image: bannerAccordingToCategory("Mobile Designed Sunglasses Three", bannerData) as string,
            link: "/allglasses/sunglasses"
        },
        {
            id: 4,
            name: 'Contact Lenses',
            image: bannerAccordingToCategory("Mobile Designed Sunglasses Four", bannerData) as string,
            link: "/allglasses/sunglasses"
        },
        {
            id: 5,
            name: 'Power Sunglasses', 
            image: bannerAccordingToCategory("Mobile Designed Sunglasses Five", bannerData) as string,
            link: "/allglasses/sunglasses"
        },
        {
            id: 6,
            name: 'Progressive Lenses',
            image: bannerAccordingToCategory("Mobile Designed Sunglasses Six", bannerData) as string,
            link: "/allglasses/sunglasses"
        },
    ]

     const router = useRouter();
    const swipeRef = useRef(null);

    const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)
    return (
        <div className='md:hidden lg:hidden block'>
            <br />
            <Title value='DESIGNED SUNGLASSES' />
            <div className="w-full px-4 py-4 overflow-x-hidden relative">
                  <div
                    ref={swippedRef}
                    style={{userSelect:'none'}}
                    className="
                      flex gap-4 overflow-x-hidden cursor-grab 
                      mx-auto max-w-full
                      sm:justify-center
                      
                    "
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                  >
                    {elements.map((element: Element) => (
                      <div
                        onClick={() => router.push(element.link)}
                        key={element.id}
                        className=""
                      >
                        <div className="w-[180px] flex items-center justify-center rounded">
                          <Image
                            height={200}
                            width={200}
                            src={element.image}
                            alt={element.name}
                            className="rounded-md cursor-pointer"
                          />
                        </div>
                        
                      </div>
                    ))}
                     
                  </div>
                  
            </div>
        </div>
    );
};

export default DesignedSunglasses;