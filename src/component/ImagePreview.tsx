'use client'
import Image, { StaticImageData } from 'next/image';
import {FC, useRef} from 'react';
import imageOne from '../../public/images/glass-1.png';
import imageTwo from '../../public/images/glass-2.png';
import imageThree from '../../public/images/glass-3.png';
import imageFour from '../../public/images/glass-4.png';
import imageFive from '../../public/images/glass-5.png';
import imageSix from '../../public/images/glass-6.png';
import useSwipe from '@/custom-hooks/useSwipe';

const ImagePreview:FC = () => {

    const swipeRef = useRef(null);

    const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)

    type Element = {
        id: number;
        name: string;
        image: StaticImageData;
    };
    const elements:Element[] = [
        {
            id: 1,
            name: 'Eyeglasses',
            image: imageOne
        },
        {
            id: 2,
            name: 'Sunglasses',
            image: imageTwo
        },
        {
            id: 3,
            name: 'Special Glasses',
            image: imageThree
        },
        {
            id: 4,
            name: 'Contact Lenses',
            image: imageFour
        },
        {
            id: 5,
            name: 'Power Sunglasses', 
            image: imageFive
        },
        {
            id: 6,
            name: 'Progressive Lenses',
            image: imageSix
        },
        {
            id: 7,
            name: 'Progressive Lenses',
            image: imageSix
        },
        
        
    ]
    return  (
    <div className="w-full px-4 py-4 overflow-x-hidden">
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
            key={element.id}
            className="shrink-0 mb-4 bg-white w-[180px] h-[150px] p-2 rounded-md shadow-sm"
          >
            <div className="bg-blue-100 h-[110px] flex items-center justify-center rounded">
              <Image
                height={100}
                width={100}
                src={element.image}
                alt={element.name}
                className="rounded-md"
              />
            </div>
            <p className="text-sm font-semibold text-center text-blue-400 mt-1.5">
              {element.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;