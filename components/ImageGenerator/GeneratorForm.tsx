import { useState } from 'react';
import ModelSelector from './ModelSelector';
import PromptInput from './PromptInput';
import AspectRatioSelector from './AspectRatioSelector';
import ImageCountSlider from './ImageCountSlider';
import { Button } from '../ui/button';

interface Image {
  url: string;
}

interface Batch {
  id: number;
  prompt: string;
  width: number;
  height: number;
  model: string;
  images: Image[];
}

export default function GeneratorForm({ onGenerate }: { onGenerate: (batch: Batch) => void }) {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('runware:101@1'); // FLUX DEV as default
  const [aspectRatio, setAspectRatio] = useState('square');
  const [imageCount, setImageCount] = useState(1);

  const aspectRatios = {
    square: { width: 1024, height: 1024 },
    landscape: { width: 1216, height: 832 },
    portrait: { width: 832, height: 1216 }
  };

  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    try {
      const { width, height } = aspectRatios[aspectRatio];
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          width,
          height,
          model,
          number_results: imageCount,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to generate image');
      }

      onGenerate(data.batch);
    } catch (error) {
      console.error('Error generating image:', error);
      setError(error instanceof Error ? error.message : 'An unknown error occurred');
    }
  };

  return (
    <div className="layout-content-container flex flex-col w-full md:w-80">
      <ModelSelector value={model} onChange={setModel} />
      <PromptInput value={prompt} onChange={setPrompt} />
      <AspectRatioSelector value={aspectRatio} onChange={setAspectRatio} />
      <ImageCountSlider value={imageCount} onChange={setImageCount} />
      {error && (
        <div className="px-4 py-2 mb-3 text-red-500 bg-red-100 dark:bg-red-900 dark:text-red-100 rounded-md">
          {error}
        </div>
      )}
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
