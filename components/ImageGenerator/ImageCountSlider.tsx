'use client'

import React from 'react';
import { Slider } from '../ui/slider';

export default function ImageCountSlider({ value, onChange }) {
  return (
    <div className="flex flex-col px-4 py-3">
      <div className="flex justify-between items-center mb-2">
        <p className="text-[#141414] dark:text-white text-base font-medium leading-normal">Image Count</p>
        <p className="text-[#141414] dark:text-white text-sm font-normal leading-normal">{value}</p>
      </div>
      <Slider
        min={1}
        max={4}
        step={1}
        value={[value]}
        onValueChange={(newValue) => onChange(newValue[0])}
        className="w-full"
        formatLabel={(value) => `${value}`}
      />
    </div>
  );
}