'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/Select'

export default function ModelSelector() {
  return (
    <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
      <label className="flex flex-col min-w-40 flex-1">
        <p className="text-[#141414] dark:text-white text-base font-medium leading-normal pb-2">Model</p>
        <Select>
          <SelectTrigger className="w-full bg-[#ededed] dark:bg-gray-700 border-none rounded-2xl h-14 px-4">
            <SelectValue placeholder="Choose model" />
          </SelectTrigger>
          <SelectContent className="bg-[#ededed] dark:bg-gray-700 rounded-2xl">
            <SelectItem value="one">Model One</SelectItem>
            <SelectItem value="two">Model Two</SelectItem>
            <SelectItem value="three">Model Three</SelectItem>
          </SelectContent>
        </Select>
      </label>
    </div>
  )
}