import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ModelSelector from './ModelSelector';
import PromptInput from './PromptInput';
import AspectRatioSelector from './AspectRatioSelector';
import ImageCountSlider from './ImageCountSlider';
import { Button } from '../ui/button';
import { ThemeToggle } from '../ThemeToggle';

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

export default function GeneratorForm({ onGenerate, remixBatch }: { onGenerate: (batch: Batch) => void, remixBatch: Batch | null }) {
  const [prompt, setPrompt] = useState('');
  const [model, setModel] = useState('runware:101@1'); // FLUX DEV as default
  const [aspectRatio, setAspectRatio] = useState('square');

  useEffect(() => {
    if (remixBatch) {
      setPrompt(remixBatch.prompt);
      setModel(remixBatch.model);
      setAspectRatio(getAspectRatioFromDimensions(remixBatch.width, remixBatch.height));
      setImageCount(remixBatch.images.length);
    }
  }, [remixBatch]);

  const getAspectRatioFromDimensions = (width: number, height: number) => {
    if (width === height) return 'square';
    if (width === 832 && height === 1216) return 'portrait';
    if (width === 1216 && height === 832) return 'landscape';
    return 'square'; // Default to square if dimensions don't match known ratios
  };
  const [imageCount, setImageCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const aspectRatios = {
    square: { width: 1024, height: 1024 },
    landscape: { width: 1216, height: 832 },
    portrait: { width: 832, height: 1216 }
  };

  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setError(null);
    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="layout-content-container flex flex-col w-full md:w-80">
      <div className="flex justify-between items-center mb-4 px-4">
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] text-[#141414] dark:text-white">Imagine</h2>
        <ThemeToggle />
      </div>
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
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Generating...
            </>
          ) : (
            'Generate'
          )}
        </Button>
      </div>
    </div>
  );
}
