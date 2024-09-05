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

export default function ImageBatch({ batch, title }: { batch: Batch; title?: string }) {
  return (
    <div className="mb-8">
      {title && (
        <h2 className="text-[#141414] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{title}</h2>
      )}
      <p className="text-[#141414] dark:text-white text-sm font-medium px-4 pb-2">{batch.prompt}</p>
      <p className="text-[#141414] dark:text-white text-xs font-medium px-4 pb-2">Model: {batch.model} | Resolution: {batch.width}x{batch.height}</p>
      <div className="flex overflow-x-auto pb-4">
        <div className="flex gap-3 md:gap-4 px-4">
          {batch.images.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}
