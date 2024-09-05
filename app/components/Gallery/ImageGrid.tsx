import ImageCard from './ImageCard';

interface Image {
  url: string;
}

export default function ImageGrid({ title, images }: { title: string; images: Image[] }) {
  return (
    <>
      <h2 className="text-[#141414] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">{title}</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {images.map((image, index) => (
          <ImageCard key={index} image={image} />
        ))}
      </div>
    </>
  );
}