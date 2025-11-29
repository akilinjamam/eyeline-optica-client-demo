"use client"
import {  TFrame } from '@/ts-definition/types';
// import womensImg from '../../public/images/women-glass-banner.png';
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
import { IBanner } from '@/ts-definition/interfaces';
import { bannerAccordingToCategory } from '@/fetchData/bannerAccordingToCategory';

const WomenSunglass = ({data,bannerData}: {data:TFrame[], bannerData:IBanner[]}) => {

    const router = useRouter();

    const currentRef = useRef(null);
        const {handleNavigation, parentRef} = useWeeklyDealsScroller(currentRef)

    // const contactLense:TContactLenseData ={
    //     lense: womensImg
    // }

     const swipeRef = useRef(null);
    
        const {swipeRef:swippedRef, handleMouseDown, handleMouseMove, handleMouseLeave, handleMouseUp, handleTouchMove, handleTouchStart} = useSwipe(swipeRef)

    return (
        <div className='mt-8 hidden md:block lg:block'>
            <Title value='WOMENS SUNGLASSES'/>
            <div className='w-full mt-8 md:block lg:block hidden'>
                <Image className='mx-auto' width={1400} height={1400} src={bannerAccordingToCategory("Desktop Womens Sunglasses", bannerData) as string} alt='contact-lense'/>
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
                                data?.slice(0,13)?.map(({color, name, brand, salesPrice, badge, images, _id, otherImages }: TFrame, index: number) => <GlassCard color={color} images={images} badge={badge} salesPrice={salesPrice} name={name} brand={brand} key={index} _id={_id} otherImages={otherImages} /> )
                            }
                            </div>
                                <Image className='cursor-pointer inline-block mx-3' src={arrowRight} alt='right-arrow' onClick={() => handleNavigation('left')}/>
                                    
                            </div>
                </div>
                <div className='lg:hidden md:hidden block'>
                    <div className="w-full px-4 py-4 overflow-x-hidden relative">
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
                        {
                            data?.map(({color, name, brand, salesPrice, badge, images,_id, otherImages }: TFrame, index: number) => <GlassCard color={color} images={images} badge={badge} salesPrice={salesPrice} name={name} brand={brand} key={index} _id={_id} otherImages={otherImages} /> )
                        }
                         
                      </div>
                      {/* <div className="lg:hidden pointer-events-none absolute -top-4 right-0 h-full w-16 bg-gradient-to-l from-blue-50 via-blue-50/90 to-transparent z-10" /> */}
                </div>
                </div>
            </div>
        </div>
    );
};

export default WomenSunglass;