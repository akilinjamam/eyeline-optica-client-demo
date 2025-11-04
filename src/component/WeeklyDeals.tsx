'use client';
import DealsTimer from './DealsTimer';
import { TWeeklyDeals } from '@/ts-definition/types';

const WeeklyDeals = ({dealsData}: {dealsData: TWeeklyDeals}) => {
  
  return (
    <div
      style={{
        background: 'linear-gradient(to right, #04030B, #0E113A, #355AC0)',
      }}
      className={`w-full py-4 sm:py-6 ${!dealsData?.active && 'hidden'}`}
    >
      <div className="w-[95%] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-5xl font-bold bg-gradient-to-b from-orange-700 to-yellow-500 bg-clip-text text-transparent">
          {dealsData.title}
      </h1>
        <div className="text-white">
          <DealsTimer dealsData={dealsData} />
        </div>
      </div>
    </div>
  );
};

export default WeeklyDeals;