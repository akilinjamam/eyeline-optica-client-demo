'use client';
import React from 'react';

type Props = {
  value: number;
  max: number;
  label: string;
};

const CountdownCircle = ({ value, max, label }: Props) => {
  const radius = 40;
  const stroke = 3;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const progress = ((max - value) / max) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#ddd"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke="#ff5000"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={progress}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
      </svg>
      <div className="text-white text-2xl font-bold -mt-14">{value.toString().padStart(2, '0')}</div>
      <div className="text-sm text-white mt-8">{label}</div>
    </div>
  );
};

export default CountdownCircle;
