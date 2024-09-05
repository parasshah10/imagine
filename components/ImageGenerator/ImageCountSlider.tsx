export default function ImageCountSlider() {
  return (
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
  );
}