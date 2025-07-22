"use client"
import useWeeklyDealTimer from '@/custom-hooks/useWeeklyDealTimer';
import React, { FC } from 'react';

const DealsTimer:FC = () => {
    const {timeLeft} = useWeeklyDealTimer();
    
    return (
         <div className="flex flex-col items-end text-sm">
        <span className="text-xs mb-2">Hurry Up!! Offer ends in</span>
        <div className="flex gap-4">
          {[
            { value: timeLeft.hours, label: 'hrs' },
            { value: timeLeft.minutes, label: 'mins' },
            { value: timeLeft.seconds, label: 'secs' },
          ].map((item, i) => (
            <div
              key={i}
              className="w-16 h-16 flex flex-col items-center justify-center rounded-full border-2 border-white relative"
            >
              {/* Top orange ring */}
              <div className="absolute inset-0 rounded-full border-t-2 border-orange-500" />
              <div className="z-10 text-lg font-semibold">
                {String(item.value).padStart(2, '0')}
              </div>
              <div className="z-10 text-[10px] mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
};

export default DealsTimer;