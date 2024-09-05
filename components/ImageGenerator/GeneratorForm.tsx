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
      onGenerate(data.batch);
    } catch (error) {
      console.error('Error generating image:', error);
    }
  };

  return (
    <div className="layout-content-container flex flex-col w-full md:w-80">
      <ModelSelector value={model} onChange={setModel} />
      <PromptInput value={prompt} onChange={setPrompt} />
      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
      <ImageCountSlider value={imageCount} onChange={setImageCount} />
      <div className="flex px-4 py-3">
        <Button 
          variant="outline" 
          className="w-full justify-center bg-white dark:bg-gray-800 text-[#141414] dark:text-white font-bold"
          onClick={handleGenerate}
        >
          Generate
        </Button>
      </div>
    </div>
  );
}
