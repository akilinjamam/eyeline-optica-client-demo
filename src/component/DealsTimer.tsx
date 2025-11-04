"use client"
import React from 'react';
import CountdownCircle from './CountdownCircle';
import { TWeeklyDeals } from '@/ts-definition/types';
import useWeeklyDealTimerNew from '@/custom-hooks/useWeeklyDealsTimerNew';

const DealsTimer = ({dealsData}: {dealsData:TWeeklyDeals}) => {

  const startDate = new Date(dealsData.startDate);
  const endDate = new Date(dealsData.endDate);

  // Difference in milliseconds
  const diffMs = endDate.getTime() - startDate.getTime();

  // Convert milliseconds to days
  const totalDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));


    const {timeLeft} = useWeeklyDealTimerNew({startDate:dealsData?.startDate, endDate:dealsData?.endDate});
    const { days,hours, minutes, seconds} = timeLeft
    return (
    <div className="flex flex-col items-end text-sm">
      <span className="text-xs mb-2 text-white mx-auto">Hurry Up!! Offer ends in</span>
      <br className='lg:hidden'/>
      <div className="flex gap-6">
          <CountdownCircle value={days} max={totalDays} label="days" />
          <CountdownCircle value={hours} max={24} label="hrs" />
          <CountdownCircle value={minutes} max={60} label="mins" />
          <CountdownCircle value={seconds} max={60} label="secs" />
        </div>
    </div>
  );
};

export default DealsTimer;