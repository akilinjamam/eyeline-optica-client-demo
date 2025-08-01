"use client"
import useWeeklyDealTimer from '@/custom-hooks/useWeeklyDealTimer';
import React, { FC } from 'react';
import CountdownCircle from './CountdownCircle';

const DealsTimer:FC = () => {
    const {timeLeft} = useWeeklyDealTimer();
    const { days,hours, minutes, seconds} = timeLeft
    return (
    <div className="flex flex-col items-end text-sm">
      <span className="text-xs mb-2 text-white mx-auto">Hurry Up!! Offer ends in</span>
      <br className='lg:hidden'/>
      <div className="flex gap-6">
          <CountdownCircle value={days} max={7} label="days" />
          <CountdownCircle value={hours} max={24} label="hrs" />
          <CountdownCircle value={minutes} max={60} label="mins" />
          <CountdownCircle value={seconds} max={60} label="secs" />
        </div>
    </div>
  );
};

export default DealsTimer;