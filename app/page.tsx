'use client'

import { useState } from 'react';
import GeneratorForm from '../components/ImageGenerator/GeneratorForm';
import ImageGrid from '../components/Gallery/ImageGrid';

interface Image {
  url: string;
}

export default function Home() {
  const [generatedImages, setGeneratedImages] = useState<Image[]>([]);
  const [previousImages, setPreviousImages] = useState<Image[]>([]);

  const handleGenerate = (newImages: Image[]) => {
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
          <ImageGrid title="Generated Images" images={generatedImages} />
          <ImageGrid title="Previously Generated" images={previousImages} />
        </div>
      </div>
    </div>
  );
}
