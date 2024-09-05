'use client'

import { useState, useEffect } from 'react';
import GeneratorForm from '../components/ImageGenerator/GeneratorForm';
import ImageBatch from '../components/Gallery/ImageBatch';

interface Image {
  url: string;
}

interface Batch {
  id: number;
  prompt: string;
  aspect_ratio: string;
  images: Image[];
}

export default function Home() {
  const [generatedBatch, setGeneratedBatch] = useState<Batch | null>(null);
  const [previousBatches, setPreviousBatches] = useState<Batch[]>([]);

  useEffect(() => {
    fetchPreviousBatches();
  }, []);

  const fetchPreviousBatches = async () => {
    try {
      const response = await fetch('/api/generate-image');
      if (response.ok) {
        const data = await response.json();
        setPreviousBatches(data.batches);
      }
    } catch (error) {
      console.error('Error fetching previous batches:', error);
    }
  };

  const handleGenerate = (newBatch: Batch) => {
    setGeneratedBatch(newBatch);
    setPreviousBatches((prev) => [newBatch, ...prev].slice(0, 4));
    fetchPreviousBatches(); // Fetch updated batches after generation
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 justify-start py-5">
      <div className="w-full md:w-80 px-4 md:px-6 mb-6 md:mb-0">
        <GeneratorForm onGenerate={handleGenerate} />
      </div>
      <div className="flex-1 px-4 md:px-6 overflow-x-auto">
        <div className="layout-content-container flex flex-col max-w-[960px]">
          {generatedBatch && (
            <ImageBatch title="Generated Images" batch={generatedBatch} />
          )}
          {previousBatches.map((batch) => (
            <ImageBatch key={batch.id} title={`Batch ${batch.id}`} batch={batch} />
          ))}
        </div>
      </div>
    </div>
  );
}
