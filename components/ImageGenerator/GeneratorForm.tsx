import { useState } from 'react';
import ModelSelector from './ModelSelector';
import PromptInput from './PromptInput';
import AspectRatioSelector from './AspectRatioSelector';
import ImageCountSlider from './ImageCountSlider';
import { Button } from '../ui/button';

interface Image {
  url: string;
}

export default function GeneratorForm({ onGenerate }: { onGenerate: (images: Image[]) => void }) {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('runware:101@1');
  const [aspectRatio, setAspectRatio] = useState('square');
  const [imageCount, setImageCount] = useState(1);

  const handleGenerate = async () => {
    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          aspect_ratio: aspectRatio,
          number_results: imageCount,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      onGenerate(data.images);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="layout-content-container flex flex-col w-full md:w-80">
      <h2 className="text-[#141414] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Create</h2>
      <ModelSelector value={model} onChange={setModel} />
      <PromptInput value={prompt} onChange={setPrompt} />
      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
      <ImageCountSlider value={imageCount} onChange={setImageCount} />
      <div className="flex px-4 py-3">
        <Button 
          variant="outline" 
          className="w-full justify-center gap-2 bg-white dark:bg-gray-800 text-[#141414] dark:text-white font-bold"
          onClick={handleGenerate}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
            <path d="M233.54,142.23a8,8,0,0,0-8-2,88.08,88.08,0,0,1-109.8-109.8,8,8,0,0,0-10-10,104.84,104.84,0,0,0-52.91,37A104,104,0,0,0,136,224a103.09,103.09,0,0,0,62.52-20.88,104.84,104.84,0,0,0,37-52.91A8,8,0,0,0,233.54,142.23ZM188.9,190.34A88,88,0,0,1,65.66,67.11a89,89,0,0,1,31.4-26A106,106,0,0,0,96,56,104.11,104.11,0,0,0,200,160a106,106,0,0,0,14.92-1.06A89,89,0,0,1,188.9,190.34Z"></path>
          </svg>
          Dream ({model})
        </Button>
      </div>
    </div>
  );
}
