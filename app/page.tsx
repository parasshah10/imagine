'use client'

import { useState, useEffect } from 'react';
import GeneratorForm from '../components/ImageGenerator/GeneratorForm';
import ImageBatch from '../components/Gallery/ImageBatch';
import { Button } from '../components/ui/button';

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
  createdAt?: string;
}

export default function Home() {
  const [generatedBatch, setGeneratedBatch] = useState<Batch | null>(null);
  const [previousBatches, setPreviousBatches] = useState<Batch[]>([]);
  const [remixBatch, setRemixBatch] = useState<Batch | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchPreviousBatches();
  }, []);

  const fetchPreviousBatches = async (loadMore = false) => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/generate-image?page=${loadMore ? page + 1 : 1}&limit=10`);
      if (response.ok) {
        const data = await response.json();
        if (loadMore) {
          setPreviousBatches(prev => [...prev, ...data.batches]);
          setPage(prev => prev + 1);
        } else {
          setPreviousBatches(data.batches);
        }
        setHasMore(data.hasMore);
      }
    } catch (error) {
      console.error('Error fetching previous batches:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = (newBatch: Batch) => {
    const batchWithTimestamp = {
      ...newBatch,
      createdAt: new Date().toISOString()
    };
    setGeneratedBatch(batchWithTimestamp);
    setPreviousBatches((prev) => [batchWithTimestamp, ...prev.filter(b => b.id !== batchWithTimestamp.id)]);
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

  const handleRemix = (batch: Batch) => {
    setRemixBatch(batch);
  };

  const handleLoadMore = () => {
    fetchPreviousBatches(true);
  };

  return (
    <div className="flex flex-col md:flex-row flex-1 justify-start py-5">
      <div className="w-full md:w-80 px-4 md:px-6 mb-6 md:mb-0">
        <GeneratorForm onGenerate={handleGenerate} remixBatch={remixBatch} />
      </div>
      <div className="flex-1 px-4 md:px-6 overflow-x-auto">
        <div className="layout-content-container flex flex-col w-full">
          {generatedBatch && <ImageBatch batch={generatedBatch} onDelete={handleDelete} onRemix={handleRemix} />}
          {previousBatches.filter(batch => batch.id !== generatedBatch?.id).map((batch) => (
            <ImageBatch key={batch.id} batch={batch} onDelete={handleDelete} onRemix={handleRemix} />
          ))}
          {hasMore && (
            <div className="flex justify-center mt-4">
              <Button 
                onClick={handleLoadMore} 
                disabled={isLoading}
                variant="outline"
                className="bg-white dark:bg-gray-800 text-[#141414] dark:text-white font-bold"
              >
                {isLoading ? 'Loading...' : 'Load More'}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
