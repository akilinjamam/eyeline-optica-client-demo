/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import Image from 'next/image';
import { useRef} from 'react';
import useSwipe from '@/custom-hooks/useSwipe';
import { useRouter } from 'next/navigation';
import { IBanner } from '@/ts-definition/interfaces';
import { bannerAccordingToCategory } from '@/fetchData/bannerAccordingToCategory';

const ImagePreview = ({bannerData}: {bannerData:IBanner[]}) => {
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
            image: bannerAccordingToCategory("Desktop Tab Banner Eyeglasses",bannerData),
            link: "/allglasses"
        },
        {
            id: 2,
            name: 'Sunglasses',
            image: bannerAccordingToCategory("Desktop Tab Banner Sunglasses",bannerData),
            link: "/allglasses/sunglasses"
        },
        {
            id: 3,
            name: 'Special Glasses',
            image: bannerAccordingToCategory("Desktop Tab Banner Special Glasses",bannerData),
            link: "/allglasses/not-added"
        },
        {
            id: 4,
            name: 'Contact Lenses',
            image: bannerAccordingToCategory("Desktop Tab Banner Contact Lenses",bannerData),
            link: "/allContactLens"
        },
        {
            id: 5,
            name: 'Power Sunglasses', 
            image: bannerAccordingToCategory("Desktop Tab Banner Power Sunglasses",bannerData),
            link: "/allglasses/not-added"
        },
        {
            id: 6,
            name: 'Progressive Lenses',
            image: bannerAccordingToCategory("Desktop Tab Banner Progressive Lenses",bannerData),
            link: "/allLens/progressiveLens"
        },
    ]
    return  (
    <div className="w-full px-4 py-4 overflow-x-hidden relative md:block lg:block hidden">
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
            className="shrink-0 mb-4 bg-white w-[180px] h-[150px] p-2 rounded-md shadow-sm"
          >
            <div className="bg-blue-100 h-[110px] flex items-center justify-center rounded">
              <Image
                height={100}
                width={100}
                src={element.image}
                alt={element.name}
                className="rounded-md cursor-pointer"
              />
            </div>
            <p className="text-sm font-semibold text-center text-blue-400 mt-1.5">
              {element.name}
            </p>
          </div>
        ))}
         
      </div>
      <div className="lg:hidden pointer-events-none absolute -top-4 right-0 h-full w-16 bg-gradient-to-l from-blue-50 via-blue-50/90 to-transparent z-10" />
    </div>
  );
};

export default ImagePreview;