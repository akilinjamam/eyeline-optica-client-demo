/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import useBrandScroller from '@/custom-hooks/useBrandScroller';
import Image from 'next/image';
import {useRef} from 'react';

import { IBanner } from '@/ts-definition/interfaces';
import { bannerAccordingToCategory } from '@/fetchData/bannerAccordingToCategory';

const HorizontalMobileBrandScroll = ({bannerData}: {bannerData:IBanner[]}) => {

    const parentRef = useRef<HTMLElement>(null);

    const {parentRef: scrollRef, setPause} = useBrandScroller(parentRef);
    console.log(scrollRef)

    const brands = [
  {
    elements: bannerAccordingToCategory("Popular Brand Logo One", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass One", bannerData),
  },
  {
   elements: bannerAccordingToCategory("Popular Brand Logo Two", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Two", bannerData),
  },
  {
   elements: bannerAccordingToCategory("Popular Brand Logo Three", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Three", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo Four", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Four", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo Five", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Five", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo Six", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Six", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo Seven", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Seven", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo  Eight", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Eight", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo Nine", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Nine", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo One", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass One", bannerData),
  },
  {
   elements: bannerAccordingToCategory("Popular Brand Logo Two", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Two", bannerData),
  },
  {
   elements: bannerAccordingToCategory("Popular Brand Logo Three", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Three", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo Four", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Four", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo Five", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Five", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo Six", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Six", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo Seven", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Seven", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo  Eight", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Eight", bannerData),
  },
  {
    elements: bannerAccordingToCategory("Popular Brand Logo Nine", bannerData),
    elements2:  bannerAccordingToCategory("Popular Brand Glass Nine", bannerData),
  },

]

    return (
        <div className='w-full md:hidden lg:hidden block'>
            <div
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
                className="lg:w-[1250px] md:w-[90%] sm:w-full overflow-y-hidden overflow-x-hidden mx-auto " ref={scrollRef}>
                <div className="w-[4000px] h-[70px] flex items-center justify-between">
                    {brands.map((item: any, index:number) => (
                        <div  key={index} className='bg-white w-[200px] h-[50px] flex items-center justify-between rounded-full'>
                            <Image width={100} height={100} src={item.elements2}alt='User' className="w-[100px] h-auto " />
                            <Image width={100} height={100} src={item.elements}alt='User' className="w-[50px] h-auto m-[10px]" />
                        </div>
                    ))}
                    
                </div>
                <div className="w-[4000px] h-[70px] flex items-center justify-between">
                    {brands?.slice()?.reverse()?.map((item: any, index:number) => (
                        <div  key={index} className='bg-white w-[200px] h-[50px] flex items-center justify-between rounded-full'>
                            <Image width={100} height={100} src={item.elements2}alt='User' className="w-[100px] h-auto " />
                            <Image width={100} height={100} src={item.elements}alt='User' className="w-[50px] h-auto m-[10px]" />
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    );
};

export default HorizontalMobileBrandScroll;