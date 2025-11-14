/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import useBrandScroller from '@/custom-hooks/useBrandScroller';
import Image from 'next/image';
import {useRef} from 'react';
import { IBanner } from '@/ts-definition/interfaces';
import { bannerAccordingToCategory } from '@/fetchData/bannerAccordingToCategory';

const HorizontalBrandScroll = ({bannerData}: {bannerData:IBanner[]}) => {

    const parentRef = useRef<HTMLElement>(null);

    const {parentRef: scrollRef, setPause} = useBrandScroller(parentRef);

    const brands = [
      {
        elements: bannerAccordingToCategory("Popular Brand Logo One", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Two", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Three", bannerData),
       
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Four", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Five", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Six", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Seven", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo  Eight", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Nine", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo One", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Two", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Three", bannerData),
       
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Four", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Five", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Six", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Seven", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo  Eight", bannerData),
      },
      {
        elements: bannerAccordingToCategory("Popular Brand Logo Nine", bannerData),
      }
    ];
   

    return (
        <div className='w-full lg:block md:block hidden'>
            <div
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
                className="lg:w-[1250px] md:w-[90%] sm:w-full overflow-y-hidden overflow-x-hidden mx-auto" ref={scrollRef}>
                <div className="w-[5000px] h-[200px] flex items-center justify-between">
                    {brands.map((item: any, index:number) => (
                        <Image width={200} height={200} src={item.elements} key={index} alt='User' className="w-[120px] h-auto m-[10px]" />
                    ))}
                    </div>
            </div>
        </div>
    );
};

export default HorizontalBrandScroll;