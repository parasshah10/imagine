import ImageCard from './ImageCard';

interface Image {
  url: string;
}

export default function ImageGrid({ title, images }: { title: string; images: Image[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-[#141414] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{title}</h2>
      <div className="flex overflow-x-auto pb-4">
        <div className="flex gap-3 md:gap-4 px-4">
          {images.map((image, index) => (
            <ImageCard key={index} image={image} />
          ))}
        </div>
      </div>
    </div>
  );
}
