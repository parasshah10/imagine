'use client'

import { useState } from 'react';
import GeneratorForm from '../components/ImageGenerator/GeneratorForm';
import ImageGrid from '../components/Gallery/ImageGrid';

export default function Home() {
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [previousImages, setPreviousImages] = useState<string[]>([]);

  const handleGenerate = (newImages: string[]) => {
    setGeneratedImages(newImages);
    setPreviousImages((prev) => [...newImages, ...prev].slice(0, 6));
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 justify-start py-5">
      <div className="w-full md:w-80 px-4 md:px-6 mb-6 md:mb-0">
        <GeneratorForm onGenerate={handleGenerate} />
      </div>
      <div className="flex-1 px-4 md:px-6 overflow-x-auto">
        <div className="layout-content-container flex flex-col max-w-[960px]">
          <ImageGrid title="Generated Images" images={generatedImages.map(url => ({ url }))} />
          <ImageGrid title="Previously Generated" images={previousImages.map(url => ({ url }))} />
        </div>
      </div>
    </div>
  );
}
