import { useState } from 'react';
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
}

export default function ImageBatch({ batch, onDelete }: ImageBatchProps) {
  const [copied, setCopied] = useState(false);
  const modelName = modelNames[batch.model] || batch.model;

  const handleDelete = () => {
    onDelete(batch.id);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(batch.prompt).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="mb-4 rounded-xl p-3 bg-[#ededed] dark:bg-gray-700">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2 max-w-[70%]">
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <p className="text-[#141414] dark:text-white text-sm font-medium pb-1 truncate cursor-default">{batch.prompt}</p>
              </TooltipTrigger>
              <TooltipContent side="bottom" align="center" className="max-w-md">
                <p className="text-sm">{batch.prompt}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-[#141414] dark:text-white text-xs whitespace-nowrap">{modelName} | {batch.width}x{batch.height}</p>
          <BatchMenu onDelete={handleDelete} />
        </div>
      </div>
      <div className="flex overflow-x-auto">
        <div className="flex gap-2">
          {batch.images.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}
