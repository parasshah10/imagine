interface Image {
  url: string;
}

export default function ImageCard({ image }: { image: Image }) {
  return (
    <div className="flex-shrink-0 w-[120px] md:w-[180px]">
      <div
        className="w-full h-[120px] md:h-[180px] bg-center bg-no-repeat bg-cover rounded-xl"
        style={{backgroundImage: `url("${image.url}")`}}
      ></div>
    </div>
  );
}
