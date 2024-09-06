'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'

export default function ModelSelector({ value, onChange }) {
  return (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-40 flex-1">
        <p className="text-[#141414] dark:text-white text-base font-medium leading-normal pb-2">Model</p>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger className="w-full bg-[#ededed] dark:bg-gray-900 border-none rounded-2xl h-14 px-4">
            <SelectValue placeholder="Choose model" />
          </SelectTrigger>
          <SelectContent className="bg-[#ededed] dark:bg-gray-900 rounded-2xl">
            <SelectItem value="runware:100@1">FLUX SCHNELL</SelectItem>
            <SelectItem value="runware:101@1">FLUX DEV</SelectItem>
          </SelectContent>
        </Select>
      </label>
    </div>
  )
}
