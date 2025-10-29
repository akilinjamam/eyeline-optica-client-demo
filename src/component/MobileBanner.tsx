'use client'
import Image, { StaticImageData } from 'next/image';
import {FC, useRef} from 'react';
import imageOne from '../../public/images/mobileBanner/mobile-banner-3.png'
import imageTwo from '../../public/images/mobileBanner/mobile-banner-2.png'
import { useRouter } from 'next/navigation';
import useSwipe from '@/custom-hooks/useSwipe';

const MobileBanner:FC = () => {
    const router = useRouter();
    const swipeRef = useRef(null);

    const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)

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
            image: imageTwo,
            link: "/allglasses/not-added"
        },
        {
            id: 6,
            name: 'Progressive Lenses',
            image: imageOne,
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
            className="shrink-0 mb-4 bg-blue-800 w-[200px] h-[300px] shadow-sm"
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