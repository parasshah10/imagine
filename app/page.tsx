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
  width: number;
  height: number;
  model: string;
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
    setPreviousBatches((prev) => [newBatch, ...prev.filter(b => b.id !== newBatch.id)].slice(0, 4));
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/generate-image?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setPreviousBatches((prev) => prev.filter((batch) => batch.id !== id));
        if (generatedBatch?.id === id) {
          setGeneratedBatch(null);
        }
      } else {
        console.error('Failed to delete batch');
      }
    } catch (error) {
      console.error('Error deleting batch:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 justify-start py-5">
      <div className="w-full md:w-80 px-4 md:px-6 mb-6 md:mb-0">
        <GeneratorForm onGenerate={handleGenerate} />
      </div>
      <div className="flex-1 px-4 md:px-6 overflow-x-auto">
        <div className="layout-content-container flex flex-col w-full">
          {generatedBatch && <ImageBatch batch={generatedBatch} onDelete={handleDelete} />}
          {previousBatches.filter(batch => batch.id !== generatedBatch?.id).map((batch) => (
            <ImageBatch key={batch.id} batch={batch} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
