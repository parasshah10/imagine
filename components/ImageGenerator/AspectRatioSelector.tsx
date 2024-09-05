'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'

export default function AspectRatioSelector({ value, onChange }) {
  return (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-40 flex-1">
        <p className="text-[#141414] dark:text-white text-base font-medium leading-normal pb-2">Aspect Ratio</p>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full bg-[#ededed] dark:bg-gray-900 border-none rounded-2xl h-14 px-4">
            <SelectValue placeholder="Choose aspect ratio" />
          </SelectTrigger>
          <SelectContent className="bg-[#ededed] dark:bg-gray-900 rounded-2xl">
            <SelectItem value="square">Square (1024x1024)</SelectItem>
            <SelectItem value="portrait">Portrait (832x1216)</SelectItem>
            <SelectItem value="landscape">Landscape (1216x832)</SelectItem>
          </SelectContent>
        </Select>
      </label>
    </div>
  );
}