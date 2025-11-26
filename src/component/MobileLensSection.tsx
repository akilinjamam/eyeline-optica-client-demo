"use client"

import React, { useRef } from 'react';
import Title from './Title';
import imageOne from '../../public/images/mobile-lens-1.png'
// import imageTwo from '../../public/images/mobile-lens-2.png'
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import useSwipe from '@/custom-hooks/useSwipe';
import { IBanner } from '@/ts-definition/interfaces';
import { bannerAccordingToCategory } from '@/fetchData/bannerAccordingToCategory';

 type Element = {
        id: number;
        name: string;
        image: StaticImageData;
        image2:string;
        link:string;
    };

const MobileLensSection = ({bannerData}: {bannerData:IBanner[]}) => {

  const elements:Element[] = [
        {
            id: 1,
            name: 'Eyeglasses',
            image: imageOne,
            image2:bannerAccordingToCategory("Lenses One", bannerData) as string,
            link: "/allContactLens"
        },
        {
            id: 2,
            name: 'Sunglasses',
            image: imageOne,
            image2:bannerAccordingToCategory("Lenses Two", bannerData) as string,
            link: "/allContactLens"
        },
        {
            id: 3,
            name: 'Special Glasses',
            image: imageOne,
            image2:bannerAccordingToCategory("Lenses Three", bannerData) as string,
            link: "/allContactLens"
        },
        {
            id: 4,
            name: 'Contact Lenses',
            image: imageOne,
            image2:bannerAccordingToCategory("Lenses Four", bannerData) as string,
            link: "/allContactLens"
        },
        {
            id: 5,
            name: 'Power Sunglasses', 
            image: imageOne,
            image2:bannerAccordingToCategory("Lenses Five", bannerData) as string,
            link: "/allContactLens"
        },
        {
            id: 6,
            name: 'Progressive Lenses',
            image: imageOne,
            image2:bannerAccordingToCategory("Lenses Six", bannerData) as string,
            link: "/allContactLens"
        },
    ]

     const router = useRouter();
    const swipeRef = useRef(null);

    const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)
    return (
        <div className='md:hidden lg:hidden block'>
            <br />
            <Title value='CONTACT LENSES' />
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
                        <div className="w-[250px] h-[150px]  flex items-center justify-center rounded-md bg-white px-1">
                          
                          <Image 
                            width={150}
                            height={150}
                            src={element.image2}
                            alt={element.name}
                            className="rounded-md cursor-pointer "
                          />
                        </div>
                        
                      </div>
                    ))}
                     
                  </div>
                  
            </div>
        </div>
    );
};

export default MobileLensSection;