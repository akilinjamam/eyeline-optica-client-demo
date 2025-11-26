"use client"
import { IDoctor, ISelectOtherOptionsForDoctor } from '@/ts-definition/interfaces';
import {  Hospital, Info } from 'lucide-react';
import { useState } from 'react';
import InfoDoctor from './InfoDoctor';
// import ReviewDoctor from './Review';
import ExperienceDoctor from './Experience';
import Slots, { ISlot } from './Slots';

const OtherInfo = ({getSingleDoctor, allSlotData}: {getSingleDoctor:IDoctor, allSlotData:ISlot[]}) => {
    const [selectOption, setSelectOption] = useState(0)
    const selectOtherOptionsForDoctor: ISelectOtherOptionsForDoctor[] = [
        {
            title: 'Info',
            icon: <Info />
        },
        {
            title: 'Experience',
            icon: <Hospital/>
        },
        // {
        //     title: 'Reviews',
        //     icon: <DraftingCompass/>
        // },
    ]
    return (
        <div className='w-[80%] mx-auto bg-white text-black'>
            <br />
            <div className='flex gap-3 mb-2'>
                {
                    selectOtherOptionsForDoctor.map((item:ISelectOtherOptionsForDoctor, index:number) => {
                        return (
                            <div onClick={() => setSelectOption(index)} key={index} className={`flex ${(selectOption === index) ? 'text-blue-400' : 'text-gray-800'} cursor-pointer`}>
                                <p  className='mr-2 '>{item.icon}</p>
                                <p  className='mr-2 '>{item.title}</p>
                            </div>
                        )
                    } )
                }
            </div>
            <hr style={{color: 'lightblue'}} />
            <br />
            <div className='grid grid-cols-1 lg:grid-cols-2'>
                <div>
                    {selectOption === 0 && <InfoDoctor getSingleDoctor={getSingleDoctor}/> }
                    {selectOption === 1 && <ExperienceDoctor  getSingleDoctor={getSingleDoctor}/> }
                    {/* {selectOption === 2 && <ReviewDoctor/> } */}
                </div>
                <div className='px-6'>
                    <div className='w-full'>
                        <p className='text-xl text-blue-400 font-bold'>Book Your Slot</p>
                        <br />
                        <div className='w-[100%] h-auto bg-blue-100 rounded-md'>
                            <Slots doctorId={getSingleDoctor?._id as string} allSlotData={allSlotData}/>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        </div>
    );
};

export default OtherInfo;