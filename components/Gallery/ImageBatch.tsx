import { useState, useRef, useEffect } from 'react';
import ImageCard from './ImageCard';
import BatchMenu from './BatchMenu';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';

const formatTimestamp = (timestamp: string) => {
  console.log('Raw timestamp:', timestamp); // Debug log
  if (!timestamp) return 'N/A';
  
  // Parse the ISO 8601 string
  const date = new Date(timestamp);
  console.log('Parsed date:', date); // Debug log
  if (isNaN(date.getTime())) return 'Invalid Date';

  // Convert to local time
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
  console.log('Local date:', localDate); // Debug log

  const now = new Date();
  const hours = localDate.getHours().toString().padStart(2, '0');
  const minutes = localDate.getMinutes().toString().padStart(2, '0');
  const day = localDate.getDate().toString().padStart(2, '0');
  const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
  const year = localDate.getFullYear();

  const timeString = `${hours}:${minutes}`;
  const dateString = localDate.getFullYear() === now.getFullYear() 
    ? `${day}-${month}`
    : `${day}-${month}-${year}`;

  const formattedTimestamp = `${timeString} ${dateString}`;
  console.log('Formatted timestamp:', formattedTimestamp); // Debug log
  return formattedTimestamp;
};

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
  createdAt: string;
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
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p ref={promptRef} className="text-[#141414] dark:text-white text-sm font-medium truncate cursor-default max-w-[70%]">{batch.prompt}</p>
              </TooltipTrigger>
              {isPromptTruncated && (
                <TooltipContent side="bottom" align="center" className="max-w-md">
                  <p className="text-sm">{batch.prompt}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
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
        <p className="text-[#141414] dark:text-white text-[10px]">
          {modelName} | {batch.width}x{batch.height} • {formatTimestamp(batch.createdAt)}
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mt-2">
        {batch.images.map((image, index) => (
          <ImageCard key={index} image={image} batchImages={batch.images} batchId={batch.id} />
        ))}
      </div>
    </div>
  );
}
