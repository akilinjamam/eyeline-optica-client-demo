'use client'
import useSwipe from '@/custom-hooks/useSwipe';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useRef } from 'react';

const Tab: FC = () => {
    const pathName = usePathname()
    const swipeRef = useRef(null);
    const { handleMouseDown, handleMouseLeave, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchStart, swipeRef: swippedRef } = useSwipe(swipeRef);
    const elements = [
        { id: 1, name: 'EYEGLASSES', link: '/allglasses' },
        { id: 2, name: 'SUNGLASSES', link: '/allglasses/sunglasses' },
        { id: 3, name: 'LENSES', link: '/allLens' },
        { id: 4, name: 'CONTACT LENSES', link: '/allContactLens' },
        { id: 5, name: 'BRAND', link: '/allglasses/brand' },
        { id: 6, name: 'TELEMEDICINE SERVICE', link: '/telemedicine' },
        { id: 7, name: 'PATIENT CARE' },
        { id: 8, name: 'ACCESSORIES', link:'/allAccessories' },
        { id: 9, name: 'ABOUT US' }
    ]



    return (
        <div className="bg-blue-50">
            <div style={{ userSelect: 'none' }} className="max-w-7xl px-6 py-4 mx-auto relative sm:px-4 md:px-6">
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
                    <div className="flex whitespace-nowrap gap-4">
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

                                        className={`px-4 py-2 text-sm font-semibold hover:bg-blue-200 rounded-md transition cursor-pointer ${isActive ? 'bg-blue-200' : ''}`}
                                    >
                                        {element.name}
                                    </button>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                {/* Gradient overlay for aesthetics */}
                <div className="pointer-events-none absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-blue-50 via-blue-50/90 to-transparent z-10" />
            </div>
        </div>
    );
};

export default Tab;