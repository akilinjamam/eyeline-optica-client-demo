import { IDoctor } from '@/ts-definition/interfaces';
import React from 'react';

const ExperienceDoctor = ({ getSingleDoctor}: {getSingleDoctor:IDoctor}) => {
    return (
        <div>
            <p>{getSingleDoctor?.experienceDetail}</p>
        </div>
    );
};

export default ExperienceDoctor;