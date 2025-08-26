"use client"
import useWeeklyDealsScroller from "@/custom-hooks/useWeeklyDealsScroller";
import Image from "next/image";
import { useRef } from "react";
import arrowLeft from '../../public/images/arrow-left.png'
import arrowRight from '../../public/images/arrow-right.png'

import TelemedicineCart from "./TelemedicineCart";
import { telemedicineData } from "./telemedicineData";
import { TTelemedicineData } from "@/ts-definition/types";

const TelemidiceGallery = () => {
     const currentRef = useRef(null);
    const {handleNavigation, parentRef} = useWeeklyDealsScroller(currentRef, telemedicineData.length)
    return (
        <div className='flex items-center justify-around w-full mx-auto gap-5 relative '>
            <Image className='cursor-pointer inline-block mx-3' src={arrowLeft} alt='left-arrow' onClick={() => handleNavigation('right')}/>
            <div style={{userSelect:'none'}}  ref={parentRef} className='w-auto h-auto mx-auto flex items-center  gap-6  overflow-x-hidden scroll-smooth  px-2'>
               {
                    telemedicineData?.map(({degree, post, exp, name, reviews, img }: TTelemedicineData, index: number) => <TelemedicineCart degree={degree} post={post} name={name} exp={exp} reviews={reviews} img={img}   key={index}/> )
                }
               {/* <div className="pointer-events-none absolute top-0 right-13 lg:right-16 h-full w-32 bg-gradient-to-l from-blue-50/100 to-blue-50/0 z-10" /> */}
            </div>
             <Image className='cursor-pointer inline-block mx-3' src={arrowRight} alt='right-arrow' onClick={() => handleNavigation('left')}/>
            
        </div>
    );
};

export default TelemidiceGallery;