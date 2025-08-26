import React from 'react';
import { TTelemedicineData } from '@/ts-definition/types';
import Image from 'next/image';
import DoctorTag from './DoctorTag';
import { ChevronRight, Star } from 'lucide-react';

const TelemedicineCart:React.FC<TTelemedicineData> = ({name, post, degree, exp, reviews, img}) => {

    return (
    <div className="relative bg-white shadow-md  rounded-md   h-auto ">
      <div className=" mb-3 lg:w-[350px] w-[250px] p-2">
            <div className='w-full lg:flex lg:items-start lg:justify-between '>
                <div className='lg:w-[40%] w-[100%] flex items-center justify-center'>
                    <Image className='w-[125px]'  src={img} alt='telemidicne-dr-image'/>
                </div>
                <div className='lg:w-[55%] w-[100%] lg:text-left text-center '>
                    <p className='text-sm font-bold'>{name}</p>
                    <p className='text-xs'>{degree}</p>
                    
                    <div title={post} className='mt-4 w-[100%] flex items-center justify-end'>
                        <DoctorTag text={post} />
                    </div>
                    <div className="flex items-center lg:justify-start justify-center gap-1 mt-2 text-blue-600">
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