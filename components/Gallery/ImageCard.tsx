interface Image {
  url: string;
}

export default function ImageCard({ image }: { image: Image }) {
  return (
    <div className="flex-shrink-0 w-[158px]">
      <div
        className="w-full h-[158px] bg-center bg-no-repeat bg-cover rounded-xl"
        style={{backgroundImage: `url("${image.url}")`}}
      ></div>
    </div>
  );
}
