import ImageCard from './ImageCard';
import BatchMenu from './BatchMenu';

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
  const modelName = modelNames[batch.model] || batch.model;

  const handleDelete = () => {
    onDelete(batch.id);
  };

  return (
    <div className="mb-4 rounded-xl p-3 bg-[#ededed] dark:bg-gray-700">
      <div className="flex justify-between items-start mb-2">
        <p className="text-[#141414] dark:text-white text-sm font-medium pb-1 truncate max-w-[70%]">{batch.prompt}</p>
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
