import React from 'react';
import { TTelemedicineData } from '@/ts-definition/types';
import Image from 'next/image';
import DoctorTag from './DoctorTag';
import { ChevronRight, Star } from 'lucide-react';

const TelemedicineCart:React.FC<TTelemedicineData> = ({name, post, degree, exp, reviews, img}) => {

    return (
    <div className="relative bg-white shadow-md  rounded-md w-[350px] h-[233px] ">
      <div className=" mb-3 w-[350px]  p-2">
            <div className='w-full flex items-start justify-between '>
                <div className='w-[40%]'>
                    <Image className='w-[125px]'  src={img} alt='telemidicne-dr-image'/>
                </div>
                <div className='w-[55%]'>
                    <p className='text-sm font-bold'>{name}</p>
                    <p className='text-xs'>{degree}</p>
                    
                    <div title={post} className='mt-4'>
                        <DoctorTag text={post} />
                    </div>
                    <div className="flex items-center gap-1 mt-2 text-blue-600">
                        <span className="text-sm text-gray-700">({reviews})</span>
                        {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={i < reviews ? "fill-blue-500 text-blue-500" : "text-gray-300"}
                        />
                        ))}
                    </div>
                </div>
                
            </div>
            <hr className='mt-3 text-gray-200' />
            <p className='font-semibold'>{exp}+ years</p>
            <div className='flex items-center justify-between text-sm'>
                <p className='text-blue-300'>Experience</p>
                <div className='w-[93px] flex items-center justify-between text-blue-500 font-semibold '><p>See Doctors</p> <ChevronRight width={15}/></div>
            </div>
      </div>
    </div>
  );
};

export default TelemedicineCart;