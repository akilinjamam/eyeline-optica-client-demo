"use client"

import React, { useRef } from 'react';
import Title from './Title';
import imageOne from '../../public/images/designed-sunglasses-1.png'
import imageTwo from '../../public/images/designed-sunglasses-2.png'
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';
import useSwipe from '@/custom-hooks/useSwipe';

 type Element = {
        id: number;
        name: string;
        image: StaticImageData;
        link:string;
    };
    const elements:Element[] = [
        {
            id: 1,
            name: 'Eyeglasses',
            image: imageOne,
            link: "/allglasses"
        },
        {
            id: 2,
            name: 'Sunglasses',
            image: imageTwo,
            link: "/allglasses/sunglasses"
        },
        {
            id: 3,
            name: 'Special Glasses',
            image: imageOne,
            link: "/allglasses/not-added"
        },
        {
            id: 4,
            name: 'Contact Lenses',
            image: imageTwo,
            link: "/allContactLens"
        },
        {
            id: 5,
            name: 'Power Sunglasses', 
            image: imageOne,
            link: "/allglasses/not-added"
        },
        {
            id: 6,
            name: 'Progressive Lenses',
            image: imageTwo,
            link: "/allLens/progressiveLens"
        },
    ]

const DesignedSunglasses = () => {

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

export default DesignedSunglasses;