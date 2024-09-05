import { useState, useRef, useEffect } from 'react';
import ImageCard from './ImageCard';
import BatchMenu from './BatchMenu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Copy, Check } from 'lucide-react';
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

const modelNames = {
  'runware:100@1': 'FLUX SCHNELL',
  'runware:101@1': 'FLUX DEV'
};

interface ImageBatchProps {
  batch: Batch;
  onDelete: (id: number) => void;
  onRemix: (batch: Batch) => void;
}

export default function ImageBatch({ batch, onDelete, onRemix }: ImageBatchProps) {
  const [copied, setCopied] = useState(false);
  const [isPromptTruncated, setIsPromptTruncated] = useState(false);
  const promptRef = useRef<HTMLParagraphElement>(null);
  const modelName = modelNames[batch.model] || batch.model;

  useEffect(() => {
    const checkTruncation = () => {
      if (promptRef.current) {
        setIsPromptTruncated(
          promptRef.current.scrollWidth > promptRef.current.clientWidth
        );
      }
    };

    checkTruncation();
    window.addEventListener('resize', checkTruncation);

    return () => {
      window.removeEventListener('resize', checkTruncation);
    };
  }, [batch.prompt]);

  const handleDelete = () => {
    onDelete(batch.id);
  };

  const handleRemix = () => {
    onRemix(batch);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(batch.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mb-4 rounded-xl p-3 bg-[#ededed] dark:bg-gray-700">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
        <div className="flex items-center gap-2 max-w-full sm:max-w-[70%] w-full">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p ref={promptRef} className="text-[#141414] dark:text-white text-sm font-medium truncate cursor-default flex-grow">{batch.prompt}</p>
              </TooltipTrigger>
              {isPromptTruncated && (
                <TooltipContent side="bottom" align="center" className="max-w-md">
                  <p className="text-sm">{batch.prompt}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex justify-between items-center w-full sm:w-auto mt-1 sm:mt-0">
          <p className="text-[#141414] dark:text-white text-[10px] whitespace-nowrap">{modelName} | {batch.width}x{batch.height}</p>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 flex-shrink-0"
              onClick={copyToClipboard}
            >
              {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </Button>
            <BatchMenu onDelete={handleDelete} onRemix={handleRemix} />
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto mt-2">
        <div className="flex gap-2">
          {batch.images.map((image, index) => (
            <ImageCard key={index} image={image} batchImages={batch.images} batchId={batch.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
