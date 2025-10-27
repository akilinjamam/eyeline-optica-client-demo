"use client"
import useBrandScroller from '@/custom-hooks/useBrandScroller';
import Image from 'next/image';
import {FC, useRef} from 'react';
import { brands } from './brandElements';
import { Brand } from '@/ts-definition/interfaces';

const HorizontalMobileBrandScroll:FC = () => {

    const parentRef = useRef<HTMLElement>(null);

    const {parentRef: scrollRef, setPause} = useBrandScroller(parentRef);
    console.log(scrollRef)

    return (
        <div className='w-full md:hidden lg:hidden block'>
            <div
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
                className="lg:w-[1250px] md:w-[90%] sm:w-full overflow-y-hidden overflow-x-hidden mx-auto " ref={scrollRef}>
                <div className="w-[4000px] h-[70px] flex items-center justify-between">
                    {brands.map((item: Brand, index:number) => (
                        <div  key={index} className='bg-white w-[200px] h-[50px] flex items-center justify-between rounded-full'>
                            <Image src={item.elements2}alt='User' className="w-[100px] h-auto " />
                            <Image src={item.elements}alt='User' className="w-[50px] h-auto m-[10px]" />
                        </div>
                    ))}
                    
                </div>
                <div className="w-[4000px] h-[70px] flex items-center justify-between">
                    {brands?.slice()?.reverse()?.map((item: Brand, index:number) => (
                        <div  key={index} className='bg-white w-[200px] h-[50px] flex items-center justify-between rounded-full'>
                            <Image src={item.elements2}alt='User' className="w-[100px] h-auto " />
                            <Image src={item.elements}alt='User' className="w-[50px] h-auto m-[10px]" />
                        </div>
                    ))}
                    
                </div>
            </div>
        </div>
    );
};

export default HorizontalMobileBrandScroll;