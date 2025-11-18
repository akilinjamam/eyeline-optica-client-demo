import { IDoctor } from '@/ts-definition/interfaces';
import React from 'react';

const InfoDoctor = ({getSingleDoctor}: {getSingleDoctor:IDoctor}) => {
    return (
        <div className='w-full'>
            <p className='text-blue-500 font-bold text-xl'>About Doctor</p>
            <br />
            <p dangerouslySetInnerHTML={{__html:getSingleDoctor?.description as string}}></p>
        </div>
    );
};

export default InfoDoctor;