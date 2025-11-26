/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image';
import {useRef} from 'react';
import { useRouter } from 'next/navigation';
import useSwipe from '@/custom-hooks/useSwipe';
import { IBanner } from '@/ts-definition/interfaces';
import { bannerAccordingToCategory } from '@/fetchData/bannerAccordingToCategory';

const MobileBanner = ({bannerData}:{bannerData: IBanner[]}) => {
    const router = useRouter();
    const swipeRef = useRef(null);

    const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)



    type Element = {
        id: number;
        name: string;
        image: any;
        link:string;
    };
    const elements:Element[] = [
        {
            id: 1,
            name: 'Eyeglasses',
            image: bannerAccordingToCategory("Mobile Tab Banner Eyeglasses", bannerData),
            link: "/allglasses"
        },
        {
            id: 2,
            name: 'Sunglasses',
            image: bannerAccordingToCategory("Mobile Tab Banner Sunglasses", bannerData),
            link: "/allglasses/sunglasses"
        },
        {
            id: 3,
            name: 'Special Glasses',
            image: bannerAccordingToCategory("Mobile Tab Banner Special Glasses",bannerData),
            link: "/allglasses/brand?type=special glasses"
        },
        {
            id: 4,
            name: 'Contact Lenses',
            image: bannerAccordingToCategory("Mobile Tab Banner Contact Lenses", bannerData),
            link: "/allContactLens"
        },
        {
            id: 5,
            name: 'Power Sunglasses', 
            image: bannerAccordingToCategory("Mobile Tab Banner Power Sunglasses", bannerData),
            link: "/allglasses/brand?type=power sunglasses"
        },
        {
            id: 6,
            name: 'Progressive Lenses',
            image: bannerAccordingToCategory("Mobile Tab Banner Progressive Lenses", bannerData),
            link: "/allLens/progressiveLens"
        },
    ]
    return  (
    <div className="w-full px-1 py-4 overflow-x-hidden relative md:hidden lg:hidden block">
      <div
        ref={swippedRef}
        style={{userSelect:'none'}}
        className="
          flex gap-2 overflow-x-hidden cursor-grab 
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
            style={{borderRadius: '50px'}}
            className="shrink-0 mb-4 bg-gradient-to-l from-[#2770FF] to-[#1A46BB] w-[200px] h-[300px] shadow-sm"
          >
            <div className="  flex items-center justify-center">
              <Image
                height={360}
                width={360}
                src={element.image}
                alt={element.name}
                style={{borderTopRightRadius: "50px", borderTopLeftRadius: "50px", borderBottomLeftRadius: "30px", borderBottomRightRadius:"30px"}}
                className=" cursor-pointer h-[260px]"
              />
            </div>
            <p className="text-sm font-semibold text-center text-white mt-1.5">
              {element.name}
            </p>
          </div>
        ))}
         
      </div>
      
    </div>
  );
};

export default MobileBanner;