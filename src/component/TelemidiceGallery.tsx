"use client"
import useWeeklyDealsScroller from "@/custom-hooks/useWeeklyDealsScroller";
import Image from "next/image";
import { useRef } from "react";
import arrowLeft from '../../public/images/arrow-left.png'
import arrowRight from '../../public/images/arrow-right.png'

import TelemedicineCart from "./TelemedicineCart";
import { telemedicineData } from "./telemedicineData";
import { IDoctor } from "@/ts-definition/interfaces";

const TelemidiceGallery = ({data}: {data:IDoctor[]}) => {
    console.log(data)
    const currentRef = useRef(null);
    const {handleNavigation, parentRef} = useWeeklyDealsScroller(currentRef, telemedicineData.length)
    return (
        <div className='flex items-center justify-around w-full mx-auto gap-5 relative '>
            <Image className='cursor-pointer inline-block mx-3' src={arrowLeft} alt='left-arrow' onClick={() => handleNavigation('right')}/>
            <div style={{userSelect:'none'}}  ref={parentRef} className='w-auto h-auto mx-auto flex items-center  gap-8  overflow-x-hidden scroll-smooth  px-2'>
               {
                    data?.map(({studies, specialities, totalExperience, name, images, _id }: IDoctor) => <TelemedicineCart degree={studies?.map((item) => item)?.join(',') as string} post={specialities?.map((item:string) => item)?.join(",") as string} name={name as string} exp={totalExperience as number}  img={images?.[0] as string} id={_id as string}  key={_id as string}/> )
                }
               {/* <div className="pointer-events-none absolute top-0 right-13 lg:right-16 h-full w-32 bg-gradient-to-l from-blue-50/100 to-blue-50/0 z-10" /> */}
            </div>
             <Image className='cursor-pointer inline-block mx-3' src={arrowRight} alt='right-arrow' onClick={() => handleNavigation('left')}/>
            
        </div> 
    );
};

export default TelemidiceGallery;