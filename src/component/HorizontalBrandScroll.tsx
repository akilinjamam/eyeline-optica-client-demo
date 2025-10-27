"use client"
import useBrandScroller from '@/custom-hooks/useBrandScroller';
import Image from 'next/image';
import {FC, useRef} from 'react';
import { brands } from './brandElements';
import { Brand } from '@/ts-definition/interfaces';

const HorizontalBrandScroll:FC = () => {

    const parentRef = useRef<HTMLElement>(null);

    const {parentRef: scrollRef, setPause} = useBrandScroller(parentRef);
    console.log(scrollRef)

    return (
        <div className='w-full lg:block md:block hidden'>
            <div
                onMouseEnter={() => setPause(true)}
                onMouseLeave={() => setPause(false)}
                className="lg:w-[1250px] md:w-[90%] sm:w-full overflow-y-hidden overflow-x-hidden mx-auto" ref={scrollRef}>
                <div className="w-[5000px] h-[200px] flex items-center justify-between">
                    {brands.map((item: Brand, index:number) => (
                        <Image src={item.elements} key={index} alt='User' className="w-[120px] h-auto m-[10px]" />
                    ))}
                    </div>
            </div>
        </div>
    );
};

export default HorizontalBrandScroll;