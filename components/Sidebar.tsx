export default function Sidebar() {
  return (
    <div className="layout-content-container flex flex-col w-80">
      <h2 className="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Create</h2>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#141414] text-base font-medium leading-normal pb-2">Model</p>
          <select className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border-none bg-[#ededed] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-neutral-500 p-4 text-base font-normal leading-normal">
            <option value="one">Choose model</option>
            <option value="two">two</option>
            <option value="three">three</option>
          </select>
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#141414] text-base font-medium leading-normal pb-2">Prompt</p>
          <textarea
            placeholder="Type your prompt here"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border-none bg-[#ededed] focus:border-none min-h-36 placeholder:text-neutral-500 p-4 text-base font-normal leading-normal"
          ></textarea>
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-[#141414] text-base font-medium leading-normal pb-2">Aspect Ratio</p>
          <select className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#141414] focus:outline-0 focus:ring-0 border-none bg-[#ededed] focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-neutral-500 p-4 text-base font-normal leading-normal">
            <option value="one">Choose aspect ratio</option>
            <option value="two">two</option>
            <option value="three">three</option>
          </select>
        </label>
      </div>
      <div className="@container">
        <div className="relative flex w-full flex-col items-start justify-between gap-3 p-4 @[480px]:flex-row @[480px]:items-center">
          <div className="flex w-full shrink-[3] items-center justify-between">
            <p className="text-[#141414] text-base font-medium leading-normal">Image Count</p>
            <p className="text-[#141414] text-sm font-normal leading-normal @[480px]:hidden">3</p>
          </div>
          <div className="flex h-4 w-full items-center gap-4">
            <div className="flex h-1 flex-1 rounded-sm bg-[#dbdbdb]">
              <div className="h-full w-[32%] rounded-sm bg-white"></div>
              <div className="relative"><div className="absolute -left-2 -top-1.5 size-4 rounded-full bg-white"></div></div>
            </div>
            <p className="text-[#141414] text-sm font-normal leading-normal hidden @[480px]:block">3</p>
          </div>
        </div>
      </div>
      <div className="flex px-4 py-3">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-white text-[#141414] gap-2 pl-4 text-sm font-bold leading-normal tracking-[0.015em]">
          <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
            <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path>
          </svg>
          <span className="truncate">Dream (0.91)</span>
        </button>
      </div>
    </div>
  );
}