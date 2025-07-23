"use client"
import {FC} from 'react';
import weeklyDeals from '../../public/images/WEEKLY DEALS.png'
import Image from 'next/image';
import DealsTimer from './DealsTimer';

const WeeklyDeals:FC = () => {
    return (
        <div style={{
        background: 'linear-gradient(to right, #04030B, #0E113A, #355AC0)',
      }} className='h-[150px] w-full '>
           <div className='w-[95%] mx-auto h-full flex items-center justify-between'>
                 <Image width={366} height={68} src={weeklyDeals} alt='weekly deals'/>
                 <div>
                    <DealsTimer/>
                 </div>
           </div>
        </div>
    );
};

export default WeeklyDeals;