import ModelSelector from './ModelSelector';
import PromptInput from './PromptInput';
import AspectRatioSelector from './AspectRatioSelector';
import ImageCountSlider from './ImageCountSlider';
import { Button } from '../ui/button';

export default function GeneratorForm() {
  return (
    <div className="layout-content-container flex flex-col w-full md:w-80">
      <h2 className="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Create</h2>
      <ModelSelector />
      <PromptInput />
      <AspectRatioSelector />
      <ImageCountSlider />
      <div className="flex px-4 py-3">
        <Button 
          variant="outline" 
          className="w-full justify-center gap-2 bg-white text-[#141414] font-bold"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
            <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path>
          </svg>
          Dream (0.91)
        </Button>
      </div>
    </div>
  );
}
