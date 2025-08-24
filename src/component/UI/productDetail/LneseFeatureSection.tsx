"use client"
import { ILense, ILenseFeatures } from '@/ts-definition/interfaces';
import { X } from 'lucide-react';
import React from 'react';

const LneseFeatureSection = ({selectedLense, setSelectedLense}: {selectedLense: ILense, setSelectedLense: (payload: ILense | null) => void}) => {
    return (
        <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">{selectedLense.title}</h2>
              <button className='cursor-pointer' onClick={() => {
                setSelectedLense(null)
              }}>
                <X/>
              </button>
            </div>
            {selectedLense.features.map((feature: ILenseFeatures, idx: number) => (
              <p key={idx} className="text-sm mb-2">
                - {feature.feature}
              </p>
            ))}
            <p className="font-bold text-orange-600 mt-4">৳{selectedLense.price}</p>
        </div>
    );
};

export default LneseFeatureSection;