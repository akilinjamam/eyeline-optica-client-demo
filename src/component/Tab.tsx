'use client'
import useSwipe from '@/custom-hooks/useSwipe';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useRef } from 'react';

export const elements = [
        { id: 1, name: 'EYEGLASSES', link: '/allglasses' },
        { id: 2, name: 'SUNGLASSES', link: '/allglasses/sunglasses' },
        { id: 3, name: 'LENSES', link: '/allLens' },
        { id: 4, name: 'CONTACT LENSES', link: '/allContactLens' },
        { id: 5, name: 'BRAND', link: '/allglasses/brand' },
        { id: 6, name: 'TELEMEDICINE SERVICE', link: '/telemedicine' },
        { id: 7, name: 'PATIENT CARE', link: '/blog' },
        { id: 8, name: 'ACCESSORIES', link:'/allAccessories' },
        { id: 9, name: 'ABOUT US', link:"/about" }
]

const Tab: FC = () => {
    const pathName = usePathname()
    const swipeRef = useRef(null);
    const { handleMouseDown, handleMouseLeave, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchStart, swipeRef: swippedRef } = useSwipe(swipeRef);
    

    return (
        <div className="bg-blue-50">
            <div style={{ userSelect: 'none' }} className="max-w-7xl px-1  py-4 mx-auto relative sm:px-4 md:px-6">
                <div
                    ref={swippedRef}
                    className="overflow-x-hidden cursor-grab"
                    onMouseDown={handleMouseDown}
                    onMouseLeave={handleMouseLeave}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                >
                    <div className="flex whitespace-nowrap gap-2">
                        {elements.map((element, index) => {
                            let isActive;
                            if(element.link === '/telemedicine'){
                                console.log(element.link.slice(0,13))
                                isActive = pathName.slice(0,13) === element.link
                                
                            }else{
                                isActive = pathName === element.link
                            }

                            return (
                                <Link href={`${element.link}`} key={index}>
                                    <button

                                        className={`px-4 py-2 lg:text-black md:text-black text-white bg-blue-800 md:bg-blue-50 lg:bg-blue-50  text-sm font-semibold lg:hover:bg-blue-200 md:hover:bg-blue-200 lg:rounded-lg md:rounded-lg rounded-full hover:bg-blue-900 transition cursor-pointer ${isActive ? 'lg:bg-blue-200 md:bg-blue-200' : ''}`}
                                    >
                                        {element.name}
                                    </button>
                                </Link>
                            )
                        })}
                    </div>
                </div>
               
            </div>
        </div>
    );
};

export default Tab;