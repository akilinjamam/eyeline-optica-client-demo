"use client"
import { TContactLenseData, TFrame } from '@/ts-definition/types';
import womensImg from '../../public/images/women-glass-banner.png';
import Image from 'next/image';
import arrowLeft from '../../public/images/arrow-left.png'
import arrowRight from '../../public/images/arrow-right.png'
import Title from './Title';
import GlassCard from './GlassCard';
import { useRef } from 'react';
import useWeeklyDealsScroller from '@/custom-hooks/useWeeklyDealsScroller';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import useSwipe from '@/custom-hooks/useSwipe';

const WomenSunglass = ({data}: {data:TFrame[]}) => {

    const router = useRouter();

    const currentRef = useRef(null);
        const {handleNavigation, parentRef} = useWeeklyDealsScroller(currentRef)

    const contactLense:TContactLenseData ={
        lense: womensImg
    }

     const swipeRef = useRef(null);
    
        const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)

    return (
        <div className='mt-8'>
            <Title value='WOMENS SUNGLASSES'/>
            <div className='w-full mt-8'>
                <Image className='mx-auto' src={contactLense.lense} alt='contact-lense'/>
            </div>
            <div className='w-full'>
                <br />
                <div className='w-[90%] sm:w-[75%] md:w-[85%] lg:w-[1200px] mx-auto flex items-center justify-end'>
                    <div className=' w-[130px] mt-2 px-2 py-2 text-white  font-semibold rounded bg-gradient-to-r from-[#259AFF] to-[#1D4DFF] hover:opacity-90 transition cursor-pointer flex  items-center justify-between'>
                        <button onClick={() => router.push('/allglasses/womensGlasses')} >Shop Now </button>
                        <ArrowRight/>
                    </div>
                </div>
                <div className='hidden md:block lg:block'>
                        <div className='flex items-center justify-around lg:w-[1200px] md:w-[90%] sm:w-[85%] mx-auto gap-5 relative'>
                            <Image className='cursor-pointer inline-block mx-3' src={arrowLeft} alt='left-arrow' onClick={() => handleNavigation('right')}/>
                            <div ref={parentRef} className='w-[2600px] h-[300px] mx-auto flex items-center  gap-6 mt-2 overflow-x-hidden scroll-smooth  px-2'>
                            {
                                data?.slice(0,13)?.map(({color, name, brand, salesPrice, badge, images, _id }: TFrame, index: number) => <GlassCard color={color} images={images} badge={badge} salesPrice={salesPrice} name={name} brand={brand} key={index} _id={_id}/> )
                            }
                            </div>
                                <Image className='cursor-pointer inline-block mx-3' src={arrowRight} alt='right-arrow' onClick={() => handleNavigation('left')}/>
                                    <div className="pointer-events-none absolute top-0 right-13 lg:right-16 h-full w-32 bg-gradient-to-l from-blue-50/100 to-blue-50/0 z-10" />
                            </div>
                </div>
                <div className='lg:hidden md:hidden block'>
                    <div className='flex items-center justify-around lg:w-[1200px] md:w-[90%] sm:w-[85%] mx-auto gap-5 relative'>
                                                
                        <div 
                            ref={swippedRef} 
                            className='w-[2600px] h-[300px] mx-auto flex items-center  gap-6 mt-2 overflow-x-hidden scroll-smooth  px-2'
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                        >
                        {
                            data?.slice(0,13)?.map(({color, name, brand, salesPrice, badge, images, _id }: TFrame, index: number) => <GlassCard color={color} images={images} badge={badge} salesPrice={salesPrice} name={name} brand={brand} key={index} _id={_id}/> )
                        }
                        </div>
                                                
                        </div>
                </div>
            </div>
        </div>
    );
};

export default WomenSunglass;