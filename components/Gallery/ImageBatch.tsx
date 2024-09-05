import ImageCard from './ImageCard';

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

const backgroundColors = [
  'bg-blue-100 dark:bg-blue-900',
  'bg-green-100 dark:bg-green-900',
  'bg-yellow-100 dark:bg-yellow-900',
  'bg-red-100 dark:bg-red-900',
  'bg-purple-100 dark:bg-purple-900'
];

export default function ImageBatch({ batch, title }: { batch: Batch; title?: string }) {
  const bgColor = backgroundColors[batch.id % backgroundColors.length];
  const modelName = modelNames[batch.model] || batch.model;

  return (
    <div className={`mb-8 rounded-xl p-4 ${bgColor}`}>
      {title && (
        <h2 className="text-[#141414] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-3">{title}</h2>
      )}
      <p className="text-[#141414] dark:text-white text-sm font-medium pb-2">{batch.prompt}</p>
      <p className="text-[#141414] dark:text-white text-xs font-medium pb-2">Model: {modelName} | Resolution: {batch.width}x{batch.height}</p>
      <div className="flex overflow-x-auto pb-4">
        <div className="flex gap-3 md:gap-4">
          {batch.images.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}
