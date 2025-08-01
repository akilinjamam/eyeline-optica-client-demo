'use client';
import { FC } from 'react';
import weeklyDeals from '../../public/images/WEEKLY DEALS.png';
import Image from 'next/image';
import DealsTimer from './DealsTimer';

const WeeklyDeals: FC = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(to right, #04030B, #0E113A, #355AC0)',
      }}
      className="w-full py-4 sm:py-6"
    >
      <div className="w-[95%] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <Image
          src={weeklyDeals}
          alt="weekly deals"
          width={300}
          height={60}
          className="w-[220px] sm:w-[300px] md:w-[366px] h-auto"
        />
        <div className="text-white">
          <DealsTimer />
        </div>
      </div>
    </div>
  );
};

export default WeeklyDeals;