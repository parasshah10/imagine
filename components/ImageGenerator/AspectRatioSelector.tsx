'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'

export default function AspectRatioSelector() {
  return (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-40 flex-1">
        <p className="text-[#141414] dark:text-white text-base font-medium leading-normal pb-2">Aspect Ratio</p>
        <Select>
          <SelectTrigger className="w-full bg-[#ededed] dark:bg-gray-700 border-none rounded-2xl h-14 px-4">
            <SelectValue placeholder="Choose aspect ratio" />
          </SelectTrigger>
          <SelectContent className="bg-[#ededed] dark:bg-gray-700 rounded-2xl">
            <SelectItem value="1:1">1:1 Square</SelectItem>
            <SelectItem value="4:3">4:3 Standard</SelectItem>
            <SelectItem value="16:9">16:9 Widescreen</SelectItem>
          </SelectContent>
        </Select>
      </label>
    </div>
  );
}